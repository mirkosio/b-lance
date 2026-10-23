"""Applicazione B-Lance — FastAPI.

App per dividere le spese con amici: weekend, gite, cene.
Punti di forza rispetto ai competitor:
- importi in centesimi (niente conti che non tornano)
- pagamento parziale reale ("ha saldato 20 su 47,50")
- divisione in un numero minimo di bonifici
- invito via link/WhatsApp senza installare niente
"""

from __future__ import annotations

import asyncio
import logging
import secrets
from contextlib import asynccontextmanager
from pathlib import Path
from urllib.parse import quote, urlsplit

from fastapi import Depends, FastAPI, Form, HTTPException, Query, Request, Response
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import select
from sqlalchemy.exc import OperationalError
from sqlalchemy.exc import TimeoutError as PoolTimeoutError
from sqlalchemy.orm import Session, selectinload
from starlette.exceptions import HTTPException as StarletteHTTPException

from .account import anonymize_user
from .api import router as api_router
from .auth import (
    create_session_token,
    get_current_user,
    get_user_by_email,
    hash_password,
    verify_password,
)
from .core.currencies import is_valid_currency, sorted_currencies
from .core.categories import CATEGORIES, category_label, clean_category
from .core.money import MoneyError, format_amount, parse_user_amount
from .core.recurring import materialize_due
from .core.splitting import SplitMethod, compute_shares
from .database import get_db, init_db
from .export import group_csv, group_pdf
from .models import (
    Expense,
    Group,
    GroupMember,
    Payment,
    RecurringExpense,
    Share,
    User,
    utcnow,
)
from .permissions import (
    ALL_PERMS,
    EDITABLE_ROLES,
    PERMISSIONS,
    can,
    clamped_perms,
    effective_perms,
)
from .services import compute_balances
from .throttle import (
    clear_login_failures,
    guard_login,
    guard_register,
    record_login_failure,
    record_register,
)


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
logger = logging.getLogger("b-lance")


class DBColdStartRetry:
    """Riprova una volta se il database si sta svegliando.

    Neon gratuito si sospende dopo qualche minuto: la prima richiesta può
    fallire con errore di connessione e mandare un 500 al browser. Aspetto
    1,5s e riprovo una volta sola — a quel punto il DB è sveglio.

    Regole: solo GET (mai ritentare una mutazione) e solo se il server non
    ha ancora iniziato a rispondere. Middleware ASGI puro: richiamare l'app
    è lecito, mentre con il doppio call_next di BaseHTTP si finisce in
    anyio.EndOfStream.
    """

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http" or scope["method"] != "GET":
            await self.app(scope, receive, send)
            return

        started = False

        async def send_wrapper(message):
            nonlocal started
            if message["type"] == "http.response.start":
                started = True
            await send(message)

        for attempt in (1, 2):
            try:
                await self.app(scope, receive, send_wrapper)
                return
            except (OperationalError, PoolTimeoutError) as exc:
                if attempt == 2 or started:
                    raise
                logger.warning(
                    "DB non pronto su %s %s, riprovo: %s",
                    scope["method"],
                    scope["path"],
                    exc,
                )
                await asyncio.sleep(1.5)


app.add_middleware(DBColdStartRetry)

# API JSON per l'app Android nativa: stessa logica del web (app/api.py).
app.include_router(api_router)


@app.middleware("http")
async def service_worker_no_cache(request: Request, call_next):
    """sw.js MAI dalla cache del browser: altrimenti la PWA resta bloccata
    sulla versione vecchia (HTML nuovo + CSS vecchio = layout distrutto)."""
    response = await call_next(request)
    if request.url.path == "/static/sw.js":
        response.headers["Cache-Control"] = "no-cache, must-revalidate"
    return response


@app.middleware("http")
async def vercel_function_prefix(request: Request, call_next):
    """Su Vercel l'app e' montata sotto /api/index (preset FastAPI) e le
    richieste arrivano con quel prefisso nel path: senza toglierlo ogni
    rotta darebbe 404. In produzione normale (Render) il prefisso non
    c'e' e questo non fa nulla."""
    path = request.url.path
    if path == "/api/index":
        request.scope["path"] = "/"
    elif path.startswith("/api/index/"):
        request.scope["path"] = path[len("/api/index"):]
    return await call_next(request)


