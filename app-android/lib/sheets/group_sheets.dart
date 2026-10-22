import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';
import '../ui.dart';
import '../widgets/currency_picker.dart';

/// Foglio "Nuovo gruppo". Ritorna il gruppo creato, o null.
Future<GroupSummary?> showNewGroupSheet(
  BuildContext context, {
  required Api api,
}) {
  return showModalBottomSheet<GroupSummary>(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (_) => _NewGroupSheet(api: api),
  );
}

/// Flusso "Unisciti": codice, anteprima del gruppo, conferma.
/// Ritorna il gruppo appena creato/entrato, o null.
Future<GroupSummary?> showJoinGroupSheet(
  BuildContext context, {
  required Api api,
}) async {
  final code = TextEditingController();
  String? error;
  final search = await showDialog<bool>(
    context: context,
    builder: (ctx) => StatefulBuilder(
      builder: (ctx, setD) => AlertDialog(
        title: const Text('Unisciti a un gruppo'),
        content: TextField(
          controller: code,
          autofocus: true,
          textCapitalization: TextCapitalization.characters,
          decoration: InputDecoration(
            labelText: 'Codice di invito',
            hintText: 'Es. K7M2QX9P',
            errorText: error,
          ),
          onSubmitted: (_) {
            final c = code.text.trim();
            if (c.isEmpty) {
              setD(() => error = 'Scrivi il codice che ti hanno dato');
              return;
            }
            Navigator.pop(ctx, true);
          },
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Annulla'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(minimumSize: const Size(100, 44)),
            onPressed: () {
              final c = code.text.trim();
              if (c.isEmpty) {
                setD(() => error = 'Scrivi il codice che ti hanno dato');
                return;
              }
              Navigator.pop(ctx, true);
            },
            child: const Text('Cerca'),
          ),
        ],
      ),
    ),
  );
  if (search != true) {
    code.dispose();
    return null;
  }
  final value = code.text.trim().toUpperCase();
  try {
    // Prima mostro di quale gruppo si tratta: niente ingressi alla cieca.
    final preview = await api.invitePreview(value);
    if (!context.mounted) return null;
    final join = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(preview.name),
        content: Text(
          '${preview.memberCount} '
          '${preview.memberCount == 1 ? 'membro' : 'membri'}'
          ' · valuta ${preview.baseCurrency}\n\nVuoi entrare in questo gruppo?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Annulla'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(minimumSize: const Size(100, 44)),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Entra'),
          ),
        ],
      ),
    );
    if (join != true || !context.mounted) return null;
    final g = await api.joinGroup(value);
    if (!context.mounted) return null;
    return g;
  } on ApiException catch (e) {
    if (context.mounted) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.message)));
    }
  } catch (e) {
    if (context.mounted) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(describeError(e))));
    }
  } finally {
    code.dispose();
  }
  return null;
}

class _NewGroupSheet extends StatefulWidget {
  const _NewGroupSheet({required this.api});

  final Api api;

  @override
  State<_NewGroupSheet> createState() => _NewGroupSheetState();
}

class _NewGroupSheetState extends State<_NewGroupSheet> {
  final _name = TextEditingController();
  String _currency = 'EUR';
  String? _error;
  bool _busy = false;

  @override
  void dispose() {
    _name.dispose();
    super.dispose();
  }

  String get _currencyLabel {
    final c = Meta.byCode(_currency);
    return c == null ? _currency : '${c.code} · ${c.name}';
  }

  Future<void> _pickCurrency() async {
    final code = await showCurrencyPicker(
      context,
      currencies: Meta.currencies,
      selected: _currency,
      title: 'Valuta del gruppo',
    );
    if (code != null && mounted) setState(() => _currency = code);
  }

  Future<void> _create() async {
    final name = _name.text.trim();
    if (name.isEmpty) {
      setState(() => _error = 'Dai un nome al gruppo (es. Vacanza, Casa)');
      return;
    }
    hapticConfirm();
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final g = await widget.api.createGroup(name, _currency);
      if (!mounted) return;
      Navigator.pop(context, g);
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _busy = false;
        _error = e.message;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _busy = false;
        _error = describeError(e);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 10, 20, 24),
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
              'Nuovo gruppo',
              style: TextStyle(
                fontFamily: 'Calistoga',
                fontSize: 26,
                height: 1.1,
              ),
            ),
            const SizedBox(height: 14),
            TextField(
              controller: _name,
              autofocus: true,
              textCapitalization: TextCapitalization.sentences,
              textInputAction: TextInputAction.next,
              onChanged: (_) {
                if (_error != null) setState(() => _error = null);
              },
              decoration: InputDecoration(
                labelText: 'Nome (es. Vacanza, Casa)',
                errorText: _error,
              ),
            ),
            const SizedBox(height: 12),
            InkWell(
              borderRadius: BorderRadius.circular(12),
              onTap: _busy ? null : _pickCurrency,
              child: InputDecorator(
                decoration: const InputDecoration(
                  labelText: 'Valuta del gruppo',
                  suffixIcon: Icon(Icons.unfold_more, size: 20),
                ),
                child: Text(_currencyLabel),
              ),
            ),
            const SizedBox(height: 20),
            FilledButton(
              onPressed: _busy ? null : _create,
              child: _busy
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : const Text('Crea gruppo'),
            ),
          ],
        ),
      ),
    );
  }
}
