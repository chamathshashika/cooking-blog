import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock, MessageSquare, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | CeylonSpicer",
  description:
    "Get in touch with the CeylonSpicer kitchen. Share a family recipe, ask a spice question, or say hello.",
  openGraph: {
    title: "Contact Us | CeylonSpicer",
    description:
      "Get in touch with the CeylonSpicer kitchen. Share a family recipe, ask a spice question, or say hello.",
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-obsidian transition-colors duration-200">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 dark:border-hairline bg-linen/30 dark:bg-surface/50 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
            <Link href="/" className="hover:text-ink dark:hover:text-ice transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink dark:text-ice font-semibold">Contact</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-cream dark:bg-surface py-12 md:py-16 text-center border-b border-ink/10 dark:border-hairline transition-colors duration-200">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-sage/10 dark:bg-panel text-sage dark:text-amber-text font-ui text-[10px] font-bold uppercase tracking-[0.12em] border border-transparent dark:border-hairline">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Say Ayubowan</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink dark:text-ice leading-tight">
              Get in Touch with Our Kitchen
            </h1>

            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 dark:text-slate-muted max-w-xl mx-auto leading-relaxed">
              Have a question about balancing roasted curry powder, an heirloom
              family recipe to share, or a friendly note? Drop us a line below.
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left: Minimal Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl text-ink dark:text-ice mb-2">
                Send Us a Message
              </h2>
              <p className="font-display text-sm text-muted dark:text-slate-muted mb-6 leading-relaxed">
                Only the essentials needed—no account creation or clutter.
              </p>
              <ContactForm />
            </div>

            {/* Right: Direct Information & Details (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="border border-ink/10 dark:border-hairline bg-linen/20 dark:bg-panel p-6 sm:p-8">
                <h3 className="font-display text-xl text-ink dark:text-ice mb-6">
                  Kitchen Details
                </h3>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/10 dark:bg-surface text-sage dark:text-gold mt-0.5">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted">
                        Direct Inquiries
                      </p>
                      <a
                        href="mailto:hello@CeylonSpicer-recipes.com"
                        className="font-display text-base text-ink dark:text-ice hover:text-sage dark:hover:text-amber-text transition-colors"
                      >
                        hello@CeylonSpicer-recipes.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/10 dark:bg-surface text-sage dark:text-gold mt-0.5">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted">
                        Our Roots
                      </p>
                      <p className="font-display text-base text-ink dark:text-ice">
                        Colombo & Galle, Sri Lanka
                      </p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/10 dark:bg-surface text-sage dark:text-gold mt-0.5">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted">
                        Response Time
                      </p>
                      <p className="font-display text-sm text-ink/80 dark:text-slate-muted">
                        We typically reply within 24–48 hours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Connect */}
                <div className="mt-8 pt-6 border-t border-ink/10 dark:border-hairline">
                  <p className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted mb-3">
                    Connect on Social
                  </p>
                  <SocialIcons size="sm" />
                </div>
              </div>

              {/* Recipe shortcut card */}
              <div className="border border-ink/10 dark:border-hairline bg-cream/40 dark:bg-surface p-6 flex items-center justify-between">
                <div>
                  <p className="font-display text-base text-ink dark:text-ice">
                    Looking for dinner inspiration?
                  </p>
                  <p className="font-display text-xs text-muted dark:text-slate-muted">
                    Explore our full recipe catalog.
                  </p>
                </div>
                <Link
                  href="/recipes"
                  className="shrink-0 bg-sage dark:bg-amber-primary px-4 py-2 font-ui text-[10px] font-bold uppercase tracking-wider text-white hover:bg-sage/90 dark:hover:bg-amber-secondary transition-colors"
                >
                  View Recipes
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Back Action */}
          <div className="mt-16 pt-8 border-t border-ink/10 dark:border-hairline">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-sage dark:text-amber-text hover:text-ink dark:hover:text-ice transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
