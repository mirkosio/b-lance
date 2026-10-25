# b-lance — Design System (MASTER)

Origine: `ui-ux-promax` → pattern *Trust & Authority*, stile *Minimalismo svizzero*, motion **4/10**.
Adattato al brand b-lance: la palette e i font decisi dal proprietario **vincono** sui suggerimenti generici (navy/oro, IBM Plex) del generatore.

## Principi

1. **Serio ma non corporate.** Sembra uno strumento di soldi, non una banca. Niente toni intimidatori.
2. **Il numero è il protagonista.** Saldi e importi si leggono al primo colpo: cifre tabulari, segno e colore semantico.
3. **Una decisione per schermata.** Nessuna schermata che chiede due cose insieme.
4. **Struttura a sezioni, non lineare.** Navigazione stile app bancaria (PayPal/Revolut): sezioni stabili, non un unico scroll.
5. **Movimento discreto.** 150–220 ms sulle interazioni, 250–320 ms sulle transizioni. Si sente la qualità, non si guarda l'animazione.

## Brand

- Wordmark: `b-lance`, minuscolo, tight. Il nome resta **testo**: `b` in
  inchiostro, trattino oro, `lance` salvia. Mai "B-Lance", mai "Blance"
  nell'interfaccia. Nell'app e nel sito il wordmark **non** accompagna il
  simbolo: resta nel README, nei lockup e nei materiali estesi.
- Marchio: **una sola lettera b/l**. L'asta verticale e il piede bianchi
  (`#F5F4EF`) sono la `l`; l'anello salvia (`#7FAF8F → #47684F`) è la `b`;
  il contatore è nero, il badge è nero (`#0A0E0B`) con bordo `#35473B` e
  angoli al 25%. Niente lettera dentro la lettera, niente doppio monogramma.
- File: `app/static/logo-mark.svg` (badge 64×64),
  `logo-mark-inverse.svg` (badge carta, anello salvia, l scura),
  `logo.svg` e `logo-lockup-dark.svg` (lockup 196×64: simbolo + wordmark
  completo `b-lance`, solo per README e materiali estesi). La stessa
  geometria è in `app-android/lib/widgets/logo_mark.dart` e nelle icone
  generate da `scripts/gen_brand_assets.py`.
- Icona app: badge nero con anello salvia e l carta; foreground adattivo
  trasparente su fondo `#0A0E0B`, maskable full-bleed. Niente lettera "B" di
  sistema, niente viola.

## Colori (token)

| Token | Light | Dark | Uso |
|---|---|---|---|
| `sage` | `#5F8D6E` | `#5F8D6E` | accento, CTA primaria, importi in credito strutturali |
| `paper` | `#F5F4EF` | `#141816` | sfondo schermata |
| `card` | `#FFFFFF` | `#191F1B` | superfici |
| `ink` | `#242B27` | `#EFF3EE` | testo primario |
| `pos` | `#3B7A52` | `#3B7A52` | "ti devono", entrate |
| `neg` | `#A0432F` | `#A0432F` | "devi", azioni distruttive |
| `border` | `#E5E2D8` | `#2A322D` | bordi 1px |
| `muted` | ink 60% | ink 60% | testi secondari |

Regole: niente gradienti viola/rosa; i gradienti salvia sono ammessi solo su hero/splash, dosati. Testo su superficie ≥ 4.5:1.

## Tipografia

- **Display**: Calistoga — solo wordmark, numeri hero (saldo), titoli di stato vuoto.
- **UI**: Inter — tutto il resto. Da **includere in `assets/fonts`** (niente download a runtime).
- Scala: 11 / 12.5 / 13.5 / 15 / 18 / 24 / 32 / 40. Pesi 400, 600, 700, 800.
- Importi: `FontFeature.tabularFigures()` sempre; segno esplicito `+`/`−`.

## Spazio e forma

- Base 4 pt. Gap tra card/sezioni: **16 px uniformi**. Dentro le card: 16–18 px.
- Raggi: card 16, bottoni 13, input 12, chip/badge 999.
- Altezze: pulsanti 52, touch target minimo 44×44.
- Card in riga: **altezza uguale** (IntrinsicHeight o griglia).

## Motion (4/10)

- Interazioni: 150–220 ms, `Curves.easeOutCubic`.
- Cambio schermata: 250–320 ms, slide+fade breve.
- Liste: stagger 40–60 ms, solo al primo caricamento, mai su refresh.
- Nessun overshoot su dati/tabelle. Haptic leggero su conferme e azioni distruttive.
- Rispettare `MediaQuery.disableAnimations` / reduced motion.

## Navigazione (IA bancaria)

Bottom nav, 4 voci, sempre visibile tranne login/onboarding:

1. **Home** — saldo totale ("ti devono X" / "devi Y"), scorciatoie (Nuova spesa, Pagamento), gruppi recenti.
2. **Movimenti** — storico globale filtrabile (spese, pagamenti, annullamenti, categorie).
3. **Gruppi** — lista + crea + unisciti (codice/QR/amico).
4. **Profilo** — @handle, nome/colore, tema, lingua, sicurezza, elimina account, esci.

Dentro un gruppo: header con **saldo tuo nel gruppo**, poi sezioni Saldi / Chi paga a chi / Spese / Pagamenti / Inviti. FAB "Spesa"; "Pagamento" secondario.

### Navigazione desktop (sidebar)

La sidebar è un menu a sezioni, non una lista di tre voci. Struttura:

