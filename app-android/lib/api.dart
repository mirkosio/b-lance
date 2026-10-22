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

  static const _tokenKey = 'bl_token';

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

  Future<void> saveToken(String? value) async {
    // Prima in memoria: anche se lo storage non scrive, per questa
    // sessione il login funziona comunque.
    token = value;
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
    int status;
    List<int> bytes;
    try {
      (status, bytes) = await _send(method, uri, headers, body);
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
          body,
          client: fallback,
        );
      } finally {
        fallback.close();
      }
    }

    if (status >= 400) {
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
    if (bytes.isEmpty) return null;
    return jsonDecode(utf8.decode(bytes));
  }

  Future<(int, List<int>)> _send(
    String method,
    Uri uri,
    Map<String, String> headers,
    Object? body, {
    http.Client? client,
  }) async {
    final own = client == null;
    final c = client ?? http.Client();
    try {
      final req = http.Request(method, uri)..headers.addAll(headers);
      if (method != 'GET') req.body = jsonEncode(body ?? {});
      final streamed = await c.send(req).timeout(const Duration(seconds: 50));
      final resp = await http.Response.fromStream(streamed)
          .timeout(const Duration(seconds: 50));
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
    final data = await _req('PATCH', '/api/me', body: body) as Map<String, dynamic>;
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
    final data = await _req('GET', '/api/users/search?q=$q') as Map<String, dynamic>;
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
    final data = await _req('GET', '/api/groups/$groupId/recurring')
        as Map<String, dynamic>;
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

  Future<void> setRecurringActive(int groupId, int ruleId, bool active) =>
      _req(
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
