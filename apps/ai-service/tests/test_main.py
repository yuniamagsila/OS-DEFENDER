from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


# ─── Existing endpoint tests ──────────────────────────────────────────────────

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


# ─── Model unit tests ──────────────────────────────────────────────────────────

def test_indobert_sentiment_negative() -> None:
    from models.indobert_sentiment import predict_sentiment
    label, score = predict_sentiment("ini adalah penipuan dan fitnah besar sekali")
    assert label == "NEGATIVE"
    assert score > 0.5


def test_indobert_sentiment_positive() -> None:
    from models.indobert_sentiment import predict_sentiment
    label, score = predict_sentiment("produk bagus, hebat, terpercaya dan rekomendasi")
    assert label == "POSITIVE"
    assert score > 0.5


def test_indobert_sentiment_neutral() -> None:
    from models.indobert_sentiment import predict_sentiment
    label, score = predict_sentiment("hari ini cuaca cerah")
    assert label == "NEUTRAL"
    assert score == 0.5


def test_risk_classifier_credential() -> None:
    from models.risk_classifier import classify_risk
    cat, sev, conf = classify_risk("database dump password combo list bocor", "darkweb")
    assert cat == "credential_leak"
    assert sev == "CRITICAL"
    assert conf > 0.6


def test_risk_score_range() -> None:
    from models.risk_classifier import compute_risk_score
    score = compute_risk_score("penipuan fitnah scam", "NEGATIVE", "surface")
    assert 0 <= score <= 100


def test_ner_model_targets() -> None:
    from models.ner_model import extract_target_entities
    entities = extract_target_entities("CEO Budi Santoso dituduh korupsi", ["Budi Santoso"])
    assert len(entities) == 1
    assert entities[0].label == "TARGET_ENTITY"


def test_ner_model_email() -> None:
    from models.ner_model import extract_all_entities
    entities = extract_all_entities("hubungi kami di info@example.com untuk info")
    emails = [e for e in entities if e.label == "EMAIL"]
    assert len(emails) == 1


# ─── Service unit tests ────────────────────────────────────────────────────────

def test_analyzer_pipeline() -> None:
    from services.analyzer import analyze
    result = analyze(
        text="CEO Budi Santoso diduga terlibat penipuan besar",
        source_type="surface",
        targets=["Budi Santoso"],
    )
    assert result.sentiment == "NEGATIVE"
    assert result.risk_score > 0
    assert "budi santoso" in result.target_hits


def test_recommendation_engine_credential() -> None:
    from services.recommendation_engine import get_recommendations
    actions, consult = get_recommendations("credential_leak", "CRITICAL", 30)
    assert len(actions) > 0
    assert consult is True


def test_recommendation_engine_low_threat() -> None:
    from services.recommendation_engine import get_recommendations
    actions, consult = get_recommendations("general_mention", "LOW", 85)
    assert len(actions) > 0
    assert consult is False


def test_dark_web_classifier_credential() -> None:
    from services.dark_web_classifier import classify_dark_web
    result = classify_dark_web("combo list password user bocor dump dijual")
    assert result.severity in ("CRITICAL", "HIGH")
    assert result.category != "unknown_dark_web"


def test_dark_web_classifier_pii() -> None:
    from services.dark_web_classifier import classify_dark_web
    result = classify_dark_web("data ini mengandung password dan info rekening bank")
    assert len(result.pii_types) > 0
