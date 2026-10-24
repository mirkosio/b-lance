import 'package:flutter/material.dart';

import '../api.dart';
import '../ui.dart';
import '../widgets/logo_mark.dart';
import 'main_shell.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key, required this.api, this.notice});

  final Api api;

  /// Motivo per cui si e' finiti qui (es. sessione scaduta): mostrato
  /// in alto invece di sparire nel vuoto.
  final String? notice;

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _register = false;
  bool _busy = false;
  bool _obscure = true;
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();

  void _snack(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg)));
  }

  @override
  void dispose() {
    _name.dispose();
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    final name = _name.text.trim();
    final email = _email.text.trim();
    final password = _password.text;
    if (_register && name.isEmpty) {
      _snack('Scrivi il tuo nome');
      return;
    }
    if (!RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(email)) {
      _snack('Email non valida: controlla di averla scritta bene');
      return;
    }
    if (_register && password.length < 6) {
      _snack('La password deve avere almeno 6 caratteri');
      return;
    }
    setState(() => _busy = true);
    try {
      final user = _register
          ? await widget.api.register(name, email, password)
          : await widget.api.login(email, password);
      await widget.api.loadMeta();
      if (!mounted) return;
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (_) => MainShell(api: widget.api, user: user),
        ),
      );
    } on ApiException catch (e) {
      _snack(e.message);
    } catch (e) {
      _snack(describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 420),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Center(child: LogoMark(size: 62)),
                  const SizedBox(height: 10),
                  const Center(child: _Wordmark(size: 26.0)),
                  const SizedBox(height: 6),
                  Center(
                    child: Text(
                      _register ? 'Crea il tuo account' : 'Bentornato',
                      style: TextStyle(
                        color: Theme.of(context).colorScheme.onSurface
                            .withValues(alpha: 0.7),
                        fontSize: 14.5,
                      ),
                    ),
                  ),
                  const SizedBox(height: 28),
                  if (!_register && widget.notice != null) ...[
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: negColor.withValues(alpha: 0.08),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: negColor.withValues(alpha: 0.35),
                        ),
                      ),
                      child: Row(
                        children: [
                          Icon(
                            Icons.info_outline,
                            size: 18,
                            color: negOn(context),
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              widget.notice!,
                              style: TextStyle(
                                fontSize: 13,
                                color: negOn(context),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                  ],
                  if (_register) ...[
                    TextField(
                      controller: _name,
                      textInputAction: TextInputAction.next,
                      decoration: const InputDecoration(labelText: 'Nome'),
                    ),
                    const SizedBox(height: 12),
                  ],
                  TextField(
                    controller: _email,
                    keyboardType: TextInputType.emailAddress,
                    autocorrect: false,
                    decoration: const InputDecoration(labelText: 'Email'),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _password,
                    obscureText: _obscure,
                    onSubmitted: (_) => _submit(),
                    decoration: InputDecoration(
                      labelText: 'Password',
                      helperText: _register ? 'Minimo 6 caratteri.' : null,
                      suffixIcon: IconButton(
                        tooltip: _obscure
                            ? 'Mostra password'
                            : 'Nascondi password',
                        icon: Icon(
                          _obscure
                              ? Icons.visibility_outlined
                              : Icons.visibility_off_outlined,
                          size: 20,
                        ),
                        onPressed: () => setState(() => _obscure = !_obscure),
                      ),
                    ),
                  ),
                  const SizedBox(height: 22),
                  FilledButton(
                    onPressed: _busy ? null : _submit,
                    child: _busy
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : Text(_register ? 'Crea account' : 'Entra'),
                  ),
                  const SizedBox(height: 10),
                  TextButton(
                    onPressed: _busy
                        ? null
                        : () => setState(() => _register = !_register),
                    child: Text(
                      _register
                          ? 'Hai già un account? Entra'
                          : 'Non hai ancora un account? Registrati',
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// "b-lance" compatto, come il sito: b- scuro + lance salvia.
class _Wordmark extends StatelessWidget {
  const _Wordmark({this.size = 20});

  final double size;

  @override
  Widget build(BuildContext context) {
    return Text.rich(
      TextSpan(
        text: 'b',
        style: TextStyle(
          fontFamily: 'Calistoga',
          fontSize: size,
          height: 1,
          letterSpacing: -0.4,
          color: Theme.of(context).colorScheme.onSurface,
        ),
        children: [
          TextSpan(
            text: '-',
            style: TextStyle(color: goldOn(context)),
          ),
          TextSpan(
            text: 'lance',
            style: TextStyle(
              color: Theme.of(context).brightness == Brightness.dark
                  ? sage
                  : sageInk,
            ),
          ),
        ],
      ),
    );
  }
}
