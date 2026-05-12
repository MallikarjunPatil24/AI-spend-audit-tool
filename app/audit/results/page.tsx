"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Share2 } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { SavingsHero } from "@/components/results/SavingsHero";
import { OptimizationScore } from "@/components/results/OptimizationScore";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { ToolBreakdownCard } from "@/components/results/ToolBreakdownCard";
import { ResultsSkeleton } from "@/components/results/ResultsSkeleton";
import { loadAuditResult } from "@/lib/utils/audit-storage";
import { buildSummaryInput } from "@/lib/ai/types";
import { LeadForm } from "@/components/leads/LeadForm";
import { saveAuditAction } from "@/app/actions/save-audit";
import type { AuditResult } from "@/lib/audit/types";
import type { AuditSummaryResponse } from "@/lib/ai/types";
import { formatMonthly } from "@/lib/formatters/currency";

// ─── Share helper ─────────────────────────────────────────────────────────────

function handleShare(slug: string | null, result: AuditResult) {
  const url = slug ? `https://spendscope.app/audit/${slug}` : "https://spendscope.app/audit";
  const text = `I audited my team's AI stack with SpendScope — found ${formatMonthly(result.totalMonthlySavings)} in potential savings (score: ${result.optimizationScore}/100). Check it out: ${url}`;
  
  if (typeof navigator !== "undefined" && navigator.share) {
    navigator.share({ title: "My SpendScope Audit", text, url }).catch(() => null);
  } else {
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!")).catch(() => null);
  }
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-5">
      <div className="text-center max-w-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5">
          <RotateCcw className="h-7 w-7 text-primary" strokeWidth={1.5} />
        </div>
        <h1 className="text-xl font-extrabold tracking-tight text-foreground mb-2">
          No audit found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Your session may have expired or you navigated here directly.
          Run a fresh audit to see your results.
        </p>
        <Link href="/audit" className="btn-primary justify-center">
          Start my audit
        </Link>
      </div>
    </main>
  );
}

// ─── Results Page ─────────────────────────────────────────────────────────────

export default function AuditResultsPage() {
  const [result,    setResult]    = useState<AuditResult | null | "loading">("loading");
  const [aiSummary, setAiSummary] = useState<AuditSummaryResponse | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  
  // DB State
  const [dbStatus, setDbStatus] = useState<"pending" | "saving" | "saved" | "error">("pending");
  const [auditId, setAuditId] = useState<string | null>(null);
  const [publicSlug, setPublicSlug] = useState<string | null>(null);

  // Load audit result from sessionStorage
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult(loadAuditResult());
  }, []);

  // Fire AI summary fetch once the result is available
  useEffect(() => {
    if (!result || result === "loading") return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingAi(true);

    const input = buildSummaryInput(result);

    fetch("/api/audit/summarize", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(input),
    })
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json() as Promise<AuditSummaryResponse>;
      })
      .then((data) => {
        setAiSummary(data);
        return data;
      })
      .catch(() => {
        // Silently ignore — engine summary already shown
        return null;
      })
      .finally(() => {
        setLoadingAi(false);
      });
  }, [result]);

  // Save to DB after AI summary resolves (or immediately if it failed)
  useEffect(() => {
    if (!result || result === "loading" || loadingAi || dbStatus !== "pending") return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDbStatus("saving");
    
    saveAuditAction(result, aiSummary?.summary || null)
      .then((res) => {
        if (res.success && res.id && res.publicSlug) {
          setAuditId(res.id);
          setPublicSlug(res.publicSlug);
          setDbStatus("saved");
        } else {
          setDbStatus("error");
        }
      })
      .catch(() => setDbStatus("error"));
  }, [result, loadingAi, aiSummary, dbStatus]);

  return (
    <>
      <Navbar />
      <main>
        {result === "loading" ? (
          <ResultsSkeleton />
        ) : result === null ? (
          <EmptyState />
        ) : (
          <>
            {/* ── Hero ── */}
            <SavingsHero result={result} />

            {/* ── Body ── */}
            <div className="mx-auto max-w-4xl px-5 sm:px-8 py-10 sm:py-14 space-y-10">

              {/* Score + AI Summary */}
              <OptimizationScore
                score={result.optimizationScore}
                engineSummary={result.summary}
                aiSummary={aiSummary}
                isLoadingAi={loadingAi}
              />

              {/* Recommendations */}
              <section aria-labelledby="rec-heading">
                <div className="mb-5 flex items-center justify-between">
                  <h2
                    id="rec-heading"
                    className="text-[1.1rem] font-extrabold tracking-tight text-foreground"
                  >
                    Recommendations
                    <span className="ml-2 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      {result.recommendations.filter((r) => r.type !== "already-optimized").length || 1}
                    </span>
                  </h2>
                </div>
                <div className="flex flex-col gap-4">
                  {result.recommendations.map((rec, i) => (
                    <RecommendationCard key={rec.id} rec={rec} index={i} />
                  ))}
                </div>
              </section>

              {/* Tool Breakdown */}
              {result.toolBreakdowns.length > 0 && (
                <section aria-labelledby="tools-heading">
                  <h2
                    id="tools-heading"
                    className="text-[1.1rem] font-extrabold tracking-tight text-foreground mb-5"
                  >
                    Tool Breakdown
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {result.toolBreakdowns.map((bd) => (
                      <ToolBreakdownCard key={`${bd.toolId}-${bd.planId}`} breakdown={bd} />
                    ))}
                  </div>
                </section>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                  <Link href="/audit" className="btn-outline gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Edit my audit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleShare(publicSlug, result)}
                    className="btn-outline gap-2"
                    aria-label="Share these results"
                  >
                    <Share2 className="h-4 w-4" />
                    Share results
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground text-center sm:text-right">
                  Verified {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                </p>
              </div>

              {/* Lead Capture */}
              {auditId && publicSlug && (
                <section aria-labelledby="lead-heading">
                  <LeadForm 
                    auditId={auditId} 
                    publicSlug={publicSlug} 
                    result={result} 
                    aiSummary={aiSummary?.summary || null} 
                  />
                </section>
              )}

              {/* Disclaimer */}
              <div className="rounded-lg border border-border bg-muted/30 px-5 py-4">
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Disclaimer:</strong> SpendScope uses publicly
                  available vendor pricing and conservative estimation logic. Actual savings may vary
                  depending on contractual terms, usage patterns, and billing cycles. AI-generated summaries
                  reference only data you provided and do not constitute financial or procurement advice.
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