@app.middleware("http")
async def access_log(request: Request, call_next):
    """Log una riga su Vercel: metodo, path, status, user-agent.
    L'UA 'Dart/...' e' l'impronta dell'app Android: cosi' si vede subito
    se un telefono arriva davvero al server."""
    response = await call_next(request)
    ua = request.headers.get("user-agent", "-")
    print(f"[req] {request.method} {request.url.path} -> {response.status_code} ua={ua}")
    return response

# Pagina di errore "umana": niente "Internal Server Error" a freddo.
# Il traceback completo finisce comunque nei log di Render.
ERROR_PAGE = """<!doctype html>
<html lang="it"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Errore — B-Lance</title>
<style>
 body{background:#f5f4ef;color:#242b27;font-family:Inter,system-ui,-apple-system,sans-serif;
      display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
 .box{text-align:center;max-width:420px;padding:28px;background:#fff;border:1px solid #e5e2d8;
      border-radius:16px;box-shadow:0 10px 26px rgba(31,41,35,.06)}
 h1{font-size:1.35rem;margin:0 0 10px}
 p{color:#6c776f;line-height:1.5;font-size:.95rem}
 a{display:inline-block;margin-top:18px;padding:10px 18px;border-radius:11px;
   background:#47684f;color:#fff;text-decoration:none;font-weight:700}
</style></head>
<body><div class="box">
 <h1>Qualcosa è andato storto</h1>
 <p>Errore momentaneo: riprova tra qualche secondo. I saldi non sono persi.</p>
 <a href="/">Torna alla home</a>
</div></body></html>"""


def _back_with_err(request: Request, message: str) -> RedirectResponse:
    """Rimanda l'utente da dove veniva, col messaggio per il toast custom."""
    back = request.headers.get("referer", "")
    path = urlsplit(back).path if back else "/"
    if not path.startswith("/"):
        path = "/"
    sep = "&" if "?" in path else "?"
    return RedirectResponse(f"{path}{sep}err={quote(message)}", status_code=303)


@app.exception_handler(StarletteHTTPException)
async def http_error(request: Request, exc: StarletteHTTPException):
    """Niente pagine nere su bianco: nel browser l'errore torna come toast.

    I test e le chiamate API (che non mandano Accept: text/html) tengono il
    JSON classico con lo stesso codice di stato.
    """
    # Nota: gli headers di Starlette sono dict CASE-SENSITIVE ("Location",
    # non "location"): cercalo in modo case-insensitive.
    location = None
    if exc.headers:
        for key, value in exc.headers.items():
            if key.lower() == "location":
                location = value
                break
    if location:
        # Redirect voluti (es. require_user -> /login): rispettali com'erano.
        return RedirectResponse(location, status_code=exc.status_code)
    detail = exc.detail if isinstance(exc.detail, str) else ""
    if not detail or detail == "Not Found":
        detail = "Pagina non trovata"
    if request.url.path.startswith("/api/"):
        # L'app nativa riceve SEMPRE JSON, mai redirect HTML con ?err=.
        return JSONResponse({"detail": detail}, status_code=exc.status_code)
    if "text/html" in request.headers.get("accept", ""):
        return _back_with_err(request, detail)
    return JSONResponse({"detail": detail}, status_code=exc.status_code)


@app.exception_handler(Exception)
async def unhandled_error(request: Request, exc: Exception) -> HTMLResponse:
    """500: nel browser torni da dove venivi con un toast, mai testo crudo."""
    logger.exception("Errore non gestito su %s %s", request.method, request.url.path)
    if request.url.path.startswith("/api/"):
        # Mai HTML all'app: solo JSON con codice di stato.
        return JSONResponse(
            {"detail": "Errore momentaneo: riprova tra qualche secondo."},
            status_code=500,
        )
    if (
        "text/html" in request.headers.get("accept", "")
        and request.url.path != "/"
        and "err=" not in (request.url.query or "")
    ):
        # Loop-safe: se anche la home fa 500, qui non reindirizza più.
        return _back_with_err(
            request,
            "Errore momentaneo: riprova tra qualche secondo. I saldi non sono persi.",
        )
    return HTMLResponse(ERROR_PAGE, status_code=500)


