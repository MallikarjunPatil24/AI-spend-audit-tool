import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import "./globals.css";

/* Inter — clean, modern; Plus Jakarta Sans loaded via CSS @import for rounded headlines */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://spendscope.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "SpendScope — AI Tool Spend Auditor",
    template: "%s | SpendScope",
  },
  description:
    "Discover exactly how much your team is overspending on AI tools like Cursor, GitHub Copilot, Claude, and ChatGPT. Free instant audit.",
  keywords: ["AI tools", "spend audit", "cost optimization", "Cursor", "GitHub Copilot", "Claude", "ChatGPT"],
  authors: [{ name: "SpendScope" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "SpendScope",
    title: "SpendScope — AI Tool Spend Auditor",
    description: "You're probably overspending on AI tools. Find out in 60 seconds.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a0f0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <TooltipProvider delay={200}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
