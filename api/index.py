"""Entry point per Vercel Serverless Functions.

Vercel cerca un'app ASGI esportata come `app` dentro api/: basta reindirizzare
alla vera applicazione. Tutte le rotte del sito (pagine, /api/*, /static,
/.well-known/assetlinks.json) passano da qui grazie alla rewrite in vercel.json.

La richiesta arriva con path "/api/index/<rotta>" (Vercel monta la funzione
sotto il suo percorso): lo scortiamo via prima di passarla a FastAPI, altrimenti
tutte le rotte risulterebbero 404.

La prima richiesta a un'istanza frecca fa partire il lifespan di FastAPI,
che chiama init_db() (create_all + migrazioni minori con retry): Neon anche
lui si sveglia da solo.
"""

from __future__ import annotations

import json
import os

from app.main import app as _application

_FUNCTION_PREFIX = "/api/index"
_BUILD_TAG = "entry-3"


class _StripFunctionPrefix:
    """Rimuove il prefisso del montaggio Vercel dallo scope ASGI."""

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            path = scope.get("path", "/")
            # Diagnostico provvisorio: echo del path grezzo + build tag.
            if path.endswith("__ver"):
                body = json.dumps(
                    {
                        "build": _BUILD_TAG,
                        "raw_path": path,
                        "root_path": scope.get("root_path"),
                        "deployment": os.getenv("VERCEL_DEPLOYMENT_ID", "?"),
                    }
                ).encode()
                await send(
                    {
                        "type": "http.response.start",
                        "status": 200,
                        "headers": [(b"content-type", b"application/json")],
                    }
                )
                await send({"type": "http.response.body", "body": body})
                return
            if path.startswith(_FUNCTION_PREFIX):
                path = path[len(_FUNCTION_PREFIX):] or "/"
                scope["path"] = path
        await self.app(scope, receive, send)


app = _StripFunctionPrefix(_application)
