import type { AuditSummaryInput } from "./types";

/**
 * System prompt: establishes Claude's role as a procurement analyst.
 *
 * Key design decisions:
 * 1. Role anchoring ("procurement analyst") prevents marketing/chatbot tone.
 * 2. Explicit prohibition on inventing numbers prevents hallucination.
 * 3. Length constraint (80-120 words) keeps output executive-friendly.
 * 4. Tone requirements avoid both alarmism and hype.
 * 5. "Return ONLY the paragraph" removes formatting drift.
 */
export const SYSTEM_PROMPT = `You are a strategic technology consultant and procurement expert writing compelling AI tooling audit reports for startup founders and engineering leaders.

Your role is to synthesise structured audit data into a highly persuasive, action-oriented executive summary (2-3 paragraphs). You write in an engaging, confident tone that clearly highlights the massive financial value and operational efficiency the client stands to gain by optimizing their stack.

You must follow these rules strictly:
- Write between 150–250 words across 2 to 3 well-structured paragraphs.
- Reference the data provided. Emphasize the potential annual savings and the immediate ROI of consolidating tools.
- Use strong, persuasive language that builds trust and urgency, demonstrating your deep expertise in SaaS procurement.
- Do not mention SpendScope by name.
- Return ONLY the summary paragraphs — no headers or markdown titles.
- Write as if advising a CEO or CFO, making the financial and strategic benefits impossible to ignore.`;

/**
 * Builds the user-turn message with the structured audit context.
 * Input is JSON-serialised to reduce ambiguity and token drift.
 */
export function buildUserPrompt(input: AuditSummaryInput): string {
  const isOptimized = input.totalMonthlySavings === 0;
  const annualSavings = input.totalMonthlySavings * 12;

  const context = {
    teamSize: input.teamSize || "unknown",
    primaryUseCase: input.useCase,
    toolsAudited: input.toolNames.join(", "),
    totalMonthlySpend: `$${input.totalMonthlySpend}`,
    potentialMonthlySavings: isOptimized ? "none identified" : `$${input.totalMonthlySavings}`,
    potentialAnnualSavings: isOptimized ? "none identified" : `$${annualSavings}`,
    optimizationScore: `${input.optimizationScore}/100`,
    topFindings: isOptimized
      ? ["No significant optimization opportunities identified."]
      : input.topRecommendations.map(
          (r) => `${r.reasoning} (confidence: ${r.confidence})`
        ),
  };

  return `Write a highly persuasive and compelling 150–250 word executive summary (2-3 paragraphs) based solely on this data. Emphasize the strategic value and financial savings to attract the client to take action.\n\n${JSON.stringify(context, null, 2)}`;
}
