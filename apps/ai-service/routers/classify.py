from fastapi import APIRouter
from pydantic import BaseModel

from models.risk_classifier import classify_risk

router = APIRouter()


class ClassifyInput(BaseModel):
    text: str
    source_type: str = "surface"


class ClassifyResult(BaseModel):
    category: str
    severity: str
    confidence: float


@router.post("", response_model=ClassifyResult)
def classify_threat(payload: ClassifyInput) -> ClassifyResult:
    """Classify threat category and severity using risk classifier model."""
    category, severity, confidence = classify_risk(payload.text, payload.source_type)
    return ClassifyResult(category=category, severity=severity, confidence=confidence)
