import { getResend } from "./resend";
import { generateAuditConfirmationHtml } from "./templates";

interface SendConfirmationProps {
  email: string;
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  aiSummary: string | null;
  publicSlug: string;
}

type SendConfirmationResult =
  | { success: true; messageId: string; simulated?: boolean }
  | { success: false; error: string };

export async function sendAuditConfirmation(props: SendConfirmationProps) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL ?? "SpendScope <onboarding@resend.dev>";
  
  if (!resend) {
    const message = "RESEND_API_KEY is not configured. Email send was simulated.";
    console.warn("[SpendScope email]", message, { to: props.email });

    if (process.env.NODE_ENV === "production") {
      return { success: false, error: message } satisfies SendConfirmationResult;
    }

    return { success: true, messageId: "simulated", simulated: true } satisfies SendConfirmationResult;
  }

  try {
    const html = generateAuditConfirmationHtml({
      totalMonthlySpend: props.totalMonthlySpend,
      totalMonthlySavings: props.totalMonthlySavings,
      aiSummary: props.aiSummary,
      publicSlug: props.publicSlug,
    });

    const { data, error } = await resend.emails.send({
      from,
      to: props.email,
      subject: "Your SpendScope Audit Results & Savings Opportunities",
      html,
    });

    if (error) {
      console.error("[SpendScope email] Resend send failed:", {
        to: props.email,
        from,
        message: error.message,
        name: error.name,
      });
      return { success: false, error: error.message } satisfies SendConfirmationResult;
    }

    console.log("[SpendScope email] Email sent successfully:", {
      to: props.email,
      from,
      messageId: data?.id,
    });

    return {
      success: true,
      messageId: data?.id ?? "unknown",
    } satisfies SendConfirmationResult;
  } catch (err) {
    console.error("[SpendScope email] Unexpected email failure:", {
      to: props.email,
      from,
      error: err,
    });
    return { success: false, error: "Internal error sending email" } satisfies SendConfirmationResult;
  }
}
