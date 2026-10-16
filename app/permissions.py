"""Permessi dei membri di un gruppo.

Modelli:
- Il CREATORE (role="owner") ha tutti i permessi e non si tocca mai.
- "admin" ha tutti i permessi ( scorciatoia: un solo ruolo, niente checkbox ).
- "member" (default) ha solo i permessi granulari salvati in GroupMember.perms.

Regola fondamentale: NON puoi dare a un altro un permesso che tu non hai.
Così un semplice membro promosso ad "admin parziale" non può creare admin.
"""

from __future__ import annotations

# chiave -> descrizione mostrata nell'interfaccia
PERMISSIONS: dict[str, str] = {
    "expense_manage": "Annullare qualsiasi spesa (non solo le tue)",
    "payment_manage": "Eliminare qualsiasi pagamento (non solo i tuoi)",
    "group_edit": "Modificare il gruppo (nome, tipo, valuta)",
    "members_manage": "Gestire membri, permessi e codice invito",
}

ALL_PERMS = frozenset(PERMISSIONS)
ROLES = ("owner", "admin", "member")
EDITABLE_ROLES = ("member", "admin")  # "owner" non è assegnabile: è il creatore


def effective_perms(role: str | None, perms: str | None) -> frozenset[str]:
    """Permessi EFFETTIVI di un membro.

    owner/admin = tutto. Altrimenti solo quelli salvati (e solo se validi:
    chiavi vecchie o inventate vengono ignorate).
    """
    if role in ("owner", "admin"):
        return ALL_PERMS
    return frozenset(p for p in (perms or "").split(",") if p in ALL_PERMS)


def can(role: str | None, perms: str | None, perm: str) -> bool:
    return perm in effective_perms(role, perms)


def parse_perms(raw: list[str] | tuple[str, ...] | set[str] | None) -> str:
    """Lista di permessi -> stringa ordinata valida da salvare sul membro."""
    given = {p for p in (raw or []) if p in ALL_PERMS}
    return ",".join(sorted(given))


def clamped_perms(actor_role: str, actor_perms: str | None, wanted: list[str]) -> str:
    """Permessi che l'attore vuole dare, tagliati a quelli che lui stesso ha."""
    grantable = effective_perms(actor_role, actor_perms)
    return parse_perms(set(wanted) & grantable)
