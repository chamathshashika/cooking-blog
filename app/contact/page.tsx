import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { cookies } from "next/headers";
import { translations } from "@/lib/i18n/translations";
import type { Language } from "@/lib/i18n/types";

export const metadata: Metadata = {
  title: "Contact Us | CeylonSpicer",
  description:
    "Get in touch with CeylonSpicer. Share a family recipe, ask a spice question, or say hello.",
  openGraph: {
    title: "Contact Us | CeylonSpicer",
    description:
      "Get in touch with CeylonSpicer. Share a family recipe, ask a spice question, or say hello.",
  },
};

export default async function ContactPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("ceylonspicer_language")?.value as Language) || "en";
  const dict = translations[lang] || translations.en;

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-obsidian transition-colors duration-200">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 dark:border-hairline bg-linen/30 dark:bg-surface/50 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
            <Link href="/" className="hover:text-ink dark:hover:text-ice transition-colors">
              {dict.nav.home}
            </Link>
            <span>/</span>
            <span className="text-ink dark:text-ice font-semibold">{dict.footer.contact}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-cream dark:bg-surface py-12 md:py-16 text-center border-b border-ink/10 dark:border-hairline transition-colors duration-200">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-sage/10 dark:bg-panel text-sage dark:text-amber-text font-ui text-[10px] font-bold uppercase tracking-[0.12em] border border-transparent dark:border-hairline">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{dict.contact.badge}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink dark:text-ice leading-tight">
              {dict.contact.title}
            </h1>

            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 dark:text-slate-muted max-w-xl mx-auto leading-relaxed">
              {dict.contact.subtitle}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-12 md:py-16">
          <div className="mb-6">
            <h2 className="font-display text-2xl text-ink dark:text-ice mb-2">
              {dict.contact.formTitle}
            </h2>
            <p className="font-display text-sm text-muted dark:text-slate-muted leading-relaxed">
              {dict.contact.formSubtitle}
            </p>
          </div>

          <ContactForm />

          {/* Recipe shortcut card */}
          <div className="mt-8 border border-ink/10 dark:border-hairline bg-cream/40 dark:bg-surface p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-display text-base text-ink dark:text-ice">
                {lang === "it"
                  ? "Cerchi ispirazione per cena?"
                  : "Looking for dinner inspiration?"}
              </p>
              <p className="font-display text-xs text-muted dark:text-slate-muted">
                {lang === "it"
                  ? "Esplora il nostro catalogo completo di autentiche ricette dello Sri Lanka."
                  : "Explore our full authentic Sri Lankan recipe catalog."}
              </p>
            </div>
            <Link
              href="/recipes"
              className="shrink-0 inline-flex items-center justify-center min-h-[44px] bg-sage dark:bg-amber-primary px-5 py-2.5 font-ui text-[11px] font-bold uppercase tracking-wider text-white dark:text-obsidian hover:bg-sage/90 dark:hover:bg-amber-secondary transition-colors"
            >
              {lang === "it" ? "Vedi Ricette" : "View Recipes"}
            </Link>
          </div>

          {/* Bottom Back Action */}
          <div className="mt-12 pt-8 border-t border-ink/10 dark:border-hairline">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-2 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-sage dark:text-amber-text hover:text-ink dark:hover:text-ice transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{dict.common.backToHome}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
