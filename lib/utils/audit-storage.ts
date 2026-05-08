/**
 * Audit result session storage helpers.
 * Results are written here immediately after runAudit() succeeds
 * and read by the /audit/results page.
 *
 * Step 5 will replace this with Supabase persistence + slug URLs.
 */

import type { AuditResult } from "@/lib/audit/types";

const RESULTS_KEY = "spendscope_result_v1";

export function storeAuditResult(result: AuditResult): void {
  try {
    sessionStorage.setItem(RESULTS_KEY, JSON.stringify(result));
  } catch {
    // sessionStorage unavailable (private mode, quota exceeded) — silent fail
  }
}

export function loadAuditResult(): AuditResult | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(RESULTS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuditResult;
  } catch {
    return null;
  }
}

export function clearAuditResult(): void {
  try {
    sessionStorage.removeItem(RESULTS_KEY);
  } catch { /* ignore */ }
}
