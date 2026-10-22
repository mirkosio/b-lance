import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../ui.dart';
import 'logo_mark.dart';

/// Attesa di marca: la pancia del marchio oscilla come un bilanciere,
/// il puntino scorre sotto il wordmark. Circa 4 secondi per ciclo.
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
    final accent = theme.brightness == Brightness.dark ? sage : sageInk;
    final muted = theme.colorScheme.onSurface.withValues(alpha: 0.6);

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
              child: Container(
                width: 126,
                height: 126,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: sage.withValues(alpha: theme.brightness == Brightness.dark ? 0.12 : 0.08),
                  border: Border.all(
                    color: sage.withValues(alpha: 0.16),
                  ),
                ),
                alignment: Alignment.center,
                child: LogoMark(
                  size: 78,
                  ringRotation: reduce ? 0 : wave * 0.14,
                ),
              ),
            ),
            const SizedBox(height: 18),
            Text.rich(
              TextSpan(
                children: [
                  TextSpan(
                    text: 'b-',
                    style: TextStyle(color: theme.colorScheme.onSurface),
                  ),
                  TextSpan(
                    text: 'lance',
                    style: TextStyle(color: accent),
                  ),
                ],
              ),
              style: const TextStyle(
                fontFamily: 'Calistoga',
                fontSize: 38,
                height: 1,
                letterSpacing: -0.5,
              ),
            ),
            const SizedBox(height: 6),
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
                  color: theme.colorScheme.onSurface.withValues(alpha: 0.45),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
