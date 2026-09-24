import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAFAFB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "AuraWeb Studio — High-Performance Website Development Agency",
    template: "%s | AuraWeb Studio",
  },
  description:
    "We design, build, and maintain high-speed, modern, bespoke websites and web applications engineered to elevate your brand and maximize business conversions.",
  keywords: [
    "Website Development",
    "Website Design",
    "Custom Web Development",
    "Website Redesign",
    "E-commerce",
    "Booking Websites",
    "Portfolio Websites",
    "Landing Pages",
    "Website Maintenance",
    "Next.js Development Agency",
  ],
  authors: [{ name: "AuraWeb Studio" }],
  creator: "AuraWeb Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://auraweb.studio",
    title: "AuraWeb Studio — Websites That Build Your Brand",
    description:
      "Modern, responsive and high-performance websites designed around your business, brand and goals. Analyze → Design → Implement → Maintain.",
    siteName: "AuraWeb Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraWeb Studio — Modern Web Development",
    description: "Websites designed and developed for different businesses, brands, and ideas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = db.getSettings();
  const sessionUser = getSessionUser();

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent/15 selection:text-accent flex flex-col">
        {children}
      </body>
    </html>
  );
}
