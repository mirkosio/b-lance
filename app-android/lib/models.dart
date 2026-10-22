/// Modelli JSON dell'API: gli specchi esatti delle risposte di /api/*.
library;

class User {
  const User({
    required this.id,
    required this.name,
    required this.email,
    required this.color,
  });

  final int id;
  final String name;
  final String email;
  final String color;

  factory User.fromJson(Map<String, dynamic> j) => User(
    id: j['id'] as int,
    name: j['name'] as String,
    email: j['email'] as String? ?? '',
    color: j['color'] as String? ?? '#6366f1',
  );
}

class CurrencyInfo {
  const CurrencyInfo({
    required this.code,
    required this.name,
    required this.symbol,
    required this.exponent,
    required this.hasAutoRate,
  });

  final String code;
  final String name;
  final String symbol;
  final int exponent;
  final bool hasAutoRate; // false -> l'utente deve scrivere il tasso

  factory CurrencyInfo.fromJson(
    Map<String, dynamic> j, {
    bool hasAutoRate = true,
  }) => CurrencyInfo(
    code: j['code'] as String,
    name: j['name'] as String,
    symbol: j['symbol'] as String,
    exponent: j['exponent'] as int,
    hasAutoRate: hasAutoRate,
  );
}

class GroupSummary {
  const GroupSummary({
    required this.id,
    required this.name,
    required this.baseCurrency,
    required this.inviteCode,
    required this.memberCount,
    required this.netMinor,
    required this.totalExpensesMinor,
  });

  final int id;
  final String name;
  final String baseCurrency;
  final String inviteCode;
  final int memberCount;
  final int netMinor;
  final int totalExpensesMinor;

  factory GroupSummary.fromJson(Map<String, dynamic> j) => GroupSummary(
    id: j['id'] as int,
    name: j['name'] as String,
    baseCurrency: j['base_currency'] as String,
    inviteCode: j['invite_code'] as String,
    memberCount: (j['member_count'] as num?)?.toInt() ?? 0,
    netMinor: (j['net_minor'] as num?)?.toInt() ?? 0,
    totalExpensesMinor: (j['total_expenses_minor'] as num?)?.toInt() ?? 0,
  );
}

/// Dashboard: gruppi + saldo complessivo per valuta.
class Dashboard {
  const Dashboard({required this.groups, required this.netByCurrency});

  final List<GroupSummary> groups;
  final Map<String, int> netByCurrency;

  factory Dashboard.fromJson(Map<String, dynamic> j) => Dashboard(
    groups: (j['groups'] as List<dynamic>)
        .map((g) => GroupSummary.fromJson(g as Map<String, dynamic>))
        .toList(),
    netByCurrency: ((j['net_by_currency'] as Map<String, dynamic>?) ?? const {})
        .map((k, v) => MapEntry(k, (v as num).toInt())),
  );
}

/// Un movimento della sezione "Movimenti": spesa o pagamento, da un gruppo.
class ActivityItem {
  const ActivityItem({
    required this.id,
    required this.kind,
    required this.groupId,
    required this.groupName,
    required this.title,
    required this.subtitle,
    required this.amountMinor,
    required this.currency,
    required this.baseAmountMinor,
    required this.baseCurrency,
    required this.createdAt,
    required this.voided,
  });

  final int id;
  final String kind; // "expense" | "payment"
  final int groupId;
  final String groupName;
  final String title;
  final String subtitle;
  final int amountMinor;
  final String currency;
  final int baseAmountMinor;
  final String baseCurrency;
  final String? createdAt;
  final bool voided;

  bool get isPayment => kind == 'payment';

