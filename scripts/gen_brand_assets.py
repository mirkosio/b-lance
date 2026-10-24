"""Genera le icone del marchio b-lance da una sola geometria.

Uso: .venv/bin/python scripts/gen_brand_assets.py

Il marchio è il monogramma "bl" in Calistoga, dentro un badge salvia.
Qui si rasterizza per PWA e per il launcher Android, senza dipendenze SVG.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "app" / "static" / "icons"
RES = ROOT / "app-android" / "android" / "app" / "src" / "main" / "res"
FONT = ROOT / "app-android" / "assets" / "fonts" / "Calistoga-Regular.ttf"

SAGE_TOP = (107, 155, 124)
SAGE_BOTTOM = (71, 104, 79)
SAGE = (95, 141, 110)
PAPER = (245, 244, 239)
SS = 4  # supersampling

# Il monogramma occupa il 62,5% del badge, come nel viewBox SVG 64×64.
MARK_RATIO = 0.625
# Il tracking è -0,09 em: la "l" tocca la pancia della "b".
TRACKING_EM = -0.09


def _rounded_gradient(size: int, radius_ratio: float = 0.25) -> Image.Image:
    """Badge quadrato con angoli tondi e gradiente salvia in diagonale."""
    size *= SS
    grad = Image.new("RGBA", (size, size))
    px = grad.load()
    denom = max(1, 2 * (size - 1))
    for y in range(size):
        for x in range(size):
            t = (x + y) / denom
            color = tuple(
                int(SAGE_TOP[i] + (SAGE_BOTTOM[i] - SAGE_TOP[i]) * t)
                for i in range(3)
            )
            px[x, y] = (*color, 255)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=255
    )
    grad.putalpha(mask)
    return grad


def _monogram(target_height: int, color: tuple[int, int, int] = PAPER) -> Image.Image:
    """Disegna "bl" con il font del wordmark e lo ritaglia al vivo."""
    # Disegno grande, poi ridimensiono: così il risultato è identico a
    # qualsiasi dimensione dell'icona.
    font_size = 1600
    font = ImageFont.truetype(str(FONT), font_size)
    probe = Image.new("RGBA", (8, 8))
    pd = ImageDraw.Draw(probe)
    bb_b = pd.textbbox((0, 0), "b", font=font)
    bb_l = pd.textbbox((0, 0), "l", font=font)
    advance_b = pd.textlength("b", font=font)
    tracking = TRACKING_EM * font_size

    left = bb_b[0]
    right = max(bb_b[2], advance_b + tracking + bb_l[2])
    top = min(bb_b[1], bb_l[1])
    bottom = max(bb_b[3], bb_l[3])
    pad = 80

    canvas = Image.new(
        "RGBA",
        (int(right - left) + pad * 2, int(bottom - top) + pad * 2),
        (0, 0, 0, 0),
    )
    d = ImageDraw.Draw(canvas)
    x = pad - left
    y = pad - top
    d.text((x, y), "b", font=font, fill=(*color, 255))
    d.text((x + advance_b + tracking, y), "l", font=font, fill=(*color, 255))

    bbox = canvas.getbbox()
    if bbox:
        canvas = canvas.crop(bbox)
    width, height = canvas.size
    new_width = max(1, round(width * target_height / max(1, height)))
    return canvas.resize((new_width, target_height), Image.LANCZOS)


def _icon(size: int, *, maskable: bool = False, transparent: bool = False) -> Image.Image:
    canvas_size = size * SS
    if transparent:
        base = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    elif maskable:
        # Full bleed: il sistema applica la maschera (cerchio, squircle…).
        base = Image.new("RGBA", (canvas_size, canvas_size), (*SAGE, 255))
    else:
        base = _rounded_gradient(size)

    mark_h = max(1, round(canvas_size * MARK_RATIO))
    mark = _monogram(mark_h)
    base.alpha_composite(
        mark,
        ((canvas_size - mark.width) // 2, (canvas_size - mark.height) // 2),
    )
    return base.resize((size, size), Image.LANCZOS)


def _foreground(size: int) -> Image.Image:
    """Foreground adattivo: trasparente, monogramma nel 62% centrale."""
    canvas = Image.new("RGBA", (size * SS, size * SS), (0, 0, 0, 0))
    mark = _monogram(max(1, round(size * SS * 0.62)))
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
