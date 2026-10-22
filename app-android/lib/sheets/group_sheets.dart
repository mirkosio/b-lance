import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:share_plus/share_plus.dart';

import '../api.dart';
import '../models.dart';
import '../ui.dart';
import '../widgets/currency_picker.dart';

/// Foglio "Nuovo gruppo". Ritorna il gruppo creato, o null.
Future<GroupSummary?> showNewGroupSheet(
  BuildContext context, {
  required Api api,
}) {
  return showModalBottomSheet<GroupSummary>(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (_) => _NewGroupSheet(api: api),
  );
}

/// Flusso "Unisciti": codice, anteprima del gruppo, conferma.
/// Ritorna il gruppo appena creato/entrato, o null.
Future<GroupSummary?> showJoinGroupSheet(
  BuildContext context, {
  required Api api,
}) async {
  final code = TextEditingController();
  String? error;
  final search = await showDialog<bool>(
    context: context,
    builder: (ctx) => StatefulBuilder(
      builder: (ctx, setD) => AlertDialog(
        title: const Text('Unisciti a un gruppo'),
        content: TextField(
          controller: code,
          autofocus: true,
          textCapitalization: TextCapitalization.characters,
          decoration: InputDecoration(
            labelText: 'Codice di invito',
            hintText: 'Es. K7M2QX9P',
            errorText: error,
          ),
          onSubmitted: (_) {
            final c = code.text.trim();
            if (c.isEmpty) {
              setD(() => error = 'Scrivi il codice che ti hanno dato');
              return;
            }
            Navigator.pop(ctx, true);
          },
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Annulla'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(minimumSize: const Size(100, 44)),
            onPressed: () {
              final c = code.text.trim();
              if (c.isEmpty) {
                setD(() => error = 'Scrivi il codice che ti hanno dato');
                return;
              }
              Navigator.pop(ctx, true);
            },
            child: const Text('Cerca'),
          ),
        ],
      ),
    ),
  );
  if (search != true) {
    code.dispose();
    return null;
  }
  final value = code.text.trim().toUpperCase();
  try {
    // Prima mostro di quale gruppo si tratta: niente ingressi alla cieca.
    final preview = await api.invitePreview(value);
    if (!context.mounted) return null;
    final join = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(preview.name),
        content: Text(
          '${preview.memberCount} '
          '${preview.memberCount == 1 ? 'membro' : 'membri'}'
          ' · valuta ${preview.baseCurrency}\n\nVuoi entrare in questo gruppo?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Annulla'),
          ),
          FilledButton(
            style: FilledButton.styleFrom(minimumSize: const Size(100, 44)),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Entra'),
          ),
        ],
      ),
    );
    if (join != true || !context.mounted) return null;
    final g = await api.joinGroup(value);
    if (!context.mounted) return null;
    return g;
  } on ApiException catch (e) {
    if (context.mounted) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(e.message)));
    }
  } catch (e) {
    if (context.mounted) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(describeError(e))));
    }
  } finally {
    code.dispose();
  }
  return null;
}

class _NewGroupSheet extends StatefulWidget {
  const _NewGroupSheet({required this.api});

  final Api api;

  @override
  State<_NewGroupSheet> createState() => _NewGroupSheetState();
}

class _NewGroupSheetState extends State<_NewGroupSheet> {
  final _name = TextEditingController();
  String _currency = 'EUR';
  String? _error;
  bool _busy = false;

  @override
  void dispose() {
    _name.dispose();
    super.dispose();
  }

  String get _currencyLabel {
    final c = Meta.byCode(_currency);
    return c == null ? _currency : '${c.code} · ${c.name}';
  }

  Future<void> _pickCurrency() async {
    final code = await showCurrencyPicker(
      context,
      currencies: Meta.currencies,
      selected: _currency,
      title: 'Valuta del gruppo',
    );
    if (code != null && mounted) setState(() => _currency = code);
  }

  Future<void> _create() async {
    final name = _name.text.trim();
    if (name.isEmpty) {
      setState(() => _error = 'Dai un nome al gruppo (es. Vacanza, Casa)');
      return;
    }
    hapticConfirm();
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final g = await widget.api.createGroup(name, _currency);
      if (!mounted) return;
      Navigator.pop(context, g);
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _busy = false;
        _error = e.message;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _busy = false;
        _error = describeError(e);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 10, 20, 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.only(bottom: 14),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.onSurface
                      .withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
            ),
            const Text(
              'Nuovo gruppo',
              style: TextStyle(
                fontFamily: 'Calistoga',
                fontSize: 26,
                height: 1.1,
              ),
            ),
            const SizedBox(height: 14),
            TextField(
              controller: _name,
              autofocus: true,
              textCapitalization: TextCapitalization.sentences,
              textInputAction: TextInputAction.next,
              onChanged: (_) {
                if (_error != null) setState(() => _error = null);
              },
              decoration: InputDecoration(
                labelText: 'Nome (es. Vacanza, Casa)',
                errorText: _error,
              ),
            ),
            const SizedBox(height: 12),
            InkWell(
              borderRadius: BorderRadius.circular(12),
              onTap: _busy ? null : _pickCurrency,
              child: InputDecorator(
                decoration: const InputDecoration(
                  labelText: 'Valuta del gruppo',
                  suffixIcon: Icon(Icons.unfold_more, size: 20),
                ),
                child: Text(_currencyLabel),
              ),
            ),
            const SizedBox(height: 20),
            FilledButton(
              onPressed: _busy ? null : _create,
              child: _busy
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : const Text('Crea gruppo'),
            ),
          ],
        ),
      ),
    );
  }
}


