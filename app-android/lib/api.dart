/// Client dell'API B-Lance.
///
/// Parla col backend con `Authorization: Bearer <token>` (lo stesso token di
/// sessione del sito). L'indirizzo del server si puo cambiare a compilazione:
///
///     flutter build apk --release --dart-define=API_URL=http://10.0.2.2:8133
///
/// Default: produzione.
library;

import 'dart:convert';
import 'dart:io' as io;
import 'dart:math';

import 'package:http/http.dart' as http;
import 'package:http/io_client.dart' show IOClient;
import 'package:shared_preferences/shared_preferences.dart';

import 'models.dart';

const kApiBase = String.fromEnvironment(
  'API_URL',
  defaultValue: 'https://b-lance.vercel.app',
);

class ApiException implements Exception {
  ApiException(this.status, this.message);

  final int status;
  final String message;

  @override
  String toString() => message;
}

class PendingSyncException implements Exception {
  const PendingSyncException(this.pendingCount);

  final int pendingCount;

  String get message => pendingCount == 1
      ? 'Salvato offline: 1 modifica verrà sincronizzata al prossimo aggiornamento online.'
      : 'Salvato offline: $pendingCount modifiche verranno sincronizzate al prossimo aggiornamento online.';
}

/// Messaggio leggibile per qualsiasi errore, con la coda tecnica vera
/// invece del solito "connessione assente": serve a capire SUBITO se e'
/// la rete, il timeout o una risposta malformata.
String describeError(Object e) {
  if (e is ApiException) return e.message;
  final s = e.toString();
  final String head;
  if (s.contains('Operation not permitted') || s.contains('errno = 1')) {
    head = 'Il telefono nega la rete a questa app (permesso o firewall)';
  } else if (s.contains('SocketException') || s.contains('ClientException')) {
    head = 'Connessione fallita con il server';
  } else if (s.contains('TimeoutException')) {
    head = 'Timeout: nessuna risposta in 50 secondi';
  } else if (e is FormatException || e is TypeError) {
    head = 'Risposta inattesa dal server';
  } else {
    head = 'Errore imprevisto';
  }
  final detail = s.length > 150 ? '${s.substring(0, 150)}…' : s;
  return '$head. $detail';
}

// ------------------------------------------------------------------ dns riserva
// Alcuni telefoni/reti non risolvono certi domini col DNS di sistema (filtro
// rotto o dominio oscurato dalle liste anti-phishing). L'app allora chiede
// gli indirizzi a Cloudflare via DNS cifrato (DoH), come fa Chrome col suo
// Secure DNS, e connette direttamente all'IP col TLS sul nome vero.

List<io.InternetAddress>? _dohCache;
DateTime? _dohCacheAt;
String? _dohCacheHost;

bool _isDnsFailure(Object e) {
  final s = e.toString();
  return s.contains('Failed host lookup') ||
      s.contains('No address associated') ||
      s.contains('EAI_NONAME');
}

Future<List<io.InternetAddress>> _dohResolve(String host) async {
  final fresh =
      _dohCacheHost == host &&
      _dohCache != null &&
      _dohCacheAt != null &&
      DateTime.now().difference(_dohCacheAt!) < const Duration(minutes: 10);
  if (fresh) return _dohCache!;
  final client = io.HttpClient();
  try {
    final req = await client
        .getUrl(Uri.parse('https://1.1.1.1/dns-query?name=$host&type=A'))
        .timeout(const Duration(seconds: 10));
    req.headers.set('accept', 'application/dns-json');
    final resp = await req.close().timeout(const Duration(seconds: 10));
    final body = await resp.transform(utf8.decoder).join();
    final json = jsonDecode(body) as Map<String, dynamic>;
    final answers = (json['Answer'] as List?) ?? const [];
    final addrs = <io.InternetAddress>[];
    for (final a in answers) {
      final data = (a as Map)['data'] as String?;
      final ip = data == null ? null : io.InternetAddress.tryParse(data);
      if (ip != null && ip.type == io.InternetAddressType.IPv4) addrs.add(ip);
    }
    if (addrs.isEmpty) {
      throw const io.SocketException('DoH: nessun indirizzo per il server');
    }
    _dohCache = addrs;
    _dohCacheAt = DateTime.now();
    _dohCacheHost = host;
    return addrs;
  } finally {
    client.close(force: true);
  }
}

