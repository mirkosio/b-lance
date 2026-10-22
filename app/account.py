"""Operazioni sull'account condivise da API e sito."""

from __future__ import annotations

import secrets

from sqlalchemy import select
from sqlalchemy.orm import Session

from .auth import hash_password
from .models import GroupMember, LoginAttempt, User


def anonymize_user(db: Session, user: User) -> None:
    """Elimina l'account lasciando intatto lo storico delle spese.

    - nome -> "Ex-membro", colore neutro, handle rimosso
    - email -> tombstone univoco, password casuale, token revocati
    - nei gruppi, il membro più anziano prende l'ownership se serve
    - le membership restano: quote e saldi continuano a tornare
    """
    memberships = db.scalars(
        select(GroupMember).where(GroupMember.user_id == user.id)
    ).all()
    for membership in memberships:
        if membership.role == "owner":
            successor = db.scalar(
                select(GroupMember)
                .where(
                    GroupMember.group_id == membership.group_id,
                    GroupMember.user_id != user.id,
                )
                .order_by(GroupMember.joined_at)
            )
            if successor is not None:
                successor.role = "owner"
        membership.role = "member" if membership.role == "owner" else membership.role
        membership.perms = ""

    old_email = user.email
    user.name = "Ex-membro"
    user.email = f"deleted-{user.id}@b-lance.invalid"
    user.color = "#94A3B8"
    user.handle = None
    user.password_hash = hash_password(secrets.token_urlsafe(32))
    user.session_version += 1
    db.query(LoginAttempt).filter(
        LoginAttempt.key.like(f"%{old_email}%")
    ).delete(synchronize_session=False)
    db.commit()
