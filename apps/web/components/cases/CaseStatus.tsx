interface Props {
  status: string;
}

const statusStyle: Record<string, string> = {
  OPEN: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-slate-100 text-slate-500",
};

export function CaseStatus({ status }: Props) {
  return (
    <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${statusStyle[status] ?? "bg-slate-100 text-slate-500"}`}>
      {status}
    </span>
  );
}
