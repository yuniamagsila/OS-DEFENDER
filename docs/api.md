# API Reference — OS Defender

> Base URL Web API: `https://yourdomain.com/api`
> Base URL AI Service: `http://ai-service:8000` (internal)

---

## Authentication

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

Obtain tokens via `/api/auth/login`.

---

## Web API Endpoints

### `POST /api/auth/register`

Register a new user account.

**Request body:**
```json
{ "name": "Budi Santoso", "email": "budi@example.com", "password": "min8chars" }
```

**Response `201`:**
```json
{ "message": "Registration successful", "user": { "name": "...", "email": "...", "role": "CLIENT" } }
```

**Errors:** `400` if fields missing or password < 8 chars.

---

### `POST /api/auth/login`

Authenticate and receive a token.

**Request body:**
```json
{ "email": "budi@example.com", "password": "yourpassword" }
```

**Response `200`:**
```json
{ "message": "Login successful", "user": { "email": "...", "role": "CLIENT" }, "token": "..." }
```

---

### `GET /api/health`

Web app health check.

**Response `200`:**
```json
{ "status": "ok", "service": "web" }
```

---

### `GET /api/profiles`

List identity profiles for the authenticated user.

**Response `200`:**
```json
{ "items": [ { "id": "prof_...", "fullName": "...", "reputationScore": 78, ... } ] }
```

---

### `POST /api/profiles`

Create a new identity profile.

**Request body:**
```json
{ "fullName": "Budi Santoso", "alias": "budiS" }
```

**Response `201`:** Created profile object.

---

### `GET /api/alerts`

List crisis alerts.

**Response `200`:**
```json
{ "items": [ { "id": "alrt_...", "severity": "CRITICAL", "title": "...", "isRead": false, ... } ] }
```

---

### `GET /api/intelligence`

List intelligence findings (surface + dark web).

**Query params:** `?type=SURFACE|DARKWEB`

**Response `200`:**
```json
{ "items": [ { "id": "int_...", "type": "DARKWEB", "severity": "CRITICAL", ... } ] }
```

---

### `GET /api/cases`

List consultation cases.

**Response `200`:**
```json
{ "items": [ { "id": "case_...", "title": "...", "status": "OPEN", "priority": "HIGH", ... } ] }
```

---

### `POST /api/cases`

Open a new consultation case.

**Request body:**
```json
{ "title": "Krisis reputasi", "priority": "HIGH", "description": "Detail situasi..." }
```

**Response `201`:** Created case object.

**Errors:** `400` if required fields missing.

---

### `GET /api/reports`

List generated reports.

**Response `200`:**
```json
{ "items": [ { "id": "rep_...", "title": "Laporan Bulanan", "type": "MONTHLY", "generatedAt": "..." } ] }
```

---

### `GET /api/takedown`

List takedown requests.

**Response `200`:**
```json
{ "items": [ { "id": "td_...", "target": "...", "platform": "Twitter/X", "status": "PENDING", ... } ] }
```

---

### `POST /api/takedown`

Submit a new takedown request.

**Request body:**
```json
{ "target": "https://harmful-url.com/...", "platform": "Website" }
```

**Response `201`:** Created takedown request object.

---

### `GET /api/notifications`

List notifications for the authenticated user.

**Response `200`:**
```json
{ "items": [ { "id": "notif_...", "channel": "email", "message": "...", "isRead": false, ... } ] }
```

---

### `POST /api/webhooks`

Receive internal service events (crawlers → web API).

**Headers required:** `X-Webhook-Signature: <hmac-sha256>`

**Request body:**
```json
{ "event": "mention.created", "data": { ... } }
```

Supported events: `mention.created`, `darkweb.finding`, `breach.detected`, `score.updated`

**Response `200`:**
```json
{ "received": true, "event": "mention.created" }
```

**Errors:** `401` if signature missing, `400` if payload invalid.

---

## AI Service Endpoints

### `GET /health`

AI service health check.

**Response `200`:** `{ "status": "ok" }`

---

### `POST /profiles/score`

Calculate initial reputation score for a new profile.

**Request body:**
```json
{ "full_name": "Budi Santoso", "alias": "budiS", "email": "budi@example.com", "phone": "08123", "risk_context": "public figure" }
```

**Response `200`:**
```json
{ "reputation_score": 70, "status": "waspada" }
```

---

### `POST /sentiment`

Analyze sentiment of text.

**Request body:**
```json
{ "text": "Produk ini sangat buruk dan mengecewakan", "language": "id" }
```

**Response `200`:**
```json
{ "sentiment": "NEGATIVE", "score": 0.86, "label": "negative" }
```

---

### `POST /ner`

Extract named entities and check for target identifiers.

**Request body:**
```json
{ "text": "CEO Budi Santoso diduga terlibat kasus", "targets": ["Budi Santoso"] }
```

**Response `200`:**
```json
{
  "entities": [ { "text": "Budi Santoso", "label": "TARGET_ENTITY", "start": 4, "end": 16 } ],
  "target_hits": ["Budi Santoso"]
}
```

---

### `POST /scoring`

Compute reputation score from threat metrics.

**Request body:**
```json
{
  "surface_negative_count": 3,
  "darkweb_exposure_count": 1,
  "active_crisis": true,
  "unresolved_cases": 2,
  "active_counter_campaigns": 1
}
```

**Response `200`:**
```json
{
  "reputation_score": 42,
  "status": "Krisis",
  "breakdown": { "surface_deduct": 12, "darkweb_deduct": 7, "crisis_deduct": 15, "cases_deduct": 4, "counter_bonus": 5 }
}
```

---

### `POST /classify`

Classify content into threat category and severity.

**Request body:**
```json
{ "text": "database dump password user bocor", "source_type": "darkweb" }
```

**Response `200`:**
```json
{ "category": "credential_leak", "severity": "CRITICAL", "confidence": 0.92 }
```

---

### `POST /recommend`

Get prioritized action recommendations for a threat.

**Request body:**
```json
{ "severity": "CRITICAL", "category": "credential_leak", "score": 25 }
```

**Response `200`:**
```json
{
  "actions": [
    { "priority": 1, "action": "Reset semua credential yang bocor segera", "owner": "CLIENT", "urgency": "IMMEDIATE" }
  ],
  "consult_recommended": true
}
```

---

## Error Format

All errors follow this format:

```json
{ "error": "Human-readable error message", "code": "OPTIONAL_ERROR_CODE" }
```

Common status codes:
| Code | Meaning |
|---|---|
| `400` | Bad Request — invalid or missing parameters |
| `401` | Unauthorized — missing or invalid token/signature |
| `403` | Forbidden — insufficient permissions |
| `404` | Not Found |
| `429` | Rate Limited |
| `500` | Internal Server Error |
