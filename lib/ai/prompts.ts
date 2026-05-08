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
export const SYSTEM_PROMPT = `You are a senior procurement analyst writing concise AI tooling audit reports for startup operators and engineering managers.

Your role is to synthesise structured audit data into a single professional paragraph. You write in a measured, factual tone — similar to a McKinsey operations brief or a Y Combinator batch memo.

You must follow these rules strictly:
- Write exactly 80–120 words. No more, no less.
- Reference only the data provided. Never invent tool names, pricing, savings figures, or recommendations.
- Do not use marketing language, hyperbole, or urgency tactics.
- Do not mention SpendScope by name.
- Do not use bullet points, headers, or markdown.
- Return ONLY the summary paragraph — nothing else.
- Write as if advising a CFO or VP Engineering, not a general consumer.`;

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

  return `Write a professional 80–120 word audit summary based solely on this data. Do not invent any facts, numbers, or tool recommendations beyond what is listed here.\n\n${JSON.stringify(context, null, 2)}`;
}
