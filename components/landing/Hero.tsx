import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const TRUST = ["No credit card", "No account needed", "No integrations"];

const STATS = [
  { value: "$2,400", label: "avg. annual savings", sub: "per team" },
  { value: "8",      label: "AI tools audited",   sub: "and growing" },
  { value: "60s",    label: "to complete",        sub: "no setup" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-coral overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle dot grid on coral */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-20 pb-0 sm:pt-28">

        {/* Eyebrow */}
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            ✦ Free · No login required
          </span>
        </div>

        {/* Headline — Voi style: very bold, left-center, large */}
        <h1 className="text-center text-[2.8rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
          Stop overspending
          <br />
          on AI tools.
        </h1>

        {/* Sub */}
        <p className="mx-auto mt-6 max-w-[520px] text-center text-[1.05rem] font-medium leading-relaxed text-white/80">
          SpendScope audits your team&apos;s AI stack — Cursor, Copilot, Claude,
          ChatGPT and more — and surfaces exactly where you can save money.
        </p>

        {/* CTA row */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link href="/audit" id="hero-audit-cta" className="btn-white !h-12 !px-8 !text-base">
              Audit my stack
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#how-it-works" className="text-sm font-semibold text-white/80 hover:text-white transition-colors underline underline-offset-4">
              See how it works
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {TRUST.map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs font-medium text-white/75">
                <CheckCircle2 className="h-3.5 w-3.5 text-white/60 flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Stats bar — white cards on coral (Voi pattern) */}
        <div className="mt-16 grid grid-cols-3 divide-x divide-white/20 rounded-t-3xl border border-b-0 border-white/20 bg-white/10 backdrop-blur-sm">
          {STATS.map(({ value, label, sub }) => (
            <div key={label} className="flex flex-col items-center justify-center py-7 px-4 text-center">
              <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{value}</span>
              <span className="mt-1 text-[13px] font-semibold text-white/90">{label}</span>
              <span className="text-[11px] text-white/60 mt-0.5">{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
