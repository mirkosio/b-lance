import 'package:flutter/material.dart';

/// Marchio b/l: una sola lettera.
/// L'asta e il piede bianchi sono la l; l'anello salvia è la b.
/// Stessa geometria di `app/static/logo-mark.svg` (viewBox 64×64).
class LogoMark extends StatelessWidget {
  const LogoMark({
    super.key,
    this.size = 64,
    this.inverse = false,
    this.ringRotation = 0,
  });

  final double size;

  /// Variante carta: badge chiaro, anello salvia, l scura.
  final bool inverse;

  /// Rotazione del solo gradiente dell'anello, in radianti (loader).
  final double ringRotation;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'b-lance',
      image: true,
      child: CustomPaint(
        size: Size.square(size),
        painter: _LogoPainter(
          inverse: inverse,
          ringRotation: ringRotation,
        ),
      ),
    );
  }
}

class _LogoPainter extends CustomPainter {
  const _LogoPainter({required this.inverse, required this.ringRotation});

  final bool inverse;
  final double ringRotation;

  static const _ink = Color(0xFF0A0E0B);
  static const _paper = Color(0xFFF5F4EF);
  static const _sageTop = Color(0xFF7FAF8F);
  static const _sageBottom = Color(0xFF47684F);
  static const _border = Color(0xFF35473B);
  static const _borderInverse = Color(0xFF5F8D6E);

  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 64.0;
    canvas.save();
    canvas.scale(s);

    final badgeRect = RRect.fromRectAndRadius(
      const Rect.fromLTWH(0, 0, 64, 64),
      const Radius.circular(16),
    );
    final badgeColor = inverse ? _paper : _ink;
    canvas.drawRRect(badgeRect, Paint()..color = badgeColor);

    // Anello della b: il gradiente ruota appena nel loader.
    canvas.save();
    canvas.translate(38, 38);
    canvas.rotate(ringRotation);
    canvas.translate(-38, -38);
    final ringPaint = Paint()
      ..shader = const LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [_sageTop, _sageBottom],
      ).createShader(Rect.fromCircle(center: const Offset(38, 38), radius: 16));
    canvas.drawCircle(const Offset(38, 38), 16, ringPaint);
    canvas.drawCircle(const Offset(38, 38), 8, Paint()..color = badgeColor);
    canvas.restore();

    // La l: asta e piede. Non ruota.
    final markPaint = Paint()..color = inverse ? const Color(0xFF242B27) : _paper;
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        const Rect.fromLTWH(16, 10, 8, 43),
        const Radius.circular(4),
      ),
      markPaint,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        const Rect.fromLTWH(10, 48, 14, 5),
        const Radius.circular(2.5),
      ),
      markPaint,
    );

    // Bordo sottile, utile quando il badge nero sta su fondo scuro.
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        const Rect.fromLTWH(0.5, 0.5, 63, 63),
        const Radius.circular(15.5),
      ),
      Paint()
        ..color = inverse ? _borderInverse : _border
        ..style = PaintingStyle.stroke
        ..strokeWidth = 1,
    );

    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _LogoPainter old) =>
      old.inverse != inverse || old.ringRotation != ringRotation;
}
