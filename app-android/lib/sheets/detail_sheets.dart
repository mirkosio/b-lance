import 'package:flutter/material.dart';

import '../api.dart';
import '../categories.dart';
import '../models.dart';
import '../ui.dart';
import 'expense_sheet.dart';

/// Dettaglio di una spesa. Il tocco non annulla più niente: qui si legge
/// tutto e, se hai il permesso, decidi di annullare.
Future<void> showExpenseDetail(
  BuildContext context, {
  required Api api,
  required GroupDetail detail,
  required Expense expense,
  required VoidCallback onDone,
}) {
  return showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (_) => _ExpenseDetail(
      api: api,
      detail: detail,
      expense: expense,
      onDone: onDone,
      parentContext: context,
    ),
  );
}

/// Dettaglio di un pagamento, con nota e data; l'eliminazione sta qui.
Future<void> showPaymentDetail(
  BuildContext context, {
  required Api api,
  required GroupDetail detail,
  required Payment payment,
  required VoidCallback onDone,
}) {
  return showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (_) => _PaymentDetail(
      api: api,
      detail: detail,
      payment: payment,
      onDone: onDone,
      parentContext: context,
    ),
  );
}

Member? _meOf(GroupDetail detail) {
  for (final m in detail.members) {
    if (m.isMe) return m;
  }
  return null;
}

String _nameOf(GroupDetail detail, int userId) {
  for (final m in detail.members) {
    if (m.userId == userId) return m.isMe ? '${m.name} (tu)' : m.name;
  }
  return '?';
}

class _ExpenseDetail extends StatefulWidget {
  const _ExpenseDetail({
    required this.api,
    required this.detail,
    required this.expense,
    required this.onDone,
    required this.parentContext,
  });

  final Api api;
  final GroupDetail detail;
  final Expense expense;
  final VoidCallback onDone;
  final BuildContext parentContext;

  @override
  State<_ExpenseDetail> createState() => _ExpenseDetailState();
}

class _ExpenseDetailState extends State<_ExpenseDetail> {
  bool _busy = false;

  bool get _canVoid {
    final me = _meOf(widget.detail);
    if (me == null || widget.expense.voided) return false;
    return widget.expense.createdBy == me.userId || me.canExpenseManage;
  }

  bool get _canEdit {
    final me = _meOf(widget.detail);
    if (me == null || widget.expense.voided) return false;
    return widget.expense.createdBy == me.userId || me.canExpenseManage;
  }

  Future<void> _edit() async {
    final parent = widget.parentContext;
    if (!parent.mounted) return;
    Navigator.pop(context);
    await showExpenseSheet(
      parent,
      api: widget.api,
      detail: widget.detail,
      existing: widget.expense,
      onDone: widget.onDone,
    );
  }

  Future<void> _void() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Annullare "${widget.expense.description}"?'),
        content: const Text(
          'La spesa resta nello storico con il segno "annullata" e non conta più nei saldi.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Indietro'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: negColor,
              minimumSize: const Size(100, 44),
            ),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Annulla spesa'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    if (!widget.parentContext.mounted) return;
    final messenger = ScaffoldMessenger.of(widget.parentContext);
    setState(() => _busy = true);
    try {
      await widget.api.voidExpense(widget.detail.id, widget.expense.id);
      if (!mounted) return;
      Navigator.pop(context);
      widget.onDone();
      messenger.showSnackBar(const SnackBar(content: Text('Spesa annullata')));
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() => _busy = false);
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.message)));
    } catch (e) {
      if (!mounted) return;
      setState(() => _busy = false);
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(describeError(e))));
    }
  }

  @override
  Widget build(BuildContext context) {
    final e = widget.expense;
    final expo = Meta.exponentOf(e.currency);
    final converted = e.currency != e.baseCurrency;
    final surface = Theme.of(context).colorScheme.onSurface;
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(20, 10, 20, 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(bottom: 16),
              decoration: BoxDecoration(
                color: surface.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(4),
              ),
            ),
          ),
          Row(
            children: [
              Expanded(
                child: Text(
                  e.description,
                  style: TextStyle(
                    fontSize: 19,
                    fontWeight: FontWeight.w800,
                    decoration: e.voided ? TextDecoration.lineThrough : null,
                  ),
                ),
              ),
              if (e.voided) const _VoidedBadge(),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            '${formatMinor(e.amountMinor, expo)} ${e.currency}',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.w800,
              decoration: e.voided ? TextDecoration.lineThrough : null,
              color: e.voided ? surface.withValues(alpha: 0.45) : null,
            ),
          ),
          if (converted)
            Padding(
              padding: const EdgeInsets.only(top: 2),
              child: Text(
                '= ${formatMinor(e.baseAmountMinor, Meta.exponentOf(e.baseCurrency))} ${e.baseCurrency}'
                ' al tasso del giorno',
                style: TextStyle(
                  fontSize: 13,
                  color: surface.withValues(alpha: 0.55),
                ),
              ),
            ),
          if (e.voided) ...[
            const SizedBox(height: 14),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: negColor.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: negColor.withValues(alpha: 0.30)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.info_outline, size: 18, color: negColor),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Spesa annullata: resta nello storico ma non conta nei saldi.'
                      '${e.voidedAt != null ? '\nAnnullata il ${formatDateTime(e.voidedAt)}.' : ''}',
                      style: const TextStyle(fontSize: 12.5, color: negColor),
                    ),
                  ),
                ],
              ),
            ),
          ],
          const SizedBox(height: 18),
          _Row(label: 'Categoria', value: categoryInfo(e.category).label),
          _Row(label: 'Pagato da', value: _nameOf(widget.detail, e.paidBy)),
          _Row(label: 'Divisione', value: splitMethodLabel(e.splitMethod)),
          if (e.createdAt != null)
            _Row(label: 'Data', value: formatDateTime(e.createdAt)),
          if (e.shares.isNotEmpty) ...[
            const SizedBox(height: 16),
            const Text('Quote', style: TextStyle(fontWeight: FontWeight.w800)),
            const SizedBox(height: 6),
            for (final s in e.shares)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 3),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        _nameOf(widget.detail, s.userId),
                        style: TextStyle(
                          color: surface.withValues(alpha: 0.75),
                        ),
                      ),
                    ),
                    Text(
                      '${formatMinor(s.amountMinor, Meta.exponentOf(e.baseCurrency))} ${e.baseCurrency}',
                      style: const TextStyle(fontWeight: FontWeight.w700),
                    ),
                  ],
                ),
              ),
          ],
          const SizedBox(height: 22),
          if (_canEdit) ...[
            OutlinedButton.icon(
              style: OutlinedButton.styleFrom(
                minimumSize: const Size.fromHeight(50),
              ),
              onPressed: _busy ? null : _edit,
              icon: const Icon(Icons.edit_outlined, size: 19),
              label: const Text('Modifica spesa'),
            ),
            const SizedBox(height: 8),
          ],
          if (_canVoid) ...[
            FilledButton.icon(
              style: FilledButton.styleFrom(
                backgroundColor: negColor,
                minimumSize: const Size.fromHeight(50),
              ),
              onPressed: _busy ? null : _void,
              icon: _busy
                  ? const SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : const Icon(Icons.undo, size: 19),
              label: const Text('Annulla spesa'),
            ),
            const SizedBox(height: 8),
          ],
          OutlinedButton(
            style: OutlinedButton.styleFrom(
              minimumSize: const Size.fromHeight(50),
            ),
            onPressed: () => Navigator.pop(context),
            child: const Text('Chiudi'),
          ),
        ],
      ),
    );
  }
}