  factory ActivityItem.fromJson(Map<String, dynamic> j) => ActivityItem(
    id: j['id'] as int,
    kind: j['kind'] as String? ?? 'expense',
    groupId: j['group_id'] as int,
    groupName: j['group_name'] as String? ?? '?',
    title: j['title'] as String? ?? '',
    subtitle: j['subtitle'] as String? ?? '',
    amountMinor: (j['amount_minor'] as num?)?.toInt() ?? 0,
    currency: j['currency'] as String? ?? 'EUR',
    baseAmountMinor: (j['base_amount_minor'] as num?)?.toInt() ?? 0,
    baseCurrency: j['base_currency'] as String? ?? 'EUR',
    createdAt: j['created_at'] as String?,
    voided: j['voided'] as bool? ?? false,
  );
}

class Member {
  const Member({
    required this.userId,
    required this.name,
    required this.color,
    required this.netMinor,
    required this.role,
    required this.active,
    required this.isMe,
    required this.perms,
  });

  final int userId;
  final String name;
  final String color;
  final int netMinor;
  final String role;
  final bool active;
  final bool isMe;
  final List<String> perms;

  bool get canExpenseManage =>
      role == 'owner' || role == 'admin' || perms.contains('expense_manage');
  bool get canPaymentManage =>
      role == 'owner' || role == 'admin' || perms.contains('payment_manage');

  factory Member.fromJson(Map<String, dynamic> j) => Member(
    userId: j['user_id'] as int,
    name: j['name'] as String,
    color: j['color'] as String? ?? '#94a3b8',
    netMinor: (j['net_minor'] as num?)?.toInt() ?? 0,
    role: j['role'] as String? ?? 'member',
    active: j['active'] as bool? ?? true,
    isMe: j['is_me'] as bool? ?? false,
    perms:
        (j['perms'] as List<dynamic>?)?.map((e) => e as String).toList() ??
        const [],
  );
}

class Expense {
  const Expense({
    required this.id,
    required this.description,
    required this.category,
    required this.amountMinor,
    required this.currency,
    required this.baseAmountMinor,
    required this.baseCurrency,
    required this.paidBy,
    required this.createdBy,
    required this.payerName,
    required this.createdAt,
    required this.splitMethod,
    required this.shares,
    required this.voided,
    this.voidedAt,
    this.fxRate,
  });

  final int id;
  final String description;
  final String category;
  final int amountMinor;
  final String currency;
  final int baseAmountMinor;
  final String baseCurrency;
  final int paidBy;
  final int createdBy;
  final String payerName;
  final String? createdAt;
  final String splitMethod;
  final List<Share> shares;

  /// Annullata: resta nello storico, non conta nei saldi.
  final bool voided;
  final String? voidedAt;

  /// Tasso usato al momento del registro (1 unita' di currency in base).
  final String? fxRate;

  factory Expense.fromJson(Map<String, dynamic> j) => Expense(
    id: j['id'] as int,
    description: j['description'] as String,
    category: j['category'] as String? ?? 'other',
    amountMinor: (j['amount_minor'] as num).toInt(),
    currency: j['currency'] as String,
    baseAmountMinor: (j['base_amount_minor'] as num).toInt(),
    baseCurrency: j['base_currency'] as String? ?? 'EUR',
    paidBy: j['paid_by'] as int,
    createdBy: j['created_by'] as int? ?? j['paid_by'] as int,
    payerName: j['payer_name'] as String? ?? '?',
    createdAt: j['created_at'] as String?,
    splitMethod: j['split_method'] as String? ?? 'even',
    shares: (j['shares'] as List<dynamic>? ?? const [])
        .map((s) => Share.fromJson(s as Map<String, dynamic>))
        .toList(),
    voided: j['voided_at'] != null,
    voidedAt: j['voided_at'] as String?,
    fxRate: j['fx_rate'] as String?,
  );
}

class Share {
  const Share({required this.userId, required this.amountMinor});

  final int userId;
  final int amountMinor;

  factory Share.fromJson(Map<String, dynamic> j) => Share(
    userId: j['user_id'] as int,
    amountMinor: (j['amount_minor'] as num).toInt(),
  );
}

