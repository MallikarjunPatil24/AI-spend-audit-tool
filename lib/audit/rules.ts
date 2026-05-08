/**
 * Audit Rules — pure, deterministic, independently testable functions.
 *
 * Each rule accepts a RuleContext and returns 0 or more AuditRecommendations.
 * Rules NEVER mutate their inputs.
 * Rules NEVER call external APIs.
 * Rules NEVER generate random values.
 *
 * Reasoning tone: finance operations / procurement analysis.
 * Savings estimates: conservative lower-bound only.
 */

import type { AuditRecommendation, RuleContext } from "./types";
import { PRICING_CATALOG } from "@/lib/pricing/pricing-data";
import { SOURCES } from "@/lib/pricing/sources";

let _ruleIdCounter = 0;
function ruleId(prefix: string): string {
  return `${prefix}_${++_ruleIdCounter}`;
}

// ─── IDE Assistant categories ─────────────────────────────────────────────────
const IDE_TOOLS = new Set(["cursor", "github-copilot", "windsurf"]);
const CHAT_TOOLS = new Set(["claude", "chatgpt", "gemini"]);

// ─── Rule 1: Business/Enterprise tier for very small teams ────────────────────
/**
 * Team-tier tools (Business, Enterprise) include admin dashboards, SSO, audit logs,
 * and centralised billing management. These controls have diminishing value for
 * teams below a threshold where overhead justifies the premium.
 */
export function checkTierRightSize(ctx: RuleContext): AuditRecommendation[] {
  const results: AuditRecommendation[] = [];

  for (const bd of ctx.breakdowns) {
    if (bd.isApiTier) continue;

    const catalog = PRICING_CATALOG[bd.toolId];
    const currentPlan = catalog?.plans.find((p) => p.planId === bd.planId);
    if (!currentPlan || currentPlan.monthlyPricePerSeat === null) continue;

    // Find next cheaper non-enterprise, non-API plan
    const cheaper = catalog.plans.find(
      (p) =>
        !p.isApiTier &&
        !p.isEnterprise &&
        p.monthlyPricePerSeat !== null &&
        p.monthlyPricePerSeat < currentPlan.monthlyPricePerSeat! &&
        (!p.minSeats || bd.reportedSeats >= p.minSeats)
    );
    if (!cheaper || cheaper.monthlyPricePerSeat === null) continue;

    // Only flag Business/Enterprise plans for small teams (≤ 4 seats)
    if (bd.planId !== "business" && !currentPlan.isEnterprise) continue;
    if (bd.reportedSeats > 4) continue;

    const saving = (currentPlan.monthlyPricePerSeat - cheaper.monthlyPricePerSeat) * bd.reportedSeats;
    if (saving < 5) continue; // not worth flagging

    results.push({
      id: ruleId("tier"),
      type: "tier-right-size",
      affectedToolIds: [bd.toolId],
      currentMonthlySpend: bd.reportedMonthlySpend,
      estimatedMonthlySavings: saving,
      confidence: bd.reportedSeats <= 2 ? "high" : "medium",
      reasoning: `${bd.toolName} ${currentPlan.planLabel} tier includes admin controls (SSO, audit logs, policy management) that typically deliver value at ≥5 seats — ${bd.reportedSeats} active seat${bd.reportedSeats > 1 ? "s" : ""} may not justify the ${((currentPlan.monthlyPricePerSeat! - cheaper.monthlyPricePerSeat) / cheaper.monthlyPricePerSeat * 100).toFixed(0)}% premium over ${cheaper.planLabel}.`,
      action: `Evaluate whether SSO and admin controls are actively used. If not, downgrade to ${bd.toolName} ${cheaper.planLabel} at $${cheaper.monthlyPricePerSeat}/seat/mo.`,
      sourceUrl: catalog.pricingPageUrl,
    });
  }

  return results;
}

// ─── Rule 2: Duplicate IDE coding assistants ──────────────────────────────────
/**
 * Cursor, GitHub Copilot, and Windsurf serve substantially overlapping functions
 * as inline code completion and context-aware AI pair programmers. Running ≥2
 * of these simultaneously for the same users represents functional redundancy.
 */
