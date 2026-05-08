/**
 * Real-world pricing data for all 8 supported AI tools.
 *
 * All prices are in USD per seat per month unless noted.
 * Every entry includes sourceUrl + verifiedDate for audit traceability.
 * Enterprise/custom plans are represented as monthlyPricePerSeat: null.
 *
 * Sources: vendor pricing pages verified 2025-05-07
 */

import type { PricingCatalog } from "./types";
import { SOURCES, VERIFIED_DATE } from "./sources";

export const PRICING_CATALOG: PricingCatalog = {
  // ─── Cursor ───────────────────────────────────────────────────────────────
  // Source: https://www.cursor.com/pricing  (verified 2025-05-07)
  cursor: {
    toolId: "cursor",
    toolName: "Cursor",
    vendorUrl: "https://www.cursor.com",
    pricingPageUrl: SOURCES.cursor,
    plans: [
      {
        planId: "hobby",
        planLabel: "Hobby",
        monthlyPricePerSeat: 0,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.cursor,
        verifiedDate: VERIFIED_DATE,
        notes: "Limited completions/requests; no team features",
      },
      {
        planId: "pro",
        planLabel: "Pro",
        monthlyPricePerSeat: 20,
        annualPricePerSeatMonthly: 16, // $192/yr billed annually
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.cursor,
        verifiedDate: VERIFIED_DATE,
        notes: "500 fast requests/mo; most teams use this tier",
      },
      {
        planId: "business",
        planLabel: "Business",
        monthlyPricePerSeat: 40,
        annualPricePerSeatMonthly: 32,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.cursor,
        verifiedDate: VERIFIED_DATE,
        notes: "SSO, admin dashboard, usage analytics, SAML — primarily useful for larger orgs",
      },
      {
        planId: "enterprise",
        planLabel: "Enterprise",
        monthlyPricePerSeat: null,
        isApiTier: false,
        isEnterprise: true,
        sourceUrl: SOURCES.cursor,
        verifiedDate: VERIFIED_DATE,
        notes: "Custom contracts; on-prem options; dedicated support",
      },
    ],
  },

  // ─── GitHub Copilot ───────────────────────────────────────────────────────
  // Source: https://github.com/features/copilot#pricing  (verified 2025-05-07)
  "github-copilot": {
    toolId: "github-copilot",
    toolName: "GitHub Copilot",
    vendorUrl: "https://github.com",
    pricingPageUrl: SOURCES.githubCopilot,
    plans: [
      {
        planId: "individual",
        planLabel: "Individual",
        monthlyPricePerSeat: 10,
        annualPricePerSeatMonthly: 8.33, // $100/yr
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.githubCopilot,
        verifiedDate: VERIFIED_DATE,
        notes: "No admin controls; suitable for solo devs",
      },
      {
        planId: "business",
        planLabel: "Business",
        monthlyPricePerSeat: 19,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.githubCopilot,
        verifiedDate: VERIFIED_DATE,
        notes: "Policy management, audit logs, IP indemnity — justified for teams ≥5",
      },
      {
        planId: "enterprise",
        planLabel: "Enterprise",
        monthlyPricePerSeat: 39,
        isApiTier: false,
        isEnterprise: false, // fixed price, not custom
        sourceUrl: SOURCES.githubCopilot,
        verifiedDate: VERIFIED_DATE,
        notes: "Fine-tuning on private repos, knowledge bases — justified for large eng orgs",
      },
    ],
  },

  // ─── Claude ───────────────────────────────────────────────────────────────
  // Source: https://www.anthropic.com/pricing  (verified 2025-05-07)
  claude: {
    toolId: "claude",
    toolName: "Claude",
    vendorUrl: "https://www.anthropic.com",
    pricingPageUrl: SOURCES.claude,
    plans: [
      {
        planId: "free",
        planLabel: "Free",
        monthlyPricePerSeat: 0,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.claude,
        verifiedDate: VERIFIED_DATE,
        notes: "Limited daily usage; access to Claude 3.5 Haiku",
      },
      {
        planId: "pro",
        planLabel: "Pro",
        monthlyPricePerSeat: 20,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.claude,
        verifiedDate: VERIFIED_DATE,
        notes: "5x more usage than Free; access to Claude 3.7 Sonnet and Opus",
      },
      {
        planId: "max",
        planLabel: "Max",
        monthlyPricePerSeat: 100,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.claude,
        verifiedDate: VERIFIED_DATE,
        notes: "20x usage of Pro ($100) or 5x Pro ($200 tier) — for power users only",
      },
      {
        planId: "team",
        planLabel: "Team",
        monthlyPricePerSeat: 30,
        minSeats: 5,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.claude,
        verifiedDate: VERIFIED_DATE,
        notes: "Minimum 5 seats; includes admin console and billing management",
      },
      {
        planId: "enterprise",
        planLabel: "Enterprise",
        monthlyPricePerSeat: null,
        isApiTier: false,
        isEnterprise: true,
        sourceUrl: SOURCES.claude,
        verifiedDate: VERIFIED_DATE,
        notes: "SSO, custom context windows, priority support — requires Anthropic sales contact",
      },
      {
        planId: "api",
        planLabel: "API Direct",
        monthlyPricePerSeat: null,
        isApiTier: true,
        isEnterprise: false,
        sourceUrl: SOURCES.anthropicApi,
        verifiedDate: VERIFIED_DATE,
        notes: "Claude 3.7 Sonnet: $3/MTok input, $15/MTok output. Usage-based billing.",
      },
    ],
  },

  // ─── ChatGPT ──────────────────────────────────────────────────────────────
  // Source: https://openai.com/chatgpt/pricing  (verified 2025-05-07)
  chatgpt: {
    toolId: "chatgpt",
    toolName: "ChatGPT",
    vendorUrl: "https://openai.com",
    pricingPageUrl: SOURCES.chatgpt,
    plans: [
      {
        planId: "plus",
        planLabel: "Plus",
        monthlyPricePerSeat: 20,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.chatgpt,
        verifiedDate: VERIFIED_DATE,
        notes: "GPT-4o access; extended message limits; DALL-E 3; suitable for individuals",
      },
      {
        planId: "team",
        planLabel: "Team",
        monthlyPricePerSeat: 30,
        annualPricePerSeatMonthly: 25, // $300/seat/yr
        minSeats: 2,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.chatgpt,
        verifiedDate: VERIFIED_DATE,
        notes: "Admin workspace, usage analytics, data not used for training. Min 2 seats.",
      },
      {
        planId: "enterprise",
        planLabel: "Enterprise",
        monthlyPricePerSeat: null,
        isApiTier: false,
        isEnterprise: true,
        sourceUrl: SOURCES.chatgpt,
        verifiedDate: VERIFIED_DATE,
        notes: "SSO, custom GPTs, 128k context, audit logs, custom data retention",
      },
      {
        planId: "api",
        planLabel: "API Direct",
        monthlyPricePerSeat: null,
        isApiTier: true,
        isEnterprise: false,
        sourceUrl: SOURCES.openaiApi,
        verifiedDate: VERIFIED_DATE,
        notes: "GPT-4o: $2.50/MTok input, $10/MTok output. Usage-based billing.",
      },
    ],
  },

  // ─── Anthropic API ────────────────────────────────────────────────────────
  // Source: https://www.anthropic.com/api  (verified 2025-05-07)
  "anthropic-api": {
    toolId: "anthropic-api",
    toolName: "Anthropic API",
    vendorUrl: "https://www.anthropic.com",
    pricingPageUrl: SOURCES.anthropicApi,
    plans: [
      {
        planId: "payg",
        planLabel: "Pay As You Go",
        monthlyPricePerSeat: null,
        isApiTier: true,
        isEnterprise: false,
        sourceUrl: SOURCES.anthropicApi,
        verifiedDate: VERIFIED_DATE,
        notes: "Claude 3.7 Sonnet: $3/MTok input, $15/MTok output. Claude 3.5 Haiku: $0.80/$4. Batch API 50% discount.",
      },
    ],
  },

  // ─── OpenAI API ───────────────────────────────────────────────────────────
  // Source: https://openai.com/api/pricing  (verified 2025-05-07)
  "openai-api": {
    toolId: "openai-api",
    toolName: "OpenAI API",
    vendorUrl: "https://openai.com",
    pricingPageUrl: SOURCES.openaiApi,
    plans: [
      {
        planId: "payg",
        planLabel: "Pay As You Go",
        monthlyPricePerSeat: null,
        isApiTier: true,
        isEnterprise: false,
        sourceUrl: SOURCES.openaiApi,
        verifiedDate: VERIFIED_DATE,
        notes: "GPT-4o: $2.50/MTok input, $10/MTok output. GPT-4o-mini: $0.15/$0.60. Batch API 50% discount.",
      },
    ],
  },

  // ─── Gemini ───────────────────────────────────────────────────────────────
  // Source: https://one.google.com/about/plans  (verified 2025-05-07)
  gemini: {
    toolId: "gemini",
    toolName: "Gemini",
    vendorUrl: "https://gemini.google.com",
    pricingPageUrl: SOURCES.gemini,
    plans: [
      {
        planId: "pro",
        planLabel: "Gemini Advanced",
        monthlyPricePerSeat: 19.99,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.gemini,
        verifiedDate: VERIFIED_DATE,
        notes: "Google One AI Premium; includes 2TB storage + Gemini 1.5 Pro access",
      },
      {
        planId: "ultra",
        planLabel: "Gemini Ultra / Enterprise",
        monthlyPricePerSeat: null,
        isApiTier: false,
        isEnterprise: true,
        sourceUrl: SOURCES.gemini,
        verifiedDate: VERIFIED_DATE,
        notes: "Available through Google Workspace Business/Enterprise tiers",
      },
      {
        planId: "api",
        planLabel: "API",
        monthlyPricePerSeat: null,
        isApiTier: true,
        isEnterprise: false,
        sourceUrl: SOURCES.gemini,
        verifiedDate: VERIFIED_DATE,
        notes: "Gemini 1.5 Pro: $3.50/MTok input (>128k: $7), $10.50/MTok output. Free tier available.",
      },
    ],
  },

  // ─── Windsurf ─────────────────────────────────────────────────────────────
  // Source: https://codeium.com/windsurf#pricing  (verified 2025-05-07)
  windsurf: {
    toolId: "windsurf",
    toolName: "Windsurf",
    vendorUrl: "https://codeium.com",
    pricingPageUrl: SOURCES.windsurf,
    plans: [
      {
        planId: "free",
        planLabel: "Free",
        monthlyPricePerSeat: 0,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.windsurf,
        verifiedDate: VERIFIED_DATE,
        notes: "Limited Flows/completions; no team admin",
      },
      {
        planId: "pro",
        planLabel: "Pro",
        monthlyPricePerSeat: 15,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.windsurf,
        verifiedDate: VERIFIED_DATE,
        notes: "Unlimited completions, 500 Flow credits/mo; value alternative to Cursor Pro",
      },
      {
        planId: "teams",
        planLabel: "Teams",
        monthlyPricePerSeat: 35,
        isApiTier: false,
        isEnterprise: false,
        sourceUrl: SOURCES.windsurf,
        verifiedDate: VERIFIED_DATE,
        notes: "Team admin, centralized billing, SSO — justified for orgs with admin overhead",
      },
    ],
  },
};

/** Retrieve a specific plan's pricing data, or undefined if not found */
export function getPlanPricing(toolId: string, planId: string) {
  const tool = PRICING_CATALOG[toolId as keyof typeof PRICING_CATALOG];
  if (!tool) return undefined;
  return tool.plans.find((p) => p.planId === planId);
}

/** Calculate expected monthly cost for a tool entry */
export function expectedMonthlyCost(
  toolId: string,
  planId: string,
  seats: number
): number | null {
  const plan = getPlanPricing(toolId, planId);
  if (!plan || plan.monthlyPricePerSeat === null) return null;
  return plan.monthlyPricePerSeat * seats;
}
