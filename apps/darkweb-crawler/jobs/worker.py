"""Worker functions for dark web crawl jobs."""
import logging

from crawlers.paste_monitor import monitor_pastes
from crawlers.breach_monitor import check_breach_apis
from crawlers.marketplace_monitor import monitor_marketplaces
from crawlers.forum_monitor import monitor_forums

logger = logging.getLogger(__name__)

DEMO_IDENTIFIERS = ["demo@example.com", "08123456789"]


def run_paste_job() -> None:
    results = monitor_pastes(DEMO_IDENTIFIERS)
    logger.info("Paste job done: %d findings", len(results))


def run_breach_job() -> None:
    results = check_breach_apis([i for i in DEMO_IDENTIFIERS if "@" in i])
    logger.info("Breach job done: %d findings", len(results))


def run_marketplace_job() -> None:
    results = monitor_marketplaces(DEMO_IDENTIFIERS)
    logger.info("Marketplace job done: %d findings", len(results))


def run_forum_job() -> None:
    results = monitor_forums(DEMO_IDENTIFIERS)
    logger.info("Forum job done: %d findings", len(results))
