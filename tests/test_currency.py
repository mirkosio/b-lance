"""Test per valute, tassi di cambio e spese multi-valuta."""

from __future__ import annotations

from decimal import Decimal

import pytest
from fastapi.testclient import TestClient
from hypothesis import given, strategies as st

from app.core.currencies import (
    CURRENCIES,
    get_currency,
    is_valid_currency,
    sorted_currencies,
)
from app.core.exchange import ExchangeError, convert, get_rate, has_rate
from app.core.money import format_amount, parse_user_amount, to_major, to_minor
from app.database import Base, engine
from app.main import app

# ---------------------------------------------------------------- valute


def test_currency_count_is_large():
    """Almeno 100 valute ISO (l'obiettivo era 'tutte le possibili')."""
    assert len(CURRENCIES) >= 100


def test_currency_exponents_correct():
    """Exponent giusti: JPY=0, KWD=3, EUR=2."""
    assert get_currency("EUR").exponent == 2
    assert get_currency("JPY").exponent == 0
    assert get_currency("KWD").exponent == 3
    assert get_currency("USD").exponent == 2


def test_currency_codes_are_3_alpha():
    for code in CURRENCIES:
        assert len(code) == 3 and code.isalpha()


def test_invalid_currency_raises():
    with pytest.raises(ValueError):
        get_currency("XYZ")
    assert not is_valid_currency("XYZ")
    assert is_valid_currency("eur")  # case-insensitive


def test_sorted_priorities_first():
    ordered = sorted_currencies()
    assert ordered[0].code == "EUR"
    assert ordered[1].code == "USD"
    # nessun duplicato
    codes = [c.code for c in ordered]
    assert len(codes) == len(set(codes))


def test_format_amount_by_currency():
    assert format_amount(1250, "EUR") == "€12.50"
    assert format_amount(1250, "JPY") == "¥1250"
    assert format_amount(1250, "KWD") == "KD1.250"
    assert format_amount(9999, "USD") == "$99.99"


def test_parse_by_exponent():
    assert parse_user_amount("1250", exponent=0) == 1250
    assert parse_user_amount("12.50", exponent=2) == 1250
    assert parse_user_amount("1.250", exponent=3) == 1250


# ---------------------------------------------------------------- tassi


def test_rate_identity():
    assert get_rate("EUR", "EUR") == Decimal("1")
    assert get_rate("THB", "THB") == Decimal("1")


def test_rate_cross_via_eur():
    # 1 THB = 1/36.5 EUR = 0.02739 EUR -> poi EUR->PLN (4.30)
    r = get_rate("THB", "PLN")
    assert float(r) == pytest.approx(0.1178, rel=0.01)


def test_rate_unknown_needs_manual():
    with pytest.raises(ExchangeError):
        get_rate("ZZZ", "EUR")
    assert get_rate("ZZZ", "EUR", manual="2.0") == Decimal("2.0")


def test_has_rate():
    assert has_rate("USD") and has_rate("JPY")
    assert not has_rate("ZZZ")


def test_convert_same_currency():
    assert convert(1234, "EUR", "EUR") == 1234


def test_convert_eur_to_jpy_exponent():
    # 10.00 EUR = 1000 minor -> JPY (exp 0) = 10 * 165 = 1650
    assert convert(1000, "EUR", "JPY") == 1650


def test_convert_thb_to_eur():
    # 1000.00 THB (100000 minor) / 36.5 = 27.40 EUR = 2740 minor
    assert convert(100000, "THB", "EUR") == 2740


def test_convert_manual_rate():
    # Valuta nota ma con tasso forzato a mano (override).
    assert convert(100, "EUR", "CHF", manual="0.5") == 50


# ---------------------------------------------------------------- property


@given(st.integers(min_value=0, max_value=10**6))
def test_minor_roundtrip_exp0(cents: int) -> None:
    """Roundtrip con exponent=0 (yen): nessuna perdita."""
    assert to_minor(to_major(cents, 0), exponent=0) == cents


@given(st.integers(min_value=0, max_value=10**6))
def test_minor_roundtrip_exp3(cents: int) -> None:
    """Roundtrip con exponent=3 (dinar): nessuna perdita."""
    assert to_minor(to_major(cents, 3), exponent=3) == cents


# ---------------------------------------------------------------- end-to-end


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def _reg(client, name, email):
    r = client.post("/register", data={"name": name, "email": email, "password": "secret123"},
                    follow_redirects=False)
    assert r.status_code == 303


def _mk_group(client, base="EUR"):
    r = client.post("/groups/new", data={"name": "G", "kind": "trip", "base_currency": base},
                    follow_redirects=False)
    assert r.status_code == 303
    return int(r.headers["location"].rstrip("/").split("/")[-1])


def test_group_invalid_currency_rejected(client):
    _reg(client, "Marco", "m@x.com")
    r = client.post("/groups/new", data={"name": "G", "kind": "trip", "base_currency": "ZZZ"})
    assert r.status_code == 400


def test_group_jpy_currency_accepted(client):
    _reg(client, "Marco", "m@x.com")
    gid = _mk_group(client, "JPY")
    page = client.get(f"/groups/{gid}").text
    assert "JPY" in page


