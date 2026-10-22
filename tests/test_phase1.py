"""Test della Fase 1 "solida": sessioni, throttle, membri, storico annullate."""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient
from itsdangerous import URLSafeSerializer

from app import throttle
from app.auth import SECRET_KEY
from app.database import Base, engine
from app.main import app


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def _register(client: TestClient, name: str, email: str, password: str = "secret123"):
    r = client.post(
        "/api/register", json={"name": name, "email": email, "password": password}
    )
    assert r.status_code == 200, r.text
    data = r.json()
    return data["token"], data["user"]


def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def _create_group(client: TestClient, token: str) -> dict:
    r = client.post(
        "/api/groups",
        json={"name": "Casa", "base_currency": "EUR"},
        headers=_auth(token),
    )
    assert r.status_code == 200, r.text
    return r.json()


# ---------------------------------------------------------------- sessioni
def test_token_vecchio_formato_non_vale(client: TestClient):
    """I token senza timestamp (formato precedente) vengono rifiutati."""
    _, user = _register(client, "A", "a@x.it")
    old = URLSafeSerializer(SECRET_KEY, salt="b-lance-session").dumps({"uid": user["id"]})
    r = client.get("/api/me", headers=_auth(old))
    assert r.status_code == 401


def test_logout_all_revoca_gli_altri_dispositivi(client: TestClient):
    token1, user = _register(client, "A", "a@x.it")
    # Secondo dispositivo: nuovo login.
    r = client.post("/api/login", json={"email": "a@x.it", "password": "secret123"})
    token2 = r.json()["token"]

    r = client.post("/api/logout-all", headers=_auth(token1))
    assert r.status_code == 200, r.text
    token3 = r.json()["token"]

    # Il dispositivo 1 resta collegato col token nuovo.
    assert client.get("/api/me", headers=_auth(token3)).status_code == 200
    # Il dispositivo 2 e' fuori, e il vecchio token del dispositivo 1 pure.
    assert client.get("/api/me", headers=_auth(token2)).status_code == 401
    assert client.get("/api/me", headers=_auth(token1)).status_code == 401


# ---------------------------------------------------------------- throttle
def test_limite_tentativi_login(client: TestClient, monkeypatch):
    monkeypatch.setattr(throttle, "ENABLED", True)
    monkeypatch.setattr(throttle, "LOGIN_MAX_EMAIL", 2)
    _register(client, "A", "a@x.it")

    for _ in range(2):
        r = client.post(
            "/api/login", json={"email": "a@x.it", "password": "sbagliata"}
        )
        assert r.status_code == 401

    # Anche la password giusta e' bloccata finche' non passa la finestra.
    r = client.post("/api/login", json={"email": "a@x.it", "password": "secret123"})
    assert r.status_code == 429
    assert "Troppi tentativi" in r.json()["detail"]

    # Un'altra email non e' toccata.
    _register(client, "B", "b@x.it")
    r = client.post("/api/login", json={"email": "b@x.it", "password": "secret123"})
    assert r.status_code == 200


def test_limite_registrazioni_per_ip(client: TestClient, monkeypatch):
    monkeypatch.setattr(throttle, "ENABLED", True)
    monkeypatch.setattr(throttle, "REGISTER_MAX_IP", 2)
    _register(client, "A", "a@x.it")
    _register(client, "B", "b@x.it")
    r = client.post(
        "/api/register",
        json={"name": "C", "email": "c@x.it", "password": "secret123"},
    )
    assert r.status_code == 429


# ---------------------------------------------------------------- membri
def test_owner_promuove_admin_e_lo_rimuove(client: TestClient):
    token_a, user_a = _register(client, "A", "a@x.it")
    token_b, user_b = _register(client, "B", "b@x.it")
    group = _create_group(client, token_a)
    gid = group["id"]
    client.post(
        "/api/groups/join", json={"code": group["invite_code"]}, headers=_auth(token_b)
    )

    r = client.patch(
        f"/api/groups/{gid}/members/{user_b['id']}",
        json={"role": "admin"},
        headers=_auth(token_a),
    )
    assert r.status_code == 200, r.text
    assert r.json()["member"]["role"] == "admin"

    detail = client.get(f"/api/groups/{gid}", headers=_auth(token_a)).json()
    member_b = next(m for m in detail["members"] if m["user_id"] == user_b["id"])
    assert member_b["role"] == "admin"
    assert set(member_b["perms"]) == {
        "expense_manage",
        "payment_manage",
        "group_edit",
        "members_manage",
    }

    # Non si modifica se stessi e il creatore non si tocca.
    r = client.patch(
        f"/api/groups/{gid}/members/{user_a['id']}",
        json={"role": "member"},
        headers=_auth(token_a),
    )
    assert r.status_code == 400
    r = client.patch(
        f"/api/groups/{gid}/members/{user_a['id']}",
        json={"role": "member"},
        headers=_auth(token_b),
    )
    assert r.status_code == 400

    # Rimozione a saldo zero: ok.
    r = client.delete(
        f"/api/groups/{gid}/members/{user_b['id']}", headers=_auth(token_a)
    )
    assert r.status_code == 200, r.text
    assert (
        client.get(f"/api/groups/{gid}", headers=_auth(token_b)).status_code == 403
    )


def test_non_si_rimuove_un_membro_con_saldo_aperto(client: TestClient):
    token_a, user_a = _register(client, "A", "a@x.it")
    token_b, user_b = _register(client, "B", "b@x.it")
    group = _create_group(client, token_a)
    gid = group["id"]
    client.post(
        "/api/groups/join", json={"code": group["invite_code"]}, headers=_auth(token_b)
    )
    client.post(
        f"/api/groups/{gid}/expenses",
        json={
            "description": "Cena",
            "amount": "10.00",
            "paid_by": user_a["id"],
            "members": [user_a["id"], user_b["id"]],
            "split_method": "even",
        },
        headers=_auth(token_a),
    )

    r = client.delete(
        f"/api/groups/{gid}/members/{user_b['id']}", headers=_auth(token_a)
    )
    assert r.status_code == 400
    assert "deve ancora" in r.json()["detail"]

    # Salda il debito e ora la rimozione passa.
    client.post(
        f"/api/groups/{gid}/payments",
        json={"from_user": user_b["id"], "to_user": user_a["id"], "amount": "5.00"},
        headers=_auth(token_b),
    )
    r = client.delete(
        f"/api/groups/{gid}/members/{user_b['id']}", headers=_auth(token_a)
    )
    assert r.status_code == 200, r.text


def test_membro_senza_permesso_non_gestisce_membri(client: TestClient):
    token_a, _ = _register(client, "A", "a@x.it")
    token_b, user_b = _register(client, "B", "b@x.it")
    token_c, user_c = _register(client, "C", "c@x.it")
    group = _create_group(client, token_a)
    gid = group["id"]
    client.post(
        "/api/groups/join", json={"code": group["invite_code"]}, headers=_auth(token_b)
    )
    client.post(
        "/api/groups/join", json={"code": group["invite_code"]}, headers=_auth(token_c)
    )

    r = client.patch(
        f"/api/groups/{gid}/members/{user_c['id']}",
        json={"role": "admin"},
        headers=_auth(token_b),
    )
    assert r.status_code == 403
