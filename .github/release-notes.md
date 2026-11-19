## b-lance 1.7.7 (versionCode 27)

Aggiornamento in-place dalla 1.7.1: stessa chiave di firma, nessuna
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
  documentato: niente account creati a raffica.

- Nuova pagina **Statistiche** in ogni gruppo: totale, media, spese per
  categoria, ultimi sei mesi, chi ha pagato e spesa più alta. Barre semplici,
  niente grafici animati; le spese annullate non contano.
- **Budget mensile facoltativo** per gruppo: imposti un limite, vedi quanto
  è rimasto o quanto hai superato. Non blocca alcuna spesa e non avvisa
  nessuno.

### Verifiche

- Suite Python, test JavaScript del sito, `flutter analyze` e `flutter test`
  eseguiti dal workflow di rilascio prima della firma.
- APK release firmato, con checksum SHA-256 accanto al file.
