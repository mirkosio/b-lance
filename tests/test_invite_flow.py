"""Flusso d'invito multi-utente: il link deve portare DAVVERO dentro il gruppo.

Caso critico che senza un secondo umano non scopri:
un nuovo arrivato apre il link NON loggato -> finisce su /login -> si registra
-> deve entrare nel gruppo, non atterrare sulla dashboard a mani vuote.

Copre anche la difesa dall'open redirect (niente https:// esterno in next).
"""

from __future__ import annotations

import re

import pytest
from fastapi.testclient import TestClient

from app.database import Base, engine
from app.main import app


@pytest.fixture()
def client():
    """Client di test con database pulito per ogni test."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def _register(client: TestClient, name: str, email: str, next_url: str = ""):
    return client.post(
        "/register",
        data={
            "name": name,
            "email": email,
            "password": "secret123",
            "next": next_url,
        },
        follow_redirects=False,
    )


def _group_with_code(client: TestClient) -> tuple[int, str]:
    """Marco crea un gruppo e ritorna (id, codice invito)."""
    r = _register(client, "Marco", "marco@example.com")
    assert r.status_code == 303, r.text
    r = client.post(
        "/groups/new",
        data={"name": "Viaggio", "kind": "trip", "base_currency": "EUR"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    group_id = int(r.headers["location"].rstrip("/").split("/")[-1])
    page = client.get(f"/groups/{group_id}").text
    code = re.search(r"/join/([A-Z0-9]+)", page).group(1)
    return group_id, code


def test_protected_page_keeps_destination(client: TestClient) -> None:
    """Chi non è loggato torna DOVE ERA dopo il login, non sempre a casa."""
    r = client.get("/groups/new", follow_redirects=False)
    assert r.status_code == 303
    assert r.headers["location"] == "/login?next=/groups/new"


def test_anonymous_invite_lands_on_login_with_next(client: TestClient) -> None:
    group_id, code = _group_with_code(client)
    client.post("/logout", follow_redirects=False)

    r = client.get(f"/join/{code}", follow_redirects=False)
    assert r.status_code == 303
    assert r.headers["location"] == f"/login?next=/join/{code}"

    # Il form di login conserva la destinazione (campo nascosto)...
    login_page = client.get(f"/login?next=/join/{code}").text
    assert f'value="/join/{code}"' in login_page
    # ...e anche il passaggio "non hai un account? Registrati".
    assert re.search(rf"/register\?next=[^\"']*{code}", login_page)


def test_new_user_registers_from_link_and_joins(client: TestClient) -> None:
    """Il flusso completo dell'invito: link -> login -> registra -> gruppo."""
    group_id, code = _group_with_code(client)
    client.post("/logout", follow_redirects=False)

    # Apre il link senza account -> al login con la destinazione.
    assert (
        client.get(f"/join/{code}", follow_redirects=False).headers["location"]
        == f"/login?next=/join/{code}"
    )

    # Si registra: deve tornare AL LINK, non alla home.
    r = _register(client, "Anna", "anna@example.com", next_url=f"/join/{code}")
    assert r.status_code == 303, r.text
    assert r.headers["location"] == f"/join/{code}"

    # Dal link entra nel gruppo.
    r = client.get(f"/join/{code}", follow_redirects=False)
    assert r.status_code == 303
    assert r.headers["location"] == f"/groups/{group_id}"

    # Gruppo a 2 membri e visibile in dashboard.
    page = client.get(f"/groups/{group_id}").text
    assert "Marco" in page and "Anna" in page
    assert f"/groups/{group_id}" in client.get("/").text


def test_existing_user_login_returns_to_group(client: TestClient) -> None:
    """Chi ha già l'account e apre il link finisce nel gruppo al primo colpo."""
    group_id, code = _group_with_code(client)
    client.post("/logout", follow_redirects=False)

    r = client.post(
        "/login",
        data={
            "email": "marco@example.com",
            "password": "secret123",
            "next": f"/join/{code}",
        },
        follow_redirects=False,
    )
    assert r.status_code == 303
    assert r.headers["location"] == f"/join/{code}"
    # Esegue il join e finisce sul gruppo.
    r = client.get(f"/join/{code}", follow_redirects=False)
    assert r.headers["location"] == f"/groups/{group_id}"


def test_login_blocks_external_next(client: TestClient) -> None:
    """Niente open redirect: next esterno -> home."""
    _register(client, "Marco", "marco@example.com")
    client.post("/logout", follow_redirects=False)

    for bad in ("https://evil.example", "//evil.example", "javascript:alert(1)"):
        r = client.post(
            "/login",
            data={
                "email": "marco@example.com",
                "password": "secret123",
                "next": bad,
            },
            follow_redirects=False,
        )
        assert r.status_code == 303, bad
        assert r.headers["location"] == "/", f"next non bloccato: {bad}"

    # Un percorso interno invece è legit.
    r = client.post(
        "/login",
        data={"email": "marco@example.com", "password": "secret123", "next": "/groups/7"},
        follow_redirects=False,
    )
    assert r.headers["location"] == "/groups/7"
