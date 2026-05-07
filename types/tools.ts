import type { AiToolId } from "./audit";

/** Static metadata for each supported AI tool */
export interface AiTool {
  id: AiToolId;
  name: string;
  vendor: string;
  category: "ide-assistant" | "chat" | "api" | "code-review";
  logoUrl?: string;
  color: string; // brand color for UI
  plans: AiToolPlan[];
  website: string;
  description: string;
}

/** A pricing plan offered by a tool */
export interface AiToolPlan {
  id: string;
  name: string;
  monthlyPricePerSeat: number;
  annualPricePerSeat?: number;
  features: string[];
  isPopular?: boolean;
}

/** Catalog entry — combined tool + selected plan for display */
export interface AiToolCatalogEntry extends AiTool {
  selectedPlan?: AiToolPlan;
}

/** Static catalog — will be populated in Step 2 */
export const AI_TOOLS: Record<AiToolId, AiTool> = {
  cursor: {
    id: "cursor",
    name: "Cursor",
    vendor: "Anysphere",
    category: "ide-assistant",
    color: "#000000",
    plans: [],
    website: "https://cursor.sh",
    description: "AI-powered code editor",
  },
  "github-copilot": {
    id: "github-copilot",
    name: "GitHub Copilot",
    vendor: "GitHub (Microsoft)",
    category: "ide-assistant",
    color: "#24292E",
    plans: [],
    website: "https://github.com/features/copilot",
    description: "AI pair programmer by GitHub",
  },
  claude: {
    id: "claude",
    name: "Claude",
    vendor: "Anthropic",
    category: "chat",
    color: "#D4A96A",
    plans: [],
    website: "https://claude.ai",
    description: "Anthropic's conversational AI",
  },
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    vendor: "OpenAI",
    category: "chat",
    color: "#10A37F",
    plans: [],
    website: "https://chat.openai.com",
    description: "OpenAI's conversational AI",
  },
  "anthropic-api": {
    id: "anthropic-api",
    name: "Anthropic API",
    vendor: "Anthropic",
    category: "api",
    color: "#D4A96A",
    plans: [],
    website: "https://anthropic.com",
    description: "Direct API access to Claude models",
  },
  "openai-api": {
    id: "openai-api",
    name: "OpenAI API",
    vendor: "OpenAI",
    category: "api",
    color: "#10A37F",
    plans: [],
    website: "https://platform.openai.com",
    description: "Direct API access to GPT models",
  },
  gemini: {
    id: "gemini",
    name: "Gemini",
    vendor: "Google",
    category: "chat",
    color: "#4285F4",
    plans: [],
    website: "https://gemini.google.com",
    description: "Google's multimodal AI",
  },
  windsurf: {
    id: "windsurf",
    name: "Windsurf",
    vendor: "Codeium",
    category: "ide-assistant",
    color: "#5B5FC7",
    plans: [],
    website: "https://codeium.com/windsurf",
    description: "Agentic AI code editor",
  },
  v0: {
    id: "v0",
    name: "v0",
    vendor: "Vercel",
    category: "ide-assistant",
    color: "#000000",
    plans: [],
    website: "https://v0.dev",
    description: "Vercel's AI UI generator",
  },
};
