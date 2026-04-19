"""Dark web content classifier — determines category and severity of dark web findings."""
from __future__ import annotations

import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class DarkWebClassification:
    category: str
    severity: str
    confidence: float
    pii_types: list[str]
    recommended_action: str


DARK_WEB_SIGNATURES: dict[str, tuple[str, str, list[str]]] = {
    "credential_leak": (
        "CRITICAL",
        "Reset semua credential yang bocor segera",
        ["password", "credential", "combo", "dump", "hash", "plaintext", "breach"],
    ),
    "pii_sale": (
        "CRITICAL",
        "Koordinasi dengan legal, laporkan ke BSSN",
        ["jual data", "dijual", "database", "harga", "btc", "crypto", "daftar lengkap"],
    ),
    "doxxing": (
        "HIGH",
        "Dokumentasikan bukti, ajukan takedown segera",
        ["alamat rumah", "foto ktp", "nik", "nomor hp", "doxx", "dox"],
    ),
    "targeted_threat": (
        "CRITICAL",
        "Buka kasus darurat ke konsultan + lapor ke kepolisian",
        ["akan diserang", "balas dendam", "target", "ancam", "bunuh", "hack"],
    ),
    "forum_discussion": (
        "MEDIUM",
        "Monitor thread, siapkan counter-narrative jika eskalasi",
        ["bahas", "diskusi", "tanya", "info", "gimana", "cerita"],
    ),
    "paste_dump": (
        "HIGH",
        "Verifikasi data, reset credential terkait, notifikasi pihak terdampak",
        ["paste", "dump", "leak", "raw", "list", "bocoran"],
    ),
}


PII_PATTERNS: dict[str, list[str]] = {
    "email": ["@", ".com", ".id"],
    "phone": ["+62", "08"],
    "nik": ["1234567890123456"],  # pattern check only
    "credential": ["password", "pass:", "pwd:"],
    "financial": ["rekening", "kartu kredit", "cvv", "pin"],
}


def classify_dark_web(text: str) -> DarkWebClassification:
    """Classify dark web content and extract relevant signals."""
    text_lower = text.lower()

    best_category = "unknown_dark_web"
    best_severity = "MEDIUM"
    best_confidence = 0.5
    best_action = "Monitor dan dokumentasikan temuan"
    best_hits = 0

    for category, (severity, action, keywords) in DARK_WEB_SIGNATURES.items():
        hits = sum(1 for kw in keywords if kw in text_lower)
        if hits > best_hits:
            best_hits = hits
            best_category = category
            best_severity = severity
            best_action = action
            best_confidence = round(min(0.60 + hits * 0.07, 0.97), 3)

    # Detect PII types in content
    detected_pii: list[str] = []
    for pii_type, indicators in PII_PATTERNS.items():
        if any(ind in text_lower for ind in indicators):
            detected_pii.append(pii_type)

    logger.info(
        "DW classify: category=%s severity=%s pii=%s",
        best_category, best_severity, detected_pii,
    )

    return DarkWebClassification(
        category=best_category,
        severity=best_severity,
        confidence=best_confidence,
        pii_types=detected_pii,
        recommended_action=best_action,
    )
