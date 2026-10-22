import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { verifyAdminSession } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Admin Studio | CeylonSpicer",
  description: "Manage CeylonSpicer recipes, categories, and culinary stories.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Centralized authorization verification via Data Access Layer (DAL)
  // Ensures only 'admin' and 'editor' roles have access to the admin panel
  const session = await verifyAdminSession();

  return (
    <div className="flex min-h-screen flex-col bg-linen/20 dark:bg-obsidian text-ink dark:text-ice antialiased transition-colors">
      {/* Admin Header with Authenticated Session */}
      <AdminHeader session={session} />

      {/* Main Admin Content Area */}
      <main className="flex-1 mx-auto w-full max-w-[1240px] px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-ink/10 dark:border-hairline bg-white/80 dark:bg-surface/80 py-5 mt-auto">
        <div className="mx-auto flex max-w-[1240px] flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-sage dark:text-amber-primary" />
            <span>CeylonSpicer Content Studio • Internal Management</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Public Site
            </Link>
            <span className="text-ink/20 dark:text-hairline">•</span>
            <Link
              href="/admin/recipes"
              className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Recipes
            </Link>
            <span className="text-ink/20 dark:text-hairline">•</span>
            <Link
              href="/admin/categories"
              className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Categories
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
