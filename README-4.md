# 🛡️ Reputation Shield — Developer README

> **Digital PR Protection Tool** — Real-time reputation monitoring, negative sentiment detection, digital footprint scanning, and action recommendation engine for individuals and businesses.

[![Status](https://img.shields.io/badge/status-in%20development-yellow)](.)
[![License](https://img.shields.io/badge/license-Proprietary-red)](.)
[![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20FastAPI%20%7C%20PostgreSQL-blue)](.)
[![Lang](https://img.shields.io/badge/language-TypeScript%20%7C%20Python-informational)](.)

---

## 📋 Daftar Isi

- [Overview](#-overview)
- [Arsitektur Sistem](#️-arsitektur-sistem)
- [Tech Stack](#-tech-stack)
- [Struktur Direktori](#-struktur-direktori)
- [Modul & Fitur](#-modul--fitur)
- [Setup & Instalasi](#-setup--instalasi)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Alur Kerja Sistem](#-alur-kerja-sistem)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🔭 Overview

**Reputation Shield** adalah platform berbasis web yang membantu individu dan bisnis memantau, menganalisis, dan melindungi reputasi digital mereka secara real-time.

Tools ini berfokus pada **PR defensif** — bukan sekadar monitoring pasif, tapi memberikan insight actionable dan rekomendasi tindakan konkret saat ancaman terdeteksi.

### Prinsip Desain

- **Detection First** — Deteksi ancaman sedini mungkin, sebelum eskalasi
- **Action-Oriented** — Setiap temuan disertai rekomendasi tindakan, bukan hanya laporan
- **Privacy by Design** — Data klien terenkripsi, tidak dibagikan ke pihak ketiga
- **Indonesia-First** — Adaptasi platform, bahasa, dan regulasi lokal (UU ITE, UU PDP)

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│              Next.js 14 (App Router) — TypeScript               │
│     Dashboard │ Alert UI │ Report Viewer │ Settings             │
└──────────────────────────┬──────────────────────────────────────┘
                           │ REST / WebSocket
┌──────────────────────────▼──────────────────────────────────────┐
│                        API GATEWAY                              │
│                   Next.js API Routes / NGINX                    │
│         Auth Middleware │ Rate Limiting │ CORS Handler          │
└───────┬──────────────┬───────────────┬─────────────────────────┘
        │              │               │
┌───────▼──────┐ ┌─────▼──────┐ ┌─────▼──────────────────────────┐
│  Core API    │ │ Scraper    │ │   AI/NLP Engine                │
│  (Next.js)   │ │ Service    │ │   (FastAPI + Python)           │
│              │ │ (Python)   │ │                                │
│ - Auth       │ │ - Web      │ │ - Sentiment Analysis           │
│ - Dashboard  │ │   Crawling │ │ - Keyword Extraction           │
│ - Reports    │ │ - RSS Feed │ │ - Risk Scoring                 │
│ - Settings   │ │ - SERP API │ │ - Action Recommendation        │
└───────┬──────┘ └─────┬──────┘ └─────┬──────────────────────────┘
        │              │               │
┌───────▼──────────────▼───────────────▼──────────────────────────┐
│                       DATA LAYER                                │
│   PostgreSQL (primary) │ Redis (cache/queue) │ S3 (reports)    │
└─────────────────────────────────────────────────────────────────┘
        │
┌───────▼──────────────────────────────────────────────────────────┐
│                    NOTIFICATION SERVICE                          │
│         Email (Resend/SendGrid) │ WhatsApp (WA Cloud API)       │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🧰 Tech Stack

### Frontend
| Layer | Teknologi | Keterangan |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR + React Server Components |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS | + shadcn/ui components |
| State | Zustand | Client state management |
| Charts | Recharts | Reputation trend visualization |
| Real-time | Socket.io Client | Live alert updates |

### Backend
| Layer | Teknologi | Keterangan |
|---|---|---|
| API (Primary) | Next.js API Routes | CRUD, auth, dashboard data |
| AI/NLP Service | FastAPI (Python) | Sentiment analysis, scoring |
| Scraper Service | Python (Playwright) | Web crawling & monitoring |
| Queue | Redis + Bull | Job scheduling untuk crawl |
| WebSocket | Socket.io | Push notification real-time |

### Database & Storage
| Komponen | Teknologi | Keterangan |
|---|---|---|
| Primary DB | PostgreSQL | Data utama semua modul |
| Cache | Redis | Session, rate limit, queue |
| Object Storage | AWS S3 / Cloudflare R2 | PDF reports, exports |
| ORM | Prisma | Schema management & migrations |

### Infrastruktur
| Komponen | Teknologi |
|---|---|
| Hosting | Vercel (Frontend) + Railway (Backend) |
| CI/CD | GitHub Actions |
| Monitoring | Sentry + Uptime Robot |
| Notification | Resend (Email) + WhatsApp Cloud API |

---

## 📁 Struktur Direktori

```
reputation-shield/
│
├── apps/
│   ├── web/                          # Next.js frontend + API
│   │   ├── app/
│   │   │   ├── (auth)/               # Login, register, forgot password
│   │   │   ├── (dashboard)/          # Protected dashboard routes
│   │   │   │   ├── dashboard/        # Overview & reputation score
│   │   │   │   ├── monitoring/       # Keyword monitoring list
│   │   │   │   ├── alerts/           # Crisis alerts & history
│   │   │   │   ├── footprint/        # Digital footprint scanner
│   │   │   │   ├── reports/          # Report generator & history
│   │   │   │   └── settings/         # Account & notification settings
│   │   │   └── api/
│   │   │       ├── auth/             # Auth endpoints
│   │   │       ├── monitoring/       # Monitoring CRUD
│   │   │       ├── alerts/           # Alert management
│   │   │       ├── reports/          # Report generation
│   │   │       └── webhooks/         # Webhook handlers
│   │   ├── components/
│   │   │   ├── ui/                   # shadcn/ui base components
│   │   │   ├── dashboard/            # Dashboard-specific components
│   │   │   ├── charts/               # Recharts wrappers
│   │   │   └── alerts/               # Alert notification components
│   │   ├── lib/
│   │   │   ├── auth.ts               # Auth utilities
│   │   │   ├── prisma.ts             # Prisma client singleton
│   │   │   ├── redis.ts              # Redis client
│   │   │   └── utils.ts              # General utilities
│   │   └── prisma/
│   │       ├── schema.prisma         # Database schema
│   │       └── migrations/           # Migration history
│   │
│   ├── ai-service/                   # FastAPI AI/NLP service
│   │   ├── main.py                   # FastAPI app entry
│   │   ├── routers/
│   │   │   ├── sentiment.py          # Sentiment analysis endpoints
│   │   │   ├── scoring.py            # Reputation scoring
│   │   │   └── recommend.py          # Action recommendation
│   │   ├── models/
│   │   │   ├── sentiment_model.py    # NLP model wrapper
│   │   │   └── risk_classifier.py    # Risk classification model
│   │   ├── services/
│   │   │   ├── analyzer.py           # Core analysis logic
│   │   │   └── recommendation.py     # Recommendation engine
│   │   └── requirements.txt
│   │
│   └── scraper-service/              # Python scraper & crawler
│       ├── main.py                   # Worker entry point
│       ├── crawlers/
│       │   ├── serp_crawler.py       # Google SERP crawling
│       │   ├── news_crawler.py       # News site crawling
│       │   └── social_crawler.py     # Forum/social monitoring (opsional)
│       ├── processors/
│       │   ├── content_parser.py     # HTML content extraction
│       │   └── data_normalizer.py    # Normalize scraped data
│       ├── jobs/
│       │   ├── scheduler.py          # Bull queue job definitions
│       │   └── worker.py             # Job execution worker
│       └── requirements.txt
│
├── packages/
│   ├── types/                        # Shared TypeScript types
│   │   └── index.ts
│   └── config/                       # Shared configs (ESLint, TS, etc.)
│
├── docs/                             # Developer documentation
│   ├── api.md                        # API reference detail
│   ├── deployment.md                 # Deployment guide
│   └── architecture.md               # Architecture deep-dive
│
├── docker-compose.yml                # Local dev environment
├── docker-compose.prod.yml           # Production compose
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Lint, type-check, test
│       └── deploy.yml                # Deploy to Vercel + Railway
└── README.md                         # ← Kamu ada di sini
```

---

## 🧩 Modul & Fitur

### `MOD-01` Reputation Monitoring
**Tujuan:** Melacak penyebutan keyword klien di berbagai platform.

**Cara Kerja:**
1. User mendaftarkan keyword (nama, brand, dll)
2. Scraper Service menjalankan crawl terjadwal via Bull Queue
3. Hasil crawl dikirim ke AI Service untuk analisis
4. Data tersimpan ke PostgreSQL dan dashboard diupdate

**Input:** Keyword string, platform filter, frekuensi crawl  
**Output:** List mention + metadata (URL, tanggal, platform, sentimen)  
**Job Schedule:** Setiap 6 jam (configurable per paket)

---

### `MOD-02` Negative Sentiment Detection
**Tujuan:** Klasifikasi otomatis sentimen konten yang ditemukan.

**Cara Kerja:**
1. Konten hasil scraping dikirim ke FastAPI AI Service
2. Model NLP mengklasifikasikan: `positive` | `neutral` | `negative`
3. Risk keyword flagging: "penipuan", "scam", "bohong", "palsu", dll
4. Skor risiko dihitung berdasarkan sentimen + reach estimasi

**Model:** IndoBERT fine-tuned untuk sentiment analysis Bahasa Indonesia  
**Output:** Label sentimen, confidence score, risk level (`low`/`medium`/`high`/`critical`)

---

### `MOD-03` Digital Footprint Scanner
**Tujuan:** Deteksi penyebaran data pribadi di internet.

**Cara Kerja:**
1. User input data untuk dicek (nomor HP, email, nama lengkap)
2. Scanner memeriksa data breach databases & SERP
3. Hasil dikategorikan: email bocor, nomor tersebar, data sensitif
4. Rekomendasi langkah penghapusan dibuat otomatis

**Sumber Data:** Have I Been Pwned API, Google Dorks pattern, breach databases  
**Output:** List temuan + tingkat risiko + panduan penghapusan

---

### `MOD-04` Reputation Dashboard
**Tujuan:** Visualisasi status reputasi secara keseluruhan.

**Komponen:**
- **Reputation Score** (0–100): Agregat dari semua metrik
- **Sentiment Ratio:** Grafik donut positif vs negatif
- **Trend Chart:** Grafik garis skor reputasi 30/60/90 hari
- **Recent Mentions:** Feed terbaru dengan label sentimen
- **Active Alerts:** Ringkasan alert yang belum ditangani

**Update:** Real-time via WebSocket untuk alert, polling 5 menit untuk data umum

---

### `MOD-05` Crisis Alert System
**Tujuan:** Notifikasi instan saat ada lonjakan ancaman.

**Trigger Conditions:**
- Jumlah mention negatif meningkat >50% dalam 1 jam
- Keyword risiko tinggi terdeteksi di konten baru
- Data breach baru ditemukan
- Reputation score turun >10 poin dalam 24 jam

**Delivery Channels:**
- Email (via Resend)
- WhatsApp (via WhatsApp Cloud API)
- In-app notification (via WebSocket)

**Payload Notifikasi:**
```json
{
  "alert_id": "uuid",
  "severity": "critical",
  "trigger": "negative_surge",
  "summary": "Lonjakan 120% konten negatif terdeteksi",
  "mention_count": 47,
  "top_source": "kaskus.co.id",
  "recommended_action": "immediate_response",
  "created_at": "2026-04-19T10:30:00Z"
}
```

---

### `MOD-06` Action Recommendation Engine
**Tujuan:** Memberikan saran tindakan berdasarkan konteks ancaman.

**Decision Logic:**

| Situasi | Rekomendasi |
|---|---|
| Sentimen negatif rendah, traffic kecil | Pantau, tidak perlu aksi |
| Review buruk di platform bisnis | Respon profesional publik |
| Berita/artikel negatif viral | Buat konten tandingan + klarifikasi |
| Pencemaran nama baik | Klarifikasi + siapkan jalur hukum |
| Data pribadi bocor | Takedown request + lapor ke BSSN |
| Konten melanggar UU ITE | Panduan pelaporan ke Kominfo |

**Output:** List rekomendasi terurut prioritas, tiap item berisi: judul, deskripsi, langkah-langkah, resource link

---

### `MOD-07` Auto Report Generator
**Tujuan:** Generate laporan profesional siap kirim ke klien.

**Komponen Laporan:**
1. Executive Summary (ringkasan eksekutif)
2. Reputation Score & Trend
3. Breakdown Mention per Platform
4. Top Negative Content (screenshot + analisis)
5. Digital Footprint Findings
6. Active Alerts & Crisis Log
7. Action Recommendations
8. Appendix: Raw Data

**Format Output:** PDF (via Puppeteer/WeasyPrint) + shareable link (URL dengan token)  
**Branding:** White-label tersedia untuk paket Enterprise

---

## 🚀 Setup & Instalasi

### Prerequisites

```bash
Node.js >= 18.x
Python >= 3.11
PostgreSQL >= 15
Redis >= 7
pnpm >= 8.x (package manager)
```

### 1. Clone Repository

```bash
git clone https://github.com/your-org/reputation-shield.git
cd reputation-shield
```

### 2. Install Dependencies

```bash
# Install semua workspace dependencies
pnpm install

# Install Python dependencies untuk AI service
cd apps/ai-service && pip install -r requirements.txt

# Install Python dependencies untuk scraper
cd ../scraper-service && pip install -r requirements.txt
```

### 3. Setup Database

```bash
# Buat database PostgreSQL
createdb reputation_shield_dev

# Copy environment file
cp apps/web/.env.example apps/web/.env.local

# Jalankan migrations
cd apps/web
pnpm prisma migrate dev

# Seed data awal (opsional)
pnpm prisma db seed
```

### 4. Jalankan dengan Docker (Direkomendasikan)

```bash
# Jalankan semua services (PostgreSQL, Redis, semua apps)
docker-compose up -d

# Cek status
docker-compose ps

# Lihat logs
docker-compose logs -f web
```

### 5. Jalankan Manual (Development)

```bash
# Terminal 1: Next.js web app
cd apps/web && pnpm dev

# Terminal 2: FastAPI AI service
cd apps/ai-service && uvicorn main:app --reload --port 8001

# Terminal 3: Scraper worker
cd apps/scraper-service && python main.py

# Terminal 4: Redis (jika tidak pakai Docker)
redis-server
```

App akan tersedia di:
- **Web:** http://localhost:3000
- **AI Service:** http://localhost:8001
- **API Docs (FastAPI):** http://localhost:8001/docs

---

## 🔐 Environment Variables

### `apps/web/.env.local`

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/reputation_shield_dev"

# Redis
REDIS_URL="redis://localhost:6379"

# Auth
NEXTAUTH_SECRET="your-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# AI Service
AI_SERVICE_URL="http://localhost:8001"
AI_SERVICE_API_KEY="internal-service-key"

# Scraper Service
SCRAPER_SERVICE_URL="http://localhost:8002"

# Email (Resend)
RESEND_API_KEY="re_xxxx"
EMAIL_FROM="noreply@reputationshield.id"

# WhatsApp Cloud API
WA_PHONE_NUMBER_ID="your-phone-number-id"
WA_ACCESS_TOKEN="your-wa-access-token"

# Storage (AWS S3 / Cloudflare R2)
S3_BUCKET_NAME="reputation-shield-reports"
S3_ACCESS_KEY_ID="your-access-key"
S3_SECRET_ACCESS_KEY="your-secret-key"
S3_ENDPOINT_URL="https://your-r2-endpoint.r2.cloudflarestorage.com"  # R2 only

# External APIs
SERP_API_KEY="your-serpapi-key"            # SerpAPI untuk SERP monitoring
HIBP_API_KEY="your-hibp-api-key"           # Have I Been Pwned

# App Config
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### `apps/ai-service/.env`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/reputation_shield_dev"
INTERNAL_API_KEY="internal-service-key"
MODEL_PATH="./models/indobert-sentiment"
LOG_LEVEL="INFO"
```

---

## 📡 API Reference

### Authentication

Semua endpoint API (kecuali `/api/auth/*`) memerlukan header:
```
Authorization: Bearer <jwt_token>
```

---

### Monitoring Endpoints

#### `GET /api/monitoring/keywords`
Ambil semua keyword monitoring milik user.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "keyword": "Nama Brand",
      "platform": ["web", "news"],
      "frequency": "every_6h",
      "is_active": true,
      "last_crawled_at": "2026-04-19T08:00:00Z",
      "mention_count_24h": 12,
      "negative_count_24h": 3
    }
  ]
}
```

#### `POST /api/monitoring/keywords`
Tambah keyword baru.

**Body:**
```json
{
  "keyword": "Nama Brand",
  "platform": ["web", "news"],
  "frequency": "every_6h"
}
```

#### `GET /api/monitoring/mentions`
Ambil list mention dengan filter.

**Query Params:**
| Param | Type | Default | Keterangan |
|---|---|---|---|
| `keyword_id` | string | - | Filter per keyword |
| `sentiment` | `positive\|neutral\|negative` | all | Filter sentimen |
| `platform` | string | all | Filter platform |
| `from` | ISO date | 7 hari lalu | Rentang tanggal mulai |
| `to` | ISO date | sekarang | Rentang tanggal akhir |
| `page` | number | 1 | Pagination |
| `limit` | number | 20 | Items per halaman |

---

### Dashboard Endpoints

#### `GET /api/dashboard/summary`
Ambil ringkasan data dashboard.

**Response:**
```json
{
  "reputation_score": 78,
  "score_change_7d": +3,
  "mentions": {
    "total_24h": 47,
    "positive": 31,
    "neutral": 10,
    "negative": 6
  },
  "active_alerts": 2,
  "footprint_findings": 3,
  "trend": [
    { "date": "2026-04-12", "score": 75 },
    { "date": "2026-04-19", "score": 78 }
  ]
}
```

---

### Alert Endpoints

#### `GET /api/alerts`
List semua alert.

**Query Params:** `severity`, `status` (`active|resolved`), `page`, `limit`

#### `PATCH /api/alerts/:id/resolve`
Tandai alert sebagai resolved.

---

### Report Endpoints

#### `POST /api/reports/generate`
Trigger generate laporan baru (async).

**Body:**
```json
{
  "title": "Laporan Reputasi April 2026",
  "date_range": {
    "from": "2026-04-01",
    "to": "2026-04-30"
  },
  "include_sections": ["summary", "mentions", "alerts", "recommendations"],
  "format": "pdf"
}
```

**Response:**
```json
{
  "job_id": "uuid",
  "status": "processing",
  "estimated_seconds": 30
}
```

#### `GET /api/reports/:id/status`
Cek status pembuatan laporan.

#### `GET /api/reports/:id/download`
Download atau redirect ke URL laporan.

---

### AI Service Endpoints (Internal)

> Base URL: `http://ai-service:8001` — Hanya dapat diakses dari internal network.

#### `POST /analyze/sentiment`
```json
// Request
{ "text": "Perusahaan ini melakukan penipuan!", "lang": "id" }

// Response
{
  "sentiment": "negative",
  "confidence": 0.94,
  "risk_level": "high",
  "flagged_keywords": ["penipuan"]
}
```

#### `POST /analyze/score`
Hitung reputation score dari batch mention.

#### `POST /recommend/actions`
Generate rekomendasi tindakan berdasarkan konteks.

---

## 🗄️ Database Schema

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  plan          Plan      @default(STARTER)
  keywords      Keyword[]
  alerts        Alert[]
  reports       Report[]
  settings      UserSettings?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Keyword {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  keyword     String
  platforms   String[]  // ["web", "news", "forum"]
  frequency   String    @default("every_6h")
  isActive    Boolean   @default(true)
  mentions    Mention[]
  lastCrawledAt DateTime?
  createdAt   DateTime  @default(now())

  @@index([userId])
}

model Mention {
  id            String    @id @default(cuid())
  keywordId     String
  keyword       Keyword   @relation(fields: [keywordId], references: [id])
  url           String
  title         String
  snippet       String?
  platform      String    // "web", "news", "forum"
  sentiment     Sentiment // POSITIVE, NEUTRAL, NEGATIVE
  riskLevel     RiskLevel // LOW, MEDIUM, HIGH, CRITICAL
  confidence    Float
  flaggedWords  String[]
  publishedAt   DateTime?
  crawledAt     DateTime  @default(now())

  @@index([keywordId])
  @@index([sentiment])
  @@index([crawledAt])
}

model Alert {
  id          String      @id @default(cuid())
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  severity    AlertSeverity
  trigger     String      // "negative_surge", "keyword_flag", "breach_found"
  summary     String
  detail      Json
  status      AlertStatus @default(ACTIVE)
  resolvedAt  DateTime?
  createdAt   DateTime    @default(now())

  @@index([userId, status])
}

model FootprintScan {
  id          String    @id @default(cuid())
  userId      String
  inputData   Json      // { email, phone, name }
  findings    Json      // Array of findings
  riskLevel   RiskLevel
  scannedAt   DateTime  @default(now())
}

model Report {
  id          String      @id @default(cuid())
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  title       String
  dateFrom    DateTime
  dateTo      DateTime
  status      ReportStatus @default(PROCESSING)
  fileUrl     String?
  shareToken  String?     @unique
  metadata    Json?
  createdAt   DateTime    @default(now())

  @@index([userId])
}

model UserSettings {
  id                  String  @id @default(cuid())
  userId              String  @unique
  user                User    @relation(fields: [userId], references: [id])
  emailAlerts         Boolean @default(true)
  whatsappAlerts      Boolean @default(false)
  whatsappNumber      String?
  alertThreshold      String  @default("HIGH")  // Minimum severity untuk notif
  crawlFrequency      String  @default("every_6h")
}

enum Plan { STARTER PROFESSIONAL ENTERPRISE }
enum Sentiment { POSITIVE NEUTRAL NEGATIVE }
enum RiskLevel { LOW MEDIUM HIGH CRITICAL }
enum AlertSeverity { INFO WARNING HIGH CRITICAL }
enum AlertStatus { ACTIVE RESOLVED }
enum ReportStatus { PROCESSING READY FAILED }
```

---

## 🔄 Alur Kerja Sistem

### Alur Crawl & Analisis

```
Scheduler (Redis/Bull)
    │
    ├── Trigger job setiap N jam per keyword aktif
    │
    ▼
Scraper Service
    ├── SERP API → ambil hasil pencarian
    ├── News crawl → scraping artikel berita
    └── Parse content → ekstrak title, snippet, URL
    │
    ▼
AI Service (FastAPI)
    ├── Sentiment analysis (IndoBERT)
    ├── Risk keyword detection
    ├── Risk level scoring
    └── Action recommendation (jika risk HIGH/CRITICAL)
    │
    ▼
PostgreSQL
    └── Simpan Mention records
    │
    ▼
Alert Engine
    ├── Cek threshold (surge detection, keyword flag)
    ├── Create Alert record jika threshold terpenuhi
    └── Trigger Notification Service
    │
    ▼
Notification Service
    ├── Email (Resend)
    └── WhatsApp (WA Cloud API)
    │
    ▼
Dashboard (WebSocket)
    └── Push update real-time ke client yang sedang online
```

---

## 🧪 Testing

### Unit Tests

```bash
# Frontend (Jest + React Testing Library)
cd apps/web && pnpm test

# AI Service (pytest)
cd apps/ai-service && pytest tests/ -v

# Scraper Service (pytest)
cd apps/scraper-service && pytest tests/ -v
```

### Integration Tests

```bash
# Jalankan full integration test suite
cd apps/web && pnpm test:integration
```

### Test Coverage Target

| Modul | Target Coverage |
|---|---|
| API Routes | ≥ 80% |
| AI Service | ≥ 85% |
| Scraper Service | ≥ 70% |
| UI Components | ≥ 60% |

### Manual Test Checklist

Sebelum merge ke `main`:
- [ ] Login/logout flow berfungsi normal
- [ ] Tambah keyword dan crawl manual berhasil
- [ ] Sentimen terdeteksi dan tersimpan benar
- [ ] Alert muncul dan notifikasi terkirim
- [ ] Report berhasil di-generate dan dapat didownload
- [ ] Dashboard score terupdate setelah crawl baru

---

## 🚢 Deployment

### Stack Produksi

| Service | Platform |
|---|---|
| Web + API | Vercel |
| AI Service | Railway |
| Scraper Worker | Railway |
| PostgreSQL | Railway (atau Supabase) |
| Redis | Railway (atau Upstash) |
| File Storage | Cloudflare R2 |

### Deploy Web (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel --prod
```

Set environment variables di Vercel Dashboard (Settings → Environment Variables).

### Deploy AI & Scraper Service (Railway)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login & deploy
railway login
cd apps/ai-service && railway up
cd apps/scraper-service && railway up
```

### GitHub Actions CI/CD

Pipeline otomatis aktif saat push ke `main`:
1. **Lint & Type Check** — ESLint + TypeScript check
2. **Unit Tests** — Jest + pytest
3. **Build** — Next.js build
4. **Deploy** — Vercel (web) + Railway (services)

---

## 🗺️ Roadmap

### v0.1.0 — MVP (Target: Bulan 1)
- [x] Arsitektur & setup proyek
- [ ] Auth system (register, login, session)
- [ ] Keyword management CRUD
- [ ] SERP-based monitoring (manual trigger)
- [ ] Dashboard dasar (score + mention list)
- [ ] Email alert sistem

### v0.2.0 — Core Engine (Target: Bulan 2)
- [ ] Automated crawl scheduler (Bull Queue)
- [ ] IndoBERT sentiment analysis integration
- [ ] Risk scoring & threshold alerts
- [ ] WhatsApp notification
- [ ] Digital Footprint Scanner (email breach check)

### v0.3.0 — Action & Reports (Target: Bulan 3)
- [ ] Action Recommendation Engine
- [ ] PDF Report Generator
- [ ] Shareable report link
- [ ] Real-time WebSocket dashboard updates
- [ ] Paket & subscription system (Stripe/Midtrans)

### v1.0.0 — Production Ready (Target: Bulan 4–5)
- [ ] White-label reports (Enterprise)
- [ ] API publik untuk integrasi pihak ketiga
- [ ] Multi-user/team support
- [ ] Audit log & compliance reports
- [ ] Rate limiting & abuse prevention hardening
- [ ] Full test coverage ≥ 80%

---

## 🤝 Kontribusi

> Proyek ini saat ini dalam pengembangan internal. Kontribusi eksternal belum dibuka.

### Untuk Tim Internal

1. **Branch naming:** `feat/nama-fitur`, `fix/nama-bug`, `chore/task`
2. **Commit format:** Gunakan Conventional Commits
   ```
   feat(monitoring): tambah filter platform di mention list
   fix(alert): perbaiki duplikasi notifikasi WhatsApp
   chore(deps): update Next.js ke 14.2
   ```
3. **PR Requirements:**
   - Deskripsi jelas apa yang berubah
   - Screenshot/video jika ada perubahan UI
   - Semua test passing
   - Tidak ada TypeScript error
4. **Code Review:** Minimal 1 approval sebelum merge

---

## ⚖️ Etika & Legal

Tools ini wajib digunakan sesuai:
- **UU ITE No. 19 Tahun 2016** — Terkait konten dan komunikasi elektronik
- **UU PDP No. 27 Tahun 2022** — Perlindungan data pribadi
- **Kebijakan Penggunaan** — Hanya untuk melindungi reputasi diri sendiri atau klien yang memberikan izin eksplisit

**Dilarang keras:**
- Menggunakan tools untuk memata-matai pihak lain tanpa izin
- Menggunakan hasil untuk manipulasi informasi publik
- Menyimpan data pihak lain tanpa dasar hukum yang sah

---

## 📄 Lisensi

**Proprietary — Hak Cipta Dilindungi**

© 2026 Nafal Faturizki. Seluruh hak cipta dilindungi. Dilarang mendistribusikan, memodifikasi, atau menggunakan kode ini tanpa izin tertulis dari pemegang hak cipta.

---

<div align="center">

**Reputation Shield** · Digital PR Protection Tool  
Dibuat dengan ☕ untuk pasar Indonesia

[Dokumentasi](./docs) · [API Reference](./docs/api.md) · [Deployment Guide](./docs/deployment.md)

</div>
