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
    "source_type": "dark_web_marketplace",
    "source_hash": "sha256:a3f1...",
    "data_types_found": ["email", "password_hash", "phone"],
    "risk_level": "CRITICAL"
  },
  "recommended_actions": [
    "Segera ganti password semua akun terkait email ini",
    "Aktifkan 2FA di semua platform penting",
    "Hubungi konsultan untuk assessment dampak lanjut"
  ],
  "consult_cta": {
    "text": "Buka Kasus Darurat",
    "url": "/cases/new?priority=emergency&alert_id=alrt_01j9xyz"
  },
  "created_at": "2026-04-19T14:23:00Z"
}
```

---

### `MOD-06` Action Recommendation Engine

Setiap ancaman yang terdeteksi menghasilkan rekomendasi tindakan yang diprioritaskan.

**Decision Tree Utama:**

```
Threat Detected
│
├── [Dark Web: Credential Leak]
│   ├── Aksi Mandiri: Panduan ganti password + 2FA
│   ├── Aksi Platform: Revoke sessions aktif
│   └── Ajukan Kasus: "Credential Breach Response"
│
├── [Dark Web: Data Pribadi Diperjualbelikan]
│   ├── Evidence preservation (otomatis)
│   ├── Ajukan Kasus: "Data Takedown + Legal Report"
│   └── Panduan laporan ke BSSN / Kominfo
│
├── [Surface: Review/Artikel Negatif]
│   ├── LOW   → Template respon profesional
│   ├── MEDIUM → Ajukan Kasus: "Respon Krisis"
│   └── HIGH   → Ajukan Kasus: "Crisis Management Full"
│
├── [Surface: Pencemaran Nama / Hoaks]
│   ├── Evidence capture (otomatis)
│   ├── Template klarifikasi publik
│   └── Ajukan Kasus: "Legal Takedown + Counter-Narrative"
│
└── [Surface: Data Bocor di Publik]
    ├── Identifikasi sumber
    ├── Panduan DMCA / takedown request
    └── Ajukan Kasus: "Data Removal Campaign"
```

Setiap rekomendasi memiliki tombol **"Dapatkan Bantuan Profesional"** yang langsung membuka form kasus baru dan meneruskan context ancaman ke konsultan kamu — klien tidak perlu menjelaskan ulang dari awal.

---

### `MOD-07` Consultation Service Bridge

Modul yang membedakan Reputation Shield dari semua tools sejenis — **jembatan langsung antara temuan otomatis dan jasa konsultasi manusiawi kamu**.

**Alur Lengkap:**

```
1. Klien Terima Alert
         │
         ▼
2. Klik "Buka Kasus" (auto-populated dengan context alert)
         │
         ▼
3. Klien Pilih Prioritas Layanan:
   ├── EMERGENCY → response < 2 jam
   ├── PRIORITY  → response < 24 jam
   └── STANDARD  → response < 3 hari
         │
         ▼
4. Case dibuat → Masuk ke Admin Panel kamu
         │
         ▼
5. Kamu (konsultan) terima notifikasi:
   WhatsApp + Email + Telegram
   Semua context tersedia: profile, alert, evidence, history
         │
         ▼
6. Real-time Case Chat (klien ↔ konsultan)
   File sharing, task list, status updates
         │
         ▼
7. Deliverables dari konsultan:
   Action plan, draft konten, template legal, laporan akhir
         │
         ▼
8. Kasus Selesai → Review & Rating klien
         │
         ▼
