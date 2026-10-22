"""Digital Asset Links: collega l'APK firmato al dominio.

Senza questo file Chrome mostra la barra "sito non verificato"
nell'app installata.
"""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.database import Base, engine
from app.main import app


@pytest.fixture()
def client():
    """Client di test con database pulito per ogni test."""
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def test_assetlinks_serve_lapk(client: TestClient):
    r = client.get("/.well-known/assetlinks.json")
    assert r.status_code == 200
    data = r.json()
    target = data[0]["target"]
    assert target["namespace"] == "android_app"
    assert target["package_name"] == "com.mirkosio.blance"
    # La fingerprint SHA-256 del keystore che firma l'APK.
    assert target["sha256_cert_fingerprints"] == [
        "9F:D8:69:2E:7F:92:8E:B9:07:5D:5F:47:C9:F5:76:A7:45:A7:5B:E7:5C:6E:76:19:49:A2:49:84:6D:E2:F0:3C"
    ]
    assert data[0]["relation"] == ["delegate_permission/common.handle_all_urls"]
