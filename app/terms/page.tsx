import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  Utensils,
  AlertTriangle,
  Megaphone,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | CeylonSpicer",
  description:
    "Terms of service, advertising disclosures, and fair usage guidelines for CeylonSpicer recipes, photography, and Sri Lankan culinary stories.",
  openGraph: {
    title: "Terms of Service | CeylonSpicer",
    description:
      "Simple, fair guidelines for enjoying our Sri Lankan recipes, photography, advertising disclosures, and cooking guides.",
  },
};

export default function TermsPage() {
  const lastUpdated = "October 2026";

  const keyPoints = [
    {
      icon: Utensils,
      title: "Cook & Share Freely",
      description:
        "All recipes are shared for your personal, non-commercial culinary enjoyment at home. Cook, taste, tweak, and enjoy with friends and family.",
    },
    {
      icon: BookOpen,
      title: "Content & Copyright",
      description:
        "Our original recipe texts, culinary essays, and food photography are protected. Please credit CeylonSpicer with a direct link when referencing our work.",
    },
    {
      icon: Megaphone,
      title: "Advertising & Affiliates",
      description:
        "We display ads through third-party ad networks and may feature curated affiliate links. Third-party ad content and external services are independently operated.",
    },
    {
      icon: AlertTriangle,
      title: "Allergens & Health",
      description:
        "Sri Lankan recipes frequently use coconut, nuts, seafood, and robust spices. Always verify ingredients to ensure they align with your dietary requirements.",
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
            <span className="text-ink dark:text-ice font-semibold">Terms of Service</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-cream dark:bg-surface/80 py-12 md:py-16 text-center border-b border-ink/10 dark:border-hairline">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-sage/10 dark:bg-sage/20 text-sage dark:text-sage-light font-ui text-[10px] font-bold uppercase tracking-[0.12em]">
              <FileText className="h-3.5 w-3.5" />
              <span>Fair Usage & Disclosures</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink dark:text-ice leading-tight">
              Terms of Service
            </h1>

            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 dark:text-slate-muted max-w-xl mx-auto leading-relaxed">
              Simple, fair guidelines for enjoying our authentic Sri Lankan
              recipes, food photography, advertising disclosures, and culinary stories.
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

          {/* Detailed Terms Text */}
          <div className="space-y-8 font-display text-sm sm:text-base text-ink/85 dark:text-slate-muted leading-relaxed">
            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using <strong className="text-ink dark:text-ice">CeylonSpicer</strong>{" "}
                (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the
                blog&rdquo;), you agree to abide by these simple and fair Terms
                of Service. If you do not agree with any part of these terms,
                please feel free to discontinue using the website.
              </p>
            </section>

            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                2. Personal & Non-Commercial Use
              </h2>
              <p>
                All recipes, culinary guides, measurement tables, and
                instructions are published for personal, educational, and
                domestic home cooking purposes. You are welcome to cook these
                meals for family gatherings, potlucks, and dinner parties. You
                may not scrape, bulk-reproduce, or republish entire recipe
                collections for commercial re-sale without prior written
                consent.
              </p>
            </section>

            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                3. Intellectual Property & Attribution
              </h2>
              <p>
                The written culinary stories, layout design, branding, and
                editorial photography on CeylonSpicer are protected by
                copyright. If you are inspired by one of our recipes and wish to
                feature it on your own blog or social media:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  Re-write the instructions in your own words rather than
                  copying verbatim.
                </li>
                <li>
                  Credit <strong className="text-ink dark:text-ice">CeylonSpicer</strong> clearly with an active
                  link back to the original recipe URL.
                </li>
                <li>
                  Do not scrape or re-host our original food images without
                  explicit permission.
                </li>
              </ul>
            </section>

            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                4. Cooking, Allergies & Health Disclaimer
              </h2>
              <p>
                Sri Lankan cuisine makes rich and diverse use of ingredients
                including fresh coconut, Maldive fish, seafood, crustaceans,
                tree nuts (such as cashews), and intense chili varieties.
                Cooking times and temperatures are recommendations and can vary
                depending on your stove, cookware, and climate.
              </p>
              <p className="mt-2 text-ink/75 dark:text-slate-muted">
                Cooks are responsible for confirming allergen safety for
                themselves and their guests, practicing safe food handling
                (especially with seafood, meats, and raw marinades), and
                adjusting spice levels to their personal tolerance.
              </p>
            </section>

            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                5. Advertisements, Affiliate Links & External Content
              </h2>
              <p>
                To maintain our recipe database and keep our culinary content free of charge, CeylonSpicer displays
                advertisements through authorized{" "}
                <strong className="text-ink dark:text-ice">third-party advertising networks</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <strong className="text-ink dark:text-ice">Third-Party Advertisers:</strong> We do not endorse,
                  guarantee, or make representations about products, services, or claims presented in advertisements
                  served by third-party ad networks. Any dealings, purchases, or correspondence with advertisers are
                  strictly between you and the respective third-party vendor.
                </li>
                <li>
                  <strong className="text-ink dark:text-ice">Affiliate Links:</strong> Some recipes may feature
                  affiliate product links for cooking tools and authentic spices. When you click these links and
                  make a purchase, we may earn a small referral commission at zero additional cost to you.
                </li>
                <li>
                  <strong className="text-ink dark:text-ice">External Websites:</strong> We occasionally link to
                  cultural archives, spice producers, or reference websites. We do not control and are not
                  responsible for the content, privacy practices, or availability of any third-party websites.
                </li>
              </ul>
              <p className="mt-3">
                For detailed information on how third-party advertising partners use cookies and
                how you can manage ad preferences, please consult our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-sage dark:text-amber-text underline hover:text-ink dark:hover:text-ice inline-flex items-center gap-1"
                >
                  <span>Privacy Policy</span>
                  <ExternalLink className="h-3 w-3 inline" />
                </Link>
                .
              </p>
            </section>

            <section className="border-t border-ink/10 dark:border-hairline pt-8">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-3">
                6. Modifications & Contact
              </h2>
              <p>
                We reserve the right to refine these terms as our platform and advertising partnerships evolve.
                Any updates will be clearly posted on this page with an updated timestamp.
              </p>
              <p className="mt-2">
                For questions regarding recipe licensing, content syndication, or friendly feedback, please contact
                us at{" "}
                <span className="font-mono text-xs bg-cream dark:bg-panel px-2 py-0.5 border border-ink/10 dark:border-hairline text-ink dark:text-ice">
                  hello@CeylonSpicer-recipes.com
                </span>{" "}
                or via our{" "}
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
              <span>Back to Home</span>
            </Link>

            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 bg-sage dark:bg-amber-primary px-5 py-2.5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white dark:text-obsidian hover:bg-sage/90 dark:hover:bg-amber-primary/90 transition-colors shadow-xs"
            >
              <span>Explore Recipes</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
