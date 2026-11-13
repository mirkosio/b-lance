<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="app/static/logo-lockup-dark.svg">
    <img src="app/static/logo.svg" width="300" alt="b-lance">
  </picture>
</p>

<p align="center"><b>Dividi le spese, non le amicizie.</b><br>
App Android nativa e sito web per i conti di gruppo, al centesimo.</p>

---

## Cos’è

b-lance aiuta amici, coinquilini e compagni di viaggio a tenere spese, pagamenti
e saldi nello stesso posto. Il nome viene da *balance*: il conto deve tornare.

## Funzioni

- Gruppi con ruoli e permessi; spese e pagamenti parziali, modificabili o
  annullabili mantenendo lo storico.
- Split uguale, esatto o percentuale; importi in unità minori intere,
  formattati in stile italiano (`1.234,56 €`) e saldi regolati con il minor
  numero di trasferimenti.
- Modalità Cassiere locale senza account o rete: valuta per gruppo, split per
  articolo, riepilogo come immagine, testo o PDF creati sul telefono.
- 125 valute, cambi BCE aggiornati ogni giorno e tasso storico conservato sulla
  spesa; 10 categorie, ricerca e ricorrenze giornaliere, settimanali, mensili o
  annuali.
- Export CSV/PDF e archivio JSON completo dell’account; inviti via link, QR,
  condivisione Android o username, senza accesso alla rubrica.
- Pagamento rapido precompilato dalle proposte di saldo, sia sul sito sia in
  Android.
- Profilo con nome, colore e username; cambio password e cancellazione account
  con anonimizzazione, mantenendo i saldi dei gruppi.
- Tema chiaro/scuro, font Inter e Calistoga, motion ridotto e rispetto di
  `reduce motion`; splash Android nativo e marchio b/l.
- Link pubblici read-only con scadenza a 30 giorni e possibilità di revoca o
  rigenerazione. Le pagine Come funziona, FAQ, Privacy e App Android sono
  separate.
- Demo pubblica su `/demo`: un conto di esempio con tre persone, spese
  modificabili e saldi calcolati nel browser. Nessun dato viene inviato o
  salvato; la CTA finale porta alla registrazione.
- Interfaccia web-app: dashboard con ricerca e filtri per saldo, rail laterale
  su desktop, gruppo con sezioni sticky e pannello spesa comprimibile, indice
  nelle pagine informative e calcolatore rapido nella landing. Layout centrato
  anche a schermo intero.
- Primo gruppo guidato con nome suggerito e spesa di esempio precompilata;
  annullamento di spese e pagamenti con “Ripristina” immediato, anche senza
  JavaScript.
- Recupero password senza email: 8 codici monouso generati dall’account, con
  hash HMAC nel database. Un codice usato non vale più e il rientro revoca
  tutte le sessioni.
- Link web del Cassiere: dall’app si condivide un riepilogo di sola lettura
  che si apre nel browser di chi lo riceve. I dati stanno dopo il `#` del link,
  quindi il server non li riceve; saldi e bonifici si calcolano nel browser.
- PWA installabile senza store: manifest, service worker e icone (180×180 per
  iOS). Le istruzioni per Android e iPhone sono nelle FAQ.

## Stack

| Livello | Scelta |
|---|---|
| App | Flutter nativo Android, senza TWA o WebView |
| Backend | FastAPI, SQLAlchemy 2 |
| Database | SQLite in locale, PostgreSQL/Neon in produzione |
| Sito e deploy | Jinja2, CSS/JS senza build step, Vercel |
| Accesso | Cookie di sessione firmati e bcrypt; token Bearer per l’app |
| Test | pytest, hypothesis, flutter_test |

## Struttura

