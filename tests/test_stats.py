"""Statistiche del gruppo: numeri presi dallo storico, mai inventati."""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.core.stats import build_stats
from app.database import Base, engine
from app.main import app


class FakeExpense:
    def __init__(self, amount, category, paid_by, description, voided=False, when=None):
        self.base_amount_minor = amount
        self.category = category
        self.paid_by = paid_by
        self.description = description
        self.voided_at = 1 if voided else None
        self.created_at = when


def test_build_stats_esclude_annullate_e_calcola_media() -> None:
    from datetime import datetime

    now = datetime(2026, 11, 19)
    expenses = [
        FakeExpense(10000, "food", 1, "Cena", when=now),
        FakeExpense(5000, "transport", 2, "Taxi", when=now),
        FakeExpense(90000, "food", 1, "Annullata", voided=True, when=now),
    ]
    stats = build_stats(expenses, {1: "Marco", 2: "Luca"}, now=now)
    assert stats["total_minor"] == 15000
    assert stats["count"] == 2
    assert stats["average_minor"] == 7500
    assert stats["categories"][0]["key"] == "food"
    assert stats["categories"][0]["pct"] == 67
    assert stats["biggest"]["description"] == "Cena"
    assert stats["people"][0]["name"] == "Marco"
    assert len(stats["months"]) == 6


def test_build_stats_senza_spese() -> None:
    stats = build_stats([], {}, now=__import__("datetime").datetime(2026, 11, 19))
    assert stats["total_minor"] == 0
    assert stats["count"] == 0
    assert stats["biggest"] is None
    assert all(m["amount_minor"] == 0 for m in stats["months"])


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def _setup(client: TestClient) -> int:
    client.post(
        "/register",
        data={"name": "Marco", "email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    r = client.post(
        "/groups/new",
        data={"name": "Weekend", "kind": "trip", "base_currency": "EUR"},
        follow_redirects=False,
    )
    return int(r.headers["location"].split("?")[0].rstrip("/").split("/")[-1])


def test_pagina_statistiche(client: TestClient) -> None:
    gid = _setup(client)
    empty = client.get(f"/groups/{gid}/stats")
    assert empty.status_code == 200
    assert "Ancora nessuna spesa" in empty.text

    client.post(
        f"/groups/{gid}/expenses",
        data={
            "description": "Cena", "amount": "100,00", "paid_by": "1",
            "split_method": "even", "members": ["1"], "category": "food",
        },
        follow_redirects=False,
    )
    client.post(
        f"/groups/{gid}/expenses",
        data={
            "description": "Taxi", "amount": "50,00", "paid_by": "1",
            "split_method": "even", "members": ["1"], "category": "transport",
        },
        follow_redirects=False,
    )
    r = client.get(f"/groups/{gid}/stats")
    assert r.status_code == 200
    assert "150,00 €" in r.text
    assert "Cena" in r.text
    assert "Per categoria" in r.text
    assert "Statistiche" in client.get(f"/groups/{gid}").text


def test_budget_mensile_facoltativo(client: TestClient) -> None:
    from datetime import datetime

    gid = _setup(client)
    client.post(
        f"/groups/{gid}/expenses",
        data={
            "description": "Cena", "amount": "100,00", "paid_by": "1",
            "split_method": "even", "members": ["1"], "category": "food",
        },
        follow_redirects=False,
    )
    month = datetime.now().strftime("%Y-%m")
    r = client.post(
        f"/groups/{gid}/budget",
        data={"month": month, "amount": "80,00"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    page = client.get(f"/groups/{gid}/stats").text
    assert "su 80,00" in page
    assert "Oltre il limite di 20,00" in page

    # 0 toglie il limite.
    client.post(
        f"/groups/{gid}/budget",
        data={"month": month, "amount": "0"},
        follow_redirects=False,
    )
    assert "Nessun limite impostato" in client.get(f"/groups/{gid}/stats").text
