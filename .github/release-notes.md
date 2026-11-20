## b-lance 1.9.0 (versionCode 43)

Aggiornamento in-place dalla 1.8.6: stessa chiave di firma, nessuna
disinstallazione necessaria.

### App

- I chip dei saldi (verde per chi deve ricevere, terracotta per chi deve
  pagare) ora leggono i colori del tema: in modalità scura non restano più
  su sfondi chiari con testo illeggibile.
- Il testo di sistema può arrivare al 200%: i layout a colonna reggono
  anche con l'ingrandimento massimo di Android.
- Le icone rapide "Nuovo gruppo" e "Nuova spesa" della home del telefono
  aprono davvero il foglio corrispondente nell'account. Prima aprivano
  sempre il Cassiere locale, anche quando eri già dentro: se non hai ancora
  gruppi, viene proposto prima di crearne uno.
- Dall'app, chi gestisce il gruppo può promuovere o retrocedere un membro e
  rimuoverlo, con conferma. Le stesse regole del sito: il creatore non si
  tocca, non ci si modifica da soli, chi ha saldi aperti non viene rimosso.
- **Promemoria saldi**, disattivati di default: dal Profilo si attivano con
  il permesso di sistema e arrivano una volta alla settimana solo se ci sono
  debiti aperti. Nessun dato lascia il telefono e si possono spegnere quando
  vuoi.

### Web (stesso giro di rilascio)

- Sul telefono condiviso, le pagine dell'account, dei gruppi e i link
  condivisi non restano più nella cache del service worker: dopo il logout
  non si riaprono dalla memoria del browser.
- Se il server rifiuta una spesa (per esempio quote che non tornano), la
  pagina torna con i campi compilati e l'errore scritto accanto al form,
  invece di un avviso che sparisce.
- Il pulsante di invio non resta più bloccato quando un form viene
  annullato dalla validazione della pagina.
- Intestazione del gruppo su schermi stretti: valuta e pulsanti CSV/PDF
  non si sovrappongono più.
- Header di sicurezza su tutte le risposte (tipo di contenuto, frame,
  referrer, permessi).
- Lo stesso footer della home (progetto, prodotto, trasparenza) ora compare
  su tutte le pagine del sito, comprese quelle dell'account.
- Corretti due difetti emersi dai test completi: il cambio password
  funziona di nuovo e il retry per il database che si sveglia non resta
  più appeso.
- Nuova pagina "I tuoi dati" (`/i-tuoi-dati`): cosa salviamo, cosa puoi
  scaricare in JSON e cosa succede se elimini l'account. Collegata dal footer,
  dall'about e dall'account.

- Modifica di una spesa: se un altro dispositivo ha salvato nel frattempo,
  l'app mostra "Tieni la mia / Vedi la versione salvata" e non sovrascrive
  nulla (409). Stessa protezione per un pagamento già annullato.
- Conferma email all'iscrizione, attivabile con `EMAIL_VERIFICATION_REQUIRED=1`
  e un provider SMTP: token firmato e monouso, link di 24 ore, account non
  utilizzabile finché non è confermato. Recupero password via email con link
  di un'ora, accanto ai codici monouso già esistenti.
- Limite di 20 registrazioni all'ora per indirizzo IP già attivo, ora
  documentato; anche i link via email sono limitati a 10 all'ora per IP.
  Se l'invio della conferma fallisce, nessun account viene creato.
- Annullare due volte una spesa o ripristinare qualcosa che non era
  annullato ora dà un conflitto esplicito invece di un esito silenzioso.

- Nuova pagina **Statistiche** in ogni gruppo: totale, media, chi ha pagato
  e spesa più alta. Un grafico a torta mostra la ripartizione per categoria,
  una curva mostra l'andamento degli ultimi sei mesi; sotto, barre con i
  valori esatti. Grafici SVG statici, leggibili senza JavaScript e senza
  animazioni; le spese annullate non contano.
- **Budget mensile facoltativo** per gruppo: imposti un limite, vedi quanto
  è rimasto o quanto hai superato. Non blocca alcuna spesa e non avvisa
  nessuno.

- Corretta la configurazione Android della build: dipendenza delle notifiche
  compatibile con l'SDK già usato e desugaring abilitato.
