import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ToolLogos } from "@/components/landing/ToolLogos";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "SpendScope — AI Tool Spend Auditor",
  description:
    "Discover exactly how much your team is overspending on AI tools. Free 60-second audit — no login required.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ToolLogos />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
