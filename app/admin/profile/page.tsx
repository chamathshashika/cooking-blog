import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { verifyAdminSession } from "@/lib/dal";
import { getUserProfile } from "@/lib/actions/user";
import AdminProfileForm from "@/components/admin/AdminProfileForm";

export const metadata: Metadata = {
  title: "Chef Profile & Security Settings | CeylonSpicer Admin",
  description:
    "Manage your profile picture, display name, culinary bio, and account password.",
};

export default async function AdminProfilePage() {
  const session = await verifyAdminSession();
  const profileResult = await getUserProfile();

  const user = profileResult.success && profileResult.user
    ? profileResult.user
    : {
        id: session.userId,
        name: session.name || "Chef",
        email: session.email || "",
        role: session.role || "editor",
        avatar: session.avatar || "",
        bio: "",
      };

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-ink/10 dark:border-hairline pb-5">
        <div>
          <div className="flex items-center gap-2 font-ui text-xs text-muted dark:text-slate-muted mb-1">
            <Link
              href="/admin"
              className="hover:text-sage dark:hover:text-amber-text transition-colors uppercase tracking-wider"
            >
              Admin Studio
            </Link>
            <span>/</span>
            <span className="text-ink dark:text-ice font-semibold uppercase tracking-wider">
              Profile & Security
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink dark:text-ice">
            Profile & Security Settings
          </h1>
          <p className="mt-1 font-display text-xs text-muted dark:text-slate-muted">
            Update your profile picture, personal chef bio, and secure your account with a new password.
          </p>
        </div>

        <div className="flex items-center gap-2 font-ui text-xs text-muted dark:text-slate-muted bg-white dark:bg-panel border border-ink/10 dark:border-hairline rounded-lg px-3.5 py-2 shadow-2xs">
          <ShieldCheck className="h-4 w-4 text-sage dark:text-gold" />
          <span>
            Signed in as: <strong className="text-ink dark:text-ice">{user.name}</strong> ({user.role})
          </span>
        </div>
      </div>

      {/* Main Profile & Password Management Form */}
      <AdminProfileForm initialUser={user} />
    </div>
  );
}
