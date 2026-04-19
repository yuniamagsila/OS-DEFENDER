"""Google/Bing SERP crawler using SerpAPI."""
import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class SerpResult:
    query: str
    title: str
    link: str
    snippet: str
    source: str = "serp"


def crawl_serp(queries: list[str]) -> list[SerpResult]:
    """Fetch top SERP results for each query.

    In production, call SerpAPI or Bing Search API here.
    """
    results: list[SerpResult] = []
    for query in queries:
        logger.info("SERP crawl: %s (stub)", query)
        results.append(SerpResult(
            query=query,
            title=f"[stub] Hasil pencarian untuk {query}",
            link="https://example.com",
            snippet="Ini adalah hasil stub. Ganti dengan integrasi SerpAPI.",
        ))
    return results
