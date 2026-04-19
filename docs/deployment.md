# Deployment (Initial)

## Local Development
1. Jalankan web: `npm run dev --workspace=web`
2. Jalankan ai-service: `uvicorn main:app --reload --host 0.0.0.0 --port 8000` di folder `apps/ai-service`
3. Jalankan service pendukung via docker compose
