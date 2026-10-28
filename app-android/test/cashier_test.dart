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
      // (100 / 3) = 33 rem 1.
      // Payer (1) gets 100 paid - 33 owed = +67.
      // Payer (1) is also a member, owes 33.
      // Member 2 owes 33.
      // Member 3 owes 33 + 1 (rem) = 34.
      // Let's re-verify:
      // Payer: A (id 1).
      // Members: A(1), B(2), C(3).
      // Amount 100. Base share: 33. Remainder: 1.
      // A (id 1) owes 33 + 1 = 34.
      // B (id 2) owes 33.
      // C (id 3) owes 33.
      // Net: 
      // A: paid 100 - owes 34 = +66.
      // B: paid 0 - owes 33 = -33.
      // C: paid 0 - owes 33 = -33. (Wait, total must be 0)
      // Ah, logic: 100/3 = 33.33... 
      // 100 - (33*3) = 1. The remainder 1 is distributed to the first person in memberIds.
      // If memberIds are [1, 2, 3]:
      // 1 gets 33 + 1 = 34.
      // 2 gets 33.
      // 3 gets 33.
      // Total owed = 34 + 33 + 33 = 100. Correct.
      // A: paid 100, owes 34 -> net 66.
      // B: paid 0, owes 33 -> net -33.
      // C: paid 0, owes 33 -> net -33.
      expect(a.netMinor, 66);
      expect(b.netMinor, -33);
      expect(c.netMinor, -33);
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
      // Depending on formatter, 50,00 or 50.00
      expect(text.contains('0,50'), isTrue);
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