interface ExposurePoint {
  source: string;
  count: number;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

interface Props {
  points: ExposurePoint[];
}

const severityWidth: Record<string, string> = {
  CRITICAL: "bg-red-500",
  HIGH: "bg-orange-400",
  MEDIUM: "bg-yellow-400",
  LOW: "bg-slate-300",
};

export function ExposureMap({ points }: Props) {
  const max = Math.max(...points.map((p) => p.count), 1);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-700">Peta Sebaran Temuan</h3>
      <div className="mt-4 space-y-3">
        {points.map((p) => (
          <div key={p.source}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">{p.source}</span>
              <span className="font-medium">{p.count}</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-2 rounded-full transition-all ${severityWidth[p.severity]}`}
                style={{ width: `${(p.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
