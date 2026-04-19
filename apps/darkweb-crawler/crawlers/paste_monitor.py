"""Monitor paste sites for PII dumps."""
import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)

PASTE_SITES = ["pastebin.com", "ghostbin.com", "riseup.net/paste"]


@dataclass
class PasteFinding:
    site: str
    paste_url: str
    excerpt: str
    matched_identifiers: list[str]
    source: str = "paste"


def monitor_pastes(identifiers: list[str]) -> list[PasteFinding]:
    """Search paste sites for identifiers via Tor.

    In production: use httpx+socks5 proxy (Tor) to fetch recent pastes.
    """
    findings: list[PasteFinding] = []
    for site in PASTE_SITES:
        for ident in identifiers:
            logger.info("Paste monitor: %s @ %s (stub)", ident, site)
            # stub — no real network call
    return findings
