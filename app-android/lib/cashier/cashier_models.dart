class CashierPerson {
  final int id;
  final String name;
  final String color;
  CashierPerson({required this.id, required this.name, this.color = '#5F8D6E'});
  factory CashierPerson.fromJson(Map<String, dynamic> j) => CashierPerson(
        id: j['id'] as int,
        name: j['name'] as String,
        color: j['color'] as String? ?? '#5F8D6E',
      );
  Map<String, dynamic> toJson() => {'id': id, 'name': name, 'color': color};
}

class CashierExpenseItem {
  final int id;
  final String description;
  final int amountMinor;
  final List<int> memberIds; // chi partecipa a questo articolo (vuoto = tutti)
  CashierExpenseItem({
    required this.id,
    required this.description,
    required this.amountMinor,
    this.memberIds = const [],
  });
  factory CashierExpenseItem.fromJson(Map<String, dynamic> j) => CashierExpenseItem(
        id: j['id'] as int,
        description: j['description'] as String,
        amountMinor: j['amount_minor'] as int,
        memberIds: (j['member_ids'] as List<dynamic>? ?? const [])
            .map((e) => e as int)
            .toList(),
      );
  Map<String, dynamic> toJson() => {
        'id': id,
        'description': description,
        'amount_minor': amountMinor,
        'member_ids': memberIds,
      };
}

class CashierExpense {
  final int id;
  final String description;
  final int amountMinor;
  final int paidById;
  final List<int> memberIds;
  final String currency;
  final List<CashierExpenseItem> items; // split a livello di singolo articolo

  /// 'equal' (default), 'exact' o 'percent'.
  final String splitMode;
  /// Solo per 'exact': quanto deve ogni persona, in unità minori.
  final Map<int, int> exactMinor;
  /// Solo per 'percent': quota in centesimi di punto percentuale (5000 = 50%).
  final Map<int, int> percentBp;

  CashierExpense({
    required this.id,
    required this.description,
    required this.amountMinor,
    required this.paidById,
    required this.memberIds,
    this.currency = 'EUR',
    this.items = const [],
    this.splitMode = 'equal',
    this.exactMinor = const {},
    this.percentBp = const {},
  });

  factory CashierExpense.fromJson(Map<String, dynamic> j) {
    Map<int, int> intMap(Object? raw) {
      if (raw is! Map) return const {};
      return {
        for (final entry in raw.entries)
          if (int.tryParse('${entry.key}') != null)
            int.parse('${entry.key}'): (entry.value as num).toInt(),
      };
    }

    return CashierExpense(
      id: j['id'] as int,
      description: j['description'] as String,
      amountMinor: j['amount_minor'] as int,
      paidById: j['paid_by_id'] as int,
      memberIds: (j['member_ids'] as List<dynamic>)
          .map((e) => e as int)
          .toList(),
      currency: j['currency'] as String? ?? 'EUR',
      items: (j['items'] as List<dynamic>? ?? const [])
          .map((e) => CashierExpenseItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      splitMode: j['split_mode'] as String? ?? 'equal',
      exactMinor: intMap(j['exact_minor']),
      percentBp: intMap(j['percent_bp']),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'description': description,
        'amount_minor': amountMinor,
        'paid_by_id': paidById,
        'member_ids': memberIds,
        'currency': currency,
        'items': items.map((i) => i.toJson()).toList(),
        'split_mode': splitMode,
        'exact_minor': {
          for (final e in exactMinor.entries) '${e.key}': e.value,
        },
        'percent_bp': {
          for (final e in percentBp.entries) '${e.key}': e.value,
        },
      };
}

class CashierPayment {
  final int id;
  final int fromId;
  final int toId;
  final int amountMinor;
  final String note;
  CashierPayment({
    required this.id,
    required this.fromId,
    required this.toId,
    required this.amountMinor,
    this.note = '',
  });
  factory CashierPayment.fromJson(Map<String, dynamic> j) => CashierPayment(
        id: j['id'] as int,
        fromId: j['from_id'] as int,
        toId: j['to_id'] as int,
        amountMinor: j['amount_minor'] as int,
        note: j['note'] as String? ?? '',
      );
  Map<String, dynamic> toJson() => {
        'id': id,
        'from_id': fromId,
        'to_id': toId,
        'amount_minor': amountMinor,
        'note': note,
      };
}

class CashierGroup {
  final int id;
  String name;
  String currency;
  List<CashierPerson> members;
  List<CashierExpense> expenses;
  List<CashierPayment> payments;
  CashierGroup({
    required this.id,
    required this.name,
    this.currency = 'EUR',
    List<CashierPerson>? members,
    List<CashierExpense>? expenses,
    List<CashierPayment>? payments,
  })  : members = members ?? [],
        expenses = expenses ?? [],
        payments = payments ?? [];
  factory CashierGroup.fromJson(Map<String, dynamic> j) => CashierGroup(
        id: j['id'] as int,
        name: j['name'] as String,
        currency: j['currency'] as String? ?? 'EUR',
        members: (j['members'] as List<dynamic>? ?? [])
            .map((e) => CashierPerson.fromJson(e as Map<String, dynamic>))
            .toList(),
        expenses: (j['expenses'] as List<dynamic>? ?? [])
            .map((e) => CashierExpense.fromJson(e as Map<String, dynamic>))
            .toList(),
        payments: (j['payments'] as List<dynamic>? ?? [])
            .map((e) => CashierPayment.fromJson(e as Map<String, dynamic>))
            .toList(),
      );
  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'currency': currency,
        'members': members.map((m) => m.toJson()).toList(),
        'expenses': expenses.map((e) => e.toJson()).toList(),
        'payments': payments.map((p) => p.toJson()).toList(),
      };
}