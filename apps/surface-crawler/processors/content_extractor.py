"""Extract main readable content from raw HTML."""
import re


def extract_text(html: str) -> str:
    """Strip HTML tags and return plain text."""
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"\s+", " ", text)
    return text.strip()
