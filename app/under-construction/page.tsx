import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSiteStatus } from "@/lib/actions/siteStatus";

export const metadata: Metadata = {
  title: "Under Construction | CeylonSpicer",
  description:
    "Under Construction — CeylonSpicer Authentic Sri Lankan Culinary Journal.",
};

export default async function UnderConstructionPage() {
  const status = await getSiteStatus();

  return (
    <main className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center px-4 relative overflow-hidden select-none">
      {/* Subtle warm ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-sunshine/25 blur-3xl -z-10"
      />

      <div className="text-center space-y-4 max-w-xl mx-auto">
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

        {/* Prominent Under Construction Heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink tracking-tight">
          Under Construction
        </h1>

        {/* Reassuring Subtitle Text */}
        <p className="font-display text-base sm:text-lg text-muted leading-relaxed max-w-lg mx-auto">
          {status.message ||
            "Our kitchen is currently undergoing a brief refresh. We'll be back simmering shortly with new recipes and culinary stories."}
        </p>

        {status.expectedLaunchDate && (
          <p className="font-ui text-xs text-muted/80 uppercase tracking-widest pt-1">
            Expected reopening: <strong className="text-ink">{status.expectedLaunchDate}</strong>
          </p>
        )}
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
