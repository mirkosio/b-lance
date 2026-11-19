"""Avatar del profilo: foto caricata, 16 disegni geometrici o iniziale.

Niente emoji. I 16avatar sono figure geometriche generate qui, senza file
da scaricare: cambiano con il colore di sfondo scelto dall'utente.
"""

from __future__ import annotations

import base64
import binascii
import re
from html import escape

COLOR_RE = re.compile(r"^#[0-9A-Fa-f]{6}$")
PRESET_COLORS = ("#5f8d6e", "#a8823c", "#a84a34", "#47684f")
DEFAULT_BG = "#5f8d6e"
MAX_PHOTO_BYTES = 512 * 1024
SHAPES = ("circle", "square", "triangle", "hexagon")


def clean_color(value: str) -> str:
    color = (value or "").strip()
    if not COLOR_RE.match(color):
        raise ValueError("Colore non valido: serve un esadecimale tipo #5F8D6E")
    return color.upper()


def preset_svg(index: int, background: str = DEFAULT_BG) -> str:
    """SVG sicuro: index e colore sono convalidati da chi chiama."""
    try:
        i = int(index)
    except (TypeError, ValueError):
        i = 0
    i = i % 16
    shape = SHAPES[i // 4]
    fg = PRESET_COLORS[i % 4]
    bg = background if COLOR_RE.match(background) else DEFAULT_BG
    if shape == "circle":
        art = f'<circle cx="32" cy="32" r="17" fill="{fg}"/>'
    elif shape == "square":
        art = f'<rect x="15" y="15" width="34" height="34" rx="8" fill="{fg}"/>'
    elif shape == "triangle":
        art = f'<path d="M32 12 L52 50 H12 Z" fill="{fg}"/>'
    else:
        art = (
            '<path d="M32 11 L50 21 V43 L32 53 L14 43 V21 Z" fill="'
            + fg + '"/>'
        )
    return (
        f'<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" '
        f'aria-hidden="true"><rect width="64" height="64" fill="{bg}"/>'
        f"{art}</svg>"
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
