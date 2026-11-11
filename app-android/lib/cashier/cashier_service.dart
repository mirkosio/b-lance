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

/// Divide un importo in parti uguali, distribuendo il resto al centesimo.
List<int> cashierEqualShares(int amount, List<int> ids) {
  if (ids.isEmpty) return const [];
  final share = amount ~/ ids.length;
  final rem = amount - share * ids.length;
  return [
    for (var i = 0; i < ids.length; i++) share + (i < rem ? 1 : 0),
  ];
}

/// Quote di una spesa per i partecipanti, rispettando la modalità scelta.
/// Restituisce coppie (persona, importo) e la somma è sempre l'importo speso.
List<MapEntry<int, int>> cashierExpenseShares(CashierExpense e) {
  final ids = e.memberIds;
  if (ids.isEmpty) return const [];
  if (e.splitMode == 'exact') {
    final total = ids.fold<int>(0, (s, id) => s + (e.exactMinor[id] ?? 0));
    if (total == e.amountMinor) {
      return [for (final id in ids) MapEntry(id, e.exactMinor[id] ?? 0)];
    }
  } else if (e.splitMode == 'percent') {
    final totalBp = ids.fold<int>(0, (s, id) => s + (e.percentBp[id] ?? 0));
    if (totalBp > 0) {
      final shares = <int>[];
      final remainders = <int>[];
      var assigned = 0;
      for (final id in ids) {
        final bp = e.percentBp[id] ?? 0;
        final exact = e.amountMinor * bp;
        final share = exact ~/ totalBp;
        shares.add(share);
        remainders.add(exact % totalBp);
        assigned += share;
      }
      var left = e.amountMinor - assigned;
      final order = List<int>.generate(ids.length, (i) => i)
        ..sort((a, b) {
          final byRem = remainders[b].compareTo(remainders[a]);
          return byRem != 0 ? byRem : a.compareTo(b);
        });
      for (var i = 0; left > 0; i = (i + 1) % order.length) {
        shares[order[i]]++;
        left--;
      }
      return [
        for (var i = 0; i < ids.length; i++) MapEntry(ids[i], shares[i]),
      ];
    }
  }
  final equal = cashierEqualShares(e.amountMinor, ids);
  return [
    for (var i = 0; i < ids.length; i++) MapEntry(ids[i], equal[i]),
  ];
}

/// Saldo per ogni membro di un gruppo cassiere.
List<CashierBalance> cashierBalances(CashierGroup group) {
  final paid = <int, int>{};
  final owed = <int, int>{};
  for (final e in group.expenses) {
    paid[e.paidById] = (paid[e.paidById] ?? 0) + e.amountMinor;
    if (e.items.isNotEmpty) {
      // split a livello di singolo articolo
      for (final item in e.items) {
        final participants = item.memberIds.isEmpty ? e.memberIds : item.memberIds;
        if (participants.isEmpty) continue;
        final shares = cashierEqualShares(item.amountMinor, participants);
        for (var i = 0; i < participants.length; i++) {
          owed[participants[i]] = (owed[participants[i]] ?? 0) + shares[i];
        }
      }
    } else {
      for (final s in cashierExpenseShares(e)) {
        owed[s.key] = (owed[s.key] ?? 0) + s.value;
      }
    }
  }
  // Un pagamento sposta debito: chi paga vede salire il proprio netto,
  // chi incassa vede scendere il proprio credito.
  for (final p in group.payments) {
    paid[p.fromId] = (paid[p.fromId] ?? 0) + p.amountMinor;
    owed[p.toId] = (owed[p.toId] ?? 0) + p.amountMinor;
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

/// Converte quello che l'utente scrive in centesimi interi, senza passare
/// da double. Accetta "12,50", "12.50", "1.234,56" e "1234".
/// Restituisce null se il testo non è un importo valido.
int? parseCashierAmount(String raw, int exponent) {
  if (raw.contains('-')) return null;
  var s = raw.trim().replaceAll(RegExp(r'[^\d.,]'), '');
  if (s.isEmpty) return null;
  final lastComma = s.lastIndexOf(',');
  final lastDot = s.lastIndexOf('.');
  String intPart;
  String decPart;

  if (lastComma >= 0 && lastDot >= 0) {
    final decSep = lastComma > lastDot ? ',' : '.';
    final thouSep = decSep == ',' ? '.' : ',';
    s = s.replaceAll(thouSep, '');
    final parts = s.split(decSep);
    if (parts.length != 2) return null;
    intPart = parts[0];
    decPart = parts[1];
  } else if (lastComma >= 0) {
    final parts = s.split(',');
    if (parts.length != 2) return null;
    intPart = parts[0];
    decPart = parts[1];
  } else if (lastDot >= 0) {
    final parts = s.split('.');
    if (parts.length > 2) {
      // "1.234.567": tutti gruppi da tre = separatore delle migliaia.
      final groupsOk = parts.skip(1).every((p) => p.length == 3);
      if (!groupsOk || parts.first.isEmpty) return null;
      intPart = parts.join();
      decPart = '';
    } else {
      final before = parts[0];
      final after = parts[1];
      // "1.234" = millequattro; "12.50" = dodici e cinquanta.
      if (after.length == 3 && before.isNotEmpty && before.length <= 3) {
        intPart = before + after;
        decPart = '';
      } else {
        intPart = before;
        decPart = after;
      }
    }
  } else {
    intPart = s;
    decPart = '';
  }

  if (intPart.isEmpty) intPart = '0';
  if (!RegExp(r'^\d+$').hasMatch(intPart)) return null;
  if (decPart.isNotEmpty && !RegExp(r'^\d+$').hasMatch(decPart)) return null;
  if (decPart.length > exponent) return null;

  final major = int.tryParse(intPart);
  if (major == null) return null;
  final dec = exponent == 0
      ? 0
      : int.parse(decPart.padRight(exponent, '0'));
  return major * _pow10(exponent) + dec;
}

/// Importo formattato per il campo di input: "12,50", senza separatore
/// delle migliaia (che confonderebbe il parser).
String cashierAmountInput(int minor, int exponent) {
  if (exponent == 0) return '$minor';
  final factor = _pow10(exponent);
  final major = minor ~/ factor;
  final dec = (minor % factor).toString().padLeft(exponent, '0');
  return '$major,$dec';
}

int _pow10(int e) {
  var r = 1;
  for (var i = 0; i < e; i++) { r *= 10; }
  return r;
}