9. Report Otomatis Di-generate (PDF)
```

**Tipe Layanan Konsultasi (Konfigurasi oleh Kamu):**

| Kode | Layanan | Deskripsi | Contoh Harga |
|---|---|---|---|
| `SVC-001` | Crisis Response | Penanganan krisis reputasi aktif | Rp 2,5 Jt / sesi |
| `SVC-002` | Counter-Narrative | Strategi & eksekusi konten tandingan | Rp 1,5 Jt / campaign |
| `SVC-003` | Takedown Execution | Proses takedown konten / data | Rp 1 Jt / request |
| `SVC-004` | Legal Advisory | Panduan jalur hukum (UU ITE, PDP) | Rp 2 Jt / konsultasi |
| `SVC-005` | Data Breach Response | Respons insiden kebocoran data | Rp 3 Jt / insiden |
| `SVC-006` | Reputation Audit | Audit menyeluruh + roadmap recovery | Rp 1,5 Jt / audit |
| `SVC-007` | Ongoing Retainer | Pendampingan bulanan | Rp 5 Jt / bulan |

---

### `MOD-08` Evidence Management

Setiap temuan penting disimpan sebagai bukti digital yang terverifikasi.

**Proses:**
1. Screenshot otomatis saat konten terdeteksi (via Playwright)
2. Hash SHA-256 konten + timestamp (chain of custody)
3. Metadata tersimpan: URL, waktu crawl, user agent, IP crawler
4. File disimpan terenkripsi di Cloudflare R2
5. Evidence dapat di-export untuk keperluan hukum

**Format Evidence Package:**
```
evidence_package_[case_id]_[date].zip
├── screenshots/
│   └── [timestamp]_[source].png
├── raw_content/
│   └── [timestamp]_[source].html
├── metadata.json          # Hash + URL + timestamp semua file
└── chain_of_custody.pdf   # Dokumen chain of custody terverifikasi
```

---

### `MOD-09` Report Generator

**Jenis Laporan:**

| Tipe | Konten | Audience |
|---|---|---|
| **Executive Summary** | Score, top threats, rekomendasi | Klien (non-teknis) |
| **Intelligence Report** | Semua temuan + analisis | Klien + konsultan |
| **Dark Web Exposure Report** | Temuan dark web + remediation | Klien + legal team |
| **Case Closure Report** | Rangkuman kasus + deliverables | Klien |
| **Monthly Digest** | Tren bulanan + score history | Klien |

**Output:** PDF (via Puppeteer) + shareable secure link (expire 30 hari)
**Branding:** Header + footer dikustomisasi dengan nama agensi / konsultan kamu

---

## 🕸️ Dark Web Intelligence Layer

### Setup Tor Crawler (VPS Terpisah)

```bash
# Install Tor
sudo apt install tor

# Config /etc/tor/torrc
SocksPort 9050
ControlPort 9051
HashedControlPassword [generate: tor --hash-password yourpassword]

# Install Python dependencies
pip install stem requests[socks] beautifulsoup4 --break-system-packages

# Test koneksi Tor
curl --socks5 127.0.0.1:9050 https://check.torproject.org/api/ip
```

### Tor Session Manager (`tor_session.py`)

```python
import requests
import time
from stem import Signal
from stem.control import Controller

class TorSession:
    def __init__(self):
        self.session = self._new_session()

    def _new_session(self):
        session = requests.Session()
        session.proxies = {
            'http':  'socks5h://127.0.0.1:9050',
            'https': 'socks5h://127.0.0.1:9050',
        }
        session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/109.0'
        })
        return session

    def renew_circuit(self):
        """Rotate Tor circuit (new exit node IP)"""
        with Controller.from_port(port=9051) as ctrl:
            ctrl.authenticate(password="yourpassword")
            ctrl.signal(Signal.NEWNYM)
        time.sleep(5)
        self.session = self._new_session()

    def get(self, url, **kwargs):
        try:
            return self.session.get(url, timeout=30, **kwargs)
        except Exception:
            self.renew_circuit()
            return self.session.get(url, timeout=30, **kwargs)
```

### PII Detector (`pii_detector.py`)

```python
import re
from dataclasses import dataclass
from typing import List

@dataclass
class PIIFinding:
    type: str        # email, phone, nik, name_match
    value: str       # nilai yang ditemukan
    masked: str      # versi masked: em***@domain.com
    confidence: float

