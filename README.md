<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="app/static/logo-lockup-dark.svg?v=6">
    <img src="app/static/logo.svg?v=6" width="300" alt="b-lance">
  </picture>
</p>

<p align="center"><b>Dividi le spese, non le amicizie.</b><br>
App Android e sito per i conti di gruppo, al centesimo.</p>

---

## Cos'è

b-lance tiene spese, pagamenti e saldi di un gruppo nello stesso posto. Il nome
viene da *balance*: il conto deve tornare. È pensato per amici, coinquilini e
compagni di viaggio, non per la contabilità di un'impresa.

## Cosa puoi fare

- **Gruppi con ruoli**: chi crea invita, chi partecipa segna le sue spese.
- **Spese in tre modi**: split uguale, importi esatti o percentuali. Importi in
  unità minori intere, quindi niente centesimi persi per strada.
- **Saldi che si chiudono davvero**: b-lance calcola il minor numero di
  trasferimenti per pareggiare i conti.
- **Pagamenti parziali**: si salda anche a rate, con lo storico sempre leggibile.
- **Modalità Cassiere**: senza account e senza rete. Valuta, split per articolo,
  riepilogo come immagine, testo o PDF creato sul telefono.
- **125 valute** con cambi BCE aggiornati ogni giorno; il tasso usato resta
  salvato sulla spesa.
- **10 categorie**, ricerca, ricorrenze giornaliere, settimanali, mensili o
  annuali.
- **Export**: CSV e PDF del gruppo, archivio JSON completo dell'account.
- **Inviti** via link, QR, condivisione Android o username, senza accesso alla
  rubrica.
- **Link pubblici di sola lettura**, con scadenza a 30 giorni, revocabili e
  rigenerabili.
- **Recupero password senza email**: 8 codici monouso generati dall'account. Un
  codice usato non vale più e il rientro revoca tutte le sessioni.
- **Tema chiaro e scuro**, font Inter per l'interfaccia e Fraunces per i numeri,
  animazioni discrete che si spengono con "riduci movimento".
- **PWA installabile** senza passare da uno store; le istruzioni per Android e
  iPhone sono nelle FAQ.

## Dove provarlo

- **Sito**: [b-lance.vercel.app](https://b-lance.vercel.app)
- **Demo senza account**: [b-lance.vercel.app/demo](https://b-lance.vercel.app/demo) —
  un conto di esempio con tre persone, spese modificabili e saldi calcolati nel
  browser. Nessun dato viene inviato o salvato.
- **App Android**: dalla
  [pagina delle release](https://github.com/mirkosio/b-lance/releases).
  Ultima versione **1.9.1** (`APK_1.9.1.apk`, circa 60 MB). Il file `.sha256` accanto
  permette di verificare il download.

## Privacy

Nessuna pubblicità, nessuna vendita di dati, nessun profilo per il marketing.
I riepiloghi condivisi viaggiano nel frammento del link (dopo il `#`), che il
browser non invia al server: b-lance non li riceve e non li conserva. I dettagli
sono nella pagina [Privacy](https://b-lance.vercel.app/privacy).

## Stack

| Livello | Scelta |
|---|---|
| App | Flutter nativo Android, senza TWA o WebView |
| Backend | FastAPI, SQLAlchemy 2 |
| Database | SQLite in locale, PostgreSQL/Neon in produzione |
| Sito e deploy | Jinja2, CSS/JS senza build step, Vercel |
| Accesso | Cookie di sessione firmati e bcrypt; token Bearer per l'app |
| Test | pytest, hypothesis, flutter_test |

## Struttura

```text
app/                  API, sito, modelli, database, export e migrazioni
  core/               importi, valute, cambi, split, saldi e ricorrenze
  templates/          pagine Jinja2
  static/             CSS, icone, marchio SVG e service worker
app-android/          progetto Flutter
design-system/        palette, tipografia e regole di interfaccia
scripts/              icone, server locale e deploy
tests/                suite backend
```

## Avvio locale

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Apri `http://127.0.0.1:8000`. Variabili utili:

```bash
DATABASE_URL=postgresql://...   # default: sqlite:///./b-lance.db
SECRET_KEY=...                  # obbligatoria in produzione
BLANCE_FX_LIVE=0                # disattiva la rete BCE
```

## App Android

```bash
cd app-android
flutter pub get
flutter analyze
flutter test
flutter build apk --release --dart-define=API_URL=https://b-lance.vercel.app
```

L'APK esce in `build/app/outputs/flutter-apk/app-release.apk`. Gli App Links
usano `https://b-lance.vercel.app/join/CODICE`, verificati in
`/.well-known/assetlinks.json`.

Dalla 1.6.0 in poi gli aggiornamenti sono in-place, con la stessa chiave di
firma. Chi arriva dalla 1.5.0 deve disinstallare la versione precedente: i
gruppi Cassiere salvati solo sul telefono possono andare persi, mentre i dati
dell'account restano online.

## Test

```bash
.venv/bin/python -m pytest tests/ -q
node --test tests/js/*.test.mjs
cd app-android && flutter test
```

La suite backend usa SQLite e disattiva la rete BCE, così i risultati sono
ripetibili. Copre flussi, multi-valuta, split, annullamenti, permessi, account,
username, categorie, ricorrenze, export, App Links, pagine informative e demo.

## Licenza

MIT. Il testo completo è in [`LICENSE`](LICENSE): puoi usare, modificare e
ridistribuire il codice, anche in un prodotto tuo, tenendo la nota di copyright.

## Contribuire

Il codice è pubblico per trasparenza: puoi leggere come funziona, segnalare un
problema o proporre una modifica con una pull request. Per i cambiamenti grandi
conviene aprire prima una issue, così si discute il perché prima del come.

Le icone e il marchio si rigenerano con `scripts/gen_brand_assets.py`.
