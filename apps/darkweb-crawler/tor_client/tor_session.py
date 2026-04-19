"""Tor session management using httpx + SOCKS5."""
import logging
import os

logger = logging.getLogger(__name__)

TOR_PROXY = os.getenv("TOR_SOCKS_PROXY", "socks5://127.0.0.1:9050")


def get_tor_session():  # type: ignore[return]
    """Return an httpx AsyncClient configured to use Tor SOCKS5 proxy.

    In production:
        import httpx
        return httpx.AsyncClient(proxies={"all://": TOR_PROXY}, timeout=30)
    """
    logger.info("Tor session stub. Configure httpx + Tor proxy in production.")
    return None
