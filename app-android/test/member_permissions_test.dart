import 'package:flutter_test/flutter_test.dart';
import 'package:blance/screens/group_screen.dart';

void main() {
  group('gestione membri nell\'app', () {
    test('il creatore può promuovere admin', () {
      expect(canPromoteMember(true, const []), isTrue);
    });

    test('un membro con permessi parziali non può promuovere admin', () {
      expect(
        canPromoteMember(false, const ['expense_manage', 'members_manage']),
        isFalse,
      );
    });

    test('un membro con tutti i permessi può promuovere admin', () {
      expect(
        canPromoteMember(false, const [
          'expense_manage',
          'payment_manage',
          'group_edit',
          'members_manage',
        ]),
        isTrue,
      );
    });
  });
}
