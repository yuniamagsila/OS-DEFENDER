"""Forum crawler — Kaskus, Reddit ID, etc."""
import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)

FORUMS = ["kaskus.co.id", "reddit.com/r/indonesia"]


@dataclass
class ForumPost:
    forum: str
    thread_title: str
    url: str
    author: str
    snippet: str
    source: str = "forum"


def crawl_forums(keywords: list[str]) -> list[ForumPost]:
    """Crawl thread & post dari forum Indonesia.

    In production, use Playwright + anti-bot bypass.
    """
    posts: list[ForumPost] = []
    for forum in FORUMS:
        for kw in keywords:
            logger.info("Forum crawl: %s @ %s (stub)", kw, forum)
            posts.append(ForumPost(
                forum=forum,
                thread_title=f"[stub] Thread tentang {kw}",
                url=f"https://{forum}/stub/{kw}",
                author="anon",
                snippet="Ini stub. Ganti dengan Playwright scraping.",
            ))
    return posts
