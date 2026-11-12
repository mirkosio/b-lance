# Roadmap b-lance — product review

> Aggiornata il 12 novembre 2026. Base: release v23 / app 1.6.0
> (`versionCode 19`), sito su `https://b-lance.vercel.app`.
>
> **Metodo.** Lettura del prodotto pubblico e autenticato, audit tecnico
> (`AUDIT.md`), review DeepSeek dell'11/11 (solo percorso pubblico
> onboarding/demo), design system `design-system/b-lance/MASTER.md` e
> linee guida `ui-ux-promax` (onboarding, empty state, conferme, touch,
> reduced motion). I giudizi sono qualitativi: non sono benchmark misurati.

## Verdetto

La base è solida e onesta: soldi in unità minori, permessi lato server,
demo senza login, pagine informative, PWA, app Android nativa, nessuna
pubblicità. Il freno non è la tecnologia: è la **percezione**. Il sito
racconta molto e fa provare poco; alcune pagine sembrano documenti lineari
invece di una web-app. Chi ha poca esperienza deve capire in pochi secondi
tre cose: *chi deve cosa*, *cosa devo fare ora*, *posso fidarmi*.

La review DeepSeek ha visto solo la parte pubblica: i gap su account,
gruppi, offline e Android restano da verificare con test reali, non da
dichiarare risolti.

## Persone da servire

1. **Amici al primo weekend** — poca esperienza, fretta, telefono.
   Vogliono creare un gruppo e capire i saldi senza leggere una guida.
2. **Coinquilini** — spese ricorrenti, più mesi, vogliono storico e export.
3. **Organizzatore** — invita, corregge, chiude i conti; ha bisogno di
   controllo senza potere assoluto.
4. **Chi non ha l'app** — apre un link, vede solo saldi e bonifici, non
   deve registrarsi.
5. **Utente Android senza account** — usa il Cassiere locale e vuole
   portare i conti sul web senza perdere dati.

## Valutazione per area

| Area | Stato | Cosa manca per un utente non esperto | Priorità |
|---|---|---|---|
| Prima impressione | Buona: hero chiaro, demo visibile | Una prova interattiva più vicina alla hero; meno testo prima della CTA | P0 |
| Onboarding | Esiste, ma testuale | Primo gruppo guidato con dati di esempio e “cosa succede dopo” | P0 |
| Architettura web | Lineare, specie su desktop | Shell da web-app: contesto sticky, tab/filtri, rail laterale, progressive disclosure | P0 |
| Grafica | Palette e marchio coerenti | Più gerarchia visiva e ritmo; meno blocchi di testo; motion 4/10 | P0 |
| Accessibilità | Buona base, Lighthouse 100 | Focus visibile, tastiera, target 44, reduced motion su ogni nuova interazione | P0 |
| Conti e sicurezza | Motore affidabile | Prevenire l’errore: anteprima, undo, conferme con conseguenza | P0 |
| Android / offline | Parità buona, conflitti aperti | Risoluzione conflitti comprensibile; link Cassiere verso il web | P1 |
| Fiducia | Open source, gratis, no ads | Pagina “come si mantiene”, privacy in linguaggio semplice, stato dati | P1 |
| Misurazione | Assente | Funnel privacy-friendly con consenso, baseline dichiarata | P2 |

## Principi per chi ha poca esperienza

- **Una decisione per schermata.** Il resto resta visibile ma secondario.
- **Linguaggio comune.** “Chi paga chi”, non “split”; “username”, non “handle”;
  “riepilogo”, non “export”. Glossario inline dove serve.
- **Esempio prima della teoria.** Dati finti modificabili, non muri di testo.
- **Undo meglio della conferma.** Annullare una spesa mostra “Annullata · Undo”
  per pochi secondi; le azioni irreversibili chiedono conferma con il nome.
- **Mai vicoli ciechi.** Ogni errore dice cosa è successo, cosa fare e offre
  un’uscita. Ogni stato vuoto ha una CTA.
- **Il numero è il protagonista.** Saldo, segno e colore sempre leggibili;
  dettagli su richiesta.

## P0 — Rendere il prodotto una web-app (2–3 settimane)

1. **Layout desktop.** Correggere il centraggio a ≥960 px: contenuto centrato
   nella zona residua della sidebar, larghezza massima più ampia, footer
   allineato. Pagine informative e demo con `margin-inline: auto`.
2. **Dashboard app-like.** Saldo in evidenza, azioni rapide, ricerca e filtri
   a segmenti (*Tutti / Devi / Ti devono / In pari*), griglia gruppi e rail
   laterale con profilo e suggerimenti. Filtro client-side, nessun ricaricamento.
