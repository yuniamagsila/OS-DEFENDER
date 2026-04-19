const steps = [
  { id: 1, label: "Nama & Identitas", done: false },
  { id: 2, label: "Identifier Digital", done: false },
  { id: 3, label: "Konfigurasi Monitoring", done: false },
];

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold">Siapkan Identity Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Profil ini menjadi basis seluruh monitoring reputasi Anda.
        </p>
        <ol className="mt-6 space-y-3">
          {steps.map((step) => (
            <li
              key={step.id}
              className="flex items-center gap-3 rounded-lg border border-slate-200 p-4"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                {step.id}
              </span>
              <span className="text-sm font-medium">{step.label}</span>
            </li>
          ))}
        </ol>
        <a
          href="/dashboard"
          className="mt-6 block w-full rounded-lg bg-slate-900 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Mulai Setup
        </a>
      </div>
    </div>
  );
}
