"""Compatibilità: le icone ora si generano da scripts/gen_brand_assets.py.

Mantengo questo nome perché era citato nella documentazione vecchia.
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from gen_brand_assets import main  # noqa: E402

if __name__ == "__main__":
    main()
