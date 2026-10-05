import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock, MessageSquare, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Scrumptious",
  description:
    "Get in touch with the Scrumptious kitchen. Share a family recipe, ask a spice question, or say hello.",
  openGraph: {
    title: "Contact Us | Scrumptious",
    description:
      "Get in touch with the Scrumptious kitchen. Share a family recipe, ask a spice question, or say hello.",
  },
};

export default function ContactPage() {
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
            <span className="text-ink font-semibold">Contact</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-cream py-12 md:py-16 text-center border-b border-ink/10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-sage/10 text-sage font-ui text-[10px] font-bold uppercase tracking-[0.12em]">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Say Ayubowan</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
              Get in Touch with Our Kitchen
            </h1>

            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 max-w-xl mx-auto leading-relaxed">
              Have a question about balancing roasted curry powder, an heirloom family recipe to
              share, or a friendly note? Drop us a line below.
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left: Minimal Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl text-ink mb-2">Send Us a Message</h2>
              <p className="font-display text-sm text-muted mb-6 leading-relaxed">
                Only the essentials needed—no account creation or clutter.
              </p>
              <ContactForm />
            </div>

            {/* Right: Direct Information & Details (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="border border-ink/10 bg-linen/20 p-6 sm:p-8">
                <h3 className="font-display text-xl text-ink mb-6">Kitchen Details</h3>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage mt-0.5">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted">
                        Direct Inquiries
                      </p>
                      <a
                        href="mailto:hello@scrumptious-recipes.com"
                        className="font-display text-base text-ink hover:text-sage transition-colors"
                      >
                        hello@scrumptious-recipes.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage mt-0.5">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted">
                        Our Roots
                      </p>
                      <p className="font-display text-base text-ink">
                        Colombo & Galle, Sri Lanka
                      </p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage mt-0.5">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted">
                        Response Time
                      </p>
                      <p className="font-display text-sm text-ink/80">
                        We typically reply within 24–48 hours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Connect */}
                <div className="mt-8 pt-6 border-t border-ink/10">
                  <p className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted mb-3">
                    Connect on Social
                  </p>
                  <SocialIcons size="sm" />
                </div>
              </div>

              {/* Recipe shortcut card */}
              <div className="border border-ink/10 bg-cream/40 p-6 flex items-center justify-between">
                <div>
                  <p className="font-display text-base text-ink">Looking for dinner inspiration?</p>
                  <p className="font-display text-xs text-muted">Explore our full recipe catalog.</p>
                </div>
                <Link
                  href="/recipes"
                  className="shrink-0 bg-sage px-4 py-2 font-ui text-[10px] font-bold uppercase tracking-wider text-white hover:bg-sage/90 transition-colors"
                >
                  View Recipes
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Back Action */}
          <div className="mt-16 pt-8 border-t border-ink/10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-sage hover:text-ink transition-colors"
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
