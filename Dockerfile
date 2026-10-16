# B-Lance — immagine del backend.
# Usata solo se la piattaforma builda in Docker; con il runtime Python
# nativo di Render questo file viene ignorato.
FROM python:3.12-slim

LABEL org.opencontainers.image.title="B-Lance" \
      org.opencontainers.image.description="B-Lance - dividi le spese con amici" \
      org.opencontainers.image.source="https://github.com/mirkosio/b-lance"

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 8000

# La porta la assegna la piattaforma ($PORT su Render); 8000 è il fallback
# per l'uso locale. Con la porta fissa il servizio non rispondeva al health
# check del provider.
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
