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
    "source_type": 
