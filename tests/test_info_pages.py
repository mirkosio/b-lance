"""Le pagine informative devono essere route vere, non ancore tutte su /about."""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.database import Base, engine
from app.main import app

INFO_PAGES = [
    ("/come-funziona", "Come funziona"),
    ("/android", "App Android"),
    ("/faq", "Domande frequenti"),
    ("/privacy", "Privacy"),
]


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


@pytest.mark.parametrize("path,title", INFO_PAGES)
def test_info_pages_are_public_and_have_metadata(client: TestClient, path: str, title: str) -> None:
    r = client.get(path)
    assert r.status_code == 200, r.text
    assert title in r.text
    assert '<meta name="description"' in r.text
    assert 'app.css?v=22' in r.text
    assert 'info-hero' in r.text


def test_public_nav_uses_dedicated_pages(client: TestClient) -> None:
    r = client.get("/")
    assert r.status_code == 200
    for path in ("/come-funziona", "/faq", "/privacy", "/android", "/demo"):
        assert f'href="{path}"' in r.text
    # Le vecchie ancore tutte su /about non devono più essere la navigazione.
    assert 'href="/about#come-funziona"' not in r.text
    assert 'href="/about#faq"' not in r.text


def test_about_is_a_hub_with_legacy_anchors(client: TestClient) -> None:
    r = client.get("/about")
    assert r.status_code == 200
    for path in ("/come-funziona", "/faq", "/privacy", "/android"):
        assert f'href="{path}"' in r.text
    for anchor in ("come-funziona", "faq", "privacy", "app"):
        assert f'id="{anchor}"' in r.text


def test_sitemap_lists_info_pages(client: TestClient) -> None:
    r = client.get("/sitemap.xml")
    assert r.status_code == 200
    for path in ("/come-funziona", "/android", "/faq", "/privacy", "/demo"):
        assert f"{path}</loc>" in r.text


def test_faq_uses_accordion_and_facts(client: TestClient) -> None:
    r = client.get("/faq")
    assert r.status_code == 200
    assert 'class="faq-list info-faq"' in r.text
    assert 'class="info-facts"' in r.text
    assert "<details" in r.text


def test_android_page_explains_release_and_signature(client: TestClient) -> None:
    r = client.get("/android")
    assert r.status_code == 200
    assert "1.6.0" in r.text
    assert "firma" in r.text
    assert "https://github.com/mirkosio/b-lance/releases" in r.text


def test_android_release_link_remains_visible_when_logged_in(client: TestClient) -> None:
    r = client.post(
        "/register",
        data={"name": "Luca", "email": "luca@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    r = client.get("/android")
    assert r.status_code == 200
    assert "https://github.com/mirkosio/b-lance/releases" in r.text
    assert "Apri le release" in r.text


def test_authenticated_info_page_offers_in_app_cta(client: TestClient) -> None:
    r = client.post(
        "/register",
        data={"name": "Marco", "email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    r = client.get("/come-funziona")
    assert r.status_code == 200
    assert 'href="/groups/new"' in r.text
    assert "Crea un gruppo" in r.text


def test_demo_is_public_and_client_side(client: TestClient) -> None:
    r = client.get("/demo")
    assert r.status_code == 200
    assert "Prova senza registrarti" in r.text
    assert 'id="demo-form"' in r.text
    assert "Nessun dato viene inviato" in r.text
    assert "fetch(" not in r.text


def test_authenticated_demo_offers_group_cta(client: TestClient) -> None:
    r = client.post(
        "/register",
        data={"name": "Sara", "email": "sara@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    r = client.get("/demo")
    assert r.status_code == 200
    assert 'href="/groups/new"' in r.text
    assert "Torna ai tuoi gruppi" in r.text


def test_pwa_metadata_is_ios_ready(client: TestClient) -> None:
    r = client.get("/")
    assert r.status_code == 200
    assert "apple-touch-icon-180.png" in r.text
    assert 'apple-mobile-web-app-status-bar-style" content="default"' in r.text
    assert 'media="(prefers-color-scheme: dark)"' in r.text
    manifest = client.get("/static/manifest.webmanifest")
    assert manifest.status_code == 200
    assert manifest.json()["display"] == "standalone"


def test_faq_explains_install_without_store(client: TestClient) -> None:
    r = client.get("/faq")
    assert r.status_code == 200
    assert "Posso installare il sito sul telefono?" in r.text
    assert "Aggiungi alla schermata Home" in r.text


def test_transfer_offers_copy_without_bank_details(client: TestClient) -> None:
    """Chi paga deve poter copiare i dettagli, senza esporre IBAN o email."""
    import re

    r = client.post(
        "/register",
        data={"name": "Marco", "email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    r = client.post(
        "/groups/new",
        data={"name": "Weekend", "base_currency": "EUR"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    group_id = int(r.headers["location"].split("/groups/")[1].split("?")[0].rstrip("/"))

    code = re.search(r"/join/([A-Z0-9]+)", client.get(f"/groups/{group_id}").text).group(1)
    client.post("/logout")
    client.post(
        "/register",
        data={"name": "Sara", "email": "sara@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    client.get(f"/join/{code}")

    # Sara paga 30: Marco e Sara devono 15 a testa, quindi nasce un bonifico.
    r = client.post(
        f"/groups/{group_id}/expenses",
        data={
            "description": "Cena",
            "amount": "30",
            "paid_by": "2",
            "split_method": "even",
            "members": ["1", "2"],
        },
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text

    page = client.get(f"/groups/{group_id}").text
    assert "transfer-copy" in page
    assert "Dettagli del bonifico copiati" in page
    copy_text = page.split('data-copy="')[1].split('"')[0]
    assert "versa" in copy_text
    assert "IBAN" not in copy_text
    assert "@" not in copy_text
