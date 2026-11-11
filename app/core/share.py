"""Regole del link pubblico del riepilogo.

Il link è read-only e non contiene dettagli privati, ma resta un segreto:
dopo 30 giorni scade da solo. Chi lo ha creato può sempre revocarlo prima.
"""

from datetime import datetime, timedelta, timezone

from ..models import utcnow

SHARE_TTL_DAYS = 30


def _aware(value: datetime) -> datetime:
    return value if value.tzinfo else value.replace(tzinfo=timezone.utc)


def share_expires_at(created_at: datetime | None) -> datetime | None:
    if created_at is None:
        return None
    return _aware(created_at) + timedelta(days=SHARE_TTL_DAYS)


def share_is_expired(created_at: datetime | None) -> bool:
    expires = share_expires_at(created_at)
    return expires is not None and utcnow() >= expires
