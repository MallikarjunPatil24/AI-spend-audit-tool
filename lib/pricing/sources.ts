/**
 * Canonical source URLs and verification metadata for all pricing data.
 * Update VERIFIED_DATE whenever prices are re-confirmed.
 */

export const VERIFIED_DATE = "2025-05-07";

export const SOURCES = {
  cursor:        "https://www.cursor.com/pricing",
  githubCopilot: "https://github.com/features/copilot#pricing",
  claude:        "https://www.anthropic.com/pricing",
  chatgpt:       "https://openai.com/chatgpt/pricing",
  anthropicApi:  "https://www.anthropic.com/api",
  openaiApi:     "https://openai.com/api/pricing",
  gemini:        "https://one.google.com/about/plans",
  windsurf:      "https://codeium.com/windsurf#pricing",
} as const;
