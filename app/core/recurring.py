"""Materializzazione delle spese ricorrenti.

Non c'è un cron esterno: quando un gruppo viene letto (API o sito), le regole
scadute vengono trasformate in normali Expense. È idempotente: `next_run`
avanza e non si creano doppioni.

Perché così: su Vercel le funzioni sono effimere e non c'è un worker sempre
acceso. La lettura del gruppo è il momento naturale in cui "serve" il dato.
"""

from __future__ import annotations

import calendar
import json
from datetime import datetime, timedelta, timezone
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models import Expense, GroupMember, RecurringExpense, Share

FREQUENCIES = ("daily", "weekly", "monthly", "yearly")
MAX_CATCHUP = 24


def _aware(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value


def _add_months(value: datetime, months: int) -> datetime:
    total = value.month - 1 + months
    year = value.year + total // 12
    month = total % 12 + 1
    day = min(value.day, calendar.monthrange(year, month)[1])
    return value.replace(year=year, month=month, day=day)


def next_occurrence(value: datetime, frequency: str, interval: int = 1) -> datetime:
    interval = max(1, min(int(interval or 1), 12))
    if frequency == "daily":
        return value + timedelta(days=interval)
    if frequency == "weekly":
        return value + timedelta(weeks=interval)
    if frequency == "monthly":
        return _add_months(value, interval)
    if frequency == "yearly":
        return _add_months(value, interval * 12)
    raise ValueError("frequenza non valida")


def materialize_due(db: Session, group_id: int) -> int:
    """Crea le spese ricorrenti scadute del gruppo. Ritorna quante ne ha create."""
    now = datetime.now(timezone.utc)
    rules = db.scalars(
        select(RecurringExpense).where(
            RecurringExpense.group_id == group_id,
            RecurringExpense.active.is_(True),
            RecurringExpense.next_run <= now,
        )
    ).all()
    if not rules:
        return 0
    current_members = set(
        db.scalars(
            select(GroupMember.user_id).where(GroupMember.group_id == group_id)
        ).all()
    )
    created = 0
    for rule in rules:
        members = [int(x) for x in json.loads(rule.members_json or "[]")]
        if not members or not set(members).issubset(current_members):
            # Un partecipante non è più nel gruppo: fermo la regola invece di
            # creare spese sbagliate. L'utente può ricrearla.
            rule.active = False
            continue
        shares = {int(k): int(v) for k, v in json.loads(rule.shares_json or "{}").items()}
        guard = 0
        while _aware(rule.next_run) <= now and guard < MAX_CATCHUP:
            expense = Expense(
                group_id=group_id,
                paid_by=rule.paid_by,
                description=rule.description,
                category=rule.category,
                amount_minor=rule.amount_minor,
                currency=rule.currency,
                base_amount_minor=rule.base_amount_minor,
                base_currency=rule.base_currency,
                fx_rate=rule.fx_rate,
                split_method=rule.split_method,
                created_by=rule.created_by,
                created_at=_aware(rule.next_run),
            )
            db.add(expense)
            db.flush()
            for uid, amount in shares.items():
                db.add(
                    Share(expense_id=expense.id, user_id=uid, amount_minor=amount)
                )
            rule.last_run_at = _aware(rule.next_run)
            rule.next_run = next_occurrence(
                _aware(rule.next_run), rule.frequency, rule.interval
            )
            guard += 1
            created += 1
    db.commit()
    return created
