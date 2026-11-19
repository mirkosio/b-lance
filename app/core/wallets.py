"""Handle di pagamento forniti dall'utente, convalidati senza contattare nessuno."""

from __future__ import annotations

WALLET_PROVIDERS = {
    "paypal": "PayPal",
    "satispay": "Satispay",
    "revolut": "Revolut",
    "iban": "IBAN",
}


def clean_wallet(provider: str, handle: str) -> str:
    """Restituisce l'handle pulito; '' significa 'rimuovi'."""
    code = (provider or "").strip().lower()
    if code not in WALLET_PROVIDERS:
        raise ValueError("Wallet non riconosciuto")
    value = (handle or "").strip()
    if not value:
        return ""
    if code == "iban":
        compact = value.replace(" ", "").upper()
        if not (15 <= len(compact) <= 34) or not compact.isalnum():
            raise ValueError("IBAN non valido")
        return compact
    if not (2 <= len(value) <= 120) or any(ord(c) < 32 for c in value):
        raise ValueError("Handle non valido")
    return value
