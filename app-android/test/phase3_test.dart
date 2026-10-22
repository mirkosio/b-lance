import 'package:blance/categories.dart';
import 'package:blance/models.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('utente con handle', () {
    final u = User.fromJson({
      'id': 1,
      'name': 'Mirko',
      'email': 'm@example.com',
      'color': '#5F8D6E',
      'handle': 'mirkosio',
    });
    expect(u.handle, 'mirkosio');
  });

  test('ricorrenza: etichetta e parsing', () {
    final r = RecurringRule.fromJson({
      'id': 9,
      'group_id': 2,
      'description': 'Affitto',
      'category': 'bills',
      'amount_minor': 30000,
      'currency': 'EUR',
      'frequency': 'monthly',
      'interval': 2,
      'next_run': '2026-12-01T10:00:00Z',
      'active': true,
      'paid_by': 1,
      'members': [1, 2],
    });
    expect(r.frequencyLabel, 'Ogni 2 mese');
    expect(r.members, [1, 2]);
    expect(r.active, isTrue);
  });

  test('attivita con categoria', () {
    final a = ActivityItem.fromJson({
      'id': 3,
      'kind': 'expense',
      'group_id': 1,
      'group_name': 'Casa',
      'title': 'Pizza',
      'subtitle': 'ha pagato Mirko',
      'category': 'food',
      'amount_minor': 1200,
      'currency': 'EUR',
      'base_amount_minor': 1200,
      'base_currency': 'EUR',
      'created_at': '2026-10-22T18:00:00Z',
      'voided': false,
    });
    expect(a.category, 'food');
    expect(categoryInfo(a.category).label, 'Cibo');
  });

  test('categoria sconosciuta cade su Altro', () {
    expect(categoryInfo('boh').code, 'other');
  });
}
