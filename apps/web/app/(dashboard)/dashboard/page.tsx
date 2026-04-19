import { ReputationScoreCard } from "@/components/dashboard/ReputationScoreCard";

const profile = {
  name: "Budi Santoso",
  score: 78,
  status: "Waspada",
};

const summaryCards = [
  { label: "Open Alerts", value: "3", sub: "1 CRITICAL · 2 HIGH" },
  { label: "Active Cases", value: "2", sub: "1 CRITICAL · 1 HIGH" },
  { label: "Surface Mentions", value: "14", sub: "Seminggu terakhir" },
];

const recentAlerts = [
  { id: "a1", title: "Kredensial bocor di dark web", severity: "CRITICAL", time: "2 jam lalu" },
  { id: "a2", title: "Lonjakan mention negatif >100%", severity: "HIGH", time: "4 jam lalu" },
  { id: "a3", title: "Artikel opini negatif di Kompas", severity: "HIGH", time: "6 jam lalu" },
];

const severityDot: Record<string, string> = {
  CRITICAL: "bg-red-500",
  HIGH: "bg-orange-400",
  MEDIUM: "bg-yellow-400",
  LOW: "bg-slate-300",
};

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-slate-500">Selamat datang, {profile.name}</p>
        </div>
        <p className="text-xs text-slate-400">Diperbarui: {new Date().toLocaleString("id-ID")}</p>
      </div>

      {/* Score + stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <ReputationScoreCard score={profile.score} status={profile.status} />
        {summaryCards.map((card) => (
          <article key={card.label} className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold">{card.value}</p>
            <p className="mt-1 text-xs text-slate-400">{card.sub}</p>
          </article>
        ))}
      </div>

      {/* Recent alerts */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Alert Terbaru</h2>
          <a href="/alerts" className="text-xs text-slate-500 underline hover:text-slate-700">
            Lihat semua →
          </a>
        </div>
        <div className="mt-3 space-y-2">
          {recentAlerts.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className={`size-2.5 rounded-full ${severityDot[a.severity]}`} />
                <p className="text-sm font-medium">{a.title}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-600">{a.severity}</span>
                <span>{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
