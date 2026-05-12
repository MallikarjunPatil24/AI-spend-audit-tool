"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "./BrandMark";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#tools", label: "Tools" },
  { href: "#how-it-works", label: "How it works" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 border-b border-border backdrop-blur-sm shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="SpendScope home"
        >
          <BrandMark />
          <span className="font-heading text-lg font-semibold text-foreground">
            Spend<span className="text-primary">Scope</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-0.5"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/audit"
            id="nav-audit-cta"
            className="btn-primary !h-9 !px-4 !text-sm"
          >
            Start free audit
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex md:hidden h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-border bg-background px-5 py-3 animate-fade-in"
        >
          {/* Navigation Links */}
          <nav
            className="flex flex-col gap-1 mb-3"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={handleLinkClick}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="/audit"
            id="mobile-audit-cta"
            onClick={handleLinkClick}
            className="btn-primary w-full justify-center !h-9 !text-sm"
          >
            Start free audit
          </Link>
        </div>
      )}
    </header>
  );
}
