import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:share_plus/share_plus.dart';

import '../api.dart';
import '../ui.dart';
import '../models.dart';
import '../widgets/currency_picker.dart';
import '../widgets/logo_mark.dart';
import '../widgets/skeleton.dart';
import 'cashier_models.dart';
import 'cashier_service.dart';

const _cashierKey = 'bl_cashier_groups_v1';

const _fallbackCurrencies = <CurrencyInfo>[
  CurrencyInfo(
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    exponent: 2,
    hasAutoRate: true,
  ),
  CurrencyInfo(
    code: 'USD',
    name: 'Dollaro USA',
    symbol: r'$',
    exponent: 2,
    hasAutoRate: true,
  ),
  CurrencyInfo(
    code: 'GBP',
    name: 'Sterlina',
    symbol: '£',
    exponent: 2,
    hasAutoRate: true,
  ),
  CurrencyInfo(
    code: 'CHF',
    name: 'Franco svizzero',
    symbol: 'CHF',
    exponent: 2,
    hasAutoRate: true,
  ),
  CurrencyInfo(
    code: 'JPY',
    name: 'Yen',
    symbol: '¥',
    exponent: 0,
    hasAutoRate: true,
  ),
];

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
    final currencies = Meta.currencies.isNotEmpty
        ? Meta.currencies
        : _fallbackCurrencies;
    final currency = await showCurrencyPicker(
      context,
      currencies: currencies,
      selected: 'EUR',
      title: 'Valuta del gruppo',
    );
    if (currency == null || !mounted) return;
    setState(() {
      _groups.add(CashierGroup(
        id: DateTime.now().millisecondsSinceEpoch % 1000000000,
        name: ok,
        currency: currency,
        members: [CashierPerson(id: 1, name: 'Tu')],
        expenses: [],
      ));
    });
    await _persist();
  }

  Future<void> _deleteGroup(CashierGroup group) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Eliminare il gruppo?'),
        content: const Text('Verrà eliminato dalla cassa locale, senza recupero.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Indietro')),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Elimina')),
        ],
      ),
    );
    if (ok != true) return;
    setState(() => _groups.removeWhere((g) => g.id == group.id));
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
            ? ListView(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                children: const [
                  Skeleton(height: 84, radius: 16),
                  SizedBox(height: 12),
                  Skeleton(height: 84, radius: 16),
                  SizedBox(height: 12),
                  Skeleton(height: 84, radius: 16),
                ],
              )
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
                          onDelete: () => _deleteGroup(g),
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
  const _CashierGroupTile({required this.group, required this.onOpen, required this.onDelete});
  final CashierGroup group;
  final VoidCallback onOpen;
  final VoidCallback onDelete;

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
              IconButton(
                tooltip: 'Elimina',
                onPressed: () {
                  hapticTap();
                  onDelete();
                },
                icon: const Icon(Icons.delete_outline, size: 20),
                color: negOn(context),
              ),
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
  final bool _offline = true; // modalità cassiere è sempre locale

  @override
  void initState() {
    super.initState();
    _group = widget.group;
  }

  List<CashierBalance> get _balances => cashierBalances(_group);
  List<List<int>> get _transfers => cashierTransfers(_balances);

  CashierPerson _personById(int id) =>
      _group.members.firstWhere((m) => m.id == id, orElse: () => CashierPerson(id: id, name: '?'));

  String _personName(int id) => _personById(id).name;

  int _exponentOf(String code) {
    final known = Meta.byCode(code);
    if (known != null) return known.exponent;
    for (final c in _fallbackCurrencies) {
      if (c.code == code) return c.exponent;
    }
    return 2;
  }

  Future<void> _addExpense() => _expenseSheet();

  Future<void> _editExpense(CashierExpense existing) =>
      _expenseSheet(existing: existing);

  Future<void> _expenseSheet({CashierExpense? existing}) async {
    final expo = _exponentOf(_group.currency);
    final description = TextEditingController(
      text: existing?.description ?? '',
    );
    final amount = TextEditingController(
      text: existing == null
          ? ''
          : cashierAmountInput(existing.amountMinor, expo),
    );
    int paidById = existing?.paidById ??
        (_group.members.isNotEmpty ? _group.members.first.id : 0);
    final selected = <int>{
      ...(existing?.memberIds ?? _group.members.map((m) => m.id)),
    };

    final action = await showModalBottomSheet<String>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (ctx, setModal) {
            return SafeArea(
              child: Padding(
                padding: EdgeInsets.only(
                  left: 16,
                  right: 16,
                  top: 16,
                  bottom: MediaQuery.of(ctx).viewInsets.bottom + 16,
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      existing == null ? 'Nuova spesa' : 'Modifica spesa',
                      style: const TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 18,
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: description,
                      autofocus: existing == null,
                      decoration: const InputDecoration(
                        labelText: 'Descrizione (es. Cena)',
                      ),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: amount,
                      keyboardType: const TextInputType.numberWithOptions(
                        decimal: true,
                      ),
                      decoration: InputDecoration(
                        labelText: 'Importo',
                        prefixText: '${_group.currency} ',
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'Chi ha pagato',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        for (final m in _group.members)
                          ChoiceChip(
                            label: Text(m.name),
                            selected: paidById == m.id,
                            onSelected: (_) => setModal(() => paidById = m.id),
                          ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    const Text(
                      'Chi partecipa',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        for (final m in _group.members)
                          FilterChip(
                            label: Text(m.name),
                            selected: selected.contains(m.id),
                            onSelected: (v) {
                              setModal(() {
                                if (v) {
                                  selected.add(m.id);
                                } else {
                                  selected.remove(m.id);
                                }
                              });
                            },
                          ),
                      ],
                    ),
                    const SizedBox(height: 18),
                    Row(
                      children: [
                        if (existing != null) ...[
                          TextButton(
                            onPressed: () => Navigator.pop(ctx, 'delete'),
                            child: Text(
                              'Elimina',
                              style: TextStyle(color: negOn(ctx)),
                            ),
                          ),
                          const SizedBox(width: 4),
                        ],
                        Expanded(
                          child: TextButton(
                            onPressed: () => Navigator.pop(ctx, 'cancel'),
                            child: const Text('Annulla'),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: FilledButton(
                            onPressed: () {
                              final d = description.text.trim();
                              final minor = parseCashierAmount(
                                amount.text,
                                expo,
                              );
                              if (d.isEmpty ||
                                  minor == null ||
                                  minor <= 0 ||
                                  paidById == 0 ||
                                  selected.isEmpty) {
                                ScaffoldMessenger.of(ctx).showSnackBar(
                                  const SnackBar(
                                    content: Text(
                                      'Compila descrizione, importo, pagante e partecipanti',
                                    ),
                                  ),
                                );
                                return;
                              }
                              Navigator.pop(ctx, 'save');
                            },
                            child: Text(
                              existing == null ? 'Aggiungi' : 'Salva',
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );

    if (action == 'delete' && existing != null) {
      if (!mounted) return;
      final ok = await showDialog<bool>(
        context: context,
        builder: (ctx) => AlertDialog(
          title: const Text('Eliminare la spesa?'),
          content: const Text('Verrà rimossa dalla cassa locale.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx, false),
              child: const Text('Indietro'),
            ),
            FilledButton(
              onPressed: () => Navigator.pop(ctx, true),
              child: const Text('Elimina'),
            ),
          ],
        ),
      );
      if (ok != true) return;
      setState(() {
        _group.expenses.removeWhere((e) => e.id == existing.id);
      });
      await _persist();
      return;
    }
    if (action != 'save') return;

    final minor = parseCashierAmount(amount.text, expo);
    if (minor == null || minor <= 0) return;
    setState(() {
      final updated = CashierExpense(
        id: existing?.id ??
            DateTime.now().millisecondsSinceEpoch % 1000000000,
        description: description.text.trim(),
        amountMinor: minor,
        paidById: paidById,
        memberIds: selected.toList(),
        currency: _group.currency,
        items: existing?.items ?? const [],
      );
      if (existing == null) {
        _group.expenses.add(updated);
      } else {
        final i = _group.expenses.indexWhere((e) => e.id == existing.id);
        if (i >= 0) {
          _group.expenses[i] = updated;
        }
      }
    });
    await _persist();
  }

  Future<void> _addPayment() async {
    if (_group.members.length < 2) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Servono almeno due partecipanti')),
      );
      return;
    }
    final expo = _exponentOf(_group.currency);
    final amount = TextEditingController();
    final note = TextEditingController();
    int fromId = _group.members.first.id;
    int toId = _group.members[1].id;

    final ok = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (ctx, setModal) {
            return SafeArea(
              child: Padding(
                padding: EdgeInsets.only(
                  left: 16,
                  right: 16,
                  top: 16,
                  bottom: MediaQuery.of(ctx).viewInsets.bottom + 16,
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text(
                      'Registra pagamento',
                      style: TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 18,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Segna un bonifico o contanti già scambiati.',
                      style: TextStyle(color: mutedOn(ctx), fontSize: 13),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Da',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        for (final m in _group.members)
                          ChoiceChip(
                            label: Text(m.name),
                            selected: fromId == m.id,
                            onSelected: (_) => setModal(() => fromId = m.id),
                          ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    const Text(
                      'A',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        for (final m in _group.members)
                          ChoiceChip(
                            label: Text(m.name),
                            selected: toId == m.id,
                            onSelected: (_) => setModal(() => toId = m.id),
                          ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    TextField(
                      controller: amount,
                      keyboardType: const TextInputType.numberWithOptions(
                        decimal: true,
                      ),
                      decoration: InputDecoration(
                        labelText: 'Importo',
                        prefixText: '${_group.currency} ',
                      ),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: note,
                      decoration: const InputDecoration(
                        labelText: 'Nota (facoltativa)',
                        hintText: 'Es. bonifico, contanti',
                      ),
                    ),
                    const SizedBox(height: 18),
                    Row(
                      children: [
                        Expanded(
                          child: TextButton(
                            onPressed: () => Navigator.pop(ctx, false),
                            child: const Text('Annulla'),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: FilledButton(
                            onPressed: () {
                              final minor = parseCashierAmount(
                                amount.text,
                                expo,
                              );
                              if (fromId == toId) {
                                ScaffoldMessenger.of(ctx).showSnackBar(
                                  const SnackBar(
                                    content: Text(
                                      'Chi paga e chi incassa devono essere diversi',
                                    ),
                                  ),
                                );
                                return;
                              }
                              if (minor == null || minor <= 0) {
                                ScaffoldMessenger.of(ctx).showSnackBar(
                                  const SnackBar(
                                    content: Text('Importo non valido'),
                                  ),
                                );
                                return;
                              }
                              Navigator.pop(ctx, true);
                            },
                            child: const Text('Registra'),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
    if (ok != true) return;
    final minor = parseCashierAmount(amount.text, expo);
    if (minor == null || minor <= 0) return;
    setState(() {
      _group.payments.add(
        CashierPayment(
          id: DateTime.now().millisecondsSinceEpoch % 1000000000,
          fromId: fromId,
          toId: toId,
          amountMinor: minor,
          note: note.text.trim(),
        ),
      );
    });
    await _persist();
  }

  Future<void> _deletePayment(CashierPayment payment) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Eliminare il pagamento?'),
        content: const Text('I saldi torneranno come prima.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Indietro'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Elimina'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    setState(() {
      _group.payments.removeWhere((p) => p.id == payment.id);
    });
    await _persist();
  }

  Future<void> _addMember() async {
    final name = TextEditingController();
    final ok = await showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Aggiungi partecipante'),
        content: TextField(
          controller: name,
          autofocus: true,
          decoration: const InputDecoration(labelText: 'Nome'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, null), child: const Text('Annulla')),
          FilledButton(
            onPressed: () {
              final v = name.text.trim();
              Navigator.pop(ctx, v.isEmpty ? null : v);
            },
            child: const Text('Aggiungi'),
          ),
        ],
      ),
    );
    if (ok == null || !mounted) return;
    setState(() {
      final newId = (_group.members.map((m) => m.id).reduce((a, b) => a > b ? a : b) + 1);
      _group.members.add(CashierPerson(id: newId, name: ok));
    });
    _persist();
  }

  Future<void> _removeMember(int id) async {
    if (_group.members.length <= 1) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Serve almeno un partecipante')),
      );
      return;
    }
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Rimuovere partecipante?'),
        content: const Text('Le sue spese restano, ma non dividerà più le nuove.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Indietro')),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Rimuovi')),
        ],
      ),
    );
    if (ok != true) return;
    setState(() {
      _group.members.removeWhere((m) => m.id == id);
      // rimuovi dalle quote future
      for (final e in _group.expenses) {
        e.memberIds.remove(id);
      }
    });
    _persist();
  }

  Future<void> _deleteGroup() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Eliminare il gruppo?'),
        content: const Text('Verrà eliminato dalla cassa locale, senza recupero.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Indietro')),
          FilledButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Elimina')),
        ],
      ),
    );
    if (ok != true) return;
    if (!mounted) return;
    Navigator.of(context).pop(true);
  }

  Future<void> _share() async {
    final text = cashierSummaryText(_group, exponent: _exponentOf(_group.currency));
    await SharePlus.instance.share(ShareParams(text: text, subject: 'b-lance · ${_group.name}'));
  }

  Future<void> _persist() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString(_cashierKey);
      final groups = <CashierGroup>[];
      if (raw != null) {
        groups.addAll((jsonDecode(raw) as List<dynamic>)
            .map((e) => CashierGroup.fromJson(e as Map<String, dynamic>)));
      }
      groups.removeWhere((g) => g.id == _group.id);
      groups.add(_group);
      await prefs.setString(_cashierKey, jsonEncode(groups.map((g) => g.toJson()).toList()));
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    final group = _group;
    final balances = _balances;
    final transfers = _transfers;
    final expo = _exponentOf(group.currency);
    final total = group.expenses.fold<int>(0, (s, e) => s + e.amountMinor);

    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        title: Text(group.name, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
        actions: [
          IconButton(tooltip: 'Aggiungi partecipante', onPressed: _addMember, icon: const Icon(Icons.person_add_outlined)),
          IconButton(tooltip: 'Condividi riepilogo', onPressed: _share, icon: const Icon(Icons.share_outlined)),
          PopupMenuButton<String>(
            tooltip: 'Altre azioni',
            onSelected: (v) {
              if (v == 'payment') _addPayment();
              if (v == 'delete') _deleteGroup();
            },
            itemBuilder: (_) => const [
              PopupMenuItem(
                value: 'payment',
                child: Text('Registra pagamento'),
              ),
              PopupMenuItem(
                value: 'delete',
                child: Text('Elimina gruppo'),
              ),
            ],
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _addExpense,
        icon: const Icon(Icons.add),
        label: const Text('Spesa'),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
              color: _offline ? sage.withValues(alpha: 0.12) : null,
              child: Row(
                children: [
                  Container(
                    width: 10,
                    height: 10,
                    decoration: BoxDecoration(color: _offline ? negOn(context) : posOn(context), shape: BoxShape.circle),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      _offline ? 'Salvato solo su questo telefono' : 'Online — sincronizzato',
                      style: TextStyle(fontSize: 12.5, color: _offline ? negOn(context) : posOn(context), fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                children: [
                  if (group.expenses.isEmpty)
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
                        '${formatMinor(total, expo)} ${group.currency}',
                        style: TextStyle(
                          fontWeight: FontWeight.w800,
                          color: Theme.of(context).brightness == Brightness.dark ? sage : sageInk,
                        ),
                      ),
                      child: Column(
                        children: [
                          for (final e in group.expenses)
                            InkWell(
                              borderRadius: BorderRadius.circular(10),
                              onTap: () {
                                hapticTap();
                                _editExpense(e);
                              },
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                  vertical: 10,
                                  horizontal: 4,
                                ),
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: Text(
                                        e.description,
                                        style: TextStyle(
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 10),
                                    Text(
                                      '${formatMinor(e.amountMinor, expo)} ${e.currency}',
                                      style: TextStyle(
                                        fontWeight: FontWeight.w800,
                                      ),
                                    ),
                                    const SizedBox(width: 4),
                                    Icon(
                                      Icons.chevron_right,
                                      size: 18,
                                      color: mutedOn(context),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                  if (group.payments.isNotEmpty) ...[
                    const SizedBox(height: 12),
                    SectionCard(
                      title: 'Pagamenti',
                      child: Column(
                        children: [
                          for (final p in group.payments)
                            Padding(
                              padding: const EdgeInsets.symmetric(vertical: 4),
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          '${_personName(p.fromId)} → ${_personName(p.toId)}',
                                          style: TextStyle(
                                            fontWeight: FontWeight.w600,
                                          ),
                                        ),
                                        if (p.note.isNotEmpty)
                                          Text(
                                            p.note,
                                            style: TextStyle(
                                              fontSize: 12,
                                              color: mutedOn(context),
                                            ),
                                          ),
                                      ],
                                    ),
                                  ),
                                  Text(
                                    '${formatMinor(p.amountMinor, expo)} ${group.currency}',
                                    style: TextStyle(
                                      fontWeight: FontWeight.w800,
                                    ),
                                  ),
                                  IconButton(
                                    onPressed: () => _deletePayment(p),
                                    tooltip: 'Elimina pagamento',
                                    constraints: const BoxConstraints(
                                      minWidth: 48,
                                      minHeight: 48,
                                    ),
                                    icon: const Icon(
                                      Icons.delete_outline,
                                      size: 18,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                        ],
                      ),
                    ),
                  ],
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
                                Expanded(
                                  child: Row(
                                    children: [
                                      Expanded(
                                        child: Text(
                                          _personById(b.personId).name,
                                        ),
                                      ),
                                      IconButton(
                                        onPressed: () =>
                                            _removeMember(b.personId),
                                        tooltip: 'Rimuovi partecipante',
                                        constraints: const BoxConstraints(
                                          minWidth: 48,
                                          minHeight: 48,
                                        ),
                                        icon: const Icon(
                                          Icons.remove_circle_outline,
                                          size: 20,
                                          color: sage,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                Text(
                                  b.netMinor == 0
                                      ? 'in pari'
                                      : formatSigned(b.netMinor, expo, group.currency),
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
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
