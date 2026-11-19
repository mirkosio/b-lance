"""Statistiche di un gruppo, calcolate dallo storico vero.

Nessun dato inventato: se non ci sono spese, la pagina mostra il vuoto.
Le spese annullate restano nello storico ma non contano nei numeri.
"""

from __future__ import annotations

from datetime import datetime

MONTHS_IT = (
    "Gen", "Feb", "Mar", "Apr", "Mag", "Giu",
    "Lug", "Ago", "Set", "Ott", "Nov", "Dic",
)


def _month_key(value: datetime | None) -> str:
    return f"{value.year:04d}-{value.month:02d}" if value else ""


def build_stats(expenses, names: dict[int, str], now: datetime | None = None) -> dict:
    """Restituisce i numeri del gruppo. `expenses` sono modelli Expense."""
    today = now or datetime.now()
    active = [e for e in expenses if getattr(e, "voided_at", None) is None]

    total = sum(e.base_amount_minor or 0 for e in active)
    count = len(active)

    by_category: dict[str, int] = {}
    by_person: dict[int, int] = {}
    by_month: dict[str, int] = {}
    biggest = None
    for e in active:
        amount = e.base_amount_minor or 0
        cat = (e.category or "other").lower()
        by_category[cat] = by_category.get(cat, 0) + amount
        by_person[e.paid_by] = by_person.get(e.paid_by, 0) + amount
        key = _month_key(e.created_at)
        if key:
            by_month[key] = by_month.get(key, 0) + amount
        if biggest is None or amount > (biggest.base_amount_minor or 0):
            biggest = e

    categories = [
        {"key": key, "amount_minor": amount,
         "pct": round(amount * 100 / total) if total else 0}
        for key, amount in sorted(
            by_category.items(), key=lambda item: item[1], reverse=True
        )
    ]
    people = [
        {"id": uid, "name": names.get(uid, "?"), "amount_minor": amount}
        for uid, amount in sorted(
            by_person.items(), key=lambda item: item[1], reverse=True
        )
    ]

    months = []
    year, month = today.year, today.month
    for _ in range(6):
        key = f"{year:04d}-{month:02d}"
        months.append({
            "key": key,
            "label": f"{MONTHS_IT[month - 1]} {year % 100:02d}",
            "amount_minor": by_month.get(key, 0),
        })
        month -= 1
        if month == 0:
            month, year = 12, year - 1
    months.reverse()

    return {
        "total_minor": total,
        "count": count,
        "average_minor": total // count if count else 0,
        "categories": categories,
        "people": people,
        "months": months,
        "biggest": (
            {
                "description": biggest.description,
                "amount_minor": biggest.base_amount_minor or 0,
            }
            if biggest is not None
            else None
        ),
        "max_month": max((m["amount_minor"] for m in months), default=0),
        "span_days": (
            (today.date() - min(e.created_at.date() for e in active
                                if e.created_at)).days + 1
            if any(e.created_at for e in active)
            else 0
        ),
    }
