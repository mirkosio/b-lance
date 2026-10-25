# b-lance — app Android nativa

App Flutter nativa (nessuna TWA, nessuna WebView) per b-lance. Parla con la
stessa API del sito tramite token Bearer.

## Build

```bash
cd app-android
/home/mirkosio/flutter/bin/flutter pub get
/home/mirkosio/flutter/bin/flutter test
/home/mirkosio/flutter/bin/flutter analyze
/home/mirkosio/flutter/bin/flutter build apk --release \
  --dart-define=API_URL=https://b-lance.vercel.app
```

L'APK esce in `build/app/outputs/flutter-apk/app-release.apk`.

## Marchio

Il simbolo è disegnato in `lib/widgets/logo_mark.dart`: una sola lettera b/l,
asta e piede carta per la `l`, anello salvia per la `b`, badge nero. La stessa
geometria vive in `../app/static/logo-mark.svg`; le icone si rigenerano con
`../scripts/gen_brand_assets.py`.

## Struttura

- `lib/screens/`: Home, Movimenti, Gruppi, Profilo, Gruppo, Login.
- `lib/sheets/`: spese, pagamenti, inviti, informazioni, onboarding.
- `lib/widgets/`: marchio, loader, hero saldo, card e skeleton.
- `lib/api.dart`: client HTTP, DoH di riserva, gestione errori.
- `lib/models.dart`: modelli e parsing JSON.
- `test/`: modelli, formati, dashboard, filtri e Fase 3.

Versione corrente: **1.4.1** (`versionCode 17`).
