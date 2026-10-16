"""Configurazione e database session."""

from __future__ import annotations

import os
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./b-lance.db")


class BadDatabaseURL(ValueError):
    """DATABASE_URL non e' una stringa di connessione Postgres valida."""


def _normalize_url(url: str) -> str:
    """Normalizza l'URL per funzionare con SQLite, Neon e Render.

    - Pulisce spazi e virgolette residui del copiaincolla dal dashboard.
    - "postgres://" e "postgresql://" diventano "postgresql+psycopg://"
      perche' usiamo psycopg (v3): senza il prefisso SQLAlchemy cerca
      psycopg2 (non installato) e va in errore.
    - Un URL che inizia con http(s):// NON e' un DSN: significa che e' stato
      copiato l'indirizzo del sito, non la connection string. Errore chiaro.
    - Aggiunge sslmode=require se mancante: Neon richiede TLS.
    """
    url = (url or "").strip().strip("\"'").strip()
    if not url:
        return "sqlite:///./b-lance.db"
    if url.startswith("sqlite"):
        return url

    scheme = url.split(":", 1)[0].lower()
    if scheme in ("http", "https"):
        raise BadDatabaseURL(
            f"DATABASE_URL inizia con '{scheme}://' ma serve la stringa di "
            "connessione Postgres, che inizia con 'postgresql://'. "
            "Su Neon: Dashboard -> Connection Details -> copia la "
            "'Connection string' (non l'URL del sito)."
        )

    # Prefisso del driver: usiamo psycopg3.
    if url.lower().startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://"):]
    if url.lower().startswith("postgresql://"):
        url = "postgresql+psycopg://" + url[len("postgresql://"):]

    # Neon rifiuta le connessioni senza TLS: assicura che sslmode ci sia.
    if "sslmode=" not in url.lower():
        url += "&sslmode=require" if "?" in url else "?sslmode=require"
    return url


try:
    DATABASE_URL = _normalize_url(DATABASE_URL)
except BadDatabaseURL as exc:
    raise BadDatabaseURL(f"\n[ B-Lance ] {exc}\n") from None

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
