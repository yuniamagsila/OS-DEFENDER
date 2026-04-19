from fastapi import APIRouter
from pydantic import BaseModel

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


RECOMMENDATIONS: dict[str, list[dict]] = {
    "credential_leak": [
        {"priority": 1, "action": "Reset semua credential yang bocor segera", "owner": "CLIENT", "urgency": "IMMEDIATE"},
        {"priority": 2, "action": "Aktifkan 2FA di semua platform", "owner": "CLIENT", "urgency": "IMMEDIATE"},
        {"priority": 3, "action": "Buka kasus konsultasi darurat", "owner": "CONSULTANT", "urgency": "IMMEDIATE"},
    ],
    "defamation": [
        {"priority": 1, "action": "Dokumentasikan bukti konten dengan screenshot", "owner": "CLIENT", "urgency": "HIGH"},
        {"priority": 2, "action": "Ajukan takedown ke platform", "owner": "CONSULTANT", "urgency": "HIGH"},
        {"priority": 3, "action": "Siapkan pernyataan resmi counter-narrative", "owner": "CONSULTANT", "urgency": "MEDIUM"},
    ],
    "viral_negative": [
        {"priority": 1, "action": "Monitor perkembangan viral setiap 30 menit", "owner": "CLIENT", "urgency": "HIGH"},
        {"priority": 2, "action": "Siapkan respons publik yang terukur", "owner": "CONSULTANT", "urgency": "HIGH"},
    ],
}


@router.post("", response_model=RecommendResult)
def recommend_actions(payload: RecommendInput) -> RecommendResult:
    actions_raw = RECOMMENDATIONS.get(payload.category, [
        {"priority": 1, "action": "Pantau perkembangan dan laporkan jika eskalasi", "owner": "CLIENT", "urgency": "LOW"},
    ])
    actions = [Action(**a) for a in actions_raw]
    consult = payload.severity in ("CRITICAL", "HIGH") or payload.score < 50
    return RecommendResult(actions=actions, consult_recommended=consult)
