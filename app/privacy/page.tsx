import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, EyeOff, Lock, Mail, Cookie, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Scrumptious",
  description:
    "Our simple and transparent privacy policy. Scrumptious does not collect, track, or sell your personal data.",
  openGraph: {
    title: "Privacy Policy | Scrumptious",
    description:
      "Simple, transparent privacy. We do not track, collect, or store your personal data.",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "October 2026";

  const keyPoints = [
    {
      icon: EyeOff,
      title: "No Data Tracking",
      description:
        "We do not track your browsing habits across the web, build advertising profiles, or monetize your activity.",
    },
    {
      icon: Lock,
      title: "No Mandatory Accounts",
      description:
        "All recipes, cooking techniques, and stories are completely free and open. You don't need to log in or submit personal details to view our dishes.",
    },
    {
      icon: Mail,
      title: "Optional Newsletter",
      description:
        "If you choose to subscribe to our 'Never miss a recipe' updates, we only use your email to send culinary news. We never sell or share subscriber addresses.",
    },
    {
      icon: Cookie,
      title: "No Invasive Cookies",
      description:
        "We do not use third-party advertising cookies or behavioral tracking scripts. Any local browser storage is used strictly for basic display preferences.",
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
            <span className="text-ink font-semibold">Privacy Policy</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-cream py-12 md:py-16 text-center border-b border-ink/10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-sage/10 text-sage font-ui text-[10px] font-bold uppercase tracking-[0.12em]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Simple & Transparent</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
              Privacy Policy
            </h1>

            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 max-w-xl mx-auto leading-relaxed">
              We believe in honest home cooking and straightforward privacy. We do not track,
              collect, or sell your personal data.
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
                    <h2 className="font-display text-lg text-ink">{item.title}</h2>
                  </div>
                  <p className="font-display text-xs sm:text-sm text-ink/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Policy Text */}
          <div className="space-y-8 font-display text-sm sm:text-base text-ink/85 leading-relaxed">
            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
                1. Our Core Commitment
              </h2>
              <p>
                At <strong>Scrumptious</strong>, our sole focus is celebrating authentic Sri
                Lankan culinary heritage, traditional family recipes, and spice stories. We have
                no desire to monitor your private browsing habits or build digital profiles. You
                are free to read, bookmark, copy ingredient measurements, and cook every dish
                without giving us your identity.
              </p>
            </section>

            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
                2. Information We Do Not Collect
              </h2>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>We do not collect names, phone numbers, or physical addresses.</li>
                <li>We do not record your IP address or associate it with your personal identity.</li>
                <li>We do not use fingerprinting techniques or third-party behavioral analytics.</li>
                <li>We do not sell, rent, or trade any visitor data to marketing networks.</li>
              </ul>
            </section>

            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
                3. Newsletter Subscriptions
              </h2>
              <p>
                If you voluntarily submit your email in our &ldquo;Never miss a recipe&rdquo;
                form, your email address is used strictly to deliver recipe notifications and food
                essays. You can unsubscribe at any time with a single click, which permanently
                removes your contact information.
              </p>
            </section>

            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
                4. Cookies & Storage
              </h2>
              <p>
                We do not deploy tracking cookies or cross-site advertising scripts. Any minimal
                local storage utilized by your browser is strictly functional (such as remembering
                checklist ticks on our interactive recipe ingredient lists so you don&apos;t lose
                your place while cooking).
              </p>
            </section>

            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
                5. Third-Party Media
              </h2>
              <p>
                Our recipe photography is served through trusted content delivery networks (such
                as Unsplash for high-definition culinary imagery) to ensure fast page loading
                speeds. These providers operate under standard web delivery protocols and do not
                receive your personal information from us.
              </p>
            </section>

            <section className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-2xl text-ink mb-3">
                6. Questions & Contact
              </h2>
              <p>
                If you have any questions regarding our simple privacy philosophy or recipe
                content, feel free to get in touch with us at{" "}
                <span className="font-mono text-xs bg-cream px-2 py-0.5 border border-ink/10">
                  hello@scrumptious-recipes.com
                </span>.
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
              <span>Back to Recipes</span>
            </Link>

            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 bg-sage px-5 py-2.5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage/90 transition-colors shadow-xs"
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
