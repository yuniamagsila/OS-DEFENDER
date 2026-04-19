from fastapi import FastAPI

from routers.health import router as health_router
from routers.profile import router as profile_router
from routers.sentiment import router as sentiment_router
from routers.ner import router as ner_router
from routers.scoring import router as scoring_router
from routers.classify import router as classify_router
from routers.recommend import router as recommend_router
from routers.analyze import router as analyze_router

app = FastAPI(title="OS Defender AI Service", version="0.4.0")

app.include_router(health_router, prefix="/health", tags=["health"])
app.include_router(profile_router, prefix="/profiles", tags=["profiles"])
app.include_router(sentiment_router, prefix="/sentiment", tags=["sentiment"])
app.include_router(ner_router, prefix="/ner", tags=["ner"])
app.include_router(scoring_router, prefix="/scoring", tags=["scoring"])
app.include_router(classify_router, prefix="/classify", tags=["classify"])
app.include_router(recommend_router, prefix="/recommend", tags=["recommend"])
app.include_router(analyze_router, prefix="/analyze", tags=["analyze"])


@app.get("/")
def root() -> dict[str, str]:
    return {"service": "ai-service", "version": "0.4.0", "status": "running"}
