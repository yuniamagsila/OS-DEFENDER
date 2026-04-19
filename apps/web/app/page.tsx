import Link from "next/link";

const sections = [
  {
    href: "/dashboard",
    title: "Dashboard",
    description: "Ringkasan skor reputasi, alert aktif, dan status monitoring.",
  },
  {
    href: "/profile",
    title: "Identity Profile",
    description: "Kelola identifier yang menjadi target pemantauan.",
  },
  {
    href: "/alerts",
    title: "Crisis Alerts",
    description: "Pantau alert prioritas tinggi dari surface dan dark web.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">OS Defender</h1>
        <p className="text-slate-600">
          Fondasi platform intelijen reputasi pribadi sesuai rencana README.
        </p>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <Link
            href={section.href}
            key={section.href}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
          >
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{section.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
