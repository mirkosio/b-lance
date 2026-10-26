<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="app/static/logo-lockup-dark.svg">
    <img src="app/static/logo.svg" width="300" alt="b-lance">
  </picture>
</p>

<p align="center"><b>Dividi le spese, non le amicizie.</b><br>
App Android nativa + sito web per tenere i conti di gruppo, al centesimo.</p>

---

## Cos'è

b-lance è un'app per dividere spese tra amici, coinquilini e compagni di viaggio.
Vacanze, cene, affitti, regali: ogni spesa resta nello storico e ogni saldo si
ricalcola da zero. Non serve un foglio Excel e non serve fidarsi dei
"te lo ridò dopo".

Il nome viene da **balance**: il conto deve sempre tornare.

## Cosa c'è dentro

- **Gruppi con ruoli e permessi**: owner, membri, chi può gestire spese,
  pagamenti, membri e impostazioni.
- **Divisione precisa**: parti uguali, importi esatti o percentuali. Gli importi
  sono in unità minori intere (`int`), mai float. Il resto viene distribuito al
  centesimo.
- **Pagamenti parziali**: "ha saldato 20 su 47,50" è uno stato reale, non una
  nota a testo.
- **Annullamento, non cancellazione**: una spesa annullata resta nello storico,
  barrata, e non entra nei saldi.
- **Minimo numero di bonifici**: il motore calcola chi paga chi con il minor
  numero di trasferimenti possibile.
- **125 valute**: ogni valuta ha il suo exponent (JPY 0, KWD 3, EUR 2). I tassi
  BCE vengono aggiornati ogni giorno con fallback statico; il tasso usato viene
  salvato sulla spesa, quindi lo storico non cambia.
- **Categorie**: 10 categorie fisse con icone, filtrabili nei movimenti.
- **Ricerca e modifica**: ricerca globale e nel gruppo, modifica della spesa
  con ricalcolo delle quote.
- **Spese ricorrenti**: giornaliere, settimanali, mensili o annuali, con
  intervallo 1/2/3/6. Il server crea la spesa alla scadenza.
- **Export**: CSV dall'app, CSV e PDF dal sito.
- **Inviti**: link, QR, condivisione nativa Android e aggiunta diretta tramite
  `username`. Nessun caricamento della rubrica.
- **Profilo e privacy**: nome, colore, `username`, cambio password, eliminazione
  account con anonimizzazione ("Ex-membro"): email e username spariscono, le
  spese restano per non rompere i saldi degli altri.
- **Tema chiaro/scuro**, font Inter + Calistoga inclusi nell'app, motion
  discreto e rispetto di `reduce motion`.
- **Avvio curato**: splash nativo con il marchio e loader animato (il simbolo
  respira e oscilla appena) durante il controllo della sessione.
  Niente indirizzi server o dettagli tecnici a schermo.
- **Marchio b/l**: una sola lettera, non due. L'asta e il piede bianchi sono
  la `l`; l'anello salvia è la `b`, su badge nero. Nell'interfaccia compare
  solo il simbolo; il wordmark `b-lance` resta nel README e nei lockup.

## Stack

| Livello | Scelta |
|---|---|
| App | Flutter nativo Android (nessuna TWA, nessuna WebView) |
| Backend | FastAPI + SQLAlchemy 2 |
| Database | SQLite in locale, PostgreSQL/Neon in produzione |
| Deploy | Vercel Python per API e sito |
| Sito | Jinja2 + CSS/JS senza build step |
| Auth | cookie di sessione firmati + bcrypt; token Bearer per l'app |
| Test | pytest + hypothesis, flutter_test |

## Struttura

