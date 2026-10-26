import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:share_plus/share_plus.dart';

import '../api.dart';
import '../ui.dart';
import '../widgets/logo_mark.dart';
import 'cashier_models.dart';
import 'cashier_service.dart';

const _cashierKey = 'bl_cashier_groups_v1';

class CashierHomeScreen extends StatefulWidget {
  const CashierHomeScreen({super.key});

  @override
  State<CashierHomeScreen> createState() => _CashierHomeScreenState();
}

class _CashierHomeScreenState extends State<CashierHomeScreen> {
  final List<CashierGroup> _groups = [];
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString(_cashierKey);
      if (raw == null) {
        if (!mounted) return;
        setState(() => _loaded = true);
        return;
      }
      final decoded = jsonDecode(raw) as List<dynamic>;
      if (!mounted) return;
      setState(() {
        _groups
          ..clear()
          ..addAll(
            decoded
                .map((e) => CashierGroup.fromJson(e as Map<String, dynamic>))
                .toList(),
          );
        _loaded = true;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() => _loaded = true);
    }
  }

  Future<void> _persist() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(
        _cashierKey,
        jsonEncode(_groups.map((g) => g.toJson()).toList()),
      );
    } catch (_) {}
  }

  Future<void> _createGroup() async {
    final name = TextEditingController();
    final ok = await showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Nuovo gruppo cassiere'),
        content: TextField(
          controller: name,
          autofocus: true,
          decoration: const InputDecoration(labelText: 'Nome (es. Vacanza)'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, null), child: const Text('Annulla')),
          FilledButton(
            onPressed: () {
              final v = name.text.trim();
              Navigator.pop(ctx, v.isEmpty ? null : v);
            },
            child: const Text('Crea'),
          ),
        ],
      ),
    );
    if (ok == null || !mounted) return;
    setState(() {
      _groups.add(CashierGroup(
        id: DateTime.now().millisecondsSinceEpoch % 1000000000,
        name: ok,
        currency: 'EUR',
        members: [CashierPerson(id: 1, name: 'Tu')],
        expenses: [],
      ));
    });
    await _persist();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        title: const LogoMark(size: 32),
        actions: [
          IconButton(tooltip: 'Nuovo gruppo', onPressed: _createGroup, icon: const Icon(Icons.add)),
        ],
      ),
      body: SafeArea(
        child: !_loaded
            ? const Center(child: CircularProgressIndicator())
            : _groups.isEmpty
                ? Center(
                    child: Padding(
                      padding: const EdgeInsets.all(24),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const LogoMark(size: 62),
                          const SizedBox(height: 14),
                          const Text(
                            'Nessun gruppo cassiere',
                            textAlign: TextAlign.center,
                            style: TextStyle(fontFamily: 'Calistoga', fontSize: 26),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Crea un gruppo locale: funziona senza account e senza rete.',
                            textAlign: TextAlign.center,
                            style: TextStyle(color: mutedOn(context), fontSize: 14),
                          ),
                          const SizedBox(height: 20),
                          FilledButton(onPressed: _createGroup, child: const Text('Nuovo gruppo')),
                        ],
                      ),
                    ),
                  )
                : ListView(
                    padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                    children: [
                      for (final g in _groups) ...[
                        _CashierGroupTile(
                          group: g,
                          onOpen: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (_) => CashierGroupScreen(group: g),
                              ),
                            );
                          },
                        ),
                        const SizedBox(height: 12),
                      ],
                    ],
                  ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _createGroup,
        icon: const Icon(Icons.add),
        label: const Text('Gruppo'),
      ),
    );
  }
}

class _CashierGroupTile extends StatelessWidget {
  const _CashierGroupTile({required this.group, required this.onOpen});
  final CashierGroup group;
  final VoidCallback onOpen;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: () {
          hapticTap();
          onOpen();
        },
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Container(
                width: 46,
                height: 46,
                decoration: BoxDecoration(
                  color: sage.withValues(alpha: 0.13),
                  borderRadius: BorderRadius.circular(14),
                ),
                alignment: Alignment.center,
                child: Text(
                  group.name.characters.first.toUpperCase(),
                  style: TextStyle(
                    color: Theme.of(context).brightness == Brightness.dark ? sage : sageInk,
                    fontWeight: FontWeight.w800,
                    fontSize: 19,
                  ),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(group.name, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15.5)),
                    const SizedBox(height: 3),
                    Text(
                      '${group.members.length} membri · ${group.expenses.length} spese · ${group.currency}',
                      style: TextStyle(fontSize: 12.5, color: mutedOn(context)),
                    ),
                  ],
                ),
              ),
              Icon(Icons.chevron_right, size: 18, color: mutedOn(context)),
            ],
          ),
        ),
      ),
    );
  }
}

