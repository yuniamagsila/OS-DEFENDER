"""Worker functions that execute crawl jobs."""
import logging

from crawlers.serp_crawler import crawl_serp
from crawlers.news_crawler import crawl_news
from crawlers.forum_crawler import crawl_forums
from crawlers.social_crawler import crawl_twitter

logger = logging.getLogger(__name__)

DEMO_KEYWORDS: list[str] = ["nama_klien", "brand_klien"]


def run_serp_job() -> None:
    results = crawl_serp(DEMO_KEYWORDS)
    logger.info("SERP job done: %d results", len(results))


def run_news_job() -> None:
    articles = crawl_news(DEMO_KEYWORDS)
    logger.info("News job done: %d articles", len(articles))


def run_forum_job() -> None:
    posts = crawl_forums(DEMO_KEYWORDS)
    logger.info("Forum job done: %d posts", len(posts))


def run_social_job() -> None:
    tweets = crawl_twitter(DEMO_KEYWORDS)
    logger.info("Social job done: %d posts", len(tweets))
