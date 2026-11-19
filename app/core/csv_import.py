"""Import CSV di spese: anteprima, mappatura colonne e rifiuto sicuro.

Nessun dato inventato: ogni riga deve avere importo valido e, se indicato,
un pagatore che esiste nel gruppo. Se una riga non torna, NON si importa
nulla: l'errore viene mostrato tutto insieme, con il numero della riga.
"""

from __future__ import annotations

import csv
import io
from decimal import Decimal, InvalidOperation

MAX_ROWS = 500
MAX_BYTES = 256 * 1024

FIELDS = ("data", "descrizione", "importo", "pagatore", "categoria")

ALIASES = {
    "data": ("data", "date", "datum", "fecha"),
    "descrizione": ("descrizione", "description", "details", "item", "nome"),
    "importo": ("importo", "amount", "value", "price", "costo", "spesa"),
    "pagatore": ("pagatore", "payer", "paid by", "pagato da", "who paid"),
    "categoria": ("categoria", "category", "categorie"),
}


class ImportError_(ValueError):
    """Errore di struttura del file: nessuna riga viene toccata."""


def parse_csv(raw: bytes) -> tuple[list[str], list[dict[str, str]]]:
    if len(raw) > MAX_BYTES:
        raise ImportError_(f"Il file supera {MAX_BYTES // 1024} KB.")
    text = raw.decode("utf-8-sig")
    sample = text[:4096]
    try:
        dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
    except csv.Error:
        dialect = csv.excel
    reader = csv.DictReader(io.StringIO(text), dialect=dialect)
    if not reader.fieldnames:
        raise ImportError_("Il file non ha un'intestazione.")
    headers = [str(h).strip() for h in reader.fieldnames]
    if len(set(headers)) != len(headers):
        raise ImportError_("L'intestazione contiene colonne ripetute.")
    rows = []
    for i, row in enumerate(reader, start=2):
        if i > MAX_ROWS + 1:
            raise ImportError_(f"Troppo righe: il limite è {MAX_ROWS}.")
        cleaned = {
            str(k).strip(): (v or "").strip()
            for k, v in row.items() if k is not None
        }
        if any(cleaned.values()):
            rows.append(cleaned)
    return headers, rows


def guess_columns(headers: list[str]) -> dict[str, str]:
    """Suggerisce la mappatura; l'utente può sempre correggerla."""
    normalized = {h.lower().strip(): h for h in headers}
    out = {}
    for field, aliases in ALIASES.items():
        for alias in aliases:
            if alias in normalized:
                out[field] = normalized[alias]
                break
    return out


def parse_amount(value: str) -> int:
    """Importo in centesimi: accetta '1.234,56' e '1234.56'."""
    raw = (value or "").strip().replace(" ", "")
    if not raw:
        raise InvalidOperation
    if "," in raw and "." in raw:
        raw = raw.replace(".", "").replace(",", ".")
    elif "," in raw:
        raw = raw.replace(",", ".")
    return int((Decimal(raw) * 100).to_integral_value())


def validate_rows(
    rows: list[dict[str, str]],
    mapping: dict[str, str],
    member_names: dict[str, int],
    fallback_payer_id: int,
) -> tuple[list[dict], list[str]]:
    """Restituisce (spese pronte, errori). Non scrive nulla sul database."""
    if not mapping.get("importo"):
        return [], ["Scegli quale colonna contiene l'importo."]
    if not mapping.get("descrizione"):
        return [], ["Scegli quale colonna contiene la descrizione."]
    prepared, errors = [], []
    for number, row in enumerate(rows, start=2):
        try:
            amount = parse_amount(row.get(mapping["importo"], ""))
            if amount <= 0:
                raise ValueError("l'importo deve essere maggiore di zero")
            description = row.get(mapping["descrizione"], "").strip()
            if not description:
                raise ValueError("manca la descrizione")
            payer_name = (
                row.get(mapping.get("pagatore", ""), "").strip()
                if mapping.get("pagatore") else ""
            )
            if payer_name:
                key = payer_name.lower()
                payer_id = member_names.get(key)
                if payer_id is None:
                    raise ValueError(
                        f"pagatore '{payer_name}' non è un membro del gruppo"
                    )
            else:
                payer_id = fallback_payer_id
            category = (
                row.get(mapping.get("categoria", ""), "").strip().lower()
                if mapping.get("categoria") else ""
            )
            prepared.append({
                "line": number,
                "description": description[:200],
                "amount_minor": amount,
                "payer_id": payer_id,
                "category": category or "other",
            })
        except (InvalidOperation, ValueError, ArithmeticError) as exc:
            errors.append(f"Riga {number}: {exc}")
    return prepared, errors
