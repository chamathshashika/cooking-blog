import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Utensils, Flame, Sparkles, Heart, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscribeBanner from "@/components/SubscribeBanner";

export const metadata: Metadata = {
  title: "About Us | Authentic Sri Lankan Culinary Heritage | CeylonSpicer",
  description:
    "Discover the story behind CeylonSpicer — celebrating time-honored Sri Lankan home cooking, vibrant island spices, and heartfelt culinary memories.",
  openGraph: {
    title: "About Us | CeylonSpicer",
    description:
      "Celebrating time-honored Sri Lankan home cooking, vibrant island spices, and heartfelt culinary memories.",
  },
};

export default function AboutPage() {
  const pillars = [
    {
      icon: Utensils,
      title: "Heirloom Family Recipes",
      description:
        "Every recipe shared on CeylonSpicer originates from generational Sri Lankan home kitchens—passed down through handwritten notebooks, simmered in clay pots, and perfected across family tables.",
    },
    {
      icon: Flame,
      title: "Mastery of Island Spices",
      description:
        "From true Ceylon cinnamon (Cinnamomum verum) and dark-roasted black curry powders to fragrant pandan and tempered mustard seeds, we demystify the bold aromatics of the island.",
    },
    {
      icon: Heart,
      title: "Warm, Welcoming Cooking",
      description:
        "We believe homestyle cooking should feel comforting and effortless. We break down traditional techniques with clear steps, measured ingredients, and practical kitchen tips.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 bg-linen/30 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted">
            <Link
              href="/"
              className="hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink font-semibold">About</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-cream py-14 md:py-20 text-center border-b border-ink/10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-sage/10 text-sage font-ui text-[10px] font-bold uppercase tracking-[0.12em]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Our Culinary Journey</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight max-w-3xl mx-auto">
              Preserving the Warmth of Sri Lankan Home Cooking
            </h1>

            <p className="mt-4 font-display text-base sm:text-lg text-ink/80 max-w-2xl mx-auto leading-relaxed">
              CeylonSpicer is a labor of love dedicated to the flavors of our
              island home—where the aroma of toasted spices, crackling curry
              leaves, and sweet coconut milk brings family and friends together.
            </p>
          </div>
        </section>

        {/* Brand Narrative Section */}
        <section className="mx-auto max-w-[1000px] px-4 sm:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6 relative aspect-[4/3] overflow-hidden bg-linen border border-ink/10 shadow-xs">
              <Image
                src="/images/recipes/sri-lankan-chicken-curry.jpg"
                alt="Traditional Sri Lankan clay pot cooking with spices"
                fill
                sizes="(min-width: 768px) 500px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="md:col-span-6 space-y-4 font-display text-ink/85 leading-relaxed">
              <p className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-sage">
                Ayubowan & Welcome
              </p>
              <h2 className="font-display text-2xl sm:text-3xl text-ink leading-snug">
                Food That Tells the Story of an Island
              </h2>
              <p className="text-base">
                Sri Lanka&apos;s culinary heritage is shaped by rich coastal
                trade routes, ancient irrigation valleys, and diverse cultural
                communities. From the fiery seafood curries of Jaffna and the
                fragrant Dutch Burghers&apos; lamprais to comforting southern
                ambul thiyal, each dish carries centuries of memories.
              </p>
              <p className="text-base">
                At CeylonSpicer, our kitchen philosophy is simple: celebrate
                authentic ingredients, honor the patience required for slow
                roasting and gentle simmering, and make these beloved recipes
                accessible to cooks around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Pillars / Values Section */}
        <section
          className="border-y border-ink/10 bg-linen/20 py-14 md:py-20"
          aria-label="Our Culinary Principles"
        >
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-12">
              <p className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-muted mb-2">
                What Guides Us
              </p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-ink">
                Our Cooking Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="border border-ink/10 bg-white p-6 sm:p-8 flex flex-col justify-start text-center sm:text-left shadow-xs"
                  >
                    <div className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage mb-5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-xl text-ink mb-3">
                      {item.title}
                    </h3>
                    <p className="font-display text-sm text-ink/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Explore Invitation */}
        <section className="mx-auto max-w-[900px] px-4 sm:px-6 py-14 md:py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-ink mb-4">
            Ready to Cook Something Wonderful?
          </h2>
          <p className="font-display text-base text-ink/80 max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you&apos;re crafting fresh string hoppers for breakfast or
            slow-simmering a rich chicken curry for dinner, we invite you into
            our kitchen.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/recipes"
              className="inline-flex min-h-[44px] items-center gap-2 bg-sage px-7 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage-dark transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <span>Explore All Recipes</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/category"
              className="inline-flex min-h-[44px] items-center gap-2 border border-ink/20 bg-white px-7 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-ink hover:bg-cream hover:border-ink/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <span>Browse Categories</span>
            </Link>
          </div>
        </section>

        {/* Subscribe Banner */}
        <div className="mt-8">
          <SubscribeBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