class _PaymentDetail extends StatefulWidget {
  const _PaymentDetail({
    required this.api,
    required this.detail,
    required this.payment,
    required this.onDone,
    required this.parentContext,
  });

  final Api api;
  final GroupDetail detail;
  final Payment payment;
  final VoidCallback onDone;
  final BuildContext parentContext;

  @override
  State<_PaymentDetail> createState() => _PaymentDetailState();
}

class _PaymentDetailState extends State<_PaymentDetail> {
  bool _busy = false;

  bool get _canDelete {
    final me = _meOf(widget.detail);
    if (me == null) return false;
    final involved =
        widget.payment.fromUser == me.userId ||
        widget.payment.toUser == me.userId;
    return involved || me.canPaymentManage;
  }

  Future<void> _delete() async {
    final p = widget.payment;
    final ok = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Eliminare il pagamento?'),
        content: Text(
          '${p.fromName} → ${p.toName}\n'
          '${formatMinor(p.amountMinor, Meta.exponentOf(p.currency))} ${p.currency}',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Indietro'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: negColor,
              minimumSize: const Size(100, 44),
            ),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Elimina'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    if (!widget.parentContext.mounted) return;
    final messenger = ScaffoldMessenger.of(widget.parentContext);
    setState(() => _busy = true);
    try {
      await widget.api.deletePayment(widget.detail.id, p.id);
      if (!mounted) return;
      Navigator.pop(context);
      widget.onDone();
      messenger.showSnackBar(
        const SnackBar(content: Text('Pagamento eliminato')),
      );
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() => _busy = false);
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.message)));
    } catch (e) {
      if (!mounted) return;
      setState(() => _busy = false);
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(describeError(e))));
    }
  }

  @override
  Widget build(BuildContext context) {
    final p = widget.payment;
    final surface = Theme.of(context).colorScheme.onSurface;
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(20, 10, 20, 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(bottom: 16),
              decoration: BoxDecoration(
                color: surface.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(4),
              ),
            ),
          ),
          const Text(
            'Pagamento',
            style: TextStyle(fontSize: 19, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 12),
          Text(
            '${formatMinor(p.amountMinor, Meta.exponentOf(p.currency))} ${p.currency}',
            style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 18),
          _Row(label: 'Da', value: p.fromName),
          _Row(label: 'A', value: p.toName),
          if ((p.note ?? '').trim().isNotEmpty)
            _Row(label: 'Nota', value: p.note!.trim()),
          const SizedBox(height: 22),
          if (_canDelete) ...[
            FilledButton.icon(
              style: FilledButton.styleFrom(
                backgroundColor: negColor,
                minimumSize: const Size.fromHeight(50),
              ),
              onPressed: _busy ? null : _delete,
              icon: _busy
                  ? const SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : const Icon(Icons.delete_outline, size: 19),
              label: const Text('Elimina pagamento'),
            ),
            const SizedBox(height: 8),
          ],
          OutlinedButton(
            style: OutlinedButton.styleFrom(
              minimumSize: const Size.fromHeight(50),
            ),
            onPressed: () => Navigator.pop(context),
            child: const Text('Chiudi'),
          ),
        ],
      ),
    );
  }
}

class _VoidedBadge extends StatelessWidget {
  const _VoidedBadge();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
      decoration: BoxDecoration(
        color: negColor.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: negColor.withValues(alpha: 0.30)),
      ),
      child: const Text(
        'ANNULLATA',
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.w800,
          letterSpacing: 0.6,
          color: negColor,
        ),
      ),
    );
  }
}

class _Row extends StatelessWidget {
  const _Row({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 100,
            child: Text(
              label,
              style: TextStyle(
                fontSize: 13,
                color: Theme.of(context).colorScheme.onSurface
                    .withValues(alpha: 0.55),
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(
                fontSize: 13.5,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
