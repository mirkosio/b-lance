import 'package:flutter/material.dart';

import '../api.dart';
import '../categories.dart';
import '../models.dart';
import '../ui.dart';

/// Riga di un movimento globale (spesa o pagamento).
class ActivityTile extends StatelessWidget {
  const ActivityTile({super.key, required this.item, required this.onTap});

  final ActivityItem item;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final expo = Meta.exponentOf(item.currency);
    final muted = mutedOn(context);
    final isPayment = item.isPayment;
    final cat = categoryInfo(item.category);
    final parts = [
      item.groupName,
      if (item.subtitle.trim().isNotEmpty) item.subtitle.trim(),
    ];
    final amount = '${formatMinor(item.amountMinor, expo)} ${item.currency}';
    return Semantics(
      button: true,
      excludeSemantics: true,
      label:
          '${isPayment ? 'Pagamento' : 'Spesa'}: ${item.title}, '
          '$amount, ${parts.join(', ')}'
          '${item.voided ? (isPayment ? ', annullato' : ', annullata') : ''}',
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
              padding: const EdgeInsets.all(14),
              child: Row(
                children: [
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color:
                          (item.voided ? muted : (isPayment ? sage : cat.color))
                              .withValues(alpha: 0.10),
                      borderRadius: BorderRadius.circular(13),
                    ),
                    alignment: Alignment.center,
                    child: Icon(
                      isPayment ? Icons.swap_horiz : cat.icon,
                      size: 22,
                      color: item.voided
                          ? muted
                          : (isPayment
                                ? (Theme.of(context).brightness ==
                                          Brightness.dark
                                      ? sage
                                      : sageInk)
                                : cat.color),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          item.title,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontWeight: FontWeight.w700,
                            fontSize: 14.5,
                            decoration: item.voided
                                ? TextDecoration.lineThrough
                                : null,
                            color: item.voided ? muted : null,
                          ),
                        ),
                        const SizedBox(height: 3),
                        Text(
                          parts.join(' · '),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(fontSize: 12, color: muted),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        '${formatMinor(item.amountMinor, expo)} ${item.currency}',
                        style: TextStyle(
                          fontWeight: FontWeight.w800,
                          fontSize: 13.5,
                          decoration: item.voided
                              ? TextDecoration.lineThrough
                              : null,
                          color: item.voided
                              ? muted
                              : (isPayment
                                    ? (Theme.of(context).brightness ==
                                              Brightness.dark
                                          ? sage
                                          : sageInk)
                                    : null),
                        ),
                      ),
                      if (item.voided)
                        Padding(
                          padding: const EdgeInsets.only(top: 2),
                          child: Text(
                            isPayment ? 'ANNULLATO' : 'ANNULLATA',
                            style: TextStyle(
                              fontSize: 10.5,
                              fontWeight: FontWeight.w800,
                              letterSpacing: 0.5,
                              color: muted,
                            ),
                          ),
                        )
                      else if (item.createdAt != null)
                        Padding(
                          padding: const EdgeInsets.only(top: 2),
                          child: Text(
                            formatDateTime(item.createdAt),
                            style: TextStyle(fontSize: 11.5, color: muted),
                          ),
                        ),
                    ],
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
