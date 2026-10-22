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
            user: widget.user,
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
          ProfileScreen(api: widget.api, user: widget.user),
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
