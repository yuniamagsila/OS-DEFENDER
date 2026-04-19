from fastapi import FastAPI

from routers.health import router as health_router
from routers.profile import router as profile_router

app = FastAPI(title="OS Defender AI Service", version="0.1.0")

app.include_router(health_router, prefix="/health", tags=["health"])
app.include_router(profile_router, prefix="/profiles", tags=["profiles"])


@app.get("/")
def root() -> dict[str, str]:
    return {"service": "ai-service", "status": "running"}
