import 'package:flutter/material.dart';

import '../api.dart';
import '../categories.dart';
import '../models.dart';
import '../ui.dart';
import '../widgets/currency_picker.dart';

/// Foglio "Nuova spesa" / "Modifica spesa".
///
/// Stesso flusso del sito, stessi controlli del server. Con `existing` apre
/// la modifica e precompila tutto; con `allowRecurring` permette di creare
/// una regola che il server materializzerà alla data giusta.
Future<void> showExpenseSheet(
  BuildContext context, {
  required Api api,
  required GroupDetail detail,
  required VoidCallback onDone,
  Expense? existing,
}) {
  return showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (_) => _ExpenseSheet(
      api: api,
      detail: detail,
      onDone: onDone,
      existing: existing,
    ),
  );
}

class _ExpenseSheet extends StatefulWidget {
  const _ExpenseSheet({
    required this.api,
    required this.detail,
    required this.onDone,
    this.existing,
  });

  final Api api;
  final GroupDetail detail;
  final VoidCallback onDone;
  final Expense? existing;

  @override
  State<_ExpenseSheet> createState() => _ExpenseSheetState();
}

class _ExpenseSheetState extends State<_ExpenseSheet> {
  final _desc = TextEditingController();
  final _amount = TextEditingController();
  final _fx = TextEditingController();

  late final List<Member> _people = widget.detail.members
      .where((m) => m.active)
      .toList();
  late int? _paidBy;
  late final Set<int> _selected;
  String _method = 'even';
  late String _currency;
  String _category = 'other';
  final Map<int, TextEditingController> _values = {};
  bool _busy = false;

  bool _recurring = false;
  String _frequency = 'monthly';
  int _interval = 1;

  bool get _isEdit => widget.existing != null;

  @override
  void initState() {
    super.initState();
    final e = widget.existing;
    if (e == null) {
      _paidBy = _people.any((m) => m.isMe)
          ? _people.firstWhere((m) => m.isMe).userId
          : (_people.isNotEmpty ? _people.first.userId : null);
      _selected = _people.map((m) => m.userId).toSet();
      _currency = widget.detail.baseCurrency;
    } else {
      _desc.text = e.description;
      _currency = e.currency;
      _category = e.category;
      _method = e.splitMethod;
      _fx.text = (e.fxRate ?? '').replaceFirst(RegExp(r'\.0+$'), '');
      final exp = Meta.exponentOf(e.currency);
      _amount.text = _plainMajor(e.amountMinor, exp);
      _selected = e.shares
          .map((s) => s.userId)
          .where((id) => _people.any((m) => m.userId == id))
          .toSet();
      if (_selected.isEmpty) {
        _selected.addAll(_people.map((m) => m.userId));
      }
      final activeIds = _people.map((m) => m.userId).toSet();
      _paidBy = activeIds.contains(e.paidBy)
          ? e.paidBy
          : (_people.isNotEmpty ? _people.first.userId : null);
      // Precompilo importi/percentuali dalle quote già salvate.
      for (final s in e.shares) {
        if (_method == 'percent') {
          final pct = e.baseAmountMinor == 0
              ? 0.0
              : s.amountMinor / e.baseAmountMinor * 100;
          _valueCtrl(s.userId).text = pct.toStringAsFixed(2);
        } else if (_method == 'exact') {
          final orig = e.baseAmountMinor == 0
              ? 0
              : (s.amountMinor * e.amountMinor / e.baseAmountMinor).round();
          _valueCtrl(s.userId).text = _plainMajor(orig, exp);
        }
      }
    }
  }

  String _plainMajor(int minor, int exponent) {
    // formatMinor usa la virgola e i punti delle migliaia: qui serve il
    // numero "grezzo" da rimettere in un campo di testo.
    return formatMinor(
      minor,
      exponent,
    ).replaceAll('.', '').replaceAll(',', '.');
  }

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

