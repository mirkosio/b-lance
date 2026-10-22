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

- Wordmark: `b-lance`, minuscolo, tight. `b-` in inchiostro, `lance` in salvia.
- Mai "B-Lance", mai "Blance" nell'interfaccia.

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
