import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "What's Bloomin' - Seasonal Plant Guide",
    template: "%s | What's Bloomin'",
  },
  description: "Find the perfect bloom for your garden. Browse 200+ plants by USDA zone, season, sun, water, color, and more.",
  keywords: ["what's blooming", "plant finder", "bloom calendar", "USDA zones", "garden planner", "seasonal flowers", "what to plant", "perennials by zone"],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "What's Bloomin' - Find the Perfect Bloom for Your Garden",
    description: "Browse 200+ plants by zone, season, sun, water, and color. The visual plant discovery tool for US gardeners.",
    type: "website",
    url: "https://whatsbloomin.com",
    siteName: "What's Bloomin'",
  },
  metadataBase: new URL("https://whatsbloomin.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VT74XQBLJ6" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-VT74XQBLJ6');`}</Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-cream text-[#1A1610] antialiased">{children}</body>
    </html>
  );
}
