import Link from "next/link";
import { ArrowRight, Zap, ExternalLink, Code2, Globe } from "lucide-react";

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Audit My Stack", href: "/audit" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Supported Tools", href: "#tools" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const SOCIAL = [
  { icon: ExternalLink, href: "#", label: "Twitter / X" },
  { icon: Code2,        href: "#", label: "GitHub" },
  { icon: Globe,        href: "#", label: "Website" },
];

export function Footer() {
  return (
    <footer className="border-t border-border" aria-label="Site footer">

      {/* CTA banner */}
      <div className="relative overflow-hidden px-5 py-20 sm:py-24">
        {/* Background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(79,70,229,0.07) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-dot-grid opacity-50" aria-hidden="true" />

        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label justify-center mb-4">
            <span>🚀</span> Get started free
          </p>
          <h2 className="text-[2rem] font-extrabold tracking-[-0.03em] leading-[1.1] text-foreground sm:text-[2.5rem] mb-4">
            Ready to stop overspending?
          </h2>
          <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Run your free audit in 60 seconds. No account required. No credit card.
            Just savings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/audit"
              id="footer-audit-cta"
              className="btn-primary !h-12 !px-8 !text-base"
            >
              Audit My Stack
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#features" className="btn-outline !h-12 !px-8 !text-base">
              Learn more
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="border-t border-border px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">

            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4" aria-label="SpendScope">
                <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary shadow-sm shadow-primary/20">
                  <Zap className="h-[15px] w-[15px] text-white" strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-semibold tracking-tight text-foreground">
                  Spend<span style={{ color: "var(--primary)" }}>Scope</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">
                The fastest way to find and eliminate overspend in your team&apos;s AI tool stack.
              </p>

              {/* Social */}
              <div className="mt-5 flex items-center gap-2">
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors duration-150"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group} className="col-span-1">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-4">
                  {group}
                </h3>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} SpendScope, Inc. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with Next.js · Supabase · Anthropic Claude
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
