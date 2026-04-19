import { DarkWebAlert } from "@/components/intelligence/DarkWebAlert";
import { ThreatTimeline } from "@/components/intelligence/ThreatTimeline";

const findings = [
  { id: "dw01", severity: "CRITICAL" as const, category: "credential_leak", description: "Email dan password terdeteksi dalam dump data yang dijual di marketplace.", date: "2026-04-19" },
  { id: "dw02", severity: "HIGH" as const, category: "pii_exposure", description: "Nomor telepon klien ditemukan di paste site bersama data lainnya.", date: "2026-04-17" },
  { id: "dw03", severity: "MEDIUM" as const, category: "forum_discussion", description: "Pembahasan tentang klien ditemukan di forum dark web tanpa konteks jual-beli.", date: "2026-04-15" },
];

const timelineEvents = [
  { id: "t1", date: "2026-04-19", title: "Credential bocor terdeteksi di marketplace", severity: "CRITICAL" as const, source: "DW Marketplace" },
  { id: "t2", date: "2026-04-17", title: "PII ditemukan di paste site", severity: "HIGH" as const, source: "Paste Monitor" },
  { id: "t3", date: "2026-04-15", title: "Mention di forum dark web", severity: "MEDIUM" as const, source: "Forum Monitor" },
];

export default function DarkWebIntelligencePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Dark Web Intelligence</h1>
      <p className="mt-2 text-slate-600">
        Temuan dari operasi monitoring dark web (paste, marketplace, forum, breach).
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-3">
          {findings.map((f) => (
            <DarkWebAlert
              key={f.id}
              severity={f.severity}
              category={f.category}
              description={f.description}
              date={f.date}
            />
          ))}
        </div>
        <div>
          <ThreatTimeline events={timelineEvents} />
        </div>
      </div>
    </main>
  );
}
