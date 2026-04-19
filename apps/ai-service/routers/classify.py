from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ClassifyInput(BaseModel):
    text: str
    source_type: str = "surface"


class ClassifyResult(BaseModel):
    category: str
    severity: str
    confidence: float


DARKWEB_KEYWORDS = {
    "credential": ("credential_leak", "CRITICAL"),
    "password": ("credential_leak", "CRITICAL"),
    "bocor": ("pii_exposure", "HIGH"),
    "jual data": ("data_sale", "CRITICAL"),
    "doxx": ("doxxing", "HIGH"),
    "database dump": ("credential_leak", "CRITICAL"),
}

SURFACE_KEYWORDS = {
    "fitnah": ("defamation", "HIGH"),
    "penipuan": ("fraud_allegation", "HIGH"),
    "viral": ("viral_negative", "MEDIUM"),
    "bohong": ("misinformation", "MEDIUM"),
    "demo": ("public_protest", "MEDIUM"),
}


@router.post("", response_model=ClassifyResult)
def classify_threat(payload: ClassifyInput) -> ClassifyResult:
    text_lower = payload.text.lower()
    keywords = DARKWEB_KEYWORDS if payload.source_type == "darkweb" else SURFACE_KEYWORDS

    for kw, (category, severity) in keywords.items():
        if kw in text_lower:
            return ClassifyResult(category=category, severity=severity, confidence=0.85)

    return ClassifyResult(category="general_mention", severity="LOW", confidence=0.5)