class PIIDetector:
    def __init__(self, identity_profile: dict):
        self.profile = identity_profile
        self.patterns = {
            'email':    r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
            'phone_id': r'(\+62|62|0)[8][0-9]{8,11}',
            'nik':      r'\b[0-9]{16}\b',
        }

    def scan(self, text: str) -> List[PIIFinding]:
        findings = []
        for pii_type, pattern in self.patterns.items():
            for match in re.finditer(pattern, text):
                val = match.group()
                if self._matches_profile(pii_type, val):
                    findings.append(PIIFinding(
                        type=pii_type,
                        value=val,
                        masked=self._mask(val),
                        confidence=0.95
                    ))
        for name in self.profile.get('aliases', []):
            if name.lower() in text.lower():
                findings.append(PIIFinding(
                    type='name_match',
                    value=name,
                    masked=name,
                    confidence=0.80
                ))
        return findings

    def _matches_profile(self, pii_type: str, value: str) -> bool:
        ids = self.profile.get('identifiers', {})
        if pii_type == 'email':
            return value in ids.get('emails', [])
        if pii_type == 'phone_id':
            return any(value.endswith(p[-8:]) for p in ids.get('phones', []))
        return False

    def _mask(self, value: str) -> str:
        if '@' in value:
            user, domain = value.split('@', 1)
            return f"{user[:2]}***@{domain}"
        return value[:3] + '***' + value[-2:]
```

---

## 🤝 Consultation Service Bridge

### Admin Panel (Untuk Konsultan / Kamu)

Konsultan mengakses `/admin` dengan role `CONSULTANT` atau `ADMIN`.

**Fitur Admin Panel:**
- **Case Inbox** — Semua kasus baru masuk, sorted by priority + SLA timer
- **Client Intelligence View** — Full profile + semua temuan klien
- **Case Management** — Update status, assign task, add internal notes
- **Case Chat** — Real-time chat dengan klien per kasus + file sharing
- **Deliverable Upload** — Upload action plan, dokumen, laporan ke kasus
- **SLA Tracker** — Monitor response time vs target SLA
- **Revenue Dashboard** — Total kasus, revenue, rata-rata rating
- **Notification Config** — Atur kapan dan bagaimana kamu dinotifikasi

### Case Lifecycle

```
CREATED       → Klien buka kasus baru (dari alert atau manual)
PENDING       → Menunggu konsultan acknowledge (SLA timer mulai)
IN_REVIEW     → Konsultan sedang mempelajari kasus
IN_PROGRESS   → Eksekusi layanan aktif
PENDING_CLIENT → Menunggu feedback / approval dari klien
RESOLVED      → Kasus selesai + report digenerate otomatis
CLOSED        → Klien konfirmasi selesai + rating diberikan
```

---

## 🚀 Setup & Instalasi

### Prerequisites

```bash
Node.js       >= 18.x
Python        >= 3.11
PostgreSQL    >= 16
Redis         >= 7
Elasticsearch >= 8.x
pnpm          >= 8.x
Tor           >= 0.4.x  # Untuk dark web crawler — VPS terpisah
```

### 1. Clone & Install

```bash
git clone https://github.com/your-org/reputation-shield.git
cd reputation-shield

pnpm install

cd apps/ai-service && pip install -r requirements.txt --break-system-packages
cd ../surface-crawler && pip install -r requirements.txt --break-system-packages
cd ../darkweb-crawler && pip install -r requirements.txt --break-system-packages
```

### 2. Setup Database

```bash
createdb reputation_shield_dev

cp apps/web/.env.example apps/web/.env.local
# Edit .env.local sesuai environment kamu

cd apps/web
pnpm prisma migrate dev --name init
pnpm prisma db seed
```

### 3. Setup Elasticsearch

```bash
docker run -d \
  --name elasticsearch \
  -p 9200:9200 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.12.0

# Buat index schema
curl -X PUT "localhost:9200/mentions" \
  -H "Content-Type: application/json" \
  -d @infra/elasticsearch/mentions_mapping.json
```

### 4. Jalankan dengan Docker (Direkomendasikan)

```bash
# Semua services kecuali dark web crawler
docker-compose up -d

docker-compose ps
docker-compose logs -f web
```

### 5. Jalankan Manual (Development)

```bash
# T1: Next.js
cd apps/web && pnpm dev

