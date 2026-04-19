"""Monitor dark web forums for target mentions."""
import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class ForumFinding:
    forum_onion: str
    thread_title: str
    post_excerpt: str
    matched_identifiers: list[str]
    severity: str = "MEDIUM"
    source: str = "darkweb_forum"


def monitor_forums(identifiers: list[str]) -> list[ForumFinding]:
    """Crawl dark web forums via Tor.

    In production: use aiohttp + SOCKS5 proxy to fetch .onion forum pages.
    """
    findings: list[ForumFinding] = []
    for ident in identifiers:
        logger.info("DW forum monitor: %s (stub)", ident)
        # stub — no real Tor call
    return findings
