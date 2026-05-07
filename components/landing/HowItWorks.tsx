import Link from "next/link";
import { ArrowRight, ClipboardList, Sliders, BarChart2 } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Tell us your stack",
    description:
      "Select the AI tools your team uses from our curated catalog of 9+ tools.",
    color: "#4f46e5",
  },
  {
    number: "02",
    icon: Sliders,
    title: "Enter team & plans",
    description:
      "Specify seat counts and plan tiers for each tool. Takes under 60 seconds.",
    color: "#7c3aed",
  },
  {
    number: "03",
    icon: BarChart2,
    title: "Receive your audit",
    description:
      "We calculate actual spend, benchmark it, and surface overspend opportunities instantly.",
    color: "#2563eb",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 px-5 sm:py-32 overflow-hidden"
      aria-label="How SpendScope works"
    >
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, var(--background) 0%, var(--muted) 40%, var(--background) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl">

        {/* Section header */}
        <div className="mx-auto max-w-xl text-center mb-16">
          <p className="section-label mb-3">
            <span>⚡</span> How it works
          </p>
          <h2 className="text-[2rem] font-extrabold tracking-[-0.025em] leading-[1.15] text-foreground sm:text-[2.5rem]">
            From zero to audit in{" "}
            <span className="gradient-text">60 seconds</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            No integrations. No OAuth. No API keys. Just answers.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-6 sm:grid-cols-3">

          {/* Connector line */}
          <div
            className="absolute top-[52px] left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] hidden h-px sm:block"
            style={{ background: "linear-gradient(90deg, transparent 0%, var(--border) 20%, var(--border) 80%, transparent 100%)" }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center group">

                {/* Step bubble */}
                <div className="relative mb-6 z-10">
                  <div
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border-2 bg-card shadow-sm transition-shadow duration-200 group-hover:shadow-md"
                    style={{ borderColor: `${step.color}30` }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: step.color }}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                  <div
                    className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: step.color }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed px-2">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/audit"
            id="how-it-works-cta"
            className="btn-primary !h-12 !px-8 !text-base"
          >
            Start My Free Audit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Free forever · No credit card
          </p>
        </div>
      </div>
    </section>
  );
}
