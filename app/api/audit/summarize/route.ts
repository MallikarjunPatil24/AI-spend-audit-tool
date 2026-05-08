/**
 * POST /api/audit/summarize
 *
 * Accepts a minimal AuditSummaryInput payload, calls Gemini 1.5 Flash,
 * returns a professional summary or deterministic fallback.
 *
 * Security:
 * - GEMINI_API_KEY is never exposed to the client
 * - Input is validated before being passed to Claude
 * - All errors are absorbed — never returned raw
 *
 * Response always 200: { summary, source, generatedAt }
 */

import { NextRequest, NextResponse } from "next/server";
import { generateAuditSummary } from "@/lib/ai/generate-summary";
import { generateFallbackSummary } from "@/lib/ai/fallback-summary";
import type { AuditSummaryInput } from "@/lib/ai/types";

/** Minimal structural validation — prevents prompt injection via malformed payloads */
function isValidInput(body: unknown): body is AuditSummaryInput {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    Array.isArray(b.toolNames) &&
    typeof b.totalMonthlySpend === "number" &&
    typeof b.totalMonthlySavings === "number" &&
    typeof b.optimizationScore === "number" &&
    Array.isArray(b.topRecommendations)
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        summary: "Unable to process audit data. Please try again.",
        source: "fallback",
        generatedAt: new Date().toISOString(),
      },
      { status: 200 } // always 200 — client handles gracefully
    );
  }

  if (!isValidInput(body)) {
    return NextResponse.json(
      {
        summary: "Audit data could not be validated.",
        source: "fallback",
        generatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  }

  // Sanitise: cap recommendation count to prevent prompt bloat
  const sanitised: AuditSummaryInput = {
    ...body,
    toolNames:           body.toolNames.slice(0, 10).map(String),
    topRecommendations:  body.topRecommendations.slice(0, 3),
    totalMonthlySpend:   Math.max(0, Math.round(body.totalMonthlySpend)),
    totalMonthlySavings: Math.max(0, Math.round(body.totalMonthlySavings)),
    optimizationScore:   Math.min(100, Math.max(0, Math.round(body.optimizationScore))),
  };

  try {
    const result = await generateAuditSummary(sanitised);
    return NextResponse.json(result, { status: 200 });
  } catch {
    // generateAuditSummary should never throw, but belt-and-suspenders
    return NextResponse.json(
      {
        summary:     generateFallbackSummary(sanitised),
        source:      "fallback",
        generatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
