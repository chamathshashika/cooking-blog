"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

export default function AdminHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      label: "Recipes",
      href: "/admin/recipes",
      icon: BookOpen,
      active: pathname.startsWith("/admin/recipes"),
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: Layers,
      active: pathname.startsWith("/admin/categories"),
    },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-ink/10 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 sm:px-6 py-4">
        {/* Brand & Admin Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-ink/15 bg-white shadow-xs">
              <Image
                src="/favicon.ico"
                alt="CeylonSpicer favicon logo"
                width={32}
                height={32}
                className="h-full w-full object-contain p-0.5"
                priority
              />
            </div>
            <span className="font-display text-xl sm:text-2xl text-ink tracking-tight">
              CeylonSpicer
            </span>
          </Link>
          <span className="inline-flex items-center bg-white px-2 py-0.5 font-ui text-[10px] font-bold uppercase tracking-widest text-ink border border-ink/15">
            Admin Panel
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Admin Navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 font-ui text-xs font-semibold uppercase tracking-wider transition-colors ${
                  item.active
                    ? "bg-white text-ink border-b-2 border-sage"
                    : "text-muted hover:text-ink hover:bg-cream/60"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-sage`}
              >
                <Icon className={`h-4 w-4 ${item.active ? "text-sage" : "text-muted"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: View Live Blog */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 border border-ink/20 bg-white px-3.5 py-2 font-ui text-[11px] font-bold uppercase tracking-wider text-ink transition-colors hover:border-sage hover:text-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <span>View Blog</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-muted hover:text-ink"
            aria-label="View public site"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            aria-label="Toggle admin navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-ink/10 bg-cream px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-[44px] items-center gap-3 px-3 py-2.5 font-ui text-xs font-semibold uppercase tracking-wider ${
                    item.active
                      ? "bg-white text-ink border-l-4 border-sage"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-between border border-ink/15 bg-white px-3 py-2.5 font-ui text-xs font-bold uppercase tracking-wider text-ink"
            >
              <span>View Public Blog</span>
              <ExternalLink className="h-4 w-4 text-muted" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
