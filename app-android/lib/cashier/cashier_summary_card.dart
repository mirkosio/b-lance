import 'package:flutter/material.dart';

import '../ui.dart';
import '../widgets/logo_mark.dart';
import 'cashier_models.dart';
import 'cashier_service.dart';

/// Riepilogo del cassiere pensato per essere esportato come immagine.
///
/// Non dipende dal tema del telefono: chi lo riceve su WhatsApp deve vedere
/// sempre lo stesso foglio carta, leggibile anche in anteprima piccola.
/// La larghezza è fissa così l'immagine ha sempre le stesse proporzioni.
class CashierSummaryCard extends StatelessWidget {
  const CashierSummaryCard({
    super.key,
    required this.group,
    required this.exponent,
    required this.balances,
    required this.transfers,
    this.generatedAt,
  });

  static const width = 680.0;

  final CashierGroup group;
  final int exponent;
  final List<CashierBalance> balances;
  final List<List<int>> transfers;
  final DateTime? generatedAt;

  String get _dateLabel {
    final d = generatedAt ?? DateTime.now();
    final day = d.day.toString().padLeft(2, '0');
    final month = d.month.toString().padLeft(2, '0');
    return '$day/$month/${d.year}';
  }

  String _name(int id) {
    for (final m in group.members) {
      if (m.id == id) return m.name;
    }
    return '?';
  }

  @override
  Widget build(BuildContext context) {
    final total = group.expenses.fold<int>(0, (s, e) => s + e.amountMinor);
    const ink = textLight;
    const muted = Color(0xFF65706A);
    const line = Color(0xFFE2E1D9);

    return Container(
      width: width,
      color: paperLight,
      padding: const EdgeInsets.all(36),
      child: Container(
        padding: const EdgeInsets.fromLTRB(36, 32, 36, 30),
        decoration: BoxDecoration(
          color: cardLight,
          borderRadius: BorderRadius.circular(28),
          border: Border.all(color: line),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                const LogoMark(size: 44, inverse: true),
                const SizedBox(width: 12),
                const Text(
                  'b-lance',
                  style: TextStyle(
                    fontFamily: 'Calistoga',
                    fontSize: 24,
                    color: ink,
                  ),
                ),
                const Spacer(),
                Text(
                  _dateLabel,
                  style: const TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 13,
                    color: muted,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 30),
            Text(
              group.name,
              style: const TextStyle(
                fontFamily: 'Calistoga',
                fontSize: 42,
                height: 1.05,
                color: ink,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Riepilogo di gruppo · ${group.currency}',
              style: const TextStyle(
                fontFamily: 'Inter',
                fontSize: 15,
                color: muted,
              ),
            ),
            const SizedBox(height: 24),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: paperLight,
                borderRadius: BorderRadius.circular(18),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'TOTALE SPESO',
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 1.2,
                      color: muted,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    '${formatCashier(total, exponent)} ${group.currency}',
                    style: const TextStyle(
                      fontFamily: 'Calistoga',
                      fontSize: 34,
                      color: ink,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 26),
            const Text(
              'SALDI',
              style: TextStyle(
                fontFamily: 'Inter',
                fontSize: 11,
                fontWeight: FontWeight.w700,
                letterSpacing: 1.2,
                color: muted,
              ),
            ),
            const SizedBox(height: 10),
            for (final b in balances)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 7),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        _name(b.personId),
                        style: const TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 17,
                          fontWeight: FontWeight.w600,
                          color: ink,
                        ),
                      ),
                    ),
                    Text(
                      formatSignedCashier(
                        b.netMinor,
                        exponent,
                        group.currency,
                      ),
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 17,
                        fontWeight: FontWeight.w800,
                        color: b.netMinor < 0 ? negColor : posColor,
                      ),
                    ),
                  ],
                ),
              ),
            const SizedBox(height: 22),
            const Divider(height: 1, color: line),
            const SizedBox(height: 22),
            const Text(
              'CHI PAGA A CHI',
              style: TextStyle(
                fontFamily: 'Inter',
                fontSize: 11,
                fontWeight: FontWeight.w700,
                letterSpacing: 1.2,
                color: muted,
              ),
            ),
            const SizedBox(height: 10),
            if (transfers.isEmpty)
              const Text(
                'Conto saldato.',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 17,
                  fontWeight: FontWeight.w600,
                  color: sageInk,
                ),
              )
            else
              for (final t in transfers)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 7),
                  child: Row(
                    children: [
                      Expanded(
                        child: Text(
                          '${_name(t[0])}  →  ${_name(t[1])}',
                          style: const TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 17,
                            fontWeight: FontWeight.w600,
                            color: ink,
                          ),
                        ),
                      ),
                      Text(
                        '${formatCashier(t[2], exponent)} ${group.currency}',
                        style: const TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 17,
                          fontWeight: FontWeight.w800,
                          color: sageInk,
                        ),
                      ),
                    ],
                  ),
                ),
            const SizedBox(height: 26),
            const Divider(height: 1, color: line),
            const SizedBox(height: 14),
            const Text(
              'Generato da b-lance · i conti tornano al centesimo',
              style: TextStyle(
                fontFamily: 'Inter',
                fontSize: 12,
                color: muted,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
