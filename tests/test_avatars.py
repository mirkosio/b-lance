"""Avatar: iniziale con colore, 16 disegni, foto caricata dall'utente."""

from __future__ import annotations

import base64

import pytest
from fastapi.testclient import TestClient

from app.avatars import clean_color, decode_photo, preset_svg
from app.database import Base, engine
from app.main import app


def test_colori_e_disegni() -> None:
    assert clean_color("#5f8d6e") == "#5F8D6E"
    with pytest.raises(ValueError):
        clean_color("red")
    for i in range(16):
        svg = preset_svg(i, "#123456")
        assert svg.startswith("<svg") and "#123456" in svg
    assert "circle" in preset_svg(0) or "<circle" in preset_svg(0)


def test_foto_jpeg_minima() -> None:
    raw = b"\xff\xd8\xff\xd9"
    url = "data:image/jpeg;base64," + base64.b64encode(raw).decode()
    assert decode_photo(url) == (raw, "image/jpeg")
    with pytest.raises(ValueError):
        decode_photo("data:image/gif;base64,AAAA")


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def _register(client: TestClient) -> None:
    client.post(
        "/register",
        data={"name": "Marco", "email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )


def test_scelta_iniziale_colore_e_disegno(client: TestClient) -> None:
    _register(client)
    page = client.get("/account").text
    assert "Foto profilo" in page
    assert page.count('data-kind="preset"') == 16
    assert 'id="avatar-color"' in page

    r = client.post(
        "/account/avatar",
        data={"kind": "initial", "background": "#123456", "preset": "0"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    assert "#123456" in client.get("/account").text

    r = client.post(
        "/account/avatar",
        data={"kind": "preset", "background": "#654321", "preset": "7"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    page = client.get("/account").text
    assert "<svg" in page
    assert "#654321" in page
    assert client.get("/avatar/1").status_code == 404


def test_foto_profilo_servita_dall_endpoint(client: TestClient) -> None:
    _register(client)
    raw = b"\xff\xd8\xff\xd9"
    url = "data:image/jpeg;base64," + base64.b64encode(raw).decode()
    r = client.post(
        "/account/avatar",
        data={"kind": "photo", "background": "#5F8D6E", "photo": url},
        follow_redirects=False,
    )
    assert r.status_code == 303
    img = client.get("/avatar/1")
    assert img.status_code == 200
    assert img.headers["content-type"].startswith("image/jpeg")
    assert img.content == raw