```text
app/                  API, sito, modelli, database, export e migrazioni
  core/               importi, valute, cambi, split, saldi e ricorrenze
  templates/          pagine Jinja2
  static/             CSS, icone, marchio SVG e service worker
app-android/          progetto Flutter
 design-system/        design system b-lance
scripts/               icone, server locale e deploy
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

## Android

```bash
cd app-android
flutter pub get
flutter analyze
flutter test
```

L’APK si genera con `flutter build apk --release` e finisce in
`app-android/build/app/outputs/flutter-apk/app-release.apk`. La release corrente
è **1.7.0** (`versionCode 20`); le note e i file sono nella
[pagina GitHub Releases](https://github.com/mirkosio/b-lance/releases).
APK 1.7.0: `APK_1.7.0.apk` (58 MB), SHA-256
`5fcab6909d7e8fc95fd27c66382d2a8549cbb677504ca0dc3cc2fcc3b5be24ae`.
Gli App Links usano `https://b-lance.vercel.app/join/CODICE` e la verifica in
`/.well-known/assetlinks.json`.

**Firma:** la chiave della 1.5.0 è irrecuperabile. La 1.6.0 usa una nuova chiave,
quindi per aggiornare dalla 1.5.0 occorre disinstallare la versione precedente;
i gruppi Cassiere conservati solo sul telefono possono andare persi. I dati
dell’account restano online. La nuova chiave va conservata per le prossime
release: dalla 1.6.0 in poi gli aggiornamenti sono in-place.

## Verifiche e deploy

Al riferimento v23 risultavano verdi 124 test backend, 36 test Flutter e
`flutter analyze`. Con pagine informative, demo, scadenza dei link,
l’interfaccia web-app, il movimento e i conflitti di modifica del gruppo la
suite backend è a **155 test**, più 21 test JavaScript per la logica del
riepilogo Cassiere e per il sistema di movimento, e 37 test Flutter.
Per eseguirli:

```bash
.venv/bin/python -m pytest tests/ -q     # 155 test
node --test tests/js/*.test.mjs          # 21 test JavaScript
cd app-android && flutter test           # 37 test
```

La suite backend usa SQLite e disattiva la rete BCE per test deterministici;
copre flussi, multi-valuta, split, annullamenti, permessi, account, username,
categorie, ricorrenze, export, App Links, pagine informative e demo.

Backend e sito sono su Vercel; health check: `https://b-lance.vercel.app/health`.
Il deploy manuale è `npx vercel --prod --yes`. Le APK vengono pubblicate dal
workflow `.github/workflows/release-apk.yml`.

## Stato e prossimi passi

La release pubblicata è v24 / app 1.7.0 (v23 era la 1.6.0, con il link web
del Cassiere solo nel codice). Sul sito
(`https://b-lance.vercel.app`) sono attivi split per articolo, PDF Cassiere,
pagine informative separate, demo pubblica senza login, validazione inline,
export account JSON, pagamento precompilato e offline account con coda
idempotente, movimento discreto (stagger, numeri animati, transizioni di
pagina, tutto azzerato con "riduci movimento") e conflitti di modifica del
gruppo con scelta esplicita della versione. Dettagli e priorità sono in
[PROPOSTA.md](PROPOSTA.md).

Nota: la review del prodotto ha esaminato README e percorso pubblico senza login;
non ha verificato account, gruppi autenticati, Android o offline. I relativi gap
sono da confermare con una prova d’uso prima di considerarli difetti osservati.

Prossimi: fiducia verificabile (testimonianze con consenso e schede community),
link web/rivendicazione del Cassiere, PWA iOS, import CSV e link a wallet
esterni. Social proof e metriche devono basarsi su consenso e dati verificati.

Fuori dal prodotto per scelta o per credenziali mancanti:

- **Promemoria push/email e recupero password**: servono un provider email
  (Resend/SMTP) o un progetto Firebase con `google-services.json`.
- **Sentry**: serve il DSN del progetto.
- **i18n IT/EN**: l’interfaccia è in italiano; la traduzione completa è
  rimandata per non fare mezzo lavoro.
