import { DarkWebAlert } from "@/components/intelligence/DarkWebAlert";

const alerts = [
  { id: "a1", severity: "CRITICAL" as const, category: "credential_leak", description: "Email dan password klien terdeteksi dalam dump data yang dijual di dark web marketplace.", date: "2026-04-19" },
  { id: "a2", severity: "HIGH" as const, category: "surface_negative_spike", description: "Lonjakan mention negatif >100% dalam 2 jam terakhir di Twitter/X.", date: "2026-04-19" },
  { id: "a3", severity: "HIGH" as const, category: "news_negative", description: "Artikel opini negatif terbit di portal berita nasional dengan > 10.000 pembaca.", date: "2026-04-18" },
  { id: "a4", severity: "MEDIUM" as const, category: "forum_mention", description: "Mention baru ditemukan di forum dark web, tidak ada indikasi jual-beli data.", date: "2026-04-17" },
];

export default function AlertsPage() {
  const critical = alerts.filter((a) => a.severity === "CRITICAL");
  const others = alerts.filter((a) => a.severity !== "CRITICAL");

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Crisis Alerts</h1>
      <p className="mt-2 text-slate-600">Alert prioritas untuk tindakan segera.</p>

      {critical.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3">
            🚨 CRITICAL — Tindakan Segera
          </h2>
          <div className="space-y-3">
            {critical.map((a) => (
              <DarkWebAlert
                key={a.id}
                severity={a.severity}
                category={a.category}
                description={a.description}
                date={a.date}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mt-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          Lainnya
        </h2>
        <div className="space-y-3">
          {others.map((a) => (
            <DarkWebAlert
              key={a.id}
              severity={a.severity}
              category={a.category}
              description={a.description}
              date={a.date}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
