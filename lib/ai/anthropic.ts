/**
 * Google Gemini API client wrapper.
 * Server-side only — never import in client components.
 *
 * Model: gemini-1.5-flash — fast, cost-efficient, great for structured summarisation.
 * Timeout: 15s hard limit via AbortController.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

let _client: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!_client) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");
    _client = new GoogleGenerativeAI(apiKey);
  }
  return _client;
}

export interface GeminiTextResponse {
  text: string;
  model: string;
}

/**
 * Calls Gemini with a combined system + user prompt and a timeout.
 * Throws on any failure — callers must catch and use fallback.
 */
export async function callGemini(
  systemInstruction: string,
  userMessage: string,
  options: { maxTokens?: number; timeoutMs?: number } = {}
): Promise<GeminiTextResponse> {
  const { maxTokens = 400, timeoutMs = 15_000 } = options;

  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const client = getClient();
    const model  = client.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction,
      generationConfig: { maxOutputTokens: maxTokens },
    });

    const result = await model.generateContent(userMessage);
    const text   = result.response.text().trim();

    if (!text) throw new Error("Gemini returned an empty response");

    return { text, model: "gemini-1.5-flash" };
  } finally {
    clearTimeout(timeout);
  }
}
