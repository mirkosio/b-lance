"""API JSON per l'app Android nativa (Flutter).

Stessa logica del sito, zero duplicazione: qui si chiamano gli STESSI servizi
(compute_shares, compute_balances, parse_user_amount, get_rate/convert) che
usa il web. L'API è solo un secondo volto delle rotte esistenti.

Auth: stesso token di sessione del web (itsdangerous), passato come
`Authorization: Bearer <token>`. Il cookie bl_session viene accettato pure,
così i test e eventuali chiamate dal sito funzionano senza cambiamenti.

Errori: stessi testi italiani del web, con lo stesso codice di stato
(400 validazione, 401 non loggato, 403 permessi, 404 inesistente).
Gli importi si mandano come STRINGHE ("12.50") e arrivano in centesimi.
"""

from __future__ import annotations

import json
import re
import secrets
from datetime import datetime, timedelta, timezone
from decimal import Decimal, InvalidOperation

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from .account import anonymize_user
from .auth import (
    create_session_token,
    get_current_user,
    get_user_by_email,
    hash_password,
    verify_password,
)
from .core.categories import clean_category
from .core.currencies import CURRENCIES, get_currency, is_valid_currency, sorted_currencies
from .core.exchange import convert, current_rates, get_rate, rate_date, rate_source
from .core.money import MoneyError, format_amount, parse_user_amount
from .core.recurring import FREQUENCIES, materialize_due, next_occurrence
from .core.splitting import SplitMethod, compute_shares
from .database import get_db
from .export import group_csv
from .models import (
    Expense,
    Group,
    GroupMember,
    LoginAttempt,
    Payment,
    RecurringExpense,
    Share,
    User,
    utcnow,
)
from .permissions import ALL_PERMS, EDITABLE_ROLES, can, clamped_perms, effective_perms
from .services import compute_balances
from .throttle import (
    clear_login_failures,
    guard_login,
    guard_register,
    record_login_failure,
    record_register,
)

router = APIRouter(prefix="/api")

SESSION_COOKIE_NAME = "bl_session"


# ---------------------------------------------------------------- auth
def _token_from_request(request: Request) -> str | None:
    """Bearer header (app nativa) oppure cookie di sessione (browser/test)."""
    auth = request.headers.get("authorization", "")
    if auth:
        scheme, _, token = auth.partition(" ")
        if scheme.lower() == "bearer" and token:
            return token
    return request.cookies.get(SESSION_COOKIE_NAME)


def current_api_user(request: Request, db: Session = Depends(get_db)) -> User | None:
    return get_current_user(db, _token_from_request(request))


def require_api_user(
    user: User | None = Depends(current_api_user),
) -> User:
    if user is None:
        raise HTTPException(status_code=401, detail="Devi effettuare il login")
    return user


# ---------------------------------------------------------------- permessi (stessi del web)
def _group_for_user(db: Session, group_id: int, user: User) -> Group:
    group = db.get(Group, group_id)
    if group is None:
        raise HTTPException(status_code=404, detail="Gruppo non trovato")
    member = db.scalar(
        select(GroupMember).where(
            GroupMember.group_id == group.id, GroupMember.user_id == user.id
        )
    )
    if member is None:
        raise HTTPException(status_code=403, detail="Non fai parte di questo gruppo")
    return group


def _member_row(db: Session, group_id: int, user: User) -> GroupMember:
    member = db.scalar(
        select(GroupMember).where(
            GroupMember.group_id == group_id, GroupMember.user_id == user.id
        )
    )
    if member is None:
        raise HTTPException(status_code=403, detail="Non fai parte di questo gruppo")
    return member


def _require_perm(
    db: Session, group_id: int, user: User, perm: str
) -> tuple[Group, GroupMember]:
    group = _group_for_user(db, group_id, user)
    member = _member_row(db, group_id, user)
    if not can(member.role, member.perms, perm):
        raise HTTPException(status_code=403, detail="Non hai il permesso per questa azione")
    return group, member


def _make_invite_code() -> str:
    # Niente 0/O/I: il codice si scrive a mano su WhatsApp senza errori.
    alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    return "".join(secrets.choice(alphabet) for _ in range(8))


def _member_ids(db: Session, group_id: int) -> set[int]:
    return set(
        db.scalars(select(GroupMember.user_id).where(GroupMember.group_id == group_id)).all()
    )


# ---------------------------------------------------------------- serializzazioni
def _user_json(u: User) -> dict:
    return {
        "id": u.id,
        "name": u.name,
        "email": u.email,
        "color": u.color,
        "handle": u.handle,
    }


def _public_user_json(u: User) -> dict:
    """Dati visibili cercando un handle: mai l'email."""
    return {"id": u.id, "name": u.name, "color": u.color, "handle": u.handle}


def _group_json(g: Group) -> dict:
    return {
        "id": g.id,
        "name": g.name,
        "kind": g.kind,
        "base_currency": g.base_currency,
        "invite_code": g.invite_code,
        "created_by": g.created_by,
    }


def _currency_json(c) -> dict:
    return {"code": c.code, "name": c.name, "symbol": c.symbol, "exponent": c.exponent}


# ---------------------------------------------------------------- body
class RegisterIn(BaseModel):
    name: str
    email: str
    password: str


