import os

# I test devono essere deterministici: niente rete BCE.
os.environ.setdefault("BLANCE_FX_LIVE", "0")
