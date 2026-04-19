# Security Hardening Guide

## Authentication

- Gunakan JWT dengan expiry pendek (15 menit access token, 7 hari refresh token)
- Simpan refresh token di httpOnly cookie, bukan localStorage
- Implementasikan RBAC: CLIENT, CONSULTANT, ADMIN

## Data Protection

- NIK/NPWP: enkripsi AES-256 sebelum disimpan ke database
- Password: bcrypt dengan salt rounds ≥ 12
- Dark web findings: transfer ke core API menggunakan TLS + payload encryption

## API Security

- Rate limiting: 100 req/menit per IP untuk endpoint publik
- CORS: hanya izinkan origin yang diketahui
- Input validation: validasi semua input dengan Zod (TypeScript) atau Pydantic (Python)
- SQL injection: selalu gunakan Prisma ORM, jangan raw query tanpa parameterisasi

## Infrastructure

- Jalankan dark web crawler di VPS terisolasi (tidak terhubung ke infrastruktur utama)
- Gunakan Cloudflare sebagai CDN + DDoS protection
- Log semua akses ke Sentry
- Rotasi secret setiap 90 hari

## Incident Response

1. Deteksi breach → alert CRITICAL ke semua channel
2. Revoke semua token aktif klien terkait
3. Buka case darurat ke tim konsultan
4. Notifikasi klien dalam 1 jam
