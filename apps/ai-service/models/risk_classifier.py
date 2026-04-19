"""Risk classifier model stub.

In production, replace with a fine-tuned multi-label classifier trained on
reputation threat categories. Can use IndoBERT or a lighter TF-IDF + sklearn model.
"""
from __future__ import annotations

import logging
import re

logger = logging.getLogger(__name__)


CATEGORY_KEYWORDS: dict[str, tuple[str, list[str]]] = {
    "credential_leak": ("CRITICAL", [
        "password", "credential", "bocor", "database dump",
        "combo list", "username", "login", "akun diretas",
    ]),
    "pii_exposure": ("HIGH", [
        "data pribadi", "nik", "ktp", "nomor hp", "alamat",
        "tanggal lahir", "identitas", "doxx",
    ]),
    "data_sale": ("CRITICAL", [
        "jual data", "beli data", "dijual", "harga", "btc", "crypto",
    ]),
    "defamation": ("HIGH", [
        "fitnah", "pencemaran nama", "bohong", "hoaks", "fake news",
        "palsu", "hina",
    ]),
    "fraud_allegation": ("HIGH", [
        "penipuan", "scam", "tipu", "menipu", "penipu",
    ]),
    "viral_negative": ("MEDIUM", [
        "viral", "trending", "ramai", "ribut", "heboh",
    ]),
    "doxxing": ("HIGH", [
        "doxx", "dox", "sebar data", "alamat rumah", "foto ktp",
    ]),
}


def classify_risk(text: str, source_type: str = "surface") -> tuple[str, str, float]:
    """Return (category, severity, confidence).

    Production: use a trained FastText or IndoBERT-based multi-label classifier.
    """
    text_lower = text.lower()

    best_category = "general_mention"
    best_severity = "LOW" if source_type == "surface" else "MEDIUM"
    best_confidence = 0.5
    best_hits = 0

    for category, (severity, keywords) in CATEGORY_KEYWORDS.items():
        hits = sum(1 for kw in keywords if kw in text_lower)
        if hits > best_hits:
            best_hits = hits
            best_category = category
            best_severity = severity
            best_confidence = round(min(0.60 + hits * 0.07, 0.97), 3)

    logger.debug(
        "Risk classify: category=%s severity=%s confidence=%.2f",
        best_category, best_severity, best_confidence,
    )
    return best_category, best_severity, best_confidence


def compute_risk_score(text: str, sentiment: str, source_type: str = "surface") -> int:
    """Compute an integer risk score 0–100 for a single mention."""
    _, severity, confidence = classify_risk(text, source_type)

    base: dict[str, int] = {
        "CRITICAL": 90,
        "HIGH": 70,
        "MEDIUM": 45,
        "LOW": 20,
    }
    score = base.get(severity, 20)

    # Adjust by sentiment
    if sentiment == "NEGATIVE":
        score = min(100, int(score * 1.15))
    elif sentiment == "POSITIVE":
        score = max(0, int(score * 0.5))

    # Scale by confidence
    score = int(score * confidence)
    return max(0, min(100, score))
