import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';
import '../sheets/group_sheets.dart';
import '../ui.dart';
import '../widgets/group_tile.dart';
import '../widgets/skeleton.dart';
import 'group_screen.dart';

/// Elenco completo dei gruppi + creazione/ingresso.
class GroupsScreen extends StatefulWidget {
  const GroupsScreen({
    super.key,
    required this.api,
    required this.revision,
    required this.onChanged,
  });

  final Api api;
  final int revision;
  final VoidCallback onChanged;

  @override
  State<GroupsScreen> createState() => _GroupsScreenState();
}

class _GroupsScreenState extends State<GroupsScreen> {
  late Future<List<GroupSummary>> _future = widget.api.groups();

  @override
  void didUpdateWidget(covariant GroupsScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.revision != widget.revision) _reload();
  }

  void _reload() {
    setState(() => _future = widget.api.groups());
  }

  Future<void> _refresh() async {
    _reload();
    try {
      await _future;
    } catch (_) {
      // Errore mostrato dal FutureBuilder.
    }
  }

  Future<void> _openGroup(int id) async {
    await Navigator.of(
      context,
    ).push(appRoute(context, (_) => GroupScreen(api: widget.api, groupId: id)));
    if (mounted) widget.onChanged();
  }

  Future<void> _newGroup() async {
    final created = await showNewGroupSheet(context, api: widget.api);
    if (created == null || !mounted) return;
    widget.onChanged();
    await _openGroup(created.id);
  }

  Future<void> _joinGroup() async {
    final joined = await showJoinGroupSheet(context, api: widget.api);
    if (joined == null || !mounted) return;
    widget.onChanged();
    await _openGroup(joined.id);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gruppi'),
        actions: [
          IconButton(
            tooltip: 'Unisciti con un codice',
            onPressed: _joinGroup,
            icon: const Icon(Icons.group_add_outlined),
          ),
          const SizedBox(width: 4),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _newGroup,
        backgroundColor: sageStrong,
        foregroundColor: Colors.white,
        icon: const Icon(Icons.add),
        label: const Text(
          'Nuovo gruppo',
          style: TextStyle(fontWeight: FontWeight.w700),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: _refresh,
        child: FutureBuilder<List<GroupSummary>>(
          future: _future,
          builder: (ctx, snap) {
            if (snap.connectionState != ConnectionState.done) {
              return const ListSkeleton();
            }
            if (snap.hasError) {
              return ListView(
                physics: const AlwaysScrollableScrollPhysics(),
                children: [
                  const SizedBox(height: 40),
                  EmptyState(
                    icon: Icons.cloud_off,
                    title: 'Non riesco a collegarmi',
                    message: describeError(snap.error!),
                    action: OutlinedButton.icon(
                      onPressed: _reload,
                      icon: const Icon(Icons.refresh),
                      label: const Text('Riprova'),
                    ),
                  ),
                ],
              );
            }
            final groups = snap.data ?? const <GroupSummary>[];
            if (groups.isEmpty) {
              return ListView(
                physics: const AlwaysScrollableScrollPhysics(),
                children: [
                  const SizedBox(height: 40),
                  EmptyState(
                    icon: Icons.groups_outlined,
                    title: 'Nessun gruppo ancora',
                    message:
                        'Crea il primo gruppo oppure entra in quello di un '
                        'amico con il codice di invito.',
                    action: Column(
                      children: [
                        SizedBox(
                          width: 240,
                          child: FilledButton.icon(
                            onPressed: _newGroup,
                            icon: const Icon(Icons.add, size: 19),
                            label: const Text('Crea gruppo'),
                          ),
                        ),
                        const SizedBox(height: 10),
                        SizedBox(
                          width: 240,
                          child: OutlinedButton.icon(
                            onPressed: _joinGroup,
                            icon: const Icon(
                              Icons.group_add_outlined,
                              size: 19,
                            ),
                            label: const Text('Unisciti con un codice'),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              );
            }
            return ListView(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
              children: [
                Text(
                  '${groups.length} '
                  '${groups.length == 1 ? 'gruppo' : 'gruppi'}',
                  style: TextStyle(fontSize: 13, color: mutedOn(context)),
                ),
                const SizedBox(height: 12),
                for (final g in groups)
                  GroupTile(group: g, onTap: () => _openGroup(g.id)),
              ],
            );
          },
        ),
      ),
    );
  }
}
