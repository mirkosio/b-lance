## b-lance 1.7.4 (versionCode 24)

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

### Verifiche

- Suite Python, test JavaScript del sito, `flutter analyze` e `flutter test`
  eseguiti dal workflow di rilascio prima della firma.
- APK release firmato, con checksum SHA-256 accanto al file.
