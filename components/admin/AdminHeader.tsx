"use client";

import { useState, useTransition } from "react";
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
  ChefHat,
  LogOut,
  User,
  Sliders,
} from "lucide-react";
import { logout } from "@/lib/actions/auth";
import type { UserRole } from "@/lib/definitions";

type Props = {
  session?: {
    userId: string;
    role?: UserRole;
    name?: string;
    email?: string;
  } | null;
};

export default function AdminHeader({ session }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await logout();
    });
  };

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
    {
      label: "Site Status",
      href: "/admin/settings",
      icon: Sliders,
      active: pathname.startsWith("/admin/settings"),
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink/10 bg-[#fdfbf7]/95 backdrop-blur-md transition-all">
      {/* Top micro-bar */}
      <div className="border-b border-ink/5 bg-cream/30 px-4 sm:px-6 py-1">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between text-[10px] font-ui uppercase tracking-widest text-muted">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
            <span className="font-semibold text-ink/80">CeylonSpicer Studio</span>
            <span className="hidden sm:inline text-ink/30">•</span>
            <span className="hidden sm:inline text-muted/70">Sri Lankan Culinary CMS</span>
          </div>
          <div className="flex items-center gap-3">
            {session && (
              <span className="hidden md:inline text-ink/70">
                Signed in as <strong className="text-ink">{session.name}</strong>
              </span>
            )}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-sage hover:text-sage-dark transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Brand & Admin Badge */}
        <div className="flex items-center gap-3.5">
          <Link
            href="/admin"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-ink/15 bg-white shadow-xs transition-transform group-hover:scale-105">
              <Image
                src="/favicon.ico"
                alt="CeylonSpicer favicon logo"
                width={32}
                height={32}
                className="h-full w-full object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-xl sm:text-2xl text-ink tracking-tight leading-none">
                  CeylonSpicer
                </span>
                <span className="inline-flex items-center rounded-sm bg-sunshine/25 px-1.5 py-0.5 font-ui text-[9px] font-bold uppercase tracking-widest text-ink border border-sunshine/40">
                  Admin
                </span>
              </div>
              <span className="font-ui text-[9px] uppercase tracking-wider text-muted mt-0.5">
                Content & Recipe Studio
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav
          className="hidden md:flex items-center gap-1.5 rounded-lg border border-ink/10 bg-white/70 p-1 shadow-2xs"
          aria-label="Admin Navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 font-ui text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                  item.active
                    ? "bg-sage text-white shadow-xs"
                    : "text-muted hover:text-ink hover:bg-linen/50"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-sage`}
              >
                <Icon className={`h-3.5 w-3.5 ${item.active ? "text-white" : "text-muted"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Public Link & User Profile / Logout */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] items-center gap-2 rounded-md border border-ink/15 bg-white px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider text-ink shadow-2xs transition-all hover:border-sage hover:text-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <ChefHat className="h-3.5 w-3.5 text-sage" />
            <span>View Public</span>
          </Link>

          {session && (
            <div className="flex items-center gap-2 border-l border-ink/10 pl-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cream border border-ink/15 text-ink font-display text-xs font-bold shadow-2xs">
                  {session.name ? session.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="font-ui text-xs font-bold text-ink leading-tight line-clamp-1 max-w-[120px]">
                    {session.name}
                  </span>
                  <span className="font-ui text-[9px] uppercase tracking-wider text-muted">
                    {session.role}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isPending}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/15 bg-white text-muted hover:text-red-600 hover:border-red-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                title="Sign Out"
                aria-label="Sign out of admin studio"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {session && (
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isPending}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-md border border-ink/15 bg-white px-2.5 py-1 text-xs text-muted hover:text-red-600"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="font-ui text-[10px] font-bold uppercase">Exit</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-ink/15 bg-white text-ink shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            aria-label="Toggle admin navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-ink/10 bg-[#fdfbf7] px-4 py-4 md:hidden shadow-lg animate-in slide-in-from-top-2">
          {session && (
            <div className="mb-3 flex items-center gap-3 border-b border-ink/10 pb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cream border border-ink/15 font-display text-sm font-bold text-ink">
                {session.name ? session.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div>
                <p className="font-ui text-xs font-bold text-ink">{session.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {session.role && (
                    <span className="font-ui text-[9px] uppercase tracking-wider text-muted font-medium">
                      {session.role}
                    </span>
                  )}
                  {session.role && session.email && (
                    <span className="text-muted/40 text-[9px]">•</span>
                  )}
                  <p className="font-ui text-[10px] text-muted">{session.email}</p>
                </div>
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-[44px] items-center gap-3 px-3 py-2.5 rounded-md font-ui text-xs font-bold uppercase tracking-wider transition-colors ${
                    item.active
                      ? "bg-sage text-white"
                      : "text-muted hover:text-ink hover:bg-cream/40"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-between rounded-md border border-ink/15 bg-white px-3 py-2.5 font-ui text-xs font-bold uppercase tracking-wider text-ink shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-sage" />
                <span>Open Public Blog</span>
              </div>
              <ExternalLink className="h-4 w-4 text-muted" />
            </Link>

            {session && (
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isPending}
                className="mt-1 flex min-h-[44px] w-full items-center justify-between rounded-md border border-red-200 bg-red-50/60 px-3 py-2.5 font-ui text-xs font-bold uppercase tracking-wider text-red-700"
              >
                <span>Sign Out of Studio</span>
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
