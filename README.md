# 🛡️ Reputation Shield — Personal Intelligence Platform

> **Monitor. Detect. Defend.**
> Platform intelijen reputasi pribadi untuk agensi dan individu — memantau narasi publik, dark web, dan ancaman digital, sekaligus terhubung langsung ke jasa konsultasi PR defensif profesional.

[![Status](https://img.shields.io/badge/status-active%20development-yellow)](.)
[![Version](https://img.shields.io/badge/version-0.1.0--alpha-blue)](.)
[![License](https://img.shields.io/badge/license-Proprietary-red)](.)
[![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20FastAPI%20%7C%20PostgreSQL%20%7C%20Tor-informational)](.)

---

## 📋 Daftar Isi

- [Visi Produk](#-visi-produk)
- [Perbedaan Versi Sebelumnya](#-perbedaan-dari-versi-sebelumnya)
- [Arsitektur Sistem](#️-arsitektur-sistem)
- [Tech Stack](#-tech-stack)
- [Struktur Direktori](#-struktur-direktori)
- [Modul Inti](#-modul-inti)
- [Dark Web Intelligence Layer](#-dark-web-intelligence-layer)
- [Consultation Service Bridge](#-consultation-service-bridge)
- [Setup & Instalasi](#-setup--instalasi)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Alur Kerja Sistem](#-alur-kerja-sistem)
- [Keamanan & Privasi](#-keamanan--privasi)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Etika & Legal](#️-etika--legal)

---

## 🔭 Visi Produk

**Reputation Shield** adalah platform intelijen reputasi pribadi (*Personal Reputation Intelligence Platform*) yang dirancang untuk dua tipe pengguna:

| Tipe | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Individu** | Profesional, public figure, eksekutif, influencer | Pantau nama pribadi, cegah pencemaran, lindungi privasi |
| **Agensi / Bisnis** | UMKM, startup, brand korporat | Pantau narasi merek, kelola krisis, proteksi reputasi tim |

Platform ini bukan sekadar monitoring tools — ia adalah **command center** reputasi yang:

1. **Memantau** narasi tentang klien di permukaan internet (web, news, forum, sosmed) maupun **dark web** (paste sites, marketplace data breach, forum hacker)
2. **Mendeteksi** ancaman lebih awal — sebelum jadi krisis publik
3. **Menghubungkan** klien langsung ke **jasa konsultasi PR defensif** (milik kamu sebagai penyedia layanan) untuk mendapatkan bantuan nyata

> Filosofi inti: *Tools ini adalah pintu masuk. Jasa kamu adalah solusinya.*

---

## 🆕 Perbedaan dari Versi Sebelumnya

| Aspek | v1 (Monitoring Biasa) | v2 (Personal Intelligence Platform) |
|---|---|---|
| **Target** | Umum | Agensi & individu spesifik |
| **Scope monitoring** | Surface web saja | Surface web + **Dark Web** |
| **Output** | Laporan & alert | Laporan + alert + **akses langsung ke jasa konsultasi** |
| **Model bisnis** | SaaS murni | SaaS + **layanan terhubung (service marketplace)** |
| **Engagement** | Self-service | Self-service + **human-in-the-loop** (konsultan kamu) |
| **Data sensitif** | Terbatas | **Breach data, leaked credentials, dark web exposure** |
| **Personalisasi** | Keyword-based | **Identity profile-based** (nama, alias, brand, domain, email, phone) |

---

## 🏗️ Arsitektur Sistem

```
╔══════════════════════════════════════════════════════════════════════╗
║                        CLIENT APPLICATIONS                          ║
║                                                                      ║
║   ┌─────────────────┐    ┌─────────────────┐    ┌───────────────┐  ║
║   │   Web App       │    │  Mobile (PWA)   │    │ Admin Panel   │  ║
║   │  (Next.js 14)   │    │                 │    │ (Konsultan)   │  ║
║   └────────┬────────┘    └────────┬────────┘    └───────┬───────┘  ║
╚════════════╪════════════════════╪═════════════════════╪════════════╝
             └────────────────────┴─────────────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │        API GATEWAY         │
                    │  (NGINX + Next.js Routes)  │
                    │  Auth · Rate Limit · CORS  │
                    └──┬──────────┬──────────┬───┘
                       │          │          │
          ┌────────────▼──┐  ┌────▼───────┐  ┌▼──────────────────┐
          │  Core API     │  │ AI/NLP     │  │ Intelligence       │
          │  (Next.js)    │  │ Engine     │  │ Crawler Service    │
          │               │  │ (FastAPI)  │  │ (Python)           │
          │ - Auth/RBAC   │  │            │  │                    │
          │ - Dashboard   │  │ - Sentiment│  │ ┌──────────────┐   │
          │ - Profiles    │  │ - Scoring  │  │ │Surface Layer │   │
          │ - Cases       │  │ - NER      │  │ │SERP·News·    │   │
          │ - Reports     │  │ - Classify │  │ │Forum·Social  │   │
          │ - Consult.    │  │ - Recommend│  │ └──────────────┘   │
          └────────┬──────┘  └────────────┘  │ ┌──────────────┐   │
                   │                          │ │  Dark Web    │   │
                   │                          │ │  Layer (Tor) │   │
          ┌────────▼──────────────────────┐   │ │Paste·Market  │   │
          │         DATA LAYER            │   │ │·Breach·Forum │   │
          │                               │   │ └──────────────┘   │
          │  PostgreSQL  │  Redis          │   └───────────────────┘
          │  (primary)   │  (cache/queue)  │
          │              │                 │
          │  S3/R2       │  Elasticsearch  │
          │  (files)     │  (search index) │
          └───────────────────────────────┘
                   │
          ┌────────▼──────────────────────┐
          │    CONSULTATION SERVICE LAYER  │
          │                               │
          │  Case Management │ Scheduling  │
          │  Internal Chat   │ Task Board  │
          │  SLA Tracker     │ Invoicing   │
          └───────────────────────────────┘
                   │
          ┌────────▼──────────────────────┐
          │     NOTIFICATION SERVICE      │
          │  Email · WhatsApp · Telegram  │
          │  In-App (WebSocket)           │
          └───────────────────────────────┘
```

---

## 🧰 Tech Stack

### Frontend

| Layer | Teknologi | Keterangan |
|---|---|---|
| Framework | Next.js 14 App Router | SSR + RSC + API Routes |
| Language | TypeScript (strict) | End-to-end type safety |
| Styling | Tailwind CSS + shadcn/ui | Utility-first + headless components |
| State | Zustand + React Query | Client state + server sync |
| Charts | Recharts + D3.js | Reputation trend, exposure map |
| Real-time | Socket.io Client | Live alert push |
| PWA | next-pwa | Offline support + mobile install |

### Backend

| Layer | Teknologi | Keterangan |
|---|---|---|
| API Utama | Next.js API Routes | Auth, CRUD, dashboard data |
| AI/NLP | FastAPI (Python 3.11) | Analisis sentimen, scoring, NER |
| Crawler Surface | Python + Playwright | Web crawling, news scraping |
| Crawler Dark Web | Python + Stem (Tor) | Dark web monitoring via .onion |
| Queue | Redis + BullMQ | Job scheduling crawl & analisis |
| WebSocket | Socket.io | Real-time notifications |
| Search | Elasticsearch 8 | Full-text search across mentions |

### Database & Storage

| Komponen | Teknologi | Keterangan |
|---|---|---|
| Primary DB | PostgreSQL 16 | Data utama semua modul |
| Cache | Redis 7 | Session, rate limit, queue jobs |
| Search Index | Elasticsearch | Mention search & aggregation |
| File Storage | Cloudflare R2 | PDF reports, evidence screenshots |
| ORM | Prisma | Schema + migrations |

### Infrastructure

| Komponen | Platform |
|---|---|
| Web App | Vercel |
| AI + Crawler Services | Railway |
| Tor Proxy | Self-hosted VPS (isolated) |
| PostgreSQL + Redis | Railway / Supabase |
| Elasticsearch | Elastic Cloud / self-hosted |
| CDN + DDoS | Cloudflare |
| Monitoring | Sentry + Better Uptime |

### Notifications

| Channel | Provider |
|---|---|
| Email | Resend |
| WhatsApp | WhatsApp Cloud API |
| Telegram | Telegram Bot API |
| In-App | Socket.io |

---

## 📁 Struktur Direktori

```
reputation-shield/
│
├── apps/
│   │
│   ├── web/                              # Next.js — Frontend + Core API
│   │   ├── app/
│   │   │   ├── (auth)/                   # Login, register, onboarding
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── onboarding/           # Setup identity profile awal
│   │   │   │
│   │   │   ├── (dashboard)/              # Protected area
│   │   │   │   ├── dashboard/            # Overview, skor, alert terkini
│   │   │   │   ├── intelligence/         # Semua monitoring & temuan
│   │   │   │   │   ├── surface/          # Hasil crawl web publik
│   │   │   │   │   └── darkweb/          # Hasil dark web scan
│   │   │   │   ├── profile/              # Identity profile management
│   │   │   │   ├── alerts/               # Crisis alert & history
│   │   │   │   ├── cases/                # Kasus yang dibuka ke konsultan
│   │   │   │   │   ├── new/              # Buka kasus baru
│   │   │   │   │   ├── [id]/             # Detail kasus + chat konsultan
│   │   │   │   │   └── history/          # Riwayat kasus selesai
│   │   │   │   ├── reports/              # Report generator & arsip
│   │   │   │   ├── takedown/             # Manajemen takedown request
│   │   │   │   └── settings/             # Akun, notifikasi, billing
│   │   │   │
│   │   │   ├── (admin)/                  # Admin panel untuk konsultan kamu
│   │   │   │   ├── cases/                # Semua kasus masuk
│   │   │   │   ├── clients/              # Manajemen klien
│   │   │   │   ├── intelligence/         # Raw intelligence feed
│   │   │   │   └── analytics/            # Revenue, SLA, performance
│   │   │   │
│   │   │   └── api/
│   │   │       ├── auth/
│   │   │       ├── profiles/             # Identity profile CRUD
│   │   │       ├── intelligence/         # Surface + dark web data
│   │   │       ├── alerts/
│   │   │       ├── cases/                # Consultation case management
│   │   │       ├── reports/
│   │   │       ├── takedown/
│   │   │       ├── notifications/
│   │   │       └── webhooks/
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                       # shadcn/ui base
│   │   │   ├── dashboard/
│   │   │   ├── intelligence/
│   │   │   │   ├── MentionCard.tsx
│   │   │   │   ├── DarkWebAlert.tsx      # Komponen khusus dark web finding
│   │   │   │   ├── ExposureMap.tsx       # Peta sebaran temuan
│   │   │   │   └── ThreatTimeline.tsx
│   │   │   ├── cases/
│   │   │   │   ├── CaseForm.tsx          # Form buka kasus baru
│   │   │   │   ├── CaseChat.tsx          # Real-time chat klien-konsultan
│   │   │   │   └── CaseStatus.tsx
│   │   │   └── shared/
│   │   │
│   │   ├── lib/
│   │   │   ├── auth.ts
│   │   │   ├── prisma.ts
│   │   │   ├── redis.ts
│   │   │   ├── elasticsearch.ts
│   │   │   ├── socket.ts
│   │   │   └── utils.ts
│   │   │
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       └── migrations/
│   │
│   ├── ai-service/                       # FastAPI — AI/NLP Engine
│   │   ├── main.py
│   │   ├── routers/
│   │   │   ├── sentiment.py              # Sentiment analysis
│   │   │   ├── ner.py                    # Named Entity Recognition
│   │   │   ├── scoring.py                # Reputation scoring
│   │   │   ├── classify.py               # Threat classification
│   │   │   └── recommend.py              # Action recommendation
│   │   ├── models/
│   │   │   ├── indobert_sentiment.py     # IndoBERT fine-tuned
│   │   │   ├── risk_classifier.py
│   │   │   └── ner_model.py              # Deteksi entitas nama/brand
│   │   ├── services/
│   │   │   ├── analyzer.py
│   │   │   ├── recommendation_engine.py
│   │   │   └── dark_web_classifier.py    # Klasifikasi konten dark web
│   │   └── requirements.txt
│   │
│   ├── surface-crawler/                  # Python — Surface Web Crawler
│   │   ├── main.py
│   │   ├── crawlers/
│   │   │   ├── serp_crawler.py           # Google/Bing SERP
│   │   │   ├── news_crawler.py           # Portal berita Indonesia
│   │   │   ├── forum_crawler.py          # Kaskus, Reddit ID, dll
│   │   │   └── social_crawler.py         # Twitter/X, TikTok (via API)
│   │   ├── processors/
│   │   │   ├── content_extractor.py
│   │   │   ├── screenshot_capture.py     # Capture evidence otomatis
│   │   │   └── data_normalizer.py
│   │   ├── jobs/
│   │   │   ├── scheduler.py
│   │   │   └── worker.py
│   │   └── requirements.txt
│   │
│   └── darkweb-crawler/                  # Python — Dark Web Intelligence
│       ├── main.py
│       ├── crawlers/
│       │   ├── paste_monitor.py          # Pastebin, Riseup Paste, dll
│       │   ├── breach_monitor.py         # Leaked credential databases
│       │   ├── marketplace_monitor.py    # Dark web marketplace mentions
│       │   └── forum_monitor.py          # Dark web forum mentions
│       ├── processors/
│       │   ├── pii_detector.py           # Deteksi data pribadi (email, phone, NIK)
│       │   ├── credential_parser.py      # Parse credential leaks
│       │   └── evidence_hasher.py        # Hash & preserve evidence chain
│       ├── tor_client/
│       │   ├── tor_session.py            # Tor connection management
│       │   ├── circuit_rotation.py       # IP rotation via Tor circuits
│       │   └── torrc.template            # Tor config template
│       ├── jobs/
│       │   ├── scheduler.py
│       │   └── worker.py
│       └── requirements.txt
│
├── packages/
│   ├── types/                            # Shared TypeScript types
│   └── config/                           # Shared ESLint, TS config
│
├── docs/
│   ├── api.md
│   ├── darkweb-ops.md                    # Panduan operasional dark web crawler
│   ├── security.md                       # Security hardening guide
│   ├── deployment.md
│   └── consultation-workflow.md          # Alur kerja layanan konsultasi
│
├── infra/
│   ├── docker-compose.yml                # Local dev (semua services)
│   ├── docker-compose.prod.yml
│   ├── nginx/nginx.conf
│   └── tor/torrc                         # Tor daemon config
│
└── .github/
    └── workflows/
        ├── ci.yml
        └── deploy.yml
```

---

## 🧩 Modul Inti

### `MOD-01` Identity Profile System

Jantung dari platform ini. Berbeda dari tools monitoring biasa yang hanya tracking keyword, **Identity Profile** merepresentasikan identitas digital lengkap seseorang atau brand.

**Komponen Profile:**

```
Identity Profile
├── Personal Data
│   ├── Nama lengkap + variasi penulisan
│   ├── Alias / nama panggilan / nama brand
│   └── Profesi / jabatan
│
├── Digital Identifiers (untuk monitoring)
│   ├── Email addresses (personal & bisnis)
│   ├── Nomor telepon
│   ├── Username di berbagai platform
│   ├── Domain website
│   └── NIK / NPWP (opsional, enkripsi penuh)
│
├── Monitoring Config
│   ├── Platform yang dipantau
│   ├── Bahasa target (ID, EN, dll)
│   ├── Frekuensi scan (dark web: harian, surface: 6 jam)
│   └── Alert threshold per channel
│
└── Risk Context
    ├── Industri / sektor
    ├── Riwayat kasus / isu publik
    └── Known adversaries (opsional)
```

**Cara Kerja:**
- Satu profile dapat memiliki banyak identifier (email, nama, username, dll)
- Setiap identifier didaftarkan sebagai target monitoring di semua crawler
- Crawler mencari variasi: exact match, fuzzy match, partial match
- Semua temuan dilink ke profile yang bersangkutan

---

### `MOD-02` Surface Web Intelligence

Monitoring narasi di internet publik secara terstruktur.

**Sumber Data:**

| Platform | Metode | Frekuensi |
|---|---|---|
| Google Search | SerpAPI | Setiap 6 jam |
| Bing Search | Bing Search API | Setiap 6 jam |
| Portal Berita Indonesia | Playwright crawl | Setiap 3 jam |
| Kaskus | Playwright crawl | Setiap 6 jam |
| Twitter/X | Twitter API v2 | Setiap 1 jam |
| TikTok | Unofficial API (scrape) | Setiap 12 jam |
| YouTube Comments | YouTube Data API | Setiap 12 jam |
| Google Reviews | Places API | Setiap 24 jam |

**Cara Kerja:**
1. Crawler mengambil konten berdasarkan identifier dalam Identity Profile
2. Konten dikirim ke AI Service untuk analisis sentimen + risk scoring
3. Screenshot evidence diambil otomatis dan disimpan ke R2
4. Hasil diindeks ke Elasticsearch untuk pencarian cepat
5. Alert dipicu jika risk level memenuhi threshold

---

### `MOD-03` Dark Web Intelligence Layer

> ⚠️ **Modul sensitif.** Operasi dilakukan secara terisolasi di dedicated VPS dengan Tor. Tidak ada data pengguna yang keluar dari environment ini tanpa enkripsi.

**Apa yang Dimonitor:**

| Kategori | Sumber | Temuan Khas |
|---|---|---|
| **Paste Sites** | Pastebin, Ghostbin, Riseup, 0bin | Email, nomor HP, data pribadi yang di-dump |
| **Credential Leaks** | BreachDirectory API, dark web leak forums | Username+password bocor |
| **Data Breach Markets** | Dark web marketplace (via Tor) | Data identitas diperjualbelikan |
| **Hacker Forums** | Dark web discussion boards | Percakapan tentang target spesifik |
| **Threat Intel Feeds** | IntelX, DeHashed API | Agregat data breach dari berbagai sumber |
| **Doxxing Archives** | Paste + forum | Kompilasi data pribadi yang sengaja disebar |

**Alur Operasional:**

```
Identity Profile
      │
      ▼
Dark Web Crawler (VPS Terisolasi)
      │
      ├── Tor Circuit → Paste Sites Monitor
      ├── Tor Circuit → Marketplace Monitor
      ├── Tor Circuit → Forum Monitor
      └── API → Breach Intelligence APIs (IntelX, DeHashed)
      │
      ▼
PII Detector (deteksi data pribadi dalam konten)
      │
      ▼
Evidence Hasher (SHA-256 hash + timestamp → chain of custody)
      │
      ▼
Encrypted Transfer → Core API → PostgreSQL
      │
      ▼
Severity Classification:
  CRITICAL → Data aktif diperjualbelikan / targeted threat
  HIGH     → Credential bocor / data pribadi tersebar luas
  MEDIUM   → Mention di forum / paste tanpa konteks jual-beli
  LOW      → Mention tidak langsung / false positive likely
      │
      ▼
Immediate Alert (jika CRITICAL/HIGH) → Klien + Konsultan kamu
```

**Keamanan Operasional:**
- Crawler berjalan di VPS terpisah, tidak terhubung langsung ke infrastruktur utama
- Semua hasil dienkripsi (AES-256) sebelum dikirim ke core API
- IP asli tidak pernah terekspos ke dark web (selalu via Tor)
- Log operasional dark web disimpan terpisah dan dirotasi setiap 7 hari

---

### `MOD-04` Reputation Scoring Engine

Menghasilkan satu angka (0–100) yang merepresentasikan kondisi reputasi digital klien saat ini.

**Formula Scoring:**

```
Reputation Score = 100 - (Weighted Threat Sum)

Komponen pengurang:
├── Surface Negative Mentions   × 0.40  (maks -40 poin)
├── Dark Web Exposure           × 0.35  (maks -35 poin)
├── Active Crisis / Viral Issue × 0.15  (maks -15 poin)
└── Unresolved Cases            × 0.10  (maks -10 poin)

Bonus restorasi:
└── +5 poin per campaign counter-narrative aktif
```

**Klasifikasi Score:**

| Range | Status | Tindakan |
|---|---|---|
| 85–100 | Aman | Monitor rutin |
| 70–84 | Waspada | Review mingguan |
| 50–69 | Berisiko | Konsultasi direkomendasikan |
| 30–49 | Krisis | Konsultasi segera |
| 0–29 | Darurat | Intervensi mendesak |

---

### `MOD-05` Crisis Alert System

**Trigger Conditions:**

| Event | Severity | Notifikasi |
|---|---|---|
| Credential bocor di dark web | CRITICAL | Instant: WhatsApp + Email + Telegram |
| Data pribadi diperjualbelikan | CRITICAL | Instant: semua channel |
| Lonjakan mention negatif >100% dalam 2 jam | HIGH | < 5 menit |
| Konten negatif mulai viral | HIGH | < 5 menit |
| Mention di media nasional dengan sentimen negatif | HIGH | < 15 menit |
| Keyword risiko tinggi terdeteksi | MEDIUM | < 30 menit |
| Score turun >15 poin dalam 24 jam | MEDIUM | < 1 jam |
| Mention baru di forum dark web | MEDIUM | < 1 jam |

**Payload Alert:**
```json
{
  "alert_id": "alrt_01j9xyz",
  "profile_id": "prof_clientabc",
  "severity": "CRITICAL",
  "category": "dark_web_exposure",
  "title": "Kredensial ditemukan di dark web marketplace",
  "summary": "Email dan password klien terdeteksi dalam dump data yang dijual.",
  "evidence": {
    "source_type": "darkweb_marketplace",
    "url_hashed": "sha256:a3f9...",
    "pii_types": ["email", "credential"],
    "screenshot_url": "https://r2.example.com/evidence/alrt_01j9xyz.png"
  },
  "created_at": "2026-04-19T10:00:00Z"
}
```

---

## 🤝 Consultation Service Bridge

Modul yang menghubungkan deteksi ancaman secara langsung ke layanan konsultasi PR defensif.

**Alur Pembukaan Kasus:**

```
Alert CRITICAL/HIGH terdeteksi
        │
        ▼
Klien mendapat notifikasi + tombol "Buka Kasus"
        │
        ▼
CaseForm: isi judul, prioritas, deskripsi situasi
        │
        ▼
POST /api/cases → Case ID dibuat → notifikasi konsultan
        │
        ▼
CaseChat (real-time via WebSocket/Socket.io)
        │
        ▼
Strategi respons disepakati → eksekusi (takedown, counter-narrative)
        │
        ▼
Kasus ditutup → PDF report digenerate → invoice
```

**SLA (Service Level Agreement):**

| Prioritas | Waktu Respons | Target Penyelesaian |
|---|---|---|
| CRITICAL | < 1 jam | < 24 jam |
| HIGH | < 3 jam | < 72 jam |
| MEDIUM | < 24 jam | < 7 hari |
| LOW | < 48 jam | < 14 hari |

**Fitur CaseChat:**
- Real-time messaging via Socket.io antara klien dan konsultan
- Optimistic UI update (pesan tampil instan, retry jika gagal)
- Riwayat chat tersimpan di PostgreSQL
- Notifikasi push saat ada pesan baru

---

## 🚀 Setup & Instalasi

### Prerequisites

```bash
Node.js >= 20
Python >= 3.11
Docker & Docker Compose
Tor (untuk dark web crawler)
```

### Clone & Install

```bash
git clone https://github.com/your-org/os-defender.git
cd os-defender

# Install semua dependencies (monorepo)
npm install

# Install Python dependencies untuk AI service
cd apps/ai-service && pip install -r requirements.txt && cd ../..

# Install Python dependencies untuk crawlers
cd apps/surface-crawler && pip install -r requirements.txt && cd ../..
cd apps/darkweb-crawler && pip install -r requirements.txt && cd ../..
```

### Setup Database

```bash
# Copy env file
cp .env.example .env
# Edit .env dengan credentials yang sesuai

# Jalankan PostgreSQL + Redis via Docker
docker-compose up -d postgres redis

# Generate Prisma client + migrate
cd apps/web
npx prisma generate
npx prisma migrate dev --name init
```

### Jalankan Development

```bash
# Semua services via Docker Compose
docker-compose up

# Atau individual:
npm run dev           # Next.js web app (port 3000)
cd apps/ai-service && uvicorn main:app --reload --port 8001
cd apps/surface-crawler && python main.py
cd apps/darkweb-crawler && python main.py  # Butuh Tor
```

---

## 🔐 Environment Variables

Semua environment variable didokumentasikan di `.env.example`. Variable kritis:

| Variable | Deskripsi | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `REDIS_URL` | Redis connection string | ✅ |
| `JWT_SECRET` | Secret untuk JWT signing | ✅ |
| `ENCRYPTION_KEY` | AES-256 key untuk data sensitif | ✅ |
| `AI_SERVICE_URL` | URL FastAPI AI service | ✅ |
| `WHATSAPP_API_KEY` | WhatsApp Cloud API key | ⚡ |
| `TELEGRAM_BOT_TOKEN` | Telegram Bot token | ⚡ |
| `RESEND_API_KEY` | Resend email API key | ⚡ |
| `ELASTICSEARCH_URL` | Elasticsearch endpoint | ⚡ |
| `R2_BUCKET_NAME` | Cloudflare R2 bucket | ⚡ |
| `TOR_PROXY_HOST` | Tor SOCKS5 proxy host | 🌐 |
| `SERPAPI_KEY` | SerpAPI untuk Google crawl | 🌐 |
| `TWITTER_BEARER_TOKEN` | Twitter API v2 bearer | 🌐 |

> ✅ Required · ⚡ Notification channel (at least one required) · 🌐 Intelligence module

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/auth/register` | Registrasi akun baru |
| POST | `/api/auth/login` | Login, returns JWT token |

### Identity Profile

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/profiles` | Daftar profiles user |
| POST | `/api/profiles` | Buat profile baru |

### Intelligence

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/intelligence` | Feed intelligence terbaru |

### Alerts

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/alerts` | Daftar semua alert |
| GET | `/api/alerts/[id]` | Detail alert |
| PATCH | `/api/alerts/[id]` | Update isRead |

### Consultation Cases

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/cases` | Daftar kasus |
| POST | `/api/cases` | Buka kasus baru |
| GET | `/api/cases/[id]` | Detail kasus |
| PATCH | `/api/cases/[id]` | Update status kasus |
| GET | `/api/cases/[id]/messages` | Riwayat chat |
| POST | `/api/cases/[id]/messages` | Kirim pesan baru |

### Reports

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/reports` | Daftar laporan |
| POST | `/api/reports` | Generate laporan baru |

### Takedown

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/takedown` | Daftar takedown requests |
| POST | `/api/takedown` | Ajukan takedown baru |

### Notifications

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/notifications` | Daftar notifikasi user |
| POST | `/api/notifications` | Kirim notifikasi manual |

### Webhooks (Internal)

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/webhooks` | Terima event dari crawler/AI |

### AI Service (FastAPI — port 8001)

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/sentiment` | Analisis sentimen teks |
| POST | `/ner` | Named entity recognition |
| POST | `/classify` | Klasifikasi ancaman |
| POST | `/scoring` | Hitung reputation score |
| POST | `/recommend` | Rekomendasi tindakan |
| POST | `/analyze` | Pipeline lengkap (semua step) |
| POST | `/profiles/score` | Skor risiko profile |

---

## 🗄️ Database Schema

Sistem menggunakan PostgreSQL dengan Prisma ORM. Model utama:

```
User (id, email, name, passwordHash, role)
  └── IdentityProfile (id, fullName, alias, emails[], phones[], usernames[], domains[], reputationScore)
        ├── Mention (id, sourceType, sourceName, url, content, sentiment, riskScore)
        ├── Alert (id, severity, category, title, summary, isRead)
        ├── Case (id, title, description, status, priority)
        │     └── CaseMessage (id, senderRole, senderName, body)
        ├── Report (id, title, type, fileUrl)
        └── Takedown (id, target, platform, status)

Notification (id, userId, channel, message, isRead)
```

Skema lengkap: `apps/web/prisma/schema.prisma`

---

## 🔄 Alur Kerja Sistem

```
1. Klien mendaftar → Onboarding → Buat Identity Profile
        │
        ▼
2. Crawler (setiap N jam):
   Surface Crawler → scrape web publik
   Dark Web Crawler → scan paste/marketplace/forum via Tor
        │
        ▼
3. AI Pipeline (per temuan):
   Text → Sentiment Analysis → Risk Classification → NER → Score
        │
        ▼
4. Temuan disimpan sebagai Mention ke PostgreSQL
   Jika risk tinggi → Alert dibuat
        │
        ▼
5. Alert dikirim via Notification channels:
   CRITICAL → WhatsApp + Email + Telegram + in-app
   HIGH     → WhatsApp + Email + in-app
   MEDIUM   → Email + in-app
   LOW      → in-app only
        │
        ▼
6. Klien membuka Dashboard → melihat alert
   Jika perlu → Buka Case konsultasi
        │
        ▼
7. Konsultan merespons via CaseChat
   Eksekusi: takedown, counter-narrative, pernyataan publik
        │
        ▼
8. Kasus ditutup → PDF report digenerate → Invoice
   Reputation Score diperbarui otomatis
```

---

## 🔒 Keamanan & Privasi

### Data Protection

| Layer | Mekanisme |
|---|---|
| Password | bcrypt (cost factor 12) |
| Data sensitif (NIK, dll) | AES-256-GCM enkripsi |
| API komunikasi | HTTPS/TLS 1.3 |
| JWT Token | RS256, expires 24 jam |
| Database | Row-level encryption untuk kolom sensitif |

### Dark Web Operational Security

- Crawler berjalan di **VPS terisolasi**, tidak terhubung langsung ke infrastruktur utama
- Semua request ke dark web **hanya via Tor circuit rotation**
- IP asli tidak pernah terekspos
- Log operasional dark web **dirotasi setiap 7 hari**
- Evidence (screenshot, hash) disimpan terenkripsi di Cloudflare R2

### Prisip Privacy by Design

1. **Data Minimization** — hanya kumpulkan data yang diperlukan untuk monitoring
2. **Purpose Limitation** — data digunakan hanya untuk tujuan yang disebutkan
3. **User Control** — klien bisa request delete semua data kapan saja
4. **Audit Trail** — semua akses data sensitif dicatat

---

## 🧪 Testing

### Menjalankan Test

```bash
# Semua test dari root monorepo
npm run test

# Hanya AI service (pytest)
cd apps/ai-service && python -m pytest tests -v

# Hanya web (jika ada test runner)
npm run test --workspace=web
```

### Coverage AI Service

| Module | Test Cases | Coverage |
|---|---|---|
| `models/indobert_sentiment` | 3 (neg/pos/neutral) | sentimen keyword |
| `models/risk_classifier` | 2 (classify + score) | keyword-based |
| `models/ner_model` | 2 (target + email) | regex extraction |
| `services/analyzer` | 1 (full pipeline) | end-to-end |
| `services/recommendation_engine` | 2 (high threat + low) | playbook matching |
| `services/dark_web_classifier` | 2 (credential + pii) | keyword signatures |
| `routers/*` | 7 (semua endpoint) | HTTP contract |
| `routers/analyze` | 3 + 3 wiring | unified pipeline |

**Total: 26 test cases, semua passing**

### Test Web API

```bash
# Health check
curl http://localhost:3000/api/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password123"}'

# AI analyze
curl -X POST http://localhost:8001/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"kredensial bocor dijual","source_type":"darkweb","targets":[]}'
```

---

## 🚢 Deployment

### Docker Compose (Production)

```bash
# Copy env produksi
cp .env.example .env.production
# Edit .env.production

# Deploy semua services
docker-compose -f infra/docker-compose.prod.yml up -d

# Cek status
docker-compose -f infra/docker-compose.prod.yml ps
```

### Services yang Di-deploy

| Service | Port | Deskripsi |
|---|---|---|
| `web` | 3000 | Next.js app |
| `ai-service` | 8001 | FastAPI AI |
| `surface-crawler` | - | Background worker |
| `darkweb-crawler` | - | Background worker (butuh Tor) |
| `postgres` | 5432 | Database |
| `redis` | 6379 | Cache + queue |
| `elasticsearch` | 9200 | Full-text search |
| `nginx` | 80/443 | Reverse proxy + SSL |
| `tor` | 9050 | Tor SOCKS5 proxy |

### Environment Production Notes

- Gunakan **managed PostgreSQL** (Railway, Supabase, Neon) untuk HA
- Gunakan **Upstash Redis** untuk serverless Redis
- Deploy **AI service** ke VPS terpisah (CPU-intensive)
- Deploy **dark web crawler** ke **VPS terisolasi** khusus dengan Tor
- Konfigurasi **Cloudflare R2** untuk penyimpanan evidence
- Setup **Cloudflare** sebagai CDN + DDoS protection

---

## 🗺️ Roadmap

### v0.1.0 — Alpha (Current)
- [x] Monorepo setup (Next.js + FastAPI + crawlers)
- [x] Identity Profile system
- [x] Surface web crawler framework
- [x] Dark web crawler framework (Tor-based)
- [x] AI service: sentiment, NER, classification, scoring, recommendation
- [x] Dashboard, alerts, cases, reports, takedown pages
- [x] Real-time CaseChat (Socket.io stub)
- [x] Notification dispatcher (multi-channel stub)
- [x] Admin console
- [x] Prisma schema + Docker Compose infra

### v0.2.0 — Beta
- [ ] Integrasi database nyata (PostgreSQL + Prisma migrations)
- [ ] JWT auth lengkap (NextAuth.js atau custom)
- [ ] Real Socket.io untuk CaseChat
- [ ] Integrasi WhatsApp Cloud API
- [ ] Integrasi Resend email
- [ ] Surface crawler: SerpAPI + portal berita Indonesia
- [ ] Dark web crawler: paste site monitoring via Tor
- [ ] Elasticsearch integration untuk full-text search
- [ ] PDF report generation (Puppeteer)
- [ ] File upload evidence ke Cloudflare R2

### v0.3.0 — Production Ready
- [ ] Integrasi model IndoBERT nyata (via HuggingFace)
- [ ] Twitter API v2 integration
- [ ] Dark web marketplace monitoring
- [ ] Billing & invoice generation
- [ ] Multi-tenant support (banyak klien)
- [ ] SLA monitoring & dashboard
- [ ] End-to-end encryption untuk CaseChat
- [ ] Audit logging untuk semua aksi sensitif
- [ ] GDPR/UU PDP compliance module

### v1.0.0 — Full Launch
- [ ] Mobile app (React Native)
- [ ] AI model fine-tuning dengan data Indonesia
- [ ] Integrasi DeHashed & IntelX breach APIs
- [ ] Automated takedown workflow
- [ ] Crisis playbook automation
- [ ] White-label untuk agensi PR

---

## ⚖️ Etika & Legal

### Prinsip Operasional

**OS Defender beroperasi sepenuhnya dalam kerangka hukum Indonesia dan internasional.**

1. **Defensive Only** — Platform ini hanya untuk *melindungi* reputasi klien yang terdaftar, bukan untuk menyerang pihak lain
2. **Consent-based** — Monitoring hanya dilakukan untuk identitas yang didaftarkan oleh pemiliknya sendiri atau perwakilan resminya
3. **Evidence Preservation** — Semua bukti disimpan dengan chain of custody yang terdokumentasi untuk keperluan hukum
4. **No Unauthorized Access** — Tidak ada aksi penetrasi, hacking, atau akses tidak sah ke sistem pihak lain
5. **Data Protection** — Tunduk pada UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)

### Batasan Layanan

> Layanan ini **TIDAK** dapat digunakan untuk:
> - Memata-matai individu tanpa consent
> - Mengumpulkan data orang lain tanpa izin
> - Tindakan doxxing, harrasment, atau intimidasi
> - Mengganggu operasional layanan/platform lain
> - Keperluan hukum tanpa basis yang sah

### Regulasi yang Relevan

| Regulasi | Cakupan |
|---|---|
| UU No. 27/2022 (UU PDP) | Perlindungan data pribadi di Indonesia |
| UU No. 11/2008 (ITE) | Informasi dan transaksi elektronik |
| UU No. 19/2016 (ITE Amendment) | Konten berbahaya dan takedown |
| GDPR (jika ada klien EU) | Perlindungan data warga EU |

---

*Dibuat dengan ❤️ untuk melindungi reputasi digital Indonesia.*
