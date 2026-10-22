import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';
import '../theme_controller.dart';
import '../ui.dart';
import '../widgets/currency_picker.dart';
import 'group_screen.dart';
import 'login_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key, required this.api, required this.user});

  final Api api;
  final User user;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<List<GroupSummary>> _future;

  @override
  void initState() {
    super.initState();
    _future = widget.api.groups();
  }

  void _reload() {
    setState(() => _future = widget.api.groups());
  }

  void _openGroup(GroupSummary g) {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => GroupScreen(api: widget.api, groupId: g.id)),
    );
  }

  Future<void> _newGroup() async {
    final created = await showModalBottomSheet<GroupSummary>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      builder: (_) => _NewGroupSheet(api: widget.api),
    );
    if (created == null || !mounted) return;
    _reload();
    _openGroup(created);
  }

  Future<void> _joinGroup() async {
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
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Annulla')),
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
    if (search != true) return;
    final value = code.text.trim().toUpperCase();
    try {
      // Prima mostro di quale gruppo si tratta: niente ingressi alla cieca.
      final preview = await widget.api.invitePreview(value);
      if (!mounted) return;
      final join = await showDialog<bool>(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(preview.name),
          content: Text(
            '${preview.memberCount} ${preview.memberCount == 1 ? 'membro' : 'membri'}'
            ' · valuta ${preview.baseCurrency}\n\nVuoi entrare in questo gruppo?',
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Annulla')),
            FilledButton(
              style: FilledButton.styleFrom(minimumSize: const Size(100, 44)),
              onPressed: () => Navigator.pop(ctx, true),
              child: const Text('Entra'),
            ),
          ],
        ),
      );
      if (join != true) return;
      final g = await widget.api.joinGroup(value);
      if (!mounted) return;
      _reload();
      _openGroup(g);
    } on ApiException catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.message)));
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(describeError(e))));
    }
  }

  Future<void> _logout() async {
    await widget.api.logout();
    if (!mounted) return;
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (_) => LoginScreen(api: widget.api)),
      (_) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('b-lance', style: TextStyle(fontWeight: FontWeight.w800)),
        actions: [
          PopupMenuButton<String>(
            onSelected: (v) {
              if (v == 'join') _joinGroup();
              if (v == 'theme') showThemePicker(context);
              if (v == 'logout') _logout();
            },
            itemBuilder: (_) => const [
              PopupMenuItem(value: 'join', child: Text('Unisciti con un codice')),
              PopupMenuItem(value: 'theme', child: Text('Tema')),
              PopupMenuDivider(),
              PopupMenuItem(enabled: false, child: Text('Versione $kAppVersion')),
              PopupMenuItem(value: 'logout', child: Text('Esci')),
            ],
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _newGroup,
        backgroundColor: sage,
        foregroundColor: Colors.white,
        icon: const Icon(Icons.add),
        label: const Text('Nuovo gruppo', style: TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: RefreshIndicator(
        onRefresh: () async => _reload(),
        child: FutureBuilder<List<GroupSummary>>(
          future: _future,
          builder: (ctx, snap) {
            if (snap.connectionState != ConnectionState.done) {
              return const Center(child: CircularProgressIndicator(color: sage));
            }
            if (snap.hasError) {
              return ListView(
                padding: const EdgeInsets.all(20),
                children: [
                  const SizedBox(height: 60),
                  _ErrorBox(
                    message: snap.error is ApiException
                        ? (snap.error as ApiException).message
                        : 'Connessione assente: controlla la rete.',
                    onRetry: _reload,
                  ),
                ],
              );
            }
            final groups = snap.data ?? const [];
            return ListView(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
              children: [
                Text(
                  'Ciao ${widget.user.name}',
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 4),
                Text(
                  'Ecco a che punto sono i tuoi conti.',
                  style: TextStyle(
                    fontSize: 14,
                    color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.6),
                  ),
                ),
                const SizedBox(height: 18),
                if (groups.isEmpty)
                  const _EmptyBox()
                else
                  for (final g in groups) _GroupCard(group: g, onTap: () => _openGroup(g)),
              ],
            );
          },
        ),
      ),
    );
  }
}

class _GroupCard extends StatelessWidget {
  const _GroupCard({required this.group, required this.onTap});

  final GroupSummary group;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final net = group.netMinor;
    final color = net > 0 ? posColor : net < 0 ? negColor : null;
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Card(
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Container(
                  width: 46,
                  height: 46,
                  decoration: BoxDecoration(
                    color: sage.withValues(alpha: 0.13),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    group.name.characters.first.toUpperCase(),
                    style: const TextStyle(
                        color: sage, fontWeight: FontWeight.w800, fontSize: 19),
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        group.name,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15.5),
                      ),
                      const SizedBox(height: 3),
                      Text(
                        '${group.memberCount} ${group.memberCount == 1 ? 'membro' : 'membri'}'
                        ' · speso ${formatMinor(group.totalExpensesMinor, Meta.exponentOf(group.baseCurrency))} ${group.baseCurrency}',
                        style: TextStyle(
                          fontSize: 12.5,
                          color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.55),
                        ),
                      ),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      net == 0 ? 'in pari' : _netText(net, group.baseCurrency),
                      style: TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 13.5,
                        color: color ?? Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.5),
                      ),
                    ),
                    if (net != 0)
                      Text(
                        net > 0 ? 'ti devono' : 'devi',
                        style: TextStyle(
                          fontSize: 11,
                          color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.5),
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  String _netText(int net, String cur) =>
      '${net > 0 ? '+' : '-'}${formatMinor(net.abs(), Meta.exponentOf(cur))} $cur';
}

class _EmptyBox extends StatelessWidget {
  const _EmptyBox();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 48),
      child: Column(
        children: [
          Container(
            width: 72,
            height: 72,
            decoration: BoxDecoration(
              color: sage.withValues(alpha: 0.10),
              shape: BoxShape.circle,
            ),
            alignment: Alignment.center,
            child: const Icon(Icons.receipt_long_outlined, size: 34, color: sage),
          ),
          const SizedBox(height: 16),
          const Text('Nessun gruppo ancora',
              style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
          const SizedBox(height: 6),
          Text(
            'Crea un gruppo oppure unisciti\na quello degli amici con un codice.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13.5,
              color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.55),
            ),
          ),
        ],
      ),
    );
  }
}

class _ErrorBox extends StatelessWidget {
  const _ErrorBox({required this.message, required this.onRetry});

  final String message;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(height: 40),
        Text(message, textAlign: TextAlign.center),
        const SizedBox(height: 14),
        OutlinedButton.icon(
          onPressed: onRetry,
          icon: const Icon(Icons.refresh),
          label: const Text('Riprova'),
        ),
      ],
    );
  }
}

/// Foglio "Nuovo gruppo": nome + valuta con ricerca, errori visibili.
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
      padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
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
                  color: Theme.of(context)
                      .colorScheme
                      .onSurface
                      .withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
            ),
            const Text('Nuovo gruppo',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            const SizedBox(height: 14),
            TextField(
              controller: _name,
              autofocus: true,
              textCapitalization: TextCapitalization.sentences,
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
