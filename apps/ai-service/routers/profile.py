from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter()


class IdentityProfile(BaseModel):
    full_name: str
    alias: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    risk_context: str | None = None


@router.post("/score")
def score_profile(profile: IdentityProfile) -> dict[str, int | str]:
    risk_points = 0

    if profile.alias:
        risk_points += 5
    if profile.phone:
        risk_points += 10
    if profile.risk_context:
        risk_points += 15

    score = max(0, 100 - risk_points)
    status = "aman" if score >= 85 else "waspada" if score >= 70 else "berisiko"

    return {"reputation_score": score, "status": status}
