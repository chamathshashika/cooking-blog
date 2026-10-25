import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Mail,
  Cookie,
  ArrowLeft,
  Megaphone,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | CeylonSpicer",
  description:
    "Our transparent privacy policy explaining how CeylonSpicer handles cookies, analytics, and third-party advertising partners.",
  openGraph: {
    title: "Privacy Policy | CeylonSpicer",
    description:
      "Transparent privacy guidelines for CeylonSpicer: information collection, advertising cookies, and user privacy choices.",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "October 2026";

  const keyPoints = [
    {
      icon: Megaphone,
      title: "Third-Party Advertising",
      description:
        "We partner with third-party advertising networks to display relevant advertisements, keeping our authentic recipes free for all home cooks.",
    },
    {
      icon: Cookie,
      title: "Cookies & Ad Personalization",
      description:
        "Google and third-party partners use cookies to serve ads based on your visits. You can opt out of personalized ads at any time via Google Ads Settings.",
    },
    {
      icon: Lock,
      title: "No Mandatory Accounts",
      description:
        "All recipes, cooking techniques, and spice stories remain free and open. You don't need an account or login to browse and cook our dishes.",
    },
    {
      icon: Mail,
      title: "Protected Newsletter",
      description:
        "If you subscribe to 'Never miss a recipe', your email is strictly used for recipe notifications and food essays. We never sell, rent, or trade your contact details.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-obsidian transition-colors">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 dark:border-hairline bg-linen/30 dark:bg-surface/50 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
            <Link href="/" className="hover:text-ink dark:hover:text-amber-text transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink dark:text-ice font-semibold">Privacy Policy</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-cream dark:bg-surface/80 py-12 md:py-16 text-center border-b border-ink/10 dark:border-hairline">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-sage/10 dark:bg-sage/20 text-sage dark:text-sage-light font-ui text-[10px] font-bold uppercase tracking-[0.12em]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Transparent & Reader-First</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink dark:text-ice leading-tight">
              Privacy Policy
            </h1>

            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 dark:text-slate-muted max-w-2xl mx-auto leading-relaxed">
              We believe in honest home cooking and straightforward privacy. Learn how we handle your
              information, cookies, and third-party advertising partners.
            </p>

            <p className="mt-4 font-ui text-xs text-muted dark:text-slate-muted">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-[860px] px-4 sm:px-6 py-12 md:py-16">
          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-12">
            {keyPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="border border-ink/10 dark:border-hairline bg-linen/20 dark:bg-surface p-6 flex flex-col justify-start rounded-xs"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 dark:bg-sage/20 text-sage dark:text-sage-light">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h2 className="font-display text-lg text-ink dark:text-ice">
                      {item.title}
                    </h2>
                  </div>
                  <p className="font-display text-xs sm:text-sm text-ink/80 dark:text-slate-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Policy Text */}
          <div className="space-y-8 font-display text-sm sm:text-base text-ink/85 dark:text-slate-muted leading-relaxed">
            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                1. Our Core Commitment
              </h2>
              <p>
                At <strong className="text-ink dark:text-ice">CeylonSpicer</strong>, our mission is celebrating
                authentic Sri Lankan culinary heritage, traditional family recipes, and spice stories.
                To keep this knowledge freely accessible to every cook around the world without subscription
                paywalls, we display advertisements supported by authorized third-party advertising partners.
                We are committed to transparency regarding how your data is handled and providing you with clear
                privacy controls.
              </p>
            </section>

            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                2. Third-Party Advertising & Cookies
              </h2>
              <p>
                We partner with <strong className="text-ink dark:text-ice">third-party advertising networks</strong> and
                related advertising technologies to serve advertisements when you visit our website. These third-party
                vendors and ad networks employ cookies to serve ads based on your prior visits to this website and
                other websites across the internet.
              </p>
              <div className="my-4 rounded-xs border border-ink/10 dark:border-hairline bg-cream/40 dark:bg-panel p-4 space-y-2">
                <p className="font-semibold text-ink dark:text-ice text-sm">
                  Advertising & Cookie Disclosures:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li>
                    Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior
                    visits to our website or other websites.
                  </li>
                  <li>
                    Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users
                    based on their visit to CeylonSpicer and/or other sites on the Internet.
                  </li>
                  <li>
                    Users may opt out of personalized advertising by visiting{" "}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-sage dark:text-amber-text underline hover:text-ink dark:hover:text-ice"
                    >
                      <span>Google Ads Settings</span>
                      <ExternalLink className="h-3 w-3 inline" />
                    </a>
                    .
                  </li>
                  <li>
                    Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized
                    advertising by visiting{" "}
                    <a
                      href="https://www.aboutads.info"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-sage dark:text-amber-text underline hover:text-ink dark:hover:text-ice"
                    >
                      <span>www.aboutads.info</span>
                      <ExternalLink className="h-3 w-3 inline" />
                    </a>{" "}
                    or{" "}
                    <a
                      href="https://optout.networkadvertising.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-sage dark:text-amber-text underline hover:text-ink dark:hover:text-ice"
                    >
                      <span>Network Advertising Initiative (NAI)</span>
                      <ExternalLink className="h-3 w-3 inline" />
                    </a>
                    .
                  </li>
                </ul>
              </div>
            </section>

            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-5 w-5 text-sage dark:text-sage-light" />
                <h2 className="font-display text-2xl text-ink dark:text-ice">
                  3. Web Analytics (Google Analytics)
                </h2>
              </div>
              <p>
                We use Google Analytics to understand overall website traffic, identify popular recipes, and improve
                page load performance. Google Analytics collects aggregated, non-personally identifiable data (such
                as general device type, browser version, approximate geographical region, referring URLs, and pages
                visited).
              </p>
              <p className="mt-2">
                If you wish to prevent Google Analytics from collecting data on your visits across all websites, you
                can download and install the official{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-sage dark:text-amber-text underline hover:text-ink dark:hover:text-ice"
                >
                  <span>Google Analytics Opt-out Browser Add-on</span>
                  <ExternalLink className="h-3 w-3 inline" />
                </a>
                .
              </p>
            </section>

            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                4. Cookies & Local Browser Storage
              </h2>
              <p>
                Cookies are small text files placed on your device to ensure smooth site functionality and support
                ad services. We categorize storage into:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <strong className="text-ink dark:text-ice">Functional Local Storage:</strong> Used to remember your
                  display preferences (such as light or dark theme mode), your interactive ingredient checklist ticks
                  while cooking, and your recipe star ratings so your selections persist across page refreshes.
                </li>
                <li>
                  <strong className="text-ink dark:text-ice">Advertising & Measurement Cookies:</strong> Placed by
                  third-party ad networks and partners to serve, cap, and measure the effectiveness of
                  advertisements.
                </li>
              </ul>
              <p className="mt-3">
                You can configure your web browser to reject or delete cookies at any time via your browser settings.
                Please note that disabling cookies may reset visual preferences such as theme selection.
              </p>
            </section>

            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                5. Newsletter Subscriptions
              </h2>
              <p>
                If you voluntarily submit your name and email in our &ldquo;Never miss a recipe&rdquo; subscription
                banner, your contact information is stored securely in our database and used solely to send
                curated recipe newsletters and seasonal cooking stories. We will never sell, rent, license, or
                disclose subscriber email lists to third-party marketing companies. Every email includes an
                instant one-click unsubscribe link.
              </p>
            </section>

            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                6. Affiliate Monetization & Culinary Links
              </h2>
              <p>
                To support recipe testing and culinary research, certain recipes may contain affiliate product
                links for authentic spices, stone grinders, hoppers presses, or cooking ingredients. These are
                clearly identified with a &ldquo;Shop&rdquo; button and designated with FTC-compliant{" "}
                <code className="font-mono text-xs bg-cream dark:bg-panel px-1.5 py-0.5 border border-ink/10 dark:border-hairline">
                  rel=&quot;noopener noreferrer sponsored&quot;
                </code>{" "}
                attributes. If you make a purchase through these links, we may receive a small commission at zero
                extra cost to you.
              </p>
            </section>

            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                7. Questions & Contact Information
              </h2>
              <p>
                If you have questions regarding this Privacy Policy, your advertising preferences, or our culinary
                content, please feel free to reach out to our team at{" "}
                <span className="font-mono text-xs bg-cream dark:bg-panel px-2 py-0.5 border border-ink/10 dark:border-hairline text-ink dark:text-ice">
                  hello@CeylonSpicer-recipes.com
                </span>{" "}
                or submit a note through our{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-sage dark:text-amber-text underline hover:text-ink dark:hover:text-ice"
                >
                  Contact Page
                </Link>
                .
              </p>
            </section>
          </div>

          {/* Back Action */}
          <div className="mt-12 pt-8 border-t border-ink/10 dark:border-hairline flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-sage hover:text-ink dark:text-amber-text dark:hover:text-ice transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Recipes</span>
            </Link>

            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 bg-sage dark:bg-amber-primary px-5 py-2.5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white dark:text-obsidian hover:bg-sage/90 dark:hover:bg-amber-primary/90 transition-colors shadow-xs"
            >
              <span>Explore All Dishes</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
