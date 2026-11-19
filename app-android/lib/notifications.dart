import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Promemoria LOCALI: non passa nulla dal telefono al server.
/// Si attivano solo su richiesta, con permesso di sistema, e si possono
/// spegnere in qualsiasi momento dal profilo.
const String _enabledKey = 'bl_reminders_enabled_v1';
const int _reminderId = 7;

final FlutterLocalNotificationsPlugin _plugin =
    FlutterLocalNotificationsPlugin();

bool shouldScheduleReminder({
  required bool enabled,
  required bool hasOpenBalance,
  required bool permissionGranted,
}) =>
    enabled && hasOpenBalance && permissionGranted;

Future<void> initNotifications() async {
  const android = AndroidInitializationSettings('@mipmap/ic_launcher');
  await _plugin.initialize(
    settings: const InitializationSettings(android: android),
  );
}

Future<bool> _requestPermission() async {
  final android = _plugin
      .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
  final granted = await android?.requestNotificationsPermission() ?? false;
  return granted;
}

Future<bool> remindersEnabled() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getBool(_enabledKey) ?? false;
}

/// Ritorna false se il permesso è stato negato: in quel caso resta tutto off.
Future<bool> setRemindersEnabled(bool enabled) async {
  final prefs = await SharedPreferences.getInstance();
  if (!enabled) {
    await _plugin.cancel(id: _reminderId);
    await prefs.setBool(_enabledKey, false);
    return true;
  }
  if (!await _requestPermission()) return false;
  await prefs.setBool(_enabledKey, true);
  return true;
}

Future<void> syncReminder({required bool hasOpenBalance}) async {
  final enabled = await remindersEnabled();
  final android = _plugin
      .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
  final granted = await android?.areNotificationsEnabled() ?? true;
  if (!shouldScheduleReminder(
    enabled: enabled,
    hasOpenBalance: hasOpenBalance,
    permissionGranted: granted,
  )) {
    await _plugin.cancel(id: _reminderId);
    return;
  }
  final pending = await _plugin.pendingNotificationRequests();
  if (pending.any((n) => n.id == _reminderId)) return;
  await _plugin.periodicallyShow(
    id: _reminderId,
    title: 'Conti in sospeso',
    body: 'Controlla i saldi: un promemoria alla settimana, solo se ci sono debiti aperti.',
    repeatInterval: RepeatInterval.weekly,
    androidScheduleMode: AndroidScheduleMode.inexact,
    notificationDetails: const NotificationDetails(
      android: AndroidNotificationDetails(
        'promemoria_saldi',
        'Promemoria saldi',
        channelDescription: 'Un promemoria alla settimana sui conti aperti',
        importance: Importance.defaultImportance,
        priority: Priority.defaultPriority,
      ),
    ),
    payload: 'saldi',
  );
}
