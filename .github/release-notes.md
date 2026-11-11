## b-lance 1.6.0 (versionCode 19)

**Attenzione alla firma.** Questa è la prima build firmata con la nuova chiave
di release, conservata come secret del repository. La 1.5.0 aveva una firma
diversa e non è aggiornabile in-place: per installare la 1.6.0 bisogna
disinstallare la versione precedente. Disinstallando si perdono i gruppi salvati
solo in locale nella modalità cassiere; i dati dell'account restano sul server.

### Cassiere locale

- Spese modificabili ed eliminabili con un tocco.
- Pagamenti parziali registrabili e annullabili.
- Valuta per gruppo, con importi sempre in unità minori intere.
- Divisione **parti uguali, importi esatti o percentuale**, con resto
  distribuito al centesimo.
- Riepilogo condivisibile come **immagine** (creata sul telefono, senza upload)
  oppure come testo.

### Link pubblico del riepilogo

- Scadenza automatica dopo **30 giorni**.
- Revoca manuale sempre disponibile.
- Dopo la scadenza link e PDF rispondono 404; un nuovo invio rigenera il link.

### Web e accessibilità

- Navigazione laterale contestuale: “Saldi” e “I tuoi gruppi” solo in dashboard.
- Etichette a 12 px e colori dai token del marchio.
- Testo di sistema rispettato fino al 150% nell'app Android.

### Verifiche

- 123 test backend, 36 test Flutter, `flutter analyze` pulito.
- APK release firmato, con checksum SHA-256 accanto al file.
