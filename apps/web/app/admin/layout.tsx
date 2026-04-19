import Link from "next/link";

const adminNav = [
  { href: "/admin/clients", label: "Klien", icon: "👥" },
  { href: "/admin/cases", label: "Semua Kasus", icon: "💼" },
  { href: "/admin/intelligence", label: "Intelligence Feed", icon: "📡" },
  { href: "/admin/analytics", label: "Analytics", icon: "📈" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <aside className="hidden w-52 shrink-0 border-r border-slate-200 bg-slate-900 text-white md:flex md:flex-col">
        <div className="px-5 py-6">
          <Link href="/" className="text-sm font-bold text-slate-300 hover:text-white">
            🛡️ OS Defender
          </Link>
          <p className="mt-1 text-xs text-slate-500">Admin Console</p>
        </div>
        <nav className="flex-1 px-3">
          <ul className="space-y-0.5">
            {adminNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-slate-700 px-5 py-4">
          <Link href="/dashboard" className="text-xs text-slate-500 hover:text-slate-300">
            ← Kembali ke Dashboard
          </Link>
        </div>
      </aside>
      <div className="flex-1 overflow-auto bg-slate-50">{children}</div>
    </div>
  );
}
