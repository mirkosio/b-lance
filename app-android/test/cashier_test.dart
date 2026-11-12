import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:blance/cashier/cashier_models.dart';
import 'package:blance/cashier/cashier_service.dart';
import 'package:blance/cashier/cashier_summary_card.dart';

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

    test('payment reduces balances', () {
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
        payments: [
          CashierPayment(
            id: 1,
            fromId: 2,
            toId: 1,
            amountMinor: 50,
          ),
        ],
      );
      final balances = cashierBalances(group);
      expect(balances.firstWhere((b) => b.personId == 1).netMinor, 0);
      expect(balances.firstWhere((b) => b.personId == 2).netMinor, 0);
      expect(cashierTransfers(balances), isEmpty);
    });

    test('amount parser handles italian and english input', () {
      expect(parseCashierAmount('12,50', 2), 1250);
      expect(parseCashierAmount('12.50', 2), 1250);
      expect(parseCashierAmount('1.234,56', 2), 123456);
      expect(parseCashierAmount('1234', 2), 123400);
      expect(parseCashierAmount('100', 0), 100);
      expect(parseCashierAmount('12,345', 2), isNull);
      expect(parseCashierAmount('-5', 2), isNull);
      expect(parseCashierAmount('', 2), isNull);
      expect(cashierAmountInput(1250, 2), '12,50');
    });

    test('payment json roundtrip', () {
      final group = CashierGroup(
        id: 1,
        name: 'T',
        currency: 'EUR',
        members: [CashierPerson(id: 1, name: 'A')],
        payments: [
          CashierPayment(
            id: 7,
            fromId: 1,
            toId: 2,
            amountMinor: 500,
            note: 'bonifico',
          ),
        ],
      );
      final restored = CashierGroup.fromJson(group.toJson());
      expect(restored.payments.length, 1);
      expect(restored.payments[0].amountMinor, 500);
      expect(restored.payments[0].note, 'bonifico');
    });

    test('exact split uses custom amounts', () {
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
            amountMinor: 1000,
            paidById: 1,
            memberIds: [1, 2],
            splitMode: 'exact',
            exactMinor: {1: 700, 2: 300},
          ),
        ],
      );
      final balances = cashierBalances(group);
      expect(balances.firstWhere((b) => b.personId == 1).netMinor, 300);
      expect(balances.firstWhere((b) => b.personId == 2).netMinor, -300);
    });

    test('percent split distributes the remainder', () {
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
            description: 'X',
            amountMinor: 1000,
            paidById: 1,
            memberIds: [1, 2, 3],
            splitMode: 'percent',
            percentBp: {1: 3333, 2: 3333, 3: 3334},
          ),
        ],
      );
      final shares = cashierExpenseShares(group.expenses.first);
      expect(shares.fold<int>(0, (s, e) => s + e.value), 1000);
      expect(shares.firstWhere((e) => e.key == 3).value, 334);
      final balances = cashierBalances(group);
      expect(balances.firstWhere((b) => b.personId == 1).netMinor, 667);
    });

    test('old expenses without split fields still load as equal', () {
      final restored = CashierExpense.fromJson({
        'id': 1,
        'description': 'X',
        'amount_minor': 900,
        'paid_by_id': 1,
        'member_ids': [1, 2, 3],
        'currency': 'EUR',
      });
      expect(restored.splitMode, 'equal');
      expect(restored.exactMinor, isEmpty);
      expect(cashierBalances(
        CashierGroup(
          id: 1,
          name: 'T',
          members: [
            CashierPerson(id: 1, name: 'A'),
            CashierPerson(id: 2, name: 'B'),
            CashierPerson(id: 3, name: 'C'),
          ],
          expenses: [restored],
        ),
      ).length, 3);
    });

    testWidgets('summary card shows balances and transfers', (tester) async {
      tester.view.physicalSize = const Size(800, 1400);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.reset);

      final group = CashierGroup(
        id: 1,
        name: 'Weekend',
        currency: 'EUR',
        members: [
          CashierPerson(id: 1, name: 'A'),
          CashierPerson(id: 2, name: 'B'),
        ],
        expenses: [
          CashierExpense(
            id: 1,
            description: 'Cena',
            amountMinor: 1000,
            paidById: 1,
            memberIds: [1, 2],
          ),
        ],
      );
      final balances = cashierBalances(group);
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CashierSummaryCard(
              group: group,
              exponent: 2,
              balances: balances,
              transfers: cashierTransfers(balances),
            ),
          ),
        ),
      );
      expect(find.text('Weekend'), findsOneWidget);
      expect(find.text('B  →  A'), findsOneWidget);
      expect(find.text('5,00 EUR'), findsOneWidget);
    });

    test('share link keeps data after the hash and round-trips', () {
      final group = CashierGroup(
        id: 1,
        name: 'Weekend al mare',
        currency: 'EUR',
        members: [
          CashierPerson(id: 1, name: 'Marco', color: '#5F8D6E'),
          CashierPerson(id: 2, name: 'Sara', color: '#B4813F'),
        ],
        expenses: [
          CashierExpense(
            id: 1,
            description: 'Cena',
            amountMinor: 1000,
            paidById: 1,
            memberIds: [1, 2],
          ),
        ],
        payments: [
          CashierPayment(id: 1, fromId: 2, toId: 1, amountMinor: 300),
        ],
      );

      final url = cashierShareUrl(group);
      expect(url.startsWith('https://b-lance.vercel.app/cashier-link#c='), isTrue);
      expect(url.contains('Marco'), isFalse);
      expect(url.contains('Cena'), isFalse);
      expect(url.length, lessThan(600));

      final encoded = url.split('#c=').last;
      var padded = encoded;
      while (padded.length % 4 != 0) {
        padded += '=';
      }
      final payload = jsonDecode(
        utf8.decode(gzip.decode(base64Url.decode(padded))),
      ) as Map<String, dynamic>;
      expect(payload['name'], 'Weekend al mare');
      expect(payload['currency'], 'EUR');
      expect((payload['members'] as List).length, 2);
      expect((payload['expenses'] as List).first['amount_minor'], 1000);
      expect((payload['expenses'] as List).first['paid_by_id'], 1);
      expect((payload['payments'] as List).first['amount_minor'], 300);
      expect((payload['payments'] as List).first['from_id'], 2);
    });
  });
}