import 'package:flutter/material.dart';

import 'api.dart';
import 'screens/login_screen.dart';
import 'screens/main_shell.dart';
import 'theme_controller.dart';
import 'ui.dart';
import 'widgets/brand_loader.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  // Non bloccante: se lo storage e' lento l'app parte comunque col tema
  // di sistema e si aggiorna appena la preferenza e' letta.
  loadThemeMode();
  runApp(const BlanceApp());
}

class BlanceApp extends StatelessWidget {
  const BlanceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<ThemeMode>(
      valueListenable: themeMode,
      builder: (_, mode, _) => MaterialApp(
        title: 'b-lance',
        debugShowCheckedModeBanner: false,
        theme: lightTheme(),
        darkTheme: darkTheme(),
        themeMode: mode,
        home: const _Gate(),
      ),
    );
  }
}

/// All'avvio: c'e' il token -> dashboard, no -> login.
///
/// Regole: NON si blocca MAI. Ogni fase e' visibile sotto lo spinner
/// (cosi' si capisce dove si e' fermati), qualsiasi eccezione cade su
/// una schermata con il messaggio vero e un pulsante Riprova.
class _Gate extends StatefulWidget {
  const _Gate();

  @override
  State<_Gate> createState() => _GateState();
}

class _GateState extends State<_Gate> {
  late final Api _api = Api();

  String _phase = 'Avvio…';
  Object? _error;

  @override
  void initState() {
    super.initState();
    _boot();
  }

  void _setPhase(String value) {
    if (mounted) setState(() => _phase = value);
  }

  Future<void> _boot() async {
    setState(() {
      _error = null;
      _phase = 'Preparo i tuoi conti…';
    });
    try {
      await _api.loadToken();
      if (_api.token != null) {
        _setPhase('Controllo la connessione…');
        await _api.loadMeta();
        _setPhase("Verifico l'account…");
        final user = await _api.me();
        if (!mounted) return;
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (_) => MainShell(api: _api, user: user),
          ),
        );
        return;
      }
    } catch (e) {
      // Token scaduto, rete assente, risposta inattesa: qualsiasi cosa,
      // pulisco e lascio decidere all'utente (non resta appeso).
      try {
        await _api.saveToken(null);
      } catch (_) {
        // preferisco comunque proseguire
      }
      if (e is ApiException && e.status == 401) {
        // Sessione revocata o scaduta: direttamente al login, con il motivo.
        if (!mounted) return;
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (_) => LoginScreen(
              api: _api,
              notice: 'La sessione è scaduta: entra di nuovo.',
            ),
          ),
        );
        return;
      }
      if (mounted) setState(() => _error = e);
    }
    if (!mounted) return;
    if (_error != null) return; // resta sullo schermo d'errore con Riprova
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => LoginScreen(api: _api)),
    );
  }

  void _goLogin() {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (_) => LoginScreen(
          api: _api,
          notice: _error == null ? null : _errorText(_error!),
        ),
      ),
    );
  }

  String _errorText(Object e) => describeError(e);

  @override
  Widget build(BuildContext context) {
    final error = _error;
    if (error != null) {
      return Scaffold(
        body: SafeArea(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.cloud_off, size: 40, color: negColor),
                  const SizedBox(height: 14),
                  const Text(
                    'Non riesco a collegarmi',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontFamily: 'Calistoga',
                      fontSize: 26,
                      height: 1.1,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _errorText(error),
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 13.5,
                      color: Theme.of(context).colorScheme.onSurface
                          .withValues(alpha: 0.6),
                    ),
                  ),
                  const SizedBox(height: 20),
                  FilledButton(
                    onPressed: () {
                      if (!mounted) return;
                      setState(() => _error = null);
                      _boot();
                    },
                    child: const Text('Riprova'),
                  ),
                  const SizedBox(height: 8),
                  TextButton(
                    onPressed: _goLogin,
                    child: const Text('Vai comunque al login'),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    }
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: BrandLoader(phase: _phase),
          ),
        ),
      ),
    );
  }
}
