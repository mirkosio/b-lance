import 'package:flutter_test/flutter_test.dart';
import 'package:blance/notifications.dart';

void main() {
  group('promemoria locali', () {
    test('non si programmano se l\'utente non li ha attivati', () {
      expect(
        shouldScheduleReminder(
          enabled: false,
          hasOpenBalance: true,
          permissionGranted: true,
        ),
        isFalse,
      );
    });

    test('non si programmano se non ci sono debiti aperti', () {
      expect(
        shouldScheduleReminder(
          enabled: true,
          hasOpenBalance: false,
          permissionGranted: true,
        ),
        isFalse,
      );
    });

    test('non si programmano senza permesso di sistema', () {
      expect(
        shouldScheduleReminder(
          enabled: true,
          hasOpenBalance: true,
          permissionGranted: false,
        ),
        isFalse,
      );
    });

    test('si programmano solo con tutto questo insieme', () {
      expect(
        shouldScheduleReminder(
          enabled: true,
          hasOpenBalance: true,
          permissionGranted: true,
        ),
        isTrue,
      );
    });
  });
}
