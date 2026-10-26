"""Export di un gruppo: CSV per Excel e PDF leggibile.

Regola: si esporta TUTTO lo storico (anche le spese annullate, marcate),
mentre i saldi usano solo le spese attive. Nessun ricalcolo: si leggono gli
importi già salvati.
"""

from __future__ import annotations

import csv
import io
from datetime import datetime, timezone
from xml.sax.saxutils import escape

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from .core.categories import category_label
from .core.money import format_amount
from .models import Expense, Group, Payment, User
from .services import compute_balances


def _num(minor: int, code: str) -> str:
    """Importo con segno, in formato italiano (i saldi possono essere negativi)."""
    value = int(minor)
    sign = "-" if value < 0 else ""
    return sign + format_amount(abs(value), code, symbol=False).replace(".", ",")


def _money(minor: int, code: str) -> str:
    value = int(minor)
    sign = "-" if value < 0 else ""
    return sign + format_amount(abs(value), code, symbol=True)


def _date(value: datetime | None) -> str:
    if value is None:
        return ""
    return value.strftime("%d/%m/%Y")


def build_export(db: Session, group: Group) -> dict:
    view = compute_balances(db, group)
    names = {m.user_id: m.name for m in view.members}
    expenses = db.scalars(
        select(Expense)
        .options(selectinload(Expense.shares))
        .where(Expense.group_id == group.id)
        .order_by(Expense.created_at.asc())
    ).all()
    payments = db.scalars(
        select(Payment)
        .where(Payment.group_id == group.id)
        .order_by(Payment.created_at.asc())
    ).all()
    all_ids = {e.paid_by for e in expenses} | {
        p.from_user for p in payments
    } | {p.to_user for p in payments}
    missing = all_ids - set(names)
    if missing:
        extra = dict(
            db.execute(select(User.id, User.name).where(User.id.in_(missing))).all()
        )
        names.update(extra)
    return {
        "view": view,
        "names": names,
        "expenses": expenses,
        "payments": payments,
    }


def group_csv(db: Session, group: Group) -> str:
    data = build_export(db, group)
    names = data["names"]
    out = io.StringIO()
    writer = csv.writer(out, delimiter=";", lineterminator="\r\n")
    writer.writerow(["B-Lance", group.name])
    writer.writerow(["Valuta base", group.base_currency])
    writer.writerow(["Generato", datetime.now(timezone.utc).strftime("%d/%m/%Y %H:%M")])
    writer.writerow([])
    writer.writerow(["SALDI"])
    writer.writerow(["Membro", "Saldo", "Valuta"])
    for m in data["view"].members:
        writer.writerow([m.name, _num(m.net_minor, group.base_currency), group.base_currency])
    writer.writerow([])
    writer.writerow(["SPESE"])
    writer.writerow(
        [
            "Data",
            "Descrizione",
            "Categoria",
            "Stato",
            "Pagato da",
            "Importo",
            "Valuta",
            "Importo base",
            "Quote",
        ]
    )
    for e in data["expenses"]:
        shares = "; ".join(
            f"{names.get(s.user_id, '?')}: {_num(s.amount_minor, group.base_currency)}"
            for s in e.shares
        )
        writer.writerow(
            [
                _date(e.created_at),
                e.description,
                category_label(e.category),
                "Annullata" if e.voided_at else "Attiva",
                names.get(e.paid_by, "?"),
                _num(e.amount_minor, e.currency),
                e.currency,
                _num(e.base_amount_minor, group.base_currency),
                shares,
            ]
        )
    writer.writerow([])
    writer.writerow(["PAGAMENTI"])
    writer.writerow(["Data", "Da", "A", "Importo", "Valuta", "Nota"])
    for p in data["payments"]:
        writer.writerow(
            [
                _date(p.created_at),
                names.get(p.from_user, "?"),
                names.get(p.to_user, "?"),
                _num(p.amount_minor, p.currency),
                p.currency,
                p.note or "",
            ]
        )
    # BOM: Excel italiano apre subito le lettere accentate.
    return "\ufeff" + out.getvalue()


