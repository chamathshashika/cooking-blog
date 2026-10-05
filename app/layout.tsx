import type { Metadata } from "next";
import { DM_Serif_Display, Montserrat } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

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
  process.env.NEXT_PUBLIC_SITE_URL || "https://scrumptious-recipes.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Scrumptious | Authentic Sri Lankan Cooking & Recipes",
    template: "%s | Scrumptious",
  },
  description:
    "Explore traditional and modern Sri Lankan recipes, spice secrets, and heartfelt culinary stories.",
  applicationName: "Scrumptious",
  authors: [{ name: "Scrumptious Editorial Team" }],
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
  creator: "Scrumptious",
  publisher: "Scrumptious",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Scrumptious | Authentic Sri Lankan Cooking & Recipes",
    description:
      "Explore traditional and modern Sri Lankan recipes, spice secrets, and heartfelt culinary stories.",
    url: siteUrl,
    siteName: "Scrumptious",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrumptious | Authentic Sri Lankan Cooking & Recipes",
    description:
      "Explore traditional and modern Sri Lankan recipes, spice secrets, and heartfelt culinary stories.",
    creator: "@scrumptious",
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
