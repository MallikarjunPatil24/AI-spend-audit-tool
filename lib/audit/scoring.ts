/**
 * Optimization Score Calculator
 *
 * Score: 0–100
 * - 100 = no waste detected; well-optimized stack
 * - 80+ = minor opportunities, generally well-managed
 * - 60–79 = moderate savings available
 * - 40–59 = significant inefficiencies identified
 * - <40 = substantial review recommended
 *
 * Scoring is deliberately conservative: a team that is already reasonably
 * optimized should score 80+, not be penalized for using multiple tools
 * with legitimate distinct use cases.
 */

import type { AuditRecommendation } from "./types";

const CONFIDENCE_WEIGHTS: Record<string, number> = {
  high:   20,
  medium: 12,
  low:     5,
};

/**
 * Calculate the optimization score.
 * @param totalMonthlySpend - Total reported monthly spend
 * @param totalSavings      - Total estimated monthly savings
 * @param recommendations   - All generated recommendations
 */
export function calculateOptimizationScore(
  totalMonthlySpend: number,
  totalSavings: number,
  recommendations: AuditRecommendation[]
): number {
  // If no spend to evaluate, return neutral score
  if (totalMonthlySpend === 0) return 75;

  let score = 100;

  // Deduct per recommendation (weighted by confidence)
  for (const rec of recommendations) {
    if (rec.type === "already-optimized") continue;
    score -= CONFIDENCE_WEIGHTS[rec.confidence] ?? 5;
  }

  // Additional deduction proportional to savings opportunity
  const savingsRatio = totalSavings / totalMonthlySpend;
  if (savingsRatio > 0.4) score -= 15;
  else if (savingsRatio > 0.25) score -= 10;
  else if (savingsRatio > 0.1) score -= 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Generate a one-paragraph prose summary suitable for sharing
 * with a CFO, EM, or operations lead.
 */
export function generateSummary(
  totalMonthlySpend: number,
  totalSavings: number,
  score: number,
  toolCount: number
): string {
  const annual = totalMonthlySpend * 12;
  const savingsAnnual = totalSavings * 12;
  const pct = totalMonthlySpend > 0
    ? ((totalSavings / totalMonthlySpend) * 100).toFixed(0)
    : "0";

  if (totalSavings === 0 || score >= 85) {
    return `Your team's AI tool stack of ${toolCount} tool${toolCount !== 1 ? "s" : ""} totals $${totalMonthlySpend.toLocaleString()}/mo ($${annual.toLocaleString()}/yr). Based on current plan configurations and seat counts, no significant optimizations were identified — your stack appears to be reasonably well-calibrated for your reported team size and use case.`;
  }

  if (score >= 65) {
    return `Your team's AI stack of ${toolCount} tool${toolCount !== 1 ? "s" : ""} costs $${totalMonthlySpend.toLocaleString()}/mo ($${annual.toLocaleString()}/yr). SpendScope identified ${pct}% in potential savings (~$${savingsAnnual.toLocaleString()}/yr) through plan right-sizing and seat optimizations. These are medium-confidence opportunities that warrant a 15-minute internal review before acting.`;
  }

  return `Your team's AI stack of ${toolCount} tool${toolCount !== 1 ? "s" : ""} costs $${totalMonthlySpend.toLocaleString()}/mo ($${annual.toLocaleString()}/yr). SpendScope flagged approximately $${savingsAnnual.toLocaleString()}/yr (${pct}% of current spend) in potential optimizations across plan tiers, seat counts, and overlapping tool coverage. We recommend a structured procurement review using the detailed findings below before making changes.`;
}
