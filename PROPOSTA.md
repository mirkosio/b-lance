# Roadmap b-lance

> Aggiornata l’11 novembre 2026. Base: release v23 / app 1.6.0 (`versionCode
> 19`). Le modifiche presenti nel ramo di lavoro non sono ancora pubblicate.
>
> **Ambito della review DeepSeek (11/11):** ha letto README e percorso pubblico
> onboarding/demo senza login. Punteggi e gap descrivono la prima impressione;
> account, gruppi autenticati, flussi Android e offline non sono stati provati.
> Le priorità sotto distinguono quindi suggerimenti pubblici da lavoro tecnico
> già presente nella roadmap: i gap non osservati direttamente vanno verificati.

## Già fatto

- **Release:** APK 1.6.0, workflow CI e checksum. La chiave 1.5.0 è perduta:
  l’aggiornamento richiede la disinstallazione e può cancellare i gruppi
  Cassiere salvati solo sul telefono. Conservare la nuova chiave.
- **Cassiere:** spese modificabili, pagamenti parziali, valute, split uguale,
  esatto, percentuale e per articolo; riepilogo immagine, testo e PDF locale.
- **Sito e fiducia:** FAQ, Privacy, Come funziona e App Android su pagine
  separate; validazione inline, alias nella pagina pubblica, link pubblici a
  scadenza e revoca, export account JSON. Aggiunti anche CTA di pagamento
  precompilate dalle proposte di saldo.
- **Demo senza login:** `/demo` con tre persone, tre spese iniziali, aggiunta di
  una spesa e ricalcolo di saldi e bonifici nel browser. Nessun dato viene
  inviato o salvato; la CTA finale porta alla registrazione.
- **Offline account:** cache di gruppi e movimenti, coda persistente di spese e
  pagamenti, `client_id` idempotenti e indicatore di sincronizzazione. Il retry
  parte al successivo aggiornamento online.

## P0 — Primo utilizzo e fiducia (review pubblica)

1. **Demo senza login:** fatta su `/demo`: gruppo fittizio con spese e saldi,
   modificabile ma non persistente, con CTA finale per creare un account.
2. **Onboarding/homepage:** verificare CTA sopra la piega; spiegazione in tre
   passaggi e breve demo visiva. Semplificare il testo informativo.
3. **Fiducia:** testimonianze solo con consenso, link open source e metriche
   verificabili. Product Hunt/community solo con revisione e pubblicazione
   autorizzata; non inventare recensioni o conteggi.
4. **Promemoria debiti:** frequenza configurabile e opt-out. Email/push sono
   proposte della review, da definire dopo aver configurato provider e credenziali;
   la review non ha verificato i flussi autenticati.

**Accettazione:** demo in un clic senza salvataggio; primo gruppo facile da
creare; CTA e spiegazione comprensibili; testimonianze reali e approvate.
Promemoria disattivabili e consegnati correttamente quando attivati.

## P0 tecnico — Roadmap già aperta

- Gestire invii offline rifiutati e conflitti tra dispositivi.
- Link web read-only del Cassiere e rivendicazione sicura del gruppo locale,
  con accesso revocabile e privacy chiara.

Questi sono gap del piano tecnico, non risultati verificati dalla review senza
login. Accettazione: stato offline comprensibile, modifiche rivedibili e
correggibili, link Cassiere revocabile e trasferimento esplicito.

## P1 — Migrazione e pagamenti

- **PWA iOS:** completare e verificare l’installazione da home screen, istruzioni,
  icone e comportamento offline. Manifest e service worker esistono già; push
  dipende dal supporto iOS e dall’installazione PWA.
- **Pagamenti esterni:** valutare PayPal, Satispay, Revolut e testo SEPA con
  importo precompilato. Solo link/copia verso wallet esterni: b-lance non
  gestisce transazioni.
- **Import CSV:** Splitwise/Tricount con anteprima, mappatura, validazione e
  messaggi chiari; servono file campione dei formati da supportare.
- **Go-to-market:** schede su Product Hunt/AlternativeTo e presentazioni a
  community solo con revisione e pubblicazione autorizzata. Chiedere feedback a
  beta tester; conteggi e recensioni devono essere reali, consensuali e verificati.

**Accettazione P1:** installazione iOS provata su dispositivi supportati; almeno
3 link di pagamento verificati; importazione di file campione con anteprima e
rifiuto sicuro dei formati errati.

## P2 — Automazione e scoperta

- OCR ricevute on-device con revisione manuale prima del salvataggio; obiettivo
  iniziale: importo corretto in almeno l’80% di un set di ricevute concordato.
- Split facoltativo proporzionale al reddito, con quote e dati chiaramente
  visibili ai membri; richiede regole condivise nel gruppo.
- SEO IT/EN, contenuti utili e pagina “Chi siamo”; misurare l’effetto solo con
  analytics privacy-friendly e configurati nel rispetto del consenso.
- Sostegno/donazioni con pagina trasparente; eventuale piano Supporter solo dopo
  aver definito costi e funzionalità senza limitare l’uso gratuito essenziale.
- Widget Android “Il mio saldo” e notifiche locali per ricorrenze/conto da
  chiudere; Firebase push richiede progetto e credenziali.

## P3 — Estensioni

- Calendario per ricorrenze; QR del riepilogo; statistiche e budget;
  internazionalizzazione completa IT/EN (poi eventuali altre lingue).
- Allegati e scansione ricevute oltre il solo OCR; rifiniture e feedback utenti.

## Metriche da introdurre

Conversione visita→registrazione, gruppi creati, utenti attivi, completamento
“gruppo→spesa→saldo”, tempo alla prima spesa, feedback verificati e installazioni
PWA. La scorecard 7.5/10 e i target della review sono valutazioni preliminari,
non benchmark misurati: definire baseline, consenso e fattibilità prima di adottarli.

## Dipendenze e ordine

Provider email, Firebase/FCM, esempi CSV, credenziali di donazione e consenso
per testimonianze sono prerequisiti, non attività già disponibili. Procedere da
P0, poi P1; evitare di avviare promozione, raccolta recensioni o misurazione
esterna senza revisione e autorizzazione.
