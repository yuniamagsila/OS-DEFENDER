import Link from "next/link";

const features = [
  {
    icon: "🔍",
    title: "Surface Web Intelligence",
    description:
      "Monitor narasi di Google, portal berita, Kaskus, Twitter, dan TikTok secara otomatis setiap 1–6 jam.",
  },
  {
    icon: "🕸️",
    title: "Dark Web Intelligence",
    description:
      "Deteksi bocornya kredensial, data pribadi, atau penjualan data di dark web via Tor — sebelum jadi krisis.",
  },
  {
    icon: "📊",
    title: "Reputation Scoring",
    description:
      "Satu angka 0–100 yang merepresentasikan kondisi reputasi digital Anda saat ini, diperbarui real-time.",
  },
  {
    icon: "🚨",
    title: "Crisis Alert System",
    description:
      "Notifikasi instan via WhatsApp, Email, dan Telegram ketika ada ancaman baru dengan severity CRITICAL atau HIGH.",
  },
  {
    icon: "💼",
    title: "Consultation Service",
    description:
      "Buka kasus langsung ke konsultan PR defensif kami. Chat real-time, SLA terukur, laporan terstruktur.",
  },
  {
    icon: "📋",
    title: "Takedown Management",
    description:
      "Ajukan dan pantau permintaan takedown konten berbahaya ke platform dan regulator.",
  },
];

const stats = [
  { value: "6 jam", label: "Frekuensi scan surface" },
  { value: "24 jam", label: "Frekuensi scan dark web" },
  { value: "< 5 mnt", label: "Alert CRITICAL dikirim" },
  { value: "0–100", label: "Skala reputation score" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-sm">
        <span className="text-lg font-bold">🛡️ OS Defender</span>
        <div className="flex gap-4">
          <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900">
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Mulai Gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Monitor. Deteksi. <span className="text-slate-500">Defend.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Platform intelijen reputasi pribadi — memantau narasi publik, dark web,
          dan ancaman digital, sekaligus terhubung langsung ke jasa konsultasi PR defensif
          profesional.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/register"
            className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Mulai Sekarang
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold hover:border-slate-300"
          >
            Lihat Demo →
          </Link>
        </div>
      </header>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="mt-1 text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold">Semua yang Anda Butuhkan</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-2xl">{f.icon}</p>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-16 text-center text-white">
        <h2 className="text-2xl font-bold">Siap Lindungi Reputasi Anda?</h2>
        <p className="mt-3 text-slate-400">
          Deteksi ancaman lebih awal. Respons lebih cepat. Dengan bantuan konsultan nyata.
        </p>
        <Link
          href="/register"
          className="mt-8 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-slate-900 hover:bg-slate-100"
        >
          Daftar Sekarang — Gratis
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-400">
        © 2026 OS Defender · Personal Reputation Intelligence Platform
      </footer>
    </div>
  );
}
