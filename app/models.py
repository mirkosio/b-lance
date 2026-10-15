"""Modelli ORM del database.

Note di progetto (le scelte "da azienda"):
- Gli importi sono SEMPRE int di centesimi (minor unit). Vedi money.py.
- Le spese non si cancellano: si annullano (voided_at). Storico immutabile.
- Ogni spesa salva la sua valuta originale + tasso di cambio al momento
  del registro. I saldi storici non si muovono se il tasso cambia dopo.
- Le quote (Share) sono importi ESATTI per persona, non percentuali.
  Così il settlement parziale e l'audit tornano sempre.
"""

from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(120))
    password_hash: Mapped[str] = mapped_column(String(255))
    # Color per riconoscere i membri nei grafici/saldi.
    color: Mapped[str] = mapped_column(String(9), default="#6366f1")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    memberships: Mapped[list[GroupMember]] = relationship(back_populates="user")


class Group(Base):
    __tablename__ = "groups"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(160))
    # Valuta di visualizzazione dei saldi del gruppo. Es. "EUR".
    base_currency: Mapped[str] = mapped_column(String(3), default="EUR")
    # Tipo libero per etichetta: trip, home, event, other.
    kind: Mapped[str] = mapped_column(String(32), default="other")
    # Codice corto per invitare via link/WhatsApp senza account.
    invite_code: Mapped[str] = mapped_column(String(12), unique=True, index=True)
    created_by: Mapped[int] = mapped_column(ForeignKey("users.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    members: Mapped[list[GroupMember]] = relationship(
        back_populates="group", cascade="all, delete-orphan"
    )
    expenses: Mapped[list[Expense]] = relationship(
        back_populates="group", cascade="all, delete-orphan"
    )
    payments: Mapped[list[Payment]] = relationship(
        back_populates="group", cascade="all, delete-orphan"
    )


class GroupMember(Base):
    __tablename__ = "group_members"
    __table_args__ = (UniqueConstraint("group_id", "user_id", name="uq_group_user"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    group_id: Mapped[int] = mapped_column(ForeignKey("groups.id"), index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    role: Mapped[str] = mapped_column(String(16), default="member")
    joined_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    group: Mapped[Group] = relationship(back_populates="members")
    user: Mapped[User] = relationship(back_populates="memberships")


class Expense(Base):
    __tablename__ = "expenses"

    id: Mapped[int] = mapped_column(primary_key=True)
    group_id: Mapped[int] = mapped_column(ForeignKey("groups.id"), index=True)
    paid_by: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    description: Mapped[str] = mapped_column(String(200))
    category: Mapped[str] = mapped_column(String(40), default="other")
    # Importo in centesimi, nella valuta originale della spesa.
    amount_minor: Mapped[int] = mapped_column(Integer)
    currency: Mapped[str] = mapped_column(String(3), default="EUR")
    # Tasso di cambio al momento del registro (valuta -> base_currency).
    # 1.0 se valuta == base. Serve a non ricalcolare lo storico.
    fx_rate: Mapped[str] = mapped_column(String(30), default="1.0")
    # Valuta base dell'importo, per sapere in che unità sono i saldi.
    base_currency: Mapped[str] = mapped_column(String(3), default="EUR")
    split_method: Mapped[str] = mapped_column(String(16), default="even")
    # Annullata invece di cancellata: storico immutabile.
    voided_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_by: Mapped[int] = mapped_column(ForeignKey("users.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    group: Mapped[Group] = relationship(back_populates="expenses")
    shares: Mapped[list[Share]] = relationship(
        back_populates="expense", cascade="all, delete-orphan"
    )


class Share(Base):
    """Quota esatta di una spesa per una persona, in centesimi (valuta base)."""

    __tablename__ = "shares"
    __table_args__ = (UniqueConstraint("expense_id", "user_id", name="uq_expense_user"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    expense_id: Mapped[int] = mapped_column(ForeignKey("expenses.id"), index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    amount_minor: Mapped[int] = mapped_column(Integer)

    expense: Mapped[Expense] = relationship(back_populates="shares")


class Payment(Base):
    """Pagamento/saldamento fra due membri, dentro un gruppo.

    amount_minor è nella valuta base del gruppo. Supporta il pagamento
    PARZIALE: ne registri molti per lo stesso debito finché non azzera.
    """

    __tablename__ = "payments"

    id: Mapped[int] = mapped_column(primary_key=True)
    group_id: Mapped[int] = mapped_column(ForeignKey("groups.id"), index=True)
    from_user: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    to_user: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    amount_minor: Mapped[int] = mapped_column(Integer)
    currency: Mapped[str] = mapped_column(String(3), default="EUR")
    note: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    group: Mapped[Group] = relationship(back_populates="payments")
