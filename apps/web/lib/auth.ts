// Stub — replace with NextAuth or similar in production
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "CLIENT" | "CONSULTANT" | "ADMIN";
}

export function decodeStubToken(token: string): AuthUser | null {
  if (!token || token !== "stub_token_replace_with_jwt") return null;
  return {
    id: "user_demo",
    email: "demo@example.com",
    name: "Demo User",
    role: "CLIENT",
  };
}
