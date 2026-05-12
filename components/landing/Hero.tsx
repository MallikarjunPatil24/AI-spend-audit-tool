import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const TRUST = ["No credit card", "No account needed", "No integrations"];

const STATS = [
  { value: "$2,400", label: "avg. annual savings", sub: "per team" },
  { value: "8", label: "AI tools audited", sub: "and growing" },
  { value: "60s", label: "to complete", sub: "no setup" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-background overflow-hidden border-b border-border"
      aria-label="Hero section"
    >
      {/* Subtle Ramp-like dot grid */}
      <div
        className="absolute inset-0 ramp-grid-bg pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-0 sm:pt-24">
        {/* Eyebrow Badge */}
        <div className="mb-8 flex justify-center">
          <span className="section-eyebrow">
            Free audit - no login required
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Stop overspending
          <br />
          on AI tools.
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-xl text-center text-base font-normal leading-relaxed text-muted-foreground sm:text-lg">
          SpendScope audits your team&apos;s AI stack — Cursor, Copilot, Claude,
          ChatGPT and more — and surfaces exactly where you can save money.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/audit"
              id="hero-audit-cta"
              className="btn-primary !h-11 !px-8 !text-base"
            >
              Audit my stack
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              See how it works
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {TRUST.map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-3 divide-x divide-border rounded-t-lg border border-b-0 border-border bg-card">
          {STATS.map(({ value, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-6 px-4 text-center"
            >
              <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {value}
              </span>
              <span className="mt-1 text-xs font-medium text-muted-foreground">
                {label}
              </span>
              <span className="text-[10px] text-muted-foreground/70 mt-0.5">
                {sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
