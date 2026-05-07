import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Audit Results",
  description: "Your AI spend audit results — coming in Step 3.",
};

/**
 * Results page stub — full implementation in Step 3.
 * Receives audit data via Supabase slug lookup.
 */
export default function AuditResultsPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-60px)] items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm text-center">
          <div className="mb-6 flex justify-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ background: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.15)" }}
            >
              <Clock className="h-7 w-7 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          <span
            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: "rgba(79,70,229,0.08)", color: "#4f46e5" }}
          >
            Coming in Step 3
          </span>

          <h1 className="mt-3 text-xl font-extrabold tracking-tight text-foreground">
            Audit Results Page
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Your form was submitted! The results engine, Supabase persistence, and
            shareable URLs will be built in Step 3.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link href="/audit" className="btn-primary justify-center">
              Back to Audit Form
            </Link>
            <Link href="/" className="btn-outline justify-center">
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
