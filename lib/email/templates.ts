import { formatCurrency, formatAnnual } from "@/lib/formatters/currency";

interface AuditConfirmationTemplateProps {
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  aiSummary: string | null;
  publicSlug: string;
}

export function generateAuditConfirmationHtml({
  totalMonthlySpend,
  totalMonthlySavings,
  aiSummary,
  publicSlug,
}: AuditConfirmationTemplateProps): string {
  const isHighSavings = totalMonthlySavings >= 500;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://spendscope.app";
  const publicLink = `${baseUrl}/audit/${publicSlug}`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; background-color: #f5f5f5; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.05); }
        .header { text-align: center; margin-bottom: 32px; }
        .logo { color: #E85D4A; font-size: 24px; font-weight: 800; letter-spacing: -0.04em; text-decoration: none; }
        .title { font-size: 20px; font-weight: 700; margin-top: 16px; margin-bottom: 8px; }
        .stats { display: flex; gap: 16px; margin-bottom: 24px; }
        .stat-box { flex: 1; background: #f9f9f9; padding: 16px; border-radius: 8px; text-align: center; border: 1px solid #e5e5e5; }
        .stat-label { font-size: 12px; color: #737373; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
        .stat-value { font-size: 24px; font-weight: 800; color: #1a1a1a; margin-top: 4px; }
        .savings-value { color: #E85D4A; }
        .summary { background: #eef2ff; border: 1px solid #c7d2fe; padding: 16px; border-radius: 8px; font-size: 14px; margin-bottom: 24px; color: #3730a3; }
        .button-container { text-align: center; margin-top: 32px; margin-bottom: 32px; }
        .button { background: #4F46E5; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block; }
        .credits { background: #f8fafc; padding: 16px; border-radius: 8px; font-size: 13px; color: #6B7280; margin-top: 24px; border-left: 4px solid #4F46E5; }
        .footer { text-align: center; margin-top: 32px; font-size: 12px; color: #a3a3a3; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <a href="${baseUrl}" class="logo">spendscope.</a>
          <h1 class="title">Your AI Tool Spend Audit is Ready</h1>
          <p style="color: #737373; font-size: 15px; margin-top: 0;">We've analyzed your stack and found optimization opportunities.</p>
        </div>

        <div class="stats">
          <div class="stat-box">
            <div class="stat-label">Total Spend</div>
            <div class="stat-value">${formatCurrency(totalMonthlySpend)}<span style="font-size: 12px; color: #737373; font-weight: 500;">/mo</span></div>
          </div>
          <div class="stat-box" style="border-color: #fca99e;">
            <div class="stat-label">Potential Savings</div>
            <div class="stat-value savings-value">${formatCurrency(totalMonthlySavings)}<span style="font-size: 12px; color: #737373; font-weight: 500;">/mo</span></div>
          </div>
        </div>

        ${aiSummary ? `
        <div class="summary">
          <strong>Executive Summary:</strong><br>
          ${aiSummary}
        </div>
        ` : ""}

        <div class="button-container">
          <a href="${publicLink}" class="button">View Full Report & Recommendations</a>
        </div>

        ${isHighSavings ? `
        <div class="credits">
          <strong>Pro tip:</strong> With savings this high (${formatAnnual(totalMonthlySavings * 12)}/yr), 
          infrastructure credits or committed-use discounts could reduce your bottom line further.
        </div>
        ` : ""}

        <div class="footer">
          You requested this audit from <a href="${baseUrl}" style="color: #a3a3a3;">SpendScope</a>.<br>
          We do not share your private data.
        </div>
      </div>
    </body>
    </html>
  `;
}
