import Link from "next/link";
import { ArrowRight, TrendingDown, CheckCircle2 } from "lucide-react";

const STATS = [
  { value: "$2,400", label: "avg. annual savings", sub: "per team" },
  { value: "9", label: "AI tools audited", sub: "and growing" },
  { value: "60s", label: "to get results", sub: "no setup needed" },
];

const TRUST_ITEMS = [
  "No credit card",
  "No account",
  "No integrations",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-5 pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-44"
      aria-label="Hero section"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 -z-20 bg-dot-grid" aria-hidden="true" />

      {/* Top glow */}
      <div
        className="pointer-events-none absolute -z-10 inset-x-0 top-0 h-[480px]"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(79,70,229,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute -z-10 inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl">
        {/* Eyebrow label */}
        <div className="mb-7 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <TrendingDown className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">
              Free · No Login Required
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-center text-[2.75rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-foreground sm:text-6xl lg:text-[4.5rem]">
          You&apos;re probably{" "}
          <span className="gradient-text">overspending</span>
          <br className="hidden sm:block" />
          {" "}on AI tools.
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mt-7 max-w-[600px] text-center text-lg text-muted-foreground sm:text-xl leading-relaxed font-[380]">
          SpendScope audits your team&apos;s AI tool stack and surfaces exactly
          where you&apos;re overpaying — Cursor, Copilot, Claude, ChatGPT, and more.
        </p>

        {/* CTA group */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/audit"
              id="hero-audit-cta"
              className="btn-primary !h-12 !px-7 !text-base"
            >
              Audit My Stack
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="btn-outline !h-12 !px-7 !text-base"
            >
              See how it works
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-1">
            {TRUST_ITEMS.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 mx-auto max-w-2xl">
          <div className="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden shadow-sm">
            {STATS.map(({ value, label, sub }) => (
              <div key={label} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                <span className="stat-number gradient-text">{value}</span>
                <span className="mt-1.5 text-[13px] font-medium text-foreground">{label}</span>
                <span className="text-[11px] text-muted-foreground mt-0.5">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
