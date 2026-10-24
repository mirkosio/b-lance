# Audit b-lance — 22 ottobre 2026

**Metodo.** Lettura completa di: app Flutter (8 file: schermate, fogli, modelli, UI), API JSON, auth, modelli DB; suite backend **113/113 verde**; verifica della coerenza tra testo mostrato e comportamento reale. Non ho potuto provare sul tuo Poco F6 (push, QR, app links richiedono il telefono).

**Verdetto.** La base è buona: soldi in unità minori, bcrypt, permessi lato server, errori API sempre JSON, test seri. I problemi veri sono tre famiglie: **bug fuorvianti nell'app**, **sicurezza incompleta**, **struttura lineare** che non regge il salto a "prodotto".

---

## 1. Bug veri (P0) — da sistemare subito

| # | Cosa succede | Dove | Perché è grave |
|---|---|---|---|
| 1 | Annulli una spesa e **sparisce dallo storico**, ma il dialogo dice "La spesa resta nello storico, ma non conta più nei saldi" | `app/api.py:291` (filtra `voided_at IS NULL`), testo in `group_screen.dart:62` | Il testo mente. Serve mostrarla con badge "annullata" e barrata, oppure cambiare il testo. Meglio mostrarla: è uno storico. |
| 2 | **Tocco su una spesa = proposta di annullarla**. Tocco su un pagamento = proposta di eliminarlo | `group_screen.dart:326`, `:376` | Gesto distruttivo senza passare da un dettaglio. Un dito che scorre può aprire "Annulla spesa". |
| 3 | La **nota del pagamento viene salvata ma mai mostrata** | `payment_sheet.dart:171` (salva), `group_screen.dart:373-403` (non la mostra), `models.dart:189` | Dato inutile per l'utente. |
| 4 | "Nuovo gruppo" mostra **solo 20 valute su 125** | `home_screen.dart:59` (`Meta.currencies.take(20)`) | Chi vuole USD/CAD/JPY dopo la posizione 20 non può sceglierle. |
| 5 | Nome gruppo vuoto → il dialog si chiude e **non succede nulla**, senza spiegazione | `home_screen.dart:77` | Sembra rotto. |
| 6 | Tema **solo "sistema"**: nessun interruttore chiaro/scuro | `main.dart:22` | Richiesta esplicita iniziale: light/dark. Chi ha il telefono in automatico non può forzare. |

Altri minori: nessuna anteprima del gruppo quando si entra con un codice (l'endpoint `/invites/{code}` esiste già, `api.py:454`, ma l'app non lo usa); date delle spese/pagamenti disponibili (`created_at`) ma mai mostrate; nessuna versione app visibile per il supporto.

---

## 2. Sicurezza (P1) — deciso "tutto", manca

1. **Le sessioni non scadono mai.** `app/auth.py:26` usa `URLSafeSerializer` (senza timestamp) e `create_session_token` non mette scadenza. Il `except SignatureExpired` è codice morto. Chi ruba un token resta dentro per sempre.
2. **Nessun limite ai tentativi di login/registrazione.** `api.py:186,207`: si può provare password all'infinito. Su serverless il limite va su DB (tabella tentativi per email+IP e finestra temporale), non in memoria.
3. **Nessun "esci da tutti i dispositivi".** Serve un `session_version` sull'utente: token con versione, logout globale = incremento.
4. **API JSON senza gestione membri/ruoli**: il sito ha promozione/rimozione (`app/main.py:736,775`), l'API no. L'app non può nominare admin né togliere un membro.
5. Cose già buone: bcrypt, token firmato, permessi controllati lato server, `/api/*` sempre JSON, nessun SQL costruito a mano.

---

## 3. Lacune di prodotto (deciso, non ancora fatto)

**Account**
- Recupero password (senza dominio: email da `*.vercel.app`, rischio spam — avviso esplicito in UI).
- Modifica nome e colore; eliminazione account con **anonimizzazione** ("Ex-membro", spese intatte).
- Login Google: rimandato.

**Spese**
- **Categorie**: il DB ha già `category` (`models.py:99`) e l'API la restituisce (`api.py:296`), ma l'input non la accetta (`ExpenseIn`, `api.py:162`) e l'app la ignora. Metà del lavoro è già fatta.
- Ricerca e filtri nello storico; modifica spesa (oggi solo annulla + ricrea); spese ricorrenti (tutte le frequenze); export **CSV dall'app**, **PDF+CSV dal sito**.

**Gruppi e inviti**
- Link d'invito che apre l'app (Android App Links: `assetlinks.json` è già online).
- QR d'invito; condivisione nativa (share sheet, non solo "copia link").
- Ruoli/permessi e rimozione membro anche dall'app.
- Amici con `@handle` + invito per handle (modello PayPal).

