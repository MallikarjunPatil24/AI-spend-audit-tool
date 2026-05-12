import { getAdminClient } from "./client";
import type { Database } from "@/lib/supabase/types";
import type { AuditResult } from "@/lib/audit/types";

type AuditRow = Database["public"]["Tables"]["audits"]["Row"];

/**
 * Generates a random 6-character alphanumeric slug.
 */
function generateSlug(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug = "";
  for (let i = 0; i < 6; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

/**
 * Saves a new audit result to the database and returns the generated slug.
 */
export async function createAudit(
  result: AuditResult,
  aiSummary: string | null
): Promise<{ id: string; publicSlug: string }> {
  const supabase = getAdminClient();
  const public_slug = generateSlug();

  const { data, error } = await supabase
    .from("audits")
    .insert({
      public_slug,
      tools_json: JSON.stringify(result), // Store full immutable snapshot
      total_monthly_spend: result.totalMonthlySpend,
      total_monthly_savings: result.totalMonthlySavings,
      total_annual_savings: result.totalAnnualSavings,
      optimization_score: result.optimizationScore,
      ai_summary: aiSummary,
      is_public: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
    .select("id, public_slug")
    .single();

  if (error) {
    console.error("Failed to insert audit:", error);
    throw new Error("Failed to save audit result");
  }

  return { id: data.id, publicSlug: data.public_slug };
}

/**
 * Fetches a public audit by slug.
 */
export async function getAuditBySlug(slug: string): Promise<AuditRow | null> {
  let supabase: ReturnType<typeof getAdminClient>;

  try {
    supabase = getAdminClient();
  } catch (error) {
    console.error("Unable to create Supabase admin client:", error);
    return null;
  }

  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("public_slug", slug)
    .eq("is_public", true)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}
