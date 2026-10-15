"""Motore di semplificazione dei debiti.

Dato l'insieme dei saldi (saldo positivo = ti devono, negativo = devi),
calcola il numero MINIMO di trasferimenti per azzerare tutto.
Nessuno paga più del dovuto, nessun centesimo va perso.

Algoritmo greedy (ottimo per questo problema): prendo il creditore con
più credito e il debitore con più debito, li bilancio, ripeto.
Risultato: al massimo (n-1) trasferimenti per n persone.

I saldi sono centesimi con segno: int con qualsiasi segno.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Transfer:
    """Un singolo bonifico suggerito: da chi paga a chi riceve."""

    payer_id: int
    payee_id: int
    amount_minor: int

    def __post_init__(self) -> None:
        if self.amount_minor <= 0:
            raise ValueError("un trasferimento deve avere importo positivo")


def _normalize(balances: dict[int, int], tolerance: int = 0) -> tuple[list[tuple[int, int]], list[tuple[int, int]]]:
    """Separa creditori e debitori, scartando i saldi entro la tolleranza.

    tolerance = 0 di default: voglio precisione al centesimo.
    Posso alzarla leggermente per assorbire errori di conversione valuta,
    ma solo in modo consapevole.
    """
    creditors: list[tuple[int, int]] = []
    debtors: list[tuple[int, int]] = []
    for uid, bal in balances.items():
        if bal > tolerance:
            creditors.append((uid, bal))
        elif bal < -tolerance:
            debtors.append((uid, -bal))  # debito come positivo
    # Ordino per importo decrescente, poi per id per stabilità deterministica.
    creditors.sort(key=lambda x: (-x[1], x[0]))
    debtors.sort(key=lambda x: (-x[1], x[0]))
    return creditors, debtors


def simplify(balances: dict[int, int], tolerance: int = 0) -> list[Transfer]:
    """Calcola i trasferimenti minimi per azzerare i saldi.

    balances: {user_id: saldo_in_centesimi_con_segno}
    Positive = gli devono soldi. Negative = deve soldi.

    Garantisce:
    - conservazione totale: somma trasferimenti == somma crediti
    - nessun importo nullo o negativo nei trasferimenti
    - al massimo len(membri)-1 trasferimenti
    - determinismo: stesso input -> stesso output
    """
    creditors, debtors = _normalize(balances, tolerance)

    transfers: list[Transfer] = []
    i = j = 0
    while i < len(creditors) and j < len(debtors):
        payee_id, credit = creditors[i]
        payer_id, debt = debtors[j]
        amount = min(credit, debt)
        if amount > 0:
            transfers.append(Transfer(payer_id, payee_id, amount))
        creditors[i] = (payee_id, credit - amount)
        debtors[j] = (payer_id, debt - amount)
        if creditors[i][1] == 0:
            i += 1
        if debtors[j][1] == 0:
            j += 1

    return transfers


def total_moved(transfers: list[Transfer]) -> int:
    """Somma dei soldi effettivamente girati. Utile per i test."""
    return sum(t.amount_minor for t in transfers)


def is_settled(balances: dict[int, int], tolerance: int = 0) -> bool:
    """True se tutti i saldi sono entro la tolleranza (quindi a posto)."""
    return all(abs(b) <= tolerance for b in balances.values())


def apply_transfer(balances: dict[int, int], transfer: Transfer) -> dict[int, int]:
    """Applica un trasferimento ai saldi, senza mutare l'originale.

    Il debitore sale (men debito), il creditore scende (men credito).
    """
    new = dict(balances)
    new[transfer.payer_id] = new.get(transfer.payer_id, 0) + transfer.amount_minor
    new[transfer.payee_id] = new.get(transfer.payee_id, 0) - transfer.amount_minor
    return new


def settle_all(balances: dict[int, int]) -> list[Transfer]:
    """Simplifica e applica, ritornando i trasferimenti.

    È la funzione che l'interfaccia chiama per "Chi paga chi, quanto".
    """
    transfers = simplify(balances)
    # Verifica di coerenza: dopo i trasferimenti, tutti a zero.
    running = dict(balances)
    for t in transfers:
        running = apply_transfer(running, t)
    if not is_settled(running):
        # Non dovrebbe mai succedere; se succede c'è un bug.
        raise RuntimeError(f"settlement non azzera i saldi: {running}")
    return transfers
