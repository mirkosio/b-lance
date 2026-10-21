import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../api.dart';
import '../models.dart';
import '../sheets/expense_sheet.dart';
import '../sheets/payment_sheet.dart';
import '../ui.dart';

class GroupScreen extends StatefulWidget {
  const GroupScreen({super.key, required this.api, required this.groupId});

  final Api api;
  final int groupId;

  @override
  State<GroupScreen> createState() => _GroupScreenState();
}

class _GroupScreenState extends State<GroupScreen> {
  late Future<GroupDetail> _future;

  @override
  void initState() {
    super.initState();
    _future = widget.api.groupDetail(widget.groupId);
  }

  void _reload() {
    setState(() => _future = widget.api.groupDetail(widget.groupId));
  }

  void _snack(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  Future<void> _run(Future<void> Function() action, {String ok = 'Fatto'}) async {
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
  Future<void> _voidExpense(GroupDetail d, Expense e) async {
    final me = d.members.firstWhere((m) => m.isMe, orElse: () => d.members.first);
    final allowed = e.createdBy == me.userId || me.canExpenseManage;
    if (!allowed) {
      _snack('Puoi annullare solo le spese che hai inserito tu');
      return;
    }
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Annullare "${e.description}"?'),
        content: const Text('La spesa resta nello storico, ma non conta più nei saldi.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Indietro')),
          FilledButton(
            style: FilledButton.styleFrom(minimumSize: const Size(100, 44)),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Annulla spesa'),
          ),
        ],
      ),
    );
    if (ok == true) {
      await _run(() => widget.api.voidExpense(widget.groupId, e.id), ok: 'Spesa annullata');
    }
  }

  Future<void> _deletePayment(GroupDetail d, Payment p) async {
    final me = d.members.firstWhere((m) => m.isMe, orElse: () => d.members.first);
    final involved = p.fromUser == me.userId || p.toUser == me.userId;
    if (!involved && !me.canPaymentManage) {
      _snack('Puoi eliminare solo i pagamenti in cui sei coinvolto');
      return;
    }
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Eliminare il pagamento?'),
        content: Text('${p.fromName} → ${p.toName}'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Indietro')),
          FilledButton(
            style: FilledButton.styleFrom(minimumSize: const Size(100, 44)),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Elimina'),
          ),
        ],
      ),
    );
    if (ok == true) {
      await _run(() => widget.api.deletePayment(widget.groupId, p.id), ok: 'Pagamento eliminato');
    }
  }

  Future<void> _rename(GroupDetail d) async {
    final name = TextEditingController(text: d.name);
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Rinomina gruppo'),
        content: TextField(controller: name, autofocus: true),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Annulla')),
          FilledButton(
            style: FilledButton.styleFrom(minimumSize: const Size(100, 44)),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Salva'),
          ),
        ],
      ),
    );
    if (ok == true && name.text.trim().isNotEmpty) {
      await _run(() => widget.api.renameGroup(widget.groupId, name.text.trim()));
    }
  }

  Future<void> _deleteGroup() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Eliminare il gruppo?'),
        content: const Text('Vengono cancellati spese, pagamenti e saldi. Non si torna indietro.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Indietro')),
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
          return const Scaffold(body: Center(child: CircularProgressIndicator(color: sage)));
        }
        if (snap.hasError) {
          return Scaffold(
            appBar: AppBar(),
            body: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(snap.error is ApiException
                      ? (snap.error as ApiException).message
                      : 'Connessione assente.'),
                  const SizedBox(height: 12),
                  OutlinedButton.icon(
                    onPressed: _reload,
                    icon: const Icon(Icons.refresh),
                    label: const Text('Riprova'),
                  ),
                ],
              ),
            ),
          );
        }
        final d = snap.data!;
        final expo = Meta.exponentOf(d.baseCurrency);
        final canManageInvite = d.isOwner || d.perms.contains('members_manage');
        return Scaffold(
          appBar: AppBar(
            title: Text(d.name, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
            actions: [
              if (d.isOwner)
                PopupMenuButton<String>(
                  onSelected: (v) {
                    if (v == 'rename') _rename(d);
                    if (v == 'delete') _deleteGroup();
                  },
                  itemBuilder: (_) => const [
                    PopupMenuItem(value: 'rename', child: Text('Rinomina')),
                    PopupMenuItem(value: 'delete', child: Text('Elimina gruppo')),
                  ],
                ),
            ],
          ),
          body: RefreshIndicator(
            onRefresh: () async => _reload(),
            child: ListView(
              padding: const EdgeInsets.fromLTRB(16, 4, 16, 24),
              children: [
                _SectionCard(
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
                                  color: _parseColor(m.color),
                                  shape: BoxShape.circle,
                                ),
                              ),
                              const SizedBox(width: 10),
                              Expanded(
                                child: Text(
                                  m.isMe ? '${m.name} (tu)' : m.name,
                                  style: const TextStyle(fontWeight: FontWeight.w600),
                                ),
                              ),
                              Text(
                                m.netMinor == 0
                                    ? 'in pari'
                                    : formatSigned(m.netMinor, expo, d.baseCurrency),
                                style: TextStyle(
                                  fontWeight: FontWeight.w800,
                                  color: m.netMinor > 0
                                      ? posColor
                                      : m.netMinor < 0
                                          ? negColor
                                          : Theme.of(context)
                                              .colorScheme
                                              .onSurface
                                              .withValues(alpha: 0.45),
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
                  _SectionCard(
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
                                    style: const TextStyle(fontWeight: FontWeight.w600),
                                  ),
                                ),
                                Text(
                                  '${formatMinor(t.amountMinor, expo)} ${d.baseCurrency}',
                                  style: const TextStyle(fontWeight: FontWeight.w800, color: sage),
                                ),
                              ],
                            ),
                          ),
                      ],
                    ),
                  ),
                ],
                const SizedBox(height: 12),
                _SectionCard(
                  title: 'Spese',
                  trailing: Text(
                    '${formatMinor(d.totalExpensesMinor, expo)} ${d.baseCurrency}',
                    style: const TextStyle(fontWeight: FontWeight.w800, color: sage),
                  ),
                  child: d.expenses.isEmpty
                      ? Padding(
                          padding: const EdgeInsets.symmetric(vertical: 8),
                          child: Text(
                            'Nessuna spesa: aggiungine una col pulsante sotto.',
                            style: TextStyle(
                              fontSize: 13.5,
                              color: Theme.of(context)
                                  .colorScheme
                                  .onSurface
                                  .withValues(alpha: 0.55),
                            ),
                          ),
                        )
                      : Column(
                          children: [
                            for (final e in d.expenses)
                              InkWell(
                                borderRadius: BorderRadius.circular(10),
                                onTap: () => _voidExpense(d, e),
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(vertical: 7),
                                  child: Row(
                                    children: [
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              e.description,
                                              maxLines: 1,
                                              overflow: TextOverflow.ellipsis,
                                              style: const TextStyle(fontWeight: FontWeight.w600),
                                            ),
                                            const SizedBox(height: 2),
                                            Text(
                                              'ha pagato ${e.payerName}'
                                              '${e.currency != d.baseCurrency ? ' · vale ${formatMinor(e.baseAmountMinor, expo)} ${d.baseCurrency}' : ''}',
                                              style: TextStyle(
                                                fontSize: 12,
                                                color: Theme.of(context)
                                                    .colorScheme
                                                    .onSurface
                                                    .withValues(alpha: 0.55),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      Text(
                                        '${formatMinor(e.amountMinor, Meta.exponentOf(e.currency))} ${e.currency}',
                                        style: const TextStyle(fontWeight: FontWeight.w800),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                          ],
                        ),
                ),
                if (d.payments.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  _SectionCard(
                    title: 'Pagamenti',
                    child: Column(
                      children: [
                        for (final p in d.payments)
                          InkWell(
                            borderRadius: BorderRadius.circular(10),
                            onTap: () => _deletePayment(d, p),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(vertical: 6),
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      '${p.fromName} → ${p.toName}',
                                      style: const TextStyle(fontWeight: FontWeight.w600),
                                    ),
                                  ),
                                  Text(
                                    '${formatMinor(p.amountMinor, expo)} ${p.currency}',
                                    style: const TextStyle(fontWeight: FontWeight.w800),
                                  ),
                                  const SizedBox(width: 4),
                                  Icon(
                                    Icons.close,
                                    size: 15,
                                    color: Theme.of(context)
                                        .colorScheme
                                        .onSurface
                                        .withValues(alpha: 0.35),
                                  ),
                                ],
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                ],
                const SizedBox(height: 12),
                _SectionCard(
                  title: 'Invita amici',
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Codice: ${d.inviteCode}',
                        style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 15),
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton.icon(
                              onPressed: () => _copyInvite(d),
                              icon: const Icon(Icons.link, size: 18),
                              label: const Text('Copia link'),
                            ),
                          ),
                          if (canManageInvite) ...[
                            const SizedBox(width: 8),
                            OutlinedButton(
                              onPressed: () => _regenerateInvite(d),
                              child: const Text('Nuovo codice'),
                            ),
                          ],
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
                    onPressed: () => showPaymentSheet(
                      context,
                      api: widget.api,
                      detail: d,
                      onDone: _reload,
                    ),
                    icon: const Icon(Icons.swap_horiz, size: 19),
                    label: const Text('Pagamento'),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: FilledButton.icon(
                    onPressed: () => showExpenseSheet(
                      context,
                      api: widget.api,
                      detail: d,
                      onDone: _reload,
                    ),
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

  Color _parseColor(String hex) {
    var h = hex.replaceFirst('#', '');
    if (h.length == 6) h = 'FF$h';
    final v = int.tryParse(h, radix: 16);
    return v == null ? sage : Color(v);
  }
}

class _SectionCard extends StatelessWidget {
  const _SectionCard({required this.title, required this.child, this.trailing});

  final String title;
  final Widget child;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(17),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(title,
                      style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 15)),
                ),
                ?trailing,
              ],
            ),
            const SizedBox(height: 10),
            child,
          ],
        ),
      ),
    );
  }
}
