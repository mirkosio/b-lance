"""Applicazione B-Lance — FastAPI.

App per dividere le spese con amici: weekend, gite, cene.
Punti di forza rispetto ai competitor:
- importi in centesimi (niente conti che non tornano)
- pagamento parziale reale ("ha saldato 20 su 47,50")
- divisione in un numero minimo di bonifici
- invito via link/WhatsApp senza installare niente
"""

from __future__ import annotations

import secrets
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import Depends, FastAPI, Form, HTTPException, Request
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from .auth import (
    create_session_token,
    get_current_user,
    get_user_by_email,
    hash_password,
    verify_password,
)
from .core.currencies import is_valid_currency, sorted_currencies
from .core.money import MoneyError, format_amount, parse_user_amount
from .core.splitting import SplitMethod, compute_shares
from .database import get_db, init_db
from .models import Expense, Group, GroupMember, Payment, Share, User
from .services import compute_balances


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Crea le tabelle all'avvio. Sostituisce il deprecato on_event."""
    init_db()
    yield


BASE_DIR = Path(__file__).resolve().parent
app = FastAPI(title="B-Lance", lifespan=lifespan)
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

SESSION_COOKIE = "bl_session"


# ---------------------------------------------------------------- filtri Jinja
def _jinja_filters() -> None:
    # Formattazione generica (default EUR).
    templates.env.filters["money"] = lambda minor, code="EUR": format_amount(int(minor), code)
    templates.env.filters["eur"] = lambda minor: format_amount(int(minor), "EUR")
    templates.env.filters["euro_major"] = lambda minor: f"{int(minor) / 100:.2f}"


_jinja_filters()


# ---------------------------------------------------------------- dipendenze
def current_user(request: Request, db: Session = Depends(get_db)) -> User | None:
    """Utente loggato oppure None. Le rotte protette lo rifiutano."""
    token = request.cookies.get(SESSION_COOKIE)
    return get_current_user(db, token)


def require_user(user: User | None = Depends(current_user)) -> User:
    """Come current_user ma fallisce con redirect se non loggato."""
    if user is None:
        raise HTTPException(status_code=303, headers={"Location": "/login"})
    return user


def _make_invite_code() -> str:
    """Codice invito corto e leggibile (no caratteri ambigui)."""
    alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"
    return "".join(secrets.choice(alphabet) for _ in range(8))


def _get_group_for_user(db: Session, group_id: int, user: User) -> Group:
    """Carica un gruppo solo se l'utente ne fa parte, altrimenti 404."""
    group = db.get(Group, group_id)
    if group is None:
        raise HTTPException(status_code=404, detail="Gruppo non trovato")
    is_member = db.scalar(
        select(GroupMember.id).where(
            GroupMember.group_id == group_id, GroupMember.user_id == user.id
        )
    )
    if is_member is None:
        # Non riveliamo l'esistenza di gruppi a cui non partecipi.
        raise HTTPException(status_code=404, detail="Gruppo non trovato")
    return group


# ---------------------------------------------------------------- pagine pubbliche
@app.get("/health")
def health() -> dict:
    return {"status": "ok", "app": "b-lance"}


@app.get("/")
def home(request: Request, user: User | None = Depends(current_user), db: Session = Depends(get_db)):
    """Landing o dashboard. Se loggato mostro i suoi gruppi."""
    if user is None:
        return templates.TemplateResponse(request, "landing.html", {"request": request})

    groups = db.scalars(
        select(Group)
        .join(GroupMember, GroupMember.group_id == Group.id)
        .where(GroupMember.user_id == user.id)
        .options(selectinload(Group.members).selectinload(GroupMember.user))
    ).all()

    # Saldo aggregato PER VALUTA: non sommo mai EUR con JPY.
    # Ritorna {currency: net_minor} così il template mostra ogni valuta.
    net_by_currency: dict[str, int] = {}
    for g in groups:
        view = compute_balances(db, g)
        for m in view.members:
            if m.user_id == user.id:
                code = g.base_currency
                net_by_currency[code] = net_by_currency.get(code, 0) + m.net_minor

    return templates.TemplateResponse(
        request,
        "dashboard.html",
        {"request": request, "user": user, "groups": groups, "net_by_currency": net_by_currency},
    )


# ---------------------------------------------------------------- auth
@app.get("/register")
def register_form(request: Request, user: User | None = Depends(current_user)):
    if user:
        return RedirectResponse("/", status_code=303)
    return templates.TemplateResponse(request, "register.html", {"request": request})


@app.post("/register")
def register(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):
    email = email.strip().lower()
    if len(password) < 6:
        return templates.TemplateResponse(
            request,
            "register.html",
            {"request": request, "error": "La password deve avere almeno 6 caratteri."},
            status_code=400,
        )
    if get_user_by_email(db, email):
        return templates.TemplateResponse(
            request,
            "register.html",
            {"request": request, "error": "Esiste già un account con questa email."},
            status_code=400,
        )
    palette = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9", "#8b5cf6"]
    user = User(
        name=name.strip(),
        email=email,
        password_hash=hash_password(password),
        color=palette[len(email) % len(palette)],
    )
    db.add(user)
    db.commit()
    resp = RedirectResponse("/", status_code=303)
    resp.set_cookie(SESSION_COOKIE, create_session_token(user.id), httponly=True, samesite="lax")
    return resp


