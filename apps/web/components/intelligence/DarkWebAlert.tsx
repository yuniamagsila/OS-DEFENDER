interface Props {
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  category: string;
  description: string;
  date: string;
}

const severityStyle: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-700 border-red-200",
  HIGH: "bg-orange-100 text-orange-700 border-orange-200",
  MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-200",
  LOW: "bg-slate-100 text-slate-600 border-slate-200",
};

export function DarkWebAlert({ severity, category, description, date }: Props) {
  return (
    <article className={`rounded-lg border p-4 ${severityStyle[severity]}`}>
      <div className="flex items-center justify-between text-xs font-semibold">
        <span>{severity}</span>
        <span>{category}</span>
      </div>
      <p className="mt-2 text-sm">{description}</p>
      <p className="mt-1 text-xs opacity-70">{date}</p>
    </article>
  );
}
