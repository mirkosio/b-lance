"""Configurazione e database session."""

from __future__ import annotations

import os
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./b-lance.db")


def _normalize_url(url: str) -> str:
    """Normalizza l'URL per funzionare con SQLite, Neon e Render.

    - Render a volte dà "postgres://" -> va bene come "postgresql://".
    - Neon/Render danno "postgresql://" ma noi usiamo psycopg (v3),
      quindi serve il prefisso "+psycopg", altrimenti SQLAlchemy cerca
      psycopg2 (non installato) e va in errore.
    - SQLite resta invariato.
    """
    if url.startswith("sqlite"):
        return url
    # Prefisso del driver: usiamo psycopg3.
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+psycopg://", 1)
    return url


DATABASE_URL = _normalize_url(DATABASE_URL)

# check_same_thread=False serve solo per SQLite con FastAPI multi-thread.
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

# pool_pre_ping: verifica la connessione prima di usarla. Importante in
# produzione (Neon chiude le connessioni inattive, evita errori "server closed").
engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
    future=True,
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)


class Base(DeclarativeBase):
    """Base per tutti i modelli ORM."""


def get_db() -> Generator[Session, None, None]:
    """Dependency FastAPI: fornisce una sessione per richiesta."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    """Crea le tabelle se non esistono."""
    from . import models  # noqa: F401

    Base.metadata.create_all(bind=engine)
