"""Unified analysis endpoint — orchestrates the full pipeline."""
from fastapi import APIRouter
from pydantic import BaseModel

from services.analyzer import analyze

router = APIRouter()


class AnalyzeInput(BaseModel):
    text: str
    source_type: str = "surface"
    targets: list[str] = []


class EntityOut(BaseModel):
    text: str
    label: str
    start: int
    end: int
    confidence: float = 1.0


class AnalyzeResult(BaseModel):
    sentiment: str
    sentiment_score: float
    category: str
    severity: str
    confidence: float
    risk_score: int
    target_hits: list[str]
    entities: list[EntityOut]


@router.post("", response_model=AnalyzeResult)
def run_analysis(payload: AnalyzeInput) -> AnalyzeResult:
    """Run full analysis pipeline: sentiment → risk classify → NER → score."""
    result = analyze(
        text=payload.text,
        source_type=payload.source_type,
        targets=payload.targets,
    )
    entities = [
        EntityOut(
            text=e.text,
            label=e.label,
            start=e.start,
            end=e.end,
            confidence=e.confidence,
        )
        for e in result.entities
    ]
    return AnalyzeResult(
        sentiment=result.sentiment,
        sentiment_score=result.sentiment_score,
        category=result.category,
        severity=result.severity,
        confidence=result.confidence,
        risk_score=result.risk_score,
        target_hits=result.target_hits,
        entities=entities,
    )
