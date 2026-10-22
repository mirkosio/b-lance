/// Tema, formati e widget comuni dell'app.
///
/// Palette del marchio: salvia per l'accento, carta calda di giorno e
/// nero-verde di notte. Tipografia: Inter per l'interfaccia, Calistoga per
/// i numeri hero e il wordmark. Movimento discreto (4/10): 150-260 ms.
library;

import 'dart:math';

import 'package:flutter/cupertino.dart' show CupertinoPageTransitionsBuilder;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

const sage = Color(0xFF5F8D6E);

/// Salvia scura per il TESTO su fondo chiaro (contrasto >= 4.5:1).
const sageInk = Color(0xFF3D644B);

/// Salvia per i bottoni pieni: bianco su questo colore supera 4.5:1.
const sageStrong = Color(0xFF4A7357);

const paperLight = Color(0xFFF5F4EF);
const cardLight = Color(0xFFFFFFFF);
const textLight = Color(0xFF242B27);
const paperDark = Color(0xFF141816);
const cardDark = Color(0xFF191F1B);
const textDark = Color(0xFFEFF3EE);
const posColor = Color(0xFF3B7A52);
const negColor = Color(0xFFA0432F);

const kAppVersion = '1.2.0';

/// Durata coerente col motion 4/10, azzerata se il sistema chiede
/// di ridurre le animazioni.
Duration motionDuration(BuildContext context, [int ms = 200]) {
  final reduce = MediaQuery.maybeDisableAnimationsOf(context) ?? false;
  return reduce ? Duration.zero : Duration(milliseconds: ms);
}

/// Transizione di pagina breve, azzerata con "riduci animazioni".
Route<T> appRoute<T>(BuildContext context, WidgetBuilder builder) {
  final reduce = MediaQuery.maybeDisableAnimationsOf(context) ?? false;
  final duration = reduce ? Duration.zero : const Duration(milliseconds: 240);
  return PageRouteBuilder<T>(
    transitionDuration: duration,
    reverseTransitionDuration: duration,
    pageBuilder: (ctx, _, _) => builder(ctx),
    transitionsBuilder: (ctx, animation, _, child) => FadeTransition(
      opacity: animation.drive(CurveTween(curve: Curves.easeOutCubic)),
      child: child,
    ),
  );
}

/// Feedback aptico leggero: selezione (tab, chip).
void hapticTap() => HapticFeedback.selectionClick();

/// Feedback aptico per conferme e azioni distruttive.
void hapticConfirm() => HapticFeedback.lightImpact();

TextTheme _textTheme(Color ink) => TextTheme(
  displayLarge: TextStyle(
    fontFamily: 'Calistoga',
    fontSize: 40,
    height: 1.05,
    color: ink,
  ),
  displayMedium: TextStyle(
    fontFamily: 'Calistoga',
    fontSize: 32,
    height: 1.08,
    color: ink,
  ),
  headlineSmall: TextStyle(
    fontFamily: 'Calistoga',
    fontSize: 26,
    height: 1.12,
    color: ink,
  ),
  titleLarge: TextStyle(
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: FontWeight.w800,
    color: ink,
  ),
  titleMedium: TextStyle(
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: FontWeight.w700,
    color: ink,
  ),
  bodyLarge: TextStyle(
    fontFamily: 'Inter',
    fontSize: 15,
    height: 1.4,
    color: ink,
  ),
  bodyMedium: TextStyle(
    fontFamily: 'Inter',
    fontSize: 13.5,
    height: 1.45,
    color: ink,
  ),
  bodySmall: TextStyle(
    fontFamily: 'Inter',
    fontSize: 12,
    height: 1.4,
    color: ink,
  ),
  labelLarge: TextStyle(
    fontFamily: 'Inter',
    fontSize: 14.5,
    fontWeight: FontWeight.w700,
    color: ink,
  ),
);

