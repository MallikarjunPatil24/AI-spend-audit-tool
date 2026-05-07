import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Audit My Stack",
  description: "Start your AI tool spend audit — enter your tools and get instant savings insights.",
};

export default function AuditPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-60px)] items-center justify-center px-5 py-16">
        <div className="w-full max-w-md text-center">

          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl"
              style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.12), rgba(124,58,237,0.08))", border: "1px solid rgba(79,70,229,0.15)" }}
            >
              <Wrench
                className="h-9 w-9"
                style={{ color: "#4f46e5" }}
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Badge */}
          <div className="mb-5 flex justify-center">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "rgba(79,70,229,0.08)", color: "#4f46e5" }}
            >
              Coming in Step 2
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-[-0.025em] text-foreground mb-3">
            Audit Engine In Progress
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-sm mx-auto">
            The full audit form, cost calculator, and savings engine are being built in Step 2.
            The foundation, design system, and landing page are complete and production-ready.
          </p>

          {/* Progress checklist */}
          <div className="mb-10 rounded-xl border border-border bg-card p-5 text-left space-y-3">
            {[
              { label: "Project foundation & architecture", done: true },
              { label: "Design system & landing page",     done: true },
              { label: "Supabase client setup",            done: true },
              { label: "Audit form & calculation engine",  done: false },
              { label: "Results page & shareable URLs",    done: false },
              { label: "Claude AI summaries",              done: false },
            ].map(({ label, done }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={
                    done
                      ? { background: "rgba(5,150,105,0.12)", color: "#059669" }
                      : { background: "var(--muted)", color: "var(--muted-foreground)" }
                  }
                >
                  {done ? "✓" : "·"}
                </div>
                <span
                  className="text-sm"
                  style={{ color: done ? "var(--foreground)" : "var(--muted-foreground)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/"
            id="audit-back-home"
            className="btn-outline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