export function checkDuplicateCodingAssistants(ctx: RuleContext): AuditRecommendation[] {
  const ideTools = ctx.breakdowns.filter((b) => IDE_TOOLS.has(b.toolId) && !b.isApiTier);
  if (ideTools.length < 2) return [];

  // Conservative: assume one tool can be eliminated for the smallest-spend tool
  const sorted = [...ideTools].sort((a, b) => a.reportedMonthlySpend - b.reportedMonthlySpend);
  const smallest = sorted[0];

  return [
    {
      id: ruleId("dup_ide"),
      type: "consolidate-tools",
      affectedToolIds: ideTools.map((t) => t.toolId),
      currentMonthlySpend: ideTools.reduce((s, t) => s + t.reportedMonthlySpend, 0),
      estimatedMonthlySavings: smallest.reportedMonthlySpend,
      confidence: "medium",
      reasoning: `${ideTools.map((t) => t.toolName).join(", ")} provide functionally overlapping inline code completion and AI pair-programming capabilities. Concurrent subscriptions for the same engineering team likely result in underutilisation of at least one tool.`,
      action: `Conduct a 2-week usage survey across the engineering team to identify which IDE assistant drives the most completed suggestions. Consider consolidating to a single tool and eliminating the lowest-engagement subscription ($${smallest.reportedMonthlySpend}/mo).`,
    },
  ];
}

// ─── Rule 3: Duplicate chat AI subscriptions ──────────────────────────────────
/**
 * Claude, ChatGPT, and Gemini Advanced are general-purpose conversational AI
 * assistants with comparable capabilities for most business use cases.
 * Paying for two or more simultaneously for the same users warrants review.
 */
export function checkDuplicateChatAssistants(ctx: RuleContext): AuditRecommendation[] {
  const chatPaid = ctx.breakdowns.filter(
    (b) =>
      CHAT_TOOLS.has(b.toolId) &&
      !b.isApiTier &&
      b.reportedMonthlySpend > 0
  );
  if (chatPaid.length < 2) return [];

  const sorted = [...chatPaid].sort((a, b) => a.reportedMonthlySpend - b.reportedMonthlySpend);
  const smallest = sorted[0];

  return [
    {
      id: ruleId("dup_chat"),
      type: "consolidate-tools",
      affectedToolIds: chatPaid.map((t) => t.toolId),
      currentMonthlySpend: chatPaid.reduce((s, t) => s + t.reportedMonthlySpend, 0),
      estimatedMonthlySavings: smallest.reportedMonthlySpend,
      confidence: "low",
      reasoning: `${chatPaid.map((t) => t.toolName).join(" and ")} subscriptions cover comparable general-purpose conversational AI capabilities. Maintaining both may reflect a genuine workflow split (e.g., distinct tasks or personas) but should be validated against actual usage patterns.`,
      action: `Survey team members on primary vs secondary tool usage. If one tool handles <20% of interactions, consider retiring that subscription and routing volume to the primary tool.`,
    },
  ];
}

// ─── Rule 4: API tier alongside overlapping subscription ─────────────────────
/**
 * When a team holds both a direct API subscription and a chat subscription
 * from the same vendor, the use cases may overlap depending on deployment.
 * This is often intentional (different use cases) but worth documenting.
 */
export function checkApiVsSubscriptionOverlap(ctx: RuleContext): AuditRecommendation[] {
  const results: AuditRecommendation[] = [];

  // Anthropic: Anthropic API + Claude subscription
  const anthropicApi = ctx.breakdowns.find((b) => b.toolId === "anthropic-api");
  const claudeSub    = ctx.breakdowns.find((b) => b.toolId === "claude" && !b.isApiTier);
  if (anthropicApi && claudeSub) {
    results.push({
      id: ruleId("api_claude"),
      type: "api-vs-subscription",
      affectedToolIds: ["anthropic-api", "claude"],
      currentMonthlySpend: anthropicApi.reportedMonthlySpend + claudeSub.reportedMonthlySpend,
      estimatedMonthlySavings: Math.min(anthropicApi.reportedMonthlySpend, claudeSub.reportedMonthlySpend) * 0.3,
      confidence: "low",
      reasoning: `Running both Anthropic API and a Claude subscription provides access to the same underlying models through different interfaces. If the API is used for production workloads and the subscription for interactive use, this split is intentional — otherwise, consolidation may reduce overhead.`,
      action: `Confirm whether API usage and Claude.ai usage serve distinct workflows. If there is significant overlap, consider whether a single Claude Team subscription with higher usage limits meets both needs.`,
      sourceUrl: SOURCES.claude,
    });
  }

  // OpenAI: OpenAI API + ChatGPT subscription
  const openaiApi = ctx.breakdowns.find((b) => b.toolId === "openai-api");
  const chatgptSub = ctx.breakdowns.find((b) => b.toolId === "chatgpt" && !b.isApiTier);
  if (openaiApi && chatgptSub) {
    results.push({
      id: ruleId("api_chatgpt"),
      type: "api-vs-subscription",
      affectedToolIds: ["openai-api", "chatgpt"],
      currentMonthlySpend: openaiApi.reportedMonthlySpend + chatgptSub.reportedMonthlySpend,
      estimatedMonthlySavings: Math.min(openaiApi.reportedMonthlySpend, chatgptSub.reportedMonthlySpend) * 0.3,
      confidence: "low",
      reasoning: `OpenAI API and ChatGPT subscriptions both access GPT-4o models. This split is common in teams with both production applications and interactive usage, but the total spend may exceed what a consolidated approach would require.`,
      action: `Audit which team members use ChatGPT interactively vs. which workflows consume API tokens. If interactive usage is low, the API may cover both needs at lower marginal cost.`,
      sourceUrl: SOURCES.openaiApi,
    });
  }

  return results;
}