# T2: AI Service
cd apps/ai-service && uvicorn main:app --reload --port 8001

# T3: Surface Crawler Worker
cd apps/surface-crawler && python main.py

# T4: Redis (jika tidak pakai Docker)
redis-server

# Dark web crawler → jalankan di VPS terpisah saja
```

**URLs:**
- Web App: `http://localhost:3000`
- AI Service + Docs: `http://localhost:8001/docs`
- Elasticsearch: `http://localhost:9200`

---

## 🔐 Environment Variables

### `apps/web/.env.local`

```env
# ── Database ──────────────────────────────────────────
DATABASE_URL="postgresql://user:pass@localhost:5432/reputation_shield_dev"
REDIS_URL="redis://localhost:6379"
ELASTICSEARCH_URL="http://localhost:9200"

# ── Auth ──────────────────────────────────────────────
NEXTAUTH_SECRET="min-32-chars-random-string"
NEXTAUTH_URL="http://localhost:3000"

# ── Internal Services ─────────────────────────────────
AI_SERVICE_URL="http://localhost:8001"
AI_SERVICE_KEY="internal-service-secret"
SURFACE_CRAWLER_URL="http://localhost:8002"
DARKWEB_CRAWLER_URL="http://darkweb-vps-ip:8003"   # VPS terpisah
DARKWEB_CRAWLER_KEY="darkweb-internal-secret"

# ── Notifications ─────────────────────────────────────
RESEND_API_KEY="re_xxxx"
EMAIL_FROM="noreply@reputationshield.id"
EMAIL_CONSULTANT="kamu@domain.com"

WA_PHONE_NUMBER_ID="your-phone-number-id"
WA_ACCESS_TOKEN="your-wa-access-token"
WA_CONSULTANT_NUMBER="628xxxxxxxxxx"

TELEGRAM_BOT_TOKEN="your-bot-token"
TELEGRAM_CONSULTANT_CHAT_ID="your-chat-id"

# ── External Intelligence APIs ────────────────────────
SERPAPI_KEY="your-serpapi-key"
BING_SEARCH_KEY="your-bing-key"
YOUTUBE_API_KEY="your-youtube-key"

INTELX_API_KEY="your-intelligence-x-key"
DEHASHED_API_KEY="your-dehashed-key"
HIBP_API_KEY="your-hibp-key"

# ── Storage ───────────────────────────────────────────
S3_BUCKET="reputation-shield-evidence"
S3_ACCESS_KEY_ID="your-key"
S3_SECRET_ACCESS_KEY="your-secret"
S3_ENDPOINT_URL="https://xxx.r2.cloudflarestorage.com"
S3_PUBLIC_URL="https://cdn.reputationshield.id"

# ── Consultation SLA Config ───────────────────────────
CONSULT_SLA_EMERGENCY_HOURS=2
CONSULT_SLA_PRIORITY_HOURS=24
CONSULT_SLA_STANDARD_HOURS=72

# ── App Config ────────────────────────────────────────
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ENCRYPTION_KEY="32-char-key-for-aes-256-gcm"
```

### `apps/darkweb-crawler/.env`

```env
CORE_API_URL="https://api.reputationshield.id"
CORE_API_KEY="darkweb-internal-secret"

TOR_SOCKS_PORT=9050
TOR_CONTROL_PORT=9051
TOR_CONTROL_PASSWORD="your-tor-password"

INTELX_API_KEY="your-key"
DEHASHED_API_KEY="your-key"

PAYLOAD_ENCRYPTION_KEY="32-char-aes-key"

SCAN_INTERVAL_MINUTES=360
MAX_CONCURRENT_CIRCUITS=3
EVIDENCE_RETENTION_DAYS=90
```

---

## 📡 API Reference

### Authentication

```
Authorization: Bearer <jwt_token>
X-API-Version: 2
```

---

### Identity Profile Endpoints

#### `POST /api/profiles`
Buat Identity Profile baru.

