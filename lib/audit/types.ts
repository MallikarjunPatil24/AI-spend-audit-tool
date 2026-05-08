import type { AiToolId, AuditFormData } from "@/types/audit";

// ─── Core Enumerations ────────────────────────────────────────────────────────

export type ConfidenceLevel = "high" | "medium" | "low";

export type RecommendationType =
  | "downgrade-plan"        // move to a cheaper plan within same tool
  | "reduce-seats"          // reduce provisioned seats
  | "consolidate-tools"     // remove duplicate-function tools
  | "api-vs-subscription"   // use API instead of or in addition to subscription
  | "review-api-spend"      // API spend is high — worth reviewing usage patterns
  | "tier-right-size"       // enterprise/team tier without sufficient team to justify it
  | "already-optimized";    // no meaningful savings found

// ─── Tool Breakdown ───────────────────────────────────────────────────────────

export interface ToolBreakdown {
  toolId: AiToolId;
  toolName: string;
  planId: string;
  planLabel: string;
  reportedSeats: number;
  reportedMonthlySpend: number;
  /** What the catalog says this should cost (null = custom/API tier) */
  expectedMonthlySpend: number | null;
  /** Reported - Expected. Positive = potentially overpaying vs catalog. */
  varianceAmount: number | null;
  variancePct: number | null;
  isApiTier: boolean;
}

// ─── Recommendation ───────────────────────────────────────────────────────────

export interface AuditRecommendation {
  id: string;
  type: RecommendationType;
  /** All tool IDs this recommendation applies to */
  affectedToolIds: AiToolId[];
  /** Current combined spend for affected tools */
  currentMonthlySpend: number;
  /** Conservative lower-bound savings estimate */
  estimatedMonthlySavings: number;
  confidence: ConfidenceLevel;
  /**
   * One sentence written in finance/procurement tone.
   * Factual, defensible, not prescriptive.
   */
  reasoning: string;
  /** Specific, actionable next step */
  action: string;
  /** Source URL if recommendation is pricing-grounded */
  sourceUrl?: string;
}

// ─── Full Audit Result ────────────────────────────────────────────────────────

export interface AuditResult {
  /** Client-side generated ID (Step 4 will persist to Supabase) */
  id: string;
  createdAt: string;
  formData: AuditFormData;
  toolBreakdowns: ToolBreakdown[];
  recommendations: AuditRecommendation[];
  totalMonthlySpend: number;
  /** Sum of estimatedMonthlySavings across all recommendations */
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  /**
   * 0–100 optimization score.
   * 100 = no waste detected. Lower = more savings opportunities found.
   * A well-optimized team at scale can still score 85+.
   */
  optimizationScore: number;
  /** Short prose summary suitable for sharing with a CFO or EM */
  summary: string;
}

// ─── Rule Context (passed into every rule function) ───────────────────────────

export interface RuleContext {
  formData: AuditFormData;
  breakdowns: ToolBreakdown[];
}
