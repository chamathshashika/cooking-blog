import type { Metadata } from "next";
import { DM_Serif_Display, Montserrat } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://CeylonSpicer-recipes.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CeylonSpicer | Authentic Sri Lankan Cooking & Recipes",
    template: "%s | CeylonSpicer",
  },
  description:
    "Explore traditional and modern Sri Lankan recipes, spice secrets, and heartfelt culinary stories.",
  applicationName: "CeylonSpicer",
  authors: [{ name: "CeylonSpicer Editorial Team" }],
  generator: "Next.js",
  keywords: [
    "Sri Lankan recipes",
    "Sri Lankan food",
    "Kiribath",
    "Kottu Roti",
    "Curry recipes",
    "Ceylon spices",
    "South Asian cooking",
  ],
  referrer: "origin-when-cross-origin",
  creator: "CeylonSpicer",
  publisher: "CeylonSpicer",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "CeylonSpicer | Authentic Sri Lankan Cooking & Recipes",
    description:
      "Explore traditional and modern Sri Lankan recipes, spice secrets, and heartfelt culinary stories.",
    url: siteUrl,
    siteName: "CeylonSpicer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CeylonSpicer | Authentic Sri Lankan Cooking & Recipes",
    description:
      "Explore traditional and modern Sri Lankan recipes, spice secrets, and heartfelt culinary stories.",
    creator: "@CeylonSpicer",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSerif.variable} ${montserrat.variable}`}
    >
      <head>
        <GoogleAnalytics gaId="G-K0QQFXPCCD" />
      </head>
      <body
        suppressHydrationWarning
        className="bg-white font-display text-ink antialiased min-h-screen flex flex-col"
      >
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
