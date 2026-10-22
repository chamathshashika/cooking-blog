import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Coming Soon | CeylonSpicer",
  description: "Coming Soon — CeylonSpicer Authentic Sri Lankan Culinary Journal.",
};

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center px-4 relative overflow-hidden select-none">
      {/* Subtle warm ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-sunshine/25 blur-3xl -z-10"
      />

      <div className="text-center space-y-4">
        {/* Subtle Brand Wordmark */}
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-md border border-ink/10 bg-white p-1 shadow-2xs">
            <Image
              src="/favicon.ico"
              alt="CeylonSpicer logo"
              width={24}
              height={24}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <span className="font-display text-xl text-ink tracking-tight">
            CeylonSpicer
          </span>
        </div>

        {/* Prominent Coming Soon Heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink tracking-tight">
          Coming Soon
        </h1>
      </div>

      {/* Discreet Chef / Admin Login Link in bottom-right corner */}
      <div className="absolute bottom-6 right-6">
        <Link
          href="/login"
          className="font-ui text-[11px] text-muted/60 hover:text-ink transition-colors uppercase tracking-wider"
        >
          Chef Access
        </Link>
      </div>
    </main>
  );
}
