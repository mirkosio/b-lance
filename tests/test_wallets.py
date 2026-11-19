"""Wallet forniti dall'utente: nessun pagamento gestito da b-lance."""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.core.wallets import clean_wallet
from app.database import Base, engine
from app.main import app


def test_validazione_handles() -> None:
    assert clean_wallet("paypal", "  @mario  ") == "@mario"
    assert clean_wallet("iban", "it60 x054 2811 1010 0000 0123 456") == (
        "IT60X0542811101000000123456"
    )
    assert clean_wallet("revolut", "") == ""
    with pytest.raises(ValueError):
        clean_wallet("paypal", "x" * 200)
    with pytest.raises(ValueError):
        clean_wallet("sconosciuto", "abc")


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def test_salvataggio_web_e_pulsante_nel_gruppo(client: TestClient) -> None:
    import re

    client.post(
        "/register",
        data={"name": "Marco", "email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    r = client.post(
        "/account/wallets",
        data={"provider": "paypal", "handle": "@marco"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    account = client.get("/account").text
    assert 'value="@marco"' in account
    assert "Wallet per farsi pagare" in account

    gid = int(
        client.post(
            "/groups/new",
            data={"name": "Weekend", "kind": "trip", "base_currency": "EUR"},
            follow_redirects=False,
        ).headers["location"].split("?")[0].rstrip("/").split("/")[-1]
    )
    page = client.get(f"/groups/{gid}").text
    code = re.search(r"/join/([A-Z0-9]+)", page).group(1)
    client.post("/logout", follow_redirects=False)
    client.post(
        "/register",
        data={"name": "Luca", "email": "luca@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    client.get(f"/join/{code}")
    client.post(
        f"/groups/{gid}/expenses",
        data={
            "description": "Cena", "amount": "30", "paid_by": "1",
            "split_method": "even", "members": ["1", "2"],
        },
        follow_redirects=False,
    )
    page = client.get(f"/groups/{gid}").text
    assert "Copia PayPal" in page
    assert 'data-copy="@marco"' in page


def test_api_wallets(client: TestClient) -> None:
    reg = client.post(
        "/api/register",
        json={"name": "Sara", "email": "sara@example.com", "password": "secret123"},
    ).json()
    auth = {"Authorization": f"Bearer {reg['token']}"}
    assert client.get("/api/wallets", headers=auth).json()["wallets"] == {}
    r = client.post(
        "/api/wallets",
        json={"provider": "satispay", "handle": "+391234567890"},
        headers=auth,
    )
    assert r.status_code == 200
    assert r.json()["wallets"] == {"satispay": "+391234567890"}
    bad = client.post(
        "/api/wallets", json={"provider": "paypal", "handle": "x" * 200}, headers=auth
    )
    assert bad.status_code == 400
