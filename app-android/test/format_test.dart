import 'package:flutter_test/flutter_test.dart';

import 'package:blance/ui.dart';

void main() {
  group('formatMinor', () {
    test('due decimali con separatore italiano', () {
      expect(formatMinor(1250, 2), '12,50');
      expect(formatMinor(0, 2), '0,00');
      expect(formatMinor(5, 2), '0,05');
    });

    test('migliaia col punto', () {
      expect(formatMinor(100000, 2), '1.000,00');
      expect(formatMinor(123456789, 2), '1.234.567,89');
    });

    test('negativi e zero decimali', () {
      expect(formatMinor(-500, 2), '-5,00');
      expect(formatMinor(1250, 0), '1.250');
    });
  });

  group('formatSigned', () {
    test('segno solo se positivo', () {
      expect(formatSigned(1500, 2, 'EUR'), '+15,00 EUR');
      expect(formatSigned(-1500, 2, 'EUR'), '-15,00 EUR');
      expect(formatSigned(0, 2, 'EUR'), '0,00 EUR');
    });
  });

  group('formatDateTime', () {
    test('data ISO in ora locale', () {
      final iso = DateTime(2026, 10, 22, 18, 5).toUtc().toIso8601String();
      final out = formatDateTime(iso);
      expect(out, contains('22/10/2026'));
      expect(out, contains(':'));
    });

    test('valori non validi non esplodono', () {
      expect(formatDateTime(null), '');
      expect(formatDateTime('non-una-data'), '');
    });
  });

  test('splitMethodLabel', () {
    expect(splitMethodLabel('even'), 'Divisa in parti uguali');
    expect(splitMethodLabel('exact'), 'Importi fissi');
    expect(splitMethodLabel('percent'), 'Percentuali');
  });
}
