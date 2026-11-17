## b-lance 1.7.1 (versionCode 21)

Aggiornamento in-place dalla 1.7.0: stessa chiave di firma, nessuna
disinstallazione necessaria.

### Carattere nuovo

- Il wordmark, i saldi in evidenza e i titoli di stato vuoto passano a
  **Fraunces**, un serif da carta stampata con curve morbide e qualche
  spigolo irregolare. Sostituisce Calistoga, che sembrava un Times qualunque.
- Inter resta per tutto il resto dell'interfaccia. Importi sempre tabellari,
  segno esplicito `+`/`−`.

### Movimento discreto

- Le schermate entrano con un fade e pochi pixel di salita: si posano, non
  scivolano. Con "riduci animazioni" di sistema non si muove nulla.
- L'avatar del gruppo vola dall'elenco alla testata del dettaglio, così si
  capisce da dove sei arrivato. Il nome resta visibile anche mentre il
  dettaglio carica.
- Il saldo in evidenza cambia con un fade breve quando registri un
  pagamento: nessun rimbalzo, i numeri non rimbalzano.

### Web

- Il telefono del pannello App è un esempio vero: un tocco salda i conti,
  un altro li riapre. Stato annunciato anche ai lettori di schermo.
- L'indice "In questa pagina" segue la lettura anche nelle pagine corte e
  con molte voci: le ultime non restano più spente.

### Verifiche

- 22 test JavaScript, 32 test delle pagine informative, 37 test Flutter,
  `flutter analyze` pulito.
- APK release firmato, con checksum SHA-256 accanto al file.
