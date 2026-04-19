from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ScoringInput(BaseModel):
    surface_negative_count: int = 0
    darkweb_exposure_count: int = 0
    active_crisis: bool = False
    unresolved_cases: int = 0
    active_counter_campaigns: int = 0


class ScoringResult(BaseModel):
    reputation_score: int
    status: str
    breakdown: dict[str, float]


@router.post("", response_model=ScoringResult)
def compute_score(payload: ScoringInput) -> ScoringResult:
    surface_deduct = min(payload.surface_negative_count * 4, 40)
    darkweb_deduct = min(payload.darkweb_exposure_count * 7, 35)
    crisis_deduct = 15 if payload.active_crisis else 0
    cases_deduct = min(payload.unresolved_cases * 2, 10)
    bonus = min(payload.active_counter_campaigns * 5, 15)

    total_deduct = surface_deduct + darkweb_deduct + crisis_deduct + cases_deduct
    score = max(0, min(100, 100 - total_deduct + bonus))

    if score >= 85:
        status = "Aman"
    elif score >= 70:
        status = "Waspada"
    elif score >= 50:
        status = "Berisiko"
    elif score >= 30:
        status = "Krisis"
    else:
        status = "Darurat"

    return ScoringResult(
        reputation_score=score,
        status=status,
        breakdown={
            "surface_deduct": surface_deduct,
            "darkweb_deduct": darkweb_deduct,
            "crisis_deduct": crisis_deduct,
            "cases_deduct": cases_deduct,
            "counter_bonus": bonus,
        },
    )
