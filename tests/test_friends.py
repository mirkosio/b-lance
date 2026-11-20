"""Amicizie via username/codice e invito degli amici nei gruppi."""

from __future__ import annotations

import re

from fastapi.testclient import TestClient

from app.database import Base, engine
from app.main import app


def _register(client: TestClient, name: str, email: str) -> None:
    client.post(
        "/register",
        data={"name": name, "email": email, "password": "secret123"},
        follow_redirects=False,
    )


def setup_module():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def test_amicizia_e_invito_nel_gruppo() -> None:
    with TestClient(app) as marco, TestClient(app) as luca:
        _register(marco, "Marco", "marco@example.com")
        _register(luca, "Luca", "luca@example.com")

        page = marco.get("/amici")
        assert page.status_code == 200
        code = re.search(r"<b class=\"num\">([A-Z0-9]+)</b>", page.text).group(1)
        assert len(code) == 10
        assert f"/amici?add={code}" in page.text

        # Luca trova Marco tramite codice e manda la richiesta.
        r = luca.post("/amici/request", data={"query": code}, follow_redirects=False)
        assert r.status_code == 303
        assert "Richiesta ricevuta" in marco.get("/amici").text

        # Marco accetta.
        marco.post("/amici/2/accept", follow_redirects=False)
        assert "Amico" in luca.get("/amici").text

        # Con un username, l'amico compare nell'invito del gruppo.
        luca.post(
            "/account",
            data={
                "name": "Luca", "color": "#5F8D6E", "handle": "luca_1",
            },
            follow_redirects=False,
        )
        marco.post(
            "/groups/new",
            data={"name": "Weekend", "kind": "trip", "base_currency": "EUR"},
            follow_redirects=False,
        )
        group_page = marco.get("/groups/1").text
        assert "Invita amico" in group_page
        assert "luca_1" in group_page

        # L'invito via handle resta disponibile anche senza amicizia.
        r = marco.post(
            "/groups/1/invite-handle",
            data={"handle": "luca"},
            follow_redirects=False,
        )
        assert r.status_code in (200, 303)


def test_ricerca_sconosciuta_non_crea_niente() -> None:
    with TestClient(app) as c:
        _register(c, "Sara", "sara@example.com")
        r = c.post(
            "/amici/request",
            data={"query": "NESSUNO123"},
            follow_redirects=False,
        )
        assert r.status_code == 404
        assert "Nessun utente" in r.text


def test_api_amicizie() -> None:
    with TestClient(app) as c:
        a = c.post(
            "/api/register",
            json={"name": "Anna", "email": "anna@example.com", "password": "secret123"},
        ).json()
        b = c.post(
            "/api/register",
            json={"name": "Beppe", "email": "beppe@example.com", "password": "secret123"},
        ).json()
        ah = {"Authorization": f"Bearer {a['token']}"}
        bh = {"Authorization": f"Bearer {b['token']}"}
        code = c.get("/api/friends", headers=ah).json()["code"]
        assert len(code) == 10
        c.patch("/api/me", json={"handle": "beppe_1"}, headers=bh)
        # Beppe trova Anna tramite il codice di lei.
        assert c.post(
            "/api/friends/request", json={"query": code}, headers=bh
        ).status_code == 200
        incoming = c.get("/api/friends", headers=ah).json()["friends"]
        assert incoming[0]["status"] == "pending" and incoming[0]["incoming"]
        c.post(f"/api/friends/{b['user']['id']}/accept", headers=ah)
        assert c.get("/api/friends", headers=bh).json()["friends"][0]["status"] == "accepted"
