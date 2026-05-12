import Link from "next/link";
import { ArrowRight, ClipboardList, Sliders, BarChart2 } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Tell us your stack",
    description:
      "Select the AI tools your team uses from our catalog of 8+ tools — takes under 60 seconds.",
  },
  {
    number: "02",
    icon: Sliders,
    title: "Enter plans & seats",
    description: "Specify seat counts and plan tiers for each tool. No integrations or API keys needed.",
  },
  {
    number: "03",
    icon: BarChart2,
    title: "Get your audit",
    description:
      "We calculate your actual spend, benchmark it, and surface overspend opportunities instantly.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="marketing-dot-bg py-16 px-5 sm:py-24 border-b border-border"
      aria-label="How SpendScope works"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <p className="section-label justify-center mb-3">
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            From zero to audit in{" "}
            <span className="text-primary font-bold">60 seconds</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed font-medium">
            No integrations. No OAuth. No API keys. Just answers.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid gap-6 sm:grid-cols-3 mb-12">
          {/* Connector Line */}
          <div
            className="absolute top-6 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] hidden h-px sm:block bg-gradient-to-r from-transparent via-border to-transparent"
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex flex-col items-center text-center group">
                {/* Step Icon */}
                <div className="relative mb-6 z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 group-hover:bg-primary/10 transition-colors shadow-sm">
                    <Icon
                      className="h-5 w-5 text-primary"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                  {/* Step Number Badge */}
                  <div
                    className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-success text-2xs font-bold text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-base font-bold tracking-tight text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/audit" id="how-it-works-cta" className="btn-primary !h-10 !px-8 !text-sm">
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