  String get _methodLabel => _method == 'even'
      ? 'Uguale per tutti'
      : _method == 'exact'
      ? 'Importo fisso'
      : 'Percentuale';

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
    final fx = _fx.text.trim().replaceAll(',', '.');
    if (_needManualRate && (fx.isEmpty || double.tryParse(fx) == null)) {
      _snack(
        'Scrivi il tasso: 1 $_currency vale quanti ${widget.detail.baseCurrency}?',
      );
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
      if (_isEdit) {
        await widget.api.editExpense(
          widget.detail.id,
          widget.existing!.id,
          description: desc,
          amount: amount,
          paidBy: _paidBy!,
          members: _selected.toList(),
          splitMethod: _method,
          currency: _currency,
          fxRate: fx,
          category: _category,
          values: values,
        );
      } else if (_recurring) {
        await widget.api.addRecurring(
          widget.detail.id,
          description: desc,
          amount: amount,
          paidBy: _paidBy!,
          members: _selected.toList(),
          splitMethod: _method,
          currency: _currency,
          fxRate: fx,
          category: _category,
          values: values,
          frequency: _frequency,
          interval: _interval,
        );
      } else {
        await widget.api.addExpense(
          widget.detail.id,
          description: desc,
          amount: amount,
          paidBy: _paidBy!,
          members: _selected.toList(),
          splitMethod: _method,
          currency: _currency,
          fxRate: fx,
          category: _category,
          values: values,
        );
      }
      if (!mounted) return;
      Navigator.of(context).pop();
      widget.onDone();
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            _isEdit
                ? 'Spesa modificata'
                : _recurring
                ? 'Spesa ricorrente creata'
                : 'Spesa aggiunta',
          ),
        ),
      );
    } on ApiException catch (e) {
      _snack(e.message);
      if (mounted) setState(() => _busy = false);
    } catch (e) {
      _snack(describeError(e));
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
            Text(
              _isEdit ? 'Modifica spesa' : 'Nuova spesa',
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 14),
            TextField(
              controller: _desc,
              textCapitalization: TextCapitalization.sentences,
              decoration: const InputDecoration(
                labelText: 'Cosa hai pagato? (es. Cena)',
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _amount,
                    keyboardType: const TextInputType.numberWithOptions(
                      decimal: true,
                    ),
                    decoration: const InputDecoration(labelText: 'Importo'),
                  ),
                ),
                const SizedBox(width: 10),
                SizedBox(
                  width: 130,
                  child: InkWell(
                    borderRadius: BorderRadius.circular(12),
                    onTap: () async {
                      final code = await showCurrencyPicker(
                        context,
                        currencies: Meta.currencies,
                        selected: _currency,
                        title: 'Valuta della spesa',
                      );
                      if (code != null && mounted) {
                        setState(() => _currency = code);
                      }
                    },
                    child: InputDecorator(
                      decoration: const InputDecoration(
                        labelText: 'Valuta',
                        suffixIcon: Icon(Icons.unfold_more, size: 18),
                      ),
                      child: Text(_currency),
                    ),
                  ),
                ),
              ],
            ),
            if (_currency != base) ...[
              const SizedBox(height: 12),
              TextField(
                controller: _fx,
                keyboardType: const TextInputType.numberWithOptions(
                  decimal: true,
                ),
                decoration: InputDecoration(
                  labelText: _needManualRate
                      ? 'Tasso di cambio'
                      : 'Tasso (opzionale)',
                  hintText: '1 $_currency = ? $base',
                  helperText: _needManualRate
                      ? '$_currency non ha un tasso automatico: scrivilo tu.'
                      : 'Predefinito: tasso automatico (puoi correggerlo).',
                ),
              ),
            ],
            const SizedBox(height: 14),
            const Text(
              'Categoria',
              style: TextStyle(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 6),
            Wrap(
              spacing: 7,
              runSpacing: 7,
              children: [
                for (final c in categories)
                  ChoiceChip(
                    label: Text(c.label),
                    avatar: Icon(c.icon, size: 17),
                    selected: _category == c.code,
                    showCheckmark: false,
                    visualDensity: VisualDensity.compact,
                    selectedColor: c.color.withValues(alpha: 0.16),
                    onSelected: (_) {
                      hapticTap();
                      setState(() => _category = c.code);
                    },
                  ),
              ],
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<int>(
              initialValue: _paidBy,
              decoration: const InputDecoration(labelText: 'Chi ha pagato'),
              items: [
                for (final m in _people)
                  DropdownMenuItem(value: m.userId, child: Text(m.name)),
              ],
              onChanged: (v) => setState(() => _paidBy = v),
            ),
            const SizedBox(height: 16),
            const Text(
              'Come si divide?',
              style: TextStyle(fontWeight: FontWeight.w700),
            ),
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
                  ? 'Tutti pagano la stessa quota: la divisione arriva al centesimo.'
                  : '$_methodLabel per persona: compila i campi qui sotto.',
              style: TextStyle(
                fontSize: 12.5,
                color: Theme.of(context).colorScheme.onSurface
                    .withValues(alpha: 0.7),
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
                          keyboardType: const TextInputType.numberWithOptions(
                            decimal: true,
                          ),
                          decoration: InputDecoration(
                            isDense: true,
                            labelText: _method == 'percent' ? '%' : base,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
            if (!_isEdit) ...[
              const SizedBox(height: 8),
              SwitchListTile(
                contentPadding: EdgeInsets.zero,
                value: _recurring,
                title: const Text('Ripeti nel tempo'),
                subtitle: const Text('Creo la spesa a ogni scadenza.'),
                onChanged: (v) => setState(() => _recurring = v),
              ),
              if (_recurring)
                Row(
                  children: [
                    Expanded(
                      child: DropdownButtonFormField<int>(
                        initialValue: _interval,
                        decoration: const InputDecoration(labelText: 'Ogni'),
                        items: const [
                          DropdownMenuItem(value: 1, child: Text('1')),
                          DropdownMenuItem(value: 2, child: Text('2')),
                          DropdownMenuItem(value: 3, child: Text('3')),
                          DropdownMenuItem(value: 6, child: Text('6')),
                        ],
                        onChanged: (v) => setState(() => _interval = v ?? 1),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      flex: 2,
                      child: DropdownButtonFormField<String>(
                        initialValue: _frequency,
                        decoration: const InputDecoration(
                          labelText: 'Frequenza',
                        ),
                        items: const [
                          DropdownMenuItem(
                            value: 'daily',
                            child: Text('Giorni'),
                          ),
                          DropdownMenuItem(
                            value: 'weekly',
                            child: Text('Settimane'),
                          ),
                          DropdownMenuItem(
                            value: 'monthly',
                            child: Text('Mesi'),
                          ),
                          DropdownMenuItem(
                            value: 'yearly',
                            child: Text('Anni'),
                          ),
                        ],
                        onChanged: (v) =>
                            setState(() => _frequency = v ?? 'monthly'),
                      ),
                    ),
                  ],
                ),
            ],
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
                  : Text(
                      _isEdit
                          ? 'Salva modifiche'
                          : _recurring
                          ? 'Crea ricorrenza'
                          : 'Aggiungi spesa',
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
