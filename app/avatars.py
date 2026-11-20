"""Avatar del profilo: foto caricata, 16 pixel art animali o iniziale.

Le pixel art sono disegnate qui come rettangoli su griglia 16x16, rese con
SVG `crispEdges`: nessuna emoji, nessuna immagine esterna, nessun giallo.
Il colore di sfondo scelto dall'utente si applica a tutte.
"""

from __future__ import annotations

import base64
import binascii
import re
from html import escape

COLOR_RE = re.compile(r"^#[0-9A-Fa-f]{6}$")
DEFAULT_BG = "#5F8D6E"
MAX_PHOTO_BYTES = 512 * 1024

PIXELS = {
    "d": "#1E2A23",  # contorno e occhi
    "c": "#F5F4EF",  # crema
    "g": "#5F8D6E",  # salvia
    "G": "#85B395",  # salvia chiaro
    "r": "#A84A34",  # terracotta
    "p": "#D98F7B",  # rosa tenue, senza giallo
    "w": "#EFF3EE",
}

# Ogni animale: (nome, lista di rettangoli x,y,w,h,colore su griglia 16x16).
ANIMALS: tuple[tuple[str, tuple[tuple[int, int, int, int, str], ...]], ...] = (
    ("Gatto", ((5, 4, 6, 8, "c"), (4, 3, 2, 3, "c"), (10, 3, 2, 3, "c"),
               (5, 2, 2, 2, "c"), (9, 2, 2, 2, "c"), (6, 6, 1, 1, "d"),
               (9, 6, 1, 1, "d"), (7, 9, 2, 1, "r"))),
    ("Volpe", ((4, 4, 8, 7, "r"), (3, 3, 3, 3, "r"), (10, 3, 3, 3, "r"),
               (5, 7, 6, 3, "c"), (6, 6, 1, 1, "d"), (9, 6, 1, 1, "d"),
               (7, 9, 2, 1, "d"))),
    ("Cane", ((5, 5, 6, 7, "g"), (3, 4, 2, 6, "d"), (11, 4, 2, 6, "d"),
              (6, 7, 1, 1, "d"), (9, 7, 1, 1, "d"), (7, 10, 2, 1, "d"))),
    ("Coniglio", ((5, 6, 6, 6, "c"), (5, 1, 2, 5, "c"), (9, 1, 2, 5, "c"),
                  (6, 7, 1, 1, "d"), (9, 7, 1, 1, "d"), (7, 10, 2, 1, "p"))),
    ("Panda", ((4, 4, 8, 7, "c"), (4, 3, 3, 3, "d"), (9, 3, 3, 3, "d"),
               (5, 6, 2, 2, "d"), (9, 6, 2, 2, "d"), (7, 9, 2, 1, "d"))),
    ("Rana", ((4, 6, 8, 6, "g"), (4, 4, 3, 3, "G"), (9, 4, 3, 3, "G"),
              (5, 5, 1, 1, "d"), (10, 5, 1, 1, "d"), (6, 9, 4, 1, "d"))),
    ("Pinguino", ((5, 3, 6, 10, "d"), (6, 5, 4, 7, "c"), (6, 5, 1, 1, "d"),
                  (9, 5, 1, 1, "d"), (7, 8, 2, 1, "r"), (3, 9, 2, 5, "d"),
                  (11, 9, 2, 5, "d"))),
    ("Gufo", ((4, 4, 8, 8, "g"), (4, 3, 2, 2, "d"), (10, 3, 2, 2, "d"),
              (5, 6, 3, 3, "w"), (8, 6, 3, 3, "w"), (6, 7, 1, 1, "d"),
              (9, 7, 1, 1, "d"), (7, 10, 2, 1, "r"))),
    ("Orso", ((4, 5, 8, 7, "r"), (4, 3, 3, 3, "r"), (9, 3, 3, 3, "r"),
              (6, 7, 1, 1, "d"), (9, 7, 1, 1, "d"), (7, 9, 2, 2, "c"))),
    ("Topo", ((5, 6, 6, 6, "G"), (4, 4, 3, 3, "p"), (9, 4, 3, 3, "p"),
              (6, 7, 1, 1, "d"), (9, 7, 1, 1, "d"), (7, 10, 2, 1, "p"))),
    ("Tartaruga", ((5, 5, 7, 6, "g"), (4, 3, 2, 2, "G"), (11, 3, 2, 2, "G"),
                   (4, 11, 2, 2, "G"), (11, 11, 2, 2, "G"), (6, 6, 2, 2, "d"),
                   (9, 8, 2, 2, "d"))),
    ("Pulcino", ((5, 5, 6, 7, "c"), (5, 4, 2, 2, "c"), (9, 4, 2, 2, "c"),
                 (6, 7, 1, 1, "d"), (9, 7, 1, 1, "d"), (7, 9, 3, 1, "r"))),
    ("Maiale", ((4, 5, 8, 7, "p"), (4, 4, 2, 2, "p"), (10, 4, 2, 2, "p"),
                (6, 7, 1, 1, "d"), (9, 7, 1, 1, "d"), (6, 9, 4, 2, "r"))),
    ("Mucca", ((4, 5, 8, 7, "c"), (4, 4, 2, 2, "c"), (10, 4, 2, 2, "c"),
               (5, 6, 2, 2, "d"), (9, 8, 2, 2, "d"), (6, 7, 1, 1, "d"),
               (9, 7, 1, 1, "d"), (6, 10, 4, 1, "p"))),
    ("Pecora", ((4, 5, 8, 7, "c"), (3, 6, 2, 4, "c"), (11, 6, 2, 4, "c"),
                (5, 5, 2, 2, "c"), (9, 5, 2, 2, "c"), (6, 7, 1, 1, "d"),
                (9, 7, 1, 1, "d"), (6, 10, 4, 2, "d"))),
    ("Anatra", ((4, 6, 8, 6, "c"), (5, 4, 6, 3, "c"), (6, 5, 1, 1, "d"),
                (9, 5, 1, 1, "d"), (3, 8, 3, 1, "c"), (11, 8, 2, 1, "r"))),
)

