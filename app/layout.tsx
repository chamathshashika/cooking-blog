import type { Metadata } from "next";
import { DM_Serif_Display, Montserrat } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import { ToastProvider } from "@/components/ToastProvider";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { env } from "@/lib/env";

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

const siteUrl = env.NEXT_PUBLIC_SITE_URL;

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

import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/session";
import { getSiteStatus } from "@/lib/actions/siteStatus";
import AdminSiteStatusBanner from "@/components/admin/AdminSiteStatusBanner";

import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const rawPath = headersList.get("x-pathname") || "";
  const pathname = rawPath.replace(/\/$/, "") || "/";

  // Check admin session and language cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const langCookie = cookieStore.get("ceylonspicer_language")?.value;
  const initialLanguage = langCookie === "it" ? "it" : "en";
  const session = await decrypt(sessionCookie);
  const isAdmin = session?.role === "admin";

  // Check site visibility mode
  const siteStatus = await getSiteStatus();

  // If site is in restricted mode and visitor is NOT admin
  if (!isAdmin && siteStatus.mode !== "live" && rawPath) {
    const isAuthRoute =
      pathname === "/login" ||
      pathname.startsWith("/login/") ||
      pathname === "/signin" ||
      pathname.startsWith("/signin/") ||
      pathname.startsWith("/api");

    if (!isAuthRoute) {
      if (siteStatus.mode === "coming_soon" && pathname !== "/coming-soon") {
        redirect("/coming-soon");
      }
      if (
        siteStatus.mode === "under_construction" &&
        pathname !== "/under-construction"
      ) {
        redirect("/under-construction");
      }
    }
  }

  return (
    <html
      lang={initialLanguage}
      suppressHydrationWarning
      className={`${dmSerif.variable} ${montserrat.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `@import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='ceylonspicer_theme';var s=localStorage.getItem(k);var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s==='dark'||(s!=='light'&&p);if(d){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');document.documentElement.style.colorScheme='light';}var lk='ceylonspicer_language';var l=localStorage.getItem(lk);if(l==='it'||l==='en'){document.documentElement.lang=l;}}catch(e){}})();`,
          }}
        />
        <GoogleAnalytics gaId="G-K0QQFXPCCD" />
        <meta
          name="google-adsense-account"
          content="ca-pub-9028339042320547"
        ></meta>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9028339042320547"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        suppressHydrationWarning
        className="bg-white dark:bg-obsidian font-display text-ink dark:text-ice antialiased min-h-screen flex flex-col transition-colors duration-200"
      >
        <LanguageProvider initialLanguage={initialLanguage}>
          <ThemeProvider>
            {isAdmin && siteStatus.mode !== "live" && (
              <AdminSiteStatusBanner
                mode={siteStatus.mode}
                headline={siteStatus.headline}
              />
            )}
            <ToastProvider>{children}</ToastProvider>
            <ScrollToTop />
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
