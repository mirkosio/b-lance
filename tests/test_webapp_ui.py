"""Interfaccia web-app: filtri dashboard, pannelli, indice e calcolatore.

Sono test di presenza e di struttura: il comportamento JavaScript è
verificato a mano nel browser, qui ci assicuriamo che il markup e i ganci
non spariscano in un refactor.
"""

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


def _register(client: TestClient, name: str = "Marco", email: str = "marco@example.com") -> None:
    r = client.post(
        "/register",
        data={"name": name, "email": email, "password": "secret123"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text


def _create_group(client: TestClient, name: str = "Weekend") -> int:
    r = client.post(
        "/groups/new",
        data={"name": name, "kind": "trip", "base_currency": "EUR"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    return int(r.headers["location"].split("?")[0].rstrip("/").split("/")[-1])


def test_dashboard_has_filters_search_and_rail(client: TestClient) -> None:
    _register(client)
    _create_group(client)
    page = client.get("/").text
    assert 'data-group-filter="all"' in page
    assert 'data-group-filter="neg"' in page
    assert 'id="group-search"' in page
    assert 'data-net="zero"' in page
    assert 'class="dash-rail"' in page
    assert "Azioni rapide" in page


def test_group_add_expense_is_collapsible(client: TestClient) -> None:
    _register(client)
    group_id = _create_group(client)
    page = client.get(f"/groups/{group_id}").text
    assert 'id="add-expense"' in page
    assert '<details class="card collapse-card"' in page
    assert "data-open-add" in page
    assert 'id="expense-form"' in page


def test_info_page_has_toc_and_section_ids(client: TestClient) -> None:
    page = client.get("/faq").text
    assert 'class="info-toc"' in page
    assert 'href="#sezione-1"' in page
    assert 'id="sezione-1"' in page
    assert 'data-reveal' in page


def test_landing_has_quick_split_calculator(client: TestClient) -> None:
    page = client.get("/").text
    assert 'id="quick-split"' in page
    assert 'id="qs-total"' in page
    assert 'id="qs-people"' in page
    assert 'id="qs-result"' in page


def test_first_group_wizard_offers_example_expense(client: TestClient) -> None:
    _register(client)
    r = client.post(
        "/groups/new",
        data={"name": "Weekend", "kind": "trip", "base_currency": "EUR"},
        follow_redirects=False,
    )
    assert r.status_code == 303
    assert "welcome=1" in r.headers["location"]

    page = client.get(r.headers["location"]).text
    assert "data-fill-example" in page
    assert "Aggiungi spesa di esempio" in page
    assert "30,00" in page


def test_group_new_suggests_names_and_explains_currency(client: TestClient) -> None:
    _register(client)
    page = client.get("/groups/new").text
    assert 'data-name-pick="Weekend al mare"' in page
    assert 'data-name-pick="Casa"' in page
    assert "Per l'Italia va" in page


def test_cashier_link_is_a_shell_and_stays_out_of_the_sitemap(
    client: TestClient,
) -> None:
    page = client.get("/cashier-link").text
    assert 'id="cl-error"' in page
    assert 'id="cl-content"' in page
    assert 'id="cl-balances"' in page
    assert 'id="cl-transfers-list"' in page
    # Il server non conosce il gruppo: nessun dato del Cassiere nel markup.
    assert "Weekend" not in page
    assert "Marco" not in page

    # Il guscio vuoto non deve finire tra i risultati di ricerca.
    sitemap = client.get("/sitemap.xml").text
    assert "/cashier-link" not in sitemap


def test_motion_assets_are_served_and_respect_reduced_motion(
    client: TestClient,
) -> None:
    page = client.get("/").text
    assert 'href="/static/motion.css?v=1"' in page
    assert 'src="/static/motion.js?v=1"' in page
    # Il movimento parte solo se l'utente non l'ha disattivato.
    assert "prefers-reduced-motion: reduce" in page

    css = client.get("/static/motion.css").text
    assert "--dur-2: 220ms" in css
    assert "prefers-reduced-motion: reduce" in css
    assert "animation: none !important" in css

    js = client.get("/static/motion.js").text
    assert "prefers-reduced-motion" in js
    assert "data-count-final" in js


def test_balance_numbers_carry_the_count_hook(client: TestClient) -> None:
    _register(client)
    group_id = _create_group(client)
    page = client.get(f"/groups/{group_id}").text
    assert 'data-count=' in page
    assert 'data-count-final=' in page
    # Il totale del gruppo è sempre un numero animato.
    assert 'class="num count-up"' in page


def test_void_expense_offers_immediate_undo(client: TestClient) -> None:
    _register(client)
    group_id = _create_group(client)
    page = client.get(f"/groups/{group_id}").text
    uid = int(re.search(r'<option value="(\d+)" selected>', page).group(1))

    r = client.post(
        f"/groups/{group_id}/expenses",
        data={
            "description": "Cena",
            "amount": "30,00",
            "paid_by": uid,
            "split_method": "even",
            "members": [uid],
        },
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    expense_id = re.search(
        r"/expenses/(\d+)/void", client.get(f"/groups/{group_id}").text
    ).group(1)

    r = client.post(
        f"/groups/{group_id}/expenses/{expense_id}/void", follow_redirects=False
    )
    assert r.status_code == 303
    assert f"undo_expense={expense_id}" in r.headers["location"]

    page = client.get(r.headers["location"]).text
    assert "Spesa annullata" in page
    assert f"/expenses/{expense_id}/restore" in page
    assert "· annullata" in page

    r = client.post(
        f"/groups/{group_id}/expenses/{expense_id}/restore", follow_redirects=False
    )
    assert r.status_code == 303
    page = client.get(f"/groups/{group_id}").text
    assert "· annullata" not in page
    assert "Spesa annullata" not in page


def _recovery_codes(page: str) -> list[str]:
    block = re.search(
        r'<pre class="recovery-codes"[^>]*>(.*?)</pre>', page, re.S
    )
    assert block, "blocco dei codici assente"
    return re.findall(r"[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}", block.group(1))


def test_recovery_code_resets_password_without_email(client: TestClient) -> None:
    _register(client)
    page = client.post("/account/recovery").text
    codes = _recovery_codes(page)
    assert len(codes) == 8
    assert "Copiali ora" in page
    assert "Codici attivi: <b>8</b>" in page

    client.post("/logout", follow_redirects=False)
    r = client.post(
        "/recover",
        data={
            "email": "marco@example.com",
            "code": codes[0].lower().replace("-", " "),
            "password": "nuova123",
        },
        follow_redirects=False,
    )
    assert r.status_code == 303
    assert r.headers["location"] == "/login?reset=1"

    old = client.post(
        "/login",
        data={"email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    assert old.status_code == 400
    new = client.post(
        "/login",
        data={"email": "marco@example.com", "password": "nuova123"},
        follow_redirects=False,
    )
    assert new.status_code == 303

    page = client.get("/account").text
    assert "Codici attivi: <b>7</b>" in page


def test_recovery_code_is_single_use_and_wrong_code_fails(client: TestClient) -> None:
    _register(client)
    codes = _recovery_codes(client.post("/account/recovery").text)
    client.post("/logout", follow_redirects=False)

    wrong = client.post(
        "/recover",
        data={
            "email": "marco@example.com",
            "code": "AAAA-AAAA-AAAA",
            "password": "nuova123",
        },
    )
    assert wrong.status_code == 400
    assert "Email o codice di recupero non validi." in wrong.text

    ok = client.post(
        "/recover",
        data={
            "email": "marco@example.com",
            "code": codes[0],
            "password": "nuova123",
        },
        follow_redirects=False,
    )
    assert ok.status_code == 303

    client.post("/logout", follow_redirects=False)
    reused = client.post(
        "/recover",
        data={
            "email": "marco@example.com",
            "code": codes[0],
            "password": "altra123",
        },
    )
    assert reused.status_code == 400
    assert "Email o codice di recupero non validi." in reused.text

    # Il codice vecchio non deve valere nemmeno dopo aver generato un nuovo set.
    assert client.post(
        "/login",
        data={"email": "marco@example.com", "password": "nuova123"},
        follow_redirects=False,
    ).status_code == 303
    fresh = _recovery_codes(client.post("/account/recovery").text)
    assert len(fresh) == 8
    client.post("/logout", follow_redirects=False)
    stale = client.post(
        "/recover",
        data={
            "email": "marco@example.com",
            "code": codes[1],
            "password": "terza123",
        },
    )
    assert stale.status_code == 400


def test_void_payment_offers_immediate_undo(client: TestClient) -> None:
    _register(client, "Marco", "marco@example.com")
    group_id = _create_group(client)
    code = re.search(
        r"/join/([A-Z0-9]+)", client.get(f"/groups/{group_id}").text
    ).group(1)
    client.post("/logout", follow_redirects=False)
    _register(client, "Sara", "sara@example.com")
    assert client.get(f"/join/{code}", follow_redirects=False).status_code == 303

    page = client.get(f"/groups/{group_id}").text
    marco = int(re.search(r'<option value="(\d+)"[^>]*>Marco', page).group(1))
    sara = int(re.search(r'<option value="(\d+)"[^>]*>Sara', page).group(1))
    r = client.post(
        f"/groups/{group_id}/payments",
        data={"from_user": marco, "to_user": sara, "amount": "10,00"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    payment_id = re.search(
        r"/payments/(\d+)/delete", client.get(f"/groups/{group_id}").text
    ).group(1)

    r = client.post(
        f"/groups/{group_id}/payments/{payment_id}/delete", follow_redirects=False
    )
    assert r.status_code == 303
    assert f"undo_payment={payment_id}" in r.headers["location"]

    page = client.get(r.headers["location"]).text
    assert "Pagamento annullato" in page
    assert f"/payments/{payment_id}/restore" in page
    assert "· annullato" in page

    r = client.post(
        f"/groups/{group_id}/payments/{payment_id}/restore", follow_redirects=False
    )
    assert r.status_code == 303
    page = client.get(f"/groups/{group_id}").text
    assert "· annullato" not in page
    assert "Pagamento annullato" not in page


def test_group_edit_conflict_shows_both_versions_and_asks(client: TestClient) -> None:
    """Due modifiche contemporanee: niente sovrascritture in silenzio."""
    _register(client)
    group_id = _create_group(client)

    # Il form porta lo stato che l'utente sta vedendo.
    page = client.get(f"/groups/{group_id}/edit").text
    assert 'name="base"' in page
    base = re.search(r'name="base" value="([^"]*)"', page).group(1)

    # Un altro dispositivo salva nel frattempo.
    other = client.post(
        f"/groups/{group_id}/edit",
        data={"name": "Weekend montagna", "kind": "trip", "base_currency": "EUR", "base": base},
        follow_redirects=False,
    )
    assert other.status_code == 303

    # Il form aperto prima salva adesso: conflitto con 409, due versioni,
    # scelta esplicita, niente salvataggio automatico.
    r = client.post(
        f"/groups/{group_id}/edit",
        data={"name": "Weekend al mare", "kind": "event", "base_currency": "EUR", "base": base},
        follow_redirects=False,
    )
    assert r.status_code == 409
    conflict = r.text
    assert "Weekend montagna" in conflict
    assert "Weekend al mare" in conflict
    assert "Tieni la mia versione" in conflict
    assert "Tieni l'altra" in conflict
    assert 'name="force" value="1"' in conflict

    # Il gruppo sul server è ancora quello dell'altro dispositivo.
    assert "Weekend montagna" in client.get(f"/groups/{group_id}").text

    # Scelta esplicita: la mia versione vince.
    r = client.post(
        f"/groups/{group_id}/edit",
        data={
            "name": "Weekend al mare",
            "kind": "event",
            "base_currency": "EUR",
            "base": base,
            "force": "1",
        },
        follow_redirects=False,
    )
    assert r.status_code == 303
    detail = client.get(f"/groups/{group_id}").text
    assert "Weekend al mare" in detail

    # E il form aggiornato porta il nuovo base: salvarlo senza cambiare
    # niente non genera un altro conflitto.
    page = client.get(f"/groups/{group_id}/edit").text
    new_base = re.search(r'name="base" value="([^"]*)"', page).group(1)
    assert new_base != base
    r = client.post(
        f"/groups/{group_id}/edit",
        data={"name": "Weekend al mare", "kind": "event", "base_currency": "EUR", "base": new_base},
        follow_redirects=False,
    )
    assert r.status_code == 303


def test_group_edit_without_changes_never_conflicts(client: TestClient) -> None:
    """Salvare il form di un altro dispositivo senza toccare nulla è ok."""
    _register(client)
    group_id = _create_group(client, name="Casa")
    page = client.get(f"/groups/{group_id}/edit").text
    base = re.search(r'name="base" value="([^"]*)"', page).group(1)
    client.post(
        f"/groups/{group_id}/edit",
        data={"name": "Casa ristrutturata", "kind": "home", "base_currency": "EUR", "base": base},
        follow_redirects=False,
    )
    # Stesso nome/tipo/valuta del server: il nome non è cambiato, non c'è
    # una "sua versione" da difendere, si torna al gruppo senza conflitto.
    r = client.post(
        f"/groups/{group_id}/edit",
        data={"name": "Casa ristrutturata", "kind": "home", "base_currency": "EUR", "base": base},
        follow_redirects=False,
    )
    assert r.status_code == 303
