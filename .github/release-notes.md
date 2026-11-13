## b-lance 1.7.0 (versionCode 20)

Aggiornamento in-place dalla 1.6.0: stessa chiave di firma, nessuna
disinstallazione necessaria.

### Link web del riepilogo (Cassiere)

- Nel foglio di condivisione arriva l'opzione **Link web**: oltre a immagine e
  testo, il riepilogo si invia come link che si apre nel browser di chiunque.
- La pagina mostra saldo totale, saldo di ogni persona e i bonifici che
  chiudono il conto, in italiano e con la valuta del gruppo.
- **I dati viaggiano nel link, non sul server.** Il riepilogo è codificato nel
  frammento dopo il cancelletto (`#`), che il browser non invia mai: b-lance
  non riceve, non conserva e non può revocare nulla. Nessuna scadenza: chi ha
  il link lo può riaprire finché lo conserva. Trattarlo come un messaggio
  condiviso, non come una pagina privata.

### Offline, con stato chiaro

- In home compare un avviso quando stai vedendo l'ultima copia salvata sul
  telefono, quando ci sono modifiche in attesa di sincronizzazione e quando la
  sincronizzazione è in pausa.
- Le modifiche fatte offline partono in ordine al riconnettersi: ogni operazione
  mantiene il suo identificatore, quindi un retry non duplica spese o pagamenti.
- Se il DNS del telefono non risolve il server, si riprova con il DNS cifrato
  di riserva.

### Pagamenti

- Il foglio "Registra pagamento" accetta importi parziali, come sul sito: si
  salda anche a rate.

### Web

- Link web e pagina `/cashier-link` aggiornati insieme: un riepilogo condiviso
  dall'app si apre identico sul sito di produzione.

### Verifiche

- 151 test backend, 21 test JavaScript, 37 test Flutter, `flutter analyze` pulito.
- APK release firmato, con checksum SHA-256 accanto al file.
