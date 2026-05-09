import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResend() {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      console.warn("Missing RESEND_API_KEY. Email sending will be skipped.");
      return null;
    }
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}
