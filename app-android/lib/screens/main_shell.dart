import 'dart:async';

import 'package:app_links/app_links.dart';
import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';
import '../ui.dart';
import 'activity_screen.dart';
import 'groups_screen.dart';
import 'home_screen.dart';
import 'profile_screen.dart';

/// Contenitore principale: quattro sezioni, come un'app bancaria.
/// IndexedStack tiene vive le schermate; un contatore "revisione" le
/// avvisa quando i dati cambiano (gruppo creato, spesa aggiunta...).
class MainShell extends StatefulWidget {
  const MainShell({super.key, required this.api, required this.user});

  final Api api;
  final User user;

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