@app.get("/.well-known/assetlinks.json", response_class=JSONResponse)
async def assetlinks():
    """Digital Asset Links: collega l'APK firmato al dominio.

    Senza questo file Chrome mostrerebbe la barra "sito non verificato"
    dentro l'app installata.
    """
    return [
        {
            "relation": ["delegate_permission/common.handle_all_urls"],
            "target": {
                "namespace": "android_app",
                "package_name": "com.mirkosio.blance",
                "sha256_cert_fingerprints": [
                    # Firma reale dell'APK (keystore b-lance).
                    "9F:D8:69:2E:7F:92:8E:B9:07:5D:5F:47:C9:F5:76:A7:45:A7:5B:E7:5C:6E:76:19:49:A2:49:84:6D:E2:F0:3C"
                ],
            },
        }
    ]


# ---------------------------------------------------------------- filtri Jinja
def _jinja_filters() -> None:
    # Formattazione generica (default EUR).
    templates.env.filters["money"] = lambda minor, code="EUR": format_amount(int(minor), code)
    templates.env.filters["eur"] = lambda minor: format_amount(int(minor), "EUR")
    templates.env.filters["euro_major"] = lambda minor: f"{int(minor) / 100:.2f}"
    # Valute senza tasso automatico: il form deve chiedere il tasso a mano.
    from .core.currencies import CURRENCIES
    from .core.exchange import RATES_VS_EUR

    templates.env.globals["no_rate_codes"] = sorted(
        c for c in CURRENCIES if c != "EUR" and c not in RATES_VS_EUR
    )
    templates.env.globals["categories"] = CATEGORIES
    templates.env.globals["category_label"] = category_label


_jinja_filters()


# ---------------------------------------------------------------- dipendenze
def current_user(request: Request, db: Session = Depends(get_db)) -> User | None:
    """Utente loggato oppure None. Le rotte protette lo rifiutano."""
    token = request.cookies.get(SESSION_COOKIE)
    return get_current_user(db, token)


def _safe_next(target: str | None) -> str:
    """Dove tornare dopo login/registrazione: solo pagine interne.

    Blocca l'open redirect: niente https://esterno, //dominio o backslash.
    """
    t = (target or "").strip()
    if t.startswith("/") and not t.startswith("//") and ":" not in t and "\\" not in t:
        return t
    return "/"


def require_user(
    request: Request, user: User | None = Depends(current_user)
) -> User:
    """Come current_user ma con redirect: dopo il login torni dove eri.

    Fondamentale per gli inviti: chi apre il link non loggato finisce su
    /login?next=/join/CODE e dopo essersi registrato entra DAVVERO nel gruppo.
    """
    if user is None:
        dest = quote(request.url.path, safe="/")
        raise HTTPException(status_code=303, headers={"Location": f"/login?next={dest}"})
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


def _member_row(db: Session, group_id: int, user: User) -> GroupMember:
    """Membership dell'utente nel gruppo (già verificata come membro)."""
    member = db.scalar(
        select(GroupMember).where(
            GroupMember.group_id == group_id, GroupMember.user_id == user.id
        )
    )
    if member is None:
        raise HTTPException(status_code=404, detail="Gruppo non trovato")
    return member


def _has_history(db: Session, group_id: int) -> bool:
    """True se il gruppo ha già spese o pagamenti registrati."""
    has_expense = db.scalar(
        select(Expense.id).where(Expense.group_id == group_id).limit(1)
    )
    has_payment = db.scalar(
        select(Payment.id).where(Payment.group_id == group_id).limit(1)
    )
    return has_expense is not None or has_payment is not None


def _require_perm(
    db: Session, group_id: int, user: User, perm: str
) -> tuple[Group, GroupMember]:
    """Gruppo + membership, solo se l'utente ha quel permesso.

    404 se non è membro (non si rivela il gruppo), 403 se manca il permesso.
    """
    group = _get_group_for_user(db, group_id, user)
    member = _member_row(db, group_id, user)
    if not can(member.role, member.perms, perm):
        raise HTTPException(
            status_code=403,
            detail="Non hai il permesso per fare questa operazione",
        )
    return group, member


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
        materialize_due(db, g.id)
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
def register_form(
    request: Request,
    user: User | None = Depends(current_user),
    next_url: str = Query("", alias="next"),
):
    if user:
        return RedirectResponse(_safe_next(next_url), status_code=303)
    return templates.TemplateResponse(
        request, "register.html", {"request": request, "next": next_url}
    )


