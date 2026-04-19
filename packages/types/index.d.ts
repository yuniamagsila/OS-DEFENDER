// ─── Enums ────────────────────────────────────────────────────────────────────

export type UserRole = "CLIENT" | "CONSULTANT" | "ADMIN";
export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type CaseStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type CasePriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type TakedownStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
export type IntelligenceType = "SURFACE" | "DARKWEB";
export type Sentiment = "POSITIVE" | "NEUTRAL" | "NEGATIVE";

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

// ─── Identity Profile ─────────────────────────────────────────────────────────

export interface IdentityProfile {
  id: string;
  userId: string;
  fullName: string;
  alias?: string;
  profession?: string;
  emails: string[];
  phones: string[];
  usernames: string[];
  domains: string[];
  industry?: string;
  reputationScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityProfileCreateInput {
  fullName: string;
  alias?: string;
  profession?: string;
  emails?: string[];
  phones?: string[];
  usernames?: string[];
  domains?: string[];
  industry?: string;
}

// ─── Mention ──────────────────────────────────────────────────────────────────

export interface Mention {
  id: string;
  profileId: string;
  sourceType: IntelligenceType;
  sourceName: string;
  url: string;
  content: string;
  sentiment?: Sentiment;
  riskScore: number;
  evidenceUrl?: string;
  publishedAt?: string;
  crawledAt: string;
}

// ─── Alert ────────────────────────────────────────────────────────────────────

export interface AlertItem {
  id: string;
  profileId: string;
  severity: AlertSeverity;
  category: string;
  title: string;
  summary: string;
  evidenceJson?: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
}

export interface AlertPayload {
  alert_id: string;
  profile_id: string;
  severity: AlertSeverity;
  category: string;
  title: string;
  summary: string;
  evidence?: Record<string, unknown>;
}

// ─── Case ─────────────────────────────────────────────────────────────────────

export interface ConsultationCase {
  id: string;
  profileId: string;
  clientId: string;
  title: string;
  description: string;
  status: CaseStatus;
  priority: CasePriority;
  createdAt: string;
  updatedAt: string;
}

export interface CaseCreateInput {
  title: string;
  description: string;
  priority: CasePriority;
  profileId: string;
}

export interface CaseMessage {
  id: string;
  caseId: string;
  senderRole: UserRole;
  senderName: string;
  body: string;
  createdAt: string;
}

// ─── Report ───────────────────────────────────────────────────────────────────

export interface Report {
  id: string;
  profileId: string;
  title: string;
  type: "MONTHLY" | "CRISIS" | "CUSTOM";
  fileUrl?: string;
  generatedAt: string;
}

// ─── Takedown ─────────────────────────────────────────────────────────────────

export interface TakedownRequest {
  id: string;
  profileId: string;
  target: string;
  platform: string;
  status: TakedownStatus;
  filedAt: string;
  updatedAt: string;
}

export interface TakedownCreateInput {
  target: string;
  platform: string;
  profileId: string;
  notes?: string;
}

// ─── Notification ─────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  userId: string;
  channel: "email" | "whatsapp" | "telegram" | "in_app";
  message: string;
  sentAt: string;
  isRead: boolean;
}

// ─── AI Service Payloads ──────────────────────────────────────────────────────

export interface SentimentResult {
  sentiment: Sentiment;
  score: number;
  label: string;
}

export interface ScoringResult {
  reputation_score: number;
  status: string;
  breakdown: Record<string, number>;
}

export interface ClassifyResult {
  category: string;
  severity: AlertSeverity;
  confidence: number;
}

export interface RecommendAction {
  priority: number;
  action: string;
  owner: string;
  urgency: string;
}

export interface RecommendResult {
  actions: RecommendAction[];
  consult_recommended: boolean;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiError {
  error: string;
  code?: string;
}

export interface ApiSuccess<T = unknown> {
  data: T;
  message?: string;
}
