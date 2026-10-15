"""Test property-based del motore matematico.

Qui si difende la cosa più importante: i soldi devono tornare.
Usiamo hypothesis per provare migliaia di casi casuali.
"""

from __future__ import annotations

from decimal import Decimal

import pytest
from hypothesis import HealthCheck, given, settings, strategies as st

from app.core.money import (
    MoneyError,
    format_eur,
    parse_user_amount,
    split_evenly,
    to_major,
    to_minor,
    validate_shares_sum,
)
from app.core.settlement import apply_transfer, simplify, total_moved
from app.core.splitting import (
    SplitMethod,
    compute_shares,
    split_exact,
    split_percent,
)


# Strategia che genera saldi REALI: nella vita vera sommano sempre a zero
# (ogni euro speso da qualcuno è incassato da qualcun altro).
@st.composite
def balanced_balances(draw) -> dict[int, int]:
    n = draw(st.integers(min_value=2, max_value=8))
    raw = [draw(st.integers(min_value=-10**5, max_value=10**5)) for _ in range(n)]
    # Forzo la somma a zero aggiustando l'ultimo elemento.
    raw[-1] = -sum(raw[:-1])
    return {i + 1: v for i, v in enumerate(raw)}

# ---------------------------------------------------------------- money


@given(st.integers(min_value=0, max_value=10**9))
def test_minor_roundtrip(cents: int) -> None:
    """Centesimi -> Decimal -> centesimi deve tornare identico."""
    assert to_minor(to_major(cents)) == cents


@given(st.integers(min_value=0, max_value=10**7))
def test_parse_and_format_consistent(cents: int) -> None:
    """Il formato con € si riparsing uguale."""
    text = format_eur(cents)  # "€12.34"
    assert parse_user_amount(text) == cents


@given(
    st.integers(min_value=0, max_value=10**6),
    st.integers(min_value=1, max_value=50),
)
def test_even_split_conserves_money(total: int, people: int) -> None:
    """La divisione equa non perde né inventa centesimi."""
    shares = split_evenly(total, people)
    assert sum(shares) == total
    assert len(shares) == people


@given(
    st.integers(min_value=0, max_value=10**6),
    st.integers(min_value=1, max_value=50),
)
def test_even_split_is_balanced(total: int, people: int) -> None:
    """Le quote differiscono al massimo di un centesimo."""
    shares = split_evenly(total, people)
    assert max(shares) - min(shares) <= 1


@given(st.text(alphabet="abzABZ?#!@ ", min_size=1, max_size=15))
def test_garbage_input_raises(raw: str) -> None:
    """Input chiaramente non numerico -> MoneyError, mai un numero a caso."""
    with pytest.raises(MoneyError):
        parse_user_amount(raw)


def test_negative_rejected() -> None:
    with pytest.raises(MoneyError):
        to_minor("-5")
    with pytest.raises(MoneyError):
        parse_user_amount("-1,50")


def test_nan_inf_rejected() -> None:
    with pytest.raises(MoneyError):
        to_minor("nan")
    with pytest.raises(MoneyError):
        to_minor("inf")


# ---------------------------------------------------------------- splitting


@given(
    st.integers(min_value=1, max_value=10**6),
    st.lists(st.integers(min_value=1, max_value=1000), min_size=1, max_size=10, unique=True),
)
def test_even_split_shares_sum(total: int, ids: list[int]) -> None:
    """compute_shares EVEN conserva sempre il totale."""
    result = compute_shares(total, SplitMethod.EVEN, ids)
    assert sum(result.values()) == total
    assert set(result.keys()) == set(ids)


@given(
    st.integers(min_value=1, max_value=10**6),
    st.lists(st.integers(min_value=1, max_value=1000), min_size=2, max_size=6, unique=True),
)
def test_percent_split_sums_to_total(total: int, ids: list[int]) -> None:
    """Le percentuali, per quanto casuali, devono sommare al totale."""
    # Genero percentuali che sommano esattamente 100.
    n = len(ids)
    base = Decimal(100) / n
    pcts = {uid: base for uid in ids}
    # Correggo l'ultima per far sommare 100.
    pcts[ids[-1]] = Decimal(100) - base * (n - 1)
    result = compute_shares(total, SplitMethod.PERCENT, ids, percentages=pcts)
    assert sum(result.values()) == total


def test_percent_must_sum_100() -> None:
    with pytest.raises(MoneyError):
        split_percent(1000, {1: Decimal("50"), 2: Decimal("40")})


def test_exact_split_validates_sum() -> None:
    with pytest.raises(MoneyError):
        split_exact(1000, {1: 500, 2: 400})  # somma 900, non 1000


# ---------------------------------------------------------------- settlement


@given(balanced_balances())
def test_settlement_zeroes_balances(balances: dict[int, int]) -> None:
    """Dopo i trasferimenti, tutti i saldi sono a zero."""
    transfers = simplify(balances)
    running = dict(balances)
    for t in transfers:
        running = apply_transfer(running, t)
    assert all(v == 0 for v in running.values())


@given(balanced_balances())
def test_settlement_conserves_money(balances: dict[int, int]) -> None:
    """I soldi girati == totale dei crediti. Niente creati, niente persi."""
    transfers = simplify(balances)
    total_credit = sum(v for v in balances.values() if v > 0)
    assert total_moved(transfers) == total_credit


@given(balanced_balances())
def test_settlement_minimal_transfers(balances: dict[int, int]) -> None:
    """Mai più di (n-1) trasferimenti: è il vincolo di minimizzazione."""
    transfers = simplify(balances)
    non_zero = [uid for uid, v in balances.items() if v != 0]
    assert len(transfers) <= max(0, len(non_zero) - 1)


@given(balanced_balances())
def test_settlement_no_self_or_zero_transfer(balances: dict[int, int]) -> None:
    """Nessun trasferimento verso se stessi o di importo zero."""
    for t in simplify(balances):
        assert t.payer_id != t.payee_id
        assert t.amount_minor > 0


@given(balanced_balances())
def test_settlement_deterministic(balances: dict[int, int]) -> None:
    """Stesso input, stesso output. Niente randomness nei conti."""
    assert simplify(balances) == simplify(balances)


def test_already_settled_is_empty() -> None:
    assert simplify({1: 0, 2: 0, 3: 0}) == []
    assert simplify({1: 0}) == []


def test_one_directional_case() -> None:
    """Caso semplice: uno deve tutto a uno solo."""
    transfers = simplify({1: 1000, 2: -1000})
    assert len(transfers) == 1
    assert transfers[0].payer_id == 2
    assert transfers[0].payee_id == 1
    assert transfers[0].amount_minor == 1000


def test_three_way_chain_collapses() -> None:
    """A->B->C diventa il trasferimento diretto minimo."""
    # 1 deve 10 a 2, 2 deve 20 a 3 => semplificato.
    transfers = simplify({1: -10, 2: -10, 3: 20})
    # Totale crediti = 20, in massimo 2 trasferimenti.
    assert total_moved(transfers) == 20
    assert len(transfers) <= 2


def test_validate_shares_catches_mismatch() -> None:
    with pytest.raises(MoneyError):
        validate_shares_sum(1000, [400, 400])
    validate_shares_sum(1000, [500, 500])  # non deve fallire
