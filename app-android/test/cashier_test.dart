import 'package:flutter_test/flutter_test.dart';
import 'package:blance/cashier/cashier_models.dart';
import 'package:blance/cashier/cashier_service.dart';

void main() {
  group('cashier', () {
    test('split remainder', () {
      final group = CashierGroup(
        id: 1,
        name: 'T',
        currency: 'EUR',
        members: [
          CashierPerson(id: 1, name: 'A'),
          CashierPerson(id: 2, name: 'B'),
          CashierPerson(id: 3, name: 'C'),
        ],
        expenses: [
          CashierExpense(
            id: 1,
            description: 'Spesa',
            amountMinor: 100,
            paidById: 1,
            memberIds: [1, 2, 3],
          ),
        ],
      );
      final balances = cashierBalances(group);
      final a = balances.firstWhere((b) => b.personId == 1);
      final b = balances.firstWhere((b) => b.personId == 2);
      final c = balances.firstWhere((b) => b.personId == 3);
      expect(a.netMinor, 67);
      expect(b.netMinor, -33);
      expect(c.netMinor, -34);
    });

    test('balance and transfers', () {
      final group = CashierGroup(
        id: 1,
        name: 'T',
        currency: 'EUR',
        members: [
          CashierPerson(id: 1, name: 'A'),
          CashierPerson(id: 2, name: 'B'),
        ],
        expenses: [
          CashierExpense(
            id: 1,
            description: 'X',
            amountMinor: 100,
            paidById: 1,
            memberIds: [1, 2],
          ),
        ],
      );
      final balances = cashierBalances(group);
      expect(balances.length, 2);
      final transfers = cashierTransfers(balances);
      expect(transfers.length, 1);
      expect(transfers[0][0], 2);
      expect(transfers[0][1], 1);
      expect(transfers[0][2], 50);
    });

    test('summary text', () {
      final group = CashierGroup(
        id: 1,
        name: 'T',
        currency: 'EUR',
        members: [
          CashierPerson(id: 1, name: 'A'),
          CashierPerson(id: 2, name: 'B'),
        ],
        expenses: [
          CashierExpense(
            id: 1,
            description: 'X',
            amountMinor: 100,
            paidById: 1,
            memberIds: [1, 2],
          ),
        ],
      );
      final text = cashierSummaryText(group, exponent: 2);
      expect(text.contains('A'), isTrue);
      expect(text.contains('B'), isTrue);
      expect(text.contains('50,00'), isTrue);
    });

    test('json roundtrip', () {
      final group = CashierGroup(
        id: 1,
        name: 'T',
        currency: 'EUR',
        members: [CashierPerson(id: 1, name: 'A')],
        expenses: [
          CashierExpense(
            id: 1,
            description: 'X',
            amountMinor: 100,
            paidById: 1,
            memberIds: [1],
          ),
        ],
      );
      final restored = CashierGroup.fromJson(group.toJson());
      expect(restored.id, group.id);
      expect(restored.members.length, 1);
      expect(restored.expenses.length, 1);
      expect(restored.expenses[0].amountMinor, 100);
    });
  });
}