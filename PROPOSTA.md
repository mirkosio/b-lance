# Prossimo ciclo — funzioni Android native

Stato di partenza: **1.4.1** (`versionCode 17`), marchio b/l, service worker
corretto, 118 test backend e 25 test Flutter verdi. Questa è la proposta per il
salto da “app per gruppi” a “cassiere di viaggio”; non è ancora implementata.

## 1. Modalità cassiere (un telefono per tutto il gruppo)

**Problema.** Oggi ogni partecipante deve installare l’app o aprire il sito per
vedere i conti. In vacanza non è realistico: molti vogliono solo “quanto devo
dare a Marco?”.

**Proposta.**
- Un solo telefono crea un **gruppo locale** senza account: nome gruppo,
  partecipanti inseriti a mano, valuta.
- Il cassiere registra spese e pagamenti; i saldi si calcolano sul telefono.
- Alla fine (o in qualsiasi momento) genera un **riepilogo condivisibile**:
  link web read-only, immagine/PDF o messaggio WhatsApp con saldi e bonifici.
- Chi ha un account può **rivendicare** il gruppo in un secondo momento: il
  gruppo locale viene caricato e diventa un gruppo normale, senza perdere lo
  storico.
- Chi non ha l’app non deve registrarsi: il link apre una pagina web con il
  riepilogo, senza modifiche.

**Perché è forte.** Riduce l’attrito dell’invito a zero e trasforma b-lance in
uno strumento che funziona anche quando il gruppo non è “digitale”.

**Decisioni da prendere.**
- Il riepilogo pubblico è un’istantanea (solo lettura) o un link sempre
  aggiornato? Consiglio: link firmato, sempre aggiornato, con scadenza.
- Il gruppo locale vive in SQLite cifrato? Sì, con backup/export.
- Chi può rivendicare il gruppo? Solo chi lo ha creato sul telefono, tramite
  codice monouso.

## 2. Offline e viaggio

**Problema.** In aereo, in montagna o all’estero la rete manca. Oggi l’app
dipende dall’API per leggere i gruppi e calcolare i saldi.

**Proposta.**
- **Cache locale di lettura** di gruppi, spese, pagamenti e saldi: l’app apre
  l’ultimo stato anche senza rete.
- **Coda di scrittura** per nuove spese/pagamenti: ogni operazione ha un
  `client_id` UUID, viene salvata in locale e inviata quando torna la rete.
- **Idempotenza** lato server: lo stesso `client_id` non crea duplicati.
- **Conflitti**: il server resta la fonte di verità; in caso di modifica
  concorrente vince l’ultima operazione con timestamp server, ma l’app mostra
  “questo dato è stato aggiornato da un altro dispositivo”.
- **Tassi di cambio** e categorie restano disponibili offline con l’ultima
  copia scaricata.
- Indicatore chiaro “Offline — modifiche in attesa” e pulsante “Sincronizza”.

**Fasi.**
1. Lettura offline (cache + schermate vuote informative).
2. Scrittura offline in coda, solo spese e pagamenti.
3. Risoluzione conflitti e sync automatica su riconnessione.

## 3. Inviti e riepiloghi senza attrito

- Link invito già esistente: mantenerlo, ma aggiungere **anteprima del gruppo**
  e “partecipa senza account” per il riepilogo.
- Riepilogo condivisibile con:
  - totali per persona;
  - “chi paga chi” già semplificato;
  - elenco spese raggruppate per categoria;
  - note e pagamenti parziali.
- Formati: link web, immagine verticale per WhatsApp, PDF.
- Nessuna rubrica, nessun upload di contatti.

## 4. Novità Android native

- **Widget** “Il mio saldo” con aggiornamento periodico.
- **Quick action** “Nuova spesa” e “Nuovo gruppo” dal launcher.
- **Notifiche locali** per ricorrenze e “conto da chiudere” (senza Firebase).
- **Condivisione nativa** già presente: estenderla a riepilogo immagine/PDF.
- **App Links** già presenti: aggiungere fallback web se l’app non è installata.
- **Material You** per il tema dinamico, mantenendo i token b-lance come
  fallback.

## Priorità consigliata

| Priorità | Intervento | Perché | Stima |
|---|---|---|---|
| P0 | Cache di lettura offline + stato “offline” | evita schermate vuote in viaggio | 1–2 giorni |
| P0 | Riepilogo condivisibile read-only | chiude il cerchio con chi non ha l’app | 2–3 giorni |
| P1 | Modalità cassiere con gruppo locale | il differenziatore di prodotto | 3–5 giorni |
| P1 | Coda di scrittura offline + idempotenza | rende l’offline utile davvero | 3–4 giorni |
| P2 | Rivendicazione gruppo locale | ponte verso gli account | 2–3 giorni |
| P2 | Widget e quick action | presenza quotidiana | 2 giorni |

## Rischi tecnici

- **Doppia fonte di verità** tra gruppo locale e server: serve un protocollo
  chiaro di merge e un codice di rivendicazione monouso.
- **Privacy del riepilogo**: il link deve essere firmato, non indicizzabile,
  con scadenza e possibilità di revoca.
- **Dati sensibili sul telefono**: SQLite cifrato e export esplicito.
- **Test**: servono test di sincronizzazione, idempotenza, conflitti e
  migrazione locale → server; non basta testare le singole schermate.

## Domande per il proprietario

1. Il riepilogo condiviso deve essere **sempre aggiornato** o una fotografia
   del momento?
2. La modalità cassiere deve funzionare **senza alcun account** anche per il
   creatore, o basta un account per salvare?
3. Il primo rilascio offline deve coprire solo **lettura** o anche scrittura?
4. Widget e quick action sono utili subito o meglio dopo la modalità cassiere?
