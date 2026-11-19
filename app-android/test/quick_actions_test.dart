import 'package:flutter_test/flutter_test.dart';
import 'package:blance/models.dart';
import 'package:blance/screens/main_shell.dart';

GroupSummary _group(int id) => GroupSummary(
      id: id,
      name: 'Gruppo $id',
      baseCurrency: 'EUR',
      inviteCode: 'CODE$id',
      memberCount: 2,
      netMinor: 0,
      totalExpensesMinor: 0,
    );

void main() {
  group('icone rapide dell\'app', () {
    test('nuova spesa senza gruppi apre prima la creazione del gruppo', () {
      expect(quickActionGroup(const []), isNull);
    });

    test('nuova spesa con gruppi sceglie il primo della dashboard', () {
      final groups = [_group(7), _group(3)];
      expect(quickActionGroup(groups), same(groups.first));
      expect(quickActionGroup(groups)!.id, 7);
    });
  });
}
