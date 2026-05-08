import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { formatMonthly, formatAnnual, formatCurrency } from "@/lib/formatters/currency";
import type { AuditResult } from "@/lib/audit/types";

interface SavingsHeroProps {
  result: AuditResult;
}

export function SavingsHero({ result }: SavingsHeroProps) {
  const { totalMonthlySpend, totalMonthlySavings, totalAnnualSavings, optimizationScore } = result;
  const isOptimized = totalMonthlySavings === 0;
  const isHighSavings = totalMonthlySavings >= 500;
  const savingsPct = totalMonthlySpend > 0
    ? Math.round((totalMonthlySavings / totalMonthlySpend) * 100)
    : 0;

  return (
    <section
      className="bg-coral relative overflow-hidden"
      aria-label="Audit results summary"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 py-14 sm:py-20">

        {/* Label */}
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            ✦ Audit Complete
          </span>
        </div>

        {isOptimized ? (
          /* ── Already Optimized State ── */
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                <TrendingUp className="h-8 w-8 text-white" strokeWidth={1.75} />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
              Your stack is well optimized
            </h1>
            <p className="mt-3 text-base text-white/75 max-w-md mx-auto font-medium leading-relaxed">
              Based on your reported plans, seat counts, and team size, no significant
              optimizations were identified. You&apos;re already in good shape.
            </p>
          </div>
        ) : (
          /* ── Savings State ── */
          <div>
            <h1 className="text-center text-[1.75rem] font-extrabold tracking-[-0.03em] text-white/80 sm:text-2xl mb-8">
              Here&apos;s where you can save
            </h1>

            {/* Savings cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* Monthly savings */}
              <div className="card-white p-6 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <TrendingDown className="h-4 w-4 text-primary" strokeWidth={2} />
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Monthly Savings
                  </p>
                </div>
                <p
                  className="text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl"
                  aria-label={`Potential monthly savings: ${formatMonthly(totalMonthlySavings)}`}
                >
                  {formatCurrency(totalMonthlySavings)}
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-medium">per month</p>
              </div>

              {/* Annual savings */}
              <div className="card-white p-6 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <TrendingDown className="h-4 w-4 text-primary" strokeWidth={2} />
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Annual Savings
                  </p>
                </div>
                <p
                  className="text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl"
                  aria-label={`Potential annual savings: ${formatAnnual(totalAnnualSavings)}`}
                >
                  {formatCurrency(totalAnnualSavings)}
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-medium">per year</p>
              </div>

              {/* Score */}
              <div className="card-white p-6 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Minus className="h-4 w-4 text-primary" strokeWidth={2} />
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Optimization Score
                  </p>
                </div>
                <p
                  className="text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl"
                  aria-label={`Optimization score: ${optimizationScore} out of 100`}
                >
                  {optimizationScore}
                  <span className="text-xl font-bold text-muted-foreground">/100</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-medium">
                  {savingsPct}% of spend recoverable
                </p>
              </div>
            </div>

            {/* High-savings Credex callout */}
            {isHighSavings && (
              <div className="mt-5 rounded-2xl bg-white/15 border border-white/20 px-5 py-4 text-center">
                <p className="text-sm font-semibold text-white">
                  💡 With savings this significant, infrastructure credits (Credex, AWS Activate, etc.)
                  may help reduce your total AI tooling costs even further.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
