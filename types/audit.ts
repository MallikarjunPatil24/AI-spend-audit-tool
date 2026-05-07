/** All supported AI tool identifiers */
export type AiToolId =
  | "cursor"
  | "github-copilot"
  | "claude"
  | "chatgpt"
  | "anthropic-api"
  | "openai-api"
  | "gemini"
  | "windsurf";

/** Primary use-case options */
export type UseCase =
  | "coding"
  | "writing"
  | "research"
  | "data-analysis"
  | "mixed";

/** A single AI tool entry in the audit form */
export interface ToolEntry {
  id: string;           // stable client-side UUID
  toolId: AiToolId | "";
  plan: string;
  monthlySpend: number | "";  // what the team actually pays
  seats: number | "";
}

/** Full audit form payload */
export interface AuditFormData {
  teamSize: number | "";
  useCase: UseCase | "";
  tools: ToolEntry[];
}

/** Validation errors per tool entry */
export interface ToolEntryErrors {
  toolId?: string;
  plan?: string;
  monthlySpend?: string;
  seats?: string;
}

/** Full form-level validation errors */
export interface AuditFormErrors {
  teamSize?: string;
  useCase?: string;
  general?: string;
  tools: Record<string, ToolEntryErrors>;
}

/** Computed totals shown in the summary panel */
export interface AuditTotals {
  toolCount: number;
  totalMonthlySpend: number;
  totalSeats: number;
}

/**
 * Serialisable snapshot stored in Supabase (Step 3).
 * Designed to support shareable URLs and AI summaries.
 */
export interface AuditSubmission {
  id: string;
  slug: string;
  createdAt: string;
  formData: AuditFormData;
  totals: AuditTotals;
  aiSummary?: string;
}
