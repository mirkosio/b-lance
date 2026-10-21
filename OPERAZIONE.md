# OPERAZIONE — come si gestisce b-lance

Guida pratica per chi administra il progetto. Niente teoria, solo comandi.

## Architettura

- **Sito + API**: FastAPI su **Vercel Serverless** (`https://b-lance.vercel.app`),
  entry `api/index.py`, rewrite in `vercel.json`, prefisso `/api/index` tolto
  dal middleware in `app/main.py`.
- **Database**: **Neon** (Postgres) — `DATABASE_URL` nelle variabili d'ambiente
  del progetto Vercel. `init_db()` al primo avvio crea schema e tabelle da solo.
- **App Android**: Flutter nativa in `app-android/`, parla con la stessa API
  (`/api/*`, token Bearer identico al sito).
- **Render**: è solo un possibile vecchio server. Se ancora attivo, si può
  cancellare dal dashboard: non serve più a nulla.

## Deploy del sito/API

Via git (collegato al repo GitHub): push su `main` → Vercel builda da solo.

Oppure forzato dalla CLI:

```bash
npx vercel --prod
```

### Log delle richieste

Ogni richiesta stampa una riga `[req] METODO /path -> STATUS ua=...`:

```bash
npx vercel logs b-lance.vercel.app            # segue in tempo reale (stream)
npx vercel logs b-lance.vercel.app --since 1h # ricerca storica (NO stream!)
```

L'UA `Dart/...` = app Android. `Python-urllib` = script di test.

### Variabili d'ambiente (dashboard Vercel → Settings → Environment Variables)

- `DATABASE_URL` — stringa Neon (sslmode gestito dal codice)
- `SECRET_KEY` — per i token di sessione

## Build e rilascio APK

Ambiente (una tantum):

```bash
export ANDROID_HOME=/home/mirkosio/android-sdk
export ANDROID_SDK_ROOT=/home/mirkosio/android-sdk
export JAVA_HOME=/home/mirkosio/.bubblewrap/jdk/jdk-17.0.11+9   # il system è JRE-only
```

Build e rilascio:

```bash
cd app-android
# 1) bump di version: in pubspec.yaml (version: X.Y.Z+N, N = versionCode Android)
# 2) build (API_URL compilato dentro):
/home/mirkosio/flutter/bin/flutter build apk --release \
  --dart-define=API_URL=https://b-lance.vercel.app
# 3) verifica
/home/mirkosio/android-sdk/build-tools/36.1.0/apksigner verify \
  build/app/outputs/flutter-apk/app-release.apk
# 4) rilascio GitHub
gh release delete vN --cleanup-tag -y
gh release create vN+1 build/app/outputs/flutter-apk/app-release.apk \
  --title "App Android nativa X.Y.Z" --notes "..."
```

Firma: keystore locale `app-android/android/app/upload-keystore.jks`
(alias `android`), presente solo in locale (gitignored).

Mai lanciare DUE build contemporaneamente: si corrompe il NDK (successo).

## Test

```bash
.venv/bin/python -m pytest tests/ -q          # suite locale (100 test)
.venv/bin/python /tmp/opencode/e2e_prod.py     # E2E contro produzione
```

## Guasti già incontrati (non rifarli)

1. **Gate infinito all'avvio (v1.0.1–v1.0.3)**: `shared_preferences_android`
   2.5.1 aveva un bug di binding (`NoSuchMethodError ... SharedPreferencesApiRegistrar`).
   Fissato pinzzando `shared_preferences 2.5.5` + `shared_preferences_android 2.4.28`.
   Inoltre `loadToken`/`saveToken` non bloccano mai l'avvio.
2. **404 ovvio su Vercel**: il preset FastAPI monta tutto sotto `/api/index`;
   il strip va nel middleware di `app/main.py`, non nell'entrypoint.
3. **Telefono che non connette ma Chrome sì**: è il **DNS di sistema Android**
   (Chrome usa un resolver interno). L'errore nell'app è
   "Failed host lookup ... No address associated with hostname".
   L'app dal 1.0.7 ha la **riserva DoH**: se il lookup di sistema fallisce,
   chiede gli indirizzi a Cloudflare via DNS cifrato (1.1.1.1) e connette
   all'IP col TLS sul nome vero — stessa strategia di Chrome, il telefono
   non può più rompere i palle col DNS.
4. **"Email o password errati" su credenziali valide**: il database collegato a
   Vercel è un Neon *altro* da quello di Render — i dati non sono condivisi.

## Link utili

- Sito: https://b-lance.vercel.app
- Release APK: https://github.com/mirkosio/b-lance/releases
- Dashboard: https://vercel.com/mirkosios-projects/b-lance
