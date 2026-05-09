"use client";

import { useState } from "react";
import { submitLeadAction } from "@/app/actions/submit-lead";
import { SuccessState } from "./SuccessState";
import { Loader2, ArrowRight } from "lucide-react";
import type { AuditResult } from "@/lib/audit/types";

interface LeadFormProps {
  auditId: string;
  publicSlug: string;
  result: AuditResult;
  aiSummary: string | null;
}

export function LeadForm({ auditId, publicSlug, result, aiSummary }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isHighSavings = result.totalMonthlySavings >= 500;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    formData.append("auditId", auditId);
    formData.append("publicSlug", publicSlug);
    formData.append("totalMonthlySpend", result.totalMonthlySpend.toString());
    formData.append("totalMonthlySavings", result.totalMonthlySavings.toString());
    formData.append("optimizationScore", result.optimizationScore.toString());
    if (aiSummary) formData.append("aiSummary", aiSummary);

    const response = await submitLeadAction(formData);

    if (response.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(response.error || "Something went wrong.");
    }
  }

  if (status === "success") {
    return <SuccessState />;
  }

  return (
    <div className="card-white p-6 sm:p-8">
      <div className="mb-6 text-center sm:text-left">
        <h3 className="text-[1.1rem] font-extrabold tracking-tight text-foreground mb-2">
          Want a copy of this report?
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isHighSavings
            ? "Credex may help reduce these costs further through discounted AI infrastructure credits. Get your report and see if you qualify."
            : "Get notified when new optimization opportunities apply to your stack."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - visually hidden, prevents bots */}
        <div aria-hidden="true" className="hidden">
          <input type="text" name="_bot_check" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="email" className="text-sm font-semibold text-foreground">
              Work Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@startup.com"
              className="flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="companyName" className="text-sm font-semibold text-foreground">
              Company (Optional)
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Acme Corp"
              className="flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="role" className="text-sm font-semibold text-foreground">
              Role (Optional)
            </label>
            <input
              type="text"
              id="role"
              name="role"
              placeholder="CTO, Founder, etc."
              className="flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        {status === "error" && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
            {errorMessage}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full sm:w-auto"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send me my report
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
