"""Entry point per Vercel Serverless Functions.

Vercel (preset FastAPI) cerca un'app ASGI esportata come `app` dentro api/.
Lo strip del prefisso "/api/index" vive dentro app/main.py (middleware), non
qui: cosi' funziona con qualsiasi entrypoint scelga la piattaforma.

La prima richiesta a un'istanza fredda fa partire il lifespan di FastAPI,
che chiama init_db() (create_all + migrazioni minori con retry): Neon si
sveglia da solo.
"""

from app.main import app  # noqa: F401
