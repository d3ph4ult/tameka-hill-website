import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsDisplay = Poppins({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const poppinsBody = Poppins({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tameka Hill — Speaker & Career Strategist",
    template: "%s — Tameka Hill",
  },
  description:
    "Keynote speaker, workshop facilitator, and professional résumé writer. Book a speaking engagement or get a résumé that gets read.",
  openGraph: {
    title: "Tameka Hill — Speaker & Career Strategist",
    description:
      "Keynote speaker, workshop facilitator, and professional résumé writer. Book a speaking engagement or get a résumé that gets read.",
    url: siteUrl,
    siteName: "Tameka Hill",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tameka Hill — Speaker & Career Strategist",
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
    <html lang="en" className={`${poppinsDisplay.variable} ${poppinsBody.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
