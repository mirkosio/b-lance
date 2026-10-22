import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';
import '../theme_controller.dart';
import '../ui.dart';
import 'login_screen.dart';

/// Profilo: aspetto, sicurezza, informazioni. Niente impostazioni finte.
class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key, required this.api, required this.user});

  final Api api;
  final User user;

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool _busy = false;

  String get _host {
    try {
      return Uri.parse(kApiBase).host;
    } catch (_) {
      return kApiBase;
    }
  }

  void _snack(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  Future<void> _logoutAll() async {
    hapticConfirm();
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Uscire da tutti i dispositivi?'),
        content: const Text(
          'Gli altri telefoni dovranno entrare di nuovo. '
          'Questo dispositivo resta collegato.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Annulla'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(minimumSize: const Size(100, 44)),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Esci dagli altri'),
          ),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    setState(() => _busy = true);
    try {
      await widget.api.logoutAll();
      if (!mounted) return;
      hapticConfirm();
      _snack('Fatto: gli altri dispositivi sono stati disconnessi.');
    } on ApiException catch (e) {
      _snack(e.message);
    } catch (e) {
      _snack(describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _logout() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Uscire?'),
        content: const Text(
          'Dovrai inserire email e password la prossima volta.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Annulla'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(minimumSize: const Size(100, 44)),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Esci'),
          ),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    // Il logout locale non deve mai bloccare l'uscita.
    try {
      await widget.api.logout();
    } catch (_) {}
    if (!mounted) return;
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (_) => LoginScreen(api: widget.api)),
      (_) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    final dark = Theme.of(context).brightness == Brightness.dark;
    final accent = dark ? sage : sageInk;
    return Scaffold(
      appBar: AppBar(title: const Text('Profilo')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 4, 16, 32),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(18),
              child: Row(
                children: [
                  Container(
                    width: 56,
                    height: 56,
                    decoration: BoxDecoration(
                      color: parseHexColor(widget.user.color),
                      shape: BoxShape.circle,
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      widget.user.name.isEmpty
                          ? '?'
                          : widget.user.name.characters.first.toUpperCase(),
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w800,
                        fontSize: 22,
                      ),
                    ),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.user.name,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontWeight: FontWeight.w800,
                            fontSize: 17,
                          ),
                        ),
                        const SizedBox(height: 3),
                        Text(
                          widget.user.email,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontSize: 13,
                            color: mutedOn(context),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          _MenuCard(
            children: [
              ValueListenableBuilder<ThemeMode>(
                valueListenable: themeMode,
                builder: (ctx, mode, _) {
                  final label = switch (mode) {
                    ThemeMode.light => 'Chiaro',
                    ThemeMode.dark => 'Scuro',
                    _ => 'Segui il sistema',
                  };
                  return ListTile(
                    leading: Icon(Icons.palette_outlined, color: accent),
                    title: const Text('Tema'),
                    subtitle: Text(label),
                    trailing: const Icon(Icons.chevron_right, size: 20),
                    onTap: () => showThemePicker(context),
                  );
                },
              ),
            ],
          ),
          const SizedBox(height: 16),
          _MenuCard(
            children: [
              ListTile(
                enabled: !_busy,
                leading: Icon(Icons.devices_outlined, color: accent),
                title: const Text('Esci da tutti i dispositivi'),
                subtitle: const Text('Revoca gli accessi sugli altri telefoni'),
                trailing: _busy
                    ? const SizedBox(
                        width: 18,
                        height: 18,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.chevron_right, size: 20),
                onTap: _busy ? null : _logoutAll,
              ),
              const Divider(indent: 16, endIndent: 16),
              ListTile(
                leading: const Icon(Icons.logout, color: negColor),
                title: const Text('Esci'),
                trailing: const Icon(Icons.chevron_right, size: 20),
                onTap: _logout,
              ),
            ],
          ),
          const SizedBox(height: 16),
          _MenuCard(
            children: [
              ListTile(
                leading: Icon(Icons.info_outline, color: accent),
                title: const Text('Versione'),
                trailing: Text(
                  kAppVersion,
                  style: TextStyle(fontSize: 13, color: mutedOn(context)),
                ),
              ),
              const Divider(indent: 16, endIndent: 16),
              ListTile(
                leading: Icon(Icons.cloud_outlined, color: accent),
                title: const Text('Server'),
                subtitle: Text(_host),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Center(
            child: Text(
              'b-lance · dividi le spese, non le amicizie',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 12, color: mutedOn(context)),
            ),
          ),
        ],
      ),
    );
  }
}

/// Gruppo di voci dentro una card, con divisori leggeri.
class _MenuCard extends StatelessWidget {
  const _MenuCard({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAlias,
      child: Column(children: children),
    );
  }
}
