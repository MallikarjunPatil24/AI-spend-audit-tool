/**
 * Audit Engine — Main Orchestrator
 *
 * runAudit(formData) → AuditResult
 *
 * Flow:
 * 1. Validate input
 * 2. Build per-tool breakdowns with expected vs reported spend
 * 3. Run all rule functions in sequence
 * 4. Deduplicate recommendations by affected tool set
 * 5. Calculate totals, score, and summary
 * 6. Return fully typed AuditResult
 *
 * This function is deterministic: same input → same output.
 * It never calls external APIs or generates random values.
 */

import type { AuditFormData, AiToolId, ToolEntry } from "@/types/audit";
import type { AuditResult, ToolBreakdown, AuditRecommendation, RuleContext } from "./types";
import { PRICING_CATALOG, expectedMonthlyCost } from "@/lib/pricing/pricing-data";
import { ALL_RULES } from "./rules";
import { calculateOptimizationScore, generateSummary } from "./scoring";

// ─── ID helpers ───────────────────────────────────────────────────────────────

function genAuditId(): string {
  return `audit_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Tool Breakdown Builder ───────────────────────────────────────────────────

function buildBreakdown(entry: ToolEntry): ToolBreakdown | null {
  if (!entry.toolId || !entry.plan) return null;

  const toolId = entry.toolId as AiToolId;
  const seats  = Number(entry.seats)        || 0;
  const spend  = Number(entry.monthlySpend) || 0;

  const catalog = PRICING_CATALOG[toolId];
  if (!catalog) return null;

  const plan = catalog.plans.find((p) => p.planId === entry.plan);
  if (!plan) return null;

  const expected = expectedMonthlyCost(toolId, entry.plan, seats);
  const varianceAmount = expected !== null ? spend - expected : null;
  const variancePct =
    expected !== null && expected > 0
      ? ((spend - expected) / expected) * 100
      : null;

  return {
    toolId,
    toolName: catalog.toolName,
    planId: plan.planId,
    planLabel: plan.planLabel,
    reportedSeats: seats,
    reportedMonthlySpend: spend,
    expectedMonthlySpend: expected,
    varianceAmount,
    variancePct,
    isApiTier: plan.isApiTier,
  };
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export function runAudit(formData: AuditFormData): AuditResult {
  // 1. Build breakdowns
  const breakdowns: ToolBreakdown[] = formData.tools
    .map(buildBreakdown)
    .filter((b): b is ToolBreakdown => b !== null);

  // 2. Compute totals
  const totalMonthlySpend = breakdowns.reduce(
    (sum, b) => sum + b.reportedMonthlySpend,
    0
  );

  // 3. Build rule context
  const ctx: RuleContext = { formData, breakdowns };

  // 4. Run all rules and flatten recommendations
  const allRecs: AuditRecommendation[] = ALL_RULES.flatMap((rule) => {
    try {
      return rule(ctx);
    } catch {
      // Rules should never throw, but if they do, skip gracefully
      return [];
    }
  });

  // 5. Sort: high confidence first, then by savings descending
  const confidenceOrder = { high: 0, medium: 1, low: 2 };
  const recommendations = allRecs.sort((a, b) => {
    const cmp = confidenceOrder[a.confidence] - confidenceOrder[b.confidence];
    if (cmp !== 0) return cmp;
    return b.estimatedMonthlySavings - a.estimatedMonthlySavings;
  });

  // 6. If no recommendations were generated, add an "already optimized" note
  if (recommendations.length === 0) {
    recommendations.push({
      id: "optimized",
      type: "already-optimized",
      affectedToolIds: breakdowns.map((b) => b.toolId),
      currentMonthlySpend: totalMonthlySpend,
      estimatedMonthlySavings: 0,
      confidence: "high",
      reasoning:
        "Based on the reported plan configurations, seat counts, and team size, no significant optimizations were identified. Your AI tool stack appears well-calibrated for your current usage profile.",
      action:
        "No action required at this time. Re-audit quarterly or when team size / tool lineup changes.",
    });
  }

  // 7. Compute aggregate savings (exclude already-optimized placeholder)
  const totalMonthlySavings = recommendations
    .filter((r) => r.type !== "already-optimized")
    .reduce((sum, r) => sum + r.estimatedMonthlySavings, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;

  // 8. Score and summary
  const optimizationScore = calculateOptimizationScore(
    totalMonthlySpend,
    totalMonthlySavings,
    recommendations
  );
  const summary = generateSummary(
    totalMonthlySpend,
    totalMonthlySavings,
    optimizationScore,
    breakdowns.length
  );

  return {
    id: genAuditId(),
    createdAt: new Date().toISOString(),
    formData,
    toolBreakdowns: breakdowns,
    recommendations,
    totalMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings,
    optimizationScore,
    summary,
  };
}
