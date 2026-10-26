"""Riepilogo pubblico read-only: link, PDF, revoca e privacy."""

from __future__ import annotations

import re

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


def _register(client: TestClient, name: str, email: str) -> None:
    r = client.post(
        "/register",
        data={"name": name, "email": email, "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text


def _group_with_two_members(client: TestClient) -> int:
    _register(client, "Marco", "marco@example.com")
    r = client.post(
        "/groups/new",
        data={"name": "Weekend", "kind": "trip", "base_currency": "EUR"},
        follow_redirects=False,
    )
    group_id = int(r.headers["location"].split("?")[0].rstrip("/").split("/")[-1])
    page = client.get(f"/groups/{group_id}").text
    code = re.search(r"/join/([A-Z0-9]+)", page).group(1)
    client.post("/logout")
    _register(client, "Luca", "luca@example.com")
    client.get(f"/join/{code}")
    client.post(
        f"/groups/{group_id}/expenses",
        data={
            "description": "Cena segreta",
            "amount": "30",
            "paid_by": "1",
            "split_method": "even",
            "members": ["1", "2"],
        },
        follow_redirects=False,
    )
    return group_id


def test_share_link_is_public_and_revocable(client: TestClient) -> None:
    group_id = _group_with_two_members(client)
    r = client.post(f"/api/groups/{group_id}/share")
    assert r.status_code == 200, r.text
    token = r.json()["token"]
    assert token
    assert r.json()["path"] == f"/s/{token}"

    page = client.get(f"/s/{token}")
    assert page.status_code == 200
    assert "Weekend" in page.text
    assert "Chi paga a chi" in page.text
    # Privacy: il riepilogo pubblico non mostra le descrizioni delle spese.
    assert "Cena segreta" not in page.text
    assert "marco@example.com" not in page.text

    pdf = client.get(f"/s/{token}/pdf")
    assert pdf.status_code == 200
    assert pdf.headers["content-type"].startswith("application/pdf")
    assert pdf.content.startswith(b"%PDF")

    assert client.delete(f"/api/groups/{group_id}/share").status_code == 200
    assert client.get(f"/s/{token}").status_code == 404


def test_share_requires_login(client: TestClient) -> None:
    r = client.post("/api/groups/1/share")
    assert r.status_code == 401


def test_share_card_on_group_page(client: TestClient) -> None:
    group_id = _group_with_two_members(client)
    page = client.get(f"/groups/{group_id}").text
    assert "Riepilogo condivisibile" in page
    assert "Crea link condivisibile" in page

    client.post(f"/groups/{group_id}/share", follow_redirects=False)
    page = client.get(f"/groups/{group_id}").text
    assert "Apri riepilogo" in page
    assert "/s/" in page
