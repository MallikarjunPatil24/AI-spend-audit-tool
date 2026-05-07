import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { AuditForm } from "@/components/audit/AuditForm";

export const metadata: Metadata = {
  title: "Audit My AI Stack",
  description:
    "Enter your team's AI tools, seats, and spend. SpendScope will instantly show you where you're overpaying.",
};

export default function AuditPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-60px)] bg-background">
        <AuditForm />
      </main>
    </>
  );
}
