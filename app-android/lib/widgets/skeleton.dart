import 'package:flutter/material.dart';

/// Blocco grigio pulsante usato mentre i dati arrivano.
/// Con "riduci animazioni" attivo resta fermo.
class Skeleton extends StatefulWidget {
  const Skeleton({
    super.key,
    this.width = double.infinity,
    required this.height,
    this.radius = 12,
  });

  final double width;
  final double height;
  final double radius;

  @override
  State<Skeleton> createState() => _SkeletonState();
}

class _SkeletonState extends State<Skeleton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 900),
  );

  @override
  void initState() {
    super.initState();
    _c.repeat(reverse: true);
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final reduce = MediaQuery.maybeDisableAnimationsOf(context) ?? false;
    final base = Theme.of(context).colorScheme.onSurface
        .withValues(alpha: 0.08);
    return AnimatedBuilder(
      animation: _c,
      builder: (_, _) {
        final t = reduce ? 0.5 : 0.35 + (_c.value * 0.35);
        return Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            color: base.withValues(alpha: base.a * (0.8 + t)),
            borderRadius: BorderRadius.circular(widget.radius),
          ),
        );
      },
    );
  }
}

/// Scheletro della dashboard: hero + qualche riga.
class DashboardSkeleton extends StatelessWidget {
  const DashboardSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
      children: const [
        Skeleton(width: 180, height: 26),
        SizedBox(height: 8),
        Skeleton(width: 240, height: 14),
        SizedBox(height: 20),
        Skeleton(height: 132, radius: 22),
        SizedBox(height: 16),
        Skeleton(height: 56),
        SizedBox(height: 16),
        Skeleton(height: 16, width: 120),
        SizedBox(height: 12),
        Skeleton(height: 78),
        SizedBox(height: 16),
        Skeleton(height: 78),
        SizedBox(height: 16),
        Skeleton(height: 78),
      ],
    );
  }
}

/// Scheletro per le liste (movimenti, gruppi).
class ListSkeleton extends StatelessWidget {
  const ListSkeleton({super.key, this.rows = 6});

  final int rows;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
      children: [
        for (var i = 0; i < rows; i++) ...[
          const Skeleton(height: 74),
          const SizedBox(height: 12),
        ],
      ],
    );
  }
}