def group_pdf(db: Session, group: Group) -> bytes:
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
    from reportlab.lib.units import mm
    from reportlab.platypus import (
        Paragraph,
        SimpleDocTemplate,
        Spacer,
        Table,
        TableStyle,
    )

    data = build_export(db, group)
    names = data["names"]
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
        title=f"B-Lance - {group.name}",
    )
    styles = getSampleStyleSheet()
    title = ParagraphStyle(
        "BLanceTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=18,
        textColor=colors.HexColor("#33523E"), spaceAfter=4,
    )
    h2 = ParagraphStyle(
        "BLanceH2", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=11,
        textColor=colors.HexColor("#3D644B"), spaceBefore=10, spaceAfter=4,
    )
    small = ParagraphStyle(
        "BLanceSmall", parent=styles["BodyText"], fontName="Helvetica", fontSize=8,
        leading=10,
    )
    story = [Paragraph("b-lance", title)]
    story.append(
        Paragraph(
            f"{group.name} · valuta base {group.base_currency} · "
            f"{datetime.now(timezone.utc).strftime('%d/%m/%Y')}",
            small,
        )
    )

    story.append(Paragraph("Saldi", h2))
    balance_rows = [["Membro", "Saldo"]]
    for m in data["view"].members:
        balance_rows.append(
            [m.name, _money(m.net_minor, group.base_currency)]
        )
    balance_table = Table(balance_rows, colWidths=[90 * mm, 50 * mm], repeatRows=1)
    balance_table.setStyle(
        TableStyle(
            [
                ("FONT", (0, 0), (-1, -1), "Helvetica", 8),
                ("FONT", (0, 0), (-1, 0), "Helvetica-Bold", 8),
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E7EFE9")),
                ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#C9D8CE")),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    story.append(balance_table)

    story.append(Paragraph("Spese", h2))
    exp_rows = [["Data", "Descrizione", "Categoria", "Pagato da", "Importo", "Stato"]]
    for e in data["expenses"]:
        exp_rows.append(
            [
                _date(e.created_at),
                Paragraph(escape(e.description[:90]), small),
                category_label(e.category),
                names.get(e.paid_by, "?"),
                _money(e.amount_minor, e.currency),
                "Annullata" if e.voided_at else "Attiva",
            ]
        )
    if len(exp_rows) == 1:
        story.append(Paragraph("Nessuna spesa.", small))
    else:
        table = Table(
            exp_rows,
            colWidths=[18 * mm, 58 * mm, 30 * mm, 26 * mm, 22 * mm, 18 * mm],
            repeatRows=1,
        )
        table.setStyle(
            TableStyle(
                [
                    ("FONT", (0, 0), (-1, -1), "Helvetica", 7.5),
                    ("FONT", (0, 0), (-1, 0), "Helvetica-Bold", 7.5),
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E7EFE9")),
                    ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#C9D8CE")),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
                    ("TOPPADDING", (0, 0), (-1, -1), 3),
                ]
            )
        )
        story.append(table)

    story.append(Paragraph("Pagamenti", h2))
    pay_rows = [["Data", "Da", "A", "Importo", "Nota"]]
    for p in data["payments"]:
        pay_rows.append(
            [
                _date(p.created_at),
                names.get(p.from_user, "?"),
                names.get(p.to_user, "?"),
                _money(p.amount_minor, p.currency),
                Paragraph(escape((p.note or "")[:70]), small),
            ]
        )
    if len(pay_rows) == 1:
        story.append(Paragraph("Nessun pagamento registrato.", small))
    else:
        table = Table(
            pay_rows,
            colWidths=[18 * mm, 34 * mm, 34 * mm, 26 * mm, 60 * mm],
            repeatRows=1,
        )
        table.setStyle(
            TableStyle(
                [
                    ("FONT", (0, 0), (-1, -1), "Helvetica", 7.5),
                    ("FONT", (0, 0), (-1, 0), "Helvetica-Bold", 7.5),
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E7EFE9")),
                    ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#C9D8CE")),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            )
        )
        story.append(table)

    story.append(Spacer(1, 6 * mm))
    story.append(
        Paragraph(
            "Documento generato da B-Lance. Le spese annullate non entrano nei saldi.",
            small,
        )
    )
    doc.build(story)
    return buffer.getvalue()


def summary_pdf(db: Session, group: Group) -> bytes:
    """Riepilogo pubblico: solo saldi e bonifici, nessun dettaglio privato.

    È il PDF del link condivisibile. Non contiene note, descrizioni delle
    spese, email o username: chi riceve il link vede solo ciò che serve per
    chiudere i conti.
    """
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
    from reportlab.lib.units import mm
    from reportlab.platypus import (
        Paragraph,
        SimpleDocTemplate,
        Spacer,
        Table,
        TableStyle,
    )

    view = compute_balances(db, group)
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title=f"B-Lance - riepilogo {group.name}",
    )
    styles = getSampleStyleSheet()
    title = ParagraphStyle(
        "ShareTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=20,
        textColor=colors.HexColor("#33523E"),
        spaceAfter=4,
    )
    h2 = ParagraphStyle(
        "ShareH2",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=11,
        textColor=colors.HexColor("#3D644B"),
        spaceBefore=12,
        spaceAfter=5,
    )
    small = ParagraphStyle(
        "ShareSmall",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
    )
    story = [Paragraph("b-lance", title)]
    story.append(
        Paragraph(
            f"{escape(group.name)} · valuta {group.base_currency} · "
            f"riepilogo del {datetime.now(timezone.utc).strftime('%d/%m/%Y')}",
            small,
        )
    )
    story.append(Spacer(1, 5 * mm))
    story.append(
        Paragraph(
            f"Totale speso: <b>{_money(view.total_expenses_minor(), group.base_currency)}</b>"
            f" · Membri: <b>{view.active_count()}</b>",
            small,
        )
    )

    story.append(Paragraph("Saldi", h2))
    rows = [["Membro", "Saldo"]]
    for m in view.members:
        if not m.active:
            continue
        rows.append([escape(m.name), _money(m.net_minor, group.base_currency)])
    table = Table(rows, colWidths=[100 * mm, 50 * mm], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("FONT", (0, 0), (-1, -1), "Helvetica", 9),
                ("FONT", (0, 0), (-1, 0), "Helvetica-Bold", 9),
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E7EFE9")),
                ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#C9D8CE")),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(table)

    story.append(Paragraph("Chi paga chi", h2))
    if not view.transfers:
        story.append(Paragraph("Nessun debito in sospeso: il conto è saldato.", small))
    else:
        rows = [["Da", "A", "Importo"]]
        for t in view.transfers:
            rows.append(
                [
                    escape(view.member_name(t.payer_id)),
                    escape(view.member_name(t.payee_id)),
                    _money(t.amount_minor, group.base_currency),
                ]
            )
        table = Table(rows, colWidths=[60 * mm, 60 * mm, 30 * mm], repeatRows=1)
        table.setStyle(
            TableStyle(
                [
                    ("FONT", (0, 0), (-1, -1), "Helvetica", 9),
                    ("FONT", (0, 0), (-1, 0), "Helvetica-Bold", 9),
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E7EFE9")),
                    ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#C9D8CE")),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ]
            )
        )
        story.append(table)
        story.append(
            Paragraph(
                f"Con {len(view.transfers)} bonifici il conto è saldato.",
                small,
            )
        )

    story.append(Spacer(1, 8 * mm))
    story.append(
        Paragraph(
            "Riepilogo generato da b-lance. Le spese annullate non entrano nei saldi. "
            "Il link può essere revocato in qualsiasi momento.",
            small,
        )
    )
    doc.build(story)
    return buffer.getvalue()
