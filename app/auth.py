"""Autenticazione e sessioni.

Scelte "azienda":
- Hash password con bcrypt (non MD5/SHA crudi).
- Sessione lato server via cookie firmato (itsdangerous), non JWT.
  Più semplice, revocabile, e perfetto per un'app server-rendered.
"""

from __future__ import annotations

import os
import secrets as _secrets

import bcrypt
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer
from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import User

# SECRET_KEY da env var in produzione (Render/Neon). Se manca, ne genera una
# random SOLO per sviluppo — in produzione va SEMPRE impostata, altrimenti
# le sessioni si invalidano a ogni riavvio.
SECRET_KEY = os.getenv("SECRET_KEY") or _secrets.token_hex(32)
_SESSION_SALT = "b-lance-session"
# Le sessioni scadono: un token rubato non vale per sempre.
SESSION_MAX_AGE = int(os.getenv("SESSION_MAX_AGE_DAYS", "30")) * 24 * 60 * 60
_serializer = URLSafeTimedSerializer(SECRET_KEY, salt=_SESSION_SALT)


def hash_password(password: str) -> str:
    """Genera l'hash bcrypt della password."""
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str) -> bool:
    """Verifica una password contro il suo hash, in modo sicuro."""
    try:
        return bcrypt.checkpw(password.encode(), hashed.encode())
    except ValueError:
        return False


def create_session_token(user_id: int, session_version: int = 0) -> str:
    """Crea il cookie di sessione per un utente.

    Include la versione di sessione: se l'utente fa "esci da tutti i
    dispositivi", i token vecchi non corrispondono più e vengono rifiutati.
    """
    return _serializer.dumps({"uid": user_id, "v": session_version})


def read_session_token(token: str) -> tuple[int, int] | None:
    """Legge (uid, versione) dal token. None se scaduto o non valido.

    Il token porta il timestamp: max_age lo fa scadere da solo. I token del
    formato vecchio (senza timestamp) risultano invalidi: tutti rifanno il
    login una volta dopo l'aggiornamento.
    """
    if not token:
        return None
    try:
        data = _serializer.loads(token, max_age=SESSION_MAX_AGE)
    except (BadSignature, SignatureExpired):
        return None
    uid = data.get("uid")
    if not isinstance(uid, int):
        return None
    return uid, int(data.get("v", 0))


def get_current_user(db: Session, token: str | None) -> User | None:
    """Ricava l'utente dalla sessione, o None se non loggato.

    Un token con versione diversa da quella dell'utente è stato revocato.
    """
    parsed = read_session_token(token or "")
    if parsed is None:
        return None
    uid, version = parsed
    user = db.get(User, uid)
    if user is None or user.session_version != version:
        return None
    return user


def get_user_by_email(db: Session, email: str) -> User | None:
    """Cerca un utente per email (case-insensitive)."""
    return db.scalar(select(User).where(User.email == email.strip().lower()))
