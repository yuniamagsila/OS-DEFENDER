"""Main analysis pipeline — orchestrates sentiment, NER, and risk classification."""
from __future__ import annotations

import logging
from dataclasses import dataclass

from models.indobert_sentiment import predict_sentiment
from models.risk_classifier import classify_risk, compute_risk_score
from models.ner_model import extract_target_entities, EntityMatch

logger = logging.getLogger(__name__)


@dataclass
class AnalysisResult:
    text: str
    sentiment: str
    sentiment_score: float
    category: str
    severity: str
    confidence: float
    risk_score: int
    target_hits: list[str]
    entities: list[EntityMatch]


def analyze(
    text: str,
    source_type: str = "surface",
    targets: list[str] | None = None,
) -> AnalysisResult:
    """Run the full analysis pipeline on a single piece of content.

    Steps:
    1. Sentiment analysis (IndoBERT stub)
    2. Risk classification (keyword classifier stub)
    3. Risk score computation
    4. NER — detect target identifiers in text
    """
    targets = targets or []

    # 1. Sentiment
    sentiment, sent_score = predict_sentiment(text)

    # 2. Risk classification
    category, severity, confidence = classify_risk(text, source_type)

    # 3. Risk score
    risk_score = compute_risk_score(text, sentiment, source_type)

    # 4. NER
    entities = extract_target_entities(text, targets)
    target_hits = list({e.text.lower() for e in entities})

    logger.info(
        "Analysis done: sentiment=%s category=%s severity=%s risk=%d",
        sentiment, category, severity, risk_score,
    )

    return AnalysisResult(
        text=text,
        sentiment=sentiment,
        sentiment_score=sent_score,
        category=category,
        severity=severity,
        confidence=confidence,
        risk_score=risk_score,
        target_hits=target_hits,
        entities=entities,
    )
