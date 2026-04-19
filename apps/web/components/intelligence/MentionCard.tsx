interface Props {
  source: string;
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  snippet: string;
  date: string;
}

const sentimentColor: Record<string, string> = {
  POSITIVE: "text-green-600",
  NEUTRAL: "text-yellow-600",
  NEGATIVE: "text-red-600",
};

export function MentionCard({ source, sentiment, snippet, date }: Props) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{source}</span>
        <span className={`text-xs font-medium ${sentimentColor[sentiment]}`}>{sentiment}</span>
      </div>
      <p className="mt-2 text-sm text-slate-700">{snippet}</p>
      <p className="mt-1 text-xs text-slate-400">{date}</p>
    </article>
  );
}
