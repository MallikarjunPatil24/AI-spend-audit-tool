/**
 * Core type definitions for audit sessions and results.
 * These types flow through the entire application.
 */

/** Supported AI tools that SpendScope can audit */
export type AiToolId =
  | "cursor"
  | "github-copilot"
  | "claude"
  | "chatgpt"
  | "anthropic-api"
  | "openai-api"
  | "gemini"
  | "windsurf"
  | "v0";

/** Input from the user describing their tool usage */
export interface AuditToolInput {
  toolId: AiToolId;
  seats: number;
  plan: string;
  monthlySpend?: number; // optional override if user knows exact spend
}

/** Result for a single tool after audit processing */
export interface AuditToolResult {
  toolId: AiToolId;
  name: string;
  currentMonthlyCost: number;
  suggestedMonthlyCost: number;
  potentialSavings: number;
  savingsPercent: number;
  overlapsWith?: AiToolId[];
  recommendation: string;
  severity: "low" | "medium" | "high";
}

/** The complete audit session */
export interface AuditSession {
  id: string;
  slug: string;
  teamSize: number;
  tools: AuditToolInput[];
  results: AuditToolResult[];
  totalMonthlySpend: number;
  totalPotentialSavings: number;
  savingsPercent: number;
  aiSummary?: string;
  createdAt: Date;
}

/** Minimal audit data used for sharing (public URL) */
export interface AuditShareData {
  slug: string;
  totalMonthlySpend: number;
  totalPotentialSavings: number;
  teamSize: number;
  toolCount: number;
  createdAt: string;
}

/** Severity levels for overspend alerts */
export type SeverityLevel = "low" | "medium" | "high";

/** Audit form state (persisted in localStorage in Step 3) */
export interface AuditFormState {
  teamSize: number;
  tools: AuditToolInput[];
  step: number;
  completed: boolean;
}