class LoginIn(BaseModel):
    email: str
    password: str


class MePatchIn(BaseModel):
    name: str | None = None
    color: str | None = None
    handle: str | None = None


class PasswordIn(BaseModel):
    current: str
    new: str


class GroupIn(BaseModel):
    name: str
    base_currency: str = "EUR"
    kind: str = "other"


class GroupPatchIn(BaseModel):
    name: str | None = None
    kind: str | None = None
    base_currency: str | None = None


class ExpenseIn(BaseModel):
    description: str
    amount: str
    paid_by: int
    members: list[int]
    split_method: str = "even"
    currency: str = ""
    fx_rate: str = ""
    category: str = "other"
    # uid -> "importo" (exact) o "percentuale" (percent), come stringhe.
    values: dict[str, str] | None = None


class RecurringIn(ExpenseIn):
    frequency: str = "monthly"
    interval: int = 1
    # ISO date del primo giro; vuoto = oggi.
    start_date: str = ""


class RecurringPatchIn(BaseModel):
    active: bool


class PaymentIn(BaseModel):
    from_user: int
    to_user: int
    amount: str
    note: str = ""


class JoinIn(BaseModel):
    code: str


class MemberPatchIn(BaseModel):
    role: str | None = None
    perms: list[str] | None = None


class MemberInviteIn(BaseModel):
    handle: str


# ---------------------------------------------------------------- auth
@router.post("/register")
def api_register(data: RegisterIn, request: Request, db: Session = Depends(get_db)):
    guard_register(db, request)
    email = data.email.strip().lower()
    if len(data.password) < 6:
        raise HTTPException(400, detail="La password deve avere almeno 6 caratteri.")
    if not data.name.strip():
        raise HTTPException(400, detail="Il nome non può essere vuoto")
    if get_user_by_email(db, email):
        raise HTTPException(400, detail="Esiste già un account con questa email.")
    palette = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9", "#8b5cf6"]
    user = User(
        name=data.name.strip(),
        email=email,
        password_hash=hash_password(data.password),
        color=palette[len(email) % len(palette)],
    )
    db.add(user)
    db.commit()
    record_register(db, request)
    return {
        "token": create_session_token(user.id, user.session_version),
        "user": _user_json(user),
    }


@router.post("/login")
def api_login(data: LoginIn, request: Request, db: Session = Depends(get_db)):
    guard_login(db, request, data.email)
    user = get_user_by_email(db, data.email)
    if not user or not verify_password(data.password, user.password_hash):
        record_login_failure(db, request, data.email)
        raise HTTPException(401, detail="Email o password errati.")
    clear_login_failures(db, data.email)
    return {
        "token": create_session_token(user.id, user.session_version),
        "user": _user_json(user),
    }


@router.post("/logout-all")
def api_logout_all(
    user: User = Depends(require_api_user), db: Session = Depends(get_db)
):
    """Revoca tutti i token dell'utente, compreso quello attuale.

    Restituisce un token nuovo così il dispositivo che ha fatto la richiesta
    resta collegato: gli altri vengono buttati fuori.
    """
    user.session_version += 1
    db.commit()
    return {
        "ok": True,
        "token": create_session_token(user.id, user.session_version),
    }


@router.get("/me")
def api_me(user: User = Depends(require_api_user)):
    return {"user": _user_json(user)}


_HANDLE_RE = re.compile(r"^[a-z0-9_]{3,20}$")
_COLOR_RE = re.compile(r"^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$")


def _clean_handle(raw: str | None) -> str | None:
    handle = (raw or "").strip().lower().lstrip("@")
    if not handle:
        return None
    if not _HANDLE_RE.match(handle):
        raise HTTPException(
            400,
            detail="Lo username deve avere 3-20 caratteri: lettere minuscole, numeri o _",
        )
    return handle


