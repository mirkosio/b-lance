"""QR dei link interni: inviti al gruppo e riepilogo read-only."""

from __future__ import annotations

import re

from fastapi.testclient import TestClient

from app.database import Base, engine
from app.main import app


def setup_module():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def _setup(client: TestClient) -> int:
    client.post(
        "/register",
        data={"name": "Marco", "email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    r = client.post(
        "/groups/new",
        data={"name": "Weekend", "kind": "trip", "base_currency": "EUR"},
        follow_redirects=False,
    )
    return int(r.headers["location"].split("?")[0].rstrip("/").split("/")[-1])


def test_qr_solo_link_interni() -> None:
    with TestClient(app) as c:
        ok = c.get("/qr", params={"path": "/join/ABCD12"})
        assert ok.status_code == 200
        assert ok.headers["content-type"].startswith("image/png")
        assert ok.content.startswith(b"\x89PNG")

        bad = c.get("/qr", params={"path": "https://esempio.it/truffa"})
        assert bad.status_code == 400


def test_qr_nelle_pagine_del_gruppo() -> None:
    with TestClient(app) as c:
        gid = _setup(c)
        page = c.get(f"/groups/{gid}").text
        assert "/qr?path=/join/" in page
        assert 'alt="QR code per unirsi al gruppo"' in page

        c.post(f"/groups/{gid}/share", follow_redirects=False)
        page = c.get(f"/groups/{gid}").text
        token = re.search(r"/s/([A-Za-z0-9_-]+)", page).group(1)
        assert f"/qr?path=/s/{token}" in page
