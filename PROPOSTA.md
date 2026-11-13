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

## Fatto (12/11)

- Layout desktop centrato nella zona residua della sidebar, con larghezza
  maggiore e pagine informative/demo allineate.
- Dashboard con saldo in evidenza, ricerca, filtri *Tutti / Devi / Ti devono /
  In pari*, saldo per gruppo e rail laterale con azioni e profilo.
- Gruppo con sezioni sticky, pannello “Aggiungi spesa” comprimibile, conferme
  con l’importo e apertura automatica dopo un errore.
- Pagine informative con indice attivo; landing con calcolatore rapido
  “totale / persone” e reveal discreto rispettoso di `reduce motion`.
- Primo gruppo guidato con nome suggerito, valuta spiegata e spesa di esempio
  precompilata; undo immediato su spese e pagamenti annullati.
- Recupero password senza provider email: codici monouso generati
  dall’account, usabili una sola volta e con revoca di tutte le sessioni.
- Link web del Cassiere: riepilogo di sola lettura che si apre nel browser,
  con i dati dentro il link e nessun passaggio dal telefono al server.
- Verifica: 151 test backend, 9 test JavaScript, Lighthouse 100/100 su
  accessibilità, best practice e SEO per home, dashboard, gruppo, demo, FAQ,
  Come funziona, Privacy, recupero password, account e riepilogo Cassiere.

## P0 — Web-app (completato)

1. ~~**Layout desktop.**~~ Contenuto centrato a ≥960 px, larghezza maggiore,
   footer allineato, informative e demo con colonna centrata.
2. ~~**Dashboard app-like.**~~ Saldo, azioni rapide, ricerca, filtri a segmenti,
   griglia gruppi con saldo e rail laterale.
3. ~~**Pagina gruppo.**~~ Sezioni sticky, pannello spesa comprimibile, conferme
   con importo; le sezioni restano raggiungibili senza JavaScript.
4. ~~**Pagine informative.**~~ Indice sticky con sezione attiva e reveal
   discreto; tutto disattivato con `prefers-reduced-motion`.
5. ~~**Onboarding non esperto.**~~ Primo gruppo guidato: nome suggerito a
   tocchi, valuta spiegata, invito con link e QR, spesa di esempio
   precompilata (30,00 €, modificabile) e spiegazione dei saldi. La guida si
   salta e non viene ripetuta.
6. ~~**Prevenzione errori.**~~ Conferme con importo e validazione inline. Dopo
   l’annullamento di una spesa o di un pagamento compare un avviso con
   “Ripristina”: l’undo è immediato, funziona anche senza JavaScript e
   riporta i saldi allo stato precedente.

**Accettazione:** contenuto centrato e largo su desktop; dashboard e gruppo
filtrabili senza ricaricare; interazioni da tastiera con focus visibile e
reduced motion; Lighthouse 100/100; 148 test backend verdi. Wizard e undo sono
coperti da test dedicati (`tests/test_webapp_ui.py`).

## P1 — Fiducia, continuità e import (4–6 settimane)

- **Link web del Cassiere (fatto 12/11):** dall’app si condivide un link di
  sola lettura (`/cashier-link#c=…`). I dati viaggiano dopo il cancelletto,
  quindi il server non li riceve e non li conserva; saldi e bonifici si
  calcolano nel browser. Non c’è scadenza né revoca da remoto: chi ha il link
  lo può rileggere, e il sito lo dice apertamente. **Consegnato nella release
  v24 / app 1.7.0** (13/11), verificato in produzione con saldi, bonifici e
  casi d’errore.
- **Conflitti offline** tra dispositivi: stato comprensibile, modifiche
  rivedibili, scelta esplicita di quale versione tenere, nessuna perdita
  silenziosa. **Primo caso fatto (13/11):** la modifica del gruppo
  (nome/tipo/valuta) confronta lo stato visto dall’utente con quello attuale:
  se nel frattempo qualcun altro ha salvato, la pagina mostra le due versioni
  fianco a fianco e chiede "Tieni la mia versione" o "Tieni l'altra"; se non
  hai cambiato niente non c’è conflitto. Restano da estendere agli altri
  oggetti e da provare con due dispositivi reali.
- **Recupero password (fatto 12/11)**: 8 codici monouso generati
  dall’account, mostrati una sola volta, con hash HMAC nel database. Il
  rientro non richiede email; un codice usato non vale più e tutte le sessioni
  vengono revocate. La **verifica email** resta invece bloccata da un provider
  email e da un dominio credibile.
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

Il link del Cassiere è fatto, ma senza revoca da remoto: è un link che
porta i dati dentro, non un riferimento a una pagina sul server. Se in futuro
servisse revocarlo, servirebbe caricare il riepilogo sul server con consenso
esplicito e scadenza, al prezzo di un dato che oggi non esce dal telefono.

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
