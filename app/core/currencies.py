"""Tabelle valute ISO 4217 complete.

Ogni valuta ha:
- code: codice a 3 lettere (EUR, JPY, USD...)
- name: nome leggibile
- symbol: simbolo per il display
- exponent: cifre decimali nella valuta (la famosa "cifra dopo la virgola")

Punto chiave: non tutte le valute hanno 2 decimali.
EUR/USD = 2, JPY/KRW = 0 (lo yen non ha i centesimi), KWD/BHD = 3.
Il nostro motore salva valori INTERI nella unità minima della valuta,
quindi l'exponent serve a convertire e formattare correttamente.

Es. 1500 "minor" con exponent=2 -> 15.00 ; con exponent=0 -> 1500.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Currency:
    code: str
    name: str
    symbol: str
    exponent: int  # cifre decimali (0, 2, 3)

    @property
    def minor_factor(self) -> int:
        """10^exponent: quanti 'minor units' in una unità maggiore."""
        return 10**self.exponent


def _c(code: str, name: str, symbol: str, exponent: int = 2) -> Currency:
    return Currency(code=code, name=name, symbol=symbol, exponent=exponent)


# Lista completa ISO 4217 (codici attivi). Ordine: prima quelle comuni in
# viaggio/europa, poi il resto in ordine alfabetico.
_CURRENCY_LIST: list[Currency] = [
    # --- Europa / euro e vicine (le più usate in viaggio) ---
    _c("EUR", "Euro", "€", 2),
    _c("GBP", "Sterlina britannica", "£", 2),
    _c("CHF", "Franco svizzero", "Fr", 2),
    _c("SEK", "Corona svedese", "kr", 2),
    _c("NOK", "Corona norvegese", "kr", 2),
    _c("DKK", "Corona danese", "kr", 2),
    _c("ISK", "Corona islandese", "kr", 0),
    _c("PLN", "Zloty polacco", "zł", 2),
    _c("CZK", "Corona ceca", "Kč", 2),
    _c("HUF", "Forungho ungherese", "Ft", 2),
    _c("RON", "Leu rumeno", "lei", 2),
    _c("BGN", "Lev bulgaro", "лв", 2),
    _c("HRK", "Kuna croata", "kn", 2),
    _c("RUB", "Rublo russo", "₽", 2),
    _c("UAH", "Hryvnia ucraina", "₴", 2),
    _c("TRY", "Lira turca", "₺", 2),
    _c("MKD", "Denar macedone", "ден", 2),
    _c("ALL", "Lek albanese", "L", 2),
    _c("BAM", "Marco convertibile", "KM", 2),
    _c("MDL", "Leu moldavo", "L", 2),
    _c("RSD", "Dinar serbo", "дин", 2),
    _c("BYN", "Rublo bielorusso", "Br", 2),

    # --- Americhe ---
    _c("USD", "Dollaro statunitense", "$", 2),
    _c("CAD", "Dollaro canadese", "$", 2),
    _c("MXN", "Peso messicano", "$", 2),
    _c("BRL", "Real brasiliano", "R$", 2),
    _c("ARS", "Peso argentino", "$", 2),
    _c("CLP", "Peso cileno", "$", 0),
    _c("COP", "Peso colombiano", "$", 2),
    _c("PEN", "Sol peruviano", "S/", 2),
    _c("UYU", "Peso uruguayano", "$U", 2),
    _c("BOB", "Boliviano", "Bs", 2),
    _c("DOP", "Peso dominicano", "RD$", 2),
    _c("GTQ", "Quetzale guatemalteco", "Q", 2),
    _c("JMD", "Dollaro giamaicano", "J$", 2),
    _c("TTD", "Dollaro di Trinidad", "TT$", 2),
    _c("XCD", "Dollaro dei Caraibi orientali", "$", 2),
    _c("VEB", "Bolivar venezuelano", "Bs", 2),
    _c("PAB", "Balboa panamense", "B/.", 2),
    _c("CRC", "Colon costaricano", "₡", 2),
    _c("HNL", "Lempira honduregna", "L", 2),
    _c("NIO", "Cordoba nicaraguegna", "C$", 2),
    _c("PYG", "Guarani paraguaiano", "₲", 0),
    _c("HTG", "Gourde haitiano", "G", 2),

    # --- Asia ---
    _c("JPY", "Yen giapponese", "¥", 0),
    _c("CNY", "Yuan cinese", "¥", 2),
    _c("RMB", "Renminbi cinese", "¥", 2),
    _c("KRW", "Won sudcoreano", "₩", 0),
    _c("INR", "Rupia indiana", "₹", 2),
    _c("THB", "Baht thailandese", "฿", 2),
    _c("VND", "Dong vietnamita", "₫", 0),
    _c("SGD", "Dollaro di Singapore", "S$", 2),
    _c("HKD", "Dollaro di Hong Kong", "HK$", 2),
    _c("TWD", "Dollaro taiwanese", "NT$", 2),
    _c("MYR", "Ringgit malese", "RM", 2),
    _c("IDR", "Rupia indonesiana", "Rp", 2),
    _c("PHP", "Peso filippino", "₱", 2),
    _c("PKR", "Rupia pakistana", "₨", 2),
    _c("BDT", "Taka bengalese", "৳", 2),
    _c("LKR", "Rupia singalese", "Rs", 2),
    _c("NPR", "Rupia nepalese", "रू", 2),
    _c("KHR", "Riel cambogiano", "៛", 2),
    _c("BND", "Dollaro del Brunei", "B$", 2),
    _c("MNT", "Tughrik mongolo", "₮", 2),
    _c("KZT", "Tenge kazako", "₸", 2),
    _c("UZS", "Som uzbeko", "so'm", 2),
    _c("GEL", "Lari georgiano", "₾", 2),
    _c("AZN", "Manat azero", "₼", 2),
    _c("AMD", "Dram armeno", "֏", 2),
    _c("ILS", "Shekel israeliano", "₪", 2),
    _c("JOD", "Dinar giordano", "JD", 3),
    _c("LBP", "Libano libanese", "ل.ل", 2),
    _c("SAR", "Riyal saudita", "﷼", 2),
    _c("AED", "Dirham degli Emirati", "د.إ", 2),
    _c("QAR", "Riyal qatariota", "﷼", 2),
    _c("KWD", "Dinar kuwaitiano", "KD", 3),
    _c("BHD", "Dinar bahreinita", "BD", 3),
    _c("OMR", "Rial omanita", "﷼", 3),
    _c("IRR", "Rial iraniano", "﷼", 2),
    _c("IQD", "Dinar iracheno", "ع.د", 3),

    # --- Africa ---
    _c("ZAR", "Rand sudafricano", "R", 2),
    _c("EGP", "Sterlina egiziana", "E£", 2),
    _c("NGN", "Naira nigeriana", "₦", 2),
    _c("KES", "Scellino kenyano", "KSh", 2),
    _c("TZS", "Scellino tanzaniano", "TSh", 2),
    _c("UGX", "Scellino ugandese", "USh", 0),
    _c("GHS", "Cedi ghanese", "GH₵", 2),
    _c("MAD", "Dirham marocchino", "MAD", 2),
    _c("TND", "Dinar tunisino", "DT", 3),
    _c("LYD", "Dinar libico", "LD", 3),
    _c("DZD", "Dinar algerino", "DA", 2),
    _c("ETB", "Birr etiope", "Br", 2),
    _c("RWF", "Franco ruandese", "FRw", 0),
    _c("XOF", "Franco CFA dell'Africa occidentale", "CFA", 0),
    _c("XAF", "Franco CFA dell'Africa centrale", "FCFA", 0),
    _c("XPF", "Franco del Pacifico", "₣", 0),
    _c("MUR", "Rupia mauritiana", "Rs", 2),
    _c("ZMW", "Kwacha zambiano", "ZK", 2),
    _c("MWK", "Kwacha malawiano", "MK", 2),
    _c("MZN", "Metical mozambicano", "MT", 2),
    _c("AOA", "Kwanza angolano", "Kz", 2),
    _c("BWP", "Pula botswana", "P", 2),
    _c("NAD", "Dollaro namibiano", "N$", 2),
    _c("SDG", "Sterlina sudanese", "ج.س.", 2),
    _c("SOS", "Scellino somalo", "Sh", 2),
    _c("DJF", "Franco gibutiano", "Fdj", 0),
    _c("KMF", "Franco comoriano", "CF", 0),
    _c("GNF", "Franco guineano", "FG", 0),
    _c("LRD", "Dollaro liberiano", "L$", 2),
    _c("SLL", "Leone sierraleonese", "Le", 2),
    _c("SCR", "Rupia delle Seychelles", "SR", 2),
    _c("CVE", "Escudo capoverdiano", "Esc", 2),
    _c("GMD", "Dalasi gambiano", "D", 2),
    _c("LSL", "Loti lesotho", "L", 2),
    _c("SZL", "Lilangeni swati", "L", 2),
    _c("ERN", "Nakfa eritrea", "Nfk", 2),

    # --- Oceania ---
    _c("AUD", "Dollaro australiano", "$", 2),
    _c("NZD", "Dollaro neozelandese", "$", 2),
    _c("FJD", "Dollaro delle Fiji", "FJ$", 2),
    _c("VUV", "Vatu vanuatiano", "VT", 0),
    _c("PGK", "Kina papuana", "K", 2),
    _c("WST", "Tala samoano", "WS$", 2),
    _c("TOP", "Pa'anga tongano", "T$", 2),
    _c("SBD", "Dollaro delle Isole Salomone", "SI$", 2),
    _c("XDR", "SDR (Fondo Monetario)", "SDR", 2),
]


# Indice per lookup rapido. Rimuovo i placeholder non validi (code vuoti/numerici).
CURRENCIES: dict[str, Currency] = {
    cur.code: cur
    for cur in _CURRENCY_LIST
    if cur.name and len(cur.code) == 3 and cur.code.isalpha()
}

# Valute più comuni in testa per i menu a tendina (il resto in ordine).
_PRIORITY = ["EUR", "USD", "GBP", "CHF", "JPY", "THB", "CZK", "PLN", "HRK", "HUF", "RON", "SEK", "NOK", "DKK", "ISK", "TRY", "RUB", "BRL", "MXN", "CAD", "AUD", "ZAR", "EGP", "MAD", "INR", "CNY", "KRW", "SGD", "HKD"]


def get_currency(code: str) -> Currency:
    """Ritorna la valuta per codice. Solleva ValueError se sconosciuta."""
    normalized = (code or "").strip().upper()
    if normalized not in CURRENCIES:
        raise ValueError(f"valuta sconosciuta: {code!r}")
    return CURRENCIES[normalized]


def is_valid_currency(code: str) -> bool:
    try:
        get_currency(code)
        return True
    except ValueError:
        return False


def sorted_currencies() -> list[Currency]:
    """Tutte le valute ordinate: prima le prioritarie, poi alfabetiche."""
    seen: set[str] = set()
    ordered: list[Currency] = []
    for code in _PRIORITY:
        if code in CURRENCIES:
            ordered.append(CURRENCIES[code])
            seen.add(code)
    rest = sorted(
        (c for c in CURRENCIES.values() if c.code not in seen),
        key=lambda c: c.name.lower(),
    )
    ordered.extend(rest)
    return ordered
