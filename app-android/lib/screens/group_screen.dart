import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../api.dart';
import '../categories.dart';
import '../export_csv.dart';
import '../filters.dart';
import '../models.dart';
import '../sheets/detail_sheets.dart';
import '../sheets/expense_sheet.dart';
import '../sheets/group_sheets.dart';
import '../sheets/payment_sheet.dart';
import '../ui.dart';
import '../widgets/hero_balance.dart';
import '../widgets/skeleton.dart';

class GroupScreen extends StatefulWidget {
  const GroupScreen({super.key, required this.api, required this.groupId});

  final Api api;
  final int groupId;

  @override
  State<GroupScreen> createState() => _GroupScreenState();
}

class _GroupScreenState extends State<GroupScreen> {
  late Future<GroupDetail> _future;
  late Future<List<RecurringRule>> _rulesFuture;
  final _searchController = TextEditingController();
  String _search = '';
  String? _filterCategory;
  int? _filterMember;
  DateTimeRange? _filterRange;

  @override
  void initState() {
    super.initState();
    _future = widget.api.groupDetail(widget.groupId);
    _rulesFuture = widget.api.recurringRules(widget.groupId);
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _reload() {
    setState(() {
      _future = widget.api.groupDetail(widget.groupId);
      _rulesFuture = widget.api.recurringRules(widget.groupId);
    });
  }

  bool get _filtersActive =>
      _search.trim().isNotEmpty ||
      _filterCategory != null ||
      _filterMember != null ||
      _filterRange != null;

  void _clearFilters() {
    _searchController.clear();
    setState(() {
      _search = '';
      _filterCategory = null;
      _filterMember = null;
      _filterRange = null;
    });
  }

  Future<void> _pickCategory() async {
    final code = await showModalBottomSheet<String>(
      context: context,
      showDragHandle: true,
      useSafeArea: true,
      builder: (ctx) => ListView(
        shrinkWrap: true,
        children: [
          const Padding(
            padding: EdgeInsets.fromLTRB(20, 4, 20, 8),
            child: Text(
              'Filtra per categoria',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
            ),
          ),
          ListTile(
            leading: const Icon(Icons.clear_all),
            title: const Text('Tutte le categorie'),
            onTap: () => Navigator.pop(ctx, ''),
          ),
          for (final c in categories)
            ListTile(
              leading: Icon(c.icon, color: c.color),
              title: Text(c.label),
              selected: _filterCategory == c.code,
              onTap: () => Navigator.pop(ctx, c.code),
            ),
          const SizedBox(height: 12),
        ],
      ),
    );
    if (code == null || !mounted) return;
    setState(() => _filterCategory = code.isEmpty ? null : code);
  }

  Future<void> _pickMember(GroupDetail d) async {
    final id = await showModalBottomSheet<int>(
      context: context,
      showDragHandle: true,
      useSafeArea: true,
      builder: (ctx) => ListView(
        shrinkWrap: true,
        children: [
          const Padding(
            padding: EdgeInsets.fromLTRB(20, 4, 20, 8),
            child: Text(
              'Filtra per membro',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
            ),
          ),
          ListTile(
            leading: const Icon(Icons.clear_all),
            title: const Text('Tutti i membri'),
            onTap: () => Navigator.pop(ctx, 0),
          ),
          for (final m in d.members.where((m) => m.active))
            ListTile(
              leading: CircleAvatar(
                radius: 13,
                backgroundColor: parseHexColor(m.color),
                child: Text(
                  m.name.isEmpty ? '?' : m.name.characters.first.toUpperCase(),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 10,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              title: Text(m.isMe ? '${m.name} (tu)' : m.name),
              selected: _filterMember == m.userId,
              onTap: () => Navigator.pop(ctx, m.userId),
            ),
          const SizedBox(height: 12),
        ],
      ),
    );
    if (id == null || !mounted) return;
    setState(() => _filterMember = id == 0 ? null : id);
  }

  Future<void> _pickPeriod() async {
    final now = DateTime.now();
    final range = await showDateRangePicker(
      context: context,
      firstDate: DateTime(2000),
      lastDate: DateTime(now.year + 1, 12, 31),
      initialDateRange: _filterRange,
      helpText: 'Filtra per periodo',
      saveText: 'Applica',
      cancelText: 'Annulla',
      confirmText: 'Applica',
    );
    if (range == null || !mounted) return;
    setState(() => _filterRange = range);
  }

  String _shortDay(DateTime d) =>
      '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}';

  String _periodLabel() {
    final r = _filterRange;
    if (r == null) return 'Periodo';
    return '${_shortDay(r.start)} – ${_shortDay(r.end)}';
  }

  String _memberLabel(GroupDetail d) {
    if (_filterMember == null) return 'Membro';
    for (final m in d.members) {
      if (m.userId == _filterMember) return m.name;
    }
    return 'Membro';
  }

  Widget _buildFilters(
    GroupDetail d, {
    required int expenseCount,
    required int paymentCount,
  }) {
    final active = _filtersActive;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        TextField(
          controller: _searchController,
          onChanged: (v) => setState(() => _search = v),
          textInputAction: TextInputAction.search,
          decoration: InputDecoration(
            labelText: 'Cerca spese e pagamenti',
            isDense: true,
            prefixIcon: const Icon(Icons.search, size: 20),
            suffixIcon: _search.isEmpty
                ? null
                : IconButton(
                    tooltip: 'Pulisci ricerca',
                    onPressed: () {
                      _searchController.clear();
                      setState(() => _search = '');
                    },
                    icon: const Icon(Icons.close, size: 19),
                  ),
          ),
        ),
        const SizedBox(height: 10),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            FilterChip(
              avatar: const Icon(Icons.category_outlined, size: 17),
              label: Text(
                _filterCategory == null
                    ? 'Categoria'
                    : categoryInfo(_filterCategory).label,
              ),
              selected: _filterCategory != null,
              onSelected: (_) => _pickCategory(),
            ),
            FilterChip(
              avatar: const Icon(Icons.person_outline, size: 17),
              label: Text(_memberLabel(d)),
              selected: _filterMember != null,
              onSelected: (_) => _pickMember(d),
            ),
            FilterChip(
              avatar: const Icon(Icons.date_range_outlined, size: 17),
              label: Text(_periodLabel()),
              selected: _filterRange != null,
              onSelected: (_) => _pickPeriod(),
            ),
            if (active)
              ActionChip(
                avatar: const Icon(Icons.close, size: 16),
                label: const Text('Azzera filtri'),
                onPressed: _clearFilters,
              ),
          ],
        ),
        if (active)
          Padding(
            padding: const EdgeInsets.only(top: 8),
            child: Text(
              '$expenseCount spese · $paymentCount pagamenti con i filtri attivi',
              style: TextStyle(
                fontSize: 12,
                color: Theme.of(context).colorScheme.onSurface
                    .withValues(alpha: 0.7),
              ),
            ),
          ),
      ],
    );
  }

  void _snack(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  Future<void> _run(
    Future<void> Function() action, {
    String ok = 'Fatto',
  }) async {
    try {
      await action();
      _reload();
      _snack(ok);
    } on ApiException catch (e) {
      _snack(e.message);
    } catch (_) {
      _snack('Connessione assente: riprova.');
    }
  }

  // ---------------------------------------------------------------- azioni
  Future<void> _rename(GroupDetail d) async {
    final name = TextEditingController(text: d.name);
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Rinomina gruppo'),
        content: TextField(controller: name, autofocus: true),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Annulla'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(minimumSize: const Size(100, 44)),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Salva'),
          ),
        ],
      ),
    );
    if (ok == true && name.text.trim().isNotEmpty) {
      await _run(
        () => widget.api.renameGroup(widget.groupId, name.text.trim()),
      );
    }
  }

  Future<void> _deleteGroup() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Eliminare il gruppo?'),
        content: const Text(
          'Vengono cancellati spese, pagamenti e saldi. Non si torna indietro.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Indietro'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(
              minimumSize: const Size(100, 44),
              backgroundColor: negColor,
            ),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Elimina'),
          ),
        ],
      ),
    );
    if (ok == true) {
      try {
        await widget.api.deleteGroup(widget.groupId);
        if (!mounted) return;
        Navigator.of(context).pop();
      } on ApiException catch (e) {
        _snack(e.message);
      }
    }
  }

  Future<void> _copyInvite(GroupDetail d) async {
    // Il link segue il server configurato (l'API e sempre il sito stesso).
    final link = '${widget.api.base}/join/${d.inviteCode}';
    await Clipboard.setData(ClipboardData(text: link));
    _snack('Link di invito copiato: incollalo su WhatsApp');
  }

  Future<void> _showInvite(GroupDetail d) {
    return showInviteSheet(
      context,
      groupName: d.name,
      code: d.inviteCode,
      link: '${widget.api.base}/join/${d.inviteCode}',
    );
  }

  Future<void> _inviteUsername() async {
    final added = await showInviteByUsernameSheet(
      context,
      api: widget.api,
      groupId: widget.groupId,
    );
    if (added) {
      _reload();
      _snack('Persona aggiunta al gruppo');
    }
  }

  Future<void> _shareCsv(GroupDetail d) async {
    try {
      await shareGroupCsv(d);
    } catch (e) {
      _snack(describeError(e));
    }
  }

  Future<void> _toggleRule(RecurringRule r) async {
    try {
      await widget.api.setRecurringActive(widget.groupId, r.id, !r.active);
      _reload();
      _snack(r.active ? 'Ricorrenza in pausa' : 'Ricorrenza riattivata');
    } on ApiException catch (e) {
      _snack(e.message);
    } catch (_) {
      _snack('Connessione assente: riprova.');
    }
  }

  Future<void> _deleteRule(RecurringRule r) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Eliminare "${r.description}"?'),
        content: const Text(
          'Le spese già create restano. Non verranno create le prossime.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Indietro'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(backgroundColor: negColor),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Elimina'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    try {
      await widget.api.deleteRecurring(widget.groupId, r.id);
      _reload();
      _snack('Ricorrenza eliminata');
    } on ApiException catch (e) {
      _snack(e.message);
    }
  }

  Future<void> _regenerateInvite(GroupDetail d) async {
    await _run(() async {
      await widget.api.regenerateInvite(widget.groupId);
    }, ok: 'Nuovo codice generato: condividilo di nuovo');
  }

  // ---------------------------------------------------------------- build
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<GroupDetail>(
      future: _future,
      builder: (ctx, snap) {
        if (snap.connectionState != ConnectionState.done) {
          return Scaffold(appBar: AppBar(), body: const ListSkeleton(rows: 4));
        }
        if (snap.hasError) {
          return Scaffold(
            appBar: AppBar(),
            body: ListView(
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
            ),
          );
        }
        final d = snap.data!;
        final expo = Meta.exponentOf(d.baseCurrency);
        Member? me;
        for (final m in d.members) {
          if (m.isMe && m.active) {
            me = m;
            break;
          }
        }
        final canManageInvite = d.isOwner || d.perms.contains('members_manage');
        final filteredExpenses = filterExpenses(
          d.expenses,
          query: _search,
          category: _filterCategory,
          memberId: _filterMember,
          from: _filterRange?.start,
          to: _filterRange?.end,
        );
        final filteredPayments = filterPayments(
          d.payments,
          query: _search,
          memberId: _filterMember,
          from: _filterRange?.start,
          to: _filterRange?.end,
        );
        return Scaffold(
          appBar: AppBar(
            title: Text(
              d.name,
              style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18),
            ),
            actions: [
              PopupMenuButton<String>(
                onSelected: (v) {
                  if (v == 'rename') _rename(d);
                  if (v == 'delete') _deleteGroup();
                  if (v == 'export') _shareCsv(d);
                },
                itemBuilder: (_) => [
                  const PopupMenuItem(
                    value: 'export',
                    child: Text('Esporta CSV'),
                  ),
                  if (d.isOwner) ...[
                    const PopupMenuItem(
                      value: 'rename',
                      child: Text('Rinomina'),
                    ),
                    const PopupMenuItem(
                      value: 'delete',
                      child: Text('Elimina gruppo'),
                    ),
                  ],
                ],
              ),
            ],
          ),
          body: RefreshIndicator(
            onRefresh: () async => _reload(),
            child: ListView(
              padding: const EdgeInsets.fromLTRB(16, 4, 16, 24),
              children: [
                if (me != null) ...[
                  HeroBalance(
                    nets: {d.baseCurrency: me.netMinor},
                    label: 'Il tuo saldo nel gruppo',
                    footnote: me.netMinor > 0
                        ? 'Ti devono'
                        : me.netMinor < 0
                        ? 'Devi'
                        : 'In pari',
                  ),
                  const SizedBox(height: 16),
                ],
                SectionCard(
                  title: 'Saldi',
                  child: Column(
                    children: [
                      for (final m in d.members.where((m) => m.active))
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 6),
                          child: Row(
                            children: [
                              Container(
                                width: 10,
                                height: 10,
                                decoration: BoxDecoration(
                                  color: parseHexColor(m.color),
                                  shape: BoxShape.circle,
                                ),
                              ),
                              const SizedBox(width: 10),
                              Expanded(
                                child: Text(
                                  m.isMe ? '${m.name} (tu)' : m.name,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                              Text(
                                m.netMinor == 0
                                    ? 'in pari'
                                    : formatSigned(
                                        m.netMinor,
                                        expo,
                                        d.baseCurrency,
                                      ),
                                style: TextStyle(
                                  fontWeight: FontWeight.w800,
                                  color: m.netMinor > 0
                                      ? posOn(context)
                                      : m.netMinor < 0
                                      ? negOn(context)
                                      : Theme.of(context).colorScheme.onSurface
                                            .withValues(alpha: 0.7),
                                ),
                              ),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
                if (d.transfers.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  SectionCard(
                    title: 'Chi paga a chi',
                    child: Column(
                      children: [
                        for (final t in d.transfers)
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 5),
                            child: Row(
                              children: [
                                Expanded(
                                  child: Text(
                                    '${d.memberById(t.payerId)?.name ?? "?"} → '
                                    '${d.memberById(t.payeeId)?.name ?? "?"}',
                                    style: const TextStyle(
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ),
                                Text(
                                  '${formatMinor(t.amountMinor, expo)} ${d.baseCurrency}',
                                  style: TextStyle(
                                    fontWeight: FontWeight.w800,
                                    color:
                                        Theme.of(context).brightness ==
                                            Brightness.dark
                                        ? sage
                                        : sageInk,
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
                  title: 'Spese',
                  trailing: Text(
                    '${formatMinor(d.totalExpensesMinor, expo)} ${d.baseCurrency}',
                    style: TextStyle(
                      fontWeight: FontWeight.w800,
                      color: Theme.of(context).brightness == Brightness.dark
                          ? sage
                          : sageInk,
                    ),
                  ),
                  child: Column(
                    children: [
                      _buildFilters(
                        d,
                        expenseCount: filteredExpenses.length,
                        paymentCount: filteredPayments.length,
                      ),
                      const SizedBox(height: 6),
                      if (filteredExpenses.isEmpty)
                        EmptyState(
                          compact: true,
                          icon: Icons.receipt_long_outlined,
                          title: _filtersActive
                              ? 'Nessun risultato'
                              : 'Nessuna spesa',
                          message: _filtersActive
                              ? 'Prova a cambiare o azzerare i filtri.'
                              : 'Aggiungi la prima spesa del gruppo.',
                          action: _filtersActive
                              ? OutlinedButton.icon(
                                  onPressed: _clearFilters,
                                  icon: const Icon(
                                    Icons.filter_alt_off_outlined,
                                    size: 18,
                                  ),
                                  label: const Text('Azzera filtri'),
                                )
                              : OutlinedButton.icon(
                                  onPressed: () {
                                    hapticConfirm();
                                    showExpenseSheet(
                                      context,
                                      api: widget.api,
                                      detail: d,
                                      onDone: _reload,
                                    );
                                  },
                                  icon: const Icon(Icons.add, size: 18),
                                  label: const Text('Aggiungi spesa'),
                                ),
                        )
                      else
                        for (final e in filteredExpenses)
                          Semantics(
                            button: true,
                            excludeSemantics: true,
                            label:
                                'Spesa ${e.description}, '
                                '${formatMinor(e.amountMinor, Meta.exponentOf(e.currency))} '
                                '${e.currency}, pagata da ${e.payerName}, '
                                '${categoryInfo(e.category).label}'
                                '${e.createdAt != null ? ', ${formatDateTime(e.createdAt)}' : ''}'
                                '${e.voided ? ', annullata' : ''}',
                            child: InkWell(
                              borderRadius: BorderRadius.circular(10),
                              onTap: () => showExpenseDetail(
                                context,
                                api: widget.api,
                                detail: d,
                                expense: e,
                                onDone: _reload,
                              ),
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                  vertical: 7,
                                ),
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            e.description,
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                            style: TextStyle(
                                              fontWeight: FontWeight.w600,
                                              decoration: e.voided
                                                  ? TextDecoration.lineThrough
                                                  : null,
                                              color: e.voided
                                                  ? Theme.of(context)
                                                        .colorScheme
                                                        .onSurface
                                                        .withValues(alpha: 0.68)
                                                  : null,
                                            ),
                                          ),
                                          const SizedBox(height: 2),
                                          Text(
                                            '${categoryInfo(e.category).label}'
                                            ' · ${e.payerName}'
                                            '${e.createdAt != null ? ' · ${formatDateTime(e.createdAt)}' : ''}'
                                            '${e.voided ? ' · annullata' : ''}'
                                            '${e.currency != d.baseCurrency ? ' · vale ${formatMinor(e.baseAmountMinor, expo)} ${d.baseCurrency}' : ''}',
                                            style: TextStyle(
                                              fontSize: 12,
                                              color: Theme.of(context)
                                                  .colorScheme
                                                  .onSurface
                                                  .withValues(
                                                    alpha: e.voided ? 0.7 : 0.7,
                                                  ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.end,
                                      children: [
                                        Text(
                                          '${formatMinor(e.amountMinor, Meta.exponentOf(e.currency))} ${e.currency}',
                                          style: TextStyle(
                                            fontWeight: FontWeight.w800,
                                            decoration: e.voided
                                                ? TextDecoration.lineThrough
                                                : null,
                                            color: e.voided
                                                ? Theme.of(context)
                                                      .colorScheme
                                                      .onSurface
                                                      .withValues(alpha: 0.68)
                                                : null,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                    ],
                  ),
                ),
                if (filteredPayments.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  SectionCard(
                    title: 'Pagamenti',
                    child: Column(
                      children: [
                        for (final p in filteredPayments)
                          Semantics(
                            button: true,
                            excludeSemantics: true,
                            label:
                                'Pagamento da ${p.fromName} a ${p.toName}, '
                                '${formatMinor(p.amountMinor, expo)} ${p.currency}'
                                '${p.note != null && p.note!.trim().isNotEmpty ? ', ${p.note!.trim()}' : ''}'
                                '${p.createdAt != null ? ', ${formatDateTime(p.createdAt)}' : ''}'
                                '${p.voided ? ', annullato' : ''}',
                            child: InkWell(
                              borderRadius: BorderRadius.circular(10),
                              onTap: () => showPaymentDetail(
                                context,
                                api: widget.api,
                                detail: d,
                                payment: p,
                                onDone: _reload,
                              ),
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                  vertical: 7,
                                ),
                                child: Row(
                                  children: [
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            '${p.fromName} → ${p.toName}',
                                            style: TextStyle(
                                              fontWeight: FontWeight.w600,
                                              decoration: p.voided
                                                  ? TextDecoration.lineThrough
                                                  : null,
                                              color: p.voided
                                                  ? Theme.of(context)
                                                        .colorScheme
                                                        .onSurface
                                                        .withValues(alpha: 0.68)
                                                  : null,
                                            ),
                                          ),
                                          if ((p.note ?? '')
                                                  .trim()
                                                  .isNotEmpty ||
                                              p.createdAt != null) ...[
                                            const SizedBox(height: 2),
                                            Text(
                                              [
                                                if (p.voided) 'annullato',
                                                if ((p.note ?? '')
                                                    .trim()
                                                    .isNotEmpty)
                                                  p.note!.trim(),
                                                if (p.createdAt != null)
                                                  formatDateTime(p.createdAt),
                                              ].join(' · '),
                                              maxLines: 1,
                                              overflow: TextOverflow.ellipsis,
                                              style: TextStyle(
                                                fontSize: 12,
                                                color: Theme.of(context)
                                                    .colorScheme
                                                    .onSurface
                                                    .withValues(alpha: 0.7),
                                              ),
                                            ),
                                          ],
                                        ],
                                      ),
                                    ),
                                    Text(
                                      '${formatMinor(p.amountMinor, expo)} ${p.currency}',
                                      style: TextStyle(
                                        fontWeight: FontWeight.w800,
                                        decoration: p.voided
                                            ? TextDecoration.lineThrough
                                            : null,
                                        color: p.voided
                                            ? Theme.of(context)
                                                  .colorScheme
                                                  .onSurface
                                                  .withValues(alpha: 0.68)
                                            : null,
                                      ),
                                    ),
                                    const SizedBox(width: 4),
                                    Icon(
                                      Icons.chevron_right,
                                      size: 17,
                                      color: Theme.of(context)
                                          .colorScheme
                                          .onSurface
                                          .withValues(alpha: 0.7),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ],
                const SizedBox(height: 12),
                FutureBuilder<List<RecurringRule>>(
                  future: _rulesFuture,
                  builder: (ctx, snap) {
                    final rules = snap.data ?? const <RecurringRule>[];
                    if (rules.isEmpty) return const SizedBox.shrink();
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: SectionCard(
                        title: 'Spese ricorrenti',
                        child: Column(
                          children: [
                            for (final r in rules)
                              Padding(
                                padding: const EdgeInsets.symmetric(
                                  vertical: 4,
                                ),
                                child: Row(
                                  children: [
                                    Icon(
                                      categoryInfo(r.category).icon,
                                      size: 20,
                                      color: categoryInfo(r.category).color,
                                    ),
                                    const SizedBox(width: 10),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            r.description,
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                            style: TextStyle(
                                              fontWeight: FontWeight.w600,
                                              color: r.active
                                                  ? null
                                                  : Theme.of(ctx)
                                                        .colorScheme
                                                        .onSurface
                                                        .withValues(alpha: 0.7),
                                            ),
                                          ),
                                          Text(
                                            '${r.frequencyLabel}'
                                            '${r.nextRun != null ? ' · prossima ${formatDateTime(r.nextRun)}' : ''}'
                                            '${r.active ? '' : ' · in pausa'}',
                                            style: TextStyle(
                                              fontSize: 11.5,
                                              color: Theme.of(ctx)
                                                  .colorScheme
                                                  .onSurface
                                                  .withValues(alpha: 0.7),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    Text(
                                      '${formatMinor(r.amountMinor, Meta.exponentOf(r.currency))} ${r.currency}',
                                      style: const TextStyle(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 12.5,
                                      ),
                                    ),
                                    Switch(
                                      value: r.active,
                                      onChanged: (_) => _toggleRule(r),
                                    ),
                                    IconButton(
                                      tooltip: 'Elimina ricorrenza',
                                      onPressed: () => _deleteRule(r),
                                      icon: const Icon(
                                        Icons.delete_outline,
                                        size: 19,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
                SectionCard(
                  title: 'Invita amici',
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Codice: ${d.inviteCode}',
                        style: const TextStyle(
                          fontWeight: FontWeight.w800,
                          fontSize: 15,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(
                            child: FilledButton.icon(
                              onPressed: () => _showInvite(d),
                              icon: const Icon(Icons.qr_code_2, size: 19),
                              label: const Text('QR e link'),
                            ),
                          ),
                          if (canManageInvite) ...[
                            const SizedBox(width: 8),
                            OutlinedButton.icon(
                              onPressed: _inviteUsername,
                              icon: const Icon(Icons.alternate_email, size: 17),
                              label: const Text('username'),
                            ),
                          ],
                        ],
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Expanded(
                            child: TextButton.icon(
                              onPressed: () => _copyInvite(d),
                              icon: const Icon(Icons.link, size: 17),
                              label: const Text('Copia link'),
                            ),
                          ),
                          if (canManageInvite)
                            TextButton(
                              onPressed: () => _regenerateInvite(d),
                              child: const Text('Nuovo codice'),
                            ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          bottomNavigationBar: SafeArea(
            minimum: const EdgeInsets.fromLTRB(16, 8, 16, 12),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    style: OutlinedButton.styleFrom(
                      minimumSize: const Size.fromHeight(50),
                    ),
                    onPressed: () {
                      hapticConfirm();
                      showPaymentSheet(
                        context,
                        api: widget.api,
                        detail: d,
                        onDone: _reload,
                      );
                    },
                    icon: const Icon(Icons.swap_horiz, size: 19),
                    label: const Text('Pagamento'),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: FilledButton.icon(
                    onPressed: () {
                      hapticConfirm();
                      showExpenseSheet(
                        context,
                        api: widget.api,
                        detail: d,
                        onDone: _reload,
                      );
                    },
                    icon: const Icon(Icons.add, size: 19),
                    label: const Text('Spesa'),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
