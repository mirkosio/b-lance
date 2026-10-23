"""Configurazione e database session."""

from __future__ import annotations

import logging
import os
import time
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


def _migrate() -> None:
    """Migrazione leggera per colonne aggiunte dopo il primo deploy.

    create_all() NON modifica tabelle esistenti: su Render/Neon le tabelle ci
    sono gia', quindi le colonne nuove vanno aggiunte a mano. Idempotente:
    a ogni avvio controlla e aggiunge solo se manca.
    """
    from sqlalchemy import inspect, text

    columns = {c["name"] for c in inspect(engine).get_columns("group_members")}
    if "perms" not in columns:
        with engine.begin() as conn:
            conn.execute(
                text(
                    "ALTER TABLE group_members "
                    "ADD COLUMN perms VARCHAR(200) NOT NULL DEFAULT ''"
                )
            )

    user_columns = {c["name"] for c in inspect(engine).get_columns("users")}
    if "session_version" not in user_columns:
        with engine.begin() as conn:
            conn.execute(
                text(
                    "ALTER TABLE users "
                    "ADD COLUMN session_version INTEGER NOT NULL DEFAULT 0"
                )
            )
    if "handle" not in user_columns:
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE users ADD COLUMN handle VARCHAR(30)"))
            conn.execute(
                text(
                    "CREATE UNIQUE INDEX IF NOT EXISTS ix_users_handle "
                    "ON users (handle)"
                )
            )

    expense_columns = {c["name"] for c in inspect(engine).get_columns("expenses")}
    if "updated_at" not in expense_columns:
        with engine.begin() as conn:
            conn.execute(
                text("ALTER TABLE expenses ADD COLUMN updated_at TIMESTAMP")
            )

    payment_columns = {c["name"] for c in inspect(engine).get_columns("payments")}
    if "voided_at" not in payment_columns:
        with engine.begin() as conn:
            conn.execute(
                text("ALTER TABLE payments ADD COLUMN voided_at TIMESTAMP")
            )


def init_db(retries: int = 5, delay: float = 2.0) -> None:
    """Crea le tabelle e applica le migrazioni MINORI.

    Il database gratuito (Neon) si sospende dopo l'inattività: al risveglio
    la prima connessione può fallire. Senza retry l'app uscirebbe all'avvio
    e Render risponderebbe con errore a ogni richiesta finché non si sveglia.
    """
    from . import models  # noqa: F401

    last_exc: Exception | None = None
    for attempt in range(1, retries + 1):
        try:
            Base.metadata.create_all(bind=engine)
            _migrate()
            return
        except Exception as exc:  # db non ancora pronto: aspetto e riprovo
            last_exc = exc
            if attempt < retries:
                logging.getLogger("b-lance").warning(
                    "DB non pronto (tentativo %d/%d): %s", attempt, retries, exc
                )
                time.sleep(delay)
    raise last_exc  # type: ignore[misc]
