import type { AuditResult } from "@/lib/audit/types";

/** Minimal, sanitised context sent to Claude — avoids leaking internal engine state */
export interface AuditSummaryInput {
  teamSize: number | string;
  useCase: string;
  toolCount: number;
  toolNames: string[];
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  optimizationScore: number;
  /** Top 3 recommendations max — keeps prompt concise */
  topRecommendations: Array<{
    type: string;
    reasoning: string;
    confidence: string;
    estimatedMonthlySavings: number;
  }>;
}

export interface AuditSummaryResponse {
  summary: string;
  /** "ai" = Claude generated, "fallback" = deterministic template */
  source: "ai" | "fallback";
  generatedAt: string;
}

/** Builds the minimal context object from a full AuditResult */
export function buildSummaryInput(result: AuditResult): AuditSummaryInput {
  return {
    teamSize: result.formData.teamSize,
    useCase: result.formData.useCase || "general",
    toolCount: result.toolBreakdowns.length,
    toolNames: result.toolBreakdowns.map((b) => b.toolName),
    totalMonthlySpend: result.totalMonthlySpend,
    totalMonthlySavings: result.totalMonthlySavings,
    optimizationScore: result.optimizationScore,
    topRecommendations: result.recommendations
      .filter((r) => r.type !== "already-optimized")
      .slice(0, 3)
      .map((r) => ({
        type: r.type,
        reasoning: r.reasoning,
        confidence: r.confidence,
        estimatedMonthlySavings: r.estimatedMonthlySavings,
      })),
  };
}
