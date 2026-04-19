from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class TextInput(BaseModel):
    text: str
    language: str = "id"


class SentimentResult(BaseModel):
    sentiment: str
    score: float
    label: str


@router.post("", response_model=SentimentResult)
def analyze_sentiment(payload: TextInput) -> SentimentResult:
    """Rule-based sentiment stub — replace with IndoBERT in production."""
    text_lower = payload.text.lower()
    negative_words = {"fitnah", "penipuan", "buruk", "jelek", "bohong", "gagal", "rugi", "scam"}
    positive_words = {"bagus", "hebat", "sukses", "baik", "terbaik", "rekomendasi", "puas"}

    neg_hits = sum(1 for w in negative_words if w in text_lower)
    pos_hits = sum(1 for w in positive_words if w in text_lower)

    if neg_hits > pos_hits:
        return SentimentResult(sentiment="NEGATIVE", score=round(0.5 + min(neg_hits * 0.1, 0.49), 2), label="negative")
    if pos_hits > neg_hits:
        return SentimentResult(sentiment="POSITIVE", score=round(0.5 + min(pos_hits * 0.1, 0.49), 2), label="positive")
    return SentimentResult(sentiment="NEUTRAL", score=0.5, label="neutral")
