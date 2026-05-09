import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { RotateCcw } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: "rgba(232,93,74,0.08)", border: "1px solid rgba(232,93,74,0.15)" }}
          >
            <RotateCcw className="h-7 w-7 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground mb-2">
            Audit Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            This audit report either doesn't exist, was deleted, or is no longer public.
          </p>
          <Link href="/audit" className="btn-primary justify-center">
            Start a new audit
          </Link>
        </div>
      </main>
    </>
  );
}
