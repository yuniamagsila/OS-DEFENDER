const identifiers = [
  "nama lengkap + variasi",
  "alias / username",
  "email",
  "domain",
  "nomor telepon",
];

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Identity Profile</h1>
      <p className="mt-2 text-slate-600">
        Konfigurasi profil identitas sebagai sumber target semua crawler.
      </p>
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {identifiers.map((item) => (
          <li key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-sm">
            {item}
          </li>
        ))}
      </ul>
    </main>
  );
}
