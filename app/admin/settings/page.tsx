import type { Metadata } from "next";
import Link from "next/link";
import { Sliders, ShieldCheck } from "lucide-react";
import SiteStatusManager from "@/components/admin/SiteStatusManager";
import { getSiteStatus } from "@/lib/actions/siteStatus";
import { verifyAdminSession } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Site Visibility & Status Settings | CeylonSpicer Admin",
  description:
    "Manage public visibility of the blog, including live status, coming soon mode, and under construction maintenance mode.",
};

export default async function AdminSettingsPage() {
  const session = await verifyAdminSession();
  const currentStatus = await getSiteStatus();

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-ink/10 pb-5">
        <div>
          <div className="flex items-center gap-2 font-ui text-xs text-muted mb-1">
            <Link
              href="/admin"
              className="hover:text-sage transition-colors uppercase tracking-wider"
            >
              Admin Studio
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold uppercase tracking-wider">
              Site Settings & Visibility
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink">
            Site Status & Visibility Control
          </h1>
          <p className="mt-1 font-display text-xs text-muted">
            Configure whether your food blog is public or restricted to a Coming Soon or Under Construction landing page.
          </p>
        </div>

        <div className="flex items-center gap-2 font-ui text-xs text-muted bg-white border border-ink/10 rounded-lg px-3.5 py-2 shadow-2xs">
          <ShieldCheck className="h-4 w-4 text-sage" />
          <span>
            Admin Authority: <strong className="text-ink">{session.name}</strong>
          </span>
        </div>
      </div>

      {/* Main Settings Component */}
      <SiteStatusManager
        initialStatus={currentStatus}
        adminName={session.name}
        userRole={session.role}
      />
    </div>
  );
}
