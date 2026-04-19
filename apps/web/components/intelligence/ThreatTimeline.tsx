interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  source: string;
}

interface Props {
  events: TimelineEvent[];
}

const dot: Record<string, string> = {
  CRITICAL: "bg-red-500",
  HIGH: "bg-orange-400",
  MEDIUM: "bg-yellow-400",
  LOW: "bg-slate-400",
};

export function ThreatTimeline({ events }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-700">Threat Timeline</h3>
      <ol className="relative mt-4 ml-3 border-l border-slate-200">
        {events.map((e) => (
          <li key={e.id} className="mb-6 ml-4">
            <span
              className={`absolute -left-1.5 size-3 rounded-full border-2 border-white ${dot[e.severity]}`}
            />
            <p className="text-xs text-slate-400">{e.date} · {e.source}</p>
            <p className="mt-0.5 text-sm font-medium">{e.title}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
