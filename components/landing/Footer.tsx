import Link from "next/link";
import { ArrowRight, ExternalLink, Code2, Globe } from "lucide-react";
import { BrandMark } from "@/components/shared/BrandMark";

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Audit My Stack", href: "/audit" },
    { label: "How It Works",   href: "#how-it-works" },
    { label: "Features",       href: "#features" },
    { label: "Supported Tools",href: "#tools" },
  ],
  Company: [
    { label: "About",     href: "#" },
    { label: "Blog",      href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Status",    href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy",  href: "#" },
    { label: "Terms of Service",href: "#" },
    { label: "Cookie Policy",   href: "#" },
  ],
};

const SOCIAL = [
  { icon: ExternalLink, href: "#", label: "Twitter / X" },
  { icon: Code2,        href: "#", label: "GitHub" },
  { icon: Globe,        href: "#", label: "Website" },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border" aria-label="Site footer">

      {/* CTA Banner — coral with white cards (Voi pattern) */}
      <div className="relative overflow-hidden py-20 px-5 sm:py-28">
        <div className="absolute inset-0 marketing-dot-bg pointer-events-none" aria-hidden="true" />

        <div className="relative mx-auto max-w-2xl text-center">
          <p className="section-label justify-center mb-4">
            Get started free
          </p>
          <h2 className="text-[2rem] font-bold tracking-tight leading-[1.1] text-foreground sm:text-[2.75rem] mb-4">
            Ready to stop overspending?
          </h2>
          <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Run your free audit in 60 seconds. No account required. No credit card. Just savings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/audit" id="footer-audit-cta" className="btn-primary !h-12 !px-8 !text-base">
              Audit My Stack
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
              Learn more
            </Link>
          </div>
        </div>
      </div>

      {/* Lower footer */}
      <div className="border-t border-border px-5 py-12 sm:px-8 bg-card/30">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">

            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4" aria-label="SpendScope">
                <BrandMark className="bg-primary/10 text-primary shadow-none" />
                <span className="font-heading text-[1.25rem] font-semibold text-foreground">
                  spend<span className="text-muted-foreground">scope.</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                The fastest way to find and eliminate overspend in your team&apos;s AI tool stack.
              </p>
              <div className="mt-5 flex items-center gap-2">
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group} className="col-span-1">
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4">
                  {group}
                </h3>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
          <div className="mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} SpendScope, Inc. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/50">
              Built with Next.js · Supabase · Anthropic Claude
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
