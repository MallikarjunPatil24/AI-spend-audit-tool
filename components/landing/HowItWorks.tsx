import Link from "next/link";
import { ArrowRight, ClipboardList, Sliders, BarChart2 } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Tell us your stack",
    description: "Select the AI tools your team uses from our catalog of 8+ tools — takes under 60 seconds.",
    color: "#E85D4A",
  },
  {
    number: "02",
    icon: Sliders,
    title: "Enter plans & seats",
    description: "Specify seat counts and plan tiers for each tool. No integrations or API keys needed.",
    color: "#E85D4A",
  },
  {
    number: "03",
    icon: BarChart2,
    title: "Get your audit",
    description: "We calculate your actual spend, benchmark it, and surface overspend opportunities instantly.",
    color: "#E85D4A",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white dark:bg-[#1a0f0a] py-20 px-5 sm:py-28"
      aria-label="How SpendScope works"
    >
      <div className="mx-auto max-w-6xl">

        {/* Section header */}
        <div className="mx-auto max-w-xl text-center mb-16">
          <p className="section-label justify-center mb-3">
            <span>⚡</span> How it works
          </p>
          <h2 className="text-[2rem] font-extrabold tracking-[-0.03em] leading-[1.12] text-foreground sm:text-[2.75rem]">
            From zero to audit in{" "}
            <span className="gradient-text">60 seconds</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed font-medium">
            No integrations. No OAuth. No API keys. Just answers.
          </p>
        </div>

        {/* Step cards — white cards in grid (Voi pattern) */}
        <div className="relative grid gap-6 sm:grid-cols-3">
          {/* Connector */}
          <div
            className="absolute top-[48px] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] hidden h-px sm:block"
            style={{ background: "linear-gradient(90deg, transparent, #e5e5e5 20%, #e5e5e5 80%, transparent)" }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex flex-col items-center text-center group">
                {/* Step icon — Voi-style rounded square */}
                <div className="relative mb-6 z-10">
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl border-2 border-primary/20 bg-white dark:bg-[#2a1812] shadow-sm group-hover:shadow-md transition-shadow">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </div>
                  {/* Number badge */}
                  <div
                    className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: "#E85D4A" }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-[1rem] font-bold tracking-tight text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/audit" id="how-it-works-cta" className="btn-primary !h-12 !px-8 !text-base">
            Start my free audit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-sm text-muted-foreground font-medium">
            Free forever · No credit card
          </p>
        </div>
      </div>
    </section>
  );
}
