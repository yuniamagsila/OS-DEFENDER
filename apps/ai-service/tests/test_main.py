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


def test_sentiment_negative() -> None:
    response = client.post("/sentiment", json={"text": "ini penipuan dan fitnah besar"})
    assert response.status_code == 200
    body = response.json()
    assert body["sentiment"] == "NEGATIVE"


def test_sentiment_positive() -> None:
    response = client.post("/sentiment", json={"text": "produk ini sangat bagus dan terbaik"})
    assert response.status_code == 200
    body = response.json()
    assert body["sentiment"] == "POSITIVE"


def test_ner_target_hits() -> None:
    response = client.post("/ner", json={"text": "CEO Budi Santoso diduga terlibat", "targets": ["Budi Santoso"]})
    assert response.status_code == 200
    body = response.json()
    assert "Budi Santoso" in body["target_hits"]


def test_scoring_full() -> None:
    response = client.post("/scoring", json={
        "surface_negative_count": 3,
        "darkweb_exposure_count": 1,
        "active_crisis": True,
        "unresolved_cases": 2,
        "active_counter_campaigns": 1,
    })
    assert response.status_code == 200
    body = response.json()
    assert 0 <= body["reputation_score"] <= 100


def test_classify_credential() -> None:
    response = client.post("/classify", json={"text": "database dump password user bocor", "source_type": "darkweb"})
    assert response.status_code == 200
    body = response.json()
    assert body["severity"] in ("CRITICAL", "HIGH", "MEDIUM", "LOW")


def test_recommend_actions() -> None:
    response = client.post("/recommend", json={"severity": "CRITICAL", "category": "credential_leak", "score": 25})
    assert response.status_code == 200
    body = response.json()
    assert len(body["actions"]) > 0
    assert body["consult_recommended"] is True
