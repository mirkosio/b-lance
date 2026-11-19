import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:quick_actions/quick_actions.dart';

import 'api.dart';
import 'cashier/cashier_screen.dart';
import 'models.dart';
import 'notifications.dart';
import 'screens/login_screen.dart';
import 'screens/main_shell.dart';
import 'theme_controller.dart';
import 'ui.dart';
import 'widgets/brand_loader.dart';

final quickActions = QuickActions();

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  FlutterError.onError = (details) {
    // Un errore di un plugin non deve nascondere l'interfaccia all'utente:
    // il dettaglio resta nei log e l'app continua a partire.
    debugPrint('[blance] ${details.exceptionAsString()}');
  };
  loadThemeMode();
  try {
    await initNotifications();
  } catch (e) {
    debugPrint('[blance] notifiche non disponibili: $e');
  }
  try {
    _setupQuickActions();
  } catch (e) {
    debugPrint('[blance] azioni rapide non disponibili: $e');
  }
  runApp(const BlanceApp());
}

void _setupQuickActions() {
  quickActions.initialize((String shortcutType) {
    _quickActionSubject.add(shortcutType);
  });
  quickActions.setShortcutItems(<ShortcutItem>[
    const ShortcutItem(
      type: 'nuovo_gruppo',
      localizedTitle: 'Nuovo gruppo',
      icon: 'ic_shortcut_new_group',
    ),
    const ShortcutItem(
      type: 'nuova_spesa',
      localizedTitle: 'Nuova spesa',
      icon: 'ic_shortcut_new_expense',
    ),
  ]);
}

final StreamController<String> _quickActionSubject = StreamController<String>.broadcast();

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
        locale: const Locale('it'),
        supportedLocales: const [Locale('it'), Locale('en')],
        localizationsDelegates: GlobalMaterialLocalizations.delegates,
        // Rispetta il testo grande di sistema, ma entro un limite che evita
        // di spezzare i layout a colonna (fino al 200% richiesto da WCAG).
        builder: (context, child) => MediaQuery.withClampedTextScaling(
          minScaleFactor: 0.8,
          maxScaleFactor: 2.0,
          child: child ?? const SizedBox.shrink(),
        ),
        home: const _Gate(),
      ),
    );
  }
}

class _Gate extends StatefulWidget {
  const _Gate();

  @override
  State<_Gate> createState() => _GateState();
}

class _GateState extends State<_Gate> {
  late final Api _api = Api();
  StreamSubscription<String>? _qaSub;

  String _phase = 'Avvio…';
  Object? _error;
  User? _user;
  String? _pendingAction;
  bool _bootDone = false;

  @override
  void initState() {
    super.initState();
    _boot();
    _qaSub = _quickActionSubject.stream.listen((type) {
      if (type != 'nuovo_gruppo' && type != 'nuova_spesa') return;
      _pendingAction = type;
      // Se l'app sta ancora partendo, l'azione viene eseguita appena
      // _boot() ha deciso se c'è un account: altrimenti si apriva il
      // Cassiere sopra la schermata di caricamento e veniva sostituita.
      if (_bootDone && mounted) _openPendingAction();
    });
  }

  void _openPendingAction() {
    final action = _pendingAction;
    if (action == null || !mounted) return;
    _pendingAction = null;
    final user = _user;
    if (user == null) {
      // Senza account resta utilizzabile il Cassiere locale, che funziona
      // anche offline: è lì che si creano gruppi e spese sul telefono.
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const CashierHomeScreen()),
      );
      return;
    }
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (_) => MainShell(
          api: _api,
          user: user,
          initialQuickAction: action,
        ),
      ),
    );
  }

  @override
  void dispose() {
    _qaSub?.cancel();
    super.dispose();
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
        _user = user;
        _bootDone = true;
        if (_pendingAction != null) {
          _openPendingAction();
          return;
        }
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (_) => MainShell(api: _api, user: user),
          ),
        );
        return;
      }
    } catch (e) {
      try {
        await _api.saveToken(null);
      } catch (_) {}
      if (e is ApiException && e.status == 401) {
        if (!mounted) return;
        // Sessione scaduta: prima serve il login, l'azione rapida si perde
        // piuttosto che aprire il Cassiere fuori dal contesto dell'account.
        _pendingAction = null;
        _bootDone = true;
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
    if (_error != null) return;
    _bootDone = true;
    if (_pendingAction != null) {
      _openPendingAction();
      return;
    }
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
                  Icon(Icons.cloud_off, size: 40, color: negOn(context)),
                  const SizedBox(height: 14),
                  const Text(
                    'Non riesco a collegarmi',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontFamily: 'Fraunces',
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
                          .withValues(alpha: 0.7),
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
