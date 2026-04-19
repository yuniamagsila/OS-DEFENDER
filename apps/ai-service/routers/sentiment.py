from fastapi import APIRouter
from pydantic import BaseModel

from models.indobert_sentiment import predict_sentiment

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
    """Analyze text sentiment using IndoBERT-compatible pipeline."""
    sentiment, score = predict_sentiment(payload.text)
    return SentimentResult(
        sentiment=sentiment,
        score=score,
        label=sentiment.lower(),
    )
