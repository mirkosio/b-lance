"""Autenticazione e sessioni.

Scelte "azienda":
- Hash password con bcrypt (non MD5/SHA crudi).
- Sessione lato server via cookie firmato (itsdangerous), non JWT.
  Più semplice, revocabile, e perfetto per un'app server-rendered.
"""

from __future__ import annotations

import bcrypt
from itsdangerous import BadSignature, SignatureExpired, URLSafeSerializer
from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import User

# In produzione va da env var. Qui un default per sviluppo.
SECRET_KEY = "dev-secret-change-me-in-prod"
_SESSION_SALT = "b-lance-session"
_serializer = URLSafeSerializer(SECRET_KEY, salt=_SESSION_SALT)


def hash_password(password: str) -> str:
    """Genera l'hash bcrypt della password."""
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str) -> bool:
    """Verifica una password contro il suo hash, in modo sicuro."""
    try:
        return bcrypt.checkpw(password.encode(), hashed.encode())
    except ValueError:
        return False


def create_session_token(user_id: int) -> str:
    """Crea il cookie di sessione per un utente."""
    return _serializer.dumps({"uid": user_id})


def read_session_token(token: str) -> int | None:
    """Legge l'uid da un cookie di sessione. Ritorna None se non valido."""
    if not token:
        return None
    try:
        data = _serializer.loads(token)
    except (BadSignature, SignatureExpired):
        return None
    return data.get("uid")


def get_current_user(db: Session, token: str | None) -> User | None:
    """Ricava l'utente dalla sessione, o None se non loggato."""
    uid = read_session_token(token or "")
    if uid is None:
        return None
    return db.get(User, uid)


def get_user_by_email(db: Session, email: str) -> User | None:
    """Cerca un utente per email (case-insensitive)."""
    return db.scalar(select(User).where(User.email == email.strip().lower()))
