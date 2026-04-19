import { CaseChat } from "@/components/cases/CaseChat";
import { CaseStatus } from "@/components/cases/CaseStatus";

type CaseDetailPageProps = { params: Promise<{ id: string }> };

const messages = [
  {
    id: "msg_01",
    senderRole: "CONSULTANT" as const,
    senderName: "Andi — Konsultan",
    body: "Kami sudah menerima laporan Anda. Sedang menyiapkan strategi respons awal dalam 1 jam.",
    createdAt: "2026-04-19T10:00:00Z",
  },
  {
    id: "msg_02",
    senderRole: "CLIENT" as const,
    senderName: "Budi Santoso",
    body: "Terima kasih, tolong prioritaskan kanal Twitter dan berita nasional.",
    createdAt: "2026-04-19T10:15:00Z",
  },
  {
    id: "msg_03",
    senderRole: "CONSULTANT" as const,
    senderName: "Andi — Konsultan",
    body: "Siap. Kami sudah kontak editor dua portal berita. Update dalam 2 jam.",
    createdAt: "2026-04-19T10:20:00Z",
  },
];

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Detail Kasus</h1>
          <p className="mt-1 text-xs text-slate-400">ID: {id}</p>
        </div>
        <CaseStatus status="IN_PROGRESS" />
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-semibold">Krisis reputasi viral di Twitter</h2>
        <p className="mt-2 text-sm text-slate-600">
          Terjadi lonjakan mention negatif lebih dari 300% dalam 4 jam. Diperlukan strategi
          counter-narrative segera oleh tim PR.
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
          {[
            ["Prioritas", "HIGH"],
            ["Dibuka", "2026-04-18"],
            ["SLA Respons", "< 3 jam"],
            ["Konsultan", "Andi Wijaya"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-slate-400">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-semibold">Komunikasi dengan Konsultan</h2>
        <CaseChat caseId={id} initialMessages={messages} currentRole="CLIENT" />
      </section>
    </main>
  );
}
