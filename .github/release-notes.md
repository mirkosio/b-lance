## b-lance 1.7.2 (versionCode 22)

Aggiornamento in-place dalla 1.7.1: stessa chiave di firma, nessuna
disinstallazione necessaria.

### App

- I chip dei saldi (verde per chi deve ricevere, terracotta per chi deve
  pagare) ora leggono i colori del tema: in modalità scura non restano più
  su sfondi chiari con testo illeggibile.
- Il testo di sistema può arrivare al 200%: i layout a colonna reggono
  anche con l'ingrandimento massimo di Android.

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

### Verifiche

- Suite Python, test JavaScript del sito, `flutter analyze` e `flutter test`
  eseguiti dal workflow di rilascio prima della firma.
- APK release firmato, con checksum SHA-256 accanto al file.
