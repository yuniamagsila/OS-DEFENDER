from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_health_endpoint() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_profile_score_endpoint() -> None:
    payload = {
        "full_name": "Jane Doe",
        "alias": "jane",
        "email": "jane@example.com",
        "phone": "08123",
        "risk_context": "public figure",
    }
    response = client.post("/profiles/score", json=payload)
    assert response.status_code == 200
    body = response.json()
    assert body["reputation_score"] == 70
    assert body["status"] == "waspada"
