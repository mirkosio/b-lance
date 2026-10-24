import 'package:flutter/material.dart';

import '../ui.dart';

/// Guida introduttiva in tre passaggi.
///
/// Non blocca l'app: si chiude con "Salta guida" e non viene mostrata di nuovo.
/// Ritorna `true` se l'utente vuole creare subito il primo gruppo.
Future<bool?> showOnboardingSheet(BuildContext context) {
  return showModalBottomSheet<bool>(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    backgroundColor: Colors.transparent,
    builder: (ctx) => const _OnboardingSheet(),
  );
}

class _OnboardingSheet extends StatefulWidget {
  const _OnboardingSheet();

  @override
  State<_OnboardingSheet> createState() => _OnboardingSheetState();
}

class _OnboardingSheetState extends State<_OnboardingSheet> {
  final _controller = PageController();
  int _page = 0;

  static const _steps = <_OnboardStep>[
    _OnboardStep(
      icon: Icons.groups_2_outlined,
      title: 'Crea il tuo primo gruppo',
      body:
          'Weekend, casa condivisa, cena con gli amici: dai un nome al gruppo '
          'e scegli la valuta. Ci pensa b-lance a tenere i conti.',
    ),
    _OnboardStep(
      icon: Icons.person_add_alt_1_outlined,
      title: 'Invita chi vuoi',
      body:
          'Condividi un link, un QR o cerca uno username. La rubrica del '
          'telefono non viene mai caricata.',
    ),
    _OnboardStep(
      icon: Icons.receipt_long_outlined,
      title: 'Dividi e salda',
      body:
          'Aggiungi le spese, registra anche i pagamenti parziali e vedi il '
          'numero minimo di bonifici per chiudere tutto.',
    ),
  ];

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _close({bool create = false}) => Navigator.pop(context, create);

  void _next() {
    if (_page == _steps.length - 1) {
      _close(create: true);
      return;
    }
    hapticTap();
    _controller.nextPage(
      duration: motionDuration(context, 240),
      curve: Curves.easeOutCubic,
    );
  }

  void _back() {
    if (_page == 0) return;
    hapticTap();
    _controller.previousPage(
      duration: motionDuration(context, 220),
      curve: Curves.easeOutCubic,
    );
  }

  @override
  Widget build(BuildContext context) {
    final dark = Theme.of(context).brightness == Brightness.dark;
    final last = _page == _steps.length - 1;
    return Container(
      margin: const EdgeInsets.fromLTRB(10, 0, 10, 10),
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 18),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Theme.of(context).dividerColor),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  'Guida rapida',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1.1,
                    color: dark ? sage : sageInk,
                  ),
                ),
              ),
              TextButton(
                onPressed: () => _close(),
                child: const Text('Salta guida'),
              ),
            ],
          ),
          SizedBox(
            height: 300,
            child: PageView.builder(
              controller: _controller,
              itemCount: _steps.length,
              onPageChanged: (i) => setState(() => _page = i),
              itemBuilder: (ctx, i) {
                final step = _steps[i];
                return Semantics(
                  container: true,
                  label:
                      'Passaggio ${i + 1} di ${_steps.length}: ${step.title}',
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: 74,
                        height: 74,
                        decoration: BoxDecoration(
                          color: sage.withValues(alpha: dark ? 0.22 : 0.13),
                          borderRadius: BorderRadius.circular(22),
                        ),
                        alignment: Alignment.center,
                        child: Icon(
                          step.icon,
                          size: 34,
                          color: dark ? sage : sageInk,
                        ),
                      ),
                      const SizedBox(height: 20),
                      Text(
                        step.title,
                        textAlign: TextAlign.center,
                        style: Theme.of(context).textTheme.headlineSmall,
                      ),
                      const SizedBox(height: 10),
                      Text(
                        step.body,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 14,
                          height: 1.5,
                          color: mutedOn(context),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (var i = 0; i < _steps.length; i++)
                Semantics(
                  label: 'Pagina ${i + 1}',
                  selected: i == _page,
                  child: Container(
                    width: i == _page ? 20 : 7,
                    height: 7,
                    margin: const EdgeInsets.symmetric(horizontal: 3),
                    decoration: BoxDecoration(
                      color: i == _page
                          ? (dark ? sage : sageInk)
                          : Theme.of(context).dividerColor,
                      borderRadius: BorderRadius.circular(99),
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              if (_page > 0)
                TextButton(onPressed: _back, child: const Text('Indietro')),
              const Spacer(),
              FilledButton(
                style: FilledButton.styleFrom(minimumSize: const Size(150, 48)),
                onPressed: _next,
                child: Text(last ? 'Crea il primo gruppo' : 'Avanti'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _OnboardStep {
  const _OnboardStep({
    required this.icon,
    required this.title,
    required this.body,
  });

  final IconData icon;
  final String title;
  final String body;
}
