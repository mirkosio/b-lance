"""Test dei permessi di gruppo: ruoli, concessioni, controlli sulle route.

Regole coperte:
- il creatore (owner) ha tutto e non si tocca mai
- "admin" ha tutti i permessi
- un membro ha solo i permessi che gli vengono dati
- non puoi dare a un altro un permesso che tu non hai
- annulli le tue spese; le altre solo con expense_manage
- elimini i pagamenti in cui sei coinvolto; gli altri solo con payment_manage
- eliminare il gruppo è solo per il creatore
"""

from __future__ import annotations

import re

import pytest
from fastapi.testclient import TestClient

from app.database import Base, engine
from app.main import app
from app.permissions import ALL_PERMS, clamped_perms, effective_perms, parse_perms


@pytest.fixture()
def client():
    """Client di test con database pulito per ogni test."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


# ------------------------------------------------------------------ unità
def test_owner_and_admin_have_everything() -> None:
    assert effective_perms("owner", "") == ALL_PERMS
    assert effective_perms("admin", "qualcosa") == ALL_PERMS


def test_member_has_only_granted_perms() -> None:
    assert effective_perms("member", "") == frozenset()
    assert effective_perms("member", "group_edit") == frozenset({"group_edit"})
    # chiavi inventate o residue vengono ignorate
    assert effective_perms("member", "group_edit,cucina") == frozenset({"group_edit"})


def test_cannot_grant_what_you_do_not_have() -> None:
    got = clamped_perms("member", "group_edit", ["group_edit", "members_manage"])
    assert got == "group_edit"
    # owner/admin possono dare tutto
    assert clamped_perms("owner", "", ["group_edit", "payment_manage"]) == (
        "group_edit,payment_manage"
    )


def test_parse_perms_drops_junk() -> None:
    assert parse_perms(["payment_manage", "xxx", "payment_manage"]) == "payment_manage"
    assert parse_perms([]) == ""


# ------------------------------------------------------------------ e2e
def _register(client: TestClient, name: str, email: str) -> None:
    r = client.post(
        "/register",
        data={"name": name, "email": email, "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text


def _login(client: TestClient, email: str) -> None:
    r = client.post(
        "/login", data={"email": email, "password": "secret123"}, follow_redirects=False
    )
    assert r.status_code == 303, r.text


def _logout(client: TestClient) -> None:
    client.post("/logout", follow_redirects=False)


def _as(client: TestClient, name: str, email: str) -> None:
    """Passa a quell'utente: registra se non esiste, altrimenti fa il login.

    Nota: /register imposta già il cookie di sessione.
    """
    _logout(client)
    r = client.post(
        "/register",
        data={"name": name, "email": email, "password": "secret123"},
        follow_redirects=False,
    )
    if r.status_code != 303:
        _login(client, email)


def _three_members(client: TestClient) -> int:
    """Marco (creatore, id 1), Luca (id 2), Anna (id 3). Ritorna l'id gruppo."""
    _as(client, "Marco", "marco@example.com")
    r = client.post(
        "/groups/new",
        data={"name": "Viaggio", "kind": "trip", "base_currency": "EUR"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    group_id = int(r.headers["location"].split("?")[0].rstrip("/").split("/")[-1])
    code = re.search(r"/join/([A-Z0-9]+)", client.get(f"/groups/{group_id}").text).group(1)

    _as(client, "Luca", "luca@example.com")
    client.get(f"/join/{code}")
    _as(client, "Anna", "anna@example.com")
    client.get(f"/join/{code}")
    _as(client, "Marco", "marco@example.com")
    return group_id


def _grant(client: TestClient, group_id: int, target_id: int, role: str, perms: list[str]):
    """Come Marco (owner) concede ruolo/permessi a un membro."""
    return client.post(
        f"/groups/{group_id}/members/{target_id}",
        data={"role": role, "perm": perms},
        follow_redirects=False,
    )


def test_member_cannot_open_group_edit(client: TestClient) -> None:
    group_id = _three_members(client)
    _as(client, "Luca", "luca@example.com")
    assert client.get(f"/groups/{group_id}/edit").status_code == 403
    # e il link "Modifica" non deve nemmeno comparire
    assert f'href="/groups/{group_id}/edit"' not in client.get(
        f"/groups/{group_id}"
    ).text


def test_owner_can_edit_group(client: TestClient) -> None:
    group_id = _three_members(client)
    r = client.post(
        f"/groups/{group_id}/edit",
        data={"name": "Weekend Rimini", "kind": "trip", "base_currency": "EUR"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    assert "Weekend Rimini" in client.get(f"/groups/{group_id}").text


def test_grant_permission_makes_member_able(client: TestClient) -> None:
    group_id = _three_members(client)
    assert _grant(client, group_id, 2, "member", ["group_edit"]).status_code == 303

    _as(client, "Luca", "luca@example.com")
    assert client.get(f"/groups/{group_id}/edit").status_code == 200
    assert f'href="/groups/{group_id}/edit"' in client.get(f"/groups/{group_id}").text


def test_member_cannot_grant_what_they_lack(client: TestClient) -> None:
    """A Anna do solo members_manage: non potrà passare group_edit ad altri."""
    group_id = _three_members(client)
    assert _grant(client, group_id, 3, "member", ["members_manage"]).status_code == 303

    _as(client, "Anna", "anna@example.com")
    r = _grant(client, group_id, 2, "member", ["group_edit"])
    assert r.status_code == 303  # il form passa, ma il permesso viene tagliato

    _as(client, "Luca", "luca@example.com")
    assert client.get(f"/groups/{group_id}/edit").status_code == 403


def test_only_owner_or_admin_can_promote_admin(client: TestClient) -> None:
    group_id = _three_members(client)
    _grant(client, group_id, 2, "member", ["members_manage"])

    _as(client, "Luca", "luca@example.com")
    r = client.post(
        f"/groups/{group_id}/members/3",
        data={"role": "admin", "perm": ["members_manage"]},
        follow_redirects=False,
    )
    assert r.status_code == 403


def test_owner_row_is_protected(client: TestClient) -> None:
    group_id = _three_members(client)
    _grant(client, group_id, 2, "admin", [])

    _as(client, "Luca", "luca@example.com")
    # Admin ma non può toccare il creatore...
    assert (
        client.post(
            f"/groups/{group_id}/members/1",
            data={"role": "member", "perm": []},
            follow_redirects=False,
        ).status_code
        == 400
    )
    # ...né modificare se stesso...
    assert (
        client.post(
            f"/groups/{group_id}/members/2",
            data={"role": "member", "perm": []},
            follow_redirects=False,
        ).status_code
        == 400
    )
    # ...né eliminare il creatore
    assert (
        client.post(f"/groups/{group_id}/members/1/remove", follow_redirects=False).status_code
        == 400
    )


def test_void_others_expense_requires_permission(client: TestClient) -> None:
    group_id = _three_members(client)
    client.post(
        f"/groups/{group_id}/expenses",
        data={
            "description": "Cena",
            "amount": "30",
            "paid_by": "1",
            "split_method": "even",
            "members": ["1", "2"],
        },
        follow_redirects=False,
    )
    page = client.get(f"/groups/{group_id}").text
    expense_id = re.search(rf"/groups/{group_id}/expenses/(\d+)/void", page).group(1)

    # Luca non ha permessi: 403
    _as(client, "Luca", "luca@example.com")
    assert (
        client.post(
            f"/groups/{group_id}/expenses/{expense_id}/void", follow_redirects=False
        ).status_code
        == 403
    )

    # Con expense_manage ci riesce
    _as(client, "Marco", "marco@example.com")
    _grant(client, group_id, 2, "member", ["expense_manage"])
    _as(client, "Luca", "luca@example.com")
    assert (
        client.post(
            f"/groups/{group_id}/expenses/{expense_id}/void", follow_redirects=False
        ).status_code
        == 303
    )


def test_void_own_expense_allowed_for_everyone(client: TestClient) -> None:
    group_id = _three_members(client)
    _as(client, "Luca", "luca@example.com")
    client.post(
        f"/groups/{group_id}/expenses",
        data={
            "description": "Taxi",
            "amount": "10",
            "paid_by": "2",
            "split_method": "even",
            "members": ["1", "2"],
        },
        follow_redirects=False,
    )
    page = client.get(f"/groups/{group_id}").text
    expense_id = re.search(rf"/groups/{group_id}/expenses/(\d+)/void", page).group(1)
    # Spesa sua: nessun permesso speciale necessario.
    assert (
        client.post(
            f"/groups/{group_id}/expenses/{expense_id}/void", follow_redirects=False
        ).status_code
        == 303
    )


def test_payment_delete_needs_involvement_or_permission(client: TestClient) -> None:
    group_id = _three_members(client)
    client.post(
        f"/groups/{group_id}/payments",
        data={"from_user": "1", "to_user": "2", "amount": "5"},
        follow_redirects=False,
    )
    page = client.get(f"/groups/{group_id}").text
    payment_id = re.search(rf"/groups/{group_id}/payments/(\d+)/delete", page).group(1)

    # Anna non è coinvolta e non ha permessi: 403
    _as(client, "Anna", "anna@example.com")
    assert (
        client.post(
            f"/groups/{group_id}/payments/{payment_id}/delete", follow_redirects=False
        ).status_code
        == 403
    )

    # Con payment_manage ci riesce
    _as(client, "Marco", "marco@example.com")
    _grant(client, group_id, 3, "member", ["payment_manage"])
    _as(client, "Anna", "anna@example.com")
    assert (
        client.post(
            f"/groups/{group_id}/payments/{payment_id}/delete", follow_redirects=False
        ).status_code
        == 303
    )


def test_payment_involvement_is_enough(client: TestClient) -> None:
    group_id = _three_members(client)
    client.post(
        f"/groups/{group_id}/payments",
        data={"from_user": "1", "to_user": "2", "amount": "5"},
        follow_redirects=False,
    )
    payment_id = re.search(
        rf"/groups/{group_id}/payments/(\d+)/delete",
        client.get(f"/groups/{group_id}").text,
    ).group(1)

    # Luca è coinvolto (è chi paga): può eliminarlo senza permessi extra.
    _as(client, "Luca", "luca@example.com")
    assert (
        client.post(
            f"/groups/{group_id}/payments/{payment_id}/delete", follow_redirects=False
        ).status_code
        == 303
    )


def test_plain_member_cannot_remove_others(client: TestClient) -> None:
    group_id = _three_members(client)
    _as(client, "Luca", "luca@example.com")
    assert (
        client.post(f"/groups/{group_id}/members/3/remove", follow_redirects=False).status_code
        == 403
    )


def test_owner_removes_member_and_they_lose_access(client: TestClient) -> None:
    group_id = _three_members(client)
    assert (
        client.post(f"/groups/{group_id}/members/3/remove", follow_redirects=False).status_code
        == 303
    )

    _as(client, "Anna", "anna@example.com")
    # Fuori dal gruppo: il gruppo torna 404 come per chi non è membro.
    assert client.get(f"/groups/{group_id}").status_code == 404


def test_currency_change_blocked_after_history(client: TestClient) -> None:
    group_id = _three_members(client)
    client.post(
        f"/groups/{group_id}/expenses",
        data={
            "description": "Cena",
            "amount": "30",
            "paid_by": "1",
            "split_method": "even",
            "members": ["1", "2"],
        },
        follow_redirects=False,
    )
    r = client.post(
        f"/groups/{group_id}/edit",
        data={"name": "Viaggio", "kind": "trip", "base_currency": "USD"},
        follow_redirects=False,
    )
    assert r.status_code == 400
    assert "già spese" in r.text
    # La valuta base del gruppo è sempre quella di prima (l'header lo mostra).
    assert '<span class="chip">EUR</span>' in client.get(f"/groups/{group_id}").text


def test_group_delete_is_owner_only(client: TestClient) -> None:
    group_id = _three_members(client)

    _as(client, "Luca", "luca@example.com")
    assert (
        client.post(f"/groups/{group_id}/delete", follow_redirects=False).status_code == 403
    )

    _as(client, "Marco", "marco@example.com")
    assert (
        client.post(f"/groups/{group_id}/delete", follow_redirects=False).status_code == 303
    )
    assert client.get(f"/groups/{group_id}").status_code == 404
    # Sparisce anche dalla dashboard.
    assert f"/groups/{group_id}" not in client.get("/").text


def test_member_management_ui_only_for_managers(client: TestClient) -> None:
    group_id = _three_members(client)

    owner_page = client.get(f"/groups/{group_id}").text
    assert f'href="/groups/{group_id}/edit"' in owner_page
    assert "Permessi</summary>" in owner_page

    _as(client, "Luca", "luca@example.com")
    member_page = client.get(f"/groups/{group_id}").text
    assert f'href="/groups/{group_id}/edit"' not in member_page
    assert "Permessi</summary>" not in member_page
    assert "gestisci i permessi" not in member_page
