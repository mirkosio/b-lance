import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Tema scelto dall'utente: sistema / chiaro / scuro.
///
/// Le preferenze sono lette all'avvio senza bloccare l'app, come il token.
final ValueNotifier<ThemeMode> themeMode = ValueNotifier(ThemeMode.system);

const _themeKey = 'bl_theme';

Future<void> loadThemeMode() async {
  try {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_themeKey);
    themeMode.value = switch (raw) {
      'light' => ThemeMode.light,
      'dark' => ThemeMode.dark,
      _ => ThemeMode.system,
    };
  } catch (_) {
    // Storage non disponibile: resta "sistema".
  }
}

Future<void> setThemeMode(ThemeMode mode) async {
  themeMode.value = mode;
  try {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
      _themeKey,
      switch (mode) {
        ThemeMode.light => 'light',
        ThemeMode.dark => 'dark',
        _ => 'system',
      },
    );
  } catch (_) {
    // Vale solo per questa sessione.
  }
}

Future<void> showThemePicker(BuildContext context) async {
  final chosen = await showModalBottomSheet<ThemeMode>(
    context: context,
    useSafeArea: true,
    builder: (ctx) {
      final current = themeMode.value;
      return SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const SizedBox(height: 10),
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Theme.of(ctx)
                    .colorScheme
                    .onSurface
                    .withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(4),
              ),
            ),
            const Padding(
              padding: EdgeInsets.fromLTRB(20, 14, 20, 6),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Tema',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
                ),
              ),
            ),
            for (final entry in const [
              (ThemeMode.system, 'Segui il sistema', Icons.brightness_auto),
              (ThemeMode.light, 'Chiaro', Icons.light_mode_outlined),
              (ThemeMode.dark, 'Scuro', Icons.dark_mode_outlined),
            ])
              ListTile(
                leading: Icon(entry.$3),
                title: Text(entry.$2),
                trailing: current == entry.$1 ? const Icon(Icons.check) : null,
                onTap: () => Navigator.pop(ctx, entry.$1),
              ),
            const SizedBox(height: 8),
          ],
        ),
      );
    },
  );
  if (chosen != null) await setThemeMode(chosen);
}