// ─── Rule 5: Seat overprovisioning vs team size ───────────────────────────────
/**
 * When the number of provisioned seats across tools significantly exceeds
 * the reported team size, some seats may be unoccupied — a common source
 * of SaaS spend waste found in procurement audits.
 */
export function checkSeatOverprovisioning(ctx: RuleContext): AuditRecommendation[] {
  const results: AuditRecommendation[] = [];
  const { teamSize } = ctx.formData;
  if (!teamSize || Number(teamSize) < 1) return [];

  const team = Number(teamSize);

  for (const bd of ctx.breakdowns) {
    if (bd.isApiTier) continue;

    const catalog = PRICING_CATALOG[bd.toolId];
    const plan = catalog?.plans.find((p) => p.planId === bd.planId);
    if (!plan || plan.monthlyPricePerSeat === null) continue;

    // Flag only when seats > 150% of team size AND excess ≥ 3 seats
    const excess = bd.reportedSeats - team;
    if (excess < 3 || bd.reportedSeats <= team * 1.5) continue;

    const savingsPerSeat = plan.monthlyPricePerSeat;
    const conservativeSavings = savingsPerSeat * Math.floor(excess * 0.7); // assume 70% recoverable

    results.push({
      id: ruleId("seats"),
      type: "reduce-seats",
      affectedToolIds: [bd.toolId],
      currentMonthlySpend: bd.reportedMonthlySpend,
      estimatedMonthlySavings: conservativeSavings,
      confidence: "medium",
      reasoning: `${bd.reportedSeats} ${bd.toolName} ${plan.planLabel} seats are provisioned against a reported team of ${team}. Industry benchmarks suggest SaaS seat utilisation commonly runs 60–80%; ${excess} excess seats at $${savingsPerSeat}/seat represent an unverified but likely spend exposure.`,
      action: `Pull a last-active-login report from the ${bd.toolName} admin console and deprovision seats with no activity in the past 30 days. Even partial reclamation of unused seats would reduce monthly spend.`,
      sourceUrl: catalog.pricingPageUrl,
    });
  }

  return results;
}

// ─── Rule 6: Claude Max for small teams ──────────────────────────────────────
/**
 * Claude Max ($100/seat/mo) provides 20x the usage limits of Claude Pro ($20/seat/mo).
 * For users who do not routinely hit Pro-tier rate limits, Max represents
 * a 5x price premium over a plan that may adequately cover their workload.
 */
export function checkClaudeMaxNecessity(ctx: RuleContext): AuditRecommendation[] {
  const maxEntries = ctx.breakdowns.filter(
    (b) => b.toolId === "claude" && b.planId === "max"
  );
  if (maxEntries.length === 0) return [];

  return maxEntries.map((bd) => ({
    id: ruleId("claude_max"),
    type: "downgrade-plan" as const,
    affectedToolIds: ["claude" as const],
    currentMonthlySpend: bd.reportedMonthlySpend,
    estimatedMonthlySavings: Math.max(0, bd.reportedMonthlySpend - 20 * bd.reportedSeats),
    confidence: "medium" as const,
    reasoning: `Claude Max is priced at $100/seat/mo for users who hit the Pro plan's usage ceiling. For teams that do not consistently reach Pro rate limits, downgrading to Claude Pro ($20/seat/mo) would achieve the same effective throughput at one-fifth the cost.`,
    action: `Review Claude usage dashboards for the past 30 days. If users are not receiving rate-limit warnings on Claude Pro, initiate a trial downgrade to Pro for one month to validate that throughput requirements are met.`,
    sourceUrl: SOURCES.claude,
  }));
}

