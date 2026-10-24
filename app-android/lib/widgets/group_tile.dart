import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';
import '../ui.dart';

/// Riga gruppo: avatar, nome, membri, saldo e chevron.
class GroupTile extends StatelessWidget {
  const GroupTile({super.key, required this.group, required this.onTap});

  final GroupSummary group;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final net = group.netMinor;
    final expo = Meta.exponentOf(group.baseCurrency);
    final color = net > 0
        ? posOn(context)
        : net < 0
        ? negOn(context)
        : mutedOn(context);
    final saldo = net == 0
        ? 'in pari'
        : '${formatSigned(net, expo, group.baseCurrency)} '
              '${net > 0 ? 'ti devono' : 'devi'}';
    return Semantics(
      button: true,
      excludeSemantics: true,
      label:
          '${group.name}, '
          '${group.memberCount} ${group.memberCount == 1 ? 'membro' : 'membri'}, '
          'speso ${formatMinor(group.totalExpensesMinor, expo)} '
          '${group.baseCurrency}, $saldo',
      child: Padding(
        padding: const EdgeInsets.only(bottom: 16),
        child: Card(
          clipBehavior: Clip.antiAlias,
          child: InkWell(
            onTap: () {
              hapticTap();
              onTap();
            },
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
                      style: TextStyle(
                        color: Theme.of(context).brightness == Brightness.dark
                            ? sage
                            : sageInk,
                        fontWeight: FontWeight.w800,
                        fontSize: 19,
                      ),
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
                          style: const TextStyle(
                            fontWeight: FontWeight.w700,
                            fontSize: 15.5,
                          ),
                        ),
                        const SizedBox(height: 3),
                        Text(
                          '${group.memberCount} '
                          '${group.memberCount == 1 ? 'membro' : 'membri'}'
                          ' · speso ${formatMinor(group.totalExpensesMinor, expo)} '
                          '${group.baseCurrency}',
                          style: TextStyle(
                            fontSize: 12.5,
                            color: mutedOn(context),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        net == 0
                            ? 'in pari'
                            : formatSigned(net, expo, group.baseCurrency),
                        style: TextStyle(
                          fontWeight: FontWeight.w800,
                          fontSize: 13.5,
                          color: color,
                        ),
                      ),
                      if (net != 0)
                        Text(
                          net > 0 ? 'ti devono' : 'devi',
                          style: TextStyle(
                            fontSize: 11,
                            color: mutedOn(context),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(width: 2),
                  Icon(Icons.chevron_right, size: 18, color: mutedOn(context)),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
