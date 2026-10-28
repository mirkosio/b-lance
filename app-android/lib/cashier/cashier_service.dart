/// Logica di bilancio per la modalità cassiere locale (nessun server).
///
/// Importi in centesimi interi. Deterministico: stesso storico -> stessi saldi.
library;

import 'cashier_models.dart';

/// Saldo di un membro: positivo = gli devono, negativo = deve.
class CashierBalance {
  CashierBalance(this.personId, this.netMinor);

  final int personId;
  final int netMinor; // centesimi della valuta del gruppo
}

/// Saldo per ogni membro di un gruppo cassiere.
List<CashierBalance> cashierBalances(CashierGroup group) {
  final paid = <int, int>{};
  final owed = <int, int>{};
  for (final e in group.expenses) {
    paid[e.paidById] = (paid[e.paidById] ?? 0) + e.amountMinor;
    if (e.memberIds.isEmpty) continue;
    final share = e.amountMinor ~/ e.memberIds.length;
    final rem = e.amountMinor - share * e.memberIds.length;
    for (var i = 0; i < e.memberIds.length; i++) {
      final extra = i < rem ? 1 : 0;
      owed[e.memberIds[i]] = (owed[e.memberIds[i]] ?? 0) + share + extra;
    }
  }
  final ids = <int>{...paid.keys, ...owed.keys};
  return [
    for (final id in ids) CashierBalance(id, (paid[id] ?? 0) - (owed[id] ?? 0))
  ];
}

/// Bonifici minimi per saldare il conto. Restituisce coppie (da, a, importo).
List<List<int>> cashierTransfers(List<CashierBalance> balances) {
  final creditors = <(int, int)>[];
  final debtors = <(int, int)>[];
  for (final b in balances) {
    if (b.netMinor > 0) {
      creditors.add((b.personId, b.netMinor));
    } else if (b.netMinor < 0) {
      debtors.add((b.personId, -b.netMinor));
    }
  }
  creditors.sort((a, b) => b.$2 - a.$2);
  debtors.sort((a, b) => b.$2 - a.$2);
  final out = <List<int>>[];
  var ci = 0;
  var di = 0;
  while (ci < creditors.length && di < debtors.length) {
    final pid = creditors[ci].$1;
    var pc = creditors[ci].$2;
    final did = debtors[di].$1;
    var dc = debtors[di].$2;
    final amt = pc < dc ? pc : dc;
    out.add([did, pid, amt]);
    pc -= amt;
    dc -= amt;
    if (pc == 0) {
      ci++;
    } else {
      creditors[ci] = (pid, pc);
    }
    if (dc == 0) {
      di++;
    } else {
      debtors[di] = (did, dc);
    }
  }
  return out;
}

/// Testo piano per condividere il riepilogo.
String cashierSummaryText(CashierGroup group, {int exponent = 2}) {
  final b = StringBuffer();
  b.writeln('b-lance · ${group.name} · valuta ${group.currency}');
  b.writeln(
    'Totale speso: ${formatCashier(
      group.expenses.fold<int>(0, (s, e) => s + e.amountMinor),
      exponent,
    )} ${group.currency}',
  );
  b.writeln('');
  b.writeln('Saldi:');
  for (final bal in cashierBalances(group)) {
    final name = _personName(group, bal.personId);
    b.writeln('  $name: ${formatSignedCashier(bal.netMinor, exponent, group.currency)}');
  }
  final transfers = cashierTransfers(cashierBalances(group));
  if (transfers.isEmpty) {
    b.writeln('Conto saldato.');
  } else {
    b.writeln('');
    b.writeln('Chi paga a chi:');
    for (final t in transfers) {
      final from = _personName(group, t[0]);
      final to = _personName(group, t[1]);
      b.writeln('  $from -> $to: ${formatCashier(t[2], exponent)} ${group.currency}');
    }
  }
  return b.toString();
}

String _personName(CashierGroup group, int id) {
  final m = group.members.firstWhere(
    (m) => m.id == id,
    orElse: () => CashierPerson(id: id, name: '?'),
  );
  return m.name;
}

String formatCashier(int minor, int exponent) {
  final neg = minor < 0;
  final factor = _pow10(exponent);
  final major = (minor.abs() / factor).toStringAsFixed(exponent);
  final parts = major.split('.');
  final intPart = parts[0];
  final buf = StringBuffer();
  for (var i = 0; i < intPart.length; i++) {
    if (i > 0 && (intPart.length - i) % 3 == 0) buf.write('.');
    buf.write(intPart[i]);
  }
  final dec = parts.length > 1 ? ',${parts[1]}' : '';
  return '${neg ? '-' : ''}$buf$dec';
}

String formatSignedCashier(int minor, int exponent, String currency) {
  final sign = minor > 0 ? '+' : '';
  return '$sign${formatCashier(minor, exponent)} $currency';
}

int _pow10(int e) {
  var r = 1;
  for (var i = 0; i < e; i++) { r *= 10; }
  return r;
}
