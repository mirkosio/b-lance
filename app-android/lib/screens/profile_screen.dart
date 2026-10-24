import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';
import '../theme_controller.dart';
import '../sheets/about_sheet.dart';
import '../ui.dart';
import 'login_screen.dart';

/// Profilo: account, aspetto, sicurezza. Niente impostazioni finte.
class ProfileScreen extends StatefulWidget {
  const ProfileScreen({
    super.key,
    required this.api,
    required this.user,
    this.onUserChanged,
  });

  final Api api;
  final User user;
  final ValueChanged<User>? onUserChanged;

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool _busy = false;

  void _snack(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  Future<void> _editAccount() async {
    final updated = await showModalBottomSheet<User>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      builder: (_) => _EditAccountSheet(api: widget.api, user: widget.user),
    );
    if (updated != null) {
      widget.onUserChanged?.call(updated);
      _snack('Profilo aggiornato');
    }
  }

  Future<void> _deleteAccount() async {
    hapticConfirm();
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Eliminare l\'account?'),
        content: const Text(
          'Il tuo nome diventa "Ex-membro". Email, password e username '
          'spariscono. Spese e pagamenti restano nei gruppi: i saldi non '
          'si toccano.\n\nNon si torna indietro.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Indietro'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: negColor,
              minimumSize: const Size(120, 44),
            ),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Elimina account'),
          ),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    setState(() => _busy = true);
    try {
      await widget.api.deleteAccount();
      if (!mounted) return;
      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(
          builder: (_) => LoginScreen(
            api: widget.api,
            notice: 'Account eliminato. Grazie per aver usato b-lance.',
          ),
        ),
        (_) => false,
      );
    } on ApiException catch (e) {
      _snack(e.message);
    } catch (e) {
      _snack(describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _changePassword() async {
    final changed = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      builder: (_) => _ChangePasswordSheet(api: widget.api),
    );
    if (changed == true) {
      _snack('Password cambiata. Gli altri dispositivi sono disconnessi.');
    }
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
    final user = widget.user;
    return Scaffold(
      appBar: AppBar(title: const Text('Profilo')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 4, 16, 32),
        children: [
          Card(
            child: InkWell(
              borderRadius: BorderRadius.circular(16),
              onTap: _busy ? null : _editAccount,
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Row(
                  children: [
                    Container(
                      width: 58,
                      height: 58,
                      decoration: BoxDecoration(
                        color: parseHexColor(user.color),
                        shape: BoxShape.circle,
                      ),
                      alignment: Alignment.center,
                      child: Text(
                        user.name.isEmpty
                            ? '?'
                            : user.name.characters.first.toUpperCase(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w800,
                          fontSize: 23,
                        ),
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            user.name,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              fontWeight: FontWeight.w800,
                              fontSize: 17,
                            ),
                          ),
                          const SizedBox(height: 3),
                          Text(
                            user.handle == null || user.handle!.isEmpty
                                ? user.email
                                : '@${user.handle}',
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
                    Icon(Icons.edit_outlined, size: 20, color: accent),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          _MenuCard(
            children: [
              ListTile(
                leading: Icon(Icons.person_outline, color: accent),
                title: const Text('Nome, colore e username'),
                subtitle: const Text('Come ti vedono gli altri membri'),
                trailing: const Icon(Icons.chevron_right, size: 20),
                onTap: _busy ? null : _editAccount,
              ),
              const Divider(indent: 16, endIndent: 16),
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
                leading: Icon(Icons.password_outlined, color: accent),
                title: const Text('Cambia password'),
                subtitle: const Text(
                  'Gli altri dispositivi verranno disconnessi',
                ),
                trailing: const Icon(Icons.chevron_right, size: 20),
                onTap: _busy ? null : _changePassword,
              ),
              const Divider(indent: 16, endIndent: 16),
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
                leading: Icon(Icons.logout, color: negOn(context)),
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
                title: const Text('Informazioni su b-lance'),
                subtitle: const Text('Versione, privacy, come funziona'),
                trailing: const Icon(Icons.chevron_right, size: 20),
                onTap: () => showAboutSheet(context),
              ),
              const Divider(indent: 16, endIndent: 16),
              ListTile(
                leading: Icon(Icons.tag, color: accent),
                title: const Text('Versione'),
                trailing: Text(
                  kAppVersion,
                  style: TextStyle(fontSize: 13, color: mutedOn(context)),
                ),
              ),
              const Divider(indent: 16, endIndent: 16),
              ListTile(
                enabled: !_busy,
                leading: Icon(
                  Icons.person_remove_outlined,
                  color: negOn(context),
                ),
                title: const Text('Elimina account'),
                subtitle: const Text(
                  'Anonimizza il profilo, lascia intatte le spese',
                ),
                onTap: _busy ? null : _deleteAccount,
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

const _palette = <String>[
  '#5F8D6E',
  '#477C9B',
  '#5B6FA8',
  '#A45B7E',
  '#B4653A',
  '#9A6B2F',
  '#B24A4A',
  '#7A847D',
];

class _EditAccountSheet extends StatefulWidget {
  const _EditAccountSheet({required this.api, required this.user});

  final Api api;
  final User user;

  @override
  State<_EditAccountSheet> createState() => _EditAccountSheetState();
}

class _EditAccountSheetState extends State<_EditAccountSheet> {
  late final _name = TextEditingController(text: widget.user.name);
  late final _username = TextEditingController(text: widget.user.handle ?? '');
  late String _color = widget.user.color;
  String? _error;
  bool _busy = false;

  @override
  void dispose() {
    _name.dispose();
    _username.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    final name = _name.text.trim();
    if (name.isEmpty) {
      setState(() => _error = 'Il nome non può essere vuoto');
      return;
    }
    final username = _username.text.trim().replaceFirst('@', '').toLowerCase();
    if (username.isNotEmpty &&
        !RegExp(r'^[a-z0-9_]{3,20}$').hasMatch(username)) {
      setState(
        () =>
            _error = 'Username: 3-20 caratteri, lettere minuscole, numeri o _',
      );
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final user = await widget.api.updateMe(
        name: name,
        color: _color,
        handle: username,
        changeHandle: true,
      );
      if (!mounted) return;
      Navigator.pop(context, user);
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _busy = false;
        _error = e.message;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _busy = false;
        _error = describeError(e);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 10, 20, 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.only(bottom: 14),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.onSurface
                      .withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
            ),
            const Text(
              'Il tuo profilo',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 14),
            TextField(
              controller: _name,
              textCapitalization: TextCapitalization.words,
              decoration: InputDecoration(labelText: 'Nome', errorText: _error),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _username,
              autocorrect: false,
              decoration: const InputDecoration(
                labelText: 'username',
                prefixText: '@',
                hintText: 'mirkosio',
                helperText:
                    'Serve per farti invitare senza condividere la rubrica.',
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Colore del tuo avatar',
              style: TextStyle(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 10),
            Wrap(
              spacing: 10,
              runSpacing: 10,
              children: [
                for (final c in _palette)
                  InkWell(
                    borderRadius: BorderRadius.circular(999),
                    onTap: () {
                      hapticTap();
                      setState(() => _color = c);
                    },
                    child: Container(
                      width: 38,
                      height: 38,
                      decoration: BoxDecoration(
                        color: parseHexColor(c),
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: _color.toUpperCase() == c
                              ? Theme.of(context).colorScheme.onSurface
                              : Colors.transparent,
                          width: 2.5,
                        ),
                      ),
                      child: _color.toUpperCase() == c
                          ? const Icon(
                              Icons.check,
                              size: 19,
                              color: Colors.white,
                            )
                          : null,
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 20),
            FilledButton(
              onPressed: _busy ? null : _save,
              child: _busy
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : const Text('Salva'),
            ),
          ],
        ),
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

class _ChangePasswordSheet extends StatefulWidget {
  const _ChangePasswordSheet({required this.api});

  final Api api;

  @override
  State<_ChangePasswordSheet> createState() => _ChangePasswordSheetState();
}

class _ChangePasswordSheetState extends State<_ChangePasswordSheet> {
  final _current = TextEditingController();
  final _next = TextEditingController();
  final _confirm = TextEditingController();
  String? _error;
  bool _busy = false;

  @override
  void dispose() {
    _current.dispose();
    _next.dispose();
    _confirm.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    if (_next.text.length < 6) {
      setState(
        () => _error = 'La nuova password deve avere almeno 6 caratteri',
      );
      return;
    }
    if (_next.text != _confirm.text) {
      setState(() => _error = 'Le due password nuove non coincidono');
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await widget.api.changePassword(current: _current.text, next: _next.text);
      if (!mounted) return;
      Navigator.pop(context, true);
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _busy = false;
        _error = e.message;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _busy = false;
        _error = describeError(e);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Cambia password',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 14),
            TextField(
              controller: _current,
              obscureText: true,
              autofillHints: const [AutofillHints.password],
              decoration: const InputDecoration(labelText: 'Password attuale'),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _next,
              obscureText: true,
              autofillHints: const [AutofillHints.newPassword],
              decoration: InputDecoration(
                labelText: 'Nuova password',
                errorText: _error,
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _confirm,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Ripeti la nuova password',
              ),
            ),
            const SizedBox(height: 18),
            FilledButton(
              onPressed: _busy ? null : _save,
              child: _busy
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : const Text('Aggiorna password'),
            ),
          ],
        ),
      ),
    );
  }
}
