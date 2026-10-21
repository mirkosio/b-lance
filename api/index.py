"""Entry point per Vercel Serverless Functions.

Vercel cerca un'app ASGI esportata come `app` dentro api/: basta reindirizzare
alla vera applicazione. Tutte le rotte del sito (pagine, /api/*, /static,
/.well-known/assetlinks.json) passano da qui grazie alla rewrite in vercel.json.

La prima richiesta a un'istanza fredda fa partire il lifespan di FastAPI,
che chiama init_db() (create_all + migrazioni minori con retry): Neon anche
lui si sveglia da solo.
"""

from app.main import app  # noqa: F401
