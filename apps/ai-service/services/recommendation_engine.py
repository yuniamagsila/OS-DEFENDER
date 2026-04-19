"""Action recommendation engine — maps threat profile to prioritized action list."""
from __future__ import annotations

import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class Action:
    priority: int
    action: str
    owner: str
    urgency: str
    deadline_hours: int | None = None


PLAYBOOKS: dict[str, list[dict]] = {
    "credential_leak": [
        {"priority": 1, "action": "Reset semua credential yang bocor segera", "owner": "CLIENT", "urgency": "IMMEDIATE", "deadline_hours": 1},
        {"priority": 2, "action": "Aktifkan 2FA di semua akun yang terdampak", "owner": "CLIENT", "urgency": "IMMEDIATE", "deadline_hours": 2},
        {"priority": 3, "action": "Buka kasus konsultasi darurat", "owner": "CONSULTANT", "urgency": "IMMEDIATE", "deadline_hours": 1},
        {"priority": 4, "action": "Notifikasi pihak terkait (HR, IT, Legal)", "owner": "CLIENT", "urgency": "HIGH", "deadline_hours": 4},
        {"priority": 5, "action": "Monitor aktivitas anomali di akun selama 72 jam", "owner": "CLIENT", "urgency": "HIGH", "deadline_hours": None},
    ],
    "defamation": [
        {"priority": 1, "action": "Dokumentasikan bukti konten dengan screenshot berarsip", "owner": "CLIENT", "urgency": "HIGH", "deadline_hours": 2},
        {"priority": 2, "action": "Konsultasikan bukti ke pengacara jika perlu jalur hukum", "owner": "CONSULTANT", "urgency": "HIGH", "deadline_hours": 24},
        {"priority": 3, "action": "Ajukan takedown ke platform terkait", "owner": "CONSULTANT", "urgency": "HIGH", "deadline_hours": 12},
        {"priority": 4, "action": "Siapkan pernyataan resmi counter-narrative", "owner": "CONSULTANT", "urgency": "MEDIUM", "deadline_hours": 48},
    ],
    "viral_negative": [
        {"priority": 1, "action": "Monitor perkembangan viral setiap 30 menit", "owner": "CLIENT", "urgency": "HIGH", "deadline_hours": None},
        {"priority": 2, "action": "Siapkan respons publik yang terukur dan empatik", "owner": "CONSULTANT", "urgency": "HIGH", "deadline_hours": 6},
        {"priority": 3, "action": "Identifikasi influencer yang bisa membantu counter-narrative", "owner": "CONSULTANT", "urgency": "MEDIUM", "deadline_hours": 24},
    ],
    "data_sale": [
        {"priority": 1, "action": "Buka kasus CRITICAL ke konsultan segera", "owner": "CLIENT", "urgency": "IMMEDIATE", "deadline_hours": 1},
        {"priority": 2, "action": "Koordinasi dengan tim legal untuk langkah hukum", "owner": "CONSULTANT", "urgency": "IMMEDIATE", "deadline_hours": 4},
        {"priority": 3, "action": "Lapor ke BSSN / KOMINFO jika data sensitif pribadi", "owner": "CONSULTANT", "urgency": "HIGH", "deadline_hours": 24},
    ],
    "fraud_allegation": [
        {"priority": 1, "action": "Kumpulkan semua bukti transaksi yang sah", "owner": "CLIENT", "urgency": "HIGH", "deadline_hours": 8},
        {"priority": 2, "action": "Siapkan klarifikasi resmi berbasis fakta", "owner": "CONSULTANT", "urgency": "HIGH", "deadline_hours": 12},
        {"priority": 3, "action": "Monitor perkembangan narasi dan respons audiens", "owner": "CONSULTANT", "urgency": "MEDIUM", "deadline_hours": None},
    ],
}

DEFAULT_PLAYBOOK: list[dict] = [
    {"priority": 1, "action": "Pantau perkembangan dan catat setiap perubahan", "owner": "CLIENT", "urgency": "LOW", "deadline_hours": None},
    {"priority": 2, "action": "Laporkan ke konsultan jika situasi eskalasi", "owner": "CLIENT", "urgency": "LOW", "deadline_hours": None},
]


def get_recommendations(
    category: str,
    severity: str,
    reputation_score: int,
) -> tuple[list[Action], bool]:
    """Return (actions, consult_recommended) for a given threat profile."""
    raw = PLAYBOOKS.get(category, DEFAULT_PLAYBOOK)
    actions = [Action(**r) for r in raw]

    consult = (
        severity in ("CRITICAL", "HIGH")
        or reputation_score < 50
        or category in ("credential_leak", "data_sale", "defamation")
    )

    logger.info(
        "Recommendations: category=%s severity=%s actions=%d consult=%s",
        category, severity, len(actions), consult,
    )
    return actions, consult