@app.post("/register")
def register(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    next_url: str = Form("", alias="next"),
    db: Session = Depends(get_db),
):
    guard_register(db, request)
    email = email.strip().lower()
    if len(password) < 6:
        return templates.TemplateResponse(
            request,
            "register.html",
            {
                "request": request,
                "error": "La password deve avere almeno 6 caratteri.",
                "next": next_url,
            },
            status_code=400,
        )
    if get_user_by_email(db, email):
        return templates.TemplateResponse(
            request,
            "register.html",
            {
                "request": request,
                "error": "Esiste già un account con questa email.",
                "next": next_url,
            },
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
    record_register(db, request)
    # Torna dove stava l'utente (es. il link di invito al gruppo).
    resp = RedirectResponse(_safe_next(next_url), status_code=303)
    resp.set_cookie(
        SESSION_COOKIE,
        create_session_token(user.id, user.session_version),
        httponly=True,
        samesite="lax",
    )
    return resp


@app.get("/login")
def login_form(
    request: Request,
    user: User | None = Depends(current_user),
    next_url: str = Query("", alias="next"),
):
    if user:
        return RedirectResponse(_safe_next(next_url), status_code=303)
    return templates.TemplateResponse(
        request, "login.html", {"request": request, "next": next_url}
    )


@app.post("/login")
def login(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    next_url: str = Form("", alias="next"),
    db: Session = Depends(get_db),
):
    guard_login(db, request, email)
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.password_hash):
        record_login_failure(db, request, email)
        return templates.TemplateResponse(
            request,
            "login.html",
            {
                "request": request,
                "error": "Email o password errati.",
                "next": next_url,
            },
            status_code=400,
        )
    clear_login_failures(db, email)
    # Torna dove stava l'utente (es. il link di invito al gruppo).
    resp = RedirectResponse(_safe_next(next_url), status_code=303)
    resp.set_cookie(
        SESSION_COOKIE,
        create_session_token(user.id, user.session_version),
        httponly=True,
        samesite="lax",
    )
    return resp


@app.post("/logout")
def logout():
    resp = RedirectResponse("/", status_code=303)
    resp.delete_cookie(SESSION_COOKIE)
    return resp


# ---------------------------------------------------------------- informazioni
@app.get("/about")
def about_page(
    request: Request,
    user: User | None = Depends(current_user),
):
    return templates.TemplateResponse(
        request, "about.html", {"request": request, "user": user}
    )


# ---------------------------------------------------------------- account
@app.get("/account")
def account_page(
    request: Request,
    ok: str = Query(""),
    err: str = Query(""),
    user: User = Depends(require_user),
):
    return templates.TemplateResponse(
        request,
        "account.html",
        {"request": request, "user": user, "ok": bool(ok), "err": err},
    )


