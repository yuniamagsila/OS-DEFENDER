const profile = {
  fullName: "Budi Santoso",
  alias: "budiS",
  profession: "CEO, PT Maju Bersama",
  industry: "Teknologi Keuangan",
  emails: ["budi@example.com", "budi.s@corp.com"],
  phones: ["+628123456789"],
  usernames: ["@budisantoso", "budiS_official"],
  domains: ["budisantoso.com", "majubersama.co.id"],
  reputationScore: 78,
};

const scoreColor =
  profile.reputationScore >= 85
    ? "text-green-600"
    : profile.reputationScore >= 70
      ? "text-yellow-600"
      : profile.reputationScore >= 50
        ? "text-orange-600"
        : "text-red-600";

const identifierSections = [
  { label: "Email", items: profile.emails },
  { label: "Nomor Telepon", items: profile.phones },
  { label: "Username Platform", items: profile.usernames },
  { label: "Domain Website", items: profile.domains },
];

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold">Identity Profile</h1>
      <p className="mt-2 text-slate-600">
        Basis target monitoring untuk semua crawler surface dan dark web.
      </p>

      {/* Score badge */}
      <div className="mt-6 flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
        <div>
          <p className="text-xs text-slate-500">Reputation Score</p>
          <p className={`text-5xl font-bold ${scoreColor}`}>{profile.reputationScore}</p>
        </div>
        <div className="border-l border-slate-100 pl-4">
          <p className="font-semibold">{profile.fullName}</p>
          <p className="text-sm text-slate-500">{profile.alias} · {profile.profession}</p>
          <p className="mt-1 text-xs text-slate-400">{profile.industry}</p>
        </div>
      </div>

      {/* Identifiers */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {identifierSections.map((sec) => (
          <section key={sec.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {sec.label}
            </h2>
            <ul className="mt-3 space-y-1">
              {sec.items.map((item) => (
                <li key={item} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Monitoring config hint */}
      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold">Monitoring Configuration</h2>
        <dl className="mt-3 grid gap-y-2 text-sm md:grid-cols-2">
          {[
            ["Platform", "SERP, Berita ID, Kaskus, Twitter, TikTok, YouTube"],
            ["Bahasa Target", "ID, EN"],
            ["Dark Web Scan", "Setiap 24 jam"],
            ["Surface Scan", "Setiap 6 jam"],
            ["Alert Threshold HIGH", "Risk score ≥ 70"],
            ["Alert Threshold CRITICAL", "Dark web exposure"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs text-slate-400">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
