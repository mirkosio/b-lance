import 'dart:async';

import 'package:flutter/material.dart';

import '../api.dart';
import '../categories.dart';
import '../models.dart';
import '../ui.dart';
import '../widgets/activity_tile.dart';
import '../widgets/skeleton.dart';
import 'group_screen.dart';

enum _Filter { all, expenses, payments }

/// Movimenti di tutti i gruppi: ricerca, filtro tipo e categoria.
class ActivityScreen extends StatefulWidget {
  const ActivityScreen({
    super.key,
    required this.api,
    required this.revision,
    required this.onChanged,
    required this.onOpenGroups,
  });

  final Api api;
  final int revision;
  final VoidCallback onChanged;
  final VoidCallback onOpenGroups;

  @override
  State<ActivityScreen> createState() => _ActivityScreenState();
}

class _ActivityScreenState extends State<ActivityScreen> {
  final _search = TextEditingController();
  Timer? _debounce;
  late Future<List<ActivityItem>> _future = _load();
  _Filter _filter = _Filter.all;
  String _query = '';
  String _category = '';

  Future<List<ActivityItem>> _load() =>
      widget.api.activity(limit: 100, q: _query, category: _category);

  @override
  void didUpdateWidget(covariant ActivityScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.revision != widget.revision) _reload();
  }

  @override
  void dispose() {
    _debounce?.cancel();
    _search.dispose();
    super.dispose();
  }

  void _reload() {
    setState(() => _future = _load());
  }

  void _onSearch(String value) {
    _query = value;
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 350), () {
      if (mounted) _reload();
    });
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

  List<ActivityItem> _visible(List<ActivityItem> items) => switch (_filter) {
    _Filter.all => items,
    _Filter.expenses => items.where((i) => !i.isPayment).toList(),
    _Filter.payments => items.where((i) => i.isPayment).toList(),
  };

  bool get _hasFilters => _query.trim().isNotEmpty || _category.isNotEmpty;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Movimenti')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 2, 16, 4),
            child: TextField(
              controller: _search,
              onChanged: _onSearch,
              textInputAction: TextInputAction.search,
              decoration: InputDecoration(
                hintText: 'Cerca spese, gruppi, persone',
                prefixIcon: const Icon(Icons.search, size: 21),
                suffixIcon: _query.isEmpty
                    ? null
                    : IconButton(
                        tooltip: 'Pulisci',
                        icon: const Icon(Icons.close, size: 19),
                        onPressed: () {
                          _search.clear();
                          setState(() => _query = '');
                          _reload();
                        },
                      ),
              ),
            ),
          ),
          SizedBox(
            height: 40,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                _chip('Tutto', _Filter.all),
                const SizedBox(width: 8),
                _chip('Spese', _Filter.expenses),
                const SizedBox(width: 8),
                _chip('Pagamenti', _Filter.payments),
              ],
            ),
          ),
          SizedBox(
            height: 44,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.fromLTRB(16, 6, 16, 4),
              children: [
                _categoryChip('', 'Tutte le categorie', null),
                for (final c in categories) ...[
                  const SizedBox(width: 7),
                  _categoryChip(c.code, c.label, c.icon),
                ],
              ],
            ),
          ),
          Expanded(
            child: RefreshIndicator(
              onRefresh: _refresh,
              child: FutureBuilder<List<ActivityItem>>(
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
                  final items = _visible(snap.data ?? const []);
                  if (items.isEmpty) {
                    return ListView(
                      physics: const AlwaysScrollableScrollPhysics(),
                      children: [
                        const SizedBox(height: 40),
                        EmptyState(
                          icon: _hasFilters
                              ? Icons.search_off
                              : Icons.receipt_long_outlined,
                          title: _hasFilters
                              ? 'Nessun risultato'
                              : (_filter == _Filter.all)
                              ? 'Nessun movimento'
                              : 'Niente da mostrare',
                          message: _hasFilters
                              ? 'Prova con un altro testo o togli un filtro.'
                              : (_filter == _Filter.all)
                              ? 'Spese e pagamenti dei tuoi gruppi '
                                    'compariranno qui.'
                              : 'Prova un altro filtro: per ora non c\'è '
                                    'nulla in questa categoria.',
                          action: !_hasFilters && _filter == _Filter.all
                              ? OutlinedButton.icon(
                                  onPressed: widget.onOpenGroups,
                                  icon: const Icon(
                                    Icons.groups_outlined,
                                    size: 19,
                                  ),
                                  label: const Text('Vai ai gruppi'),
                                )
                              : null,
                        ),
                      ],
                    );
                  }
                  return ListView.builder(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.fromLTRB(16, 6, 16, 24),
                    itemCount: items.length,
                    itemBuilder: (ctx, i) {
                      final item = items[i];
                      return ActivityTile(
                        item: item,
                        onTap: () => _openGroup(item.groupId),
                      );
                    },
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _chip(String label, _Filter filter) {
    final selected = _filter == filter;
    return ChoiceChip(
      label: Text(label),
      selected: selected,
      showCheckmark: false,
      visualDensity: VisualDensity.compact,
      labelStyle: TextStyle(
        fontWeight: FontWeight.w600,
        fontSize: 13,
        color: selected
            ? Theme.of(context).colorScheme.onSurface
            : mutedOn(context),
      ),
      selectedColor: sage.withValues(alpha: 0.18),
      backgroundColor: Colors.transparent,
      side: BorderSide(
        color: selected
            ? sage.withValues(alpha: 0.68)
            : Theme.of(context).dividerColor,
      ),
      onSelected: (_) {
        hapticTap();
        setState(() => _filter = filter);
      },
    );
  }

  Widget _categoryChip(String code, String label, IconData? icon) {
    final selected = _category == code;
    return ChoiceChip(
      avatar: icon == null ? null : Icon(icon, size: 16),
      label: Text(label),
      selected: selected,
      showCheckmark: false,
      visualDensity: VisualDensity.compact,
      labelStyle: TextStyle(
        fontWeight: FontWeight.w600,
        fontSize: 12.5,
        color: selected
            ? Theme.of(context).colorScheme.onSurface
            : mutedOn(context),
      ),
      selectedColor: sage.withValues(alpha: 0.18),
      backgroundColor: Colors.transparent,
      side: BorderSide(
        color: selected
            ? sage.withValues(alpha: 0.68)
            : Theme.of(context).dividerColor,
      ),
      onSelected: (_) {
        hapticTap();
        setState(() => _category = code);
        _reload();
      },
    );
  }
}
