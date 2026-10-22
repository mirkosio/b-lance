"""Limite tentativi di accesso, persistente su database.

Su Vercel le istanze sono effimere e possono essere più di una: un contatore
in memoria non varrebbe niente. Quindi i tentativi stanno su DB e valgono per
tutta l'applicazione.

Finestra scorrevole: conto i tentativi degli ultimi N minuti, senza job
periodici. Le righe vecchie vengono ripulite quando si registra un tentativo.

Disattivabile con RATE_LIMIT=0 (utile in sviluppo o nei test mirati).
"""

from __future__ import annotations

import os
from datetime import timedelta

from fastapi import HTTPException, Request
from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session

from .models import LoginAttempt, utcnow

ENABLED = os.getenv("RATE_LIMIT", "1").strip().lower() not in {
    "0",
    "off",
    "false",
    "no",
}

# Login: 8 errori per email e 40 per IP in 15 minuti.
LOGIN_WINDOW = 15 * 60
LOGIN_MAX_EMAIL = 8
LOGIN_MAX_IP = 40

# Registrazioni: 20 per IP in un'ora.
REGISTER_WINDOW = 60 * 60
REGISTER_MAX_IP = 20

# Pulizia: oltre 24 ore un tentativo non serve più.
PRUNE_AFTER = 24 * 60 * 60


def client_ip(request: Request) -> str:
    """IP reale dietro il proxy di Vercel."""
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[0].strip() or "?"
    return request.client.host if request.client else "?"


def _prune(db: Session) -> None:
    cutoff = utcnow() - timedelta(seconds=PRUNE_AFTER)
    db.execute(delete(LoginAttempt).where(LoginAttempt.created_at < cutoff))
    db.commit()


def _count(db: Session, key: str, window: int) -> int:
    since = utcnow() - timedelta(seconds=window)
    return (
        db.scalar(
            select(func.count())
            .select_from(LoginAttempt)
            .where(LoginAttempt.key == key, LoginAttempt.created_at >= since)
        )
        or 0
    )


def _hit(db: Session, key: str) -> None:
    db.add(LoginAttempt(key=key))
    db.commit()


def guard_login(db: Session, request: Request, email: str) -> None:
    """Blocca prima di verificare la password se i tentativi sono troppi."""
    if not ENABLED:
        return
    _prune(db)
    email_key = f"login:email:{email.strip().lower()}"
    ip_key = f"login:ip:{client_ip(request)}"
    if (
        _count(db, email_key, LOGIN_WINDOW) >= LOGIN_MAX_EMAIL
        or _count(db, ip_key, LOGIN_WINDOW) >= LOGIN_MAX_IP
    ):
        raise HTTPException(
            status_code=429,
            detail="Troppi tentativi di accesso. Riprova tra 15 minuti.",
        )


def record_login_failure(db: Session, request: Request, email: str) -> None:
    if not ENABLED:
        return
    _hit(db, f"login:email:{email.strip().lower()}")
    _hit(db, f"login:ip:{client_ip(request)}")


def clear_login_failures(db: Session, email: str) -> None:
    """Login riuscito: l'email torna pulita (l'IP resta contato)."""
    if not ENABLED:
        return
    db.execute(
        delete(LoginAttempt).where(
            LoginAttempt.key == f"login:email:{email.strip().lower()}"
        )
    )
    db.commit()


def guard_register(db: Session, request: Request) -> None:
    if not ENABLED:
        return
    _prune(db)
    key = f"register:ip:{client_ip(request)}"
    if _count(db, key, REGISTER_WINDOW) >= REGISTER_MAX_IP:
        raise HTTPException(
            status_code=429,
            detail="Troppi account creati da questa rete. Riprova più tardi.",
        )


def record_register(db: Session, request: Request) -> None:
    if not ENABLED:
        return
    _hit(db, f"register:ip:{client_ip(request)}")
