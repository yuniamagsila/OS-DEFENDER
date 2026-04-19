"""Normalize raw crawl results into unified schema."""
from dataclasses import dataclass


@dataclass
class NormalizedMention:
    source_type: str
    source_name: str
    content: str
    url: str
    published_at: str
    profile_id: str
    raw: dict


def normalize(raw: dict) -> NormalizedMention:
    """Convert a raw crawl result dict to NormalizedMention."""
    return NormalizedMention(
        source_type=raw.get("source", "unknown"),
        source_name=raw.get("portal", raw.get("forum", raw.get("platform", "unknown"))),
        content=raw.get("snippet", raw.get("content", "")),
        url=raw.get("url", raw.get("link", "")),
        published_at=raw.get("published_at", ""),
        profile_id=raw.get("profile_id", ""),
        raw=raw,
    )
