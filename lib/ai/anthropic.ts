/**
 * Thin Anthropic SDK wrapper.
 * Server-side only — never import in client components.
 *
 * Responsibilities:
 * - Initialise the Anthropic client once (singleton)
 * - Enforce a hard timeout on all requests
 * - Surface a typed error for the caller to handle gracefully
 */

import Anthropic from "@anthropic-ai/sdk";

/** Shared client instance (initialised lazily) */
let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }
    _client = new Anthropic({ apiKey });
  }
  return _client;
}

export interface ClaudeTextResponse {
  text: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

/**
 * Calls Claude with a timeout.
 * Throws on API error — callers should catch and use fallback.
 */
export async function callClaude(
  systemPrompt: string,
  userMessage: string,
  options: { maxTokens?: number; timeoutMs?: number } = {}
): Promise<ClaudeTextResponse> {
  const { maxTokens = 300, timeoutMs = 15_000 } = options;

  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const client = getClient();
    const msg = await client.messages.create(
      {
        model:      "claude-3-5-haiku-20241022", // fast, cost-efficient for summaries
        max_tokens: maxTokens,
        system:     systemPrompt,
        messages:   [{ role: "user", content: userMessage }],
      },
      { signal: controller.signal }
    );

    const block = msg.content[0];
    if (!block || block.type !== "text") {
      throw new Error("Claude returned an unexpected response format");
    }

    return {
      text:         block.text.trim(),
      model:        msg.model,
      inputTokens:  msg.usage.input_tokens,
      outputTokens: msg.usage.output_tokens,
    };
  } finally {
    clearTimeout(timeout);
  }
}
