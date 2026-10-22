"""Test dell'API JSON per l'app Android nativa.

Copre il flusso completo dell'app: registrazione -> gruppo -> unisciti ->
spesa (tutti i metodi di divisione) -> saldi -> pagamento parziale ->
annullamento, piu permessi, valute estere e casi limite.
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


def _register(client: TestClient, name: str, email: str, password: str = "secret123"):
    r = client.post(
        "/api/register", json={"name": name, "email": email, "password": password}
    )
    assert r.status_code == 200, r.text
    data = r.json()
    return data["token"], data["user"]


def _auth(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}


def _create_group(client: TestClient, token: str, name: str = "Vacanza", cur: str = "EUR"):
    r = client.post(
        "/api/groups",
        json={"name": name, "base_currency": cur},
        headers=_auth(token),
    )
    assert r.status_code == 200, r.text
    return r.json()


def _add_expense(client: TestClient, token: str, gid: int, **kwargs):
    body = {
        "description": "Cena",
        "amount": "30.00",
        "paid_by": None,
        "members": [],
        "split_method": "even",
    }
    body.update(kwargs)
    return client.post(f"/api/groups/{gid}/expenses", json=body, headers=_auth(token))


# ---------------------------------------------------------------- auth
def test_registra_e_me(client: TestClient):
    token, user = _register(client, "Marco", "marco@example.com")
    assert user["name"] == "Marco"
    assert user["email"] == "marco@example.com"

    r = client.get("/api/me", headers=_auth(token))
    assert r.status_code == 200
    assert r.json()["user"]["id"] == user["id"]

    # Senza token: 401, non redirect.
    r = client.get("/api/me")
    assert r.status_code == 401
    assert r.json()["detail"] == "Devi effettuare il login"


def test_login(client: TestClient):
    _register(client, "Marco", "marco@example.com")
    r = client.post(
        "/api/login", json={"email": "marco@example.com", "password": "secret123"}
    )
    assert r.status_code == 200
    token = r.json()["token"]
    assert client.get("/api/me", headers=_auth(token)).status_code == 200

    r = client.post("/api/login", json={"email": "marco@example.com", "password": "sbagliata"})
    assert r.status_code == 401


def test_registrazione_validazioni(client: TestClient):
    r = client.post("/api/register", json={"name": "A", "email": "a@x.it", "password": "abc"})
    assert r.status_code == 400
    r = client.post("/api/register", json={"name": "", "email": "a@x.it", "password": "abcdef"})
    assert r.status_code == 400
    _register(client, "A", "a@x.it")
    r = client.post("/api/register", json={"name": "B", "email": "a@x.it", "password": "abcdef"})
    assert r.status_code == 400


# ---------------------------------------------------------------- flusso completo
def test_flusso_gruppo_completo(client: TestClient):
    """Registro -> creo gruppo -> invito -> spesa -> pagamento -> annullamento."""
    t_a, u_a = _register(client, "Marco", "marco@example.com")
    t_b, u_b = _register(client, "Luca", "luca@example.com")

    group = _create_group(client, t_a)
    gid = group["id"]
    assert group["invite_code"]

    # Luca si unisce col codice.
    r = client.post("/api/groups/join", json={"code": group["invite_code"]}, headers=_auth(t_b))
    assert r.status_code == 200

    # Marco registra cena 30.00 divisa per due.
    r = _add_expense(client, t_a, gid, paid_by=u_a["id"], members=[u_a["id"], u_b["id"]])
    assert r.status_code == 200, r.text

    detail = client.get(f"/api/groups/{gid}", headers=_auth(t_a)).json()
    nets = {m["user_id"]: m["net_minor"] for m in detail["members"]}
    assert nets[u_a["id"]] == 1500
    assert nets[u_b["id"]] == -1500
    # Chi paga chi: Luca -> Marco 15.00
    assert detail["transfers"] == [
        {"payer_id": u_b["id"], "payee_id": u_a["id"], "amount_minor": 1500}
    ]

    # Pagamento parziale 7.00.
    r = client.post(
        f"/api/groups/{gid}/payments",
        json={"from_user": u_b["id"], "to_user": u_a["id"], "amount": "7.00"},
        headers=_auth(t_b),
    )
    assert r.status_code == 200, r.text
    payment_id = r.json()["id"]

    detail = client.get(f"/api/groups/{gid}", headers=_auth(t_a)).json()
    nets = {m["user_id"]: m["net_minor"] for m in detail["members"]}
    assert nets[u_a["id"]] == 800
    assert nets[u_b["id"]] == -800

    # Elimina il pagamento: torna indietro.
    r = client.delete(f"/api/groups/{gid}/payments/{payment_id}", headers=_auth(t_b))
    assert r.status_code == 200
    detail = client.get(f"/api/groups/{gid}", headers=_auth(t_a)).json()
    nets = {m["user_id"]: m["net_minor"] for m in detail["members"]}
    assert nets[u_a["id"]] == 1500

    # Annulla la spesa: tutti in pari, ma la spesa resta nello storico
    # con il marcatore "annullata" (non sparisce: e' un registro).
    expense_id = detail["expenses"][0]["id"]
    r = client.delete(f"/api/groups/{gid}/expenses/{expense_id}", headers=_auth(t_a))
    assert r.status_code == 200
    detail = client.get(f"/api/groups/{gid}", headers=_auth(t_a)).json()
    assert all(m["net_minor"] == 0 for m in detail["members"])
    assert len(detail["expenses"]) == 1
    assert detail["expenses"][0]["id"] == expense_id
    assert detail["expenses"][0]["voided_at"] is not None


def test_dashboard_gruppi(client: TestClient):
    t_a, u_a = _register(client, "Marco", "marco@example.com")
    _create_group(client, t_a, name="Casa")
    r = client.get("/api/groups", headers=_auth(t_a))
    assert r.status_code == 200
    data = r.json()
    assert len(data["groups"]) == 1
    assert data["groups"][0]["name"] == "Casa"
    assert data["groups"][0]["member_count"] == 1
    assert data["net_by_currency"] == {"EUR": 0}


# ---------------------------------------------------------------- divisioni
def test_spesa_percentuali(client: TestClient):
    t_a, u_a = _register(client, "Marco", "marco@example.com")
    t_b, u_b = _register(client, "Luca", "luca@example.com")
    group = _create_group(client, t_a)
    gid = group["id"]
    client.post("/api/groups/join", json={"code": group["invite_code"]}, headers=_auth(t_b))

    r = _add_expense(
        client, t_a, gid,
        amount="100.00", paid_by=u_a["id"], members=[u_a["id"], u_b["id"]],
        split_method="percent", values={str(u_a["id"]): "70", str(u_b["id"]): "30"},
    )
    assert r.status_code == 200, r.text
    shares = {s["user_id"]: s["amount_minor"] for s in r.json()["shares"]}
    assert shares[u_a["id"]] == 7000
    assert shares[u_b["id"]] == 3000

    # Percentuale scritta male: 400, non 500.
    r = _add_expense(
        client, t_a, gid, description="Rotta",
        amount="10.00", paid_by=u_a["id"], members=[u_a["id"], u_b["id"]],
        split_method="percent", values={str(u_a["id"]): "abc", str(u_b["id"]): "100"},
    )
    assert r.status_code == 400


def test_spesa_importo_esatto(client: TestClient):
    t_a, u_a = _register(client, "Marco", "marco@example.com")
    t_b, u_b = _register(client, "Luca", "luca@example.com")
    group = _create_group(client, t_a)
    gid = group["id"]
    client.post("/api/groups/join", json={"code": group["invite_code"]}, headers=_auth(t_b))

    r = _add_expense(
        client, t_a, gid, amount="30.00", paid_by=u_a["id"],
        members=[u_a["id"], u_b["id"]], split_method="exact",
        values={str(u_a["id"]): "20.00", str(u_b["id"]): "10.00"},
    )
    assert r.status_code == 200, r.text
    shares = {s["user_id"]: s["amount_minor"] for s in r.json()["shares"]}
    assert shares == {u_a["id"]: 2000, u_b["id"]: 1000}


def test_spesa_valuta_estera(client: TestClient):
    t_a, u_a = _register(client, "Marco", "marco@example.com")
    t_b, u_b = _register(client, "Luca", "luca@example.com")
    group = _create_group(client, t_a)
    gid = group["id"]
    client.post("/api/groups/join", json={"code": group["invite_code"]}, headers=_auth(t_b))

    # USD 100 con tasso manuale 0.9 -> 90.00 EUR nella valuta base.
    r = _add_expense(
        client, t_a, gid, description="Hotel", amount="100.00", currency="USD",
        fx_rate="0.9", paid_by=u_a["id"], members=[u_a["id"], u_b["id"]],
    )
    assert r.status_code == 200, r.text
    assert r.json()["base_amount_minor"] == 9000

    # Valuta senza tasso automatico e senza manuale: 400 con messaggio, non 500.
    r = _add_expense(
        client, t_a, gid, description="Lek", amount="1000", currency="ALL",
        paid_by=u_a["id"], members=[u_a["id"], u_b["id"]],
    )
    assert r.status_code == 400
    assert r.json()["detail"]


# ---------------------------------------------------------------- validazioni
def test_controlli_spesa(client: TestClient):
    t_a, u_a = _register(client, "Marco", "marco@example.com")
    _, u_c = _register(client, "Enzo", "enzo@example.com")
    group = _create_group(client, t_a)
    gid = group["id"]

    # Chi paga o partecipa deve essere membro del gruppo.
    r = _add_expense(client, t_a, gid, paid_by=u_c["id"], members=[u_a["id"]])
    assert r.status_code == 400
    r = _add_expense(client, t_a, gid, paid_by=u_a["id"], members=[u_c["id"]])
    assert r.status_code == 400
    # Importo zero o vuoto.
    r = _add_expense(client, t_a, gid, amount="0", paid_by=u_a["id"], members=[u_a["id"]])
    assert r.status_code == 400
    # Pagamento a se stesso.
    r = client.post(
        f"/api/groups/{gid}/payments",
        json={"from_user": u_a["id"], "to_user": u_a["id"], "amount": "5.00"},
        headers=_auth(t_a),
    )
    assert r.status_code == 400


def test_permessi_e_non_membro(client: TestClient):
    t_a, u_a = _register(client, "Marco", "marco@example.com")
    t_b, _ = _register(client, "Luca", "luca@example.com")
    group = _create_group(client, t_a)
    gid = group["id"]

    # Luca non e membro: niente dettaglio, niente spese.
    r = client.get(f"/api/groups/{gid}", headers=_auth(t_b))
    assert r.status_code == 403
    r = _add_expense(client, t_b, gid, paid_by=u_a["id"], members=[u_a["id"]])
    assert r.status_code == 403

    # Non loggato sul gruppo: 401.
    assert client.get(f"/api/groups/{gid}").status_code == 401


def test_edit_e_delete_gruppo(client: TestClient):
    t_a, u_a = _register(client, "Marco", "marco@example.com")
    t_b, _ = _register(client, "Luca", "luca@example.com")
    group = _create_group(client, t_a)
    gid = group["id"]

    # Rinomina (solo con permesso: Marco e owner).
    r = client.patch(
        f"/api/groups/{gid}", json={"name": "Vacanza Moldavia"}, headers=_auth(t_a)
    )
    assert r.status_code == 200
    assert r.json()["name"] == "Vacanza Moldavia"

    # Luca non e membro: niente edit, niente delete.
    r = client.patch(f"/api/groups/{gid}", json={"name": "X"}, headers=_auth(t_b))
    assert r.status_code == 403
    r = client.delete(f"/api/groups/{gid}", headers=_auth(t_b))
    assert r.status_code == 403

    # Con storico dentro non si cambia la valuta.
    client.post("/api/groups/join", json={"code": group["invite_code"]}, headers=_auth(t_b))
    _add_expense(client, t_a, gid, paid_by=u_a["id"], members=[u_a["id"]])
    r = client.patch(f"/api/groups/{gid}", json={"base_currency": "USD"}, headers=_auth(t_a))
    assert r.status_code == 400

    # Solo il creator elimina.
    r = client.delete(f"/api/groups/{gid}", headers=_auth(t_a))
    assert r.status_code == 200
    assert client.get(f"/api/groups/{gid}", headers=_auth(t_a)).status_code == 404


def test_invito_anteprima(client: TestClient):
    t_a, _ = _register(client, "Marco", "marco@example.com")
    group = _create_group(client, t_a, name="Cena Universita")
    code = group["invite_code"]

    r = client.get(f"/api/invites/{code}")
    assert r.status_code == 200
    assert r.json()["name"] == "Cena Universita"
    assert r.json()["member_count"] == 1

    r = client.get("/api/invites/XXXXXXX9")
    assert r.status_code == 404


def test_meta_valute(client: TestClient):
    r = client.get("/api/meta")
    assert r.status_code == 200
    data = r.json()
    codes = {c["code"] for c in data["currencies"]}
    assert {"EUR", "USD", "JPY"} <= codes
    # Valute senza tasso automatico: l'app deve chiederlo all'utente.
    assert "ALL" in data["no_rate_codes"]
    assert "EUR" not in data["no_rate_codes"]