@app.post("/account")
def account_update(
    request: Request,
    name: str = Form(...),
    color: str = Form(...),
    handle: str = Form(""),
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    import re

    clean_name = name.strip()
    clean_handle = handle.strip().lower().lstrip("@") or None
    clean_color = color.strip().upper()
    error = None
    if not 1 <= len(clean_name) <= 60:
        error = "Il nome deve avere da 1 a 60 caratteri."
    elif clean_handle and not re.fullmatch(r"[a-z0-9_]{3,20}", clean_handle):
        error = "Username: 3-20 caratteri, lettere minuscole, numeri o _."
    elif not re.fullmatch(r"#[0-9A-F]{6}([0-9A-F]{2})?", clean_color):
        error = "Colore non valido (es. #5F8D6E)."
    elif clean_handle and db.scalar(
        select(User).where(User.handle == clean_handle, User.id != user.id)
    ):
        error = f"@{clean_handle} è già in uso."
    if error:
        return templates.TemplateResponse(
            request,
            "account.html",
            {"request": request, "user": user, "error": error},
            status_code=400,
        )
    user.name = clean_name
    user.color = clean_color
    user.handle = clean_handle
    db.commit()
    return RedirectResponse("/account?ok=1", status_code=303)


@app.post("/account/password")
def account_password(
    current: str = Form(...),
    new: str = Form(...),
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    if not verify_password(current, user.password_hash):
        return RedirectResponse(
            "/account?err=Password+attuale+errata", status_code=303
        )
    if len(new) < 6:
        return RedirectResponse(
            "/account?err=La+nuova+password+deve+avere+almeno+6+caratteri",
            status_code=303,
        )
    user.password_hash = hash_password(new)
    user.session_version += 1
    db.commit()
    resp = RedirectResponse("/account?ok=1", status_code=303)
    resp.set_cookie(
        SESSION_COOKIE,
        create_session_token(user.id, user.session_version),
        httponly=True,
        samesite="lax",
    )
    return resp


@app.post("/account/delete")
def account_delete(
    user: User = Depends(require_user), db: Session = Depends(get_db)
):
    anonymize_user(db, user)
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
    q: str = Query(""),
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    group = _get_group_for_user(db, group_id, user)
    member = _member_row(db, group_id, user)
    materialize_due(db, group.id)
    view = compute_balances(db, group)

    expenses = db.scalars(
        select(Expense)
        .options(selectinload(Expense.shares))
        .where(Expense.group_id == group_id)
        .order_by(Expense.created_at.desc())
    ).all()
    needle = q.strip().lower()
    for e in expenses:
        e.payer_name = next(
            (m.name for m in view.members if m.user_id == e.paid_by), "?"
        )
    if needle:
        expenses = [
            e
            for e in expenses
            if needle in e.description.lower()
            or needle in e.payer_name.lower()
            or needle in e.category.lower()
        ]

    payments = db.scalars(
        select(Payment)
        .where(Payment.group_id == group_id)
        .order_by(Payment.created_at.desc())
    ).all()
    for p in payments:
        p.from_name = next((m.name for m in view.members if m.user_id == p.from_user), "?")
        p.to_name = next((m.name for m in view.members if m.user_id == p.to_user), "?")
    if needle:
        payments = [
            p
            for p in payments
            if needle in (p.note or "").lower()
            or needle in p.from_name.lower()
            or needle in p.to_name.lower()
        ]

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
            "query": q.strip(),
            "split_methods": list(SplitMethod),
            "currencies": sorted_currencies(),
            # Permessi di CHI STA GUARDANDO la pagina (per mostrare/nascondere).
            "perms": effective_perms(member.role, member.perms),
            "perm_defs": PERMISSIONS,
            "is_owner": member.role == "owner",
        },
    )


@app.get("/groups/{group_id}/export.csv")
def export_group_csv(
    group_id: int,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    group = _get_group_for_user(db, group_id, user)
    return Response(
        content=group_csv(db, group),
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f'attachment; filename="b-lance-gruppo-{group.id}.csv"'
        },
    )


@app.get("/groups/{group_id}/export.pdf")
def export_group_pdf(
    group_id: int,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    group = _get_group_for_user(db, group_id, user)
    return Response(
        content=group_pdf(db, group),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="b-lance-gruppo-{group.id}.pdf"'
        },
    )


