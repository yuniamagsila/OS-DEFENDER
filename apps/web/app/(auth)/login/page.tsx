export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold">Masuk ke OS Defender</h1>
        <p className="mt-1 text-sm text-slate-500">Pantau dan lindungi reputasi digital Anda.</p>
        <form className="mt-6 space-y-4" action="/api/auth/login" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Masuk
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-500">
          Belum punya akun?{" "}
          <a href="/register" className="font-medium text-slate-900 underline">
            Daftar
          </a>
        </p>
      </div>
    </div>
  );
}
