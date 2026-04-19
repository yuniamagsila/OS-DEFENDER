"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Step 1 — Personal identity
  const [fullName, setFullName] = useState("");
  const [alias, setAlias] = useState("");
  const [profession, setProfession] = useState("");
  const [industry, setIndustry] = useState("");

  // Step 2 — Digital identifiers
  const [emails, setEmails] = useState("");
  const [phones, setPhones] = useState("");
  const [usernames, setUsernames] = useState("");
  const [domains, setDomains] = useState("");

  // Step 3 — Monitoring config (read-only summary)
  const splitLines = (s: string) =>
    s.split(/[\n,]+/).map((x) => x.trim()).filter(Boolean);

  async function finish() {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          alias: alias || undefined,
          profession: profession || undefined,
          industry: industry || undefined,
          emails: splitLines(emails),
          phones: splitLines(phones),
          usernames: splitLines(usernames),
          domains: splitLines(domains),
        }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        const body = await res.json().catch(() => ({})) as { error?: string };
        setError(body.error ?? "Gagal menyimpan profil. Coba lagi.");
      }
    } catch {
      setError("Terjadi kesalahan. Periksa koneksi Anda.");
    } finally {
      setSubmitting(false);
    }
  }

  const steps = [
    { id: 1, label: "Nama & Identitas" },
    { id: 2, label: "Identifier Digital" },
    { id: 3, label: "Konfirmasi & Simpan" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm">
        {/* Progress steps */}
        <ol className="mb-8 flex gap-2">
          {steps.map((s, i) => (
            <li key={s.id} className="flex flex-1 items-center gap-2">
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  step === s.id
                    ? "bg-slate-900 text-white"
                    : step > s.id
                      ? "bg-green-500 text-white"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {step > s.id ? "✓" : s.id}
              </span>
              <span className={`text-xs ${step === s.id ? "font-semibold" : "text-slate-400"}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className="flex-1 border-t border-slate-200" />
              )}
            </li>
          ))}
        </ol>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h1 className="text-xl font-bold">Nama & Identitas</h1>
            <p className="text-sm text-slate-500">
              Masukkan identitas yang akan dipantau oleh sistem.
            </p>
            <div>
              <label className="block text-sm font-medium">Nama Lengkap *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                placeholder="Budi Santoso"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Alias / Nama Panggilan</label>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                placeholder="budiS"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Profesi / Jabatan</label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                placeholder="CEO, Konsultan, Influencer…"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Industri / Sektor</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
              >
                <option value="">Pilih industri…</option>
                {["Teknologi", "Keuangan", "Politik", "Hiburan", "Kesehatan", "Pendidikan", "Hukum", "Lainnya"].map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <button
              disabled={!fullName.trim()}
              onClick={() => setStep(2)}
              className="w-full rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              Lanjut →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h1 className="text-xl font-bold">Identifier Digital</h1>
            <p className="text-sm text-slate-500">
              Daftar email, username, dll yang akan dicari di seluruh internet dan dark web.
              Pisahkan dengan koma atau baris baru.
            </p>
            {[
              { label: "Email Address", value: emails, set: setEmails, placeholder: "budi@example.com, budi@corp.com" },
              { label: "Nomor Telepon", value: phones, set: setPhones, placeholder: "+628123456789" },
              { label: "Username Platform", value: usernames, set: setUsernames, placeholder: "@budisantoso, budiS_official" },
              { label: "Domain Website", value: domains, set: setDomains, placeholder: "budisantoso.com, maju.co.id" },
            ].map(({ label, value, set, placeholder }) => (
              <div key={label}>
                <label className="block text-sm font-medium">{label}</label>
                <textarea
                  rows={2}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder={placeholder}
                  className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
            ))}
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold hover:bg-slate-50">
                ← Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white"
              >
                Lanjut →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <h1 className="text-xl font-bold">Konfirmasi Profil</h1>
            <p className="text-sm text-slate-500">
              Periksa data sebelum menyimpan. Sistem akan mulai memantau identitas Anda segera setelah profil dibuat.
            </p>
            <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
              <div><span className="font-medium">Nama:</span> {fullName} {alias && `(${alias})`}</div>
              {profession && <div><span className="font-medium">Profesi:</span> {profession}</div>}
              {industry && <div><span className="font-medium">Industri:</span> {industry}</div>}
              {emails && <div><span className="font-medium">Email:</span> {splitLines(emails).join(", ")}</div>}
              {phones && <div><span className="font-medium">Telepon:</span> {splitLines(phones).join(", ")}</div>}
              {usernames && <div><span className="font-medium">Username:</span> {splitLines(usernames).join(", ")}</div>}
              {domains && <div><span className="font-medium">Domain:</span> {splitLines(domains).join(", ")}</div>}
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700">
              🔍 Monitoring akan dimulai: Surface scan setiap 6 jam, Dark Web scan setiap 24 jam.
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold hover:bg-slate-50">
                ← Kembali
              </button>
              <button
                onClick={finish}
                disabled={submitting}
                className="flex-1 rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white disabled:opacity-40"
              >
                {submitting ? "Menyimpan…" : "Simpan & Mulai Monitor"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
