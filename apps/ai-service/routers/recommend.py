from fastapi import APIRouter
from pydantic import BaseModel

from services.recommendation_engine import get_recommendations

router = APIRouter()


class RecommendInput(BaseModel):
    severity: str
    category: str
    score: int


class Action(BaseModel):
    priority: int
    action: str
    owner: str
    urgency: str


class RecommendResult(BaseModel):
    actions: list[Action]
    consult_recommended: bool


@router.post("", response_model=RecommendResult)
def recommend_actions(payload: RecommendInput) -> RecommendResult:
    """Get prioritized action recommendations from playbook engine."""
    actions_raw, consult = get_recommendations(
        payload.category, payload.severity, payload.score
    )
    actions = [
        Action(
            priority=a.priority,
            action=a.action,
            owner=a.owner,
            urgency=a.urgency,
        )
        for a in actions_raw
    ]
    return RecommendResult(actions=actions, consult_recommended=consult)
