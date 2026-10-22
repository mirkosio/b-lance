"""Tassi di cambio per il bilancio vacanza.

Scelta progettuale (senza API esterna):
- Tassi STATICI vs EUR, inclusi nel codice. Niente chiavi, niente rete,
  niente test che falliscono quando cade l'API. Deterministico.
- Conversione incrociata via EUR (THB->EUR->PLN).
- Se una valuta non ha tasso noto, il campo resta compilabile a mano:
  l'utente inserisce il tasso e il sistema lo salva sulla spesa.

I tassi sono QUOTE: "1 EUR = X valuta". Es. THB = 36.5 -> 1 EUR = 36.5 THB.

La spesa salva il tasso al momento del registro (snapshot), così lo
storico non cambia se i tassi cambiano dopo (regola del dominio money).
"""

from __future__ import annotations

import os
import time
import urllib.request
import xml.etree.ElementTree as ET
from decimal import Decimal, InvalidOperation

# Quanto vale 1 EUR nelle valute indicate. È il FALLBACK deterministico:
# se la BCE non è raggiungibile (o i test disattivano la rete), si usa questo.
# Aggiornamento manuale: sostituire i valori con quelli correnti quando serve.
RATES_VS_EUR: dict[str, str] = {
    "USD": "1.08",
    "GBP": "0.86",
    "CHF": "0.94",
    "JPY": "165.0",
    "CNY": "7.80",
    "SEK": "11.2",
    "NOK": "11.6",
    "DKK": "7.46",
    "ISK": "149.0",
    "PLN": "4.30",
    "CZK": "25.2",
    "HUF": "395.0",
    "RON": "4.98",
    "BGN": "1.96",
    "HRK": "7.53",
    "TRY": "37.5",
    "RUB": "100.0",
    "UAH": "46.0",
    "AUD": "1.63",
    "CAD": "1.48",
    "NZD": "1.76",
    "SGD": "1.45",
    "HKD": "8.45",
    "KRW": "1450.0",
    "INR": "92.0",
    "THB": "36.5",
    "MYR": "5.05",
    "IDR": "17500.0",
    "PHP": "61.0",
    "VND": "27500.0",
    "AED": "3.97",
    "SAR": "4.05",
    "QAR": "3.93",
    "ILS": "3.95",
    "EGP": "52.0",
    "MAD": "10.8",
    "TND": "3.35",
    "ZAR": "19.8",
    "BRL": "5.85",
    "MXN": "21.5",
    "ARS": "1200.0",
    "CLP": "1030.0",
    "COP": "4400.0",
    "PEN": "4.05",
    "NGN": "1750.0",
    "KES": "140.0",
    "GHS": "16.5",
    "PKR": "300.0",
    "BDT": "130.0",
    "LKR": "320.0",
    "NPR": "145.0",
    "KZT": "520.0",
    "GEL": "3.0",
    "UZS": "13500.0",
    "BHD": "0.407",
    "KWD": "0.326",
    "JOD": "0.764",
    "OMR": "0.415",
    "LYD": "5.30",
    "IQD": "1420.0",
    "JMD": "170.0",
    "TTD": "7.30",
    "UYU": "43.5",
    "BOB": "7.40",
    "PAB": "1.08",
    "GTQ": "8.35",
    "CRC": "545.0",
    "DOP": "64.0",
    "XOF": "655.96",
    "XAF": "655.96",
    "XPF": "110.0",
    "MUR": "49.0",
    "SCR": "15.5",
    "MZN": "69.0",
    "AOA": "990.0",
    "BWP": "14.5",
    "TZS": "2900.0",
    "UGX": "3900.0",
    "RWF": "1500.0",
    "ETB": "130.0",
    "SDG": "640.0",
    "SOS": "615.0",
}


ECB_URL = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
_CACHE_SECONDS = 12 * 60 * 60
_RETRY_SECONDS = 10 * 60

_live_rates: dict[str, str] = {}
_live_date: str | None = None
_last_attempt: float = 0.0


class ExchangeError(ValueError):
    """Tasso di cambio mancante o non valido."""


def _live_enabled() -> bool:
    return os.getenv("BLANCE_FX_LIVE", "1").strip().lower() not in ("0", "false", "no")


