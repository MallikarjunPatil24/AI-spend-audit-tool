import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { formatMonthly, formatAnnual, formatCurrency } from "@/lib/formatters/currency";
import type { AuditResult } from "@/lib/audit/types";

interface SavingsHeroProps {
  result: AuditResult;
}

export function SavingsHero({ result }: SavingsHeroProps) {
  const { totalMonthlySpend, totalMonthlySavings, totalAnnualSavings, optimizationScore } =
    result;
  const isOptimized = totalMonthlySavings === 0;
  const isHighSavings = totalMonthlySavings >= 500;
  const savingsPct = totalMonthlySpend > 0
    ? Math.round((totalMonthlySavings / totalMonthlySpend) * 100)
    : 0;

  return (
    <section
      className="bg-background relative overflow-hidden border-b border-border"
      aria-label="Audit results summary"
    >
      {/* Decorative Ramp-like dot grid for audit hero */}
      <div
        className="absolute inset-0 ramp-grid-bg opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 py-12 sm:py-16">
        {/* Section Badge */}
        <div className="mb-8 flex justify-center">
          <span className="section-eyebrow">Audit complete</span>
        </div>

        {isOptimized ? (
          /* Already Optimized State */
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp
                  className="h-7 w-7 text-primary"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Your stack is well optimized
            </h1>
            <p className="mt-3 text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
              Based on your reported plans, seat counts, and team size, no significant
              optimizations were identified. You&apos;re already in good shape.
            </p>
          </div>
        ) : (
          /* Savings State */
          <div>
            <h1 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-8">
              Here&apos;s where you can save
            </h1>

            {/* Savings Cards Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
              {/* Monthly Savings */}
              <div className="card p-6 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <TrendingDown
                    className="h-4 w-4 text-success"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Monthly Savings
                  </p>
                </div>
                <p
                  className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                  aria-label={`Potential monthly savings: ${formatMonthly(
                    totalMonthlySavings
                  )}`}
                >
                  {formatCurrency(totalMonthlySavings)}
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-medium">per month</p>
              </div>

              {/* Annual Savings */}
              <div className="card p-6 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <TrendingDown
                    className="h-4 w-4 text-success"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Annual Savings
                  </p>
                </div>
                <p
                  className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                  aria-label={`Potential annual savings: ${formatAnnual(totalAnnualSavings)}`}
                >
                  {formatCurrency(totalAnnualSavings)}
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-medium">per year</p>
              </div>

              {/* Optimization Score */}
              <div className="card p-6 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Minus
                    className="h-4 w-4 text-primary"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Optimization
                  </p>
                </div>
                <p
                  className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                  aria-label={`Optimization score: ${optimizationScore} out of 100`}
                >
                  {optimizationScore}
                  <span className="text-lg font-bold text-muted-foreground ml-1">/100</span>
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  {savingsPct}% recoverable
                </p>
              </div>
            </div>

            {/* High Savings Callout */}
            {isHighSavings && (
              <div className="rounded-lg border border-border bg-card px-5 py-4 text-center">
                <p className="text-sm font-semibold text-foreground">
                  With savings this significant, infrastructure credits and committed-use discounts
                  may help reduce total AI tooling costs even further.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
