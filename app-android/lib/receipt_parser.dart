/// Estrazione euristica dal testo di una ricevuta.
/// L'importo e la descrizione sono SEMPRE mostrati all'utente per revisione:
/// nessun dato viene salvato prima della conferma manuale.
class ReceiptDraft {
  const ReceiptDraft({
    required this.description,
    required this.amountMinor,
    required this.lines,
  });

  final String description;
  final int amountMinor;
  final List<String> lines;
}

ReceiptDraft parseReceipt(String raw) {
  final lines = raw
      .split('\n')
      .map((l) => l.trim())
      .where((l) => l.isNotEmpty)
      .toList();

  final amountPattern = RegExp(r'(?<![\d.])(\d{1,5}[.,]\d{2})(?!\d)');
  var best = 0;
  for (final line in lines) {
    for (final match in amountPattern.allMatches(line)) {
      var value = match.group(1)!.replaceAll(',', '.');
      final amount = (double.tryParse(value) ?? 0) * 100;
      if (amount > best) best = amount.round();
    }
  }

  String description = '';
  for (final line in lines) {
    if (line.length < 3) continue;
    if (amountPattern.hasMatch(line)) continue;
    if (double.tryParse(line.replaceAll(',', '.')) != null) continue;
    description = line;
    break;
  }
  if (description.isEmpty) description = 'Spesa da ricevuta';

  return ReceiptDraft(
    description: description.substring(
      0,
      description.length > 200 ? 200 : description.length,
    ),
    amountMinor: best,
    lines: lines,
  );
}
