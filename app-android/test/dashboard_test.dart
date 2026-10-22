import 'package:blance/models.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('dashboard: gruppi e saldo per valuta', () {
    final d = Dashboard.fromJson({
      'groups': [
        {
          'id': 1,
          'name': 'Casa',
          'base_currency': 'EUR',
          'invite_code': 'ABC123',
          'member_count': 2,
          'net_minor': -450,
          'total_expenses_minor': 2000,
        },
      ],
      'net_by_currency': {'EUR': -450, 'USD': 1200},
    });
    expect(d.groups.single.name, 'Casa');
    expect(d.netByCurrency['EUR'], -450);
    expect(d.netByCurrency['USD'], 1200);
  });

  test('dashboard: senza saldi non esplode', () {
    final d = Dashboard.fromJson({'groups': []});
    expect(d.groups, isEmpty);
    expect(d.netByCurrency, isEmpty);
  });

  test('activity: spesa annullata e pagamento', () {
    final items = [
      ActivityItem.fromJson({
        'id': 4,
        'kind': 'expense',
        'group_id': 2,
        'group_name': 'Vacanza',
        'title': 'Cena',
        'subtitle': 'ha pagato Marco',
        'amount_minor': 3000,
        'currency': 'EUR',
        'base_amount_minor': 3000,
        'base_currency': 'EUR',
        'created_at': '2026-10-20T18:30:00',
        'voided': true,
      }),
      ActivityItem.fromJson({
        'id': 9,
        'kind': 'payment',
        'group_id': 2,
        'group_name': 'Vacanza',
        'title': 'Luca → Marco',
        'subtitle': 'bonifico',
        'amount_minor': 1500,
        'currency': 'EUR',
        'base_amount_minor': 1500,
        'base_currency': 'EUR',
        'created_at': null,
      }),
    ];
    expect(items[0].voided, isTrue);
    expect(items[0].isPayment, isFalse);
    expect(items[1].isPayment, isTrue);
    expect(items[1].subtitle, 'bonifico');
  });
}
