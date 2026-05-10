/**
 * Main summary generator — server-side only.
 *
 * Flow:
 * 1. Check GEMINI_API_KEY — skip to fallback if missing
 * 2. Try Gemini 1.5 Flash (15s timeout)
 * 3. Validate response length (reject < 40 or > 800 chars)
 * 4. Any failure → deterministic fallback (never throws)
 */

import type { AuditSummaryInput, AuditSummaryResponse } from "./types";
import { callGemini } from "./anthropic";           // reuses same file, now Gemini
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import { generateFallbackSummary } from "./fallback-summary";

const MIN_SUMMARY_LENGTH = 40;
const MAX_SUMMARY_LENGTH = 1600;

function isValidSummary(text: string): boolean {
  const len = text.trim().length;
  return len >= MIN_SUMMARY_LENGTH && len <= MAX_SUMMARY_LENGTH;
}

export async function generateAuditSummary(
  input: AuditSummaryInput
): Promise<AuditSummaryResponse> {
  const generatedAt = new Date().toISOString();

  if (!process.env.GEMINI_API_KEY) {
    return { summary: generateFallbackSummary(input), source: "fallback", generatedAt };
  }

  try {
    const response = await callGemini(
      SYSTEM_PROMPT,
      buildUserPrompt(input),
      { maxTokens: 800, timeoutMs: 15_000 }
    );

    if (!isValidSummary(response.text)) {
      throw new Error(`Invalid summary length: ${response.text.length} chars`);
    }

    return { summary: response.text, source: "ai", generatedAt };
  } catch {
    return { summary: generateFallbackSummary(input), source: "fallback", generatedAt };
  }
}
