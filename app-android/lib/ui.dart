"""Tema, formati e widget comuni dell'app.

Palette allineata al sito: salvia per l'accento, carta calda chiara di
giorno e nero-verde di notte (segue il sistema).
"""

import 'dart:math';

import 'package:flutter/material.dart';

const sage = Color(0xFF5F8D6E);
const paperLight = Color(0xFFF5F4EF);
const cardLight = Color(0xFFFFFFFF);
const textLight = Color(0xFF242B27);
const paperDark = Color(0xFF141816);
const cardDark = Color(0xFF191F1B);
const textDark = Color(0xFFEFF3EE);
const posColor = Color(0xFF3B7A52);
const negColor = Color(0xFFA0432F);

ThemeData lightTheme() {
  final base = ColorScheme.fromSeed(seedColor: sage, brightness: Brightness.light);
  return ThemeData(
    useMaterial3: true,
    colorScheme: base.copyWith(
      surface: paperLight,
      surfaceContainerLow: cardLight,
      onSurface: textLight,
    ),
    scaffoldBackgroundColor: paperLight,
    cardTheme: CardThemeData(
      color: cardLight,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: Color(0xFFE5E2D8)),
      ),
      margin: EdgeInsets.zero,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: paperLight,
      surfaceTintColor: Colors.transparent,
      foregroundColor: textLight,
      elevation: 0,
      centerTitle: false,
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: cardLight,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: Color(0xFFE5E2D8)),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: Color(0xFFE5E2D8)),
      ),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        backgroundColor: sage,
        foregroundColor: Colors.white,
        minimumSize: const Size.fromHeight(52),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(13)),
        textStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15),
      ),
    ),
    snackBarTheme: const SnackBarThemeData(behavior: SnackBarBehavior.floating),
  );
}

ThemeData darkTheme() {
  final base = ColorScheme.fromSeed(seedColor: sage, brightness: Brightness.dark);
  return ThemeData(
    useMaterial3: true,
    colorScheme: base.copyWith(
      surface: paperDark,
      surfaceContainerLow: cardDark,
      onSurface: textDark,
    ),
    scaffoldBackgroundColor: paperDark,
    cardTheme: CardThemeData(
      color: cardDark,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: Color(0xFF2A322D)),
      ),
      margin: EdgeInsets.zero,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: paperDark,
      surfaceTintColor: Colors.transparent,
      foregroundColor: textDark,
      elevation: 0,
      centerTitle: false,
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: cardDark,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: Color(0xFF2A322D)),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: Color(0xFF2A322D)),
      ),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        backgroundColor: sage,
        foregroundColor: Colors.white,
        minimumSize: const Size.fromHeight(52),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(13)),
        textStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15),
      ),
    ),
    snackBarTheme: const SnackBarThemeData(behavior: SnackBarBehavior.floating),
  );
}

/// Formatta un importo in unita minori: 1250 -> "12,50" (exponent 2).
String formatMinor(int minor, int exponent) {
  final neg = minor < 0;
  final factor = pow(10, exponent).toDouble();
  final major = (minor.abs() / factor).toStringAsFixed(exponent);
  final parts = major.split('.');
  var intPart = parts[0];
  // Separatore migliaia italiano: 1.234
  final buf = StringBuffer();
  for (var i = 0; i < intPart.length; i++) {
    if (i > 0 && (intPart.length - i) % 3 == 0) buf.write('.');
    buf.write(intPart[i]);
  }
  final dec = parts.length > 1 ? ',${parts[1]}' : '';
  return '${neg ? '-' : ''}$buf$dec';
}

/// Con segno e valuta: "+12,50 EUR" / "-3,40 USD".
String formatSigned(int minor, int exponent, String currency) {
  final sign = minor > 0 ? '+' : '';
  return '$sign${formatMinor(minor, exponent)} $currency';
}

/// Card sezione con titolo, come le caselle del sito.
class SectionCard extends StatelessWidget {
  const SectionCard({super.key, required this.title, required this.child, this.trailing});

  final String title;
  final Widget child;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    title,
                    style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 15),
                  ),
                ),
                if (trailing != null) trailing!,
              ],
            ),
            const SizedBox(height: 12),
            child,
          ],
        ),
      ),
    );
  }
}

/// Chip "ti devono / devi" della dashboard.
class NetChip extends StatelessWidget {
  const NetChip({super.key, required this.label, required this.amount, required this.pos});

  final String label;
  final String amount;
  final bool pos; // true = in credito

  @override
  Widget build(BuildContext context) {
    final color = pos ? posColor : negColor;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: color.withValues(alpha: 0.30)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(color: color, shape: BoxShape.circle),
          ),
          const SizedBox(width: 7),
          Text(label, style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600)),
          const SizedBox(width: 6),
          Text(amount, style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w800, color: color)),
        ],
      ),
    );
  }
}
