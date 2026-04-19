import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/profile", label: "Identity Profile", icon: "👤" },
  { href: "/intelligence/surface", label: "Surface Intel", icon: "🔍" },
  { href: "/intelligence/darkweb", label: "Dark Web Intel", icon: "🕸️" },
  { href: "/alerts", label: "Crisis Alerts", icon: "🚨" },
  { href: "/cases", label: "Consultation Cases", icon: "💼" },
  { href: "/reports", label: "Reports", icon: "📋" },
  { href: "/takedown", label: "Takedown", icon: "🛑" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col">
        <div className="px-5 py-6">
          <Link href="/" className="text-base font-bold">
            🛡️ OS Defender
          </Link>
        </div>
        <nav className="flex-1 px-3">
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
          OS Defender v0.3.0
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-slate-50">{children}</div>
    </div>
  );
}