**Notifiche, valute, lingua, monitoraggio**
- Push Firebase (progetto da creare, `google-services.json` nell'APK).
- Tassi di cambio: oggi **tabella fissa** (`app/core/exchange.py`, nessuna fonte esterna). Da fare: fonte BCE giornaliera con cache + override manuale.
- Italiano + inglese (app e sito): oggi tutte le stringhe sono hardcoded in italiano.
- Sentry per gli errori dell'app.

---

## 4. UI/UX e accessibilità (Fase 2)

- **Struttura lineare** (risolto in 1.1.0): ora bottom nav **Home / Movimenti / Gruppi / Profilo** con `IndexedStack`.
- Manca il **saldo personale totale** (risolto in 1.1.0): hero con saldo per valuta sommato dai gruppi.
- Nessuno skeleton/transizione/haptic (risolto in 1.1.0): skeleton pulsante, transizioni fade, haptic leggeri, reduced-motion.
- Stati vuoti senza CTA (risolto in 1.1.0): ogni stato vuoto ha un'azione.
- Selettore valute non ricercabile (risolto in 1.0.9).
- Accessibilità (risolto in 1.1.0): contrasto ≥ 4.5:1, target 44, Semantics, riduzione animazioni.
- Gap non uniformi (risolto in 1.1.0): griglia a 16 px, card in riga di altezza uguale.
- Duplicazione `SectionCard` (risolta in 1.1.0): una sola definizione in `ui.dart`.
- `formatMinor` solo italiano: **ancora aperto**, si chiude con l'i18n in Fase 3.
- Test Flutter: 18 (modelli, formati, dashboard, movimenti, categorie, ricorrenze).

---

## 5. Roadmap in 3 fasi

### Fase 1 — "Solida" (completata il 22/10/2026)
- [x] Storico con spese annullate visibili e badge
- [x] Tap su spesa/pagamento → dettaglio, azioni dentro il dettaglio
- [x] Note pagamenti visibili, date visibili
- [x] Valute: tutte in un selettore ricercabile
- [x] Validazioni non silenziose (nome gruppo vuoto, email, password)
- [x] Tema chiaro/scuro manuale
- [x] Sessioni con scadenza (30 giorni) + logout globale
- [x] Limite tentativi login/registrazione su DB
- [x] API gestione membri/ruoli (parità col sito)
- [x] Smoke test widget Flutter (11 test)
- [x] Anteprima del gruppo prima di entrare con un codice

### Fase 2 — "Bella" (completata il 22/10/2026, app 1.1.0)
- [x] Design tokens in codice (colori, tipografia bundled Inter+Calistoga, spazi, raggi)
- [x] Bottom nav 4 sezioni + schermata Profilo (tema, sicurezza, logout globale, versione)
- [x] Home bancaria: saldo totale per valuta, azioni rapide, gruppi recenti
- [x] Movimenti globale con filtri (nuovo endpoint `/api/activity`)
- [x] Group screen: saldo in evidenza, sezioni, azioni nel dettaglio
- [x] Motion 4/10 (200–260 ms, haptic leggeri, reduced-motion; niente stagger per scelta)
- [x] Skeleton, stati vuoti con CTA, transizioni di pagina
- [x] Accessibilità: contrasto ≥ 4.5:1, target 44 px, Semantics
- [x] Light/dark a parità di qualità
- [x] Test: 113 backend, 18 Flutter, E2E produzione con movimenti globali

### Fase 3 — "Completa" (1.2.0, 22/10/2026)
- [x] Profilo: nome/colore, `@handle`, elimina account (anonimizzazione "Ex-membro", spese intatte)
- [x] Cambio password da loggato (sito e app tramite profilo)
- [ ] Recupero password via email: **bloccato**, manca un provider email (Resend/SMTP)
- [x] Categorie fisse con icone: input API/web, picker app, filtri Movimenti
- [x] Ricerca storico (globale e nel gruppo), modifica spesa, spese ricorrenti
- [x] Export: CSV dall'app, CSV+PDF dal sito
- [x] QR invito, App Links (`/join/CODICE`), condivisione nativa
- [x] Amici `@handle`: ricerca, invito diretto nel gruppo, nessuna rubrica
- [x] Tassi BCE giornalieri (fallback statico) + override manuale già esistente
- [ ] Push Firebase: **bloccato**, serve il progetto Firebase e `google-services.json`
- [ ] i18n IT/EN: **rimandato**, richiede la traduzione di tutte le stringhe app+sito
- [ ] Sentry: **predisposto solo il punto di innesto**, serve il DSN del progetto

**Verifica Fase 3:** 113 test backend, 18 test Flutter, E2E produzione Fase 1+2+3 verde
(include cambio password, export CSV/PDF, account, handle, ricorrenze, assetlinks).
Le funzioni che richiedono credenziali esterne non sono dichiarate come testate.

**Marchio e contenuti (24/10/2026):** marchio monogramma "bl" in Calistoga
dentro badge salvia, con wordmark testuale `b-lance`; SVG 64×64 e lockup
196×64; icone PWA e launcher Android rigenerate dallo stesso disegno; sidebar
desktop a sezioni, solo testo, comprimibile con stato ricordato e drawer su
mobile con focus trap; pagina `/about`, scheda Informazioni nell'app e README
aggiornati.

---

## 6. Cosa non ho potuto verificare (serve il telefono)
- Push con app chiusa (FCM), QR con fotocamera, apertura dei link invito nell'app, comportamento reale su Poco F6 di notte, email di reset in spam o no.
