"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Globe,
  Clock,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ExternalLink,
  ShieldAlert,
  Calendar,
  Sparkles,
  Info,
} from "lucide-react";
import {
  updateSiteStatus,
  type SiteStatusData,
  type SiteMode,
} from "@/lib/actions/siteStatus";
import { useToast } from "@/components/ToastProvider";

type Props = {
  initialStatus: SiteStatusData;
  adminName?: string;
  userRole?: string;
};

export default function SiteStatusManager({
  initialStatus,
  adminName = "Administrator",
  userRole = "admin",
}: Props) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [mode, setMode] = useState<SiteMode>(initialStatus.mode || "live");
  const [headline, setHeadline] = useState(initialStatus.headline || "");
  const [message, setMessage] = useState(initialStatus.message || "");
  const [expectedLaunchDate, setExpectedLaunchDate] = useState(
    initialStatus.expectedLaunchDate || ""
  );

  const isAdmin = userRole === "admin";

  const handleSave = () => {
    if (!isAdmin) {
      showToast(
        "Unauthorized: Only administrators have permission to update site visibility status.",
        "error"
      );
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateSiteStatus({
          mode,
          headline,
          message,
          expectedLaunchDate,
        });

        if (result.success) {
          const modeLabels: Record<SiteMode, string> = {
            live: "Live Website",
            coming_soon: "Coming Soon",
            under_construction: "Under Construction",
          };
          showToast(
            `Site status successfully updated to "${modeLabels[mode]}".`,
            "success"
          );
        } else {
          showToast(result.error || "Failed to update site status.", "error");
        }
      } catch (err) {
        console.error("Site status update failed:", err);
        showToast("An unexpected error occurred while saving site status.", "error");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Notification / Role Warning if Editor */}
      {!isAdmin && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900 shadow-2xs">
          <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600" />
          <div className="text-xs font-ui">
            <strong className="font-semibold">Read-Only Permission:</strong> You are
            currently signed in with the <strong>{userRole}</strong> role. Only
            users with full <strong>admin</strong> privileges can modify public site visibility.
          </div>
        </div>
      )}

      {/* Mode Selection Cards */}
      <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-7 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-ink/10 pb-4 mb-6">
          <div>
            <h2 className="font-display text-xl text-ink">Public Visibility & Access Mode</h2>
            <p className="mt-0.5 font-display text-xs text-muted">
              Control whether the blog is open to the public, or restricted to Coming Soon or Under Construction pages.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-ui text-[11px] font-bold uppercase tracking-wider text-muted">
              Current:
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-wider ${
                mode === "live"
                  ? "bg-sage/20 text-sage-dark border border-sage/40"
                  : mode === "coming_soon"
                  ? "bg-sunshine/30 text-ink border border-sunshine/60"
                  : "bg-amber-100 text-amber-900 border border-amber-300"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  mode === "live"
                    ? "bg-sage"
                    : mode === "coming_soon"
                    ? "bg-sunshine"
                    : "bg-amber-500"
                }`}
              />
              {mode === "live"
                ? "Live Website"
                : mode === "coming_soon"
                ? "Coming Soon"
                : "Under Construction"}
            </span>
          </div>
        </div>

        {/* 3 Interactive Mode Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Option 1: Live */}
          <div
            onClick={() => isAdmin && setMode("live")}
            className={`relative rounded-xl border p-5 transition-all cursor-pointer ${
              mode === "live"
                ? "border-sage bg-[#fafbf8] shadow-sm ring-2 ring-sage/30"
                : "border-ink/10 bg-white hover:border-ink/20 hover:bg-cream/10"
            } ${!isAdmin ? "cursor-not-allowed opacity-70" : ""}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  mode === "live" ? "bg-sage text-white" : "bg-cream text-ink"
                }`}
              >
                <Globe className="h-5 w-5" />
              </div>
              {mode === "live" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-sage/15 px-2 py-0.5 font-ui text-[10px] font-bold uppercase tracking-wider text-sage-dark">
                  <CheckCircle2 className="h-3 w-3" />
                  Active
                </span>
              )}
            </div>

            <h3 className="font-display text-base font-semibold text-ink">
              Live Website
            </h3>
            <p className="mt-1 font-display text-xs text-muted leading-relaxed">
              Open to the world. All recipes, categories, food stories, and search features are publicly accessible.
            </p>

            <div className="mt-4 pt-3 border-t border-ink/5 flex items-center justify-between text-[11px] font-ui text-muted">
              <span>Audience: Everyone</span>
              <Link
                href="/"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 font-bold text-sage hover:underline"
              >
                <span>View Live</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Option 2: Coming Soon */}
          <div
            onClick={() => isAdmin && setMode("coming_soon")}
            className={`relative rounded-xl border p-5 transition-all cursor-pointer ${
              mode === "coming_soon"
                ? "border-sunshine/80 bg-sunshine/5 shadow-sm ring-2 ring-sunshine/40"
                : "border-ink/10 bg-white hover:border-ink/20 hover:bg-cream/10"
            } ${!isAdmin ? "cursor-not-allowed opacity-70" : ""}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  mode === "coming_soon"
                    ? "bg-sunshine text-ink"
                    : "bg-cream text-ink"
                }`}
              >
                <Clock className="h-5 w-5" />
              </div>
              {mode === "coming_soon" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-sunshine/30 px-2 py-0.5 font-ui text-[10px] font-bold uppercase tracking-wider text-ink">
                  <CheckCircle2 className="h-3 w-3" />
                  Active
                </span>
              )}
            </div>

            <h3 className="font-display text-base font-semibold text-ink">
              Coming Soon
            </h3>
            <p className="mt-1 font-display text-xs text-muted leading-relaxed">
              Pre-launch tease. Regular visitors only see the Coming Soon page. Only administrators can browse the full site.
            </p>

            <div className="mt-4 pt-3 border-t border-ink/5 flex items-center justify-between text-[11px] font-ui text-muted">
              <span>Audience: Admin Only</span>
              <Link
                href="/coming-soon"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 font-bold text-sage hover:underline"
              >
                <span>Preview</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Option 3: Under Construction */}
          <div
            onClick={() => isAdmin && setMode("under_construction")}
            className={`relative rounded-xl border p-5 transition-all cursor-pointer ${
              mode === "under_construction"
                ? "border-amber-400 bg-amber-50/40 shadow-sm ring-2 ring-amber-300"
                : "border-ink/10 bg-white hover:border-ink/20 hover:bg-cream/10"
            } ${!isAdmin ? "cursor-not-allowed opacity-70" : ""}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  mode === "under_construction"
                    ? "bg-amber-500 text-white"
                    : "bg-cream text-ink"
                }`}
              >
                <Wrench className="h-5 w-5" />
              </div>
              {mode === "under_construction" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 font-ui text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  <CheckCircle2 className="h-3 w-3" />
                  Active
                </span>
              )}
            </div>

            <h3 className="font-display text-base font-semibold text-ink">
              Under Construction
            </h3>
            <p className="mt-1 font-display text-xs text-muted leading-relaxed">
              Kitchen maintenance. Regular visitors only see the Under Construction page. Only administrators can browse the full site.
            </p>

            <div className="mt-4 pt-3 border-t border-ink/5 flex items-center justify-between text-[11px] font-ui text-muted">
              <span>Audience: Admin Only</span>
              <Link
                href="/under-construction"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 font-bold text-sage hover:underline"
              >
                <span>Preview</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Copy & Launch Timeline Settings */}
      {mode !== "live" && (
        <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-7 shadow-2xs space-y-4 animate-in fade-in-50 duration-200">
          <div>
            <h3 className="font-display text-lg text-ink">
              Custom Page Messaging ({mode === "coming_soon" ? "Coming Soon" : "Under Construction"})
            </h3>
            <p className="mt-0.5 font-display text-xs text-muted">
              Customize the headline, announcement copy, and target timeline shown to your visitors.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Custom Headline */}
            <div>
              <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                Headline
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder={
                  mode === "coming_soon"
                    ? "e.g. Something Rich & Flavorful is Simmering in Ceylon..."
                    : "e.g. Our Kitchen is Getting a Fresh Coat of Spices"
                }
                className="w-full min-h-[42px] rounded-lg border border-ink/15 bg-linen/20 px-3.5 font-ui text-xs text-ink placeholder:text-muted/60 focus:border-sage focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Custom Announcement Message */}
            <div>
              <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                Announcement Message
              </label>
              <textarea
                rows={3}
                disabled={!isAdmin}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  mode === "coming_soon"
                    ? "e.g. We are preparing an aromatic journey through Sri Lanka's finest recipes..."
                    : "e.g. We are currently restocking our kitchen shelves and fine-tuning authentic recipe collections..."
                }
                className="w-full rounded-lg border border-ink/15 bg-linen/20 p-3 font-ui text-xs text-ink placeholder:text-muted/60 focus:border-sage focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:bg-gray-100 disabled:cursor-not-allowed resize-y"
              />
            </div>

            {/* Expected Launch Date */}
            <div>
              <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                Target Launch / Reopening Timeline (Optional)
              </label>
              <div className="relative max-w-sm">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                <input
                  type="text"
                  disabled={!isAdmin}
                  value={expectedLaunchDate}
                  onChange={(e) => setExpectedLaunchDate(e.target.value)}
                  placeholder="e.g. December 2026 or Next Monday"
                  className="w-full min-h-[42px] rounded-lg border border-ink/15 bg-linen/20 pl-10 pr-3.5 font-ui text-xs text-ink placeholder:text-muted/60 focus:border-sage focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-ink/10 bg-white p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center gap-2 font-ui text-xs text-muted">
          <Info className="h-4 w-4 text-sage shrink-0" />
          <span>
            {initialStatus.updatedAt ? (
              <>
                Last updated by <strong>{initialStatus.updatedBy || "Administrator"}</strong> on{" "}
                {new Date(initialStatus.updatedAt).toLocaleDateString()}
              </>
            ) : (
              "Default live mode active"
            )}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending || !isAdmin}
            className="inline-flex min-h-[44px] min-w-[160px] items-center justify-center gap-2 rounded-lg bg-sage px-6 font-ui text-xs font-bold uppercase tracking-wider text-white shadow-2xs hover:bg-sage-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Updating Status...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Save Site Status</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
