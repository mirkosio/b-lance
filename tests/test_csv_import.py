"""Import CSV: anteprima, mappatura e rifiuto sicuro dell'intero file."""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.core.csv_import import (
    ImportError_,
    guess_columns,
    parse_amount,
    parse_csv,
    validate_rows,
)
from app.database import Base, engine
from app.main import app


def test_parse_csv_e_colonne() -> None:
    raw = b"Data;Descrizione;Importo;Pagato da\n18/11;Cena;45,50;Marco\n"
    headers, rows = parse_csv(raw)
    assert headers == ["Data", "Descrizione", "Importo", "Pagato da"]
    assert rows[0]["Importo"] == "45,50"
    mapping = guess_columns(headers)
    assert mapping["descrizione"] == "Descrizione"
    assert mapping["importo"] == "Importo"
    assert mapping["pagatore"] == "Pagato da"
    assert parse_amount("1.234,56") == 123456
    assert parse_amount("45.5") == 4550


def test_intestazione_duplicata_viene_rifiutata() -> None:
    with pytest.raises(ImportError_):
        parse_csv(b"a,a,b\n1,2,3\n")


def test_riga_con_pagatore_sconosciuto_blocca_tutto() -> None:
    rows = [
        {"descrizione": "Cena", "importo": "30,00", "pagatore": "Marco"},
        {"descrizione": "Taxi", "importo": "10,00", "pagatore": "Sconosciuto"},
    ]
    mapping = {"descrizione": "descrizione", "importo": "importo",
               "pagatore": "pagatore"}
    prepared, errors = validate_rows(rows, mapping, {"marco": 1}, 1)
    assert len(prepared) == 1
    assert len(errors) == 1 and "Riga 3" in errors[0]


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


def _setup(client: TestClient) -> int:
    client.post(
        "/register",
        data={"name": "Marco", "email": "marco@example.com", "password": "secret123"},
        follow_redirects=False,
    )
    r = client.post(
        "/groups/new",
        data={"name": "Weekend", "kind": "trip", "base_currency": "EUR"},
        follow_redirects=False,
    )
    return int(r.headers["location"].split("?")[0].rstrip("/").split("/")[-1])


def _upload(client: TestClient, gid: int, content: bytes):
    return client.post(
        f"/groups/{gid}/import",
        files={"file": ("spese.csv", content, "text/csv")},
        follow_redirects=False,
    )


def test_import_da_anteprima_a_spese(client: TestClient) -> None:
    gid = _setup(client)
    page = client.get(f"/groups/{gid}/import")
    assert page.status_code == 200
    assert "Mostra anteprima" in page.text

    csv = (
        "Data,Descrizione,Importo,Pagato da,Categoria\n"
        "18/11,Cena,30.00,Marco,food\n"
        "19/11,Taxi,20,Marco,transport\n"
    ).encode()
    preview = _upload(client, gid, csv)
    assert preview.status_code == 200, preview.text[:300]
    assert "Mappa le colonne" in preview.text
    assert "Cena" in preview.text
    import re
    payload = re.search(r'name="payload" value="([^"]+)"', preview.text).group(1)

    done = client.post(
        f"/groups/{gid}/import/confirm",
        data={
            "payload": payload,
            "col_descrizione": "Descrizione",
            "col_importo": "Importo",
            "col_pagatore": "Pagato da",
            "col_data": "Data",
            "col_categoria": "Categoria",
        },
        follow_redirects=False,
    )
    assert done.status_code == 303, done.text[:300]
    group = client.get(f"/groups/{gid}").text
    assert "Cena" in group and "Taxi" in group
    assert "50,00" in group


def test_import_con_riga_invalida_non_salva_nulla(client: TestClient) -> None:
    gid = _setup(client)
    csv = (
        "Data,Descrizione,Importo,Pagato da\n"
        "18/11,CenaUnica123,30.00,Marco\n"
        "19/11,RegaloUnico123,10.00,Qualcuno\n"
    ).encode()
    preview = _upload(client, gid, csv)
    assert preview.status_code == 200
    import re
    payload = re.search(r'name="payload" value="([^"]+)"', preview.text).group(1)

    bad = client.post(
        f"/groups/{gid}/import/confirm",
        data={
            "payload": payload,
            "col_descrizione": "Descrizione",
            "col_importo": "Importo",
            "col_pagatore": "Pagato da",
        },
        follow_redirects=False,
    )
    assert bad.status_code == 400
    assert "Riga 3" in bad.text
    assert "Nessuna spesa è stata salvata" in bad.text
    group = client.get(f"/groups/{gid}").text
    assert "CenaUnica123" not in group
    assert "RegaloUnico123" not in group
