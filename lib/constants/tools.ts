import type { AiToolId, UseCase } from "@/types/audit";

export interface PlanConfig {
  id: string;
  label: string;
  priceHint: string;       // shown in UI as hint
  isApiTier?: boolean;     // usage-based, no fixed seat price
  isEnterprise?: boolean;  // custom pricing
}

export interface ToolConfig {
  id: AiToolId;
  name: string;
  vendor: string;
  color: string;
  plans: PlanConfig[];
}

export const TOOL_CONFIGS: ToolConfig[] = [
  {
    id: "cursor",
    name: "Cursor",
    vendor: "Anysphere",
    color: "#6366f1",
    plans: [
      { id: "hobby",      label: "Hobby",      priceHint: "Free" },
      { id: "pro",        label: "Pro",        priceHint: "$20/seat/mo" },
      { id: "business",   label: "Business",   priceHint: "$40/seat/mo" },
      { id: "enterprise", label: "Enterprise", priceHint: "Custom", isEnterprise: true },
    ],
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    vendor: "GitHub (Microsoft)",
    color: "#24292e",
    plans: [
      { id: "individual", label: "Individual", priceHint: "$10/seat/mo" },
      { id: "business",   label: "Business",   priceHint: "$19/seat/mo" },
      { id: "enterprise", label: "Enterprise", priceHint: "$39/seat/mo" },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    vendor: "Anthropic",
    color: "#d97757",
    plans: [
      { id: "free",       label: "Free",       priceHint: "$0" },
      { id: "pro",        label: "Pro",        priceHint: "$20/seat/mo" },
      { id: "max",        label: "Max",        priceHint: "$100/seat/mo" },
      { id: "team",       label: "Team",       priceHint: "$30/seat/mo" },
      { id: "enterprise", label: "Enterprise", priceHint: "Custom", isEnterprise: true },
      { id: "api",        label: "API Direct", priceHint: "Usage-based", isApiTier: true },
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    vendor: "OpenAI",
    color: "#10a37f",
    plans: [
      { id: "plus",       label: "Plus",       priceHint: "$20/seat/mo" },
      { id: "team",       label: "Team",       priceHint: "$30/seat/mo" },
      { id: "enterprise", label: "Enterprise", priceHint: "Custom", isEnterprise: true },
      { id: "api",        label: "API Direct", priceHint: "Usage-based", isApiTier: true },
    ],
  },
  {
    id: "anthropic-api",
    name: "Anthropic API",
    vendor: "Anthropic",
    color: "#d97757",
    plans: [
      { id: "payg", label: "Pay As You Go", priceHint: "Usage-based", isApiTier: true },
    ],
  },
  {
    id: "openai-api",
    name: "OpenAI API",
    vendor: "OpenAI",
    color: "#10a37f",
    plans: [
      { id: "payg", label: "Pay As You Go", priceHint: "Usage-based", isApiTier: true },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    vendor: "Google",
    color: "#4285f4",
    plans: [
      { id: "pro",   label: "Gemini Advanced", priceHint: "$19.99/seat/mo" },
      { id: "ultra", label: "Gemini Ultra",    priceHint: "Custom", isEnterprise: true },
      { id: "api",   label: "API",             priceHint: "Usage-based", isApiTier: true },
    ],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    vendor: "Codeium",
    color: "#5b5fc7",
    plans: [
      { id: "free",  label: "Free",  priceHint: "$0" },
      { id: "pro",   label: "Pro",   priceHint: "$15/seat/mo" },
      { id: "teams", label: "Teams", priceHint: "$35/seat/mo" },
    ],
  },
];

/** Keyed lookup for O(1) access */
export const TOOL_CONFIG_MAP = Object.fromEntries(
  TOOL_CONFIGS.map((t) => [t.id, t])
) as Record<AiToolId, ToolConfig>;

export const USE_CASE_OPTIONS: { value: UseCase; label: string }[] = [
  { value: "coding",        label: "Coding & Development" },
  { value: "writing",       label: "Writing & Content" },
  { value: "research",      label: "Research & Analysis" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "mixed",         label: "Mixed / General Use" },
];
