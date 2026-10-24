import 'package:flutter/material.dart';

/// Marchio "bl": monogramma Calistoga dentro un badge salvia.
/// Stessa geometria del file `app/static/logo-mark.svg` (viewBox 64×64).
class LogoMark extends StatelessWidget {
  const LogoMark({
    super.key,
    this.size = 64,
    this.inverse = false,
    this.ringRotation = 0,
  });

  final double size;

  /// Badge carta con monogramma salvia scuro, per fondi salvia o scuri.
  final bool inverse;

  /// Rotazione del solo monogramma, in radianti (per il loader).
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

  static const _paper = Color(0xFFF5F4EF);
  static const _sageTop = Color(0xFF6B9B7C);
  static const _sageBottom = Color(0xFF47684F);

  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 64.0;
    canvas.save();
    canvas.scale(s);

    final badge = RRect.fromRectAndRadius(
      const Rect.fromLTWH(0, 0, 64, 64),
      const Radius.circular(16),
    );
    final badgePaint = Paint();
    if (inverse) {
      badgePaint.color = _paper;
    } else {
      badgePaint.shader = const LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [_sageTop, _sageBottom],
      ).createShader(const Rect.fromLTWH(0, 0, 64, 64));
    }
    canvas.drawRRect(badge, badgePaint);

    // Il monogramma ruota attorno al centro del badge, il badge resta fermo.
    canvas.save();
    canvas.translate(32, 32);
    canvas.rotate(ringRotation);
    canvas.translate(-32, -32);
    canvas.translate(12.126, 51.447);
    canvas.scale(0.05031);
    final markPaint = Paint()
      ..color = inverse ? _sageBottom : _paper
      ..style = PaintingStyle.fill;
    canvas.drawPath(_bPath, markPaint);
    canvas.save();
    canvas.translate(489, 0);
    canvas.drawPath(_lPath, markPaint);
    canvas.restore();
    canvas.restore();

    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant _LogoPainter old) =>
      old.inverse != inverse || old.ringRotation != ringRotation;
}

Path _parseSvgPath(String d) {
  final path = Path();
  final tokens = RegExp(r'[MLQVHZ]|-?\d+(?:\.\d+)?')
      .allMatches(d)
      .map((m) => m.group(0)!)
      .toList();
  var i = 0;
  var x = 0.0;
  var y = 0.0;
  double num() => double.parse(tokens[i++]);

  while (i < tokens.length) {
    final cmd = tokens[i++];
    switch (cmd) {
      case 'M':
        x = num();
        y = num();
        path.moveTo(x, y);
        break;
      case 'L':
        x = num();
        y = num();
        path.lineTo(x, y);
        break;
      case 'Q':
        final x1 = num();
        final y1 = num();
        x = num();
        y = num();
        path.quadraticBezierTo(x1, y1, x, y);
        break;
      case 'V':
        y = num();
        path.lineTo(x, y);
        break;
      case 'H':
        x = num();
        path.lineTo(x, y);
        break;
      case 'Z':
        path.close();
        break;
    }
  }
  return path;
}

// Tracciati Calistoga del monogramma, in unità font (1 em = 1000).
const String _bData =
    'M268.0 11Q239.0 11 201.0 7.0Q163.0 3 127.0 -4.5Q91.0 -12 67.0 -24V-646Q67.0 -669 53.0 -682.0Q39.0 -695 6.0 -695V-727Q29.0 -743 61.0 -755.5Q93.0 -768 125.5 -776.0Q158.0 -784 179.0 -784Q203.0 -784 213.0 -773.5Q223.0 -763 223.0 -738V-596L220.0 -501Q240.0 -522 268.0 -531.0Q296.0 -540 330.0 -540Q385.0 -540 433.0 -512.0Q481.0 -484 511.0 -427.5Q541.0 -371 541.0 -283Q541.0 -187 504.0 -121.5Q467.0 -56 405.0 -22.5Q343.0 11 268.0 11ZM271.0 -62Q298.0 -62 320.5 -79.5Q343.0 -97 356.0 -138.0Q369.0 -179 369.0 -249Q369.0 -359 338.0 -407.0Q307.0 -455 261.0 -455Q239.0 -455 223.0 -444V-81Q242.0 -62 271.0 -62Z';
const String _lData =
    'M52.0 0Q41.0 -12 35.0 -25.0Q29.0 -38 29.0 -54Q58.0 -54 71.0 -66.5Q84.0 -79 84.0 -109V-640Q84.0 -663 71.0 -676.5Q58.0 -690 16.0 -690V-730Q41.0 -744 74.5 -754.5Q108.0 -765 141.0 -771.5Q174.0 -778 196.0 -778Q219.0 -778 229.5 -768.0Q240.0 -758 240.0 -733V-109Q240.0 -78 252.5 -66.0Q265.0 -54 295.0 -54Q295.0 -38 288.5 -25.0Q282.0 -12 271.0 0Z';

final Path _bPath = _parseSvgPath(_bData);
final Path _lPath = _parseSvgPath(_lData);
