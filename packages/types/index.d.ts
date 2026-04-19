export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface AlertItem {
  id: string;
  title: string;
  severity: AlertSeverity;
  source: "surface" | "darkweb";
}
