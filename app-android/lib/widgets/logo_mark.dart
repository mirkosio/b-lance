import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../ui.dart';

/// Marchio "split b": asta intera e pancia divisa in due archi uguali.
/// Stessa geometria del file `app/static/logo-mark.svg`.
class LogoMark extends StatelessWidget {
  const LogoMark({
    super.key,
    this.size = 64,
    this.inverse = false,
    this.ringRotation = 0,
  });

  final double size;

  /// Su fondo salvia: tutto carta. Su fondo normale: inchiostro + salvia.
  final bool inverse;

  /// Rotazione della sola pancia, in radianti (per il loader).
  final double ringRotation;

  @override
  Widget build(BuildContext context) {
    final dark = Theme.of(context).brightness == Brightness.dark;
    final stem = inverse
        ? paperLight
        : Theme.of(context).colorScheme.onSurface;
    final ring = inverse
        ? paperLight
        : (dark ? const Color(0xFF85B395) : sage);
    return Semantics(
      label: 'b-lance',
      image: true,
      child: CustomPaint(
        size: Size.square(size),
        painter: _LogoPainter(
          stem: stem,
          ring: ring,
          ringRotation: ringRotation,
        ),
      ),
    );
  }
}

class _LogoPainter extends CustomPainter {
  const _LogoPainter({
    required this.stem,
    required this.ring,
    required this.ringRotation,
  });

  final Color stem;
  final Color ring;
  final double ringRotation;

  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 64;

    final stemPaint = Paint()
      ..color = stem
      ..strokeWidth = 8 * s
      ..strokeCap = StrokeCap.round;
    canvas.drawLine(Offset(19 * s, 12.5 * s), Offset(19 * s, 51.5 * s), stemPaint);

    final ringPaint = Paint()
      ..color = ring
      ..style = PaintingStyle.stroke
      ..strokeWidth = 7 * s
      ..strokeCap = StrokeCap.butt;
    final rect = Rect.fromCircle(
      center: Offset(35 * s, 36 * s),
      radius: 13 * s,
    );
    // Due archi uguali, con due tagli diagonali di ~4,24 unità.
    const gap = 4.24 / 13;
    const start = math.pi / 4 + gap / 2;
    const sweep = math.pi * 2 - gap * 2;
    canvas.save();
    canvas.translate(35 * s, 36 * s);
    canvas.rotate(ringRotation);
    canvas.translate(-35 * s, -36 * s);
    canvas.drawArc(rect, start, sweep, false, ringPaint);
    canvas.drawArc(rect, start + math.pi, sweep, false, ringPaint);
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _LogoPainter old) =>
      old.stem != stem ||
      old.ring != ring ||
      old.ringRotation != ringRotation;
}