```json
// Request
{
  "type": "individual",
  "display_name": "Budi Santoso",
  "aliases": ["Budi S", "BudiSantoso88"],
  "identifiers": {
    "emails": ["budi@email.com"],
    "phones": ["+6281234567890"],
    "usernames": ["budi_s88"],
    "domains": ["budicompany.co.id"]
  },
  "industry": "finance",
  "monitoring_config": {
    "platforms": ["web", "news", "forum", "social", "darkweb"],
    "languages": ["id", "en"],
    "alert_threshold": "MEDIUM"
  }
}

// Response
{
  "id": "prof_01j9abc",
  "status": "active",
  "monitoring_started_at": "2026-04-19T10:00:00Z"
}
```

---

### Intelligence Endpoints

#### `GET /api/intelligence/surface`

**Query Params:** `profile_id`, `sentiment`, `risk_level`, `platform`, `from`, `to`, `page`, `q`

#### `GET /api/intelligence/darkweb`

**Query Params:** `profile_id`, `category`, `severity`, `from`, `to`

**Response (Dark Web Finding):**
```json
{
  "id": "dw_01j9xyz",
  "profile_id": "prof_01j9abc",
  "category": "credential_leak",
  "severity": "HIGH",
  "summary": "Email dan password hash ditemukan dalam database breach",
  "details": {
    "source_type": "breach_database",
    "data_types": ["email", "password_hash", "username"],
    "breach_date_estimate": "2025-11"
  },
  "evidence": {
    "hash": "sha256:a3f1c2...",
    "captured_at": "2026-04-19T08:30:00Z",
    "file_url": null
  },
  "recommended_actions": ["change_password", "enable_2fa", "open_case"],
  "detected_at": "2026-04-19T08:30:00Z",
  "is_acknowledged": false
}
```

---

### Case Management Endpoints

#### `POST /api/cases`

```json
// Request
{
  "profile_id": "prof_01j9abc",
  "service_code": "SVC-005",
  "priority": "emergency",
  "title": "Respons Kebocoran Kredensial Dark Web",
  "description": "Perlu bantuan segera untuk menangani temuan dark web.",
  "related_alert_ids": ["alrt_01j9xyz"]
}

// Response
{
  "case_id": "case_01j9def",
  "status": "PENDING",
  "priority": "emergency",
  "sla_deadline": "2026-04-19T16:23:00Z",
  "consultant_notified": true,
  "estimated_response": "< 2 jam"
}
```

#### `GET /api/cases/:id` — Detail kasus + pesan + deliverables
#### `POST /api/cases/:id/messages` — Kirim pesan dalam kasus
#### `POST /api/cases/:id/resolve` — Tandai selesai (konsultan/admin only)

---

### Takedown Endpoints

#### `POST /api/takedown/requests`

```json
{
  "profile_id": "prof_01j9abc",
  "target_url": "https://example.com/problematic-content",
  "content_type": "defamation",
  "platform": "website",
  "legal_basis": "UU_ITE_27",
  "evidence_ids": ["ev_01j9abc"],
  "notes": "Artikel mencantumkan data pribadi tanpa izin"
}
```

---

## 🗄️ Database Schema

