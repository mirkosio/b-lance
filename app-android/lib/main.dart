import 'package:flutter/material.dart';

import 'api.dart';
import 'screens/home_screen.dart';
import 'screens/login_screen.dart';
import 'ui.dart';

void main() {
  runApp(const BlanceApp());
}

class BlanceApp extends StatelessWidget {
  const BlanceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'b-lance',
      debugShowCheckedModeBanner: false,
      theme: lightTheme(),
      darkTheme: darkTheme(),
      themeMode: ThemeMode.system,
      home: const _Gate(),
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
  int _round = 0;

  static String get _host {
    try {
      return Uri.parse(kApiBase).host;
    } catch (_) {
      return kApiBase;
    }
  }

  @override
  void initState() {
    super.initState();
    _boot();
  }

  void _setPhase(String value) {
    if (mounted) setState(() => _phase = value);
  }

  Future<void> _boot() async {
    _round++;
    setState(() {
      _error = null;
      _phase = 'Leggo la sessione salvata…';
    });
    try {
      await _api.loadToken();
      if (_api.token != null) {
        _setPhase('Parlo con $_host…');
        await _api.loadMeta();
        _setPhase("Verifico l'account…");
        final user = await _api.me();
        if (!mounted) return;
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => HomeScreen(api: _api, user: user)),
        );
        return;
      }
    } catch (e) {
      // Token scaduto, server vecchio, rete assente: qualsiasi cosa,
      // pulisco e lascio decidere all'utente (non resta appeso).
      try {
        await _api.saveToken(null);
      } catch (_) {
        // preferisco comunque proseguire
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

  String _errorText(Object e) {
    if (e is ApiException) return e.message;
    final s = e.toString();
    if (s.contains('SocketException') || s.contains('ClientException')) {
      return 'Nessuna connessione a $_host: controlla internet e riprova.';
    }
    if (s.contains('TimeoutException')) {
      return 'Il server $_host non risponde: riprova tra qualche secondo.';
    }
    return s.length > 160 ? '${s.substring(0, 160)}…' : s;
  }

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
                    style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _errorText(error),
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 13.5,
                      color: Theme.of(context)
                          .colorScheme
                          .onSurface
                          .withValues(alpha: 0.6),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Server: $_host',
                    style: TextStyle(
                      fontSize: 12,
                      color: Theme.of(context)
                          .colorScheme
                          .onSurface
                          .withValues(alpha: 0.45),
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
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const CircularProgressIndicator(color: sage),
            const SizedBox(height: 18),
            Text(
              _phase,
              style: TextStyle(
                fontSize: 13,
                color: Theme.of(context)
                    .colorScheme
                    .onSurface
                    .withValues(alpha: 0.6),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              '$_host · tentativo $_round',
              style: TextStyle(
                fontSize: 11.5,
                color: Theme.of(context)
                    .colorScheme
                    .onSurface
                    .withValues(alpha: 0.4),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
