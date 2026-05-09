"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { createLead } from "@/lib/db/leads";
import { sendAuditConfirmation } from "@/lib/email/send";
import { isBot } from "@/lib/security/honeypot";
import { isRateLimited } from "@/lib/security/rate-limit";

const leadSchema = z.object({
  auditId: z.string().uuid(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  companyName: z.string().optional(),
  role: z.string().optional(),
  teamSize: z.string().optional(),
  honeypot: z.string().optional(),
  // Additional info needed for the email:
  totalMonthlySpend: z.number(),
  totalMonthlySavings: z.number(),
  optimizationScore: z.number(),
  aiSummary: z.string().nullable().optional(),
  publicSlug: z.string(),
});

export async function submitLeadAction(formData: FormData) {
  try {
    // 1. IP-based rate limiting
    const ip = (await headers()).get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return { success: false, error: "Too many submissions. Please try again later." };
    }

    // 2. Extract and validate data
    const rawData = {
      auditId: formData.get("auditId"),
      email: formData.get("email"),
      companyName: formData.get("companyName"),
      role: formData.get("role"),
      teamSize: formData.get("teamSize"),
      honeypot: formData.get("_bot_check"),
      totalMonthlySpend: Number(formData.get("totalMonthlySpend")),
      totalMonthlySavings: Number(formData.get("totalMonthlySavings")),
      optimizationScore: Number(formData.get("optimizationScore")),
      aiSummary: formData.get("aiSummary") || null,
      publicSlug: formData.get("publicSlug"),
    };

    const parsed = leadSchema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message || "Validation failed" };
    }

    const data = parsed.data;

    // 3. Honeypot check
    if (isBot(data.honeypot)) {
      // Silently succeed for bots
      return { success: true };
    }

    // 4. Save lead to DB
    await createLead({
      audit_id: data.auditId,
      email: data.email,
      company_name: data.companyName,
      role: data.role,
      team_size: data.teamSize,
    });

    // 5. Send Transactional Email
    await sendAuditConfirmation({
      email: data.email,
      totalMonthlySpend: data.totalMonthlySpend,
      totalMonthlySavings: data.totalMonthlySavings,
      optimizationScore: data.optimizationScore,
      aiSummary: data.aiSummary || null,
      publicSlug: data.publicSlug,
    });

    return { success: true };
  } catch (err) {
    console.error("Lead submission error:", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
