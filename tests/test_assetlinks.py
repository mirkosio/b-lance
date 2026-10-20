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
    assert target["package_name"] == "com.blance.app"
    # La fingerprint SHA-256 del keystore che firma l'APK.
    assert target["sha256_cert_fingerprints"] == [
        "7E:33:1F:4A:25:8D:DF:B0:B7:46:E9:6D:A7:B6:C0:E1:34:B0:78:FA:36:85:5F:A9:7C:65:55:1E:98:C4:4E:12"
    ]
    assert data[0]["relation"] == ["delegate_permission/common.handle_all_urls"]
