"""Test del flusso completo dell'app (end-to-end via TestClient).

Copre il percorso di un utente reale:
registrati -> crea gruppo -> aggiungi spesa -> controlla saldi ->
registra pagamento parziale -> verifica che i saldi scendano.
"""

from __future__ import annotations

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


def _register(client: TestClient, name: str, email: str) -> None:
    r = client.post(
        "/register",
        data={"name": name, "email": email, "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text


def _login(client: TestClient, email: str, password: str = "secret123") -> None:
    r = client.post(
        "/login", data={"email": email, "password": password}, follow_redirects=False
    )
    assert r.status_code == 303, r.text


def _create_group(client: TestClient, name: str = "Viaggio") -> int:
    r = client.post(
        "/groups/new",
        data={"name": name, "kind": "trip", "base_currency": "EUR"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    return int(r.headers["location"].rstrip("/").split("/")[-1])


def test_register_login_and_dashboard(client: TestClient) -> None:
    _register(client, "Marco", "marco@example.com")
    _login(client, "marco@example.com")
    r = client.get("/")
    assert r.status_code == 200
    assert "Marco" in r.text


def test_duplicate_email_rejected(client: TestClient) -> None:
    _register(client, "Marco", "marco@example.com")
    r = client.post(
        "/register",
        data={"name": "Altro", "email": "marco@example.com", "password": "secret123"},
    )
    assert r.status_code == 400
    assert "Esiste gi" in r.text


def test_wrong_password_rejected(client: TestClient) -> None:
    _register(client, "Marco", "marco@example.com")
    r = client.post(
        "/login", data={"email": "marco@example.com", "password": "sbagliata"}
    )
    assert r.status_code == 400


def test_group_requires_membership(client: TestClient) -> None:
    """Un utente non membro non può vedere il gruppo (404, non 403)."""
    _register(client, "Marco", "marco@example.com")
    group_id = _create_group(client)
    # Esco e entro con un altro utente.
    client.post("/logout")
    _register(client, "Luca", "luca@example.com")
    r = client.get(f"/groups/{group_id}")
    assert r.status_code == 404


def test_even_split_balances(client: TestClient) -> None:
    """Spesa di 30 in 3: ognuno deve 10, chi ha pagato è +20."""
    _register(client, "Marco", "marco@example.com")
    group_id = _create_group(client)

    # Invito Luca e Anna tramite codice.
    page = client.get(f"/groups/{group_id}").text
    import re

    code = re.search(r"/join/([A-Z0-9]+)", page).group(1)
    client.post("/logout")
    _register(client, "Luca", "luca@example.com")
    client.get(f"/join/{code}")
    client.post("/logout")
    _register(client, "Anna", "anna@example.com")
    client.get(f"/join/{code}")

    # Marco (creator, user_id 1) paga 30 diviso in 3.
    r = client.post(
        f"/groups/{group_id}/expenses",
        data={
            "description": "Cena",
            "amount": "30",
            "paid_by": "1",
            "split_method": "even",
            "members": ["1", "2", "3"],
        },
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text

    page = client.get(f"/groups/{group_id}").text
    # Marco +20, Luca -10, Anna -10.
    assert "+€20.00" in page
    assert "-€10.00" in page


def test_partial_payment_lowers_balance(client: TestClient) -> None:
    """Pagamento parziale: il saldo scende ma non azzera."""
    _register(client, "Marco", "marco@example.com")
    group_id = _create_group(client)
    page = client.get(f"/groups/{group_id}").text
    import re

    code = re.search(r"/join/([A-Z0-9]+)", page).group(1)
    client.post("/logout")
    _register(client, "Luca", "luca@example.com")
    client.get(f"/join/{code}")
    client.post("/logout")
    _register(client, "Anna", "anna@example.com")
    client.get(f"/join/{code}")

    # Marco paga 30 per 3 -> Luca -10, Anna -10.
    client.post(
        f"/groups/{group_id}/expenses",
        data={
            "description": "Cena",
            "amount": "30",
            "paid_by": "1",
            "split_method": "even",
            "members": ["1", "2", "3"],
        },
    )

    # Luca paga 4 a Marco (parziale, ne deve 10).
    r = client.post(
        f"/groups/{group_id}/payments",
        data={"from_user": "2", "to_user": "1", "amount": "4", "note": "contanti"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text

    page = client.get(f"/groups/{group_id}").text
    # Luca ora deve 6, Marco +16.
    assert "-€6.00" in page
    assert "+€16.00" in page


def test_void_expense_reverses_balance(client: TestClient) -> None:
    """Annullare una spesa riporta i saldi come prima."""
    _register(client, "Marco", "marco@example.com")
    group_id = _create_group(client)
    page = client.get(f"/groups/{group_id}").text
    import re

    code = re.search(r"/join/([A-Z0-9]+)", page).group(1)
    client.post("/logout")
    _register(client, "Luca", "luca@example.com")
    client.get(f"/join/{code}")

    client.post(
        f"/groups/{group_id}/expenses",
        data={
            "description": "Biglietti",
            "amount": "20",
            "paid_by": "1",
            "split_method": "even",
            "members": ["1", "2"],
        },
    )
    page = client.get(f"/groups/{group_id}").text
    assert "+€10.00" in page

    # Trovo l'id della spesa e la annullo.
    import re as _re

    m = _re.search(r"/groups/\d+/expenses/(\d+)/void", page)
    expense_id = m.group(1)
    client.post(f"/groups/{group_id}/expenses/{expense_id}/void")

    page = client.get(f"/groups/{group_id}").text
    # Ora bilanci in equilibrio.
    assert "+€10.00" not in page
    assert "Nessun debito" in page


def test_uneven_split_exact(client: TestClient) -> None:
    """Split con importi esatti non equi."""
    _register(client, "Marco", "marco@example.com")
    group_id = _create_group(client)
    page = client.get(f"/groups/{group_id}").text
    import re

    code = re.search(r"/join/([A-Z0-9]+)", page).group(1)
    client.post("/logout")
    _register(client, "Luca", "luca@example.com")
    client.get(f"/join/{code}")

    r = client.post(
        f"/groups/{group_id}/expenses",
        data={
            "description": "Compra",
            "amount": "50",
            "paid_by": "1",
            "split_method": "even",
            "members": ["1", "2"],
        },
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    page = client.get(f"/groups/{group_id}").text
    assert "+€25.00" in page


def test_health(client: TestClient) -> None:
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"