class Payment {
  const Payment({
    required this.id,
    required this.fromUser,
    required this.fromName,
    required this.toUser,
    required this.toName,
    required this.amountMinor,
    required this.currency,
    required this.note,
    this.createdAt,
  });

  final int id;
  final int fromUser;
  final String fromName;
  final int toUser;
  final String toName;
  final int amountMinor;
  final String currency;
  final String? note;
  final String? createdAt;

  factory Payment.fromJson(Map<String, dynamic> j) => Payment(
    id: j['id'] as int,
    fromUser: j['from_user'] as int,
    fromName: j['from_name'] as String? ?? '?',
    toUser: j['to_user'] as int,
    toName: j['to_name'] as String? ?? '?',
    amountMinor: (j['amount_minor'] as num).toInt(),
    currency: j['currency'] as String? ?? 'EUR',
    note: j['note'] as String?,
    createdAt: j['created_at'] as String?,
  );
}

class Transfer {
  const Transfer({
    required this.payerId,
    required this.payeeId,
    required this.amountMinor,
  });

  final int payerId;
  final int payeeId;
  final int amountMinor;

  factory Transfer.fromJson(Map<String, dynamic> j) => Transfer(
    payerId: j['payer_id'] as int,
    payeeId: j['payee_id'] as int,
    amountMinor: (j['amount_minor'] as num).toInt(),
  );
}

/// Anteprima di un invito: mostra il gruppo prima di entrarci.
class InvitePreview {
  const InvitePreview({
    required this.name,
    required this.baseCurrency,
    required this.memberCount,
  });

  final String name;
  final String baseCurrency;
  final int memberCount;

  factory InvitePreview.fromJson(Map<String, dynamic> j) => InvitePreview(
    name: j['name'] as String? ?? '?',
    baseCurrency: j['base_currency'] as String? ?? 'EUR',
    memberCount: (j['member_count'] as num?)?.toInt() ?? 0,
  );
}

class GroupDetail {
  const GroupDetail({
    required this.id,
    required this.name,
    required this.baseCurrency,
    required this.inviteCode,
    required this.members,
    required this.transfers,
    required this.expenses,
    required this.payments,
    required this.totalExpensesMinor,
    required this.isOwner,
    required this.perms,
  });

  final int id;
  final String name;
  final String baseCurrency;
  final String inviteCode;
  final List<Member> members;
  final List<Transfer> transfers;
  final List<Expense> expenses;
  final List<Payment> payments;
  final int totalExpensesMinor;
  final bool isOwner;
  final List<String> perms;

  Member? memberById(int id) {
    for (final m in members) {
      if (m.userId == id) return m;
    }
    return null;
  }

  factory GroupDetail.fromJson(Map<String, dynamic> j) {
    final g = j['group'] as Map<String, dynamic>;
    return GroupDetail(
      id: g['id'] as int,
      name: g['name'] as String,
      baseCurrency: g['base_currency'] as String,
      inviteCode: g['invite_code'] as String? ?? '',
      members: (j['members'] as List<dynamic>)
          .map((m) => Member.fromJson(m as Map<String, dynamic>))
          .toList(),
      transfers: (j['transfers'] as List<dynamic>)
          .map((t) => Transfer.fromJson(t as Map<String, dynamic>))
          .toList(),
      expenses: (j['expenses'] as List<dynamic>)
          .map((e) => Expense.fromJson(e as Map<String, dynamic>))
          .toList(),
      payments: (j['payments'] as List<dynamic>)
          .map((p) => Payment.fromJson(p as Map<String, dynamic>))
          .toList(),
      totalExpensesMinor: (j['total_expenses_minor'] as num?)?.toInt() ?? 0,
      isOwner: j['is_owner'] as bool? ?? false,
      perms:
          (j['perms'] as List<dynamic>?)?.map((e) => e as String).toList() ??
          const [],
    );
  }
}