```prisma
model User {
  id            String            @id @default(cuid())
  email         String            @unique
  name          String
  role          Role              @default(CLIENT)
  plan          Plan              @default(STARTER)
  profiles      IdentityProfile[]
  cases         Case[]            @relation("ClientCases")
  managedCases  Case[]            @relation("ConsultantCases")
  createdAt     DateTime          @default(now())
}

model IdentityProfile {
  id              String           @id @default(cuid())
  userId          String
  user            User             @relation(fields: [userId], references: [id])
  type            ProfileType
  displayName     String
  aliases         String[]
  identifiers     Json             // { emails[], phones[], usernames[], domains[] }
  industry        String?
  monitoringConfig Json
  reputationScore Int              @default(100)
  scoreHistory    Json             @default("[]")
  isActive        Boolean          @default(true)
  surfaceMentions SurfaceMention[]
  darkWebFindings DarkWebFinding[]
  alerts          Alert[]
  cases           Case[]
  createdAt       DateTime         @default(now())
  @@index([userId])
}

model SurfaceMention {
  id             String          @id @default(cuid())
  profileId      String
  profile        IdentityProfile @relation(fields: [profileId], references: [id])
  url            String
  title          String
  snippet        String?
  platform       String
  sentiment      Sentiment
  riskLevel      RiskLevel
  confidence     Float
  flaggedWords   String[]
  reachEstimate  Int?
  evidenceUrl    String?
  evidenceHash   String?
  publishedAt    DateTime?
  crawledAt      DateTime        @default(now())
  isAcknowledged Boolean         @default(false)
  @@index([profileId, riskLevel])
  @@index([crawledAt])
}

model DarkWebFinding {
  id             String          @id @default(cuid())
  profileId      String
  profile        IdentityProfile @relation(fields: [profileId], references: [id])
  category       DarkWebCategory
  severity       Severity
  summary        String
  details        Json
  evidenceHash   String
  piiTypesFound  String[]
  isAcknowledged Boolean         @default(false)
  detectedAt     DateTime        @default(now())
  relatedAlerts  Alert[]
  @@index([profileId, severity])
}

model Alert {
  id               String          @id @default(cuid())
  profileId        String
  profile          IdentityProfile @relation(fields: [profileId], references: [id])
  severity         Severity
  category         String
  title            String
  summary          String
  payload          Json
  darkWebFindingId String?
  darkWebFinding   DarkWebFinding? @relation(fields: [darkWebFindingId], references: [id])
  status           AlertStatus     @default(ACTIVE)
  notifiedAt       DateTime?
  acknowledgedAt   DateTime?
  relatedCases     Case[]
  createdAt        DateTime        @default(now())
  @@index([profileId, status])
}

model Case {
  id            String          @id @default(cuid())
  profileId     String
  profile       IdentityProfile @relation(fields: [profileId], references: [id])
  clientId      String
  client        User            @relation("ClientCases", fields: [clientId], references: [id])
  consultantId  String?
  consultant    User?           @relation("ConsultantCases", fields: [consultantId], references: [id])
  serviceCode   String
  priority      CasePriority
  title         String
  description   String
  status        CaseStatus      @default(CREATED)
  slaDeadline   DateTime?
  resolvedAt    DateTime?
  closedAt      DateTime?
  clientRating  Int?
  clientReview  String?
  relatedAlerts Alert[]
  messages      CaseMessage[]
  deliverables  CaseDeliverable[]
  createdAt     DateTime        @default(now())
  @@index([clientId])
  @@index([consultantId, status])
}

model CaseMessage {
  id          String      @id @default(cuid())
  caseId      String
  case        Case        @relation(fields: [caseId], references: [id])
  senderId    String
  role        MessageRole
  content     String
  attachments Json?
  createdAt   DateTime    @default(now())
  @@index([caseId])
}

model CaseDeliverable {
  id         String   @id @default(cuid())
  caseId     String
  case       Case     @relation(fields: [caseId], references: [id])
  name       String
  type       String   // action_plan, draft_content, legal_template, report
  fileUrl    String
  uploadedAt DateTime @default(now())
}

model TakedownRequest {
  id          String         @id @default(cuid())
  profileId   String
  targetUrl   String
  contentType String
  platform    String
  legalBasis  String
  evidenceIds String[]
  status      TakedownStatus @default(SUBMITTED)
  notes       String?
  submittedAt DateTime       @default(now())
  resolvedAt  DateTime?
}

enum Role            { CLIENT CONSULTANT ADMIN }
enum Plan            { STARTER PROFESSIONAL ENTERPRISE }
enum ProfileType     { INDIVIDUAL AGENCY BRAND }
enum Sentiment       { POSITIVE NEUTRAL NEGATIVE }
enum RiskLevel       { LOW MEDIUM HIGH CRITICAL }
enum Severity        { LOW MEDIUM HIGH CRITICAL }
enum AlertStatus     { ACTIVE ACKNOWLEDGED RESOLVED }
enum CasePriority    { STANDARD PRIORITY EMERGENCY }
enum CaseStatus      { CREATED PENDING IN_REVIEW IN_PROGRESS PENDING_CLIENT RESOLVED CLOSED }
enum MessageRole     { CLIENT CONSULTANT SYSTEM }
enum TakedownStatus  { SUBMITTED IN_PROGRESS COMPLETED REJECTED }
enum DarkWebCategory { CREDENTIAL_LEAK PII_EXPOSURE MARKETPLACE_LISTING FORUM_MENTION PASTE_DUMP }
```

