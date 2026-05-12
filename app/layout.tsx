import type { Metadata, Viewport } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://spendscope.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "SpendScope — AI Tool Spend Auditor",
    template: "%s | SpendScope",
  },
  description:
    "Discover exactly how much your team is overspending on AI tools like Cursor, GitHub Copilot, Claude, and ChatGPT. Free instant audit.",
  keywords: [
    "AI tools",
    "spend audit",
    "cost optimization",
    "Cursor",
    "GitHub Copilot",
    "Claude",
    "ChatGPT",
  ],
  authors: [{ name: "SpendScope" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "SpendScope",
    title: "SpendScope — AI Tool Spend Auditor",
    description: "You're probably overspending on AI tools. Find out in 60 seconds.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SpendScope AI Tool Spend Auditor",
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: APP_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <TooltipProvider delay={200}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