@router.patch("/me")
def api_update_me(
    data: MePatchIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Aggiorna nome, colore e username. Campi assenti = non toccare."""
    if "name" in data.model_fields_set:
        name = (data.name or "").strip()
        if not 1 <= len(name) <= 60:
            raise HTTPException(400, detail="Il nome deve avere da 1 a 60 caratteri")
        user.name = name
    if "color" in data.model_fields_set:
        color = (data.color or "").strip()
        if not _COLOR_RE.match(color):
            raise HTTPException(400, detail="Colore non valido (es. #5F8D6E)")
        user.color = color.upper()
    if "handle" in data.model_fields_set:
        handle = _clean_handle(data.handle)
        if handle:
            taken = db.scalar(
                select(User).where(User.handle == handle, User.id != user.id)
            )
            if taken:
                raise HTTPException(409, detail=f"@{handle} è già in uso")
        user.handle = handle
    db.commit()
    return {"user": _user_json(user)}


@router.post("/me/password")
def api_change_password(
    data: PasswordIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Cambia password da loggato e restituisce un token nuovo.

    Il cambio incrementa session_version: gli altri dispositivi vengono
    disconnessi. Il token restituito mantiene attivo solo questo.
    """
    if not verify_password(data.current, user.password_hash):
        raise HTTPException(400, detail="Password attuale errata")
    if len(data.new) < 6:
        raise HTTPException(400, detail="La nuova password deve avere almeno 6 caratteri")
    user.password_hash = hash_password(data.new)
    user.session_version += 1
    db.commit()
    return {
        "ok": True,
        "token": create_session_token(user.id, user.session_version),
    }


@router.delete("/me")
def api_delete_me(
    user: User = Depends(require_api_user), db: Session = Depends(get_db)
):
    """Elimina l'account ANONIMIZZANDO l'utente.

    Le spese e i pagamenti restano intatti (storico del gruppo). Il nome
    diventa "Ex-membro", email/password/handle spariscono, i token muoiono.
    """
    anonymize_user(db, user)
    return {"ok": True}


@router.get("/users/search")
def api_search_users(
    q: str = "",
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Cerca persone per username. Nessuna rubrica, solo username pubblici."""
    needle = (q or "").strip().lower().lstrip("@")
    if len(needle) < 2:
        return {"users": []}
    users = db.scalars(
        select(User)
        .where(
            User.id != user.id,
            User.handle.is_not(None),
            User.handle.ilike(f"{needle}%"),
        )
        .order_by(User.handle)
        .limit(10)
    ).all()
    return {"users": [_public_user_json(u) for u in users]}


@router.get("/meta")
def api_meta():
    """Dati statici per l'app: valute e quali hanno tassi automatici."""
    rates = current_rates()
    return {
        "currencies": [_currency_json(c) for c in sorted_currencies()],
        "no_rate_codes": sorted(c for c in CURRENCIES if c != "EUR" and c not in rates),
        "rate_source": rate_source(),
        "rate_date": rate_date(),
    }


# ---------------------------------------------------------------- gruppi
@router.get("/groups")
def api_groups(user: User = Depends(require_api_user), db: Session = Depends(get_db)):
    """Dashboard: i gruppi dell'utente con il SUO saldo per ogni gruppo."""
    groups = db.scalars(
        select(Group)
        .join(GroupMember, GroupMember.group_id == Group.id)
        .where(GroupMember.user_id == user.id)
    ).all()

    net_by_currency: dict[str, int] = {}
    out: list[dict] = []
    for g in groups:
        materialize_due(db, g.id)
        view = compute_balances(db, g)
        mine = next((m for m in view.members if m.user_id == user.id), None)
        net = mine.net_minor if mine else 0
        net_by_currency[g.base_currency] = net_by_currency.get(g.base_currency, 0) + net
        item = _group_json(g)
        item["member_count"] = view.active_count()
        item["net_minor"] = net
        item["total_expenses_minor"] = view.total_expenses_minor()
        out.append(item)
    return {"groups": out, "net_by_currency": net_by_currency}


@router.get("/activity")
def api_activity(
    limit: int = 40,
    q: str = "",
    category: str = "",
    kind: str = "",
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Ultimi movimenti dell'utente, da TUTTI i suoi gruppi.

    Filtri opzionali: testo (`q`), categoria (`category`), tipo (`kind`).
    Una sola chiamata invece di scaricare il dettaglio di ogni gruppo.
    """
    limit = max(1, min(limit, 100))
    needle = (q or "").strip().lower()
    category = (category or "").strip().lower()
    kind = (kind or "").strip().lower()
    if kind not in ("", "expense", "payment"):
        raise HTTPException(400, detail="tipo di movimento non valido")
    if category:
        try:
            category = clean_category(category)
        except ValueError:
            raise HTTPException(400, detail="categoria non valida")

    group_ids = db.scalars(
        select(GroupMember.group_id).where(GroupMember.user_id == user.id)
    ).all()
    if not group_ids:
        return {"items": []}

    groups = {
        g.id: g
        for g in db.scalars(select(Group).where(Group.id.in_(group_ids))).all()
    }
    for gid in group_ids:
        materialize_due(db, gid)
    fetch = 1000 if needle else max(limit * 2, 80)
    expenses = []
    payments = []
    if kind != "payment":
        expenses = db.scalars(
            select(Expense)
            .where(Expense.group_id.in_(group_ids))
            .order_by(Expense.created_at.desc())
            .limit(fetch)
        ).all()
    if kind != "expense" and not category:
        payments = db.scalars(
            select(Payment)
            .where(Payment.group_id.in_(group_ids))
            .order_by(Payment.created_at.desc())
            .limit(fetch)
        ).all()

    user_ids = {e.paid_by for e in expenses} | {
        p.from_user for p in payments
    } | {p.to_user for p in payments}
    names = dict(
        db.execute(select(User.id, User.name).where(User.id.in_(user_ids))).all()
    )

    items: list[dict] = []
    for e in expenses:
        g = groups.get(e.group_id)
        if g is None:
            continue
        if category and e.category != category:
            continue
        items.append(
            {
                "kind": "expense",
                "id": e.id,
                "group_id": g.id,
                "group_name": g.name,
                "title": e.description,
                "subtitle": f"ha pagato {names.get(e.paid_by, '?')}",
                "category": e.category,
                "amount_minor": e.amount_minor,
                "currency": e.currency,
                "base_amount_minor": e.base_amount_minor,
                "base_currency": e.base_currency,
                "created_at": e.created_at.isoformat() if e.created_at else None,
                "voided": e.voided_at is not None,
            }
        )
    for p in payments:
        g = groups.get(p.group_id)
        if g is None:
            continue
        items.append(
            {
                "kind": "payment",
                "id": p.id,
                "group_id": g.id,
                "group_name": g.name,
                "title": f"{names.get(p.from_user, '?')} → {names.get(p.to_user, '?')}",
                "subtitle": (p.note or "").strip(),
                "category": "",
                "amount_minor": p.amount_minor,
                "currency": p.currency,
                "base_amount_minor": p.amount_minor,
                "base_currency": p.currency,
                "created_at": p.created_at.isoformat() if p.created_at else None,
                "voided": p.voided_at is not None,
            }
        )

    if needle:
        items = [
            i
            for i in items
            if needle in i["title"].lower()
            or needle in i["subtitle"].lower()
            or needle in i["group_name"].lower()
        ]
    items.sort(key=lambda x: x["created_at"] or "", reverse=True)
    return {"items": items[:limit]}


@router.post("/groups")
def api_create_group(
    data: GroupIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    code = (data.base_currency or "EUR").strip().upper()
    if not is_valid_currency(code):
        raise HTTPException(400, detail=f"Valuta non valida: {code}")
    group = Group(
        name=data.name.strip(),
        kind=(data.kind.strip() or "other")[:32],
        base_currency=code,
        invite_code=_make_invite_code(),
        created_by=user.id,
    )
    db.add(group)
    db.flush()
    db.add(GroupMember(group_id=group.id, user_id=user.id, role="owner"))
    db.commit()
    return _group_json(group)


@router.get("/groups/{group_id}")
def api_group_detail(
    group_id: int,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    group = _group_for_user(db, group_id, user)
    member = _member_row(db, group_id, user)
    materialize_due(db, group.id)
    view = compute_balances(db, group)
    names = {m.user_id: m.name for m in view.members}

    expenses = db.scalars(
        select(Expense)
        .options(selectinload(Expense.shares))
        .where(Expense.group_id == group.id)
        .order_by(Expense.created_at.desc())
    ).all()
    expenses_json = [
        {
            "id": e.id,
            "description": e.description,
            "category": e.category,
            "amount_minor": e.amount_minor,
            "currency": e.currency,
            "base_amount_minor": e.base_amount_minor,
            "base_currency": e.base_currency,
            "fx_rate": e.fx_rate,
            "split_method": e.split_method,
            "paid_by": e.paid_by,
            "created_by": e.created_by,
            "payer_name": names.get(e.paid_by, "?"),
            "created_at": e.created_at.isoformat() if e.created_at else None,
            "voided_at": e.voided_at.isoformat() if e.voided_at else None,
            "shares": [
                {"user_id": s.user_id, "amount_minor": s.amount_minor} for s in e.shares
            ],
        }
        for e in expenses
    ]

    payments = db.scalars(
        select(Payment)
        .where(Payment.group_id == group.id)
        .order_by(Payment.created_at.desc())
    ).all()
    payments_json = [
        {
            "id": p.id,
            "from_user": p.from_user,
            "from_name": names.get(p.from_user, "?"),
            "to_user": p.to_user,
            "to_name": names.get(p.to_user, "?"),
            "amount_minor": p.amount_minor,
            "currency": p.currency,
            "note": p.note,
            "created_at": p.created_at.isoformat() if p.created_at else None,
            "voided": p.voided_at is not None,
            "voided_at": p.voided_at.isoformat() if p.voided_at else None,
        }
        for p in payments
    ]

    perms = effective_perms(member.role, member.perms)
    return {
        "group": _group_json(group),
        "members": [
            {
                "user_id": m.user_id,
                "name": m.name,
                "color": m.color,
                "net_minor": m.net_minor,
                "paid_minor": m.paid_minor,
                "owed_minor": m.owed_minor,
                "role": m.role,
                "perms": sorted(m.perm_set),
                "active": m.active,
                "is_me": m.user_id == user.id,
            }
            for m in view.members
        ],
        "transfers": [
            {"payer_id": t.payer_id, "payee_id": t.payee_id, "amount_minor": t.amount_minor}
            for t in view.transfers
        ],
        "expenses": expenses_json,
        "payments": payments_json,
        "total_expenses_minor": view.total_expenses_minor(),
        "perms": sorted(perms),
        "is_owner": member.role == "owner",
    }


@router.patch("/groups/{group_id}")
def api_edit_group(
    group_id: int,
    data: GroupPatchIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    group, _ = _require_perm(db, group_id, user, "group_edit")
    if data.name is not None:
        clean = data.name.strip()
        if not clean:
            raise HTTPException(400, detail="Il nome non può essere vuoto")
        if len(clean) > 160:
            raise HTTPException(400, detail="Nome troppo lungo (max 160)")
        group.name = clean
    if data.kind is not None:
        group.kind = (data.kind.strip() or "other")[:32]
    if data.base_currency is not None:
        code = data.base_currency.strip().upper()
        if not is_valid_currency(code):
            raise HTTPException(400, detail=f"Valuta non valida: {code}")
        if code != group.base_currency:
            has_expense = db.scalar(
                select(Expense.id).where(Expense.group_id == group.id).limit(1)
            )
            has_payment = db.scalar(
                select(Payment.id).where(Payment.group_id == group.id).limit(1)
            )
            if has_expense is not None or has_payment is not None:
                raise HTTPException(
                    400,
                    detail=(
                        "Non puoi cambiare la valuta: ci sono già spese o "
                        "pagamenti nel gruppo."
                    ),
                )
            group.base_currency = code
    db.commit()
    return _group_json(group)


@router.delete("/groups/{group_id}")
def api_delete_group(
    group_id: int,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    group = _group_for_user(db, group_id, user)
    member = _member_row(db, group_id, user)
    if member.role != "owner":
        raise HTTPException(403, detail="Solo il creatore del gruppo può eliminarlo")
    db.query(RecurringExpense).filter(
        RecurringExpense.group_id == group.id
    ).delete(synchronize_session=False)
    db.delete(group)  # cascata ORM: membri, quote, spese, pagamenti
    db.commit()
    return {"ok": True}


@router.post("/groups/{group_id}/invite")
def api_regenerate_invite(
    group_id: int,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    group, _ = _require_perm(db, group_id, user, "members_manage")
    group.invite_code = _make_invite_code()
    db.commit()
    return {"invite_code": group.invite_code}


@router.post("/groups/join")
def api_join(
    data: JoinIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    group = db.scalar(select(Group).where(Group.invite_code == data.code.strip().upper()))
    if group is None:
        raise HTTPException(404, detail="Codice non valido")
    existing = db.scalar(
        select(GroupMember).where(
            GroupMember.group_id == group.id, GroupMember.user_id == user.id
        )
    )
    if existing is None:
        db.add(GroupMember(group_id=group.id, user_id=user.id, role="member"))
        db.commit()
    return _group_json(group)


@router.get("/invites/{code}")
def api_invite_preview(code: str, db: Session = Depends(get_db)):
    """Anteprima dell'invito: serve a mostrare "Ti invitano a X" prima del join."""
    group = db.scalar(select(Group).where(Group.invite_code == code.strip().upper()))
    if group is None:
        raise HTTPException(404, detail="Codice non valido")
    n = len(
        db.scalars(select(GroupMember.id).where(GroupMember.group_id == group.id)).all()
    )
    return {
        "name": group.name,
        "base_currency": group.base_currency,
        "member_count": n,
    }


# ---------------------------------------------------------------- ricorrenti
def _recurring_json(rule: RecurringExpense) -> dict:
    return {
        "id": rule.id,
        "group_id": rule.group_id,
        "description": rule.description,
        "category": rule.category,
        "amount_minor": rule.amount_minor,
        "currency": rule.currency,
        "base_amount_minor": rule.base_amount_minor,
        "split_method": rule.split_method,
        "paid_by": rule.paid_by,
        "members": json.loads(rule.members_json or "[]"),
        "frequency": rule.frequency,
        "interval": rule.interval,
        "next_run": rule.next_run.isoformat() if rule.next_run else None,
        "active": bool(rule.active),
        "created_by": rule.created_by,
    }


@router.get("/groups/{group_id}/recurring")
def api_list_recurring(
    group_id: int,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    group = _group_for_user(db, group_id, user)
    materialize_due(db, group.id)
    rules = db.scalars(
        select(RecurringExpense)
        .where(RecurringExpense.group_id == group.id)
        .order_by(RecurringExpense.created_at.desc())
    ).all()
    return {"rules": [_recurring_json(r) for r in rules]}


@router.post("/groups/{group_id}/recurring")
def api_create_recurring(
    group_id: int,
    data: RecurringIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    group = _group_for_user(db, group_id, user)
    frequency = (data.frequency or "monthly").strip().lower()
    if frequency not in FREQUENCIES:
        raise HTTPException(400, detail="Frequenza non valida")
    if not 1 <= int(data.interval or 1) <= 12:
        raise HTTPException(400, detail="Intervallo non valido (1-12)")
    if data.start_date:
        try:
            start = datetime.fromisoformat(data.start_date.strip())
        except ValueError:
            raise HTTPException(400, detail="Data di inizio non valida")
        if start.tzinfo is None:
            start = start.replace(tzinfo=timezone.utc)
    else:
        start = datetime.now(timezone.utc)
    try:
        parsed = _prepare_expense(db, group, data)
        rule = RecurringExpense(
            group_id=group.id,
            description=parsed["description"],
            category=parsed["category"],
            amount_minor=parsed["amount_minor"],
            currency=parsed["currency"],
            base_amount_minor=parsed["base_amount_minor"],
            base_currency=parsed["base_currency"],
            fx_rate=parsed["fx_rate"],
            split_method=parsed["method"].value,
            paid_by=data.paid_by,
            members_json=json.dumps(parsed["member_ids"]),
            values_json=json.dumps(parsed["values"]),
            shares_json=json.dumps(parsed["shares"]),
            frequency=frequency,
            interval=int(data.interval or 1),
            next_run=start,
            created_by=user.id,
        )
        db.add(rule)
        db.commit()
        db.refresh(rule)
    except (MoneyError, ValueError, ArithmeticError) as exc:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(exc))

    # Se la prima data è oggi, la spesa compare subito.
    materialize_due(db, group.id)
    db.refresh(rule)
    return {"rule": _recurring_json(rule)}


@router.patch("/groups/{group_id}/recurring/{rule_id}")
def api_update_recurring(
    group_id: int,
    rule_id: int,
    data: RecurringPatchIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    group = _group_for_user(db, group_id, user)
    rule = db.scalar(
        select(RecurringExpense).where(
            RecurringExpense.id == rule_id,
            RecurringExpense.group_id == group.id,
        )
    )
    if rule is None:
        raise HTTPException(404, detail="Ricorrenza non trovata")
    member = _member_row(db, group.id, user)
    if rule.created_by != user.id and not can(
        member.role, member.perms, "expense_manage"
    ):
        raise HTTPException(403, detail="Non puoi modificare questa ricorrenza")
    rule.active = bool(data.active)
    db.commit()
    if rule.active:
        materialize_due(db, group.id)
        db.refresh(rule)
    return {"rule": _recurring_json(rule)}


@router.delete("/groups/{group_id}/recurring/{rule_id}")
def api_delete_recurring(
    group_id: int,
    rule_id: int,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    group = _group_for_user(db, group_id, user)
    rule = db.scalar(
        select(RecurringExpense).where(
            RecurringExpense.id == rule_id,
            RecurringExpense.group_id == group.id,
        )
    )
    if rule is None:
        raise HTTPException(404, detail="Ricorrenza non trovata")
    member = _member_row(db, group.id, user)
    if rule.created_by != user.id and not can(
        member.role, member.perms, "expense_manage"
    ):
        raise HTTPException(403, detail="Non puoi eliminare questa ricorrenza")
    db.delete(rule)
    db.commit()
    return {"ok": True}


@router.get("/groups/{group_id}/export.csv")
def api_export_csv(
    group_id: int,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    group = _group_for_user(db, group_id, user)
    content = group_csv(db, group)
    return Response(
        content=content,
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f'attachment; filename="b-lance-gruppo-{group.id}.csv"'
        },
    )


# ---------------------------------------------------------------- membri e permessi
def _target_member(db: Session, group: Group, target_user_id: int) -> GroupMember:
    target = db.scalar(
        select(GroupMember).where(
            GroupMember.group_id == group.id,
            GroupMember.user_id == target_user_id,
        )
    )
    if target is None:
        raise HTTPException(status_code=404, detail="Membro non trovato")
    return target


@router.post("/groups/{group_id}/members")
def api_add_member_by_handle(
    group_id: int,
    data: MemberInviteIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Aggiunge direttamente una persona al gruppo cercandola per username."""
    group, _actor = _require_perm(db, group_id, user, "members_manage")
    handle = _clean_handle(data.handle)
    if not handle:
        raise HTTPException(400, detail="Scrivi uno username")
    target_user = db.scalar(select(User).where(User.handle == handle))
    if target_user is None:
        raise HTTPException(404, detail=f"Nessuno con username @{handle}")
    existing = db.scalar(
        select(GroupMember).where(
            GroupMember.group_id == group.id,
            GroupMember.user_id == target_user.id,
        )
    )
    if existing is not None:
        raise HTTPException(400, detail=f"@{handle} è già nel gruppo")
    member = GroupMember(group_id=group.id, user_id=target_user.id, role="member")
    db.add(member)
    db.commit()
    return {
        "ok": True,
        "member": {
            "user_id": target_user.id,
            "name": target_user.name,
            "handle": target_user.handle,
            "color": target_user.color,
            "role": "member",
            "perms": [],
        },
    }


@router.patch("/groups/{group_id}/members/{target_user_id}")
def api_update_member(
    group_id: int,
    target_user_id: int,
    data: MemberPatchIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Cambia ruolo e permessi di un membro (serve members_manage).

    Stesse regole del sito: il creatore non si tocca, non ci si modifica da
    soli, e nessuno può dare permessi che non ha.
    """
    group, actor = _require_perm(db, group_id, user, "members_manage")
    target = _target_member(db, group, target_user_id)

    if target.id == actor.id:
        raise HTTPException(400, detail="Non puoi modificare te stesso")
    if target.role == "owner":
        raise HTTPException(400, detail="Il creatore del gruppo non si tocca")

    role = (data.role or target.role).strip()
    if role not in EDITABLE_ROLES:
        raise HTTPException(400, detail="Ruolo non valido")

    grantable = effective_perms(actor.role, actor.perms)
    if role == "admin" and grantable != ALL_PERMS:
        raise HTTPException(
            403, detail="Solo il creatore o un admin può promuovere un admin"
        )

    wanted = (
        data.perms
        if data.perms is not None
        else [p for p in (target.perms or "").split(",") if p]
    )
    target.role = role
    target.perms = clamped_perms(actor.role, actor.perms, wanted)
    db.commit()
    return {
        "ok": True,
        "member": {
            "user_id": target.user_id,
            "role": target.role,
            "perms": sorted(effective_perms(target.role, target.perms)),
        },
    }


@router.delete("/groups/{group_id}/members/{target_user_id}")
def api_remove_member(
    group_id: int,
    target_user_id: int,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Toglie un membro dal gruppo (serve members_manage).

    Non si rimuove chi ha un saldo aperto: i soldi resterebbero sospesi.
    """
    group, actor = _require_perm(db, group_id, user, "members_manage")
    target = _target_member(db, group, target_user_id)

    if target.role == "owner":
        raise HTTPException(400, detail="Il creatore del gruppo non si tocca")
    if target.id == actor.id:
        raise HTTPException(400, detail="Non puoi rimuovere te stesso")

    view = compute_balances(db, group)
    target_net = next(
        (m.net_minor for m in view.members if m.user_id == target_user_id), 0
    )
    if target_net != 0:
        name = target.user.name
        amount = format_amount(abs(target_net), group.base_currency)
        if target_net > 0:
            detail = (
                f"{name} è ancora in credito di {amount}: "
                "salda prima di toglierlo dal gruppo"
            )
        else:
            detail = (
                f"{name} deve ancora {amount}: "
                "salda prima di toglierlo dal gruppo"
            )
        raise HTTPException(400, detail=detail)

    db.delete(target)
    db.commit()
    return {"ok": True}


# ---------------------------------------------------------------- spese
def _prepare_expense(db: Session, group: Group, data: ExpenseIn) -> dict:
    """Valida e calcola una spesa (stessa logica per creazione e modifica)."""
    exp_code = (data.currency or group.base_currency).strip().upper()
    exp_cur = get_currency(exp_code)  # solleva se sconosciuta

    amount_minor = parse_user_amount(data.amount, exponent=exp_cur.exponent)
    if amount_minor <= 0:
        raise MoneyError("l'importo deve essere maggiore di zero")
    method = SplitMethod(data.split_method)
    member_ids = sorted(set(int(m) for m in data.members))
    if not member_ids:
        raise MoneyError("seleziona almeno una persona")

    valid_ids = _member_ids(db, group.id)
    if not set(member_ids).issubset(valid_ids):
        raise MoneyError("partecipanti non validi")
    if data.paid_by not in valid_ids:
        raise MoneyError("chi ha pagato non è un membro del gruppo")

    if exp_code == group.base_currency:
        base_amount_minor = amount_minor
        rate_str = "1.0"
    else:
        manual = data.fx_rate.strip() if data.fx_rate and data.fx_rate.strip() else None
        rate = get_rate(exp_code, group.base_currency, manual=manual)
        base_amount_minor = convert(
            amount_minor, exp_code, group.base_currency, manual=manual
        )
        rate_str = str(rate)

    vals = data.values or {}
    if method == SplitMethod.EVEN:
        shares = compute_shares(base_amount_minor, method, member_ids)
    elif method == SplitMethod.EXACT:
        raw: dict[int, int] = {}
        for uid in member_ids:
            raw[uid] = parse_user_amount(
                vals.get(str(uid), "0") or "0", exponent=exp_cur.exponent
            )
        shares = compute_shares(base_amount_minor, method, member_ids, exact_shares=raw)
    else:  # PERCENT
        pcts: dict[int, Decimal] = {}
        for uid in member_ids:
            val = vals.get(str(uid), "0") or "0"
            try:
                pcts[uid] = Decimal(str(val).replace(",", "."))
            except InvalidOperation:
                raise MoneyError("percentuale non valida: controlla i campi")
        shares = compute_shares(base_amount_minor, method, member_ids, percentages=pcts)

    description = data.description.strip()
    if not description:
        raise MoneyError("scrivi cosa hai pagato")
    category = clean_category(data.category)
    return {
        "description": description,
        "category": category,
        "amount_minor": amount_minor,
        "currency": exp_code,
        "base_amount_minor": base_amount_minor,
        "base_currency": group.base_currency,
        "fx_rate": rate_str,
        "method": method,
        "member_ids": member_ids,
        "shares": shares,
        "values": vals,
    }


def _expense_json(expense: Expense, names: dict[int, str]) -> dict:
    return {
        "id": expense.id,
        "description": expense.description,
        "category": expense.category,
        "amount_minor": expense.amount_minor,
        "currency": expense.currency,
        "base_amount_minor": expense.base_amount_minor,
        "split_method": expense.split_method,
        "paid_by": expense.paid_by,
        "payer_name": names.get(expense.paid_by, "?"),
        "created_at": expense.created_at.isoformat() if expense.created_at else None,
        "updated_at": expense.updated_at.isoformat() if expense.updated_at else None,
        "voided_at": expense.voided_at.isoformat() if expense.voided_at else None,
        "shares": [
            {"user_id": s.user_id, "amount_minor": s.amount_minor}
            for s in expense.shares
        ],
    }


@router.post("/groups/{group_id}/expenses")
def api_add_expense(
    group_id: int,
    data: ExpenseIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Registra una spesa: stessa logica della rotta web, stessi controlli."""
    group = _group_for_user(db, group_id, user)
    try:
        parsed = _prepare_expense(db, group, data)
        expense = Expense(
            group_id=group.id,
            paid_by=data.paid_by,
            description=parsed["description"],
            category=parsed["category"],
            amount_minor=parsed["amount_minor"],
            currency=parsed["currency"],
            base_amount_minor=parsed["base_amount_minor"],
            base_currency=parsed["base_currency"],
            fx_rate=parsed["fx_rate"],
            split_method=parsed["method"].value,
            created_by=user.id,
        )
        db.add(expense)
        db.flush()
        for uid, share_amount in parsed["shares"].items():
            db.add(Share(expense_id=expense.id, user_id=uid, amount_minor=share_amount))
        db.commit()
    except (MoneyError, ValueError, ArithmeticError) as exc:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(exc))

    db.refresh(expense)
    names = {m.user_id: m.name for m in compute_balances(db, group).members}
    return _expense_json(expense, names)


@router.patch("/groups/{group_id}/expenses/{expense_id}")
def api_edit_expense(
    group_id: int,
    expense_id: int,
    data: ExpenseIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Modifica una spesa (importo, valuta, partecipanti, categoria)."""
    group = _group_for_user(db, group_id, user)
    expense = db.scalar(
        select(Expense)
        .options(selectinload(Expense.shares))
        .where(Expense.id == expense_id, Expense.group_id == group.id)
    )
    if expense is None:
        raise HTTPException(status_code=404, detail="Spesa non trovata")
    member = _member_row(db, group_id, user)
    if expense.created_by != user.id and not can(
        member.role, member.perms, "expense_manage"
    ):
        raise HTTPException(
            status_code=403,
            detail="Puoi modificare solo le spese che hai inserito tu",
        )
    if expense.voided_at is not None:
        raise HTTPException(status_code=400, detail="Una spesa annullata non si modifica")

    try:
        parsed = _prepare_expense(db, group, data)
        expense.paid_by = data.paid_by
        expense.description = parsed["description"]
        expense.category = parsed["category"]
        expense.amount_minor = parsed["amount_minor"]
        expense.currency = parsed["currency"]
        expense.base_amount_minor = parsed["base_amount_minor"]
        expense.base_currency = parsed["base_currency"]
        expense.fx_rate = parsed["fx_rate"]
        expense.split_method = parsed["method"].value
        expense.updated_at = utcnow()
        for old in list(expense.shares):
            db.delete(old)
        db.flush()
        for uid, share_amount in parsed["shares"].items():
            db.add(Share(expense_id=expense.id, user_id=uid, amount_minor=share_amount))
        db.commit()
    except (MoneyError, ValueError, ArithmeticError) as exc:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(exc))

    db.refresh(expense)
    names = {m.user_id: m.name for m in compute_balances(db, group).members}
    return _expense_json(expense, names)


@router.delete("/groups/{group_id}/expenses/{expense_id}")
def api_void_expense(
    group_id: int,
    expense_id: int,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Annulla una spesa (storico immutabile): la tua, o qualsiasi con expense_manage."""
    group = _group_for_user(db, group_id, user)
    expense = db.get(Expense, expense_id)
    if expense is None or expense.group_id != group.id:
        raise HTTPException(status_code=404, detail="Spesa non trovata")
    member = _member_row(db, group_id, user)
    if expense.created_by != user.id and not can(member.role, member.perms, "expense_manage"):
        raise HTTPException(
            status_code=403,
            detail="Puoi annullare solo le spese che hai inserito tu",
        )
    expense.voided_at = utcnow()
    db.commit()
    return {"ok": True}


# ---------------------------------------------------------------- pagamenti
@router.post("/groups/{group_id}/payments")
def api_add_payment(
    group_id: int,
    data: PaymentIn,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Registra un pagamento (anche parziale) fra due membri."""
    group = _group_for_user(db, group_id, user)
    try:
        amount_minor = parse_user_amount(data.amount, exponent=2)
        if amount_minor <= 0:
            raise MoneyError("l'importo deve essere maggiore di zero")
        if data.from_user == data.to_user:
            raise MoneyError("scegli due persone diverse")
        valid_ids = _member_ids(db, group.id)
        if data.from_user not in valid_ids or data.to_user not in valid_ids:
            raise MoneyError("uno o entrambi i membri non fanno parte del gruppo")
        payment = Payment(
            group_id=group.id,
            from_user=data.from_user,
            to_user=data.to_user,
            amount_minor=amount_minor,
            currency=group.base_currency,
            note=data.note.strip() or None,
        )
        db.add(payment)
        db.commit()
    except (MoneyError, ValueError) as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    names = {m.user_id: m.name for m in compute_balances(db, group).members}
    return {
        "id": payment.id,
        "from_user": payment.from_user,
        "from_name": names.get(payment.from_user, "?"),
        "to_user": payment.to_user,
        "to_name": names.get(payment.to_user, "?"),
        "amount_minor": payment.amount_minor,
        "currency": payment.currency,
        "note": payment.note,
        "created_at": payment.created_at.isoformat() if payment.created_at else None,
    }


@router.delete("/groups/{group_id}/payments/{payment_id}")
def api_delete_payment(
    group_id: int,
    payment_id: int,
    user: User = Depends(require_api_user),
    db: Session = Depends(get_db),
):
    """Annulla un pagamento: solo se sei coinvolto o hai payment_manage.

    Non si cancella: resta nello storico barrato e non entra nei saldi.
    """
    group = _group_for_user(db, group_id, user)
    payment = db.get(Payment, payment_id)
    if payment is None or payment.group_id != group.id:
        raise HTTPException(status_code=404, detail="Pagamento non trovato")
    member = _member_row(db, group_id, user)
    involved = payment.from_user == user.id or payment.to_user == user.id
    if not involved and not can(member.role, member.perms, "payment_manage"):
        raise HTTPException(
            status_code=403,
            detail="Puoi eliminare solo i pagamenti in cui sei coinvolto",
        )
    payment.voided_at = utcnow()
    db.commit()
    return {"ok": True}
