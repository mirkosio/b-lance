import 'package:blance/filters.dart';
import 'package:blance/models.dart';
import 'package:flutter_test/flutter_test.dart';

Expense _expense({
  required int id,
  required String description,
  String category = 'food',
  required int paidBy,
  required String payerName,
  String? createdAt,
  List<Share> shares = const [],
  bool voided = false,
}) {
  return Expense(
    id: id,
    description: description,
    category: category,
    amountMinor: 1000,
    currency: 'EUR',
    baseAmountMinor: 1000,
    baseCurrency: 'EUR',
    paidBy: paidBy,
    createdBy: paidBy,
    payerName: payerName,
    createdAt: createdAt,
    splitMethod: 'even',
    shares: shares,
    voided: voided,
  );
}

Payment _payment({
  required int id,
  required int from,
  required int to,
  String? note,
  String? createdAt,
  bool voided = false,
}) {
  return Payment(
    id: id,
    fromUser: from,
    fromName: from == 1 ? 'Marco' : 'Luca',
    toUser: to,
    toName: to == 1 ? 'Marco' : 'Luca',
    amountMinor: 500,
    currency: 'EUR',
    note: note,
    voided: voided,
    createdAt: createdAt,
  );
}

void main() {
  final expenses = [
    _expense(
      id: 1,
      description: 'Cena',
      category: 'food',
      paidBy: 1,
      payerName: 'Marco',
      createdAt: '2026-10-20T20:00:00',
      shares: const [
        Share(userId: 1, amountMinor: 500),
        Share(userId: 2, amountMinor: 500),
      ],
    ),
    _expense(
      id: 2,
      description: 'Treno',
      category: 'transport',
      paidBy: 2,
      payerName: 'Luca',
      createdAt: '2026-09-02T09:00:00',
      voided: true,
    ),
    _expense(
      id: 3,
      description: 'Spesa',
      category: 'groceries',
      paidBy: 2,
      payerName: 'Luca',
      createdAt: null,
    ),
  ];

  test('categoria: filtra e tiene le annullate nello storico', () {
    final result = filterExpenses(expenses, category: 'transport');
    expect(result.map((e) => e.id), [2]);
    expect(result.single.voided, isTrue);
  });

  test('membro: include chi ha pagato o chi ha una quota', () {
    expect(filterExpenses(expenses, memberId: 1).map((e) => e.id), [1]);
    expect(filterExpenses(expenses, memberId: 2).map((e) => e.id), [1, 2, 3]);
  });

  test('periodo: estremi inclusivi', () {
    expect(
      filterExpenses(
        expenses,
        from: DateTime(2026, 9, 2),
        to: DateTime(2026, 9, 2),
      ).map((e) => e.id),
      [2],
    );
  });

  test('ricerca: descrizione, pagatore e categoria', () {
    expect(filterExpenses(expenses, query: 'marco').map((e) => e.id), [1]);
    expect(filterExpenses(expenses, query: 'transport').map((e) => e.id), [2]);
  });

  test('filtri combinati: categoria + membro + periodo', () {
    expect(
      filterExpenses(
        expenses,
        category: 'transport',
        memberId: 2,
        from: DateTime(2026, 9, 1),
        to: DateTime(2026, 9, 30),
      ).map((e) => e.id),
      [2],
    );
    expect(
      filterExpenses(
        expenses,
        category: 'food',
        memberId: 2,
        from: DateTime(2026, 9, 1),
        to: DateTime(2026, 9, 30),
      ),
      isEmpty,
    );
  });

  test('pagamenti: membro e ricerca', () {
    final payments = [
      _payment(
        id: 10,
        from: 1,
        to: 2,
        note: 'bonifico',
        createdAt: '2026-10-21T10:00:00',
      ),
      _payment(
        id: 11,
        from: 2,
        to: 1,
        note: 'acconto',
        createdAt: '2026-09-21T10:00:00',
        voided: true,
      ),
    ];
    expect(filterPayments(payments, memberId: 1).map((p) => p.id), [10, 11]);
    expect(filterPayments(payments, query: 'bonifico').map((p) => p.id), [10]);
    expect(
      filterPayments(
        payments,
        from: DateTime(2026, 10, 1),
        to: DateTime(2026, 10, 31),
      ).map((p) => p.id),
      [10],
    );
  });

  test('senza filtri restituisce tutto, annullate comprese', () {
    expect(filterExpenses(expenses).length, 3);
  });
}
