/**
 * Main summary generator — server-side only.
 *
 * Flow:
 * 1. Try Claude API (15s timeout)
 * 2. Validate response length (reject if < 40 chars or > 800 chars)
 * 3. On any failure → deterministic fallback (never throws)
 *
 * This function NEVER surfaces raw errors to callers.
 * It always returns a professional summary with a source tag.
 */

import type { AuditSummaryInput, AuditSummaryResponse } from "./types";
import { callClaude } from "./anthropic";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import { generateFallbackSummary } from "./fallback-summary";

const MIN_SUMMARY_LENGTH = 40;
const MAX_SUMMARY_LENGTH = 800;

function isValidSummary(text: string): boolean {
  const len = text.trim().length;
  return len >= MIN_SUMMARY_LENGTH && len <= MAX_SUMMARY_LENGTH;
}

export async function generateAuditSummary(
  input: AuditSummaryInput
): Promise<AuditSummaryResponse> {
  const generatedAt = new Date().toISOString();

  // ── Skip API call if key is not configured ─────────────────────────────
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      summary:     generateFallbackSummary(input),
      source:      "fallback",
      generatedAt,
    };
  }

  // ── Try Claude ──────────────────────────────────────────────────────────
  try {
    const response = await callClaude(
      SYSTEM_PROMPT,
      buildUserPrompt(input),
      { maxTokens: 300, timeoutMs: 15_000 }
    );

    if (!isValidSummary(response.text)) {
      throw new Error(`Summary failed length validation: ${response.text.length} chars`);
    }

    return {
      summary:     response.text,
      source:      "ai",
      generatedAt,
    };
  } catch {
    // Any API error, timeout, or validation failure → fallback
    // Never expose the raw error to the caller
    return {
      summary:     generateFallbackSummary(input),
      source:      "fallback",
      generatedAt,
    };
  }
}
