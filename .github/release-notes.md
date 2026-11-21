## b-lance 1.9.5 (versionCode 48)

Aggiornamento in-place dalla 1.9.4: stessa chiave di firma, nessuna
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


### Web — nuova home editoriale

- Home ridisegnata da zero come una pagina di rivista finanziaria: testata
  scura a tutta larghezza, titolo in Fraunces, indice dei capitoli nel
  margine, filetti sottili e numeri tabellari. Non è un restyling dei colori:
  cambiano griglia, gerarchia, ritmo e struttura delle sezioni.
- Il capitolo "Come funziona" è pinnato: i tre passaggi scorrono in
  orizzontale mentre la pagina resta ferma, con barra di avanzamento.
- Le funzioni diventano una griglia asimmetrica di sei schede, con la luce
  che segue il puntatore. L'app Android ha una fascia scura dedicata e la
  FAQ un accordion a colonne.
- Movimento costruito con GSAP (timeline d'ingresso, parallasse, pin,
  inclinazione dello scontrino) e Lenis (scroll fluido e ancore). I componenti
  React Bits usati sono Aurora, Particles, Magnet, SpotlightCard e ClickSpark,
  montati come isole sopra il markup server-rendered.
- Con `prefers-reduced-motion` e senza JavaScript la pagina resta completa,
  leggibile e senza contenuti nascosti. Target touch da 44 px e nessuna
  emoji.

### Verifiche

- Suite Python, test JavaScript del sito, `flutter analyze` e `flutter test`
  eseguiti dal workflow di rilascio prima della firma.
- APK release firmato, con checksum SHA-256 accanto al file.