3. **Pagina gruppo.** Barra sezioni sticky con stato attivo, filtri spese a
   colpo d’occhio, form “Aggiungi spesa” comprimibile, riepilogo sempre visibile
   su desktop. Le sezioni restano raggiungibili anche senza JavaScript.
4. **Pagine informative.** Indice laterale sticky con sezione attiva, reveal
   discreto allo scroll, “torna su”. Tutto disattivato con `prefers-reduced-motion`.
5. **Onboarding non esperto.** Primo gruppo con nome suggerito, valuta spiegata,
   invito con link e QR, prima spesa precompilata e spiegazione del saldo.
   Possibilità di saltare e riprendere.
6. **Prevenzione errori.** Anteprima della spesa, conferma con nome e importo,
   undo su annullamento, validazione inline, messaggi in italiano semplice.

**Accettazione:** su 1440 px il contenuto è centrato e usa lo spazio; dashboard
e gruppo si filtrano senza ricaricare; ogni nuova interazione funziona da
tastiera, con focus visibile e reduced motion; Lighthouse resta 100/100 su
accessibilità, best practice e SEO; test backend e Flutter verdi.

## P1 — Fiducia, continuità e import (4–6 settimane)

- **Link web del Cassiere** read-only, con rivendicazione sicura del gruppo
  locale, accesso revocabile e privacy chiara. Nessun dato locale caricato
  senza consenso esplicito.
- **Conflitti offline** tra dispositivi: stato comprensibile, modifiche
  rivedibili, scelta esplicita di quale versione tenere, nessuna perdita silenziosa.
- **Recupero password e verifica email**: dipendono da un provider email
  (Resend/SMTP) e da un dominio credibile; senza credenziali restano bloccati.
- **PWA iOS reale**: provare installazione da Safari, icona, offline e
  comportamento al ritorno online su un iPhone fisico.
- **Import CSV** Splitwise/Tricount con anteprima, mappatura colonne,
  validazione e rifiuto sicuro; servono file campione reali.
- **Parità Android**: ruoli e rimozione membro, promemoria locali opt-out,
  widget “Il mio saldo”. Push FCM richiede progetto e credenziali.
- **Fiducia visibile**: pagina “Come si mantiene b-lance” (gratis, open source,
  donazioni trasparenti), privacy in italiano semplice, stato dei propri dati
  ed export. Nessuna recensione o metrica inventata.

**Accettazione:** link Cassiere revocabile e testato; conflitto offline
riprodotto e risolto in due dispositivi; import dei file campione con anteprima;
installazione iOS provata; almeno una pagina di fiducia pubblicata.

## P2 — Misurare e farsi trovare (2–3 mesi)

- **Analytics privacy-friendly** con consenso: visita → demo → registrazione →
  primo gruppo → prima spesa → saldo. Baseline dichiarata prima dei target.
- **SEO e contenuti utili** IT/EN: “dividere spese vacanza”, “conto coinquilini”,
  guide confrontabili, pagina “Chi siamo”. Niente contenuti generati a caso.
- **Pagamenti esterni** (PayPal/Satispay/Revolut): solo link/copia verso wallet,
  con handle o IBAN forniti dall’utente; b-lance non gestisce transazioni.
- **OCR ricevute on-device** con revisione manuale prima del salvataggio;
  obiettivo misurabile su un set di ricevute concordato.
- **Internazionalizzazione IT/EN** di app e sito, con stringhe centralizzate.

## P3 — Estensioni (dopo validazione)

- Split proporzionale al reddito, con regole condivise e quote visibili.
- Calendario ricorrenze, QR del riepilogo, statistiche e budget.
- Allegati e scansione ricevute oltre l’OCR.
- Sostegno/donazioni e eventuale piano Supporter, senza limitare l’uso gratuito.
- Community e beta tester con feedback verificato e consenso.

## Dipendenze esterne (non sono attività già disponibili)

Provider email, Firebase/FCM, file CSV campione, handle/IBAN per i wallet,
DSN Sentry, dominio per email credibili, consenso per testimonianze e
pubblicazione su Product Hunt/community. Senza questi, le voci restano
“proposte”, non “fatte”.

## Metriche da introdurre

Conversione visita→demo→registrazione, gruppi creati, completamento
“gruppo→spesa→saldo”, tempo alla prima spesa, ritorno a 7/30 giorni,
installazioni PWA, export e link condivisi. Definire baseline e consenso
prima di adottare target; nessun numero inventato.

## Ordine consigliato

P0 web-app → P0 onboarding/errori → P1 link Cassiere e conflitti offline →
P1 recupero password/PWA iOS/import → P2 misurazione e contenuti → P3.
La grafica non è un progetto separato: ogni sprint chiude con controllo di
gerarchia, contrasto, focus, target 44 e reduced motion.
