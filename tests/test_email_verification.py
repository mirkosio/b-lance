"""Conferma email e recupero via link, con SMTP fittizio.

Le funzioni leggono l'ambiente a ogni chiamata: i test attivano la conferma
solo qui, così il resto della suite continua a registrare utenti senza email.
"""

from __future__ import annotations

import re

import pytest
from fastapi.testclient import TestClient

from app.database import Base, engine
from app.main import app


class FakeSMTP:
    messages: list[str] = []

    def __init__(self, host, port, timeout=10):
        pass

    def __enter__(self):
        return self

    def __exit__(self, *args):
        return False

    def starttls(self):
        pass

    def login(self, user, password):
        pass

    def send_message(self, msg):
        self.messages.append(msg.get_content())


@pytest.fixture()
def email_on(monkeypatch):
    monkeypatch.setenv("EMAIL_VERIFICATION_REQUIRED", "1")
    monkeypatch.setenv("SMTP_HOST", "smtp.example.test")
    monkeypatch.setenv("SMTP_FROM", "noreply@example.test")
    monkeypatch.setattr("app.email_flow.smtplib.SMTP", FakeSMTP)
    FakeSMTP.messages = []
    return FakeSMTP.messages


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app, base_url="https://b-lance.test") as c:
        yield c


def _token_from(messages: list[str], marker: str) -> str:
    body = "".join(messages)
    return re.search(rf"/{marker}\?token=([A-Za-z0-9_-]+)", body).group(1)


def test_conferma_email_blocca_login_fino_al_link(client: TestClient, email_on) -> None:
    r = client.post(
        "/register",
        data={
            "name": "Marco",
            "email": "marco@example.com",
            "password": "secret123",
        },
        follow_redirects=False,
    )
    assert r.status_code == 200
    assert "link di conferma" in r.text
    # Nessuna sessione prima della conferma.
    assert "bl_session" not in r.headers.get("set-cookie", "")

    denied = client.post(
        "/login",
        data={"email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    assert denied.status_code == 403
    assert "Conferma prima" in denied.text

    token = _token_from(email_on, "verify-email")
    page = client.get("/verify-email", params={"token": token})
    assert page.status_code == 200
    assert "Indirizzo confermato" in page.text

    ok = client.post(
        "/login",
        data={"email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    assert ok.status_code == 303

    # Il link monouso non vale una seconda volta.
    again = client.get("/verify-email", params={"token": token})
    assert "non è valido" in again.text


def test_recupero_con_link_e_password_e_sessioni_revocate(client: TestClient, email_on) -> None:
    client.post(
        "/register",
        data={
            "name": "Luca",
            "email": "luca@example.com",
            "password": "secret123",
        },
        follow_redirects=False,
    )
    token = _token_from(email_on, "verify-email")
    client.get("/verify-email", params={"token": token})

    assert client.get("/recover-email").status_code == 200
    sent = client.post("/recover-email", data={"email": "luca@example.com"})
    assert sent.status_code == 200
    assert "Se quell'email è registrata" in sent.text
    reset_token = _token_from(email_on, "reset-password")

    form = client.get("/reset-password", params={"token": reset_token})
    assert "Nuova password" in form.text
    saved = client.post(
        "/reset-password",
        data={"token": reset_token, "password": "nuova123"},
        follow_redirects=False,
    )
    assert saved.status_code == 303

    reused = client.post(
        "/reset-password",
        data={"token": reset_token, "password": "altra123"},
        follow_redirects=False,
    )
    assert reused.status_code == 400

    client.post("/logout", follow_redirects=False)
    login = client.post(
        "/login",
        data={"email": "luca@example.com", "password": "nuova123"},
        follow_redirects=False,
    )
    assert login.status_code == 303


def test_conferma_attiva_senza_smtp_non_crea_account(
    client: TestClient, monkeypatch
) -> None:
    monkeypatch.setenv("EMAIL_VERIFICATION_REQUIRED", "1")
    monkeypatch.delenv("SMTP_HOST", raising=False)
    r = client.post(
        "/register",
        data={
            "name": "Sara",
            "email": "sara@example.com",
            "password": "secret123",
        },
        follow_redirects=False,
    )
    assert r.status_code == 503
    assert "non è configurato" in r.text
    denied = client.post(
        "/login",
        data={"email": "sara@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    assert denied.status_code == 400  # l'account non è stato creato
