import { getAdminClient } from "./client";

export interface LeadInput {
  audit_id: string;
  email: string;
  company_name?: string;
  role?: string;
  team_size?: string;
}

/**
 * Inserts a new lead into the database.
 */
export async function createLead(input: LeadInput) {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from("leads")
    .insert({
      audit_id: input.audit_id,
      email: input.email,
      company_name: input.company_name || null,
      role: input.role || null,
      team_size: input.team_size || null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

  if (error) {
    console.error("Failed to insert lead:", error);
    throw new Error("Failed to save lead capture");
  }
}
