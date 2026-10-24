import 'package:flutter/material.dart';

import '../ui.dart';
import '../widgets/logo_mark.dart';

/// Informazioni: marchio, versione, privacy. Nessun link che possa rompersi.
Future<void> showAboutSheet(BuildContext context) {
  return showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (ctx) {
      final muted = Theme.of(ctx).colorScheme.onSurface.withValues(alpha: 0.7);
      return SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(24, 12, 24, 28),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(bottom: 20),
              decoration: BoxDecoration(
                color: Theme.of(ctx).colorScheme.onSurface
                    .withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(4),
              ),
            ),
            const LogoMark(size: 64),
            const SizedBox(height: 12),
            Text.rich(
              TextSpan(
                text: 'b-',
                style: TextStyle(
                  fontFamily: 'Calistoga',
                  fontSize: 30,
                  letterSpacing: -0.5,
                  color: Theme.of(ctx).colorScheme.onSurface,
                ),
                children: [
                  TextSpan(
                    text: 'lance',
                    style: TextStyle(
                      color: Theme.of(ctx).brightness == Brightness.dark
                          ? sage
                          : sageInk,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 4),
            Text(
              'Dividi le spese, non le amicizie.',
              style: TextStyle(fontSize: 13, color: muted),
            ),
            const SizedBox(height: 20),
            Text(
              'Gli importi sono in unità intere: i conti tornano al centesimo. '
              'Puoi dividere in parti uguali, per importo o percentuale, '
              'registrare pagamenti parziali e annullare una spesa senza '
              'cancellare lo storico.',
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 13.5, height: 1.5),
            ),
            const SizedBox(height: 16),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: sage.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: sage.withValues(alpha: 0.18)),
              ),
              child: Text(
                'Privacy: niente rubrica caricata. Gli inviti usano link, QR o '
                'username. Se elimini l\'account il profilo diventa "Ex-membro": '
                'email, password e username spariscono, le spese restano nei '
                'gruppi per non rompere i saldi.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 12.5, height: 1.5, color: muted),
              ),
            ),
            const SizedBox(height: 18),
            Text(
              'Versione $kAppVersion',
              style: TextStyle(fontSize: 12, color: muted),
            ),
            const SizedBox(height: 10),
            FilledButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Chiudi'),
            ),
          ],
        ),
      );
    },
  );
}
