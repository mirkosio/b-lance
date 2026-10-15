"""Servizio di dominio: calcolo saldi e visione di gruppo.

Un saldo per un utente U in un gruppo G è:

    saldo(U) = somma quote di spese pagate da altri verso U
             - somma quote di U su spese pagate da altri
             + pagamenti ricevuti da U
             - pagamenti inviati da U

Equivalente e più semplice da calcolare:
    saldo(U) = (quanto ha pagato U per conto comune) - (quanto doveva U)

dove "quanto ha pagato" = totale delle spese NON annullate con paid_by == U,
e "quanto doveva" = somma delle sue quote su tutte le spese non annullate.

Poi i pagamenti correggono il saldo: se A deve 50 a B e paga 20,
A passa da -50 a -30 e B da +50 a +30.

Tutto in centesimi della VALUTA BASE del gruppo.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from .core.money import convert_minor, format_eur, to_major
from .core.settlement import Transfer, settle_all
from .models import Expense, Group, GroupMember, Payment, Share, User


@dataclass
class MemberBalance:
    """Saldo di un membro dentro un gruppo."""

    user_id: int
    name: str
    color: str
    # In centesimi della valuta base. Positivo = gli devono soldi.
    net_minor: int
    # Quanto ha pagato per il gruppo e quanto era tenuto a pagare.
    paid_minor: int = 0
    owed_minor: int = 0

    @property
    def is_settled(self) -> bool:
        return self.net_minor == 0

    def display(self) -> str:
        """Formato leggibile con segno: +12.50 / -3.40 / 0.00."""
        value = to_major(abs(self.net_minor))
        if self.net_minor > 0:
            return f"+€{value:.2f}"
        if self.net_minor < 0:
            return f"-€{value:.2f}"
        return f"€{value:.2f}"


@dataclass
class GroupView:
    """Tutto ciò che serve per mostrare un gruppo."""

    group: Group
    members: list[MemberBalance] = field(default_factory=list)
    transfers: list[Transfer] = field(default_factory=list)

    def member_name(self, user_id: int) -> str:
        for m in self.members:
            if m.user_id == user_id:
                return m.name
        return f"#{user_id}"

    def total_expenses_minor(self) -> int:
        return sum(m.paid_minor for m in self.members)

    def total_expenses_display(self) -> str:
        return format_eur(self.total_expenses_minor())


def compute_balances(db: Session, group: Group) -> GroupView:
    """Calcola i saldi correnti del gruppo, a partire dallo storico.

    Ignora le spese annullate. Applica i pagamenti registrati.
    Deterministico: stesso storico -> stessi saldi.
    """
    # Carico membri (con user) e spese (con shares) in due query, non N+1.
    members = db.scalars(
        select(GroupMember)
        .options(selectinload(GroupMember.user))
        .where(GroupMember.group_id == group.id)
    ).all()

    expenses = db.scalars(
        select(Expense)
        .options(selectinload(Expense.shares))
        .where(Expense.group_id == group.id, Expense.voided_at.is_(None))
    ).all()

    payments = db.scalars(
        select(Payment).where(Payment.group_id == group.id)
    ).all()

    view = GroupView(group=group)
    paid: dict[int, int] = {}
    owed: dict[int, int] = {}

    for exp in expenses:
        # Tasso di cambio della spesa -> valuta base del gruppo.
        rate = Decimal(exp.fx_rate) if exp.currency != group.base_currency else Decimal("1")
        if exp.currency != group.base_currency:
            # Le quote sono già salvate in valuta base, ma paid_by è in valuta
            # originale: converto l'importo pagato per il bilancio complessivo.
            paid_amount = convert_minor(exp.amount_minor, rate)
        else:
            paid_amount = exp.amount_minor
        paid[exp.paid_by] = paid.get(exp.paid_by, 0) + paid_amount
        for share in exp.shares:
            owed[share.user_id] = owed.get(share.user_id, 0) + share.amount_minor

    # Netto base = pagato - dovuto, per ogni membro.
    net: dict[int, int] = {}
    for m in members:
        uid = m.user_id
        net[uid] = paid.get(uid, 0) - owed.get(uid, 0)

    # Applico i pagamenti: riducono il debito di chi paga, il credito di chi riceve.
    for p in payments:
        net[p.from_user] = net.get(p.from_user, 0) + p.amount_minor
        net[p.to_user] = net.get(p.to_user, 0) - p.amount_minor

    for m in members:
        uid = m.user_id
        view.members.append(
            MemberBalance(
                user_id=uid,
                name=m.user.name,
                color=m.user.color,
                net_minor=net.get(uid, 0),
                paid_minor=paid.get(uid, 0),
                owed_minor=owed.get(uid, 0),
            )
        )

    # Ordino per saldo decrescente (chi è in credito prima) per display pulito.
    view.members.sort(key=lambda b: (-b.net_minor, b.name))

    # Chi paga chi: solo se qualcuno è in debito.
    balances_map = {m.user_id: m.net_minor for m in view.members}
    view.transfers = settle_all(balances_map)
    return view


def balances_for_users(
    db: Session, group: Group, user_ids: list[int]
) -> dict[int, int]:
    """Saldi ristretti a un sottoinsieme di utenti.

    Comodo per il settlement parziale: se solo A e B hanno dato 100 per
    la pizza, la divisione "di gruppo" resta A/B, non si mescola col resto.
    """
    view = compute_balances(db, group)
    return {m.user_id: m.net_minor for m in view.members if m.user_id in user_ids}
