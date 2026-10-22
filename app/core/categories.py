"""Categorie fisse delle spese.

Il codice salvato nel DB è stabile e serve alle API; l'etichetta italiana
è solo presentazione (l'app ha le sue icone, il sito il suo testo).
"""

from __future__ import annotations

CATEGORIES: dict[str, str] = {
    "food": "Cibo e ristoranti",
    "groceries": "Spesa alimentare",
    "transport": "Trasporti",
    "home": "Casa",
    "travel": "Viaggi",
    "fun": "Svago",
    "health": "Salute",
    "shopping": "Acquisti",
    "bills": "Bollette",
    "other": "Altro",
}

DEFAULT_CATEGORY = "other"


def clean_category(value: str | None) -> str:
    """Normalizza la categoria; vuoto = Altro, sconosciuta = errore."""
    code = (value or "").strip().lower()
    if not code:
        return DEFAULT_CATEGORY
    if code not in CATEGORIES:
        raise ValueError("categoria non valida")
    return code


def category_label(value: str | None) -> str:
    return CATEGORIES.get((value or "").strip().lower(), CATEGORIES[DEFAULT_CATEGORY])