/// Client che parla coi risultati del DoH: niente lookup di sistema, TCP
/// all'IP + TLS con SNI e verifica sul nome vero del server.
http.Client _dohClient(String host, List<io.InternetAddress> addrs) {
  final inner = io.HttpClient();
  inner.connectionFactory = (uri, proxyHost, proxyPort) {
    final Future<io.Socket> task = () async {
      Object? last;
      for (final ip in addrs) {
        try {
          final plain = await io.Socket.connect(
            ip,
            uri.port,
            timeout: const Duration(seconds: 15),
          );
          return await io.SecureSocket.secure(plain, host: host);
        } catch (e) {
          last = e;
        }
      }
      throw io.SocketException(
        'DoH: nessun indirizzo raggiungibile per $host ($last)',
      );
    }();
    return Future.value(io.ConnectionTask.fromSocket(task, () {}));
  };
  return IOClient(inner);
}

class Meta {
  /// Valute statice (cache in memoria dopo il primo caricamento).
  static List<CurrencyInfo> currencies = const [];
  static Set<String> noRateCodes = const {};

  static CurrencyInfo? byCode(String code) {
    for (final c in currencies) {
      if (c.code == code) return c;
    }
    return null;
  }

  static int exponentOf(String code) => byCode(code)?.exponent ?? 2;
  static String symbolOf(String code) => byCode(code)?.symbol ?? code;
  static bool hasAutoRate(String code) => !noRateCodes.contains(code);
}

class Api {
  Api({this.base = kApiBase});

  final String base;
  String? token;
  bool lastResponseFromCache = false;

  static const _tokenKey = 'bl_token';
  static const _cachePrefix = 'bl_api_cache_v1_';
  static const _queuePrefix = 'bl_pending_mutations_v1_';
  int pendingMutationCount = 0;
  String? pendingMutationError;
  bool _flushingMutations = false;

  String _cacheScope([String? value]) {
    final active = value ?? token ?? '';
    try {
      final payload = active.split('.').first;
      final decoded = jsonDecode(
        utf8.decode(base64Url.decode(base64Url.normalize(payload))),
      );
      if (decoded is Map && decoded['uid'] is int) {
        return 'u${decoded['uid']}';
      }
    } catch (_) {
      // Token di test o formato futuro: usa un identificatore stabile opaco.
    }
    var hash = 2166136261;
    for (final byte in utf8.encode(active)) {
      hash = ((hash ^ byte) * 16777619) & 0xffffffff;
    }
    return hash.toRadixString(16);
  }

  String _cacheKey(String path) =>
      '$_cachePrefix${_cacheScope()}_${Uri.encodeComponent(base)}_${Uri.encodeComponent(path)}';

  String get _queueKey => '$_queuePrefix${_cacheScope()}';

  bool _queueableMutation(String method, String path) =>
      token != null &&
      method == 'POST' &&
      RegExp(r'^/api/groups/[0-9]+/(expenses|payments)$').hasMatch(path);

  bool _cacheableGet(String method, String path) =>
      method == 'GET' &&
      token != null &&
      (path == '/api/groups' ||
          RegExp(r'^/api/groups/[0-9]+$').hasMatch(path) ||
          path.startsWith('/api/activity'));

  Future<String?> _readCachedGet(String path) async {
    if (token == null) return null;
    try {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getString(_cacheKey(path));
    } catch (_) {
      return null;
    }
  }

