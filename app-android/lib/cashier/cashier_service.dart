/// Logica di bilancio per la modalità cassiere locale (nessun server).
///
/// Importi in centesimi interi. Deterministico: stesso storico -> stessi saldi.
library;

import 'cashier_models.dart';

import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;

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
        final participants = item.memberIds.isEmpty
            ? e.memberIds
            : item.memberIds;
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
    for (final id in ids) CashierBalance(id, (paid[id] ?? 0) - (owed[id] ?? 0)),
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
    'Totale speso: ${formatCashier(group.expenses.fold<int>(0, (s, e) => s + e.amountMinor), exponent)} ${group.currency}',
  );
  b.writeln('');
  b.writeln('Saldi:');
  for (final bal in cashierBalances(group)) {
    final name = _personName(group, bal.personId);
    b.writeln(
      '  $name: ${formatSignedCashier(bal.netMinor, exponent, group.currency)}',
    );
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
      b.writeln(
        '  $from -> $to: ${formatCashier(t[2], exponent)} ${group.currency}',
      );
    }
  }
  return b.toString();
}

/// PDF del riepilogo creato in memoria sul dispositivo, senza richieste di rete.
Future<List<int>> cashierSummaryPdf(
  CashierGroup group, {
  int exponent = 2,
}) async {
  final createdAt = DateTime.now();
  final document = pw.Document(
    title: 'b-lance - ${group.name}',
    author: 'b-lance',
  );
  final ink = PdfColor.fromInt(0xff242b27);
  final muted = PdfColor.fromInt(0xff5f6a62);
  final green = PdfColor.fromInt(0xff47684f);
  final border = PdfColor.fromInt(0xffe5e2d8);
  final total = group.expenses.fold<int>(
    0,
    (sum, expense) => sum + expense.amountMinor,
  );
  final balances = cashierBalances(group);
  final transfers = cashierTransfers(balances);
  String personName(int id) => _personName(group, id);
  pw.Widget heading(String value) => pw.Padding(
    padding: const pw.EdgeInsets.only(top: 18, bottom: 8),
    child: pw.Text(
      value,
      style: pw.TextStyle(
        fontSize: 14,
        fontWeight: pw.FontWeight.bold,
        color: ink,
      ),
    ),
  );
  pw.Widget cell(
    String value, {
    bool bold = false,
    pw.Alignment align = pw.Alignment.centerLeft,
  }) => pw.Container(
    alignment: align,
    padding: const pw.EdgeInsets.symmetric(vertical: 7, horizontal: 6),
    child: pw.Text(
      value,
      style: pw.TextStyle(
        fontSize: 9.5,
        fontWeight: bold ? pw.FontWeight.bold : pw.FontWeight.normal,
        color: ink,
      ),
    ),
  );

  document.addPage(
    pw.MultiPage(
      pageFormat: PdfPageFormat.a4,
      margin: const pw.EdgeInsets.fromLTRB(42, 40, 42, 44),
      footer: (context) => pw.Container(
        padding: const pw.EdgeInsets.only(top: 9),
        decoration: pw.BoxDecoration(
          border: pw.Border(top: pw.BorderSide(color: border)),
        ),
        child: pw.Row(
          mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
          children: [
            pw.Text(
              'b-lance - creato sul dispositivo',
              style: pw.TextStyle(fontSize: 8, color: muted),
            ),
            pw.Text(
              '${context.pageNumber} / ${context.pagesCount}',
              style: pw.TextStyle(fontSize: 8, color: muted),
            ),
          ],
        ),
      ),
      build: (context) => [
        pw.Row(
          children: [
            pw.Container(
              width: 30,
              height: 30,
              alignment: pw.Alignment.center,
              decoration: pw.BoxDecoration(
                color: green,
                borderRadius: pw.BorderRadius.circular(9),
              ),
              child: pw.Text(
                'b',
                style: pw.TextStyle(
                  fontSize: 18,
                  fontWeight: pw.FontWeight.bold,
                  color: PdfColors.white,
                ),
              ),
            ),
            pw.SizedBox(width: 10),
            pw.Text(
              'b-lance',
              style: pw.TextStyle(
                fontSize: 14,
                fontWeight: pw.FontWeight.bold,
                color: ink,
              ),
            ),
            pw.Spacer(),
            pw.Text(
              '${createdAt.day.toString().padLeft(2, '0')}/${createdAt.month.toString().padLeft(2, '0')}/${createdAt.year}',
              style: pw.TextStyle(fontSize: 9, color: muted),
            ),
          ],
        ),
        pw.SizedBox(height: 26),
        pw.Text(
          group.name,
          style: pw.TextStyle(
            fontSize: 24,
            fontWeight: pw.FontWeight.bold,
            color: ink,
          ),
        ),
        pw.SizedBox(height: 4),
        pw.Text(
          'Riepilogo spese e saldi - ${group.currency}',
          style: pw.TextStyle(fontSize: 10, color: muted),
        ),
        pw.SizedBox(height: 18),
        pw.Container(
          width: double.infinity,
          padding: const pw.EdgeInsets.all(16),
          decoration: pw.BoxDecoration(
            color: PdfColor.fromInt(0xffeef2ed),
            borderRadius: pw.BorderRadius.circular(12),
          ),
          child: pw.Column(
            crossAxisAlignment: pw.CrossAxisAlignment.start,
            children: [
              pw.Text(
                'Totale speso',
                style: pw.TextStyle(fontSize: 9, color: muted),
              ),
              pw.SizedBox(height: 3),
              pw.Text(
                '${formatCashier(total, exponent)} ${group.currency}',
                style: pw.TextStyle(
                  fontSize: 21,
                  fontWeight: pw.FontWeight.bold,
                  color: green,
                ),
              ),
            ],
          ),
        ),
        heading('Saldi'),
        pw.Table(
          border: pw.TableBorder(
            horizontalInside: pw.BorderSide(color: border),
          ),
          columnWidths: const {
            0: pw.FlexColumnWidth(2),
            1: pw.FlexColumnWidth(1),
          },
          children: [
            for (final balance in balances)
              pw.TableRow(
                children: [
                  cell(personName(balance.personId)),
                  cell(
                    balance.netMinor == 0
                        ? 'In pari'
                        : formatSignedCashier(
                            balance.netMinor,
                            exponent,
                            group.currency,
                          ),
                    align: pw.Alignment.centerRight,
                    bold: true,
                  ),
                ],
              ),
          ],
        ),
        heading('Chi paga a chi'),
        if (transfers.isEmpty)
          pw.Text(
            'Conto saldato.',
            style: pw.TextStyle(fontSize: 9.5, color: muted),
          )
        else
          pw.Table(
            border: pw.TableBorder(
              horizontalInside: pw.BorderSide(color: border),
            ),
            columnWidths: const {
              0: pw.FlexColumnWidth(2),
              1: pw.FlexColumnWidth(1),
            },
            children: [
              for (final transfer in transfers)
                pw.TableRow(
                  children: [
                    cell(
                      '${personName(transfer[0])} paga ${personName(transfer[1])}',
                    ),
                    cell(
                      '${formatCashier(transfer[2], exponent)} ${group.currency}',
                      align: pw.Alignment.centerRight,
                      bold: true,
                    ),
                  ],
                ),
            ],
          ),
        heading('Spese'),
        if (group.expenses.isEmpty)
          pw.Text(
            'Nessuna spesa registrata.',
            style: pw.TextStyle(fontSize: 9.5, color: muted),
          )
        else
          for (final expense in group.expenses) ...[
            pw.Container(
              margin: const pw.EdgeInsets.only(top: 8),
              padding: const pw.EdgeInsets.symmetric(
                vertical: 8,
                horizontal: 10,
              ),
              decoration: pw.BoxDecoration(
                color: PdfColor.fromInt(0xfff6f5ef),
                borderRadius: pw.BorderRadius.circular(8),
              ),
              child: pw.Row(
                children: [
                  pw.Expanded(
                    child: pw.Text(
                      expense.description,
                      style: pw.TextStyle(
                        fontSize: 10,
                        fontWeight: pw.FontWeight.bold,
                        color: ink,
                      ),
                    ),
                  ),
                  pw.Text(
                    '${formatCashier(expense.amountMinor, exponent)} ${expense.currency}',
                    style: pw.TextStyle(
                      fontSize: 10,
                      fontWeight: pw.FontWeight.bold,
                      color: ink,
                    ),
                  ),
                ],
              ),
            ),
            pw.Padding(
              padding: const pw.EdgeInsets.only(left: 10, top: 4),
              child: pw.Text(
                'Pagato da ${personName(expense.paidById)}',
                style: pw.TextStyle(fontSize: 8.5, color: muted),
              ),
            ),
            if (expense.items.isNotEmpty)
              for (final item in expense.items)
                pw.Padding(
                  padding: const pw.EdgeInsets.only(left: 10, top: 3),
                  child: pw.Text(
                    '${item.description} - ${formatCashier(item.amountMinor, exponent)} ${expense.currency} - ${((item.memberIds.isEmpty ? expense.memberIds : item.memberIds).map(personName)).join(', ')}',
                    style: pw.TextStyle(fontSize: 8.5, color: muted),
                  ),
                )
            else
              pw.Padding(
                padding: const pw.EdgeInsets.only(left: 10, top: 3),
                child: pw.Text(
                  'Partecipano: ${expense.memberIds.map(personName).join(', ')}',
                  style: pw.TextStyle(fontSize: 8.5, color: muted),
                ),
              ),
          ],
      ],
    ),
  );
  return document.save();
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
  for (var i = 0; i < e; i++) {
    r *= 10;
  }
  return r;
}
