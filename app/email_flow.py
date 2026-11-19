"""Conferma email e recupero via email.

Tutto disattivato di default: il sito funziona anche senza provider email.
Quando SMTP_HOST è configurato, la conferma all'iscrizione può essere
attivata con EMAIL_VERIFICATION_REQUIRED=1. I token non sono mai salvati in
chiaro nel database: c'è solo l'hash HMAC. I link scadono e sono monouso.
"""

from __future__ import annotations

import hashlib
import hmac
import os
import secrets
import smtplib
from datetime import timedelta
from email.message import EmailMessage

from sqlalchemy import select
from sqlalchemy.orm import Session

from .auth import SECRET_KEY
from .models import EmailToken, utcnow


def smtp_configured() -> bool:
    return bool(os.getenv("SMTP_HOST", "").strip())


def verification_required() -> bool:
    """La conferma è obbligatoria solo se è stata esplicitamente attivata."""
    return os.getenv("EMAIL_VERIFICATION_REQUIRED", "").strip().lower() in (
        "1", "true", "yes", "on"
    )


def _hash(token: str) -> str:
    return hmac.new(
        SECRET_KEY.encode(), token.encode(), hashlib.sha256
    ).hexdigest()


def new_token(
    db: Session, user_id: int, kind: str, hours: int = 24
) -> str:
    """Crea un token monouso e restituisce il valore da mandare via email."""
    if kind not in ("verify", "recover"):
        raise ValueError("tipo di token non valido")
    # Un solo token utile alla volta per quello scopo.
    old = db.scalars(
        select(EmailToken).where(
            EmailToken.user_id == user_id,
            EmailToken.kind == kind,
            EmailToken.used_at.is_(None),
        )
    ).all()
    for row in old:
        row.used_at = utcnow()
    token = secrets.token_urlsafe(32)
    db.add(
        EmailToken(
            user_id=user_id,
            token_hash=_hash(token),
            kind=kind,
            expires_at=utcnow() + timedelta(hours=hours),
        )
    )
    db.commit()
    return token


def consume_token(db: Session, raw: str, kind: str) -> EmailToken | None:
    """Restituisce il token se è valido, non scaduto e non già usato."""
    if not raw or kind not in ("verify", "recover"):
        return None
    row = db.scalar(
        select(EmailToken).where(
            EmailToken.token_hash == _hash(raw),
            EmailToken.kind == kind,
            EmailToken.used_at.is_(None),
        )
    )
    if row is None:
        return None
    if row.expires_at:
        now = utcnow()
        if row.expires_at.tzinfo is None:  # SQLite restituisce datetime naive
            now = now.replace(tzinfo=None)
        if row.expires_at < now:
            return None
    return row


def is_verified(db: Session, user_id: int) -> bool:
    row = db.scalar(
        select(EmailToken).where(
            EmailToken.user_id == user_id,
            EmailToken.kind == "verify",
            EmailToken.used_at.is_not(None),
        )
    )
    return row is not None


class EmailUnavailable(RuntimeError):
    """Nessun SMTP configurato: non fingiamo di aver mandato la email."""


def send_mail(to: str, subject: str, body: str) -> None:
    host = os.getenv("SMTP_HOST", "").strip()
    if not host:
        raise EmailUnavailable("Email non configurata (SMTP_HOST mancante)")
    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("SMTP_USER", "").strip()
    password = os.getenv("SMTP_PASSWORD", "")
    sender = os.getenv("SMTP_FROM", "").strip() or user or "noreply@localhost"
    msg = EmailMessage()
    msg["From"] = sender
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)
    use_tls = os.getenv("SMTP_TLS", "1").strip().lower() not in ("0", "false", "no")
    with smtplib.SMTP(host, port, timeout=10) as smtp:
        if use_tls:
            smtp.starttls()
        if user and password:
            smtp.login(user, password)
        smtp.send_message(msg)