def refresh_ecb_rates(force: bool = False) -> bool:
    """Scarica i tassi giornalieri BCE. Ritorna True se ha aggiornato.

    Non solleva mai: in caso di rete assente si continua col fallback statico.
    """
    global _live_rates, _live_date, _last_attempt
    if not _live_enabled():
        return False
    now = time.time()
    if not force and _live_rates and now - _last_attempt < _CACHE_SECONDS:
        return False
    if not force and _last_attempt and now - _last_attempt < _RETRY_SECONDS:
        return False
    _last_attempt = now
    try:
        request = urllib.request.Request(
            ECB_URL, headers={"User-Agent": "B-Lance/1.2 (+https://b-lance.vercel.app)"}
        )
        with urllib.request.urlopen(request, timeout=3.0) as response:
            payload = response.read(300_000)
        root = ET.fromstring(payload)
        rates: dict[str, str] = {"EUR": "1"}
        date_value = None
        for element in root.iter():
            if not element.tag.endswith("Cube"):
                continue
            currency = element.attrib.get("currency")
            rate = element.attrib.get("rate")
            if currency and rate:
                rates[currency.upper()] = rate
            if element.attrib.get("time"):
                date_value = element.attrib["time"]
        if len(rates) < 10:
            return False
        _live_rates = rates
        _live_date = date_value
        return True
    except Exception:
        return False


def current_rates() -> dict[str, str]:
    """Tassi correnti: BCE se disponibile, altrimenti statici."""
    refresh_ecb_rates()
    if _live_rates:
        merged = dict(RATES_VS_EUR)
        merged.update(_live_rates)
        return merged
    return dict(RATES_VS_EUR)


def rate_date() -> str | None:
    return _live_date


def rate_source() -> str:
    return "ECB" if _live_rates else "static"


def has_rate(code: str) -> bool:
    """True se conosciamo il tasso vs EUR per questa valuta."""
    return (code or "").strip().upper() in current_rates()


def _rate_vs_eur(code: str) -> Decimal:
    normalized = (code or "").strip().upper()
    if normalized == "EUR":
        return Decimal("1")
    rates = current_rates()
    if normalized not in rates:
        raise ExchangeError(f"tasso per {normalized} non disponibile, inseriscilo a mano")
    try:
        value = Decimal(rates[normalized])
    except InvalidOperation as exc:
        raise ExchangeError(f"tasso non valido per {normalized}") from exc
    if value <= 0:
        raise ExchangeError(f"tasso non positivo per {normalized}")
    return value


def get_rate(from_currency: str, to_currency: str, manual: str | Decimal | None = None) -> Decimal:
    """Ritorna quante unità di `to` valgono 1 unità di `from`.

    Se `from` non ha tasso automatico e viene fornito `manual`,
    usa quello (tasso diretto from->to). Altrimenti ExchangeError.

    Conversione incrociata via EUR.
    """
    src = (from_currency or "").strip().upper()
    dst = (to_currency or "").strip().upper()
    if src == dst:
        return Decimal("1")

    # Tasso manuale esplicito: vale come tasso diretto.
    if manual is not None:
        try:
            m = Decimal(str(manual))
        except InvalidOperation as exc:
            raise ExchangeError("tasso manuale non valido") from exc
        if m <= 0:
            raise ExchangeError("il tasso deve essere positivo")
        return m

    src_rate = _rate_vs_eur(src)  # 1 EUR = src_rate SRC
    dst_rate = _rate_vs_eur(dst)  # 1 EUR = dst_rate DST
    # 1 SRC = (1 / src_rate) EUR = (dst_rate / src_rate) DST
    return dst_rate / src_rate


def convert(
    amount_minor: int,
    from_currency: str,
    to_currency: str,
    manual: str | Decimal | None = None,
    from_exponent: int | None = None,
    to_exponent: int | None = None,
) -> int:
    """Converte un importo tra valute con exponent diversi.

    Gestisce correttamente il cambio di precisione:
    500 THB (exp 2) -> EUR (exp 2) oppure -> JPY (exp 0).
    """
    from .currencies import get_currency
    from .money import MoneyError, to_major, to_minor

    src = get_currency(from_currency)
    dst = get_currency(to_currency)
    src_exp = from_exponent if from_exponent is not None else src.exponent
    dst_exp = to_exponent if to_exponent is not None else dst.exponent

    if src.code == dst.code:
        return int(amount_minor)

    rate = get_rate(src.code, dst.code, manual=manual)

    # minor (src) -> maggior (src) -> maggior (dst) -> minor (dst)
    major_src = to_major(int(amount_minor), src_exp)
    major_dst = major_src * rate
    return to_minor(major_dst, exponent=dst_exp)