@app.post("/groups/{group_id}/invite-handle")
def invite_by_handle(
    request: Request,
    group_id: int,
    handle: str = Form(...),
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    group, _actor = _require_perm(db, group_id, user, "members_manage")
    import re

    clean = handle.strip().lower().lstrip("@")
    if not re.fullmatch(r"[a-z0-9_]{3,20}", clean):
        return _back_with_err(request, "Username non valido: 3-20 caratteri.")
    target = db.scalar(select(User).where(User.handle == clean))
    if target is None:
        return _back_with_err(request, f"Nessuno con @{clean}.")
    existing = db.scalar(
        select(GroupMember).where(
            GroupMember.group_id == group.id,
            GroupMember.user_id == target.id,
        )
    )
    if existing is not None:
        return _back_with_err(request, f"@{clean} è già nel gruppo.")
    db.add(GroupMember(group_id=group.id, user_id=target.id, role="member"))
    db.commit()
    return RedirectResponse(f"/groups/{group.id}?ok=Persona+aggiunta", status_code=303)


@app.post("/groups/{group_id}/invite")
def regenerate_invite(
    group_id: int,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    """Rigenera il codice invito: serve il permesso di gestire i membri."""
    group, _ = _require_perm(db, group_id, user, "members_manage")
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


# ---------------------------------------------------------------- gestione gruppo
@app.get("/groups/{group_id}/edit")
def edit_group_form(
    request: Request,
    group_id: int,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    """Form di modifica del gruppo (solo con permesso group_edit)."""
    group, member = _require_perm(db, group_id, user, "group_edit")
    return templates.TemplateResponse(
        request,
        "group_edit.html",
        {
            "request": request,
            "user": user,
            "group": group,
            "currencies": sorted_currencies(),
            "locked": _has_history(db, group.id),
            "is_owner": member.role == "owner",
        },
    )


@app.post("/groups/{group_id}/edit")
def edit_group_save(
    group_id: int,
    name: str = Form(...),
    kind: str = Form("other"),
    base_currency: str = Form("EUR"),
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    """Salva le modifiche al gruppo (solo con permesso group_edit)."""
    group, _ = _require_perm(db, group_id, user, "group_edit")

    clean = name.strip()
    if not clean:
        raise HTTPException(status_code=400, detail="Il nome non può essere vuoto")
    if len(clean) > 160:
        raise HTTPException(status_code=400, detail="Nome troppo lungo (max 160)")

    code = (base_currency or group.base_currency).strip().upper()
    if not is_valid_currency(code):
        raise HTTPException(status_code=400, detail=f"Valuta non valida: {code}")
    if code != group.base_currency:
        # Cambiare valuta con lo storico dentro corromperebbe i saldi:
        # le spese e i pagamenti sono già nella vecchia valuta base.
        if _has_history(db, group.id):
            raise HTTPException(
                status_code=400,
                detail=(
                    "Non puoi cambiare la valuta: ci sono già spese o "
                    "pagamenti nel gruppo."
                ),
            )
        group.base_currency = code

    group.name = clean
    group.kind = (kind.strip() or "other")[:32]
    db.commit()
    return RedirectResponse(f"/groups/{group.id}", status_code=303)


@app.post("/groups/{group_id}/delete")
def delete_group(
    group_id: int,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    """Elimina il gruppo: solo il creatore, con la cascata su tutto lo storico."""
    group = _get_group_for_user(db, group_id, user)
    member = _member_row(db, group_id, user)
    if member.role != "owner":
        raise HTTPException(
            status_code=403, detail="Solo il creatore del gruppo può eliminarlo"
        )
    db.query(RecurringExpense).filter(
        RecurringExpense.group_id == group.id
    ).delete(synchronize_session=False)
    db.delete(group)  # cascata ORM: membri, quote, spese, pagamenti
    db.commit()
    return RedirectResponse("/", status_code=303)


# ---------------------------------------------------------------- membri e permessi
def _get_target_member(
    db: Session, group: Group, target_user_id: int
) -> GroupMember:
    target = db.scalar(
        select(GroupMember).where(
            GroupMember.group_id == group.id,
            GroupMember.user_id == target_user_id,
        )
    )
    if target is None:
        raise HTTPException(status_code=404, detail="Membro non trovato")
    return target


@app.post("/groups/{group_id}/members/{target_user_id}")
async def update_member(
    group_id: int,
    target_user_id: int,
    request: Request,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    """Cambia ruolo e permessi di un membro (serve members_manage)."""
    group, actor = _require_perm(db, group_id, user, "members_manage")
    target = _get_target_member(db, group, target_user_id)

    if target.id == actor.id:
        raise HTTPException(status_code=400, detail="Non puoi modificare te stesso")
    if target.role == "owner":
        raise HTTPException(
            status_code=400, detail="Il creatore del gruppo non si tocca"
        )

    form = await request.form()
    role = str(form.get("role", "member")).strip()
    if role not in EDITABLE_ROLES:
        raise HTTPException(status_code=400, detail="Ruolo non valido")

    grantable = effective_perms(actor.role, actor.perms)
    if role == "admin" and grantable != ALL_PERMS:
        # Regola: non puoi creare un admin più potente di te.
        raise HTTPException(
            status_code=403,
            detail="Solo il creatore o un admin può promuovere un admin",
        )

    target.role = role
    # Taglia i permessi a quelli che ha chi li concede.
    target.perms = clamped_perms(actor.role, actor.perms, form.getlist("perm"))
    db.commit()
    return RedirectResponse(f"/groups/{group.id}", status_code=303)


@app.post("/groups/{group_id}/members/{target_user_id}/remove")
def remove_member(
    group_id: int,
    target_user_id: int,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    """Toglie un membro dal gruppo (serve members_manage)."""
    group, actor = _require_perm(db, group_id, user, "members_manage")
    target = _get_target_member(db, group, target_user_id)

    if target.role == "owner":
        raise HTTPException(
            status_code=400, detail="Il creatore del gruppo non si tocca"
        )
    if target.id == actor.id:
        raise HTTPException(status_code=400, detail="Non puoi rimuovere te stesso")

    # Un saldo aperto non sparisce con la rimozione: i soldi resterebbero
    # sospesi e il gruppo non tornerebbe più in pari (prima: 500 totale).
    view = compute_balances(db, group)
    target_net = next(
        (m.net_minor for m in view.members if m.user_id == target_user_id), 0
    )
    if target_net != 0:
        from .core.money import format_amount

        name = target.user.name
        amount = format_amount(abs(target_net), group.base_currency)
        if target_net > 0:
            detail = f"{name} è ancora in credito di {amount}: salda prima di toglierlo dal gruppo"
        else:
            detail = f"{name} deve ancora {amount}: salda prima di toglierlo dal gruppo"
        raise HTTPException(status_code=400, detail=detail)

    db.delete(target)
    db.commit()
    return RedirectResponse(f"/groups/{group.id}", status_code=303)


@app.post("/groups/{group_id}/payments/{payment_id}/delete")
def delete_payment(
    group_id: int,
    payment_id: int,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    """Annulla un pagamento: solo se sei coinvolto o hai payment_manage.

    Non si cancella: resta nello storico barrato e non entra nei saldi.
    """
    group = _get_group_for_user(db, group_id, user)
    payment = db.get(Payment, payment_id)
    if payment is None or payment.group_id != group.id:
        raise HTTPException(status_code=404)
    member = _member_row(db, group_id, user)
    involved = payment.from_user == user.id or payment.to_user == user.id
    if not involved and not can(member.role, member.perms, "payment_manage"):
        raise HTTPException(
            status_code=403,
            detail="Puoi eliminare solo i pagamenti in cui sei coinvolto",
        )
    payment.voided_at = utcnow()
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
    category: str = Form("other"),
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
                from decimal import Decimal, InvalidOperation

                pcts: dict[int, Decimal] = {}
                for uid in member_ids:
                    # Campo vuoto o scritto male = 0: decide poi compute_shares
                    # con un messaggio pulito (prima: crash 500).
                    val = form.get(f"pct_{uid}", "0") or "0"
                    try:
                        pcts[uid] = Decimal(str(val).replace(",", "."))
                    except InvalidOperation:
                        raise MoneyError("percentuale non valida: controlla i campi")
                shares = compute_shares(base_amount_minor, method, member_ids, percentages=pcts)

        expense = Expense(
            group_id=group.id,
            paid_by=paid_by,
            description=description.strip(),
            category=clean_category(category),
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
    except (MoneyError, ValueError, ArithmeticError) as exc:
        # ExchangeError eredita da ValueError: "67 yen senza tasso" -> toast.
        raise HTTPException(status_code=400, detail=str(exc))
    return RedirectResponse(f"/groups/{group.id}", status_code=303)


@app.post("/groups/{group_id}/expenses/{expense_id}/void")
def void_expense(
    group_id: int,
    expense_id: int,
    user: User = Depends(require_user),
    db: Session = Depends(get_db),
):
    """Annulla una spesa (non la cancella: storico immutabile).

    Regola: annulli la TUA spesa, oppure qualsiasi se hai expense_manage.
    """
    group = _get_group_for_user(db, group_id, user)
    expense = db.get(Expense, expense_id)
    if expense is None or expense.group_id != group.id:
        raise HTTPException(status_code=404)
    member = _member_row(db, group_id, user)
    if expense.created_by != user.id and not can(
        member.role, member.perms, "expense_manage"
    ):
        raise HTTPException(
            status_code=403,
            detail="Puoi annullare solo le spese che hai inserito tu",
        )
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
