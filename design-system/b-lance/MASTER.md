# b-lance — design system

Palette, caratteri e regole di interfaccia di b-lance. Vale per il sito e per
l'app: se una scelta di design contraddice questo file, è il file che ha ragione.

## Principi

1. **Serio, non corporate.** Sembra uno strumento per i soldi, non una banca.
   Nessun tono intimidatorio, nessuna parola che faccia sentire in colpa.
2. **Il numero è il protagonista.** Saldi e importi si leggono al primo colpo:
   cifre tabulari, segno esplicito e colore con un significato.
3. **Una decisione per schermata.** Nessuna schermata che chiede due cose insieme.
4. **Sezioni stabili, non un unico scroll.** La navigazione ricorda quella delle
   app bancarie: sai sempre dove sei e come tornare indietro.
5. **Movimento discreto.** Si sente la qualità, non si guarda l'animazione.

## Marchio

- **Wordmark**: `b-lance`, minuscolo e compatto. Il nome resta testo: `b` in
  inchiostro, trattino oro, `lance` salvia. Mai "B-Lance" o "Blance"
  nell'interfaccia. Nell'app e nel sito il wordmark non accompagna il simbolo:
  vive nel README, nei lockup e nei materiali estesi.
- **Simbolo**: una sola lettera b/l. L'asta verticale e il piede chiari sono la
  `l`; l'anello salvia è la `b`; il contatore e il badge sono scuri, angoli al
  25%. Niente lettera dentro la lettera, niente doppio monogramma.
- **File**: `app/static/logo-mark.svg` (badge 64×64), `logo-mark-inverse.svg`
  (badge chiaro), `logo.svg` e `logo-lockup-dark.svg` (lockup con wordmark, solo
  per README e materiali estesi). La stessa geometria è in
  `app-android/lib/widgets/logo_mark.dart` e nelle icone generate da
  `scripts/gen_brand_assets.py`.
- **Icona app**: badge scuro con anello salvia e `l` chiara; foreground adattivo
  trasparente, maskable full-bleed. Niente lettera "B" di sistema, niente viola.

## Colori

| Token | Chiaro | Scuro | Uso |
|---|---|---|---|
| `sage` | `#5F8D6E` | `#5F8D6E` | accento, CTA primaria |
| `paper` | `#F5F4EF` | `#141816` | sfondo schermata |
| `card` | `#FFFFFF` | `#191F1B` | superfici |
| `ink` | `#242B27` | `#EFF3EE` | testo primario |
| `pos` | `#3B7A52` | `#3B7A52` | "ti devono", entrate |
| `neg` | `#A0432F` | `#A0432F` | "devi", azioni distruttive |
| `border` | `#E5E2D8` | `#2A322D` | bordi 1 px |
| `muted` | ink 60% | ink 60% | testi secondari |

Niente gradienti viola o rosa. I gradienti salvia sono ammessi solo su hero e
splash, dosati. Testo su superficie sempre ≥ 4.5:1.

## Tipografia

- **Display**: Fraunces, con le assi `SOFT` 30 e `WONK` 1. Solo wordmark, numeri
  in evidenza e titoli di stato vuoto. È un serif da carta stampata, non un
  Times: gli spigoli irregolari sono voluti.
- **Interfaccia**: Inter per tutto il resto, inclusa nel bundle (`assets/fonts`),
  mai scaricata a runtime.
- **Scala**: 11 / 12.5 / 13.5 / 15 / 18 / 24 / 32 / 40. Pesi 400, 600, 700, 800.
- **Importi**: cifre tabulari sempre, segno esplicito `+` / `−`.

## Spazio e forma

- Base 4 pt. Gap tra card e sezioni: 16 px uniformi. Dentro le card: 16–18 px.
- Raggi: card 16, bottoni 13, input 12, chip e badge 999.
- Altezze: pulsanti 52, touch target minimo 44×44.
- Card affiancate: stessa altezza.

## Movimento

- Interazioni: 150–220 ms con `easeOutCubic`.
- Cambio schermata: 250–320 ms, fade con pochi pixel di spostamento.
- Liste: stagger 40–60 ms, solo al primo caricamento, mai sui refresh.
- Nessun overshoot su dati e tabelle: i numeri non rimbalzano.
- Aptica leggera su conferme e azioni distruttive.
- Tutto si azzera con `prefers-reduced-motion` / `MediaQuery.disableAnimations`.
- Niente loop decorativi, shine o glow infiniti.

## Navigazione

Barra in basso con quattro voci, sempre visibile tranne in login e onboarding:

1. **Home** — saldo totale ("ti devono X" / "devi Y"), due scorciatoie (nuova
   spesa, pagamento), gruppi recenti.
2. **Movimenti** — storico globale filtrabile per tipo, categoria e persona.
3. **Gruppi** — elenco, creazione, ingresso con codice o QR.
4. **Profilo** — nome, colore, `@handle`, tema, sicurezza, elimina account, esci.

Dentro un gruppo: saldo tuo in testata, poi Saldi, Chi paga a chi, Spese,
Pagamenti e Inviti. Il pulsante principale è "Spesa"; "Pagamento" resta
secondario.

### Desktop

La sidebar è un menu a sezioni, non una lista di tre voci: **Panoramica**
(Home, Saldi, I tuoi gruppi), **Strumenti** (Nuovo gruppo, Come funziona, App
Android, FAQ), **Account** (Privacy, tema, esci), con la scheda utente in fondo.
Le voci sono solo testo: l'attivo ha una barra salvia a sinistra. Si comprime e
ricorda lo stato; sotto 960 px diventa un drawer con pulsante Menu, scrim,
chiusura con Esc o tocco fuori, focus trap e ritorno del focus. Tutti i
controlli sono 44×44.

## Componenti

- `HeroBalance`: numero grande, segno e colore, sottotitolo "in questo gruppo" o "in totale".
- `GroupTile`: avatar con l'iniziale, nome, membri, saldo a destra, chevron.
- `PersonRow`: pallino colore, nome (con "tu"), saldo, azione.
- `ExpenseTile`: icona categoria, descrizione, "ha pagato X", importo, data; se annullata, barrata con badge.
- `PaymentTile`: freccia A→B, importo, nota, data.
- `EmptyState`: icona, titolo, una riga, una CTA.
- `Skeleton`: rettangoli con shimmer lento; mai un spinner nudo se la forma è nota.
- `ConfirmSheet`: per le azioni distruttive, con il nome dell'oggetto e la conseguenza.

## Regole non negoziabili

- Niente emoji come icone; icone Material coerenti, 20–24 px.
- Nessuna azione distruttiva al primo tocco: sempre dettaglio o conferma.
- Ogni stato vuoto ha una CTA.
- Parità tra tema chiaro e scuro.
- Errore = messaggio umano + "Riprova", mai una schermata tecnica o un JSON.
- Il caricamento dice cosa sta succedendo; i dettagli tecnici compaiono solo
  quando qualcosa non va.
- Le stringhe dell'interfaccia sono in italiano corrente, senza gergo.

## Anti-pattern

- Design giocoso, illustrazioni cartoon, emoji.
- Gradienti viola o rosa da landing generata.
- Tabelle con overshoot o animazioni lunghe.
- Interazioni solo all'hover: sul telefono non esiste.
- Testo sotto i 12 px per informazioni essenziali.
- Numeri o recensioni inventati.
