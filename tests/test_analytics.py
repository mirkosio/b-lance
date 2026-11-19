"""Statistiche d'uso: solo con consenso, solo contatori anonimi."""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.database import Base, SessionLocal, engine
from app.main import app
from app.models import UsageEvent


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def count_events() -> int:
    db = SessionLocal()
    try:
        return db.query(UsageEvent).count()
    finally:
        db.close()


def test_senza_consenso_nulli_eventi_registrati(client: TestClient) -> None:
    r = client.post("/api/events", json={"event": "page_view"})
    assert r.status_code == 200
    assert r.json()["ok"] is False
    assert count_events() == 0


def test_con_consenso_si_registra_solo_il_contatore(client: TestClient) -> None:
    r = client.post(
        "/api/events",
        json={"event": "page_view"},
        cookies={"bl_analytics_consent": "yes"},
    )
    assert r.status_code == 200
    assert r.json()["ok"] is True
    assert count_events() == 1

    db = SessionLocal()
    try:
        row = db.query(UsageEvent).first()
        assert row.event == "page_view"
        assert row.day is not None
        # Nessun campo personale nella tabella.
        columns = {c.name for c in UsageEvent.__table__.columns}
        assert "ip" not in columns and "user_id" not in columns and "path" not in columns
    finally:
        db.close()

    bad = client.post(
        "/api/events",
        json={"event": "clicca_sconosciuto"},
        cookies={"bl_analytics_consent": "yes"},
    )
    assert bad.status_code == 400


def test_eventi_del_server_rispettano_il_consenso(client: TestClient) -> None:
    client.post(
        "/register",
        data={"name": "Marco", "email": "marco@example.com", "password": "secret123"},
        cookies={"bl_analytics_consent": "yes"},
        follow_redirects=False,
    )
    db = SessionLocal()
    try:
        events = [e.event for e in db.query(UsageEvent).all()]
    finally:
        db.close()
    assert "register" in events

    page = client.get("/andamento")
    assert page.status_code == 200
    assert "Statistiche d'uso" in page.text
    assert "non fissiamo obiettivi" in page.text
