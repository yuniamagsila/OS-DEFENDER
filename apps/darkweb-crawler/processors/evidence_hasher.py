"""Hash and timestamp evidence for chain-of-custody preservation."""
import hashlib
from datetime import datetime, timezone


def hash_content(content: str) -> str:
    """Return SHA-256 hex digest of content."""
    return hashlib.sha256(content.encode("utf-8")).hexdigest()


def create_evidence_record(content: str, source_url: str) -> dict:
    """Create an evidence record with hash, timestamp, and source."""
    return {
        "sha256": hash_content(content),
        "source_url": source_url,
        "captured_at": datetime.now(tz=timezone.utc).isoformat(),
        "content_length": len(content),
    }
