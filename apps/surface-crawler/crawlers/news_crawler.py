"""Indonesian news portal crawler."""
import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)

NEWS_PORTALS = [
    "kompas.com",
    "detik.com",
    "tribunnews.com",
    "cnnindonesia.com",
    "tempo.co",
]


@dataclass
class NewsArticle:
    portal: str
    title: str
    url: str
    published_at: str
    snippet: str
    source: str = "news"


def crawl_news(keywords: list[str]) -> list[NewsArticle]:
    """Crawl berita dari portal ID menggunakan Playwright.

    In production, use Playwright to fetch and parse articles.
    """
    articles: list[NewsArticle] = []
    for portal in NEWS_PORTALS:
        for kw in keywords:
            logger.info("News crawl: %s @ %s (stub)", kw, portal)
            articles.append(NewsArticle(
                portal=portal,
                title=f"[stub] Artikel tentang {kw}",
                url=f"https://{portal}/stub/{kw}",
                published_at="2026-04-19",
                snippet="Ini stub. Ganti dengan Playwright scraping.",
            ))
    return articles
