"""Resilienza: un database che si sta svegliando non deve dare 500.

Neon gratuito si sospende dopo l'inattività. La PRIMA richiesta dopo il risveglio
può fallire con errore di connessione: con il retry l'utente non vede nulla,
senza retry vede "Internal Server Error".

Regole coperte:
- GET: ritenta una volta sola (1,5s) e poi risponde normalmente
- POST: MAI ritentato (rischio di doppio inserimento)
"""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.exc import OperationalError

from app import main as app_main
from app.auth import hash_password
from app.database import Base, SessionLocal, engine
from app.main import app
from app.models import Group, GroupMember, User


@pytest.fixture()
def client():
    """Client di test con database pulito per ogni test."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def _group_id(client: TestClient) -> int:
    r = client.post(
        "/register",
        data={"name": "Marco", "email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    r = client.post(
        "/groups/new",
        data={"name": "Viaggio", "kind": "trip", "base_currency": "EUR"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    return int(r.headers["location"].split("?")[0].rstrip("/").split("/")[-1])


def test_get_retries_once_when_db_is_waking_up(
    client: TestClient, monkeypatch
) -> None:
    """Prima chiamata al DB fallisce (risveglio): la seconda deve bastare."""
    group_id = _group_id(client)

    real = app_main.compute_balances
    calls = {"n": 0}

    def flaky(db, group):
        calls["n"] += 1
        if calls["n"] == 1:
            raise OperationalError("SELECT ...", {}, Exception("Neon si sveglia"))
        return real(db, group)

    monkeypatch.setattr(app_main, "compute_balances", flaky)

    resp = client.get(f"/groups/{group_id}")
    assert resp.status_code == 200, resp.text[:300]
    assert calls["n"] == 2  # fallita una volta, ritentata una volta


def test_get_gives_up_after_the_single_retry(client: TestClient, monkeypatch) -> None:
    """Se il DB resta giù, l'errore arriva comunque (niente loop infiniti)."""
    group_id = _group_id(client)

    calls = {"n": 0}

    def always_down(db, group):
        calls["n"] += 1
        raise OperationalError("SELECT ...", {}, Exception("Neon ancora giù"))

    monkeypatch.setattr(app_main, "compute_balances", always_down)

    with pytest.raises(OperationalError):
        client.get(f"/groups/{group_id}")
    assert calls["n"] == 2  # prima + un solo ripristino


def test_post_is_never_retried(client: TestClient, monkeypatch) -> None:
    """Le mutazioni non vengono ritentate: nessun rischio di doppio inserimento."""
    group_id = _group_id(client)

    # Serve un secondo membro: la rimozione è l'unica mutazione che calcola
    # i saldi (serve a vedere l'errore di connessione).
    db = SessionLocal()
    other = User(
        name="amico", email="amico@example.com", password_hash=hash_password("x" * 8)
    )
    db.add(other)
    db.flush()
    db.add(GroupMember(group_id=group_id, user_id=other.id, role="member"))
    db.commit()
    other_id = other.id
    db.close()

    calls = {"n": 0}

    def down(db, group):
        calls["n"] += 1
        raise OperationalError("SELECT ...", {}, Exception("Neon giù"))

    monkeypatch.setattr(app_main, "compute_balances", down)

    with pytest.raises(OperationalError):
        # La rimozione membro calcola i saldi come guardia: se il DB è giù
        # l'errore deve PROPAGARE, mai essere ritentato su una mutazione.
        client.post(
            f"/groups/{group_id}/members/{other_id}/remove",
            follow_redirects=False,
        )
    assert calls["n"] == 1  # nessun tentativo extra su una mutazione