def test_foreign_currency_expense_converts(client):
    """Spesa THB in gruppo EUR: i saldi sono in EUR convertito."""
    _reg(client, "Marco", "m@x.com")
    gid = _mk_group(client, "EUR")
    # seconda persona
    page = client.get(f"/groups/{gid}").text
    import re
    code = re.search(r"/join/([A-Z0-9]+)", page).group(1)
    client.post("/logout")
    _reg(client, "Luca", "l@x.com")
    client.get(f"/join/{code}")

    # Marco paga 1000 THB diviso in 2 -> ognuno 500 THB = ~13.70 EUR
    r = client.post(
        f"/groups/{gid}/expenses",
        data={"description": "Cena thai", "amount": "1000", "paid_by": "1",
              "split_method": "even", "members": ["1", "2"], "currency": "THB"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text

    page = client.get(f"/groups/{gid}").text
    # Marco +13.70 circa, Luca -13.70
    assert "+€13.70" in page or "+€13.7" in page
    # la spesa si mostra in THB
    assert "฿1000.00" in page or "฿1000" in page


def test_expense_paid_by_non_member_rejected(client):
    """FIX sicurezza: paid_by estraneo -> 400."""
    _reg(client, "Marco", "m@x.com")
    gid = _mk_group(client, "EUR")
    r = client.post(
        f"/groups/{gid}/expenses",
        data={"description": "X", "amount": "10", "paid_by": "999",
              "split_method": "even", "members": ["1"]},
    )
    assert r.status_code == 400
    assert "membro" in r.text


def test_payment_non_member_rejected(client):
    """FIX sicurezza: pagamento con membri estranei -> 400."""
    _reg(client, "Marco", "m@x.com")
    gid = _mk_group(client, "EUR")
    r = client.post(
        f"/groups/{gid}/payments",
        data={"from_user": "1", "to_user": "999", "amount": "5"},
    )
    assert r.status_code == 400
    assert "membro" in r.text or "membri" in r.text


def test_exact_split_e2e(client):
    """Split con importi esatti via form dinamico."""
    _reg(client, "Marco", "m@x.com")
    gid = _mk_group(client, "EUR")
    page = client.get(f"/groups/{gid}").text
    import re
    code = re.search(r"/join/([A-Z0-9]+)", page).group(1)
    client.post("/logout")
    _reg(client, "Luca", "l@x.com")
    client.get(f"/join/{code}")

    # 30 totali: Marco 20, Luca 10 (non equo)
    r = client.post(
        f"/groups/{gid}/expenses",
        data={"description": "Hotel", "amount": "30", "paid_by": "1",
              "split_method": "exact", "members": ["1", "2"],
              "exact_1": "20", "exact_2": "10"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    page = client.get(f"/groups/{gid}").text
    # Marco pagato 30, doveva 20 -> +10 ; Luca doveva 10 -> -10
    assert "+€10.00" in page
    assert "-€10.00" in page


def test_exact_split_wrong_sum_rejected(client):
    """Se le quote non sommano al totale -> 400, niente soldi persi."""
    _reg(client, "Marco", "m@x.com")
    gid = _mk_group(client, "EUR")
    page = client.get(f"/groups/{gid}").text
    import re
    code = re.search(r"/join/([A-Z0-9]+)", page).group(1)
    client.post("/logout")
    _reg(client, "Luca", "l@x.com")
    client.get(f"/join/{code}")

    r = client.post(
        f"/groups/{gid}/expenses",
        data={"description": "X", "amount": "30", "paid_by": "1",
              "split_method": "exact", "members": ["1", "2"],
              "exact_1": "20", "exact_2": "5"},  # somma 25 != 30
    )
    assert r.status_code == 400


def test_percent_split_e2e(client):
    """Split percentuale: deve fare 100."""
    _reg(client, "Marco", "m@x.com")
    gid = _mk_group(client, "EUR")
    page = client.get(f"/groups/{gid}").text
    import re
    code = re.search(r"/join/([A-Z0-9]+)", page).group(1)
    client.post("/logout")
    _reg(client, "Luca", "l@x.com")
    client.get(f"/join/{code}")

    # 50/50 su 30 -> 15 a testa
    r = client.post(
        f"/groups/{gid}/expenses",
        data={"description": "Taxi", "amount": "30", "paid_by": "1",
              "split_method": "percent", "members": ["1", "2"],
              "pct_1": "50", "pct_2": "50"},
        follow_redirects=False,
    )
    assert r.status_code == 303, r.text
    page = client.get(f"/groups/{gid}").text
    assert "+€15.00" in page
    assert "-€15.00" in page


def test_percent_wrong_sum_rejected(client):
    _reg(client, "Marco", "m@x.com")
    gid = _mk_group(client, "EUR")
    r = client.post(
        f"/groups/{gid}/expenses",
        data={"description": "X", "amount": "30", "paid_by": "1",
              "split_method": "percent", "members": ["1"],
              "pct_1": "80"},  # != 100
    )
    assert r.status_code == 400