PRESET_NAMES = tuple(name for name, _ in ANIMALS)


def clean_color(value: str) -> str:
    color = (value or "").strip()
    if not COLOR_RE.match(color):
        raise ValueError("Colore non valido: serve un esadecimale tipo #5F8D6E")
    return color.upper()


def preset_svg(index: int, background: str = DEFAULT_BG) -> str:
    """Pixel art SVG sicuro: index e colore convalidati da chi chiama."""
    try:
        i = int(index)
    except (TypeError, ValueError):
        i = 0
    i = i % len(ANIMALS)
    bg = background if COLOR_RE.match(background or "") else DEFAULT_BG
    _, rects = ANIMALS[i]
    body = "".join(
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{PIXELS[c]}"/>'
        for x, y, w, h, c in rects
    )
    return (
        '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" '
        'xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
        f'<rect width="16" height="16" fill="{bg}"/>{body}</svg>'
    )


def decode_photo(data_url: str) -> tuple[bytes, str]:
    """Accetta un data URL JPEG/PNG prodotto dal browser (già ritagliato)."""
    match = re.match(r"^data:image/(jpeg|png);base64,(.+)$", data_url or "", re.S)
    if not match:
        raise ValueError("Immagine non valida")
    mime = "image/jpeg" if match.group(1) == "jpeg" else "image/png"
    try:
        raw = base64.b64decode(match.group(2), validate=True)
    except (binascii.Error, ValueError):
        raise ValueError("Immagine non valida")
    if not raw or len(raw) > MAX_PHOTO_BYTES:
        raise ValueError("Immagine troppo grande (massimo 512 KB)")
    if mime == "image/jpeg" and not raw.startswith(b"\xff\xd8"):
        raise ValueError("Non è un JPEG")
    if mime == "image/png" and not raw.startswith(b"\x89PNG"):
        raise ValueError("Non è un PNG")
    return raw, mime


def avatar_html(
    user_id: int,
    name: str,
    color: str,
    size: int = 40,
    avatar=None,
) -> str:
    """HTML dell'avatar, con valori sempre escapati."""
    label = escape((name or "?").strip()[:1].upper() or "?")
    if avatar is not None and avatar.kind == "photo" and avatar.data:
        return (
            f'<img class="avatar" src="/avatar/{int(user_id)}" '
            f'alt="" aria-hidden="true" '
            f'style="width:{size}px;height:{size}px;object-fit:cover">'
        )
    bg = color
    if avatar is not None:
        try:
            bg = clean_color(avatar.background)
        except ValueError:
            bg = color
        if avatar.kind == "preset":
            svg = preset_svg(avatar.preset or 0, bg)
            return (
                f'<span class="avatar avatar-svg" aria-hidden="true" '
                f'style="width:{size}px;height:{size}px">{svg}</span>'
            )
    safe_bg = bg if COLOR_RE.match(bg or "") else DEFAULT_BG
    return (
        f'<span class="avatar" aria-hidden="true" '
        f'style="background:{safe_bg};width:{size}px;height:{size}px">'
        f"{label}</span>"
    )
