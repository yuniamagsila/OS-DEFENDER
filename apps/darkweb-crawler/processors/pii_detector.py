"""Detect PII (email, phone, NIK) in raw text."""
import re
from dataclasses import dataclass, field


@dataclass
class PIIMatch:
    pii_type: str
    value: str
    start: int
    end: int


EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")
PHONE_RE = re.compile(r"(\+62|0)[0-9]{8,12}")
NIK_RE = re.compile(r"\b[0-9]{16}\b")


def detect_pii(text: str) -> list[PIIMatch]:
    matches: list[PIIMatch] = []
    for m in EMAIL_RE.finditer(text):
        matches.append(PIIMatch("email", m.group(), m.start(), m.end()))
    for m in PHONE_RE.finditer(text):
        matches.append(PIIMatch("phone", m.group(), m.start(), m.end()))
    for m in NIK_RE.finditer(text):
        matches.append(PIIMatch("nik", m.group(), m.start(), m.end()))
    return matches
