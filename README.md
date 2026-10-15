# SiamoQuiti

Dividi le spese con gli amici. Weekend, gite, cene. Aggiungi chi ha pagato,
dividi, e vedi esattamente chi deve cosa. Niente discussioni, niente fogli Excel.

Il nome viene da "esser quiti" = essere in pari.

## Perché esiste

Le app esistenti hanno problemi reali (recensioni vere):

- **Splitwise**: stagnante, lento, ads.
- **Tricount**: "i conti non tornavano e non capivo perché".
- **Stippl**: non puoi segnare che 2 su 4 hanno già pagato.
- **Settle Up**: nessuna integrazione di pagamento, quando chiudi il debito non puoi pagare.

SiamoQuiti risolve i punti precisi:

1. **Importi in centesimi, mai float.** Zero arrotondamenti casuali. I conti tornano sempre.
2. **Pagamento parziale reale.** "Ha saldato 20 su 47,50". Registri pagamenti a rate.
3. **Numero minimo di bonifici.** Ti diciamo chi paga chi con il minor numero di trasferimenti.
4. **Annullamento, non cancellazione.** Storico immutabile: le spese annullate restano tracciate.

## Come funziona il motore

Il cuore è in `app/core/`, tutto in unità minore (centesimi) intere:

- `money.py` — aritmetica in centesimi con `Decimal`. Parsing, formattazione, conversione valuta.
- `splitting.py` — divisione in quote esatte. Equa / importi esatti / percentuale, con distribuzione del resto (largest remainder).
- `settlement.py` — semplificazione dei debiti. Greedy: bilancia massimi creditori e debitori. Massimo (n-1) trasferimenti per n persone.

I saldi si ricalcolano sempre dallo storico (spese + quote + pagamenti), non sono valori salvati che possono divergere.

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

I test coprono:
- flusso end-to-end (registrazione, gruppo, spesa, saldo, pagamento parziale, annullamento)
- test property-based sul motore matematico (hypothesis): i soldi tornano sempre, il settlement azzera, il numero di trasferimenti è minimo, è deterministico.

## Stack

- **Backend**: FastAPI + SQLAlchemy 2.0 + Alembic
- **Frontend**: Jinja2 + Vanilla JS + CSS custom (nessun build step)
- **DB**: SQLite in dev, PostgreSQL in prod (via `DATABASE_URL`)
- **Auth**: sessioni cookie firmati (itsdangerous) + bcrypt
- **Test**: pytest + hypothesis

## Struttura

```
app/
  core/          # motore matematico puro (testato)
    money.py
    splitting.py
    settlement.py
  models.py      # ORM
  services.py    # calcolo saldi da storico
  auth.py        # hash + sessioni
  main.py        # rotte FastAPI
  templates/     # pagine Jinja2
  static/        # CSS
tests/
  test_math.py   # property-based sul motore
  test_app.py    # end-to-end flusso utente
```

## Deploy

```bash
docker build -t siamoquiti .
docker run -p 8000:8000 -e SECRET_KEY=$(openssl rand -hex 32) siamoquiti
```

Per la produzione imposta `DATABASE_URL` su PostgreSQL e cambia `SECRET_KEY` in `app/auth.py` (o meglio: spostalo su variabile d'ambiente).
