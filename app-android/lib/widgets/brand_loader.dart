import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../ui.dart';
import 'logo_mark.dart';

/// Attesa di marca: il marchio respira e oscilla appena,
/// la barra scorre sotto il simbolo. Circa 4 secondi per ciclo.
/// Con "riduci animazioni" resta fermo e leggibile.
class BrandLoader extends StatefulWidget {
  const BrandLoader({super.key, required this.phase});

  final String phase;

  @override
  State<BrandLoader> createState() => _BrandLoaderState();
}

class _BrandLoaderState extends State<BrandLoader>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 4200),
  )..repeat();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final reduce = MediaQuery.disableAnimationsOf(context);
    final theme = Theme.of(context);
    final muted = theme.colorScheme.onSurface.withValues(alpha: 0.7);

    return AnimatedBuilder(
      animation: _controller,
      builder: (ctx, _) {
        final t = _controller.value;
        final wave = reduce ? 0.0 : math.sin(t * math.pi * 2);
        final breathe = reduce ? 1.0 : 1 + wave * 0.035;
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Transform.scale(
              scale: breathe,
              child: LogoMark(
                size: 96,
                ringRotation: reduce ? 0 : wave * 0.10,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Dividi le spese, non le amicizie.',
              style: TextStyle(fontSize: 12.5, color: muted),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: 148,
              height: 3,
              child: Stack(
                children: [
                  Align(
                    alignment: Alignment.center,
                    child: Container(
                      height: 1,
                      color: sage.withValues(alpha: 0.18),
                    ),
                  ),
                  if (!reduce)
                    Align(
                      alignment: Alignment(-1 + 2 * t, 0),
                      child: Container(
                        width: 30,
                        height: 3,
                        decoration: BoxDecoration(
                          color: sage,
                          borderRadius: BorderRadius.circular(3),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(height: 18),
            AnimatedSwitcher(
              duration: reduce
                  ? Duration.zero
                  : const Duration(milliseconds: 220),
              child: Text(
                widget.phase,
                key: ValueKey(widget.phase),
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 12.5,
                  color: theme.colorScheme.onSurface.withValues(alpha: 0.68),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
