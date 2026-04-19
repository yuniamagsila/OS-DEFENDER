"use client";

import { useState } from "react";

const initialRequests = [
  { id: "td_01", target: "artikel-fitnah.com/2026/04/nama-brand", platform: "Website", status: "PENDING", filed: "2026-04-17" },
  { id: "td_02", target: "@account_fake di Twitter", platform: "Twitter/X", status: "APPROVED", filed: "2026-04-10" },
];

const statusBadge: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  COMPLETED: "bg-slate-100 text-slate-500",
};

const PLATFORMS = ["Website", "Twitter/X", "Facebook", "Instagram", "TikTok", "YouTube", "Google", "Kaskus", "Lainnya"];

export default function TakedownPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [showForm, setShowForm] = useState(false);
  const [target, setTarget] = useState("");
  const [platform, setPlatform] = useState("Website");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/takedown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, platform, notes }),
      });
      if (res.ok) {
        const data = await res.json() as { id: string; target: string; platform: string; status: string; createdAt: string };
        setRequests((prev) => [
          {
            id: data.id,
            target: data.target,
            platform: data.platform,
            status: data.status,
            filed: new Date(data.createdAt).toISOString().slice(0, 10),
          },
          ...prev,
        ]);
        setTarget("");
        setPlatform("Website");
        setNotes("");
        setShowForm(false);
      } else {
        const body = await res.json().catch(() => ({})) as { error?: string };
        setSubmitError(body.error ?? "Gagal mengajukan takedown.");
      }
    } catch {
      setSubmitError("Terjadi kesalahan. Periksa koneksi Anda.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Takedown Requests</h1>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          + Ajukan Takedown
        </button>
      </div>
      <p className="mt-2 text-slate-600">Kelola permintaan takedown konten berbahaya.</p>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Ajukan Takedown Baru</h2>
            <p className="mt-1 text-sm text-slate-500">
              Isi URL atau akun yang ingin ditakedown dan pilih platform.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">URL / Akun Target *</label>
                <input
                  type="text"
                  required
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                  placeholder="https://example.com/artikel atau @username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Platform *</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                >
                  {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Alasan / Catatan</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                  placeholder="Jelaskan alasan takedown dan bukti yang ada."
                />
              </div>
              {submitError && <p className="text-sm text-red-600">{submitError}</p>}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setSubmitError(""); }}
                  className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting || !target.trim()}
                  className="flex-1 rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white disabled:opacity-40"
                >
                  {submitting ? "Mengajukan…" : "Ajukan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request list */}
      <div className="mt-6 space-y-3">
        {requests.map((r) => (
          <article key={r.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium break-all">{r.target}</p>
              <span className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[r.status] ?? "bg-slate-100 text-slate-500"}`}>
                {r.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{r.platform} · Diajukan: {r.filed}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
