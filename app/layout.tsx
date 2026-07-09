import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { SiteHeader } from "@/components/common/site-header";
import { SiteFooter } from "@/components/common/site-footer";
import { MouseGlow } from "@/components/common/mouse-glow";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://sajusman.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Usman Sajjad — Senior Software Engineer",
    template: "%s · Usman Sajjad",
  },
  description:
    "Senior software engineer building cross-platform consumer products with React Native, Node, and Django. Writing about engineering, teams, and building things that scale.",
  keywords: [
    "Usman Sajjad",
    "Software Engineer",
    "React Native",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Django",
  ],
  authors: [{ name: "Usman Sajjad" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Usman Sajjad — Senior Software Engineer",
    description:
      "Building cross-platform consumer products. Writing about engineering, teams, and scale.",
    siteName: "Usman Sajjad",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman Sajjad — Senior Software Engineer",
    description:
      "Building cross-platform consumer products. Writing about engineering, teams, and scale.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MouseGlow />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
