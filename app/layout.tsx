import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
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
  keywords: [
    "AI tools",
    "spend audit",
    "cost optimization",
    "Cursor",
    "GitHub Copilot",
    "Claude",
    "ChatGPT",
    "startup tools",
    "engineering costs",
    "AI spending",
  ],
  authors: [{ name: "SpendScope" }],
  creator: "SpendScope",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "SpendScope",
    title: "SpendScope — AI Tool Spend Auditor",
    description:
      "You're probably overspending on AI tools. Find out in 60 seconds.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SpendScope — AI Tool Spend Auditor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpendScope — AI Tool Spend Auditor",
    description: "You're probably overspending on AI tools. Find out in 60 seconds.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
