import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';

/// Foglio "Nuova spesa": stesso flusso del sito, stessi controlli del server.
Future<void> showExpenseSheet(
  BuildContext context, {
  required Api api,
  required GroupDetail detail,
  required VoidCallback onDone,
}) {
  return showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (_) => _ExpenseSheet(api: api, detail: detail, onDone: onDone),
  );
}

class _ExpenseSheet extends StatefulWidget {
  const _ExpenseSheet({required this.api, required this.detail, required this.onDone});

  final Api api;
  final GroupDetail detail;
  final VoidCallback onDone;

  @override
  State<_ExpenseSheet> createState() => _ExpenseSheetState();
}

class _ExpenseSheetState extends State<_ExpenseSheet> {
  final _desc = TextEditingController();
  final _amount = TextEditingController();
  final _fx = TextEditingController();

  late final List<Member> _people = widget.detail.members.where((m) => m.active).toList();
  late int? _paidBy = _people.any((m) => m.isMe)
      ? _people.firstWhere((m) => m.isMe).userId
      : (_people.isNotEmpty ? _people.first.userId : null);
  late final Set<int> _selected = _people.map((m) => m.userId).toSet();
  String _method = 'even';
  late String _currency = widget.detail.baseCurrency;
  final Map<int, TextEditingController> _values = {};
  bool _busy = false;

  @override
  void dispose() {
    _desc.dispose();
    _amount.dispose();
    _fx.dispose();
    for (final c in _values.values) {
      c.dispose();
    }
    super.dispose();
  }

  TextEditingController _valueCtrl(int uid) =>
      _values.putIfAbsent(uid, () => TextEditingController());

  bool get _needManualRate =>
      _currency != widget.detail.baseCurrency && !Meta.hasAutoRate(_currency);

  String get _methodLabel =>
      _method == 'even' ? 'Uguale per tutti' : _method == 'exact' ? 'Importo fisso' : 'Percentuale';

