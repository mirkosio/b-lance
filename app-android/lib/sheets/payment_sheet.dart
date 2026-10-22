import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';

/// Foglio "Registra pagamento": anche parziale, come sul sito.
Future<void> showPaymentSheet(
  BuildContext context, {
  required Api api,
  required GroupDetail detail,
  required VoidCallback onDone,
}) {
  return showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (_) => _PaymentSheet(api: api, detail: detail, onDone: onDone),
  );
}

class _PaymentSheet extends StatefulWidget {
  const _PaymentSheet({
    required this.api,
    required this.detail,
    required this.onDone,
  });

  final Api api;
  final GroupDetail detail;
  final VoidCallback onDone;

  @override
  State<_PaymentSheet> createState() => _PaymentSheetState();
}

class _PaymentSheetState extends State<_PaymentSheet> {
  final _amount = TextEditingController();
  final _note = TextEditingController();

  late final List<Member> _people = widget.detail.members
      .where((m) => m.active)
      .toList();

  // Default sensati: chi deve -> chi e in credito.
  late int? _from = _defaults()['from'];
  late int? _to = _defaults()['to'];
  bool _busy = false;

  Map<String, int?> _defaults() {
    if (_people.isEmpty) return {'from': null, 'to': null};
    final debtor = _people.reduce((a, b) => a.netMinor < b.netMinor ? a : b);
    final creditor = _people.reduce((a, b) => a.netMinor > b.netMinor ? a : b);
    if (debtor.userId == creditor.userId) {
      return {'from': _people.first.userId, 'to': _people.last.userId};
    }
    return {'from': debtor.userId, 'to': creditor.userId};
  }

  @override
  void dispose() {
    _amount.dispose();
    _note.dispose();
    super.dispose();
  }

  void _snack(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  Future<void> _submit() async {
    final amount = _amount.text.trim().replaceAll(',', '.');
    if (double.tryParse(amount) == null || double.parse(amount) <= 0) {
      _snack('Importo non valido: deve essere maggiore di zero');
      return;
    }
    if (_from == null || _to == null) return;
    if (_from == _to) {
      _snack('Scegli due persone diverse');
      return;
    }
    setState(() => _busy = true);
    try {
      await widget.api.addPayment(
        widget.detail.id,
        fromUser: _from!,
        toUser: _to!,
        amount: amount,
        note: _note.text.trim(),
      );
      if (!mounted) return;
      Navigator.of(context).pop();
      widget.onDone();
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('Pagamento registrato')));
    } on ApiException catch (e) {
      _snack(e.message);
      if (mounted) setState(() => _busy = false);
    } catch (_) {
      _snack('Connessione assente: riprova.');
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final base = widget.detail.baseCurrency;
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 10, 20, 20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.only(bottom: 14),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.onSurface
                      .withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
            ),
            const Text(
              'Registra pagamento',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 6),
            Text(
              'Un bonifico fra due membri, anche parziale.',
              style: TextStyle(
                fontSize: 12.5,
                color: Theme.of(context).colorScheme.onSurface
                    .withValues(alpha: 0.55),
              ),
            ),
            const SizedBox(height: 14),
            Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<int>(
                    initialValue: _from,
                    decoration: const InputDecoration(labelText: 'Chi paga'),
                    items: [
                      for (final m in _people)
                        DropdownMenuItem(value: m.userId, child: Text(m.name)),
                    ],
                    onChanged: (v) => setState(() => _from = v),
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 8),
                  child: Icon(Icons.arrow_forward, size: 18),
                ),
                Expanded(
                  child: DropdownButtonFormField<int>(
                    initialValue: _to,
                    decoration: const InputDecoration(labelText: 'A chi'),
                    items: [
                      for (final m in _people)
                        DropdownMenuItem(value: m.userId, child: Text(m.name)),
                    ],
                    onChanged: (v) => setState(() => _to = v),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _amount,
              keyboardType: const TextInputType.numberWithOptions(
                decimal: true,
              ),
              decoration: InputDecoration(
                labelText: 'Importo',
                hintText: 'es. 15,00 $base',
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _note,
              textCapitalization: TextCapitalization.sentences,
              decoration: const InputDecoration(labelText: 'Nota (opzionale)'),
            ),
            const SizedBox(height: 18),
            FilledButton(
              onPressed: _busy ? null : _submit,
              child: _busy
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : const Text('Registra pagamento'),
            ),
          ],
        ),
      ),
    );
  }
}
