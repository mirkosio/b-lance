import 'package:flutter/material.dart';

import '../api.dart';
import '../ui.dart';

/// Saldo in evidenza, stile app bancaria: gradient salvia dosato,
/// numero grande, una riga per valuta.
class HeroBalance extends StatelessWidget {
  const HeroBalance({
    super.key,
    required this.nets,
    this.label = 'Il tuo saldo',
    this.footnote = 'Somma dei tuoi gruppi',
  });

  /// valuta -> saldo in unita minori.
  final Map<String, int> nets;
  final String label;
  final String footnote;

  @override
  Widget build(BuildContext context) {
    final entries = nets.entries.where((e) => e.value != 0).toList()
      ..sort((a, b) => a.key.compareTo(b.key));
    final allZero = entries.isEmpty;
    final summary = allZero
        ? '$label: in pari. Nessun debito aperto.'
        : '$label: '
              '${entries.map((e) => formatSigned(e.value, Meta.exponentOf(e.key), e.key)).join(', ')}. '
              '$footnote.';
    return Semantics(
      container: true,
      label: summary,
      excludeSemantics: true,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.fromLTRB(20, 18, 20, 20),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(22),
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF4E7B5D), Color(0xFF33523E)],
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              label,
              style: const TextStyle(
                fontFamily: 'Inter',
                fontSize: 12.5,
                fontWeight: FontWeight.w600,
                letterSpacing: 0.2,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 10),
            // Il saldo cambia dopo un pagamento: il nuovo numero entra
            // con un fade breve, senza rimbalzi (i dati non rimbalzano).
            AnimatedSwitcher(
              duration: motionDuration(context, 220),
              switchInCurve: Curves.easeOutCubic,
              switchOutCurve: Curves.easeInCubic,
              layoutBuilder: (current, previous) => Stack(
                alignment: Alignment.topLeft,
                children: [...previous, ?current],
              ),
              transitionBuilder: (child, animation) => FadeTransition(
                opacity: animation,
                child: SlideTransition(
                  position: Tween<Offset>(
                    begin: const Offset(0, 0.08),
                    end: Offset.zero,
                  ).animate(animation),
                  child: child,
                ),
              ),
              child: allZero
                  ? const Text(
                      'In pari',
                      key: ValueKey('in-pari'),
                      style: TextStyle(
                        fontFamily: 'Fraunces',
                        fontSize: 34,
                        height: 1.05,
                        color: Colors.white,
                      ),
                    )
                  : Column(
                      key: ValueKey(
                        entries.map((e) => '${e.key}:${e.value}').join('|'),
                      ),
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        for (final e in entries)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 4),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.baseline,
                              textBaseline: TextBaseline.alphabetic,
                              children: [
                                Text(
                                  '${e.value > 0 ? '+' : '-'}'
                                  '${formatMinor(e.value.abs(), Meta.exponentOf(e.key))}',
                                  style: const TextStyle(
                                    fontFamily: 'Fraunces',
                                    fontSize: 34,
                                    height: 1.05,
                                    color: Colors.white,
                                  ),
                                ),
                                const SizedBox(width: 6),
                                Text(
                                  e.key,
                                  style: const TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 14,
                                    fontWeight: FontWeight.w700,
                                    color: Colors.white,
                                  ),
                                ),
                              ],
                            ),
                          ),
                      ],
                    ),
            ),
            const SizedBox(height: 6),
            Text(
              allZero ? 'Nessun debito aperto' : footnote,
              style: const TextStyle(
                fontFamily: 'Inter',
                fontSize: 12,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
