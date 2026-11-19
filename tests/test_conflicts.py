"""Conflitti tra dispositivi: nessun sovrascrivimento silenzioso.

Un telefono apre il form di modifica, un altro dispositivo salva prima:
chi arriva dopo deve vedere un 409 esplicito e scegliere, non trovare i
propri dati spariti.
"""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.database import Base, engine
from app.main import app


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def _setup(client: TestClient):
    a = client.post(
        "/api/register",
        json={"name": "Marco", "email": "marco@example.com", "password": "secret123"},
    ).json()
    b = client.post(
        "/api/register",
        json={"name": "Luca", "email": "luca@example.com", "password": "secret123"},
    ).json()
    group = client.post(
        "/api/groups",
        json={"name": "Weekend", "base_currency": "EUR"},
        headers={"Authorization": f"Bearer {a['token']}"},
    ).json()
    client.post(
        "/api/groups/join",
        json={"code": group["invite_code"]},
        headers={"Authorization": f"Bearer {b['token']}"},
    )
    return a, b, group["id"]


def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def test_modifica_spesa_con_base_vecchia_non_sovrascrive(client: TestClient) -> None:
    a, b, gid = _setup(client)
    ah = _auth(a["token"])
    created = client.post(
        f"/api/groups/{gid}/expenses",
        json={
            "description": "Cena", "amount": "100.00",
            "paid_by": a["user"]["id"],
            "members": [a["user"]["id"], b["user"]["id"]],
        },
        headers=ah,
    ).json()
    eid = created["id"]
    stale_base = "2000-01-01T00:00:00+00:00"

    r = client.patch(
        f"/api/groups/{gid}/expenses/{eid}",
        json={
            "description": "La mia versione", "amount": "100.00",
            "paid_by": a["user"]["id"],
            "members": [a["user"]["id"], b["user"]["id"]],
            "base": stale_base,
        },
        headers=ah,
    )
    assert r.status_code == 409, r.text
    assert "nessun dato" in r.json()["detail"].lower() or "Niente" in r.json()["detail"]

    detail = client.get(f"/api/groups/{gid}", headers=ah).json()
    expense = next(e for e in detail["expenses"] if e["id"] == eid)
    assert expense["description"] == "Cena"  # niente scrittura avvenuta

    # Con la scelta esplicita dell'utente la modifica passa.
    forced = client.patch(
        f"/api/groups/{gid}/expenses/{eid}",
        json={
            "description": "La mia versione", "amount": "100.00",
            "paid_by": a["user"]["id"],
            "members": [a["user"]["id"], b["user"]["id"]],
            "base": stale_base, "force": True,
        },
        headers=ah,
    )
    assert forced.status_code == 200, forced.text
    assert forced.json()["description"] == "La mia versione"


def test_modifica_spesa_con_base_giusta_funziona(client: TestClient) -> None:
    a, b, gid = _setup(client)
    ah = _auth(a["token"])
    created = client.post(
        f"/api/groups/{gid}/expenses",
        json={
            "description": "Benzina", "amount": "40.00",
            "paid_by": a["user"]["id"], "members": [a["user"]["id"]],
        },
        headers=ah,
    ).json()
    r = client.patch(
        f"/api/groups/{gid}/expenses/{created['id']}",
        json={
            "description": "Benzina (aggiornata)", "amount": "40.00",
            "paid_by": a["user"]["id"], "members": [a["user"]["id"]],
            "base": created["base"],
        },
        headers=ah,
    )
    assert r.status_code == 200, r.text
    assert r.json()["description"] == "Benzina (aggiornata)"


def test_annullare_pagamento_due_volte_da_conflitto(client: TestClient) -> None:
    a, b, gid = _setup(client)
    ah = _auth(a["token"])
    payment = client.post(
        f"/api/groups/{gid}/payments",
        json={
            "from_user": b["user"]["id"],
            "to_user": a["user"]["id"],
            "amount": "20.00",
        },
        headers=ah,
    ).json()
    first = client.delete(f"/api/groups/{gid}/payments/{payment['id']}", headers=ah)
    assert first.status_code == 200
    second = client.delete(f"/api/groups/{gid}/payments/{payment['id']}", headers=ah)
    assert second.status_code == 409, second.text
    assert "già stato annullato" in second.json()["detail"]


def test_doppio_annullamento_e_ripristino_sul_web_danno_conflitto(client: TestClient) -> None:
    client.post(
        "/register",
        data={"name": "Marco", "email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    gid = int(
        client.post(
            "/groups/new",
            data={"name": "Weekend", "kind": "trip", "base_currency": "EUR"},
            follow_redirects=False,
        ).headers["location"].split("?")[0].rstrip("/").split("/")[-1]
    )
    client.post(
        f"/groups/{gid}/expenses",
        data={
            "description": "Cena", "amount": "30", "paid_by": "1",
            "split_method": "even", "members": ["1"],
        },
        follow_redirects=False,
    )
    first = client.post(f"/groups/{gid}/expenses/1/void", follow_redirects=False)
    assert first.status_code == 303
    second = client.post(f"/groups/{gid}/expenses/1/void", follow_redirects=False)
    assert second.status_code == 409

    client.post(f"/groups/{gid}/expenses/1/restore", follow_redirects=False)
    again = client.post(f"/groups/{gid}/expenses/1/restore", follow_redirects=False)
    assert again.status_code == 409
