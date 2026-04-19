# Dark Web Operations Guide

> ⚠️ Modul ini sensitif. Selalu jalankan crawler di VPS terisolasi dengan Tor. Jangan pernah menjalankan dari mesin development utama.

## Arsitektur Keamanan

```
darkweb-crawler (VPS Terisolasi)
    │
    ├── Tor Daemon (port 9050/9051)
    ├── Python Crawler + httpx SOCKS5
    └── Encrypted Transfer → Core API
```

## Setup Tor

1. Install Tor: `apt install tor`
2. Copy `tor_client/torrc.template` ke `/etc/tor/torrc`
3. Sesuaikan `CookieAuthentication` dan path cookie
4. Restart: `systemctl restart tor`

## Konfigurasi Environment

```env
TOR_SOCKS_PROXY=socks5://127.0.0.1:9050
TOR_CONTROL_HOST=127.0.0.1
TOR_CONTROL_PORT=9051
BREACH_API_KEY=your_intelx_or_dehashed_key
CORE_API_URL=https://your-core-api.com
CORE_API_SECRET=your_aes256_secret
```

## Rotasi Circuit

Crawler memanggil `circuit_rotation.py` setelah setiap sesi crawl untuk menjaga anonimitas. Pastikan `ControlPort` aktif dan `CookieAuthentication` dikonfigurasi dengan benar.

## Chain of Custody

Semua temuan di-hash menggunakan SHA-256 sebelum dikirim ke core API:

```python
from processors.evidence_hasher import create_evidence_record
record = create_evidence_record(content, source_url)
# record.sha256, record.captured_at, record.source_url
```

## Keamanan Operasional

- Jangan simpan konten dark web mentah lebih dari 7 hari
- Semua transfer ke core API menggunakan AES-256
- Log operasional dirotasi setiap 7 hari
- IP asli tidak pernah terekspos ke dark web
