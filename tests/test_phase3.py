"""Test Fase 3: account, handle, categorie, modifica, ricerca, ricorrenti, export."""

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


def _register(client, name, email, password="secret123"):
    r = client.post(
        "/api/register", json={"name": name, "email": email, "password": password}
    )
    assert r.status_code == 200, r.text
    data = r.json()
    return data["token"], data["user"]


def _auth(token):
    return {"Authorization": f"Bearer {token}"}


def _group(client, token, name="Weekend"):
    r = client.post(
        "/api/groups", json={"name": name, "kind": "trip", "base_currency": "EUR"},
        headers=_auth(token),
    )
    assert r.status_code == 200, r.text
    return r.json()


def _expense(client, token, gid, **over):
    payload = {
        "description": "Pizza",
        "amount": "20.00",
        "paid_by": over.pop("paid_by"),
        "members": over.pop("members"),
        "split_method": "even",
        "currency": "EUR",
        "category": "food",
    }
    payload.update(over)
    return client.post(f"/api/groups/{gid}/expenses", json=payload, headers=_auth(token))


def test_profile_handle_invite_edit_and_delete(client):
    ta, a = _register(client, "Alice", "alice@example.com")
    tb, b = _register(client, "Bob", "bob@example.com")

    r = client.patch(
        "/api/me",
        json={"name": "Alice B", "color": "#5f8d6e", "handle": "@Alice_1"},
        headers=_auth(ta),
    )
    assert r.status_code == 200, r.text
    assert r.json()["user"]["handle"] == "alice_1"
    assert r.json()["user"]["color"] == "#5F8D6E"

    assert client.patch("/api/me", json={"handle": "a"}, headers=_auth(ta)).status_code == 400

    r = client.get("/api/users/search?q=ali", headers=_auth(tb))
    assert r.status_code == 200
    assert r.json()["users"][0]["handle"] == "alice_1"
    assert "email" not in r.json()["users"][0]

    r = client.patch("/api/me", json={"handle": "bob_1"}, headers=_auth(tb))
    assert r.status_code == 200
    assert client.patch(
        "/api/me", json={"handle": "bob_1"}, headers=_auth(ta)
    ).status_code == 409

    g = _group(client, ta)
    r = client.post(
        f"/api/groups/{g['id']}/members", json={"handle": "bob_1"}, headers=_auth(ta)
    )
    assert r.status_code == 200, r.text

    r = _expense(client, ta, g["id"], paid_by=a["id"], members=[a["id"], b["id"]])
    assert r.status_code == 200, r.text
    eid = r.json()["id"]
    assert r.json()["category"] == "food"

    r = client.patch(
        f"/api/groups/{g['id']}/expenses/{eid}",
        json={
            "description": "Pizza e birra",
            "amount": "24.00",
            "paid_by": a["id"],
            "members": [a["id"], b["id"]],
            "split_method": "even",
            "currency": "EUR",
            "category": "fun",
        },
        headers=_auth(ta),
    )
    assert r.status_code == 200, r.text
    assert r.json()["amount_minor"] == 2400
    assert r.json()["category"] == "fun"
    assert {s["amount_minor"] for s in r.json()["shares"]} == {1200}

    # B non può modificare una spesa inserita da A senza permesso.
    r = client.patch(
        f"/api/groups/{g['id']}/expenses/{eid}",
        json={
            "description": "Hack",
            "amount": "1.00",
            "paid_by": a["id"],
            "members": [a["id"]],
            "split_method": "even",
            "currency": "EUR",
            "category": "other",
        },
        headers=_auth(tb),
    )
    assert r.status_code == 403

    # Cambio password: il vecchio token muore, il nuovo resta valido.
    assert client.post(
        "/api/me/password",
        json={"current": "sbagliata", "new": "nuova123"},
        headers=_auth(ta),
    ).status_code == 400
    old_token = ta
    r = client.post(
        "/api/me/password",
        json={"current": "secret123", "new": "nuova123"},
        headers=_auth(ta),
    )
    assert r.status_code == 200, r.text
    ta = r.json()["token"]
    assert client.get("/api/me", headers=_auth(old_token)).status_code == 401
    assert client.get("/api/me", headers=_auth(ta)).status_code == 200
    assert client.post(
        "/api/login", json={"email": "alice@example.com", "password": "nuova123"}
    ).status_code == 200

    # Eliminazione account: anonimizzazione, storico intatto, owner passa a B.
    r = client.delete("/api/me", headers=_auth(ta))
    assert r.status_code == 200, r.text
    assert client.get("/api/me", headers=_auth(ta)).status_code == 401
    assert client.post(
        "/api/login", json={"email": "alice@example.com", "password": "secret123"}
    ).status_code == 401

    detail = client.get(f"/api/groups/{g['id']}", headers=_auth(tb)).json()
    names = {m["name"] for m in detail["members"]}
    assert "Ex-membro" in names
    assert detail["is_owner"] is True
    assert detail["expenses"][0]["description"] == "Pizza e birra"
    assert detail["expenses"][0]["amount_minor"] == 2400


