import 'package:flutter_test/flutter_test.dart';

import 'package:blance/models.dart';

void main() {
  test('spesa annullata: voided true e data di annullamento', () {
    final e = Expense.fromJson({
      'id': 1,
      'description': 'Cena',
      'category': 'food',
      'amount_minor': 3000,
      'currency': 'EUR',
      'base_amount_minor': 3000,
      'base_currency': 'EUR',
      'fx_rate': '1.0',
      'paid_by': 7,
      'created_by': 7,
      'payer_name': 'Marco',
      'created_at': '2026-10-22T18:00:00+00:00',
      'voided_at': '2026-10-22T19:00:00+00:00',
      'split_method': 'even',
      'shares': [
        {'user_id': 7, 'amount_minor': 1500},
        {'user_id': 8, 'amount_minor': 1500},
      ],
    });
    expect(e.voided, isTrue);
    expect(e.voidedAt, isNotNull);
    expect(e.category, 'food');
    expect(e.shares.length, 2);
    expect(e.shares.first.amountMinor, 1500);
  });

  test('spesa attiva: voided false anche senza campo', () {
    final e = Expense.fromJson({
      'id': 2,
      'description': 'Taxi',
      'amount_minor': 1200,
      'currency': 'EUR',
      'base_amount_minor': 1200,
      'base_currency': 'EUR',
      'paid_by': 7,
      'payer_name': 'Marco',
    });
    expect(e.voided, isFalse);
    expect(e.category, 'other');
    expect(e.splitMethod, 'even');
  });

  test('pagamento con nota e data', () {
    final p = Payment.fromJson({
      'id': 9,
      'from_user': 1,
      'from_name': 'Luca',
      'to_user': 2,
      'to_name': 'Marco',
      'amount_minor': 500,
      'currency': 'EUR',
      'note': 'bonifico',
      'created_at': '2026-10-22T20:00:00+00:00',
    });
    expect(p.note, 'bonifico');
    expect(p.createdAt, isNotNull);
  });

  test('anteprima invito', () {
    final p = InvitePreview.fromJson({
      'name': 'Vacanza',
      'base_currency': 'EUR',
      'member_count': 4,
    });
    expect(p.name, 'Vacanza');
    expect(p.memberCount, 4);
  });
}