  Future<void> _submit() async {
    final desc = _desc.text.trim();
    if (desc.isEmpty) {
      _snack('Scrivi cosa hai pagato (es. Cena)');
      return;
    }
    final amount = _amount.text.trim().replaceAll(',', '.');
    if (double.tryParse(amount) == null || double.parse(amount) <= 0) {
      _snack('Importo non valido: deve essere maggiore di zero');
      return;
    }
    if (_paidBy == null) return;
    if (_selected.isEmpty) {
      _snack('Seleziona almeno una persona');
      return;
    }
    final fx = _fx.text.trim();
    if (_needManualRate && (fx.isEmpty || double.tryParse(fx.replaceAll(',', '.')) == null)) {
      _snack('Scrivi il tasso: 1 $_currency vale quanti ${widget.detail.baseCurrency}?');
      return;
    }
    final values = <String, String>{};
    if (_method != 'even') {
      for (final uid in _selected) {
        values['$uid'] = _values[uid]?.text.trim() ?? '0';
      }
    }
    setState(() => _busy = true);
    try {
      await widget.api.addExpense(
        widget.detail.id,
        description: desc,
        amount: amount,
        paidBy: _paidBy!,
        members: _selected.toList(),
        splitMethod: _method,
        currency: _currency,
        fxRate: fx.replaceAll(',', '.'),
        values: values,
      );
      if (!mounted) return;
      Navigator.of(context).pop();
      widget.onDone();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Spesa aggiunta')),
      );
    } on ApiException catch (e) {
      _snack(e.message);
      if (mounted) setState(() => _busy = false);
    } catch (_) {
      _snack('Connessione assente: riprova.');
      if (mounted) setState(() => _busy = false);
    }
  }

  void _snack(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  @override
  Widget build(BuildContext context) {
    final base = widget.detail.baseCurrency;
    final currencies = Meta.currencies.where((c) => true).toList();
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
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
                  color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
            ),
            const Text('Nuova spesa',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            const SizedBox(height: 14),
            TextField(
              controller: _desc,
              textCapitalization: TextCapitalization.sentences,
              decoration: const InputDecoration(labelText: 'Cosa hai pagato? (es. Cena)'),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _amount,
                    keyboardType: const TextInputType.numberWithOptions(decimal: true),
                    decoration: const InputDecoration(labelText: 'Importo'),
                  ),
                ),
                const SizedBox(width: 10),
                SizedBox(
                  width: 130,
                  child: DropdownButtonFormField<String>(
                    initialValue: _currency,
                    decoration: const InputDecoration(labelText: 'Valuta'),
                    items: [
                      for (final c in currencies)
                        DropdownMenuItem(value: c.code, child: Text(c.code)),
                    ],
                    onChanged: (v) => setState(() => _currency = v ?? base),
                  ),
                ),
              ],
            ),
            if (_currency != base) ...[
              const SizedBox(height: 12),
              TextField(
                controller: _fx,
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
                decoration: InputDecoration(
                  labelText: _needManualRate ? 'Tasso di cambio' : 'Tasso (opzionale)',
                  hintText: '1 $_currency = ? $base',
                  helperText: _needManualRate
                      ? '$_currency non ha un tasso automatico: scrivilo tu.'
                      : 'Predefinito: tasso di oggi.',
                ),
              ),
            ],
            const SizedBox(height: 12),
            DropdownButtonFormField<int>(
              initialValue: _paidBy,
              decoration: const InputDecoration(labelText: 'Chi ha pagato'),
              items: [
                for (final m in _people) DropdownMenuItem(value: m.userId, child: Text(m.name)),
              ],
              onChanged: (v) => setState(() => _paidBy = v),
            ),
            const SizedBox(height: 16),
            const Text('Come si divide?', style: TextStyle(fontWeight: FontWeight.w700)),
            const SizedBox(height: 8),
            SegmentedButton<String>(
              segments: const [
                ButtonSegment(value: 'even', label: Text('Uguale')),
                ButtonSegment(value: 'exact', label: Text('Importo')),
                ButtonSegment(value: 'percent', label: Text('Percentuale')),
              ],
              selected: {_method},
              onSelectionChanged: (s) => setState(() => _method = s.first),
            ),
            const SizedBox(height: 10),
            Text(
              _method == 'even'
                  ? 'Tutti a botte cinque eri: il server divide al centesimo.'
                  : '$_methodLabel per persona: compila i campi qui sotto.',
              style: TextStyle(
                fontSize: 12.5,
                color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.55),
              ),
            ),
            const SizedBox(height: 6),
            for (final m in _people)
              if (_method == 'even')
                CheckboxListTile(
                  contentPadding: EdgeInsets.zero,
                  dense: true,
                  controlAffinity: ListTileControlAffinity.leading,
                  value: _selected.contains(m.userId),
                  title: Text(m.name),
                  onChanged: (v) => setState(() {
                    if (v == true) {
                      _selected.add(m.userId);
                    } else {
                      _selected.remove(m.userId);
                    }
                  }),
                )
              else
                Padding(
                  padding: const EdgeInsets.only(top: 8),
                  child: Row(
                    children: [
                      SizedBox(
                        width: 34,
                        child: Checkbox(
                          value: _selected.contains(m.userId),
                          onChanged: (v) => setState(() {
                            if (v == true) {
                              _selected.add(m.userId);
                            } else {
                              _selected.remove(m.userId);
                            }
                          }),
                        ),
                      ),
                      Expanded(child: Text(m.name)),
                      SizedBox(
                        width: 120,
                        child: TextField(
                          controller: _valueCtrl(m.userId),
                          enabled: _selected.contains(m.userId),
                          keyboardType: const TextInputType.numberWithOptions(decimal: true),
                          decoration: InputDecoration(
                            isDense: true,
                            labelText: _method == 'percent' ? '%' : base,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
            const SizedBox(height: 18),
            FilledButton(
              onPressed: _busy ? null : _submit,
              child: _busy
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                    )
                  : const Text('Aggiungi spesa'),
            ),
          ],
        ),
      ),
    );
  }
}
