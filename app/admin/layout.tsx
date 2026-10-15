import type { Metadata } from "next";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Panel | CeylonSpicer",
  description: "Manage CeylonSpicer recipes, categories, and culinary stories.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f4] text-ink antialiased">
      {/* Admin Header */}
      <AdminHeader />

      {/* Main Admin Content */}
      <main className="flex-1 mx-auto w-full max-w-[1200px] px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-ink/10 bg-white py-4 mt-auto">
        <div className="mx-auto flex max-w-[1200px] flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted">
          <span>CeylonSpicer Content Studio • Internal Management</span>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Public Site
            </Link>
            <span>•</span>
            <Link
              href="/admin/recipes"
              className="hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Recipes
            </Link>
            <span>•</span>
            <Link
              href="/admin/categories"
              className="hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Categories
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