ThemeData _theme({
  required Brightness brightness,
  required Color paper,
  required Color card,
  required Color ink,
  required Color border,
}) {
  final base = ColorScheme.fromSeed(seedColor: sage, brightness: brightness);
  final isDark = brightness == Brightness.dark;
  final accent = isDark ? sage : sageInk;
  return ThemeData(
    useMaterial3: true,
    brightness: brightness,
    fontFamily: 'Inter',
    textTheme: _textTheme(ink),
    colorScheme: base.copyWith(
      primary: accent,
      secondary: accent,
      surface: paper,
      surfaceContainerLow: card,
      onSurface: ink,
    ),
    scaffoldBackgroundColor: paper,
    cardTheme: CardThemeData(
      color: card,
      elevation: 0,
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: border),
      ),
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: paper,
      surfaceTintColor: Colors.transparent,
      foregroundColor: ink,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: TextStyle(
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: FontWeight.w800,
        color: ink,
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: card,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: border),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: border),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: isDark ? sage : sageInk, width: 1.4),
      ),
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        backgroundColor: isDark ? sageStrong : sageStrong,
        foregroundColor: Colors.white,
        minimumSize: const Size.fromHeight(52),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(13)),
        textStyle: const TextStyle(
          fontFamily: 'Inter',
          fontWeight: FontWeight.w700,
          fontSize: 15,
        ),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: accent,
        minimumSize: const Size.fromHeight(50),
        side: BorderSide(color: border),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(13)),
        textStyle: const TextStyle(
          fontFamily: 'Inter',
          fontWeight: FontWeight.w700,
          fontSize: 14.5,
        ),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: accent,
        textStyle: const TextStyle(
          fontFamily: 'Inter',
          fontWeight: FontWeight.w700,
          fontSize: 14,
        ),
      ),
    ),
    snackBarTheme: SnackBarThemeData(
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      backgroundColor: isDark
          ? const Color(0xFF2A322D)
          : const Color(0xFF2F3833),
      contentTextStyle: const TextStyle(
        fontFamily: 'Inter',
        fontSize: 13.5,
        color: Colors.white,
      ),
    ),
    dialogTheme: DialogThemeData(
      backgroundColor: card,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      titleTextStyle: TextStyle(
        fontFamily: 'Inter',
        fontSize: 17,
        fontWeight: FontWeight.w800,
        color: ink,
      ),
      contentTextStyle: TextStyle(
        fontFamily: 'Inter',
        fontSize: 14,
        color: ink.withValues(alpha: 0.8),
        height: 1.4,
      ),
    ),
    navigationBarTheme: NavigationBarThemeData(
      backgroundColor: card,
      elevation: 0,
      height: 70,
      indicatorColor: sage.withValues(alpha: isDark ? 0.22 : 0.16),
      labelTextStyle: WidgetStatePropertyAll(
        TextStyle(
          fontFamily: 'Inter',
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: ink,
        ),
      ),
      iconTheme: WidgetStateProperty.resolveWith(
        (states) => IconThemeData(
          size: 23,
          color: states.contains(WidgetState.selected)
              ? accent
              : ink.withValues(alpha: 0.55),
        ),
      ),
    ),
    pageTransitionsTheme: const PageTransitionsTheme(
      builders: {
        TargetPlatform.android: FadeForwardsPageTransitionsBuilder(),
        TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
      },
    ),
    dividerTheme: DividerThemeData(color: border, thickness: 1, space: 1),
  );
}

ThemeData lightTheme() => _theme(
  brightness: Brightness.light,
  paper: paperLight,
  card: cardLight,
  ink: textLight,
  border: const Color(0xFFE5E2D8),
);

ThemeData darkTheme() => _theme(
  brightness: Brightness.dark,
  paper: paperDark,
  card: cardDark,
  ink: textDark,
  border: const Color(0xFF2A322D),
);

/// Colore secondario leggibile (>= 3:1 sui fondi) per testi piccoli.
Color mutedOn(BuildContext context) =>
    Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.7);

/// Converte "#RRGGBB" / "#AARRGGBB" in Color, con fallback.
Color parseHexColor(String hex, {Color fallback = sage}) {
  var h = hex.replaceFirst('#', '');
  if (h.length == 6) h = 'FF$h';
  final v = int.tryParse(h, radix: 16);
  return v == null ? fallback : Color(v);
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

/// Versione mostrata nel profilo (supporto: "che versione hai?").
/// Data ISO del server -> "22/10/2026, 18:42" in ora locale.
String formatDateTime(String? iso) {
  if (iso == null) return '';
  final dt = DateTime.tryParse(iso)?.toLocal();
  if (dt == null) return '';
  String two(int v) => v.toString().padLeft(2, '0');
  return '${two(dt.day)}/${two(dt.month)}/${dt.year}, ${two(dt.hour)}:${two(dt.minute)}';
}

/// Etichetta umana del metodo di divisione.
String splitMethodLabel(String method) => switch (method) {
  'even' => 'Divisa in parti uguali',
  'exact' => 'Importi fissi',
  'percent' => 'Percentuali',
  _ => method,
};

/// Card sezione con titolo, come le caselle del sito.
class SectionCard extends StatelessWidget {
  const SectionCard({
    super.key,
    required this.title,
    required this.child,
    this.trailing,
  });

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
                    style: const TextStyle(
                      fontWeight: FontWeight.w800,
                      fontSize: 15,
                    ),
                  ),
                ),
                ?trailing,
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
  const NetChip({
    super.key,
    required this.label,
    required this.amount,
    required this.pos,
  });

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
          Text(
            label,
            style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600),
          ),
          const SizedBox(width: 6),
          Text(
            amount,
            style: TextStyle(
              fontSize: 12.5,
              fontWeight: FontWeight.w800,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}

/// Stato vuoto con icona, spiegazione e azione facoltativa.
class EmptyState extends StatelessWidget {
  const EmptyState({
    super.key,
    required this.icon,
    required this.title,
    this.message,
    this.action,
    this.compact = false,
  });

  final IconData icon;
  final String title;
  final String? message;
  final Widget? action;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    final dark = Theme.of(context).brightness == Brightness.dark;
    final size = compact ? 56.0 : 72.0;
    return Padding(
      padding: EdgeInsets.symmetric(
        horizontal: 20,
        vertical: compact ? 14 : 32,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              color: sage.withValues(alpha: 0.10),
              shape: BoxShape.circle,
            ),
            alignment: Alignment.center,
            child: Icon(
              icon,
              size: compact ? 26 : 34,
              color: dark ? sage : sageInk,
            ),
          ),
          SizedBox(height: compact ? 10 : 16),
          Text(
            title,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontWeight: FontWeight.w800,
              fontSize: compact ? 14.5 : 16,
            ),
          ),
          if (message != null) ...[
            const SizedBox(height: 6),
            Text(
              message!,
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 13.5, color: mutedOn(context)),
            ),
          ],
          if (action != null) ...[SizedBox(height: compact ? 12 : 18), action!],
        ],
      ),
    );
  }
}
