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

class CashierExpense {
  final int id;
  final String description;
  final int amountMinor;
  final int paidById;
  final List<int> memberIds;
  CashierExpense({
    required this.id,
    required this.description,
    required this.amountMinor,
    required this.paidById,
    required this.memberIds,
  });
  factory CashierExpense.fromJson(Map<String, dynamic> j) => CashierExpense(
        id: j['id'] as int,
        description: j['description'] as String,
        amountMinor: j['amount_minor'] as int,
        paidById: j['paid_by_id'] as int,
        memberIds: (j['member_ids'] as List<dynamic>).map((e) => e as int).toList(),
      );
  Map<String, dynamic> toJson() => {
        'id': id,
        'description': description,
        'amount_minor': amountMinor,
        'paid_by_id': paidById,
        'member_ids': memberIds,
      };
}

class CashierGroup {
  final int id;
  String name;
  String currency;
  List<CashierPerson> members;
  List<CashierExpense> expenses;
  CashierGroup({
    required this.id,
    required this.name,
    this.currency = 'EUR',
    List<CashierPerson>? members,
    List<CashierExpense>? expenses,
  })  : members = members ?? [],
        expenses = expenses ?? [];
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
      );
  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'currency': currency,
        'members': members.map((m) => m.toJson()).toList(),
        'expenses': expenses.map((e) => e.toJson()).toList(),
      };
}