"""Calcolo delle quote di una spesa.

Una spesa si divide in quote esatte (centesimi) per persona.
Tre modalità supportate:
- EVEN: divisione equa con distribuzione del resto
- EXACT: importi esatti per persona (l'utente li scrive)
- PERCENT: percentuali che devono sommare 100, convertite in centesimi

Regola: la somma delle quote DEVE eguagliare il totale. Sempre.
Il resto (centesimi arrotondati) viene distribuito con largest remainder,
mai buttato via, mai assegnato sempre alla stessa persona.
"""

from __future__ import annotations

from decimal import Decimal, ROUND_HALF_UP
from enum import Enum

from .money import MoneyError, _check_minor, split_evenly


class SplitMethod(str, Enum):
    EVEN = "even"
    EXACT = "exact"
    PERCENT = "percent"


def split_even(total_minor: int, member_ids: list[int]) -> dict[int, int]:
    """Divisione equa. Ritorna {user_id: quota_centesimi}."""
    _check_minor(total_minor)
    if not member_ids:
        raise MoneyError("nessun membro a cui dividere")
    amounts = split_evenly(total_minor, len(member_ids))
    return dict(zip(member_ids, amounts))


def split_exact(total_minor: int, shares: dict[int, int]) -> dict[int, int]:
    """Importi esatti per persona. Verifica che sommino al totale."""
    _check_minor(total_minor)
    if not shares:
        raise MoneyError("nessuna quota specificata")
    for uid, amount in shares.items():
        _check_minor(amount)
    total_shares = sum(shares.values())
    if total_shares != total_minor:
        raise MoneyError(
            f"le quote sommano a {total_shares}, ma la spesa è {total_minor}"
        )
    return dict(shares)


def split_percent(
    total_minor: int, percentages: dict[int, Decimal]
) -> dict[int, int]:
    """Percentuali -> centesimi con largest remainder.

    Le percentuali devono sommare 100. Il resto va a chi ha la parte
    frazionale più grande, così l'errore di arrotondamento è minimo.
    """
    _check_minor(total_minor)
    if not percentages:
        raise MoneyError("nessuna percentuale specificata")
    total_pct = sum(Decimal(str(p)) for p in percentages.values())
    if total_pct != Decimal("100"):
        raise MoneyError(f"le percentuali sommano a {total_pct}, devono fare 100")

    # Quota ideale in centesimi, non arrotondata (serve per il resto).
    exact = {
        uid: (Decimal(total_minor) * Decimal(str(pct)) / Decimal("100"))
        for uid, pct in percentages.items()
    }
    # Parte intera per difetto: è la base a cui aggiungere i centesimi extra.
    floors = {
        uid: int(value.to_integral_value(rounding="ROUND_DOWN"))
        for uid, value in exact.items()
    }
    remainder = total_minor - sum(floors.values())
    # Ordino per parte frazionale decrescente; a parità, per user_id (stabile).
    order = sorted(
        exact.keys(),
        key=lambda uid: (-(exact[uid] - floors[uid]), uid),
    )
    for i in range(remainder):
        floors[order[i % len(order)]] += 1
    return floors


def compute_shares(
    total_minor: int,
    method: SplitMethod,
    member_ids: list[int],
    exact_shares: dict[int, int] | None = None,
    percentages: dict[int, Decimal] | None = None,
) -> dict[int, int]:
    """Facciata unica. Sceglie il metodo e valida il risultato."""
    if method == SplitMethod.EVEN:
        result = split_even(total_minor, member_ids)
    elif method == SplitMethod.EXACT:
        if exact_shares is None:
            raise MoneyError("modalità exact richiede gli importi")
        result = split_exact(total_minor, exact_shares)
    elif method == SplitMethod.PERCENT:
        if percentages is None:
            raise MoneyError("modalità percent richiede le percentuali")
        result = split_percent(total_minor, percentages)
    else:
        raise MoneyError(f"metodo sconosciuto: {method}")

    # Controllo di sicurezza finale: niente soldi persi o inventati.
    if sum(result.values()) != total_minor:
        raise MoneyError("bug interno: quote non tornano al totale")
    return result
