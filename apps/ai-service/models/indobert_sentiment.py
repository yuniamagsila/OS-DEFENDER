"""IndoBERT-based sentiment model stub.

In production, replace with a fine-tuned IndoBERT model loaded via
transformers: AutoTokenizer + AutoModelForSequenceClassification.
"""
from __future__ import annotations

import logging
import re

logger = logging.getLogger(__name__)

# Production setup (uncomment when GPU/model available):
# from transformers import AutoTokenizer, AutoModelForSequenceClassification
# import torch
#
# MODEL_NAME = "indobenchmark/indobert-base-p1"
# tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
# model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
# model.eval()


NEGATIVE_WORDS = frozenset({
    "fitnah", "penipuan", "buruk", "jelek", "bohong", "gagal", "rugi",
    "scam", "tipu", "bangkrut", "korupsi", "curang", "palsu", "hina",
    "malu", "hancur", "bobrok", "cacat", "sesat", "bahaya",
})

POSITIVE_WORDS = frozenset({
    "bagus", "hebat", "sukses", "baik", "terbaik", "rekomendasi", "puas",
    "luar biasa", "profesional", "terpercaya", "amanah", "jujur",
    "ramah", "cepat", "responsif", "berkualitas",
})


def predict_sentiment(text: str) -> tuple[str, float]:
    """Return (label, confidence) using rule-based stub.

    Production: feed text through IndoBERT tokenizer + model,
    apply softmax, return argmax label with confidence score.
    """
    text_lower = text.lower()
    tokens = re.findall(r"\w+", text_lower)
    token_set = set(tokens)

    neg_hits = len(token_set & NEGATIVE_WORDS)
    pos_hits = len(token_set & POSITIVE_WORDS)

    logger.debug("Sentiment: neg=%d pos=%d text_len=%d", neg_hits, pos_hits, len(text))

    if neg_hits > pos_hits:
        confidence = round(min(0.5 + neg_hits * 0.08, 0.97), 3)
        return "NEGATIVE", confidence
    if pos_hits > neg_hits:
        confidence = round(min(0.5 + pos_hits * 0.08, 0.97), 3)
        return "POSITIVE", confidence
    return "NEUTRAL", 0.5
