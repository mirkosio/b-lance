"""Genera le icone PWA per B-Lance.

Eseguire una volta: .venv/bin/python scripts/gen_icons.py
Crea PNG in app/static/icons/ ai size richiesti dal manifest.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "app" / "static" / "icons"
OUT.mkdir(parents=True, exist_ok=True)


def _font(size: int):
    """Sceglie un font sans-serif di sistema, fallback di default."""
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def make_icon(size: int, *, maskable: bool = False) -> Image.Image:
    """Icona con gradiente indigo->pink e monogramma 'B'."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Sfondo: gradiente diagonale indigo -> viola.
    top = (99, 102, 241)     # indigo-500
    bottom = (139, 92, 246)  # violet-500
    for y in range(size):
        t = y / max(1, size - 1)
        r = int(top[0] + (bottom[0] - top[0]) * t)
        g = int(top[1] + (bottom[1] - top[1]) * t)
        b = int(top[2] + (bottom[2] - top[2]) * t)
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    # Maschera: cerchio (maskable) o riquadro arrotondato.
    if maskable:
        # Per maskable il contenuto deve stare nella "safe zone" (80%).
        pad = int(size * 0.10)
        # niente bordo: sfondo pieno, solo il glifo nella safe zone.
        glyph_area = int(size * 0.80)
        fnt = _font(int(glyph_area * 0.62))
        _center_text(draw, "B", size, fnt, (255, 255, 255, 255))
        return img

    # Versione non-maskable: riquadro arrotondato con glifo.
    radius = int(size * 0.22)
    # Disegno la mask su un layer separato per i rounded corners.
    mask = Image.new("L", (size, size), 0)
    mdraw = ImageDraw.Draw(mask)
    mdraw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    img.putalpha(mask)

    fnt = _font(int(size * 0.52))
    _center_text(ImageDraw.Draw(img), "B", size, fnt, (255, 255, 255, 255))
    return img


def _center_text(draw, text: str, size: int, font, fill) -> None:
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = (size - w) / 2 - bbox[0]
    y = (size - h) / 2 - bbox[1]
    draw.text((x, y), text, font=font, fill=fill)


def main() -> None:
    specs = [
        (192, False, "icon-192.png"),
        (512, False, "icon-512.png"),
        (512, True, "icon-maskable-512.png"),
        (192, True, "icon-maskable-192.png"),
    ]
    for size, maskable, name in specs:
        img = make_icon(size, maskable=maskable)
        img.save(OUT / name, "PNG")
        print(f"  creato {name} ({size}x{size})")

    # Favicon 64px.
    make_icon(64).save(OUT / "favicon-64.png", "PNG")
    print("  creato favicon-64.png")
    print(f"OK -> {OUT}")


if __name__ == "__main__":
    main()