  Future<void> _writeCachedGet(String path, String value) async {
    if (token == null) return;
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_cacheKey(path), value);
    } catch (_) {
      // La cache migliora l’uso offline ma non deve bloccare l’uso online.
    }
  }

  Future<void> _clearCachedNamespace(String scope) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final prefix = '$_cachePrefix${scope}_';
      for (final key in prefs.getKeys().where(
        (key) => key.startsWith(prefix),
      )) {
        await prefs.remove(key);
      }
      if (scope == _cacheScope()) pendingMutationCount = 0;
    } catch (_) {
      // Il logout resta valido anche se la pulizia locale non riesce.
    }
  }

  Future<void> loadToken() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      token = prefs.getString(_tokenKey);
    } catch (_) {
      // Storage di sistema incazzato (capita su alcuni device): l'app
      // resta usabile, al prossimo avvio chiede di nuovo il login.
      token = null;
    }
  }

  String _newClientId() {
    final random = Random.secure();
    final bytes = List<int>.generate(16, (_) => random.nextInt(256));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    final hex = bytes.map((b) => b.toRadixString(16).padLeft(2, '0')).join();
    return '${hex.substring(0, 8)}-${hex.substring(8, 12)}-'
        '${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20)}';
  }

  Future<List<Map<String, dynamic>>> _readMutationQueue() async {
    if (token == null) return [];
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString(_queueKey);
      if (raw == null) return [];
      final decoded = jsonDecode(raw);
      if (decoded is! List) return [];
      return decoded
          .whereType<Map>()
          .map((item) => Map<String, dynamic>.from(item))
          .toList();
    } catch (_) {
      return [];
    }
  }

  Future<void> _writeMutationQueue(List<Map<String, dynamic>> queue) async {
    if (token == null) return;
    final prefs = await SharedPreferences.getInstance();
    if (queue.isEmpty) {
      await prefs.remove(_queueKey);
    } else {
      await prefs.setString(_queueKey, jsonEncode(queue));
    }
    pendingMutationCount = queue.length;
  }

  Future<void> _enqueueMutation(String path, Map<String, dynamic> body) async {
    final queue = await _readMutationQueue();
    final clientId = body['client_id'] as String;
    if (queue.any((item) => item['client_id'] == clientId)) return;
    queue.add({
      'path': path,
      'body': body,
      'client_id': clientId,
      'queued_at': DateTime.now().toUtc().toIso8601String(),
    });
    await _writeMutationQueue(queue);
  }

  Future<void> _removeQueuedMutation(String clientId) async {
    final queue = await _readMutationQueue();
    queue.removeWhere((item) => item['client_id'] == clientId);
    await _writeMutationQueue(queue);
    if (queue.isEmpty) pendingMutationError = null;
  }

  /// Invia in ordine le operazioni in coda. Ogni POST conserva lo stesso
  /// client_id: un retry dopo una risposta persa non duplica la modifica.
  Future<void> flushPendingMutations() async {
    if (_flushingMutations || token == null) return;
    _flushingMutations = true;
    try {
      final queue = await _readMutationQueue();
      pendingMutationCount = queue.length;
      if (queue.isEmpty) {
        pendingMutationError = null;
        return;
      }
      final remaining = <Map<String, dynamic>>[];
      pendingMutationError = null;
      final headers = await _headers();
      for (var index = 0; index < queue.length; index++) {
        final item = queue[index];
        try {
          final response = await _send(
            'POST',
            Uri.parse('$base${item['path']}'),
            headers,
            Map<String, dynamic>.from(item['body'] as Map),
            timeout: const Duration(seconds: 8),
          );
          if (response.$1 >= 200 && response.$1 < 300) continue;
          if (response.$1 >= 400 && response.$1 < 500) {
            try {
              final decoded = jsonDecode(utf8.decode(response.$2));
              if (decoded is Map && decoded['detail'] is String) {
                pendingMutationError = decoded['detail'] as String;
              }
            } catch (_) {
              pendingMutationError =
                  'Il server ha rifiutato una modifica in coda.';
            }
          }
        } on Exception {
          // Riprova al prossimo caricamento o aggiornamento manuale.
        }
        remaining.addAll(queue.skip(index));
        break;
      }
      await _writeMutationQueue(remaining);
    } finally {
      _flushingMutations = false;
    }
  }

  Future<void> saveToken(String? value) async {
    final oldScope = token == null ? null : _cacheScope(token);
    final newScope = value == null ? null : _cacheScope(value);
    // Prima in memoria: anche se lo storage non scrive, per questa
    // sessione il login funziona comunque.
    token = value;
    if (oldScope != null && oldScope != newScope) {
      await _clearCachedNamespace(oldScope);
      pendingMutationCount = 0;
    }
    try {
      final prefs = await SharedPreferences.getInstance();
      if (value == null) {
        await prefs.remove(_tokenKey);
      } else {
        await prefs.setString(_tokenKey, value);
      }
    } catch (_) {
      // Se il storage non scrive, il token vale solo per questa sessione:
      // meglio un login ripetuto che un'app che non parte.
    }
  }

  Future<Map<String, String>> _headers() async {
    if (token == null) await loadToken();
    return {
      'content-type': 'application/json',
      if (token != null) 'authorization': 'Bearer $token',
    };
  }

  Future<dynamic> _req(String method, String path, {Object? body}) async {
    final uri = Uri.parse('$base$path');
    final headers = await _headers();
    if (_cacheableGet(method, path)) await flushPendingMutations();
    Object? requestBody = body;
    if (_queueableMutation(method, path) && body is Map) {
      requestBody = Map<String, dynamic>.from(body);
      (requestBody as Map<String, dynamic>).putIfAbsent(
        'client_id',
        _newClientId,
      );
    }
    final queuedClientId =
        _queueableMutation(method, path) && requestBody is Map<String, dynamic>
        ? requestBody['client_id'] as String
        : null;
    if (queuedClientId != null) {
      await _enqueueMutation(path, requestBody as Map<String, dynamic>);
    }
    int status;
    List<int> bytes;
    final requestTimeout = _queueableMutation(method, path)
        ? const Duration(seconds: 8)
        : const Duration(seconds: 50);
    try {
      try {
        (status, bytes) = await _send(
          method,
          uri,
          headers,
          requestBody,
          timeout: requestTimeout,
        );
      } on Exception catch (e) {
        if (!_isDnsFailure(e)) rethrow;
        // Il resolver di sistema del telefono non risolve il server:
        // riprovo con il DNS cifrato di riserva.
        final fallback = _dohClient(uri.host, await _dohResolve(uri.host));
        try {
          (status, bytes) = await _send(
            method,
            uri,
            headers,
            requestBody,
            client: fallback,
            timeout: requestTimeout,
          );
        } finally {
          fallback.close();
        }
      }
    } on Exception {
      if (queuedClientId != null) {
        throw PendingSyncException(pendingMutationCount);
      }
      if (_cacheableGet(method, path)) {
        final cached = await _readCachedGet(path);
        if (cached != null) {
          lastResponseFromCache = true;
          return jsonDecode(cached);
        }
      }
      rethrow;
    }

    if (status >= 500 && queuedClientId != null) {
      throw PendingSyncException(pendingMutationCount);
    }
    if (status >= 500 && _cacheableGet(method, path)) {
      final cached = await _readCachedGet(path);
      if (cached != null) {
        lastResponseFromCache = true;
        return jsonDecode(cached);
      }
    }
    if (status >= 400) {
      if (queuedClientId != null) {
        await _removeQueuedMutation(queuedClientId);
      }
      String detail = 'Errore $status';
      try {
        final decoded = jsonDecode(utf8.decode(bytes));
        if (decoded is Map && decoded['detail'] is String) {
          detail = decoded['detail'] as String;
        }
      } catch (_) {
        // corpo non JSON: tengo il messaggio generico
      }
      throw ApiException(status, detail);
    }
    if (queuedClientId != null) {
      await _removeQueuedMutation(queuedClientId);
    }
    if (bytes.isEmpty) return null;
    final raw = utf8.decode(bytes);
    if (_cacheableGet(method, path)) {
      lastResponseFromCache = false;
      await _writeCachedGet(path, raw);
    }
    return jsonDecode(raw);
  }

  Future<(int, List<int>)> _send(
    String method,
    Uri uri,
    Map<String, String> headers,
    Object? body, {
    http.Client? client,
    Duration timeout = const Duration(seconds: 50),
  }) async {
    final own = client == null;
    final c = client ?? http.Client();
    try {
      final req = http.Request(method, uri)..headers.addAll(headers);
      if (method != 'GET') req.body = jsonEncode(body ?? {});
      final streamed = await c.send(req).timeout(timeout);
      final resp = await http.Response.fromStream(streamed).timeout(timeout);
      return (resp.statusCode, resp.bodyBytes);
    } finally {
      if (own) c.close();
    }
  }

  // ---------------------------------------------------------------- auth
  Future<User> register(String name, String email, String password) async {
    final data = await _req(
      'POST',
      '/api/register',
      body: {'name': name, 'email': email, 'password': password},
    ) as Map<String, dynamic>;
    await saveToken(data['token'] as String);
    return User.fromJson(data['user'] as Map<String, dynamic>);
  }

  Future<User> login(String email, String password) async {
    final data = await _req(
      'POST',
      '/api/login',
      body: {'email': email, 'password': password},
    ) as Map<String, dynamic>;
    await saveToken(data['token'] as String);
    return User.fromJson(data['user'] as Map<String, dynamic>);
  }

  Future<User> me() async {
    final data = await _req('GET', '/api/me') as Map<String, dynamic>;
    return User.fromJson(data['user'] as Map<String, dynamic>);
  }

  Future<void> logout() => saveToken(null);

  Future<User> updateMe({
    String? name,
    String? color,
    String? handle,
    bool changeHandle = false,
  }) async {
    final body = <String, dynamic>{};
    if (name != null) body['name'] = name;
    if (color != null) body['color'] = color;
    if (changeHandle) body['handle'] = handle;
    final data =
        await _req('PATCH', '/api/me', body: body) as Map<String, dynamic>;
    return User.fromJson(data['user'] as Map<String, dynamic>);
  }

  Future<void> changePassword({
    required String current,
    required String next,
  }) async {
    final data = await _req(
      'POST',
      '/api/me/password',
      body: {'current': current, 'new': next},
    ) as Map<String, dynamic>;
    await saveToken(data['token'] as String);
  }

  /// Anonimizza l'account sul server e cancella il token locale.
  Future<void> deleteAccount() async {
    await _req('DELETE', '/api/me');
    await saveToken(null);
  }

  Future<List<PublicUser>> searchUsers(String query) async {
    final q = Uri.encodeQueryComponent(query.trim().replaceFirst('@', ''));
    final data =
        await _req('GET', '/api/users/search?q=$q') as Map<String, dynamic>;
    return (data['users'] as List<dynamic>)
        .map((u) => PublicUser.fromJson(u as Map<String, dynamic>))
        .toList();
  }

  Future<void> inviteByHandle(int groupId, String handle) async {
    await _req(
      'POST',
      '/api/groups/$groupId/members',
      body: {'handle': handle.trim().replaceFirst('@', '')},
    );
  }

  /// Revoca tutti i token dell'utente e tiene vivo solo questo dispositivo.
  Future<void> logoutAll() async {
    final data = await _req('POST', '/api/logout-all') as Map<String, dynamic>;
    await saveToken(data['token'] as String);
  }

  // ---------------------------------------------------------------- inviti
  Future<InvitePreview> invitePreview(String code) async {
    final data = await _req(
      'GET',
      '/api/invites/${Uri.encodeComponent(code.trim().toUpperCase())}',
    ) as Map<String, dynamic>;
    return InvitePreview.fromJson(data);
  }

  // ---------------------------------------------------------------- meta
  Future<void> loadMeta() async {
    if (currenciesLoaded) return;
    final data = await _req('GET', '/api/meta') as Map<String, dynamic>;
    final noRate = (data['no_rate_codes'] as List<dynamic>)
        .map((e) => e as String)
        .toSet();
    Meta.noRateCodes = noRate;
    final list = data['currencies'] as List<dynamic>;
    Meta.currencies = list.map((raw) {
      final c = raw as Map<String, dynamic>;
      return CurrencyInfo.fromJson(
        c,
        hasAutoRate: !noRate.contains(c['code'] as String),
      );
    }).toList();
    currenciesLoaded = true;
  }

  bool currenciesLoaded = false;

  // ---------------------------------------------------------------- gruppi
  Future<List<GroupSummary>> groups() async {
    final data = await _req('GET', '/api/groups') as Map<String, dynamic>;
    return (data['groups'] as List<dynamic>)
        .map((g) => GroupSummary.fromJson(g as Map<String, dynamic>))
        .toList();
  }

  /// Dashboard completa: gruppi e saldo totale per valuta.
  Future<Dashboard> dashboard() async {
    final data = await _req('GET', '/api/groups') as Map<String, dynamic>;
    return Dashboard.fromJson(data);
  }

  /// Ultimi movimenti da tutti i gruppi dell'utente.
  Future<List<ActivityItem>> activity({
    int limit = 40,
    String q = '',
    String category = '',
    String kind = '',
  }) async {
    final params = <String, String>{'limit': '$limit'};
    if (q.trim().isNotEmpty) params['q'] = q.trim();
    if (category.isNotEmpty) params['category'] = category;
    if (kind.isNotEmpty) params['kind'] = kind;
    final query = params.entries
        .map((e) => '${e.key}=${Uri.encodeQueryComponent(e.value)}')
        .join('&');
    final data =
        await _req('GET', '/api/activity?$query') as Map<String, dynamic>;
    return (data['items'] as List<dynamic>)
        .map((e) => ActivityItem.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<GroupSummary> createGroup(String name, String currency) async {
    final data = await _req(
      'POST',
      '/api/groups',
      body: {'name': name, 'base_currency': currency},
    ) as Map<String, dynamic>;
    return GroupSummary.fromJson(data);
  }

  Future<GroupSummary> joinGroup(String code) async {
    final data = await _req(
      'POST',
      '/api/groups/join',
      body: {'code': code},
    ) as Map<String, dynamic>;
    return GroupSummary.fromJson(data);
  }

  Future<GroupDetail> groupDetail(int id) async {
    final data = await _req('GET', '/api/groups/$id') as Map<String, dynamic>;
    return GroupDetail.fromJson(data);
  }

  Future<void> renameGroup(int id, String name) =>
      _req('PATCH', '/api/groups/$id', body: {'name': name});

  Future<void> deleteGroup(int id) => _req('DELETE', '/api/groups/$id');

  Future<String> regenerateInvite(int id) async {
    final data =
        await _req('POST', '/api/groups/$id/invite') as Map<String, dynamic>;
    return data['invite_code'] as String;
  }

  // ------------------------------------------------------- riepilogo pubblico
  Future<GroupShare> groupShare(int id) async {
    final data =
        await _req('GET', '/api/groups/$id/share') as Map<String, dynamic>;
    return GroupShare.fromJson(data);
  }

  Future<GroupShare> createGroupShare(int id) async {
    final data =
        await _req('POST', '/api/groups/$id/share') as Map<String, dynamic>;
    return GroupShare.fromJson(data);
  }

  Future<void> revokeGroupShare(int id) =>
      _req('DELETE', '/api/groups/$id/share');

  /// Riusa il link esistente o ne crea uno nuovo se non c'è.
  Future<GroupShare> ensureGroupShare(int id) async {
    final current = await groupShare(id);
    if (current.active && current.path != null) return current;
    return createGroupShare(id);
  }

  // ---------------------------------------------------------------- spese
  Future<Expense> addExpense(
    int groupId, {
    required String description,
    required String amount,
    required int paidBy,
    required List<int> members,
    String splitMethod = 'even',
    String currency = '',
    String fxRate = '',
    String category = 'other',
    Map<String, String> values = const {},
  }) async {
    final data = await _req(
      'POST',
      '/api/groups/$groupId/expenses',
      body: {
        'description': description,
        'amount': amount,
        'paid_by': paidBy,
        'members': members,
        'split_method': splitMethod,
        'currency': currency,
        'fx_rate': fxRate,
        'category': category,
        'values': values,
      },
    ) as Map<String, dynamic>;
    return Expense.fromJson(data);
  }

  Future<Expense> editExpense(
    int groupId,
    int expenseId, {
    required String description,
    required String amount,
    required int paidBy,
    required List<int> members,
    String splitMethod = 'even',
    String currency = '',
    String fxRate = '',
    String category = 'other',
    Map<String, String> values = const {},
  }) async {
    final data = await _req(
      'PATCH',
      '/api/groups/$groupId/expenses/$expenseId',
      body: {
        'description': description,
        'amount': amount,
        'paid_by': paidBy,
        'members': members,
        'split_method': splitMethod,
        'currency': currency,
        'fx_rate': fxRate,
        'category': category,
        'values': values,
      },
    ) as Map<String, dynamic>;
    return Expense.fromJson(data);
  }

  Future<void> voidExpense(int groupId, int expenseId) =>
      _req('DELETE', '/api/groups/$groupId/expenses/$expenseId');

  // ---------------------------------------------------------------- ricorrenti
  Future<List<RecurringRule>> recurringRules(int groupId) async {
    final data = await _req(
      'GET',
      '/api/groups/$groupId/recurring',
    ) as Map<String, dynamic>;
    return (data['rules'] as List<dynamic>)
        .map((r) => RecurringRule.fromJson(r as Map<String, dynamic>))
        .toList();
  }

  Future<RecurringRule> addRecurring(
    int groupId, {
    required String description,
    required String amount,
    required int paidBy,
    required List<int> members,
    String splitMethod = 'even',
    String currency = '',
    String fxRate = '',
    String category = 'other',
    Map<String, String> values = const {},
    String frequency = 'monthly',
    int interval = 1,
  }) async {
    final data = await _req(
      'POST',
      '/api/groups/$groupId/recurring',
      body: {
        'description': description,
        'amount': amount,
        'paid_by': paidBy,
        'members': members,
        'split_method': splitMethod,
        'currency': currency,
        'fx_rate': fxRate,
        'category': category,
        'values': values,
        'frequency': frequency,
        'interval': interval,
      },
    ) as Map<String, dynamic>;
    return RecurringRule.fromJson(data['rule'] as Map<String, dynamic>);
  }

  Future<void> setRecurringActive(int groupId, int ruleId, bool active) => _req(
    'PATCH',
    '/api/groups/$groupId/recurring/$ruleId',
    body: {'active': active},
  );

  Future<void> deleteRecurring(int groupId, int ruleId) =>
      _req('DELETE', '/api/groups/$groupId/recurring/$ruleId');

  // ---------------------------------------------------------------- pagamenti
  Future<Payment> addPayment(
    int groupId, {
    required int fromUser,
    required int toUser,
    required String amount,
    String note = '',
  }) async {
    final data = await _req(
      'POST',
      '/api/groups/$groupId/payments',
      body: {
        'from_user': fromUser,
        'to_user': toUser,
        'amount': amount,
        'note': note,
      },
    ) as Map<String, dynamic>;
    return Payment.fromJson(data);
  }

  Future<void> deletePayment(int groupId, int paymentId) =>
      _req('DELETE', '/api/groups/$groupId/payments/$paymentId');
}