- Il link del riepilogo era già revocabile e scadeva dopo 30 giorni: ora la
  revoca chiede conferma per evitare un clic accidentale. Il link con i dati
  nel frammento (`#`) resta invece senza server e non revocabile, com'è
  dichiarato pubblicamente.

- **Import CSV** in ogni gruppo per chi può aggiungere spese: carichi il
  file, vedi l'anteprima, scegli quale colonna è descrizione/importo/
  pagatore/data/categoria e confermi. Se una riga non è valida, l'intero
  import viene rifiutato con il numero di riga e non si salva nulla.
  Limite 500 righe e 256 KB, separatori `,`, `;` e tab.
  La compatibilità con export Splitwise/Tricount reali non è ancora
  verificata: serve un file campione fornito da chi lo usa.

- PWA: icona Apple senza parametro di cache (Safari la ignora con la query
  string) e test del service worker che verifica l'apertura offline della
  home, cioè lo schermo d'avvio dell'app installata.

- **Statistiche d'uso con consenso** (`/andamento`): barra discreta che
  chiede una sola volta, preferenza salvata nel browser, nessun cookie di
  tracciamento. Vengono contati solo visite, avvii demo, registrazioni,
  gruppi creati, spese inserite e saldi consultati. Niente IP, email, nomi
  o percorsi salvati; la tabella ha solo giorno ed evento. I numeri sono
  osservati e non vengono fissati obiettivi prima di una baseline reale.

- Nuove pagine **Chi siamo** e **Guida alla vacanza**: chi sta dietro al
  progetto, perché esiste, cosa non è, e cinque passi pratici per dividere
  le spese di un viaggio. Nessuna testimonianza o numero inventato.
  Collegate da footer, hub delle informazioni e sitemap.

- **Wallet di pagamento facoltativi** (PayPal, Satispay, Revolut, IBAN):
  li inserisci tu nel profilo, sul sito e nell'app. Nei bonifici suggeriti
  compare un pulsante per copiare l'handle di chi deve ricevere. b-lance non
  gestisce transazioni e non contatta questi servizi.
- **OCR ricevute on-device** nell'app: dal gruppo premi "Ricevuta",
  fotografi lo scontrino, il testo viene letto sul telefono (nessuna
  immagine inviata a un server) e descrizione, importo e pagatore vanno
  sempre revisionati a mano prima del salvataggio.
- Import CSV: campioni sintetici con intestazioni stile Splitwise e
  Tricount (anche olandese/francese e simboli di valuta) usati nei test,
  insieme alla mappatura delle colonne.
- Non fatta e dichiarata: parità iOS e widget "Il mio saldo": servono un
  progetto iOS e dispositivi reali. Le traduzioni IT/EN complete di sito
  e app restano un passo separato.

- **Foto profilo** nella pagina account: anteprima, caricamento di una foto
  ritagliata sul dispositivo (max 512 KB), 16 avatar geometrici predefiniti
  e semplice iniziale. Il colore di sfondo si può scegliere sia con
  l'iniziale sia con i disegni. L'avatar appare anche nella barra e nella
  dashboard.
- Avvio dell'app più robusto: se notifiche o azioni rapide non sono
  disponibili sul dispositivo, l'app parte comunque e l'errore resta nei log.

- **P0 stabilità**: rimosso temporaneamente il plugin OCR/ML Kit dalla build
  dell'APK. Il codice resta pronto ma disattivato: era il sospetto principale
  del crash immediato su HyperOS 3 / Android 16.
- Avatar: 16 **pixel art** di animali al posto delle figure geometriche,
  colore di sfondo applicabile a disegni e iniziale, salvataggio foto con
  un solo invio alla volta, avatar ora visibile nei membri del gruppo anche
  nell'app.
- Tutto il giallo rimosso da logo e homepage: accenti e sfumature sono ora
  solo verdi salvia, con bianco e nero come neutri.

- **Amici** (`/amici`): aggiungi le persone con `@username` o con un codice
  personale stabile e condivisibile come link. Richiesta, accettazione,
  rifiuto e rimozione; la ricerca mostra solo nome e username, mai email.
  Nella pagina di un gruppo gli amici confermati con username compaiono
  in un menu "Invita amico". Api dedicate per lista, richiesta e risposta.

### Verifiche

- Suite Python, test JavaScript del sito, `flutter analyze` e `flutter test`
  eseguiti dal workflow di rilascio prima della firma.
- APK release firmato, con checksum SHA-256 accanto al file.
