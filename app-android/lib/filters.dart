import 'models.dart';

/// Filtri locali della pagina gruppo.
///
/// Sono volutamente puri: la UI cambia, la logica resta testabile.
List<Expense> filterExpenses(
  List<Expense> expenses, {
  String query = '',
  String? category,
  int? memberId,
  DateTime? from,
  DateTime? to,
}) {
  final needle = query.trim().toLowerCase();
  return expenses.where((e) {
    if (needle.isNotEmpty) {
      final haystack = '${e.description} ${e.payerName} ${e.category}'
          .toLowerCase();
      if (!haystack.contains(needle)) return false;
    }
    if (category != null && e.category != category) return false;
    if (memberId != null) {
      final paid = e.paidBy == memberId;
      final shares = e.shares.any((s) => s.userId == memberId);
      if (!paid && !shares) return false;
    }
    if (!_inRange(e.createdAt, from, to)) return false;
    return true;
  }).toList();
}

List<Payment> filterPayments(
  List<Payment> payments, {
  String query = '',
  int? memberId,
  DateTime? from,
  DateTime? to,
}) {
  final needle = query.trim().toLowerCase();
  return payments.where((p) {
    if (needle.isNotEmpty) {
      final haystack = '${p.fromName} ${p.toName} ${p.note ?? ''}'
          .toLowerCase();
      if (!haystack.contains(needle)) return false;
    }
    if (memberId != null && p.fromUser != memberId && p.toUser != memberId) {
      return false;
    }
    return _inRange(p.createdAt, from, to);
  }).toList();
}

bool _inRange(String? iso, DateTime? from, DateTime? to) {
  if (from == null && to == null) return true;
  final dt = DateTime.tryParse(iso ?? '')?.toLocal();
  if (dt == null) return false;
  final day = DateTime(dt.year, dt.month, dt.day);
  if (from != null) {
    final start = DateTime(from.year, from.month, from.day);
    if (day.isBefore(start)) return false;
  }
  if (to != null) {
    final end = DateTime(to.year, to.month, to.day);
    if (day.isAfter(end)) return false;
  }
  return true;
}
