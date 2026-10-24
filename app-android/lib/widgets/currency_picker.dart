import 'package:flutter/material.dart';

import '../models.dart';
import '../ui.dart';

/// Selettore valuta con ricerca: 125 valute non stanno in un dropdown.
///
/// Ritorna il codice scelto (es. "EUR") oppure null se si chiude.
Future<String?> showCurrencyPicker(
  BuildContext context, {
  required List<CurrencyInfo> currencies,
  String? selected,
  String title = 'Scegli la valuta',
}) {
  if (currencies.isEmpty) return Future.value(null);
  return showModalBottomSheet<String>(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (_) => _CurrencyPicker(
      currencies: currencies,
      selected: selected,
      title: title,
    ),
  );
}

class _CurrencyPicker extends StatefulWidget {
  const _CurrencyPicker({
    required this.currencies,
    required this.title,
    this.selected,
  });

  final List<CurrencyInfo> currencies;
  final String title;
  final String? selected;

  @override
  State<_CurrencyPicker> createState() => _CurrencyPickerState();
}

class _CurrencyPickerState extends State<_CurrencyPicker> {
  final _search = TextEditingController();

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final q = _search.text.trim().toLowerCase();
    final filtered = q.isEmpty
        ? widget.currencies
        : widget.currencies
              .where(
                (c) =>
                    c.code.toLowerCase().contains(q) ||
                    c.name.toLowerCase().contains(q),
              )
              .toList();
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: SizedBox(
        height: MediaQuery.of(context).size.height * 0.75,
        child: Column(
          children: [
            const SizedBox(height: 10),
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.onSurface
                    .withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(4),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 14, 20, 4),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  widget.title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
              child: TextField(
                controller: _search,
                autofocus: false,
                onChanged: (_) => setState(() {}),
                decoration: const InputDecoration(
                  labelText: 'Cerca per codice o nome',
                  prefixIcon: Icon(Icons.search),
                ),
              ),
            ),
            Expanded(
              child: filtered.isEmpty
                  ? Center(
                      child: Text(
                        'Nessuna valuta trovata',
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.onSurface
                              .withValues(alpha: 0.7),
                        ),
                      ),
                    )
                  : ListView.builder(
                      padding: const EdgeInsets.only(bottom: 16),
                      itemCount: filtered.length,
                      itemBuilder: (_, i) {
                        final c = filtered[i];
                        final isSel = c.code == widget.selected;
                        return ListTile(
                          onTap: () => Navigator.pop(context, c.code),
                          leading: CircleAvatar(
                            radius: 18,
                            backgroundColor: sage.withValues(alpha: 0.12),
                            child: Text(
                              c.symbol.isEmpty
                                  ? c.code.substring(0, 1)
                                  : c.symbol,
                              style: const TextStyle(
                                color: sage,
                                fontWeight: FontWeight.w800,
                                fontSize: 14,
                              ),
                            ),
                          ),
                          title: Text(
                            '${c.code} · ${c.name}',
                            style: TextStyle(
                              fontWeight: isSel
                                  ? FontWeight.w800
                                  : FontWeight.w500,
                            ),
                          ),
                          trailing: isSel
                              ? const Icon(Icons.check, color: sage)
                              : null,
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
