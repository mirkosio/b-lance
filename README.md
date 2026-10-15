# B-Lance

Dividi le spese con gli amici: weekend, gite, vacanze. Aggiungi chi ha pagato,
dividi, e vedi esattamente chi deve cosa. Niente discussioni, niente fogli Excel.

B-Lance = "balance" (bilancio). Bilanci sempre in equilibrio, al centesimo.

## Perché esiste

Le app esistenti hanno problemi reali (recensioni vere):

- **Splitwise**: stagnante, lento, ads.
- **Tricount**: "i conti non tornavano e non capivo perché".
- **Stippl**: non puoi segnare che 2 su 4 hanno già pagato.
- **Settle Up**: nessuna integrazione di pagamento, quando chiudi il debito non puoi pagare.

B-Lance risolve i punti precisi:

1. **Importi in unità intere, mai float.** Zero arrotondamenti casuali. I conti tornano sempre.
2. **Pagamento parziale reale.** "Ha saldato 20 su 47,50". Registri pagamenti a rate.
3. **Numero minimo di bonifici.** Ti diciamo chi paga chi con il minor numero di trasferimenti.
4. **Annullamento, non cancellazione.** Storico immutabile: le spese annullate restano tracciate.
5. **125 valute.** Ogni valuta con il numero corretto di decimali (JPY 0, KWD 3, EUR 2).
6. **Multi-valuta vera.** Paga in baht, bilancia in euro: conversione con snapshot del tasso al registro.

## Come funziona il motore

Il cuore è in `app/core/`, tutto in unità MINORI intere (centesimi/yen/millesimi):

- `money.py` — aritmetica in unità intere con `Decimal`. Parsing, formattazione e roundtrip con exponent 0/2/3.
- `currencies.py` — 125 valute ISO 4217 con symbol e exponent.
- `exchange.py` — tassi vs EUR, conversione incrociata via EUR, override manuale. Nessuna API esterna: deterministico e offline.
- `splitting.py` — quote esatte. Equa / importi esatti / percentuale, con distribuzione del resto (largest remainder).
- `settlement.py` — semplificazione debiti. Greedy: bilancia massimi creditori e debitori. Massimo (n-1) trasferimenti.

I saldi si ricalcolano sempre dallo storico (spese + quote + pagamenti). Le spese
multi-valuta salvano `base_amount_minor` già convertito al registro: nessun
ricalcolo runtime, nessuno storico che cambia se cambiano i tassi.

## Avvio rapido

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

uvicorn app.main:app --reload
```

Poi apri http://127.0.0.1:8000

## Test

```bash
pytest tests/ -q
```

55 test: flusso end-to-end (registrazione, gruppo, spesa, saldo, pagamento
parziale, annullamento), multi-valuta (THB→EUR), split esatto/percentuale,
validazioni di sicurezza, e test property-based (hypothesis) sul motore.

## Mobile (PWA)

B-Lance è una PWA installabile:

- `manifest.webmanifest` — nome, icone, standalone, shortcuts.
- `static/sw.js` — cache-first per gli asset, network-first per le pagine, fallback offline.
- Icone generate da `scripts/gen_icons.py` (monogramma B, gradiente indigo→viola).

**Installazione su Android/iOS**: apri il sito → menu del browser →
"Installa app" / "Aggiungi a schermata Home". Si apre a schermo intero come un'app nativa.

## Stack

- **Backend**: FastAPI + SQLAlchemy 2.0
- **Frontend**: Jinja2 + Vanilla JS + CSS custom (nessun build step)
- **DB**: SQLite in dev, PostgreSQL in prod (via `DATABASE_URL`)
- **Auth**: sessioni cookie firmati (itsdangerous) + bcrypt
- **Test**: pytest + hypothesis

## Struttura

```
app/
  core/          # motore matematico puro (testato)
    money.py
    currencies.py
    exchange.py
    splitting.py
    settlement.py
  models.py      # ORM
  services.py    # calcolo saldi da storico
  auth.py        # hash + sessioni
  main.py        # rotte FastAPI
  templates/     # pagine Jinja2
  static/        # CSS, PWA (manifest, sw, icone)
scripts/
  gen_icons.py   # genera le icone PNG
tests/
  test_math.py      # property-based sul motore
  test_currency.py  # valute, cambio, multi-valuta, sicurezza
  test_app.py       # end-to-end flusso utente
```

## Sicurezza

- Password: bcrypt (niente hash deboli).
- Sessioni: cookie firmati httpOnly.
- Validazione membri: chi paga e i partecipanti di un pagamento devono essere
  membri del gruppo (niente id estranei).
- Accesso gruppi: se non sei membro, 404 (non riveli l'esistenza).

## Deploy

```bash
docker build -t b-lance .
docker run -p 8000:8000 -e DATABASE_URL=postgresql://... b-lance
```

In produzione: `DATABASE_URL` su PostgreSQL e una `SECRET_KEY` forte da env var
(oggi in `app/auth.py`, da spostare su variabile d'ambiente).
