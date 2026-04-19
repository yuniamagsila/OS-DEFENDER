# Consultation Workflow

## Alur Pembukaan Kasus

```
Klien membuka kasus baru → Isi form (judul, prioritas, deskripsi)
        │
        ▼
Sistem membuat case_id + notifikasi ke konsultan
        │
        ▼
Konsultan menerima notifikasi (WhatsApp + Email)
        │
        ▼
Konsultan review kasus + assign ke diri sendiri atau tim
        │
        ▼
Chat real-time melalui CaseChat (WebSocket)
        │
        ▼
Strategi respons disepakati + timeline ditentukan
        │
        ▼
Eksekusi: takedown, counter-narrative, media response
        │
        ▼
Kasus ditutup + laporan akhir digenerate
```

## SLA (Service Level Agreement)

| Prioritas | Response Time | Resolution Target |
|---|---|---|
| CRITICAL | < 1 jam | < 24 jam |
| HIGH | < 3 jam | < 72 jam |
| MEDIUM | < 24 jam | < 7 hari |
| LOW | < 48 jam | < 14 hari |

## Komunikasi

- **CaseChat**: real-time chat via WebSocket (Socket.io) antara klien dan konsultan
- **Notifikasi**: WhatsApp untuk CRITICAL/HIGH, email untuk semua
- **Laporan**: PDF report digenerate otomatis saat kasus ditutup

## Billing

- Kasus CRITICAL & HIGH: tarif per-jam
- Kasus MEDIUM & LOW: tarif flat per kasus
- Invoice digenerate otomatis setelah kasus ditutup