---

## 🔄 Alur Kerja Sistem

```
User Daftar & Buat Identity Profile
            │
            ▼
Scheduler (BullMQ + Redis)
  ├── Surface Crawl Job  → setiap 6 jam per profile
  └── Dark Web Scan Job  → setiap 24 jam per profile
            │
    ┌───────┴───────┐
    ▼               ▼
Surface Crawler   Dark Web Crawler (VPS Tor)
    │               │
    ▼               ▼
Content Extracted  PII Detection + Evidence Hash
    └───────┬───────┘
            ▼
      AI Service (FastAPI)
      Sentiment · Risk Score · NER · Recommendation
            │
            ▼
     PostgreSQL + Elasticsearch
            │
            ▼
     Alert Engine
     Cek threshold → Create Alert → Score Recalculation
            │
            ▼
     Notification Dispatcher
     Email · WhatsApp · Telegram · WebSocket
            │
            ▼
     Klien Lihat Alert di Dashboard
     Acknowledge → Baca Rekomendasi → "Dapatkan Bantuan Profesional"
            │
            ▼
     Case Dibuat → Admin Panel (Konsultan Kamu)
     Notifikasi → Full Context → Chat → Deliverables → Resolved
            │
            ▼
     PDF Report Otomatis → Arsip Klien
```

---

## 🔒 Keamanan & Privasi

### Enkripsi Data

| Data | Enkripsi |
|---|---|
| Password | bcrypt (cost 12) |
| Data identitas (email, HP, NIK) | AES-256-GCM field-level |
| Dark web findings payload | AES-256-GCM sebelum disimpan |
| Transfer dari dark web VPS | TLS 1.3 + payload encryption |
| Evidence files di R2 | Server-side encryption |
| Session token | JWT RS256, expire 24 jam |

### Isolasi Dark Web Crawler

- VPS **terpisah** dari infrastruktur utama, tidak ada koneksi masuk
- IP asli tidak pernah terekspos ke dark web (selalu via Tor)
- Log dirotasi otomatis setiap 7 hari
- Raw dark web URLs tidak pernah masuk ke database utama — hanya hash + metadata

### Rate Limiting

| Endpoint | Limit |
|---|---|
| Public | 20 req/menit per IP |
| Authenticated | 100 req/menit per user |
| Dark web manual scan | 1 scan/hari per profile |
| Report generation | 5 laporan/hari per user |

### RBAC

| Resource | CLIENT | CONSULTANT | ADMIN |
|---|---|---|---|
| Profile sendiri | CRUD | Read | CRUD |
| Intelligence findings | Read | Read | CRUD |
| Cases sendiri | CRU | CRUD | CRUD |
| Cases semua klien | ✗ | R/W | CRUD |
| Admin panel | ✗ | ✓ | ✓ |
| Raw dark web data | ✗ | Summary | Full |

---

## 🧪 Testing

```bash
# Frontend + API (Jest + RTL)
cd apps/web && pnpm test && pnpm test:integration

# AI Service (pytest)
cd apps/ai-service && pytest tests/ -v --cov=. --cov-report=html

# Surface Crawler
cd apps/surface-crawler && pytest tests/ -v

# Dark Web Crawler (no live Tor tests di CI)
cd apps/darkweb-crawler && pytest tests/ -v -m "not live"
```

**Target Coverage:** Core API ≥ 85% · AI Service ≥ 90% · Crawlers ≥ 75%