class CashierGroupScreen extends StatefulWidget {
  const CashierGroupScreen({super.key, required this.group});
  final CashierGroup group;

  @override
  State<CashierGroupScreen> createState() => _CashierGroupScreenState();
}

class _CashierGroupScreenState extends State<CashierGroupScreen> {
  late CashierGroup _group;

  @override
  void initState() {
    super.initState();
    _group = widget.group;
  }

  List<CashierBalance> get _balances => cashierBalances(_group);
  List<List<int>> get _transfers => cashierTransfers(_balances);

  @override
  Widget build(BuildContext context) {
    final group = _group;
    final balances = _balances;
    final transfers = _transfers;
    final expo = Meta.exponentOf(group.currency);
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        title: Text(_group.name, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
        actions: [
          IconButton(tooltip: 'Condividi', onPressed: _share, icon: const Icon(Icons.share_outlined)),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Aggiungi spesa non ancora disponibile'))),
        icon: const Icon(Icons.add),
        label: const Text('Spesa'),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
          children: [
            if (_group.expenses.isEmpty)
              EmptyState(
                icon: Icons.wallet_outlined,
                title: 'Nessuna spesa registrata',
                message: 'Aggiungi chi ha pagato e dividi. Senza rete, senza account.',
                compact: true,
              )
            else
              SectionCard(
                title: 'Spese',
                trailing: Text(
                  '${formatMinor(_group.expenses.fold<int>(0, (s, e) => s + e.amountMinor), expo)} ${_group.currency}',
                  style: TextStyle(
                    fontWeight: FontWeight.w800,
                    color: Theme.of(context).brightness == Brightness.dark ? sage : sageInk,
                  ),
                ),
                child: Column(
                  children: [
                    for (final e in _group.expenses)
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 6),
                        child: Row(
                          children: [
                            Expanded(
                              child: Text(
                                e.description,
                                style: TextStyle(fontWeight: FontWeight.w600),
                              ),
                            ),
                            const SizedBox(width: 10),
                            Text(
                              '${formatMinor(e.amountMinor, expo)} ${group.currency}',
                              style: TextStyle(fontWeight: FontWeight.w800),
                            ),
                          ],
                        ),
                      ),
                  ],
                ),
              ),
            const SizedBox(height: 12),
            SectionCard(
              title: 'Saldi',
              child: Column(
                children: [
                  for (final b in balances)
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 6),
                      child: Row(
                        children: [
                          Container(
                            width: 10,
                            height: 10,
                            decoration: BoxDecoration(
                              color: parseHexColor(_personById(b.personId).color),
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(child: Text(_personById(b.personId).name)),
                          Text(
                            b.netMinor == 0
                                ? 'in pari'
                                : formatSigned(b.netMinor, expo, _group.currency),
                            style: TextStyle(
                              fontWeight: FontWeight.w800,
                              color: b.netMinor > 0
                                  ? posOn(context)
                                  : b.netMinor < 0
                                  ? negOn(context)
                                  : mutedOn(context),
                            ),
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
            if (transfers.isNotEmpty) ...[
              const SizedBox(height: 12),
              SectionCard(
                title: 'Chi paga a chi',
                child: Column(
                  children: [
                    for (final t in transfers)
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4),
                        child: Row(
                          children: [
                            Expanded(
                              child: Text(
                                '${_personName(t[0])} → ${_personName(t[1])}',
                                style: TextStyle(fontWeight: FontWeight.w600),
                              ),
                            ),
                            Text(
                              formatCashier(t[2], expo),
                              style: TextStyle(fontWeight: FontWeight.w800, color: Theme.of(context).brightness == Brightness.dark ? sage : sageInk),
                            ),
                          ],
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  CashierPerson _personById(int id) =>
      _group.members.firstWhere((m) => m.id == id, orElse: () => CashierPerson(id: id, name: '?'));

  String _personName(int id) => _personById(id).name;



  Future<void> _share() async {
    final text = cashierSummaryText(_group, exponent: Meta.exponentOf(_group.currency));
    await SharePlus.instance.share(ShareParams(text: text, subject: 'b-lance · ${_group.name}'));
  }
}
