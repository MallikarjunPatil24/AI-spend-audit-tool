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
import type { AuditResult } from "@/lib/audit/types";
import { formatMonthly } from "@/lib/formatters/currency";

// ─── Share helper ─────────────────────────────────────────────────────────────

function handleShare(result: AuditResult) {
  const text = `I just audited my team's AI stack with SpendScope and found ${formatMonthly(result.totalMonthlySavings)} in potential savings (score: ${result.optimizationScore}/100). Try it free → https://spendscope.app/audit`;
  if (navigator.share) {
    navigator.share({ title: "My SpendScope Audit", text });
  } else {
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
  }
}

// ─── Empty / Error States ─────────────────────────────────────────────────────

function EmptyState() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-5">
      <div className="text-center max-w-sm">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ background: "rgba(232,93,74,0.08)", border: "1px solid rgba(232,93,74,0.15)" }}
        >
          <RotateCcw className="h-7 w-7 text-primary" strokeWidth={1.5} />
        </div>
        <h1 className="text-xl font-extrabold tracking-tight text-foreground mb-2">
          No audit found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          It looks like your session expired or you navigated here directly.
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
  const [result, setResult] = useState<AuditResult | null | "loading">("loading");

  useEffect(() => {
    setResult(loadAuditResult());
  }, []);

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

              {/* Score + Summary */}
              <OptimizationScore
                score={result.optimizationScore}
                summary={result.summary}
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
                    Your Tool Breakdown
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
                <div className="flex items-center gap-3">
                  <Link href="/audit" className="btn-outline gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Edit my audit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleShare(result)}
                    className="btn-outline gap-2"
                    aria-label="Share these results"
                  >
                    <Share2 className="h-4 w-4" />
                    Share results
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground text-center">
                  Results are estimates based on public pricing verified {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}.
                  Always verify with your vendor before making plan changes.
                </p>
              </div>

              {/* Disclaimer */}
              <div
                className="rounded-2xl px-5 py-4"
                style={{ background: "rgba(232,93,74,0.04)", border: "1px solid rgba(232,93,74,0.10)" }}
              >
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Disclaimer:</strong> SpendScope uses publicly
                  available vendor pricing and conservative estimation logic. Actual savings may vary
                  depending on contractual terms, usage patterns, and billing cycles. Recommendations
                  are informational only and do not constitute financial or procurement advice.
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
