import { getResend } from "./resend";
import { generateAuditConfirmationHtml } from "./templates";

interface SendConfirmationProps {
  email: string;
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  aiSummary: string | null;
  publicSlug: string;
}

export async function sendAuditConfirmation(props: SendConfirmationProps) {
  const resend = getResend();
  
  if (!resend) {
    console.log("Simulating email send in development (no RESEND_API_KEY).");
    return { success: true, messageId: "simulated" };
  }

  try {
    const html = generateAuditConfirmationHtml({
      totalMonthlySpend: props.totalMonthlySpend,
      totalMonthlySavings: props.totalMonthlySavings,
      aiSummary: props.aiSummary,
      publicSlug: props.publicSlug,
    });

    const { data, error } = await resend.emails.send({
      from: "SpendScope <onboarding@resend.dev>", // Testing domain provided by Resend
      to: props.email,
      subject: "Your SpendScope Audit Results & Savings Opportunities",
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error("Failed to send email:", err);
    return { success: false, error: "Internal error sending email" };
  }
}
