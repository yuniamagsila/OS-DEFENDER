"""Social media crawler — Twitter/X, TikTok, YouTube."""
import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class SocialPost:
    platform: str
    author: str
    content: str
    url: str
    published_at: str
    likes: int = 0
    source: str = "social"


def crawl_twitter(keywords: list[str]) -> list[SocialPost]:
    """Fetch tweets via Twitter API v2. Requires TWITTER_BEARER_TOKEN env."""
    posts: list[SocialPost] = []
    for kw in keywords:
        logger.info("Twitter crawl: %s (stub)", kw)
        posts.append(SocialPost(
            platform="twitter",
            author="@user_stub",
            content=f"[stub] Tweet tentang {kw}",
            url="https://x.com/stub",
            published_at="2026-04-19T10:00:00Z",
            likes=42,
        ))
    return posts


def crawl_tiktok(keywords: list[str]) -> list[SocialPost]:
    """Crawl TikTok video metadata. Requires unofficial API or scraping."""
    posts: list[SocialPost] = []
    for kw in keywords:
        logger.info("TikTok crawl: %s (stub)", kw)
        posts.append(SocialPost(
            platform="tiktok",
            author="@tiktok_stub",
            content=f"[stub] Video TikTok tentang {kw}",
            url="https://tiktok.com/stub",
            published_at="2026-04-19T08:00:00Z",
            likes=1000,
        ))
    return posts
