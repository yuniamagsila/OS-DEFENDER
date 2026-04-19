interface Props {
  score: number;
  status: string;
}

export function ReputationScoreCard({ score, status }: Props) {
  const color =
    score >= 85
      ? "text-green-600"
      : score >= 70
        ? "text-yellow-600"
        : score >= 50
          ? "text-orange-600"
          : "text-red-600";

  return (
    <article className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-xs text-slate-500">Reputation Score</p>
      <p className={`mt-2 text-4xl font-bold ${color}`}>{score}</p>
      <p className="mt-1 text-sm font-medium text-slate-600">{status}</p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-2 rounded-full ${color.replace("text-", "bg-")}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </article>
  );
}
