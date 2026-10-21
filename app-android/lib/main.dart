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

/// all'avvio: c'e il token -> dashboard, no -> login.
class _Gate extends StatefulWidget {
  const _Gate();

  @override
  State<_Gate> createState() => _GateState();
}

class _GateState extends State<_Gate> {
  late final Api _api = Api();

  @override
  void initState() {
    super.initState();
    _boot();
  }

  Future<void> _boot() async {
    await _api.loadToken();
    try {
      if (_api.token == null) throw ApiException(401, 'anonimo');
      await _api.loadMeta();
      final user = await _api.me();
      if (!mounted) return;
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => HomeScreen(api: _api, user: user)),
      );
      return;
    } on ApiException catch (e) {
      if (e.status != 401) rethrow; // errore di rete: resta qui e riprova col login
      await _api.saveToken(null);
    }
    if (!mounted) return;
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => LoginScreen(api: _api)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: CircularProgressIndicator(color: sage)),
    );
  }
}
