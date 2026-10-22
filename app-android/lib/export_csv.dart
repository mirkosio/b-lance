import 'dart:io';

import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';

import 'api.dart';
import 'categories.dart';
import 'models.dart';
import 'ui.dart';

/// Genera il CSV del gruppo e apre il foglio di condivisione di Android.
/// Il file resta nella cache dell'app: nessun permesso storage richiesto.
Future<void> shareGroupCsv(GroupDetail detail) async {
  final b = StringBuffer();
  void row(List<String> cells) {
    b.writeln(cells.map(_esc).join(';'));
  }

  row(['B-Lance', detail.name]);
  row(['Valuta base', detail.baseCurrency]);
  row(['Generato', DateTime.now().toString().substring(0, 16)]);
  row([]);
  row(['SALDI']);
  row(['Membro', 'Saldo', 'Valuta']);
  for (final m in detail.members.where((m) => m.active)) {
    row([
      m.name,
      formatMinor(m.netMinor, Meta.exponentOf(detail.baseCurrency)),
      detail.baseCurrency,
    ]);
  }
  row([]);
  row(['SPESE']);
  row([
    'Data',
    'Descrizione',
    'Categoria',
    'Stato',
    'Pagato da',
    'Importo',
    'Valuta',
    'Importo base',
  ]);
  for (final e in detail.expenses) {
    row([
      formatDateTime(e.createdAt),
      e.description,
      categoryInfo(e.category).label,
      e.voided ? 'Annullata' : 'Attiva',
      e.payerName,
      formatMinor(e.amountMinor, Meta.exponentOf(e.currency)),
      e.currency,
      formatMinor(e.baseAmountMinor, Meta.exponentOf(e.baseCurrency)),
    ]);
  }
  row([]);
  row(['PAGAMENTI']);
  row(['Data', 'Da', 'A', 'Importo', 'Valuta', 'Nota']);
  for (final p in detail.payments) {
    row([
      formatDateTime(p.createdAt),
      p.fromName,
      p.toName,
      formatMinor(p.amountMinor, Meta.exponentOf(p.currency)),
      p.currency,
      p.note ?? '',
    ]);
  }

  final dir = await getTemporaryDirectory();
  final safe = detail.name
      .replaceAll(RegExp(r'[^A-Za-z0-9À-ÿ _-]'), '')
      .trim()
      .replaceAll(' ', '-');
  final file = File('${dir.path}/b-lance-${safe.isEmpty ? 'gruppo' : safe}.csv');
  // BOM per Excel italiano.
  await file.writeAsString('\ufeff$b', encoding: const SystemEncoding());
  await SharePlus.instance.share(
    ShareParams(
      files: [XFile(file.path, mimeType: 'text/csv')],
      subject: 'B-Lance · ${detail.name}',
      text: 'Spese e saldi del gruppo ${detail.name}.',
    ),
  );
}

String _esc(String value) {
  final needs = value.contains(';') || value.contains('"') || value.contains('\n');
  final clean = value.replaceAll('"', '""');
  return needs ? '"$clean"' : clean;
}
