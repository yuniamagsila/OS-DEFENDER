"use client";

import { useRouter } from "next/navigation";
import { CaseForm } from "@/components/cases/CaseForm";

export default function NewCasePage() {
  const router = useRouter();

  function handleSubmit() {
    router.push("/cases");
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold">Buka Kasus Baru</h1>
      <p className="mt-2 text-slate-600">
        Ceritakan ancaman atau krisis yang Anda hadapi. Tim konsultan akan segera merespons.
      </p>
      <div className="mt-8">
        <CaseForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