@app.get("/login")
def login_form(request: Request, user: User | None = Depends(current_user)):
    if user:
        return RedirectResponse("/", status_code=303)
    return templates.TemplateResponse(request, "login.html", {"request": request})


@app.post("/login")
def login(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.password_hash):
        return templates.TemplateResponse(
            request,
            "login.html",
            {"request": request, "error": "Email o password errati."},
            status_code=400,
        )
    resp = RedirectResponse("/", status_code=303)
    resp.set_cookie(SESSION_COOKIE, create_session_token(user.id), httponly=True, samesite="lax")
    return resp


@app.post("/logout")
def logout():
    resp = RedirectResponse("/", status_code=303)
    resp.delete_cookie(SESSION_COOKIE)
    return resp


# ---------------------------------------------------------------- gruppi
@app.get("/groups/new")
def new_group_form(request: Request, user: User = Depends(require_user)):
    return templates.TemplateResponse(
        request,
        "group_new.html",
        {"request": request, "user": user, "currencies": sorted_currencies()},
    )


@app.post("/groups/new")
def create_group(
    request: Request,
    name: str = Form(...),
    kind: str = Form("other"),
    base_currency: str = Form("EUR"),
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    code = (base_currency or "EUR").strip().upper()
    if not is_valid_currency(code):
        raise HTTPException(status_code=400, detail=f"Valuta non valida: {code}")
    group = Group(
        name=name.strip(),
        kind=kind.strip() or "other",
        base_currency=code,
        invite_code=_make_invite_code(),
        created_by=user.id,
    )
    db.add(group)
    db.flush()
    db.add(GroupMember(group_id=group.id, user_id=user.id, role="owner"))
    db.commit()
    return RedirectResponse(f"/groups/{group.id}", status_code=303)


@app.get("/groups/{group_id}")
def group_detail(
    request: Request,
    group_id: int,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    group = _get_group_for_user(db, group_id, user)
    view = compute_balances(db, group)

    expenses = db.scalars(
        select(Expense)
        .options(selectinload(Expense.shares))
        .where(Expense.group_id == group_id, Expense.voided_at.is_(None))
        .order_by(Expense.created_at.desc())
    ).all()
    for e in expenses:
        e.payer_name = next(
            (m.name for m in view.members if m.user_id == e.paid_by), "?"
        )

    payments = db.scalars(
        select(Payment)
        .where(Payment.group_id == group_id)
        .order_by(Payment.created_at.desc())
    ).all()
    for p in payments:
        p.from_name = next((m.name for m in view.members if m.user_id == p.from_user), "?")
        p.to_name = next((m.name for m in view.members if m.user_id == p.to_user), "?")

    return templates.TemplateResponse(
        request,
        "group_detail.html",
        {
            "request": request,
            "user": user,
            "group": group,
            "view": view,
            "expenses": expenses,
            "payments": payments,
            "split_methods": list(SplitMethod),
            "currencies": sorted_currencies(),
        },
    )


@app.post("/groups/{group_id}/invite")
def regenerate_invite(
    group_id: int,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    group = _get_group_for_user(db, group_id, user)
    group.invite_code = _make_invite_code()
    db.commit()
    return RedirectResponse(f"/groups/{group.id}", status_code=303)


@app.get("/join/{code}")
def join_by_code(
    code: str,
    request: Request,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    """Unisciti a un gruppo via codice/link condiviso."""
    group = db.scalar(select(Group).where(Group.invite_code == code.strip().upper()))
    if group is None:
        raise HTTPException(status_code=404, detail="Codice non valido")
    existing = db.scalar(
        select(GroupMember).where(
            GroupMember.group_id == group.id, GroupMember.user_id == user.id
        )
    )
    if existing is None:
        db.add(GroupMember(group_id=group.id, user_id=user.id, role="member"))
        db.commit()
    return RedirectResponse(f"/groups/{group.id}", status_code=303)


# ---------------------------------------------------------------- spese
@app.post("/groups/{group_id}/expenses")
async def add_expense(
    request: Request,
    group_id: int,
    description: str = Form(...),
    amount: str = Form(...),
    paid_by: int = Form(...),
    split_method: str = Form("even"),
    members: list[int] = Form(...),
    currency: str = Form(""),
    fx_rate: str = Form(""),
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    group = _get_group_for_user(db, group_id, user)
    try:
        # Valuta della spesa: default = valuta base del gruppo.
        exp_code = (currency or group.base_currency).strip().upper()
        from .core.currencies import get_currency

        exp_cur = get_currency(exp_code)  # solleva se sconosciuta

        amount_minor = parse_user_amount(amount, exponent=exp_cur.exponent)
        if amount_minor <= 0:
            raise MoneyError("l'importo deve essere maggiore di zero")
        method = SplitMethod(split_method)
        # Normalizzo: niente duplicati, ordine stabile.
        member_ids = sorted(set(int(m) for m in members))
        if not member_ids:
            raise MoneyError("seleziona almeno una persona")

        # Verifico che i partecipanti SIANO tutti membri del gruppo.
        valid_ids = set(
            db.scalars(
                select(GroupMember.user_id).where(GroupMember.group_id == group.id)
            ).all()
        )
        if not set(member_ids).issubset(valid_ids):
            raise MoneyError("partecipanti non validi")
        # FIX sicurezza: anche chi PAGA deve essere un membro.
        if paid_by not in valid_ids:
            raise MoneyError("chi ha pagato non è un membro del gruppo")

        # Conversione in valuta base (se diversa) con tasso al registro.
        from .core.exchange import convert, get_rate

        if exp_code == group.base_currency:
            base_amount_minor = amount_minor
            rate_str = "1.0"
        else:
            manual = fx_rate.strip() if fx_rate and fx_rate.strip() else None
            # Calcolo il tasso effettivo minor->minor per lo snapshot.
            rate = get_rate(exp_code, group.base_currency, manual=manual)
            base_amount_minor = convert(
                amount_minor, exp_code, group.base_currency, manual=manual
            )
            rate_str = str(rate)

        # Quote: per even si divide la base; per exact/percent servono i campi.
        if method == SplitMethod.EVEN:
            shares = compute_shares(base_amount_minor, method, member_ids)
        else:
            # Raccolgo i campi dinamici dal form (exact_<uid> / pct_<uid>).
            form = await request.form()
            if method == SplitMethod.EXACT:
                raw: dict[int, int] = {}
                for uid in member_ids:
                    val = form.get(f"exact_{uid}", "0")
                    raw[uid] = parse_user_amount(val, exponent=exp_cur.exponent)
                shares = compute_shares(base_amount_minor, method, member_ids, exact_shares=raw)
            else:  # PERCENT
                from decimal import Decimal

                pcts: dict[int, Decimal] = {}
                for uid in member_ids:
                    val = form.get(f"pct_{uid}", "0")
                    pcts[uid] = Decimal(str(val).replace(",", "."))
                shares = compute_shares(base_amount_minor, method, member_ids, percentages=pcts)

        expense = Expense(
            group_id=group.id,
            paid_by=paid_by,
            description=description.strip(),
            amount_minor=amount_minor,
            currency=exp_code,
            base_amount_minor=base_amount_minor,
            base_currency=group.base_currency,
            fx_rate=rate_str,
            split_method=method.value,
            created_by=user.id,
        )
        db.add(expense)
        db.flush()
        for uid, share_amount in shares.items():
            db.add(Share(expense_id=expense.id, user_id=uid, amount_minor=share_amount))
        db.commit()
    except (MoneyError, ValueError) as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return RedirectResponse(f"/groups/{group.id}", status_code=303)


@app.post("/groups/{group_id}/expenses/{expense_id}/void")
def void_expense(
    group_id: int,
    expense_id: int,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    """Annulla una spesa (non la cancella: storico immutabile)."""
    group = _get_group_for_user(db, group_id, user)
    expense = db.get(Expense, expense_id)
    if expense is None or expense.group_id != group.id:
        raise HTTPException(status_code=404)
    from .models import utcnow

    expense.voided_at = utcnow()
    db.commit()
    return RedirectResponse(f"/groups/{group.id}", status_code=303)


# ---------------------------------------------------------------- pagamenti
@app.post("/groups/{group_id}/payments")
def add_payment(
    request: Request,
    group_id: int,
    from_user: int = Form(...),
    to_user: int = Form(...),
    amount: str = Form(...),
    note: str = Form(""),
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    """Registra un pagamento (anche parziale) fra due membri."""
    group = _get_group_for_user(db, group_id, user)
    try:
        amount_minor = parse_user_amount(amount, exponent=2)
        if amount_minor <= 0:
            raise MoneyError("l'importo deve essere maggiore di zero")
        if from_user == to_user:
            raise MoneyError("scegli due persone diverse")
        # FIX sicurezza: entrambi devono essere membri del gruppo.
        valid_ids = set(
            db.scalars(
                select(GroupMember.user_id).where(GroupMember.group_id == group.id)
            ).all()
        )
        if from_user not in valid_ids or to_user not in valid_ids:
            raise MoneyError("uno o entrambi i membri non fanno parte del gruppo")
        payment = Payment(
            group_id=group.id,
            from_user=from_user,
            to_user=to_user,
            amount_minor=amount_minor,
            currency=group.base_currency,
            note=note.strip() or None,
        )
        db.add(payment)
        db.commit()
    except (MoneyError, ValueError) as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return RedirectResponse(f"/groups/{group.id}", status_code=303)
