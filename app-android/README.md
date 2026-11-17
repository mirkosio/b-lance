# b-lance — app Android

App Flutter nativa, senza TWA e senza WebView. Parla con la stessa API del sito
tramite token Bearer, quindi un account creato sul sito funziona anche qui.

## Installazione

Scarica l'APK dalla [pagina delle release](https://github.com/mirkosio/b-lance/releases)
e aprilo sul telefono. Accanto al file c'è il checksum SHA-256, se vuoi
verificare che il download sia integro. Non serve uno store.

Dalla 1.6.0 in poi gli aggiornamenti sono in-place: stessa chiave di firma,
nessuna disinstallazione.

## Sviluppo

```bash
flutter pub get
flutter analyze
flutter test
flutter run --dart-define=API_URL=http://10.0.2.2:8000
```

`10.0.2.2` è il computer host visto dall'emulatore Android: così l'app parla con
il server locale invece che con la produzione.

Per l'APK di release:

```bash
flutter build apk --release --dart-define=API_URL=https://b-lance.vercel.app
```

Il file esce in `build/app/outputs/flutter-apk/app-release.apk`. La firma usa
`android/key.properties` e `android/app/keystore.jks`; senza quelli la build è
firmata con la chiave di debug.

## Struttura

- `lib/screens/`: Home, Movimenti, Gruppi, Profilo, Gruppo, Login.
- `lib/sheets/`: spese, pagamenti, inviti, informazioni, onboarding.
- `lib/widgets/`: marchio, loader, saldo in evidenza, card e skeleton.
- `lib/api.dart`: client HTTP, DNS cifrato di riserva, gestione errori.
- `lib/models.dart`: modelli e parsing JSON.
- `test/`: modelli, formati, dashboard, filtri e flussi principali.

## Marchio

Il simbolo è disegnato in `lib/widgets/logo_mark.dart`: un'unica lettera b/l,
con l'asta e il piede di carta per la `l`, l'anello salvia per la `b` e il badge
scuro. La stessa geometria vive in `../app/static/logo-mark.svg`; le icone si
rigenerano con `../scripts/gen_brand_assets.py`. Palette, tipografia e regole di
interfaccia sono in [`../design-system/b-lance/MASTER.md`](../design-system/b-lance/MASTER.md).
