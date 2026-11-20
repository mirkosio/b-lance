"""Amicizie esplicite e codice personale stabile.

Nessuna rubrica caricata, nessuna email restituita nelle ricerche:
si trova una persona solo tramite @username o codice amico.
"""

from __future__ import annotations

import secrets

from sqlalchemy import and_, or_, select
from sqlalchemy.orm import Session

from .models import FriendCode, Friendship, User


def friend_code(db: Session, user_id: int) -> str:
    """Codice corto, stabile e univoco. Lo si può condividere come link."""
    row = db.get(FriendCode, user_id)
    if row is None:
        for _ in range(5):
            candidate = secrets.token_hex(5).upper()
            if db.scalar(
                select(FriendCode).where(FriendCode.code == candidate)
            ) is None:
                db.add(FriendCode(user_id=user_id, code=candidate))
                db.commit()
                return candidate
        raise RuntimeError("Impossible generare un codice amico univoco")
    return row.code


def find_user(db: Session, query: str) -> User | None:
    raw = (query or "").strip()
    if not raw:
        return None
    if raw.startswith("@"):
        raw = raw[1:]
    handle = raw.lower()
    user = db.scalar(select(User).where(User.handle == handle))
    if user is not None:
        return user
    code = db.scalar(select(FriendCode).where(FriendCode.code == raw.upper()))
    if code is None:
        return None
    return db.get(User, code.user_id)


def friendship_between(db: Session, a: int, b: int) -> Friendship | None:
    return db.scalar(
        select(Friendship).where(
            or_(
                and_(
                    Friendship.requester_id == a,
                    Friendship.addressee_id == b,
                ),
                and_(
                    Friendship.addressee_id == a,
                    Friendship.requester_id == b,
                ),
            )
        )
    )


def friend_ids(db: Session, user_id: int) -> list[int]:
    rows = db.scalars(
        select(Friendship).where(
            or_(
                Friendship.requester_id == user_id,
                Friendship.addressee_id == user_id,
            ),
            Friendship.status == "accepted",
        )
    ).all()
    return [
        r.addressee_id if r.requester_id == user_id else r.requester_id
        for r in rows
    ]
