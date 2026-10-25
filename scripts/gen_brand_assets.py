"""Genera le icone del marchio b-lance da una sola geometria.

Uso: .venv/bin/python scripts/gen_brand_assets.py

Il marchio è una sola lettera b/l: l'asta e il piede bianchi sono la l,
l'anello salvia è la b. Badge nero. Qui si rasterizza per PWA e per il
launcher Android, senza dipendenze SVG.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "app" / "static" / "icons"
RES = ROOT / "app-android" / "android" / "app" / "src" / "main" / "res"

INK = (10, 14, 11)
SAGE_TOP = (127, 175, 143)
SAGE_BOTTOM = (71, 104, 79)
PAPER = (245, 244, 239)
BORDER = (53, 71, 59)
SS = 4  # supersampling


def _gradient_square(size: int) -> Image.Image:
    """Gradiente diagonale salvia, piccolo e poi ridimensionato."""
    small = Image.new("RGBA", (64, 64))
    px = small.load()
    for y in range(64):
        for x in range(64):
            t = (x + y) / 126
            color = tuple(
                int(SAGE_TOP[i] + (SAGE_BOTTOM[i] - SAGE_TOP[i]) * t)
                for i in range(3)
            )
            px[x, y] = (*color, 255)
    return small.resize((size, size), Image.Resampling.BICUBIC)


def _mark_layer(size: int) -> Image.Image:
    """Anello salvia + l bianca (asta e piede), su trasparente."""
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    scale = size / 64.0
    ring = _gradient_square(size)
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    cx, cy, r = 38 * scale, 38 * scale, 16 * scale
    md.ellipse([cx - r, cy - r, cx + r, cy + r], fill=255)
    r2 = 8 * scale
    md.ellipse([cx - r2, cy - r2, cx + r2, cy + r2], fill=0)
    ring.putalpha(mask)
    layer.alpha_composite(ring)

    d = ImageDraw.Draw(layer)
    d.rounded_rectangle(
        [16 * scale, 10 * scale, 24 * scale, 53 * scale],
        radius=4 * scale,
        fill=(*PAPER, 255),
    )
    d.rounded_rectangle(
        [10 * scale, 48 * scale, 24 * scale, 53 * scale],
        radius=2.5 * scale,
        fill=(*PAPER, 255),
    )
    return layer


def _badge(size: int, *, rounded: bool = True) -> Image.Image:
    base = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(base)
    if rounded:
        radius = int(size * 0.25)
        d.rounded_rectangle(
            [0, 0, size - 1, size - 1], radius=radius, fill=(*INK, 255)
        )
        d.rounded_rectangle(
            [0, 0, size - 1, size - 1],
            radius=radius,
            outline=(*BORDER, 255),
            width=max(1, round(size / 64)),
        )
    else:
        d.rectangle([0, 0, size, size], fill=(*INK, 255))
    return base


def _icon(size: int, *, maskable: bool = False) -> Image.Image:
    canvas_size = size * SS
    if maskable:
        base = _badge(canvas_size, rounded=False)
        mark_size = max(1, round(canvas_size * 0.625))
    else:
        base = _badge(canvas_size, rounded=True)
        mark_size = canvas_size
    mark = _mark_layer(mark_size)
    base.alpha_composite(
        mark,
        ((canvas_size - mark.width) // 2, (canvas_size - mark.height) // 2),
    )
    return base.resize((size, size), Image.Resampling.LANCZOS)


def _foreground(size: int) -> Image.Image:
    """Foreground adattivo: trasparente, marchio nel 62% centrale."""
    canvas = Image.new("RGBA", (size * SS, size * SS), (0, 0, 0, 0))
    mark = _mark_layer(max(1, round(size * SS * 0.62)))
    canvas.alpha_composite(
        mark, ((canvas.width - mark.width) // 2, (canvas.height - mark.height) // 2)
    )
    return canvas.resize((size, size), Image.Resampling.LANCZOS)


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
