"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background/0"
      }`}
    >
      <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="SpendScope home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary shadow-sm shadow-primary/30">
            <Zap className="h-[15px] w-[15px] text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            Spend<span style={{ color: "var(--primary)" }}>Scope</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {[
            { href: "#features", label: "Features" },
            { href: "#tools", label: "Supported Tools" },
            { href: "#how-it-works", label: "How it works" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground font-medium hover:text-foreground hover:bg-muted/60 transition-all duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle />
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          <Link
            href="/audit"
            id="nav-audit-cta"
            className="btn-primary !h-[36px] !px-4 !text-sm"
          >
            Start Free Audit
            <ChevronRight className="h-3.5 w-3.5 opacity-80" />
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1.5">
          <ThemeToggle />
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-md px-5 py-4 space-y-1">
          <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
            {[
              { href: "#features", label: "Features" },
              { href: "#tools", label: "Supported Tools" },
              { href: "#how-it-works", label: "How it works" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="pt-2">
            <Link
              href="/audit"
              id="mobile-audit-cta"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center !rounded-lg"
            >
              Start Free Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
