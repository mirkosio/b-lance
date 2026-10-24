"""Un membro rimosso con saldo aperto non deve far esplodere il gruppo.

Bug reale: si toglieva il membro dal gruppo, le sue spese restavano, la
somma dei saldi non tornava più a zero e `settle_all` lanciava
RuntimeError -> 500 su dashboard e pagina gruppo (così è andato giù il
gruppo "Vacanza in Moldavia").

Regola: i soldi non spariscono quando uno lascia il gruppo.
"""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.database import Base, SessionLocal, engine
from app.main import app
from app.models import Group, GroupMember


@pytest.fixture()
def client() -> TestClient:
    """Client di test con database pulito per ogni test."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def _setup(client: TestClient) -> tuple[int, TestClient]:
    """Owner + amico nel gruppo MDL. Ritorna (group_id, sessione_amico)."""
    r = client.post(
        "/register",
        data={"name": "mirko", "email": "m@x.it", "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text

    other = TestClient(app)
    r = other.post(
        "/register",
        data={"name": "amico", "email": "a@x.it", "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text

    r = client.post(
        "/groups/new",
        data={"name": "Vacanza in Moldavia", "kind": "other", "base_currency": "MDL"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    group_id = int(r.headers["location"].split("?")[0].rstrip("/").split("/")[-1])

    db = SessionLocal()
    code = db.get(Group, group_id).invite_code
    db.close()
    assert other.get(f"/join/{code}", follow_redirects=False).status_code in (200, 303)
    return group_id, other


def _expense_paid_by_amico(client: TestClient, group_id: int) -> None:
    r = client.post(
        f"/groups/{group_id}/expenses",
        data={
            "description": "Cena",
            "amount": "1250",
            "paid_by": "2",
            "split_method": "even",
            "members": ["1", "2"],
            "currency": "MDL",
        },
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text


def _strip_member_from_group(group_id: int, user_id: int) -> None:
    """Stato storico: il membro è stato tolto ma le spese restano.

    Simula (una volta) i dati compromessi prodotti dal vecchio codice.
    """
    db = SessionLocal()
    db.query(GroupMember).filter(
        GroupMember.group_id == group_id, GroupMember.user_id == user_id
    ).delete()
    db.commit()
    db.close()


def test_dashboard_and_group_survive_orphan_balance(client: TestClient) -> None:
    """Il bug storico: ex-membro con saldo sospeso -> prima era 500, ora 200."""
    group_id, _other = _setup(client)
    _expense_paid_by_amico(client, group_id)
    _strip_member_from_group(group_id, 2)

    resp = client.get("/")
    assert resp.status_code == 200, resp.text[:400]

    resp = client.get(f"/groups/{group_id}")
    assert resp.status_code == 200, resp.text[:400]
    # Il soldo resta visibile: ex-membro marcato, saldo mostrato.
    assert "amico" in resp.text
    assert "non più membro" in resp.text


def test_orphan_balance_is_accounted_not_dropped(client: TestClient) -> None:
    """L'amico aveva pagato 1250 e ne doveva la metà: deve apparire in credito."""
    group_id, _other = _setup(client)
    _expense_paid_by_amico(client, group_id)
    _strip_member_from_group(group_id, 2)

    resp = client.get(f"/groups/{group_id}")
    assert resp.status_code == 200
    # 1250 pagati, 625 dovuti -> +625 MDL per l'ex-membro.
    assert "L625.00" in resp.text or "625" in resp.text


def test_cannot_remove_member_with_open_balance(client: TestClient) -> None:
    """Da ora in poi la rimozione con soldi in gioco è vietata (400 chiaro)."""
    group_id, _other = _setup(client)
    _expense_paid_by_amico(client, group_id)

    resp = client.post(
        f"/groups/{group_id}/members/2/remove", follow_redirects=False
    )
    assert resp.status_code == 400
    assert "sald" in resp.text.lower()


def test_removing_member_without_history_is_allowed(client: TestClient) -> None:
    """Nessuna spesa -> saldo 0 -> la rimozione resta normale."""
    group_id, _other = _setup(client)

    resp = client.post(
        f"/groups/{group_id}/members/2/remove", follow_redirects=False
    )
    assert resp.status_code == 303
