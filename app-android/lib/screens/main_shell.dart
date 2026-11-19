import 'dart:async';

import 'package:app_links/app_links.dart';
import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';
import '../sheets/group_sheets.dart';
import '../ui.dart';
import 'activity_screen.dart';
import 'group_screen.dart';
import 'groups_screen.dart';
import 'home_screen.dart';
import 'profile_screen.dart';

/// Il gruppo usato da "Nuova spesa" quando arriva da un'icona della home
/// del telefono: il primo della dashboard, ché il server non restituisce
/// una data di ultimo accesso. Senza gruppi non c'è dove mettere la spesa.
GroupSummary? quickActionGroup(List<GroupSummary> groups) =>
    groups.isEmpty ? null : groups.first;

/// Contenitore principale: quattro sezioni, come un'app bancaria.
/// IndexedStack tiene vive le schermate; un contatore "revisione" le
/// avvisa quando i dati cambiano (gruppo creato, spesa aggiunta...).
class MainShell extends StatefulWidget {
  const MainShell({
    super.key,
    required this.api,
    required this.user,
    this.initialQuickAction,
  });

  final Api api;
  final User user;

  /// Azione arrivata da un'icona premuta prima dell'avvio: va eseguita
  /// quando la shell è in piedi, non sulla schermata di caricamento.
  final String? initialQuickAction;

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _index = 0;
  int _revision = 0;
  late User _user = widget.user;
  final _links = AppLinks();
  StreamSubscription<Uri>? _linkSub;
  String? _lastLink;

  @override
  void initState() {
    super.initState();
    _linkSub = _links.uriLinkStream.listen(_handleLink);
    _links.getInitialLink().then((uri) {
      if (uri != null) _handleLink(uri);
    });
    final action = widget.initialQuickAction;
    if (action != null) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _runQuickAction(action));
    }
  }

  Future<void> _runQuickAction(String type) async {
    if (!mounted) return;
    if (type == 'nuovo_gruppo') {
      await _newGroupFromQuickAction(openExpense: false);
      return;
    }
    if (type != 'nuova_spesa') return;
    try {
      final groups = await widget.api.groups();
      if (!mounted) return;
      final group = quickActionGroup(groups);
      if (group == null) {
        // Nessun gruppo: non c'è dove mettere la spesa. Apriamo il foglio
        // di creazione e, una volta creato, il foglio spesa.
        await _newGroupFromQuickAction(openExpense: true);
        return;
      }
      await _openGroup(group.id, group.name, openExpense: true);
    } on ApiException catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.message)),
      );
    }
  }

  Future<void> _newGroupFromQuickAction({required bool openExpense}) async {
    final created = await showNewGroupSheet(context, api: widget.api);
    if (created == null || !mounted) return;
    _changed();
    await _openGroup(
      created.id,
      created.name,
      openExpense: openExpense,
    );
  }

  Future<void> _openGroup(
    int id,
    String name, {
    bool openExpense = false,
  }) async {
    await Navigator.of(context).push(
      appRoute(
        context,
        (_) => GroupScreen(
          api: widget.api,
          groupId: id,
          initialName: name,
          openExpenseOnStart: openExpense,
        ),
      ),
    );
    if (mounted) _changed();
  }

  @override
  void dispose() {
    _linkSub?.cancel();
    super.dispose();
  }

  Future<void> _handleLink(Uri uri) async {
    if (_lastLink == uri.toString()) return;
    final segments = uri.pathSegments;
    final joinIndex = segments.indexOf('join');
    if (joinIndex < 0 || joinIndex + 1 >= segments.length) return;
    final code = segments[joinIndex + 1].trim().toUpperCase();
    if (code.isEmpty) return;
    _lastLink = uri.toString();
    if (!mounted) return;
    try {
      final preview = await widget.api.invitePreview(code);
      if (!mounted) return;
      final ok = await showDialog<bool>(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(preview.name),
          content: Text(
            '${preview.memberCount} '
            '${preview.memberCount == 1 ? 'membro' : 'membri'}'
            ' · valuta ${preview.baseCurrency}\n\nVuoi entrare in questo gruppo?',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: const Text('Annulla'),
            ),
            FilledButton(
              onPressed: () => Navigator.pop(ctx, true),
              child: const Text('Entra'),
            ),
          ],
        ),
      );
      if (ok != true || !mounted) return;
      await widget.api.joinGroup(code);
      if (!mounted) return;
      hapticConfirm();
      setState(() {
        _index = 2;
        _revision++;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Sei entrato in "${preview.name}"')),
      );
    } on ApiException catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(e.message)));
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(describeError(e))));
    }
  }

  void _changed() => setState(() => _revision++);

  void _goTo(int index) {
    if (_index == index) return;
    hapticTap();
    setState(() => _index = index);
  }

  @override
  Widget build(BuildContext context) {
    final border = Theme.of(context).dividerColor;
    return Scaffold(
      body: IndexedStack(
        index: _index,
        children: [
          HomeScreen(
            api: widget.api,
            user: _user,
            revision: _revision,
            onChanged: _changed,
            onOpenProfile: () => _goTo(3),
            onSeeAllGroups: () => _goTo(2),
          ),
          ActivityScreen(
            api: widget.api,
            revision: _revision,
            onChanged: _changed,
            onOpenGroups: () => _goTo(2),
          ),
          GroupsScreen(
            api: widget.api,
            revision: _revision,
            onChanged: _changed,
          ),
          ProfileScreen(
            api: widget.api,
            user: _user,
            onUserChanged: (u) => setState(() {
              _user = u;
              _revision++;
            }),
          ),
        ],
      ),
      bottomNavigationBar: DecoratedBox(
        decoration: BoxDecoration(
          border: Border(top: BorderSide(color: border)),
        ),
        child: NavigationBar(
          selectedIndex: _index,
          onDestinationSelected: _goTo,
          destinations: const [
            NavigationDestination(
              icon: Icon(Icons.home_outlined),
              selectedIcon: Icon(Icons.home),
              label: 'Home',
            ),
            NavigationDestination(
              icon: Icon(Icons.receipt_long_outlined),
              selectedIcon: Icon(Icons.receipt_long),
              label: 'Movimenti',
            ),
            NavigationDestination(
              icon: Icon(Icons.group_outlined),
              selectedIcon: Icon(Icons.group),
              label: 'Gruppi',
            ),
            NavigationDestination(
              icon: Icon(Icons.person_outline),
              selectedIcon: Icon(Icons.person),
              label: 'Profilo',
            ),
          ],
        ),
      ),
    );
  }
}
