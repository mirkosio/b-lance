import 'package:flutter_test/flutter_test.dart';
import 'package:blance/receipt_parser.dart';

void main() {
  group('ricevute: bozza da rivedere', () {
    test('legge importo e descrizione italiani', () {
      final draft = parseReceipt(
        'BAR CENTRALE\nVia Roma 1\nCAFFE 1,20\nTOTALE 12,50 EUR\n',
      );
      expect(draft.description, 'BAR CENTRALE');
      expect(draft.amountMinor, 1250);
      expect(draft.lines.length, 4);
    });

    test('legge importi con punto e sceglie il totale', () {
      final draft = parseReceipt('MARKET\nSubtotale 4.90\nTOTAL 23.40 USD');
      expect(draft.amountMinor, 2340);
    });

    test('senza importo lascia zero e chiede revisione', () {
      final draft = parseReceipt('RICEVUTA\nSENZA IMPORTO');
      expect(draft.amountMinor, 0);
      expect(draft.description, 'RICEVUTA');
    });
  });
}
