export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function scoreStatus(score: number): string {
  if (score >= 85) return "Aman";
  if (score >= 70) return "Waspada";
  if (score >= 50) return "Berisiko";
  if (score >= 30) return "Krisis";
  return "Darurat";
}