// ─── Rule 7: High API spend without batch API optimisation ────────────────────
/**
 * Both Anthropic and OpenAI offer a Batch API at 50% off standard token pricing.
 * Teams with API spend above ~$150/mo that run async, non-latency-sensitive workloads
 * may be leaving significant savings unrealised.
 */
export function checkHighApiSpend(ctx: RuleContext): AuditRecommendation[] {
  const results: AuditRecommendation[] = [];
  const HIGH_API_THRESHOLD = 150; // USD/mo

  const apiEntries = ctx.breakdowns.filter(
    (b) => b.isApiTier && b.reportedMonthlySpend >= HIGH_API_THRESHOLD
  );

  for (const bd of apiEntries) {
    const vendorName = bd.toolId === "anthropic-api" ? "Anthropic" : "OpenAI";
    results.push({
      id: ruleId("api_spend"),
      type: "review-api-spend",
      affectedToolIds: [bd.toolId],
      currentMonthlySpend: bd.reportedMonthlySpend,
      estimatedMonthlySavings: Math.round(bd.reportedMonthlySpend * 0.2), // conservative: 20% recoverable via batching
      confidence: "low",
      reasoning: `${vendorName} API spend of $${bd.reportedMonthlySpend}/mo is above the threshold where Batch API discounts (50% on eligible async requests) and prompt-caching strategies typically yield measurable savings for non-latency-sensitive workloads.`,
      action: `Audit the breakdown of ${vendorName} API calls by endpoint and request type. Migrate eligible async/background workloads to the Batch API and evaluate prompt caching for frequently repeated context blocks.`,
      sourceUrl: bd.toolId === "anthropic-api" ? SOURCES.anthropicApi : SOURCES.openaiApi,
    });
  }

  return results;
}

// ─── Rule 8: GitHub Copilot Enterprise for small eng teams ────────────────────
/**
 * GitHub Copilot Enterprise ($39/seat/mo) adds repository-level knowledge bases
 * and fine-tuning on private code. These features provide the most value for
 * large engineering organisations with proprietary codebases.
 */
export function checkCopilotEnterpriseFit(ctx: RuleContext): AuditRecommendation[] {
  const copilot = ctx.breakdowns.find(
    (b) => b.toolId === "github-copilot" && b.planId === "enterprise"
  );
  if (!copilot || copilot.reportedSeats > 20) return []; // Only flag for small teams

  const savingsPerSeat = 39 - 19; // Enterprise vs Business delta
  const saving = savingsPerSeat * copilot.reportedSeats;

  return [
    {
      id: ruleId("copilot_ent"),
      type: "downgrade-plan",
      affectedToolIds: ["github-copilot"],
      currentMonthlySpend: copilot.reportedMonthlySpend,
      estimatedMonthlySavings: saving,
      confidence: "medium",
      reasoning: `GitHub Copilot Enterprise is priced at $39/seat/mo and primarily delivers value through repository-scoped knowledge bases and fine-tuned suggestions on proprietary code — features most impactful at engineering team sizes above 20. At ${copilot.reportedSeats} seats, Copilot Business ($19/seat/mo) provides equivalent core functionality.`,
      action: `Assess whether the Copilot Enterprise knowledge base and fine-tuning features are actively configured and used. If utilisation is low, downgrade to Copilot Business and realise $${saving}/mo in savings.`,
      sourceUrl: SOURCES.githubCopilot,
    },
  ];
}

// ─── Exported rule registry ───────────────────────────────────────────────────
export type RuleFn = (ctx: RuleContext) => AuditRecommendation[];

export const ALL_RULES: RuleFn[] = [
  checkTierRightSize,
  checkDuplicateCodingAssistants,
  checkDuplicateChatAssistants,
  checkApiVsSubscriptionOverlap,
  checkSeatOverprovisioning,
  checkClaudeMaxNecessity,
  checkHighApiSpend,
  checkCopilotEnterpriseFit,
];
