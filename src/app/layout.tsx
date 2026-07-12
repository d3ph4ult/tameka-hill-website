import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jordan Blake — Speaker & Career Strategist",
    template: "%s — Jordan Blake",
  },
  description:
    "Keynote speaker, workshop facilitator, and professional résumé writer. Book a speaking engagement or get a résumé that gets read.",
  openGraph: {
    title: "Jordan Blake — Speaker & Career Strategist",
    description:
      "Keynote speaker, workshop facilitator, and professional résumé writer. Book a speaking engagement or get a résumé that gets read.",
    url: siteUrl,
    siteName: "Jordan Blake",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordan Blake — Speaker & Career Strategist",
    description:
      "Keynote speaker, workshop facilitator, and professional résumé writer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