def test_activity_search_and_filters(client):
    ta, a = _register(client, "Alice", "alice@example.com")
    tb, b = _register(client, "Bob", "bob@example.com")
    g = _group(client, ta)
    _expense(client, ta, g["id"], paid_by=a["id"], members=[a["id"]])
    _expense(
        client, ta, g["id"], description="Treno", category="transport",
        paid_by=a["id"], members=[a["id"]],
    )
    r = client.get("/api/activity?q=treno", headers=_auth(ta))
    assert r.status_code == 200
    assert [i["title"] for i in r.json()["items"]] == ["Treno"]
    r = client.get("/api/activity?category=food", headers=_auth(ta))
    assert {i["title"] for i in r.json()["items"]} == {"Pizza"}
    r = client.get("/api/activity?kind=payment", headers=_auth(ta))
    assert r.json()["items"] == []


def test_recurring_creates_and_can_be_paused(client):
    ta, a = _register(client, "Alice", "alice@example.com")
    g = _group(client, ta)
    r = client.post(
        f"/api/groups/{g['id']}/recurring",
        json={
            "description": "Affitto",
            "amount": "300.00",
            "paid_by": a["id"],
            "members": [a["id"]],
            "split_method": "even",
            "currency": "EUR",
            "category": "bills",
            "frequency": "monthly",
            "interval": 1,
        },
        headers=_auth(ta),
    )
    assert r.status_code == 200, r.text
    rule = r.json()["rule"]
    assert rule["frequency"] == "monthly"
    assert rule["active"] is True

    detail = client.get(f"/api/groups/{g['id']}", headers=_auth(ta)).json()
    assert [e["description"] for e in detail["expenses"]] == ["Affitto"]
    assert detail["expenses"][0]["category"] == "bills"

    rules = client.get(f"/api/groups/{g['id']}/recurring", headers=_auth(ta)).json()["rules"]
    assert len(rules) == 1
    assert rules[0]["next_run"]

    r = client.patch(
        f"/api/groups/{g['id']}/recurring/{rule['id']}",
        json={"active": False},
        headers=_auth(ta),
    )
    assert r.status_code == 200
    assert r.json()["rule"]["active"] is False

    r = client.delete(
        f"/api/groups/{g['id']}/recurring/{rule['id']}", headers=_auth(ta)
    )
    assert r.status_code == 200


def test_exports_csv_and_pdf(client):
    ta, a = _register(client, "Alice", "alice@example.com")
    tb, b = _register(client, "Bob", "bob@example.com")
    c = client.patch("/api/me", json={"handle": "bob_t"}, headers=_auth(tb))
    assert c.status_code == 200
    g = _group(client, ta, name="Vacanza")
    r = client.post(
        f"/api/groups/{g['id']}/members",
        json={"handle": "bob_t"},
        headers=_auth(ta),
    )
    assert r.status_code == 200, r.text
    _expense(
        client, ta, g["id"], description="Cena", paid_by=a["id"],
        members=[a["id"], b["id"]], category="food",
    )
    r = client.get(f"/api/groups/{g['id']}/export.csv", headers=_auth(ta))
    assert r.status_code == 200
    assert "text/csv" in r.headers["content-type"]
    text = r.content.decode("utf-8-sig")
    assert "Vacanza" in text and "Cena" in text and "SALDI" in text
    # I saldi negativi non devono far esplodere l'export.
    assert "-10,00" in text

    r = client.post(
        "/login", data={"email": "alice@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    r = client.get(f"/groups/{g['id']}/export.pdf")
    assert r.status_code == 200
    assert r.headers["content-type"] == "application/pdf"
    assert r.content.startswith(b"%PDF")
    r = client.get(f"/groups/{g['id']}/export.csv")
    assert r.status_code == 200


def test_web_account_and_handle_invite(client):
    ta, a = _register(client, "Alice", "alice@example.com")
    tb, b = _register(client, "Bob", "bob@example.com")
    client.patch("/api/me", json={"handle": "alice_1"}, headers=_auth(ta))
    client.patch("/api/me", json={"handle": "bob_1"}, headers=_auth(tb))
    g = _group(client, ta, name="Casa")

    r = client.post(
        "/login",
        data={"email": "alice@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    assert client.get("/account").status_code == 200

    r = client.post(
        f"/groups/{g['id']}/invite-handle",
        data={"handle": "@bob_1"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    detail = client.get(f"/api/groups/{g['id']}", headers=_auth(tb))
    assert detail.status_code == 200
    assert any(m["user_id"] == b["id"] for m in detail.json()["members"])

    r = client.post(
        "/account",
        data={"name": "Alice Web", "color": "#5F8D6E", "handle": "alice_web"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    me = client.get("/api/me").json()["user"]
    assert me["name"] == "Alice Web"
    assert me["handle"] == "alice_web"

    r = client.post(
        "/account/password",
        data={"current": "secret123", "new": "nuova123"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    assert client.post(
        "/api/login", json={"email": "alice@example.com", "password": "nuova123"}
    ).status_code == 200

    r = client.post("/account/delete", follow_redirects=False)
    assert r.status_code == 303
    assert client.get("/api/me").status_code == 401
