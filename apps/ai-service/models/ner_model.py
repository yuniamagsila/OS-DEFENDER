"""Named Entity Recognition model stub.

In production, replace with a fine-tuned NER model (e.g., IndoBERT-NER
or a CRF-based model trained on Indonesian NER datasets).
"""
from __future__ import annotations

import re
from dataclasses import dataclass

# Production setup (uncomment when model available):
# from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline
# ner_pipeline = pipeline("ner", model="cahya/bert-base-indonesian-NER",
#                          aggregation_strategy="simple")


@dataclass
class EntityMatch:
    text: str
    label: str
    start: int
    end: int
    confidence: float = 1.0


def extract_target_entities(text: str, targets: list[str]) -> list[EntityMatch]:
    """Find occurrences of known target identifiers in text.

    Production: use ner_pipeline(text) and filter by entity type (PER, ORG, etc.)
    then cross-reference with targets.
    """
    entities: list[EntityMatch] = []
    for target in targets:
        pattern = re.compile(re.escape(target), re.IGNORECASE)
        for match in pattern.finditer(text):
            entities.append(EntityMatch(
                text=match.group(),
                label="TARGET_ENTITY",
                start=match.start(),
                end=match.end(),
                confidence=0.95,
            ))
    return entities


def extract_all_entities(text: str) -> list[EntityMatch]:
    """Extract all named entities using regex heuristics (stub).

    Production: return ner_pipeline(text) results.
    """
    entities: list[EntityMatch] = []

    # Email
    for m in re.finditer(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}", text):
        entities.append(EntityMatch(m.group(), "EMAIL", m.start(), m.end()))

    # Phone (Indonesia)
    for m in re.finditer(r"(\+62|0)[0-9]{8,12}", text):
        entities.append(EntityMatch(m.group(), "PHONE", m.start(), m.end()))

    # URL
    for m in re.finditer(r"https?://[^\s]+", text):
        entities.append(EntityMatch(m.group(), "URL", m.start(), m.end()))

    return entities
