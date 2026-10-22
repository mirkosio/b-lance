# Audit b-lance — 22 ottobre 2026

**Metodo.** Lettura completa di: app Flutter (8 file: schermate, fogli, modelli, UI), API JSON, auth, modelli DB; suite backend **100/100 verde**; verifica della coerenza tra testo mostrato e comportamento reale. Non ho potuto provare sul tuo Poco F6 (push, QR, app links richiedono il telefono).

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

- **Struttura lineare**: home = lista gruppi + menu a tendina. Da rifare a sezioni stile banca: bottom nav **Home / Movimenti / Gruppi / Profilo**.
- Manca il **saldo personale totale** in evidenza (oggi solo per gruppo).
- Nessuno skeleton di caricamento, nessuna transizione, nessuno stagger, nessun haptic: solo spinner circolari.
- Stati vuoti senza pulsante d'azione (l'utente deve trovare il FAB).
- Selettore valute non ricercabile (dropdown con 125 voci).
- Accessibilità: contrasti da misurare, target 44×44, Semantics sulle icone, rispetto di "riduci animazioni".
- Gap non uniformi: 10, 12 e 16 px mescolati; card con altezze diverse in riga.
- Duplicazione: `SectionCard` esiste in `ui.dart:147` **e** in `group_screen.dart:491`.
- `formatMinor` (`ui.dart:124`) è solo italiano: da parametrizzare per l'i18n.
- Zero widget test Flutter.

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

### Fase 2 — "Bella" (redesign con ui-ux-promax)
- [ ] Design tokens in codice (colori, tipografia bundled Inter+Calistoga, spazi, raggi)
- [ ] Bottom nav 4 sezioni + schermata Profilo
- [ ] Home bancaria: saldo totale, "ti devono / devi", gruppi
- [ ] Movimenti globale con filtri
- [ ] Group screen: saldo in evidenza, sezioni, azioni nel dettaglio
- [ ] Motion 4/10 (150–220 ms, stagger 40–60 ms), haptic leggeri, reduced-motion
- [ ] Skeleton, stati vuoti con CTA, transizioni di pagina
- [ ] Accessibilità: contrasto 4.5:1, 44 px, Semantics
- [ ] Light/dark a parità di qualità

### Fase 3 — "Completa"
- [ ] Profilo: nome/colore, elimina account (anonimizza), reset password con avviso spam
- [ ] Categorie con icone (API input + UI + filtri)
- [ ] Ricerca storico, modifica spesa, spese ricorrenti
- [ ] Export: CSV app, PDF+CSV sito
- [ ] QR invito, App Links, share nativo
- [ ] Amici `@handle` + inviti
- [ ] Tassi BCE giornalieri + override
- [ ] Push Firebase
- [ ] i18n IT/EN
- [ ] Sentry

---

## 6. Cosa non ho potuto verificare (serve il telefono)
- Push con app chiusa (FCM), QR con fotocamera, apertura dei link invito nell'app, comportamento reale su Poco F6 di notte, email di reset in spam o no.
