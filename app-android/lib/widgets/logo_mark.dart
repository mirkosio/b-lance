import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../ui.dart';

/// Marchio "b in equilibrio": asta intera, pancia divisa in due archi
/// uguali e perno oro. Stessa geometria del file `app/static/logo-mark.svg`.
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
    final stem = inverse ? paperLight : Theme.of(context).colorScheme.onSurface;
    final ring = inverse ? paperLight : (dark ? const Color(0xFF85B395) : sage);
    final cap = inverse
        ? const Color(0xFFF2D8A0)
        : (dark ? const Color(0xFFD8B56A) : const Color(0xFFA8823C));
    return Semantics(
      label: 'b-lance',
      image: true,
      child: CustomPaint(
        size: Size.square(size),
        painter: _LogoPainter(
          stem: stem,
          ring: ring,
          cap: cap,
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
    required this.cap,
    required this.ringRotation,
  });

  final Color stem;
  final Color ring;
  final Color cap;
  final double ringRotation;

  @override
  void paint(Canvas canvas, Size size) {
    // Il viewBox SVG è "10 4 56 56": si disegna nel sistema 64 e si
    // ritaglia quel riquadro, così SVG e app restano identici.
    final s = size.width / 56;
    canvas.save();
    canvas.scale(s);
    canvas.translate(-10, -4);

    final stemPaint = Paint()
      ..color = stem
      ..strokeWidth = 8.5
      ..strokeCap = StrokeCap.round;
    canvas.drawLine(const Offset(18, 11.5), const Offset(18, 52.5), stemPaint);

    final ringPaint = Paint()
      ..color = ring
      ..style = PaintingStyle.stroke
      ..strokeWidth = 8
      ..strokeCap = StrokeCap.round;
    final rect = Rect.fromCircle(center: const Offset(38, 36), radius: 16);
    // Due archi da 170°, separati da due vuoti di 10° sulla diagonale.
    const start1 = 50 * math.pi / 180;
    const start2 = 230 * math.pi / 180;
    const sweep = 170 * math.pi / 180;
    canvas.save();
    canvas.translate(38, 36);
    canvas.rotate(ringRotation);
    canvas.translate(-38, -36);
    canvas.drawArc(rect, start1, sweep, false, ringPaint);
    canvas.drawArc(rect, start2, sweep, false, ringPaint);
    canvas.restore();

    final capPaint = Paint()..color = cap;
    canvas.drawCircle(const Offset(18, 10.5), 3, capPaint);

    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _LogoPainter old) =>
      old.stem != stem ||
      old.ring != ring ||
      old.cap != cap ||
      old.ringRotation != ringRotation;
}
