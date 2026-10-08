import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  Utensils,
  AlertTriangle,
  HeartHandshake,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | CeylonSpicer",
  description:
    "Terms of service and fair usage guidelines for CeylonSpicer recipes, photography, and Sri Lankan culinary stories.",
  openGraph: {
    title: "Terms of Service | CeylonSpicer",
    description:
      "Simple, fair guidelines for enjoying our Sri Lankan recipes, photography, and cooking guides.",
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
      icon: AlertTriangle,
      title: "Allergens & Health",
      description:
        "Sri Lankan recipes frequently use coconut, nuts, seafood, and robust spices. Always verify ingredients to ensure they align with your dietary requirements.",
    },
    {
      icon: HeartHandshake,
      title: "Community Respect",
      description:
        "We are dedicated to celebrating culinary heritage. We welcome friendly food discussions, recipe tips, and constructive culinary feedback.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 bg-linen/30 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">Terms of Service</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-cream py-12 md:py-16 text-center border-b border-ink/10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-sage/10 text-sage font-ui text-[10px] font-bold uppercase tracking-[0.12em]">
              <FileText className="h-3.5 w-3.5" />
              <span>Fair Usage Guidelines</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
              Terms of Service
            </h1>

            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 max-w-xl mx-auto leading-relaxed">
              Simple, fair guidelines for enjoying our authentic Sri Lankan
              recipes, photography, and culinary stories.
            </p>

            <p className="mt-4 font-ui text-xs text-muted">
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
                  className="border border-ink/10 bg-linen/20 p-6 flex flex-col justify-start"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h2 className="font-display text-lg text-ink">
                      {item.title}
                    </h2>
                  </div>
                  <p className="font-display text-xs sm:text-sm text-ink/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Terms Text */}
          <div className="space-y-8 font-display text-sm sm:text-base text-ink/85 leading-relaxed">
            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using <strong>CeylonSpicer</strong>{" "}
                (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the
                blog&rdquo;), you agree to abide by these simple and fair Terms
                of Service. If you do not agree with any part of these terms,
                please feel free to discontinue using the website.
              </p>
            </section>

            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
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

            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
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
                  Credit <strong>CeylonSpicer</strong> clearly with an active
                  link back to the original recipe URL.
                </li>
                <li>
                  Do not scrape or re-host our original food images without
                  explicit permission.
                </li>
              </ul>
            </section>

            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
                4. Cooking, Allergies & Health Disclaimer
              </h2>
              <p>
                Sri Lankan cuisine makes rich and diverse use of ingredients
                including fresh coconut, Maldive fish, seafood, crustaceans,
                tree nuts (such as cashews), and intense chili varieties.
                Cooking times and temperatures are recommendations and can vary
                depending on your stove, cookware, and climate.
              </p>
              <p className="mt-2 text-ink/75">
                Cooks are responsible for confirming allergen safety for
                themselves and their guests, practicing safe food handling
                (especially with seafood, meats, and raw marinades), and
                adjusting spice levels to their personal tolerance.
              </p>
            </section>

            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
                5. External Links & Third-Party Content
              </h2>
              <p>
                Our articles may occasionally reference external sources,
                historical culinary archives, or spice suppliers. We do not
                control and are not responsible for the availability, accuracy,
                or privacy policies of third-party websites.
              </p>
            </section>

            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
                6. Modifications & Contact
              </h2>
              <p>
                We reserve the right to refine these terms as our platform
                evolves. Any updates will be clearly posted on this page with an
                updated timestamp.
              </p>
              <p className="mt-2">
                For questions regarding recipe licensing, content syndication,
                or friendly feedback, please contact us at{" "}
                <span className="font-mono text-xs bg-cream px-2 py-0.5 border border-ink/10">
                  hello@CeylonSpicer-recipes.com
                </span>
                .
              </p>
            </section>
          </div>

          {/* Back Action */}
          <div className="mt-12 pt-8 border-t border-ink/10 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-sage hover:text-ink transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 bg-sage px-5 py-2.5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage/90 transition-colors shadow-xs"
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
