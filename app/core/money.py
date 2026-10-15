"""Gestione denaro in unità minime intere (centesimi).

Regola d'oro: MAI float per i soldi. Tutto è un int di centesimi.
Un float 0.1 + 0.2 != 0.3 e ti distrugge i conti. Noi no.

Convenzione interna: ogni importo è un int >= 0 in centesimi.
Il segno (chi deve a chi) è gestito altrove, qui parliamo solo di valore.
"""

from __future__ import annotations

from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from typing import Union

Number = Union[int, float, str, Decimal]

# Un centesimo espresso come Decimal, per i calcoli di conversione.
CENT = Decimal("0.01")


class MoneyError(ValueError):
    """Errore di conversione o validazione di un importo."""


def to_minor(amount: Number, exponent: int = 2) -> int:
    """Converte un importo "umano" (es. 12.50) in unità MINORI intere.

    exponent = cifre decimali della valuta (EUR=2 -> centesimi,
    JPY=0 -> yen, KWD=3 -> millesimi). Default 2 per backward-compat.

    Accetta stringhe (12.50, "12,50"), Decimal, int e float.
    Arrotonda il rimanente verso l'alto (ROUND_HALF_UP), come la cassa.
    """
    if isinstance(amount, bool):
        raise MoneyError("bool non è un importo valido")
    if exponent < 0 or exponent > 4:
        raise MoneyError(f"exponent non valido: {exponent}")
    try:
        dec = Decimal(str(amount).strip().replace(",", "."))
    except (InvalidOperation, ValueError) as exc:
        raise MoneyError(f"importo non valido: {amount!r}") from exc
    if not dec.is_finite():
        raise MoneyError(f"importo non finito: {amount!r}")
    if dec < 0:
        raise MoneyError(f"importo negativo non ammesso qui: {amount!r}")
    factor = 10**exponent
    units = (dec * factor).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
    return int(units)


def to_major(minor: int, exponent: int = 2) -> Decimal:
    """Riporta le unità minori a Decimal in unità maggiore.

    1250 (exp 2) -> 12.50 ; 1250 (exp 0) -> 1250.
    """
    _check_minor(minor)
    if exponent < 0 or exponent > 4:
        raise MoneyError(f"exponent non valido: {exponent}")
    quant = Decimal(1).scaleb(-exponent)  # 10^-exponent
    return (Decimal(minor) / (10**exponent)).quantize(quant)


def format_eur(minor: int, symbol: bool = True) -> int | str:
    """DEPRECATO: usa format_amount(minor, code). Tiene € per compat."""
    return format_amount(minor, "EUR", symbol=symbol)


def format_amount(minor: int, code: str = "EUR", symbol: bool = True) -> str:
    """Formatta le unità minori secondo la valuta data.

    Risolve exponent e simbolo dal codice valuta.
    1250 EUR -> "€12.50" ; 1250 JPY -> "¥1250" ; 1250 KWD -> "KD1.250".
    """
    from .currencies import get_currency

    cur = get_currency(code)
    value = to_major(minor, cur.exponent)
    # Zero decimali: niente parte decimale.
    text = f"{value:.{cur.exponent}f}" if cur.exponent > 0 else f"{value:.0f}"
    if symbol:
        return f"{cur.symbol}{text}"
    return text


def _check_minor(minor: int) -> None:
    if not isinstance(minor, int) or isinstance(minor, bool):
        raise MoneyError(f"i centesimi devono essere int, ho {type(minor)}")
    if minor < 0:
        raise MoneyError(f"centesimi negativi non ammessi: {minor}")


def parse_user_amount(raw: str, exponent: int = 2) -> int:
    """Parsing di ciò che scrive l'utente nel form. Normalizza e valida.

    Gestisce "12", "12,5", "12.50", " 12,50 ", "€12,50", "¥1250".
    exponent = cifre decimali della valuta (default 2 = centesimi).
    Rilancia MoneyError se non è un importo positivo valido.
    """
    if raw is None:
        raise MoneyError("importo mancante")
    cleaned = str(raw).strip()
    # Tolgo simboli di valuta comuni e spazi.
    for sym in ("€", "$", "¥", "£", "₹", "฿", "₩", "₫", "₱", "R$", "S$", "HK$", "Cr", " "):
        cleaned = cleaned.replace(sym, "")
    if not cleaned:
        raise MoneyError("importo vuoto")
    # Se ci sono più di un separatore decimale, è un casino: rifiuta.
    if cleaned.count(",") > 1 or cleaned.count(".") > 1:
        raise MoneyError(f"formato importo ambiguo: {raw!r}")
    return to_minor(cleaned, exponent=exponent)


def convert_minor(amount_minor: int, rate: Decimal) -> int:
    """Converte un importo in centesimi con un tasso di cambio.

    rate = quante unità di valuta di destinazione per 1 unità di origine.
    Es. 1000 centesimi EUR * 1.09 (EUR->USD) = 1090 centesimi USD.
    Arrotonda ROUND_HALF_UP. Usato solo per la valuta di visualizzazione,
    MAI per ricalcolare storici (vedi policy dei tassi).
    """
    _check_minor(amount_minor)
    if not isinstance(rate, Decimal):
        rate = Decimal(str(rate))
    if not rate.is_finite() or rate <= 0:
        raise MoneyError(f"tasso di cambio non valido: {rate}")
    converted = (Decimal(amount_minor) * rate).quantize(
        Decimal("1"), rounding=ROUND_HALF_UP
    )
    return int(converted)


def split_evenly(total_minor: int, n_people: int) -> list[int]:
    """Divide total in n parti il più equamente possibile.

    Resto (il famoso centesimo in più) assegnato con metodo "largest
    remainder": le prime persone in lista ricevono il centesimo extra,
    in ordine deterministico. Mai un float in vista.
    """
    _check_minor(total_minor)
    if n_people <= 0:
        raise MoneyError("servono almeno 1 persona")
    base, remainder = divmod(total_minor, n_people)
    return [base + (1 if i < remainder else 0) for i in range(n_people)]


def validate_shares_sum(total_minor: int, shares: list[int]) -> None:
    """Le quote devono sommare esattamente il totale. Niente soldi persi."""
    for share in shares:
        _check_minor(share)
    if sum(shares) != total_minor:
        raise MoneyError(
            f"le quote ({sum(shares)}) non sommano al totale ({total_minor})"
        )
