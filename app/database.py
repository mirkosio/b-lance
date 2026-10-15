"""Configurazione e database session."""

from __future__ import annotations

import os
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./siamoquiti.db")

# check_same_thread=False serve per SQLite con FastAPI multi-thread.
connect_args = (
    {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)

engine = create_engine(DATABASE_URL, connect_args=connect_args, future=True)
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
