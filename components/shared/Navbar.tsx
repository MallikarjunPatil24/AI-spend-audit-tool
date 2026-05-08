"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "#features",     label: "Features" },
  { href: "#tools",        label: "Tools" },
  { href: "#how-it-works", label: "How it works" },
];

export function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-sm backdrop-blur-sm dark:bg-[#1a0f0a]/95" : "bg-white dark:bg-[#1a0f0a]"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8">

        {/* Logo — Voi-style: bold, lowercase, colored dot */}
        <Link href="/" className="flex items-center gap-2" aria-label="SpendScope home">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
            <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-[1.35rem] font-extrabold tracking-[-0.03em] text-foreground"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            spend<span className="text-primary">scope.</span>
          </span>
        </Link>

        {/* Desktop nav — plain text links like Voi */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-[0.9375rem] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions — Voi pill CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/audit"
            id="nav-audit-cta"
            className="btn-primary !h-10 !px-5 !text-sm"
          >
            Start free audit
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            id="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-border bg-white dark:bg-[#1a0f0a] px-5 py-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            <Link
              href="/audit"
              id="mobile-audit-cta"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Start free audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