/// Invito con QR, codice e condivisione nativa.
Future<void> showInviteSheet(
  BuildContext context, {
  required String groupName,
  required String code,
  required String link,
}) {
  return showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (ctx) => Padding(
      padding: const EdgeInsets.fromLTRB(20, 10, 20, 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 40,
            height: 4,
            margin: const EdgeInsets.only(bottom: 16),
            decoration: BoxDecoration(
              color: Theme.of(ctx).colorScheme.onSurface.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(4),
            ),
          ),
          const Text(
            'Invita nel gruppo',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 4),
          Text(
            groupName,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              fontSize: 13,
              color: Theme.of(ctx).colorScheme.onSurface.withValues(alpha: 0.6),
            ),
          ),
          const SizedBox(height: 18),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(
                color: Theme.of(ctx).dividerColor,
              ),
            ),
            child: QrImageView(
              data: link,
              size: 210,
              backgroundColor: Colors.white,
              eyeStyle: const QrEyeStyle(
                eyeShape: QrEyeShape.square,
                color: Color(0xFF242B27),
              ),
              dataModuleStyle: const QrDataModuleStyle(
                dataModuleShape: QrDataModuleShape.square,
                color: Color(0xFF3D644B),
              ),
            ),
          ),
          const SizedBox(height: 14),
          Text(
            code,
            style: const TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              letterSpacing: 3,
            ),
          ),
          const SizedBox(height: 16),
          FilledButton.icon(
            onPressed: () async {
              await SharePlus.instance.share(
                ShareParams(
                  subject: 'Invito a $groupName su b-lance',
                  text:
                      'Ti invito su b-lance nel gruppo "$groupName".\n'
                      'Apri: $link\nCodice: $code',
                ),
              );
            },
            icon: const Icon(Icons.share_outlined, size: 19),
            label: const Text('Condividi link'),
          ),
          const SizedBox(height: 8),
          OutlinedButton.icon(
            onPressed: () async {
              await Clipboard.setData(ClipboardData(text: link));
              if (ctx.mounted) {
                ScaffoldMessenger.of(ctx).showSnackBar(
                  const SnackBar(content: Text('Link copiato')),
                );
              }
            },
            icon: const Icon(Icons.link, size: 19),
            label: const Text('Copia link'),
          ),
        ],
      ),
    ),
  );
}

/// Invito diretto cercando un @handle. Ritorna true se ha aggiunto qualcuno.
Future<bool> showInviteByHandleSheet(
  BuildContext context, {
  required Api api,
  required int groupId,
}) async {
  final controller = TextEditingController();
  String? error;
  bool busy = false;
  List<PublicUser> results = const [];
  Timer? debounce;
  final added = await showModalBottomSheet<bool>(
    context: context,
    isScrollControlled: true,
    useSafeArea: true,
    builder: (ctx) => StatefulBuilder(
      builder: (ctx, setD) {
        Future<void> submit() async {
          final handle = controller.text.trim().replaceFirst('@', '');
          if (handle.length < 3) {
            setD(() => error = 'Scrivi un @handle (almeno 3 caratteri)');
            return;
          }
          setD(() {
            busy = true;
            error = null;
          });
          try {
            await api.inviteByHandle(groupId, handle);
            if (!ctx.mounted) return;
            Navigator.pop(ctx, true);
          } on ApiException catch (e) {
            if (!ctx.mounted) return;
            setD(() {
              busy = false;
              error = e.message;
            });
          } catch (e) {
            if (!ctx.mounted) return;
            setD(() {
              busy = false;
              error = describeError(e);
            });
          }
        }

        return Padding(
          padding: EdgeInsets.only(
            bottom: MediaQuery.of(ctx).viewInsets.bottom,
          ),
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Invita con @handle',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 6),
                Text(
                  'La persona deve avere un handle nel suo profilo. '
                  'Nessuna rubrica da caricare.',
                  style: TextStyle(
                    fontSize: 12.5,
                    color: Theme.of(ctx).colorScheme.onSurface
                        .withValues(alpha: 0.6),
                  ),
                ),
                const SizedBox(height: 14),
                TextField(
                  controller: controller,
                  autofocus: true,
                  autocorrect: false,
                  textInputAction: TextInputAction.done,
                  decoration: InputDecoration(
                    labelText: '@handle',
                    prefixText: '@',
                    hintText: 'mirkosio',
                    errorText: error,
                  ),
                  onChanged: (value) {
                    debounce?.cancel();
                    final needle = value.trim().replaceFirst('@', '');
                    if (needle.length < 2) {
                      setD(() => results = const []);
                      return;
                    }
                    debounce = Timer(const Duration(milliseconds: 300), () async {
                      try {
                        final found = await api.searchUsers(needle);
                        if (ctx.mounted) setD(() => results = found);
                      } catch (_) {
                        // La ricerca è un aiuto: se fallisce si può scrivere
                        // l'handle a mano e premere Aggiungi.
                      }
                    });
                  },
                  onSubmitted: (_) => busy ? null : submit(),
                ),
                if (results.isNotEmpty) ...[
                  const SizedBox(height: 6),
                  for (final u in results)
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      leading: CircleAvatar(
                        backgroundColor: parseHexColor(u.color),
                        child: Text(
                          u.name.isEmpty
                              ? '?'
                              : u.name.characters.first.toUpperCase(),
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                      title: Text(u.name),
                      subtitle: Text('@${u.handle}'),
                      onTap: () {
                        controller.text = '@${u.handle}';
                        setD(() => results = const []);
                      },
                    ),
                ],
                const SizedBox(height: 16),
                FilledButton(
                  onPressed: busy ? null : submit,
                  child: busy
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            color: Colors.white,
                          ),
                        )
                      : const Text('Aggiungi al gruppo'),
                ),
              ],
            ),
          ),
        );
      },
    ),
  );
  debounce?.cancel();
  controller.dispose();
  return added == true;
}
