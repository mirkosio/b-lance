"""Statistiche d'uso, solo con consenso esplicito.

Niente IP salvati, niente identificativi, niente cookie di tracciamento:
una preferenza di consenso (letta dal browser) e un contatore giornaliero
per evento. I numeri mostrati sono quelli davvero raccolti; finché la
baseline non è sufficiente non viene fissato alcun target.
"""

from __future__ import annotations

import hashlib
import hmac
from datetime import date, timedelta

from fastapi import HTTPException, Request
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from .auth import SECRET_KEY
from .models import UsageEvent, utcnow
from .throttle import client_ip

CONSENT_COOKIE = "bl_analytics_consent"
EVENTS = (
    "page_view",
    "demo_start",
    "register_start",
    "login_start",
    "register",
    "group_create",
    "expense_add",
    "balance_view",
)


def has_consent(request: Request) -> bool:
    return request.cookies.get(CONSENT_COOKIE, "").strip().lower() == "yes"


def record_event(db: Session, request: Request, event: str) -> bool:
    """Ritorna False se non c'è consenso. Non salva mai l'IP in chiaro."""
    if not has_consent(request) or event not in EVENTS:
        return False
    db.add(UsageEvent(day=utcnow().date(), event=event))
    db.commit()
    return True


def guard_event_request(db: Session, request: Request) -> None:
    """Al massimo 60 eventi l'ora per IP (hash HMAC, mai salvato in chiaro)."""
    from .throttle import _count, _hit, _prune, REGISTER_WINDOW

    _prune(db)
    key = "analytics:ip:" + hmac.new(
        SECRET_KEY.encode(), client_ip(request).encode(), hashlib.sha256
    ).hexdigest()
    if _count(db, key, REGISTER_WINDOW) >= 60:
        raise HTTPException(status_code=429, detail="Troppi eventi, riprova più tardi.")
    _hit(db, key)


def totals(db: Session, days: int = 30) -> dict[str, int]:
    since = utcnow().date() - timedelta(days=days - 1)
    rows = db.execute(
        select(UsageEvent.event, func.count())
        .where(UsageEvent.day >= since)
        .group_by(UsageEvent.event)
    ).all()
    return {event: int(count) for event, count in rows}


def daily(db: Session, event: str, days: int = 14) -> list[dict]:
    from datetime import timedelta

    since = utcnow().date() - timedelta(days=days - 1)
    rows = db.execute(
        select(UsageEvent.day, func.count())
        .where(UsageEvent.event == event, UsageEvent.day >= since)
        .group_by(UsageEvent.day)
        .order_by(UsageEvent.day)
    ).all()
    by_day = {str(day): int(count) for day, count in rows}
    result = []
    for offset in range(days - 1, -1, -1):
        day = str(utcnow().date() - timedelta(days=offset))
        result.append({"day": day, "count": by_day.get(day, 0)})
    return result
