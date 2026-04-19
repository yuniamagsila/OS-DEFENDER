"""Monitor dark web marketplaces for data sales."""
import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class MarketplaceFinding:
    marketplace: str
    listing_title: str
    data_description: str
    price_btc: float
    matched_identifiers: list[str]
    severity: str = "CRITICAL"
    source: str = "marketplace"


def monitor_marketplaces(identifiers: list[str]) -> list[MarketplaceFinding]:
    """Crawl dark web marketplaces via Tor circuit.

    In production: use Tor SOCKS5 proxy to access .onion URLs.
    Rotate circuits after each request.
    """
    findings: list[MarketplaceFinding] = []
    for ident in identifiers:
        logger.info("Marketplace monitor: %s (stub)", ident)
        # stub — no real Tor call
    return findings
