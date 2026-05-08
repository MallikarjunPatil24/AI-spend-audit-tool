/**
 * Deterministic fallback summary generator.
 *
 * Used when the Claude API is unavailable, times out, or returns an invalid response.
 * Output should feel professional and personalised — never like an error message.
 *
 * Uses template composition rather than random phrases to ensure consistency.
 * Same input always produces same output.
 */

import type { AuditSummaryInput } from "./types";
import { formatCurrency } from "@/lib/formatters/currency";

export function generateFallbackSummary(input: AuditSummaryInput): string {
  const {
    teamSize, toolCount, toolNames, totalMonthlySpend,
    totalMonthlySavings, optimizationScore, topRecommendations,
  } = input;

  const annualSpend    = totalMonthlySpend * 12;
  const annualSavings  = totalMonthlySavings * 12;
  const team           = teamSize ? `${teamSize}-person` : "your";
  const tools          = toolNames.slice(0, 3).join(", ");
  const moreTools      = toolCount > 3 ? ` and ${toolCount - 3} other${toolCount - 3 > 1 ? "s" : ""}` : "";
  const isOptimized    = totalMonthlySavings === 0;
  const score          = optimizationScore;
  const highConfRec    = topRecommendations.find((r) => r.confidence === "high");

  // ── Already optimised ────────────────────────────────────────────────────
  if (isOptimized) {
    return `The ${team} team's AI tooling stack — comprising ${tools}${moreTools} — totals ${formatCurrency(totalMonthlySpend)}/mo (${formatCurrency(annualSpend)}/yr) and scores ${score}/100 on our optimization benchmark. Based on current plan configurations and seat counts, no material optimization opportunities were identified. The stack appears well-calibrated relative to published vendor pricing, current team size, and reported use case. We recommend re-auditing quarterly or whenever team headcount or tool selection changes materially.`;
  }

  // ── Savings available ────────────────────────────────────────────────────
  const savingsPct = Math.round((totalMonthlySavings / totalMonthlySpend) * 100);
  const primaryInsight = highConfRec
    ? `Most notably, ${highConfRec.reasoning.charAt(0).toLowerCase()}${highConfRec.reasoning.slice(1)}`
    : `The audit identified ${topRecommendations.length} area${topRecommendations.length !== 1 ? "s" : ""} where plan configuration or seat allocation could be reconsidered.`;

  return `The ${team} team's AI tooling stack — ${tools}${moreTools} — totals ${formatCurrency(totalMonthlySpend)}/mo (${formatCurrency(annualSpend)}/yr) and scores ${score}/100 on our optimization benchmark. The audit identified approximately ${formatCurrency(totalMonthlySavings)}/mo (${formatCurrency(annualSavings)}/yr, ~${savingsPct}% of current spend) in potential savings across ${topRecommendations.length} finding${topRecommendations.length !== 1 ? "s" : ""}. ${primaryInsight} All estimates are conservative and based on publicly available vendor pricing.`;
}
