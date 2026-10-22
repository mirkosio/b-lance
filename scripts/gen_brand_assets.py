"""Genera le icone del marchio b-lance da una sola geometria.

Uso: .venv/bin/python scripts/gen_brand_assets.py

Il marchio è lo "split b": asta intera + pancia divisa in due archi uguali.
Qui si rasterizza per PWA e per il launcher Android, senza dipendenze SVG.
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "app" / "static" / "icons"
RES = ROOT / "app-android" / "android" / "app" / "src" / "main" / "res"
SAGE_TOP = (107, 155, 124)
SAGE_BOTTOM = (71, 104, 79)
PAPER = (245, 244, 239)
INK = (36, 43, 39)
SAGE = (95, 141, 110)
SS = 4  # supersampling


def _scale_box(x: float, y: float, size: int) -> tuple[float, float]:
    return (x / 64.0 * size * SS, y / 64.0 * size * SS)


def _rounded_gradient(size: int, radius_ratio: float = 0.25) -> Image.Image:
    size *= SS
    grad = Image.new("RGBA", (size, size))
    px = grad.load()
    for y in range(size):
        t = y / max(1, size - 1)
        color = tuple(
            int(SAGE_TOP[i] + (SAGE_BOTTOM[i] - SAGE_TOP[i]) * t) for i in range(3)
        )
        for x in range(size):
            px[x, y] = (*color, 255)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=255
    )
    grad.putalpha(mask)
    return grad


def _mark(size: int, stem: tuple[int, int, int], ring: tuple[int, int, int]) -> Image.Image:
    size *= SS
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)

    # Pancia: due archi uguali, separati da due tagli diagonali.
    cx = 35 / 64 * size
    cy = 36 / 64 * size
    r = 13 / 64 * size
    width = round(7 / 64 * size)
    bbox = [cx - r, cy - r, cx + r, cy + r]
    d.ellipse(bbox, outline=(*ring, 255), width=width)

    # Maschera per i due vuoti diagonali (45° e 225°).
    gap = max(1, round(4.3 / 64 * size))
    mask = Image.new("L", (size, size), 255)
    md = ImageDraw.Draw(mask)
    diag = size
    for angle in (45, 225):
        rad = math.radians(angle)
        md.line(
            [
                (cx - math.cos(rad) * diag, cy - math.sin(rad) * diag),
                (cx + math.cos(rad) * diag, cy + math.sin(rad) * diag),
            ],
            fill=0,
            width=gap,
        )
    layer.putalpha(ImageChops.multiply(layer.getchannel("A"), mask))

    # Asta: sopra la pancia, così i tagli non la intaccano.
    sx0, sy0 = _scale_box(15, 8.5, size // SS)
    sx1, sy1 = _scale_box(23, 55.5, size // SS)
    d.rounded_rectangle(
        [sx0, sy0, sx1, sy1],
        radius=round(4 / 64 * size),
        fill=(*stem, 255),
    )
    return layer


def _icon(size: int, *, maskable: bool = False, transparent: bool = False) -> Image.Image:
    canvas_size = size * SS
    if transparent:
        base = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    elif maskable:
        base = Image.new("RGBA", (canvas_size, canvas_size), (*SAGE_BOTTOM, 255))
    else:
        base = _rounded_gradient(size)
    # Nei maskable il marchio sta nel 62% centrale (safe zone).
    factor = 0.62 if maskable else 0.78
    mark_size = max(1, int(size * factor))
    mark = _mark(mark_size, PAPER, PAPER)
    offset = ((canvas_size - mark.width) // 2, (canvas_size - mark.height) // 2)
    base.alpha_composite(mark, offset)
    return base.resize((size, size), Image.LANCZOS)


def _foreground(size: int) -> Image.Image:
    """Foreground adattivo: trasparente, marchio nel 62% centrale."""
    canvas = Image.new("RGBA", (size * SS, size * SS), (0, 0, 0, 0))
    mark_size = max(1, int(size * 0.62))
    mark = _mark(mark_size, PAPER, PAPER)
    canvas.alpha_composite(
        mark, ((canvas.width - mark.width) // 2, (canvas.height - mark.height) // 2)
    )
    return canvas.resize((size, size), Image.LANCZOS)


def main() -> None:
    SITE.mkdir(parents=True, exist_ok=True)
    for size, maskable, name in [
        (192, False, "icon-192.png"),
        (512, False, "icon-512.png"),
        (192, True, "icon-maskable-192.png"),
        (512, True, "icon-maskable-512.png"),
        (64, False, "favicon-64.png"),
    ]:
        _icon(size, maskable=maskable).save(SITE / name, "PNG")
        print("site", name)

    legacy = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
    fg = {"mdpi": 108, "hdpi": 162, "xhdpi": 216, "xxhdpi": 324, "xxxhdpi": 432}
    for density, size in legacy.items():
        out = RES / f"mipmap-{density}" / "ic_launcher.png"
        out.parent.mkdir(parents=True, exist_ok=True)
        _icon(size).save(out, "PNG")
        print("android", out.relative_to(ROOT))
    for density, size in fg.items():
        out = RES / f"drawable-{density}" / "ic_launcher_foreground.png"
        out.parent.mkdir(parents=True, exist_ok=True)
        _foreground(size).save(out, "PNG")
        print("android", out.relative_to(ROOT))


if __name__ == "__main__":
    main()
