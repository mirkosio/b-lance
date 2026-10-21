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

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import 'models.dart';

const kApiBase = String.fromEnvironment(
  'API_URL',
  defaultValue: 'https://b-lance.onrender.com',
);

class ApiException implements Exception {
  ApiException(this.status, this.message);

  final int status;
  final String message;

  @override
  String toString() => message;
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
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString(_tokenKey);
  }

  Future<void> saveToken(String? value) async {
    token = value;
    final prefs = await SharedPreferences.getInstance();
    if (value == null) {
      await prefs.remove(_tokenKey);
    } else {
      await prefs.setString(_tokenKey, value);
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
    final http.Response resp;
    switch (method) {
      case 'GET':
        resp = await http.get(uri, headers: headers).timeout(const Duration(seconds: 30));
      case 'POST':
        resp = await http
            .post(uri, headers: headers, body: jsonEncode(body ?? {}))
            .timeout(const Duration(seconds: 30));
      case 'PATCH':
        resp = await http
            .patch(uri, headers: headers, body: jsonEncode(body ?? {}))
            .timeout(const Duration(seconds: 30));
      case 'DELETE':
        resp = await http.delete(uri, headers: headers).timeout(const Duration(seconds: 30));
      default:
        throw ArgumentError(method);
    }

    if (resp.statusCode >= 400) {
      String detail = 'Errore ${resp.statusCode}';
      try {
        final decoded = jsonDecode(utf8.decode(resp.bodyBytes));
        if (decoded is Map && decoded['detail'] is String) {
          detail = decoded['detail'] as String;
        }
      } catch (_) {
        // corpo non JSON: tengo il messaggio generico
      }
      throw ApiException(resp.statusCode, detail);
    }
    if (resp.body.isEmpty) return null;
    return jsonDecode(utf8.decode(resp.bodyBytes));
  }

  // ---------------------------------------------------------------- auth
  Future<User> register(String name, String email, String password) async {
    final data = await _req('POST', '/api/register',
        body: {'name': name, 'email': email, 'password': password}) as Map<String, dynamic>;
    await saveToken(data['token'] as String);
    return User.fromJson(data['user'] as Map<String, dynamic>);
  }

  Future<User> login(String email, String password) async {
    final data = await _req('POST', '/api/login',
        body: {'email': email, 'password': password}) as Map<String, dynamic>;
    await saveToken(data['token'] as String);
    return User.fromJson(data['user'] as Map<String, dynamic>);
  }

  Future<User> me() async {
    final data = await _req('GET', '/api/me') as Map<String, dynamic>;
    return User.fromJson(data['user'] as Map<String, dynamic>);
  }

  Future<void> logout() => saveToken(null);

  // ---------------------------------------------------------------- meta
  Future<void> loadMeta() async {
    if (currenciesLoaded) return;
    final data = await _req('GET', '/api/meta') as Map<String, dynamic>;
    final noRate = (data['no_rate_codes'] as List<dynamic>).map((e) => e as String).toSet();
    Meta.noRateCodes = noRate;
    final list = data['currencies'] as List<dynamic>;
    Meta.currencies = list.map((raw) {
      final c = raw as Map<String, dynamic>;
      return CurrencyInfo.fromJson(c, hasAutoRate: !noRate.contains(c['code'] as String));
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

  Future<GroupSummary> createGroup(String name, String currency) async {
    final data = await _req('POST', '/api/groups',
        body: {'name': name, 'base_currency': currency}) as Map<String, dynamic>;
    return GroupSummary.fromJson(data);
  }

  Future<GroupSummary> joinGroup(String code) async {
    final data =
        await _req('POST', '/api/groups/join', body: {'code': code}) as Map<String, dynamic>;
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
    final data = await _req('POST', '/api/groups/$id/invite') as Map<String, dynamic>;
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
    Map<String, String> values = const {},
  }) async {
    final data = await _req('POST', '/api/groups/$groupId/expenses', body: {
      'description': description,
      'amount': amount,
      'paid_by': paidBy,
      'members': members,
      'split_method': splitMethod,
      'currency': currency,
      'fx_rate': fxRate,
      'values': values,
    }) as Map<String, dynamic>;
    return Expense.fromJson(data);
  }

  Future<void> voidExpense(int groupId, int expenseId) =>
      _req('DELETE', '/api/groups/$groupId/expenses/$expenseId');

  // ---------------------------------------------------------------- pagamenti
  Future<Payment> addPayment(
    int groupId, {
    required int fromUser,
    required int toUser,
    required String amount,
    String note = '',
  }) async {
    final data = await _req('POST', '/api/groups/$groupId/payments', body: {
      'from_user': fromUser,
      'to_user': toUser,
      'amount': amount,
      'note': note,
    }) as Map<String, dynamic>;
    return Payment.fromJson(data);
  }

  Future<void> deletePayment(int groupId, int paymentId) =>
      _req('DELETE', '/api/groups/$groupId/payments/$paymentId');
}