- **Panoramica**: Home, Saldi, I tuoi gruppi.
- **Strumenti**: Nuovo gruppo (CTA), Come funziona, App Android, FAQ.
- **Account**: Privacy, Tema chiaro/scuro, Esci.
- In fondo, scheda utente che porta direttamente al profilo.

Le voci sono **solo testo**, senza icone decorative: i simboli generici non
aggiungevano significato. L'attivo ha una barra salvia a sinistra. La sidebar
si comprime con il pulsante in alto e ricorda lo stato; da compressa resta il
badge in alto a sinistra per riaprirla. Sotto 960px diventa un drawer con
pulsante Menu nella topbar, scrim, chiusura con Esc o tocco fuori, focus trap e
ritorno del focus; il contenuto dietro è `inert`. Tutti i controlli sono 44×44.
Niente menu a tendina nascosto: le azioni principali restano visibili. La
sidebar scorre se l'altezza dello schermo è ridotta.

## Componenti

- `HeroBalance`: numero grande, segno+colore, sottotitolo "in questo gruppo"/"in totale".
- `GroupTile`: avatar iniziale, nome, membri, saldo a destra, chevron.
- `PersonRow`: pallino colore, nome (+ "tu"), saldo, azione.
- `ExpenseTile`: icona categoria, descrizione, "ha pagato X", importo, data; stato annullata = barrato + badge.
- `PaymentTile`: freccia A→B, importo, nota, data.
- `EmptyState`: icona, titolo, una riga, **CTA**.
- `Skeleton`: rettangoli con shimmer lento; mai spinner nudo se si conosce la forma.
- `BlanceToast`: errore/conferma flottante, mai pagina bianca/nera, mai JSON.
- `ConfirmSheet`: per azioni distruttive, con nome dell'oggetto e conseguenza.

## Regole non negoziabili

- Niente emoji come icone; icone Material coerenti, 20–24 px.
- Nessuna azione distruttiva al primo tocco: sempre dettaglio o conferma.
- Stati vuoti sempre con CTA.
- Parità light/dark.
- Stringhe solo da localizzazione (IT/EN), mai hardcoded.
- Errore = messaggio umano + Riprova, mai schermata tecnica.
- Loading con contesto: cosa sta succedendo e dove (host/fase) solo in caso di problemi, non in uso normale.

## Anti-pattern

- Design giocoso, illustrazioni cartoon, emoji.
- Gradienti AI viola/rosa.
- Tabelle con overshoot o animazioni lunghe.
- Hover-only (non c'è hover sul telefono).
- Testo < 12 px per informazioni essenziali.

## Stato implementazione (app 1.4.1, Fase 3)

- Token reali in `app-android/lib/ui.dart`: salvia `#5F8D6E`, testo salvia `#3D644B`,
  bottoni `#4A7357` (bianco ≥ 4.5:1), carta `#F5F4EF`, notte `#141816`.
- Font bundled in `assets/fonts`: Inter 400/500/600/700/800, Calistoga regular.
  Calistoga solo per wordmark e numeri hero; Inter per tutto il resto.
- Shell `screens/main_shell.dart`: Home / Movimenti / Gruppi / Profilo, `IndexedStack`.
- `HomeScreen`: hero saldo per valuta, due azioni rapide (Nuovo gruppo, Unisciti),
  tre gruppi recenti, "Vedi tutti"; skeleton e stato vuoto con CTA.
- `ActivityScreen`: ricerca testuale, filtri Tutto/Spese/Pagamenti e categoria
  (endpoint `/api/activity`); tap → gruppo.
- `GroupsScreen`: elenco completo, FAB Nuovo gruppo, ingresso con codice.
- `ProfileScreen`: nome/colore/`@handle`, tema, sicurezza, elimina account, versione.
- Marchio: simbolo b/l in AppBar, login, scheda Informazioni e loader; nessun
  wordmark accanto al simbolo. Il lockup resta fuori dall'interfaccia.
- `GroupScreen`: hero saldo, categorie con icone, ricorrenti, QR/share, invito `@handle`,
  export CSV; sezioni e CTA nella sezione Spese vuota.
- `ExpenseSheet`: categorie, modifica spesa precompilata, ricorrenza
  (giorni/settimane/mesi/anni, intervallo 1/2/3/6).
- `showInviteSheet`: QR del link, codice, share sheet nativo.
- App Links: manifest `autoVerify` + `/.well-known/assetlinks.json` con package
  `com.mirkosio.blance` e fingerprint SHA-256 reale.
- Componenti: `HeroBalance`, `GroupTile`, `ActivityTile`, `Skeleton`, `EmptyState`.
- Movimento: fade di pagina, 200–260 ms, aptica su tab/conferme; `motionDuration`
  azzera le animazioni se il sistema chiede di ridurle.
- Nota: i toast sono ancora gli SnackBar Material (tema scuro, flottanti).
- Categorie: 10 codici stabili (`food`, `groceries`, `transport`, `home`, `travel`,
  `fun`, `health`, `shopping`, `bills`, `other`) con icone Material e colori propri.
- Export CSV usa il foglio di condivisione Android (file temporaneo, nessun permesso
  storage); il sito genera CSV+PDF con reportlab.
- Tassi BCE con cache 12h e fallback statico; il tasso usato resta salvato sulla spesa.
- Non ancora dentro: push Firebase, i18n IT/EN, Sentry (DSN), recupero password email.