```
app/
  api.py                 # API JSON usata dall'app
  main.py                # sito, pagine HTML, health, assetlinks
  models.py              # utenti, gruppi, spese, quote, pagamenti, ricorrenze
  database.py            # engine + migrazioni idempotenti
  account.py             # anonimizzazione account condivisa API/sito
  export.py              # CSV e PDF del gruppo
  core/
    money.py             # aritmetica in unità minori
    currencies.py        # 125 valute ISO 4217
    exchange.py          # tassi BCE + fallback + override manuale
    splitting.py         # quote esatte e resto
    settlement.py        # semplificazione debiti
    categories.py        # categorie fisse
    recurring.py         # materializzazione delle ricorrenze
  templates/             # pagine Jinja2
  static/                # CSS, icone, marchio SVG, service worker
app-android/             # progetto Flutter
design-system/b-lance/   # design system (MASTER.md)
scripts/                 # icone, server locale, deploy
tests/                   # suite backend
```

## Avvio locale

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Apri `http://127.0.0.1:8000`.

Variabili utili:

```bash
DATABASE_URL=postgresql://...   # default: sqlite:///./b-lance.db
SECRET_KEY=...                  # obbligatoria in produzione
BLANCE_FX_LIVE=0                # disattiva la rete BCE (test/offline)
```

## App Android

```bash
cd app-android
flutter pub get
flutter test
flutter analyze

export PATH=/home/mirkosio/flutter/bin:$PATH
export ANDROID_HOME=/home/mirkosio/android-sdk
export JAVA_HOME=/home/mirkosio/.bubblewrap/jdk/jdk-17.0.11+9
flutter build apk --release
```

L'APK esce in `app-android/build/app/outputs/flutter-apk/app-release.apk`.
La versione corrente è **1.5.0** (`versionCode 17`).

Link diretti: `https://b-lance.vercel.app/join/CODICE` aprono l'app tramite
App Links. La verifica dipende da `/.well-known/assetlinks.json` con package
`com.mirkosio.blance` e fingerprint SHA-256 del keystore di release.

## Test

```bash
# backend (118 test)
.venv/bin/python -m pytest tests/ -q

# app (25 test)
cd app-android && flutter test
```

I test backend usano SQLite e disattivano la rete BCE (`tests/conftest.py`) per
essere deterministici. La suite copre: flusso completo, multi-valuta, split
esatto/percentuale, annullamenti, permessi, sessioni, movimenti globali,
account e anonimizzazione, username, categorie, modifica spesa, ricorrenze,
export CSV/PDF, assetlinks.

## Deploy

Backend e sito su Vercel:

```bash
npx vercel --prod --yes
```

Health check: `https://b-lance.vercel.app/health`.
Le release APK sono su
[github.com/mirkosio/b-lance/releases](https://github.com/mirkosio/b-lance/releases).

## Stato (ottobre 2026)

Fase 1 "Solida", Fase 2 "Bella" e Fase 3 "Completa" sono implementate e in
produzione.

Non ancora dentro, per scelta o perché mancano credenziali esterne:

- **Push Firebase**: serve un progetto Firebase e `google-services.json`.
- **Sentry**: serve il DSN del progetto.
- **Recupero password via email**: serve un provider email (Resend/SMTP).
  Il cambio password da loggato è già disponibile.
- **i18n IT/EN**: l'interfaccia è in italiano; la traduzione completa è
  rimandata per non fare mezzo lavoro.

Dettagli tecnici e decisioni: [`AUDIT.md`](AUDIT.md),
[`OPERAZIONE.md`](OPERAZIONE.md) e
[`design-system/b-lance/MASTER.md`](design-system/b-lance/MASTER.md).
Prossimo ciclo (modalità cassiere, offline, riepiloghi condivisi):
[`PROPOSTA.md`](PROPOSTA.md).

## Privacy

- Nessuna rubrica caricata.
- Nessuna pubblicità, nessuna vendita di dati.
- Gli errori non mostrano mai JSON o pagine tecniche al browser.
- Eliminando l'account il profilo viene anonimizzato, non cancellato in modo
  da rompere i saldi dei gruppi.

## Informazioni

Pagina pubblica: `https://b-lance.vercel.app/about`.
Problemi e idee: [github.com/mirkosio/b-lance/issues](https://github.com/mirkosio/b-lance/issues).