**Pre-Merge Checklist:**
- [ ] `pnpm typecheck` — zero errors
- [ ] `pnpm lint` — zero warnings
- [ ] Semua unit tests passing
- [ ] Manual: buat profile → crawl → lihat dashboard
- [ ] Manual: dark web finding → alert → buka kasus → chat → resolve
- [ ] Manual: generate & download PDF report

---

## 🚢 Deployment

### Stack Produksi

| Service | Platform | Notes |
|---|---|---|
| Web App + Core API | Vercel | Auto-deploy dari `main` |
| AI Service | Railway | `apps/ai-service` |
| Surface Crawler | Railway | `apps/surface-crawler` |
| Dark Web Crawler | VPS (DO/Vultr) | **Isolated, manual deploy** |
| PostgreSQL | Railway / Supabase | |
| Redis | Upstash | Serverless |
| Elasticsearch | Elastic Cloud | Managed |
| File Storage | Cloudflare R2 | |

### Deploy Dark Web Crawler (VPS)

```bash
sudo apt update && sudo apt install tor python3.11 python3-pip -y

scp -r apps/darkweb-crawler user@vps-ip:/app/darkweb-crawler

cd /app/darkweb-crawler
pip install -r requirements.txt --break-system-packages
cp .env.example .env && nano .env

sudo cp infra/darkweb-crawler.service /etc/systemd/system/
sudo systemctl enable darkweb-crawler
sudo systemctl start darkweb-crawler
```

> Dark web crawler tidak pernah di-deploy via CI/CD otomatis — selalu manual dan intentional.

---

## 🗺️ Roadmap

### v0.1.0 — Foundation (Bulan 1–2)
- [ ] Auth system + Identity Profile management
- [ ] Surface web crawler (SERP + news)
- [ ] Sentiment analysis dasar (IndoBERT)
- [ ] Dashboard + reputation score
- [ ] Email alert system
- [ ] Case management dasar + real-time chat

### v0.2.0 — Intelligence (Bulan 3)
- [ ] Dark web crawler (Tor + paste sites + breach APIs)
- [ ] PII detector + evidence management
- [ ] WhatsApp + Telegram alerts
- [ ] Admin panel konsultan (full case management)

### v0.3.0 — Power Features (Bulan 4)
- [ ] Elasticsearch full-text search + exposure map
- [ ] PDF report generator (Puppeteer)
- [ ] Takedown request manager
- [ ] Action recommendation engine penuh
- [ ] SLA tracker + revenue dashboard

### v1.0.0 — Production (Bulan 5–6)
- [ ] Subscription billing (Midtrans)
- [ ] Multi-profile support (paket agensi)
- [ ] White-label reports
- [ ] Mobile PWA
- [ ] Penetration testing + security audit
- [ ] Full test coverage ≥ 80%

---

## ⚖️ Etika & Legal

Tools ini dirancang **khusus** untuk:
- Melindungi reputasi diri sendiri atau klien yang memberikan izin eksplisit
- Tujuan defensif: deteksi, respons, dan pemulihan reputasi

**Dilarang keras:**
- Memantau identitas pihak lain tanpa izin
- Menggunakan dark web crawler untuk tujuan ofensif
- Menyimpan atau menyebarkan data pihak lain tanpa dasar hukum

**Regulasi yang dipatuhi:**

| Regulasi | Relevansi |
|---|---|
| UU ITE No. 19/2016 | Konten, komunikasi elektronik, privasi |
| UU PDP No. 27/2022 | Perlindungan dan pemrosesan data pribadi |
| PP No. 71/2019 | Penyelenggaraan sistem elektronik |

**Dark web crawler** hanya beroperasi secara pasif — mendeteksi data yang sudah tersebar, tidak berinteraksi dengan pelaku kejahatan, tidak melakukan transaksi apapun.

---

<div align="center">

**Reputation Shield** — Personal Intelligence Platform
*Monitor. Detect. Defend.*

© 2026 Nafal Faturizki · Hak Cipta Dilindungi · Proprietary License

[Dokumentasi](./docs) · [API Reference](./docs/api.md) · [Security Guide](./docs/security.md)

</div>
