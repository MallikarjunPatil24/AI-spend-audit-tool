"use server";

import { createAudit } from "@/lib/db/audits";
import type { AuditResult } from "@/lib/audit/types";

export async function saveAuditAction(result: AuditResult, aiSummary: string | null) {
  try {
    const { id, publicSlug } = await createAudit(result, aiSummary);
    return { success: true, id, publicSlug };
  } catch (err) {
    console.error("Failed to save audit via Server Action:", err);
    return { success: false, error: "Failed to persist audit" };
  }
}
