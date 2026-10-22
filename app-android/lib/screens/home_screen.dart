import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';
import '../sheets/group_sheets.dart';
import '../ui.dart';
import '../widgets/group_tile.dart';
import '../widgets/hero_balance.dart';
import '../widgets/skeleton.dart';
import 'group_screen.dart';

/// Home: saldo complessivo, azioni rapide, gruppi recenti.
class HomeScreen extends StatefulWidget {
  const HomeScreen({
    super.key,
    required this.api,
    required this.user,
    required this.revision,
    required this.onChanged,
    required this.onOpenProfile,
    required this.onSeeAllGroups,
  });

  final Api api;
  final User user;
  final int revision;
  final VoidCallback onChanged;
  final VoidCallback onOpenProfile;
  final VoidCallback onSeeAllGroups;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<Dashboard> _future = widget.api.dashboard();

  @override
  void didUpdateWidget(covariant HomeScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.revision != widget.revision) _reload();
  }

  void _reload() {
    setState(() => _future = widget.api.dashboard());
  }

  Future<void> _refresh() async {
    _reload();
    try {
      await _future;
    } catch (_) {
      // L'errore e' gia' mostrato dal FutureBuilder.
    }
  }

  Future<void> _openGroup(int id) async {
    await Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => GroupScreen(api: widget.api, groupId: id),
      ),
    );
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
    final dark = Theme.of(context).brightness == Brightness.dark;
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        title: Text.rich(
          TextSpan(
            children: [
              TextSpan(
                text: 'b-',
                style: TextStyle(
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
              TextSpan(
                text: 'lance',
                style: TextStyle(color: dark ? sage : sageInk),
              ),
            ],
          ),
          style: const TextStyle(
            fontFamily: 'Calistoga',
            fontSize: 26,
            height: 1,
            letterSpacing: -0.4,
          ),
        ),
        actions: [
          Tooltip(
            message: 'Profilo',
            child: Semantics(
              button: true,
              label: 'Apri il profilo',
              child: InkWell(
                borderRadius: BorderRadius.circular(999),
                onTap: () {
                  widget.onOpenProfile();
                },
                child: Padding(
                  padding: const EdgeInsets.all(8),
                  child: Container(
                    width: 38,
                    height: 38,
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
                        fontSize: 15,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _refresh,
        child: FutureBuilder<Dashboard>(
          future: _future,
          builder: (ctx, snap) {
            if (snap.connectionState != ConnectionState.done) {
              return const DashboardSkeleton();
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
            final data = snap.data!;
            final groups = data.groups;
            final recent = groups.take(3).toList();
            return ListView(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.fromLTRB(16, 4, 16, 32),
              children: [
                Text(
                  'Ciao, ${widget.user.name}',
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
                const SizedBox(height: 4),
                Text(
                  'Ecco come stanno i tuoi conti.',
                  style: TextStyle(fontSize: 13.5, color: mutedOn(context)),
                ),
                const SizedBox(height: 16),
                HeroBalance(nets: data.netByCurrency),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: _QuickAction(
                        icon: Icons.add,
                        label: 'Nuovo gruppo',
                        onTap: _newGroup,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: _QuickAction(
                        icon: Icons.group_add_outlined,
                        label: 'Unisciti',
                        onTap: _joinGroup,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        'I tuoi gruppi',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                    ),
                    if (groups.isNotEmpty)
                      TextButton(
                        onPressed: () {
                          widget.onSeeAllGroups();
                        },
                        child: const Text('Vedi tutti'),
                      ),
                  ],
                ),
                const SizedBox(height: 8),
                if (groups.isEmpty)
                  EmptyState(
                    icon: Icons.groups_outlined,
                    title: 'Nessun gruppo ancora',
                    message:
                        'Crea un gruppo per dividere le spese, oppure entra '
                        'in quello di un amico con un codice.',
                    action: SizedBox(
                      width: 220,
                      child: FilledButton.icon(
                        onPressed: _newGroup,
                        icon: const Icon(Icons.add, size: 19),
                        label: const Text('Crea il primo gruppo'),
                      ),
                    ),
                  )
                else
                  for (final g in recent)
                    GroupTile(group: g, onTap: () => _openGroup(g.id)),
              ],
            );
          },
        ),
      ),
    );
  }
}

/// Azione rapida: card bassa, icona in tinta, etichetta.
class _QuickAction extends StatelessWidget {
  const _QuickAction({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final dark = Theme.of(context).brightness == Brightness.dark;
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () {
          hapticTap();
          onTap();
        },
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 16),
          child: Row(
            children: [
              Container(
                width: 38,
                height: 38,
                decoration: BoxDecoration(
                  color: sage.withValues(alpha: dark ? 0.22 : 0.13),
                  borderRadius: BorderRadius.circular(12),
                ),
                alignment: Alignment.center,
                child: Icon(icon, size: 20, color: dark ? sage : sageInk),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  label,
                  maxLines: 2,
                  style: const TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 13.5,
                    height: 1.2,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
