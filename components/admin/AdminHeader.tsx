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
import ThemeToggle from "@/components/ThemeToggle";

type Props = {
  session?: {
    userId: string;
    role?: UserRole;
    name?: string;
    email?: string;
    avatar?: string;
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
    {
      label: "Profile",
      href: "/admin/profile",
      icon: User,
      active: pathname.startsWith("/admin/profile"),
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink/10 dark:border-hairline bg-white/95 dark:bg-surface/95 backdrop-blur-md transition-all">
      {/* Top micro-bar */}
      <div className="border-b border-ink/5 dark:border-hairline bg-cream/30 dark:bg-panel/40 px-4 sm:px-6 md:px-8 xl:px-12 py-1">
        <div className="w-full flex items-center justify-between text-[10px] font-ui uppercase tracking-widest text-muted dark:text-slate-muted">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
            <span className="font-semibold text-ink/80 dark:text-ice/90">CeylonSpicer Studio</span>
            <span className="hidden sm:inline text-ink/30 dark:text-ice/20">•</span>
            <span className="hidden sm:inline text-muted/70 dark:text-slate-muted/70">Sri Lankan Culinary CMS</span>
          </div>
          <div className="flex items-center gap-3">
            {session && (
              <span className="hidden md:inline text-ink/70 dark:text-ice/70">
                Signed in as <strong className="text-ink dark:text-ice">{session.name}</strong>
              </span>
            )}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-sage dark:text-amber-text hover:text-sage-dark dark:hover:text-gold transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 xl:px-12 py-3.5">
        {/* Brand & Admin Badge */}
        <div className="flex items-center gap-3.5">
          <Link
            href="/admin"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel shadow-xs transition-transform group-hover:scale-105">
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
                <span className="font-display text-xl sm:text-2xl text-ink dark:text-ice tracking-tight leading-none">
                  CeylonSpicer
                </span>
                <span className="inline-flex items-center rounded-sm bg-sunshine/25 dark:bg-amber-primary/20 px-1.5 py-0.5 font-ui text-[9px] font-bold uppercase tracking-widest text-ink dark:text-ice border border-sunshine/40 dark:border-amber-primary/40">
                  Admin
                </span>
              </div>
              <span className="font-ui text-[9px] uppercase tracking-wider text-muted dark:text-slate-muted mt-0.5">
                Content & Recipe Studio
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav
          className="hidden md:flex items-center gap-1.5 rounded-lg border border-ink/10 dark:border-hairline bg-white/70 dark:bg-panel/70 p-1 shadow-2xs"
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
                    ? "bg-sage dark:bg-emerald-600 text-white shadow-xs"
                    : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice hover:bg-linen/50 dark:hover:bg-surface"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-emerald-500`}
              >
                <Icon className={`h-3.5 w-3.5 ${item.active ? "text-white" : "text-muted dark:text-slate-muted"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle, Public Link & User Profile / Logout */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle variant="minimal" />

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] items-center gap-2 rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider text-ink dark:text-ice shadow-2xs transition-all hover:border-sage dark:hover:border-amber-primary hover:text-sage dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <ChefHat className="h-3.5 w-3.5 text-sage dark:text-gold" />
            <span>View Public</span>
          </Link>

          {session && (
            <div className="flex items-center gap-2 border-l border-ink/10 dark:border-hairline pl-3">
              <Link
                href="/admin/profile"
                className="flex items-center gap-2.5 group p-1 -m-1 rounded-lg hover:bg-linen/50 dark:hover:bg-panel transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                title="Profile & Security Settings"
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cream dark:bg-panel border border-ink/15 dark:border-hairline text-ink dark:text-ice font-display text-xs font-bold shadow-2xs overflow-hidden shrink-0 group-hover:border-sage dark:group-hover:border-emerald-500 transition-colors">
                  {session.avatar ? (
                    <Image
                      src={session.avatar}
                      alt={session.name || "Chef"}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  ) : session.name ? (
                    session.name.charAt(0).toUpperCase()
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="font-ui text-xs font-bold text-ink dark:text-ice leading-tight line-clamp-1 max-w-[120px] group-hover:text-sage dark:group-hover:text-emerald-400 transition-colors">
                    {session.name}
                  </span>
                  <span className="font-ui text-[9px] uppercase tracking-wider text-muted dark:text-slate-muted">
                    {session.role}
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isPending}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel text-muted dark:text-slate-muted hover:text-red-600 hover:border-red-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                title="Sign Out"
                aria-label="Sign out of admin studio"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle variant="minimal" />

          {session && (
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isPending}
              className="inline-flex min-h-[38px] items-center gap-1 rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel px-2.5 py-1 text-xs text-muted dark:text-slate-muted hover:text-red-600"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="font-ui text-[10px] font-bold uppercase">Exit</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel text-ink dark:text-ice shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            aria-label="Toggle admin navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-ink/10 dark:border-hairline bg-white dark:bg-surface px-4 py-4 md:hidden shadow-lg animate-in slide-in-from-top-2">
          {session && (
            <Link
              href="/admin/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="mb-3 flex items-center justify-between border-b border-ink/10 dark:border-hairline pb-3 hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-cream dark:bg-panel border border-ink/15 dark:border-hairline font-display text-sm font-bold text-ink dark:text-ice overflow-hidden shrink-0">
                  {session.avatar ? (
                    <Image
                      src={session.avatar}
                      alt={session.name || "Chef"}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : session.name ? (
                    session.name.charAt(0).toUpperCase()
                  ) : (
                    "A"
                  )}
                </div>
                <div>
                  <p className="font-ui text-xs font-bold text-ink dark:text-ice">{session.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {session.role && (
                      <span className="font-ui text-[9px] uppercase tracking-wider text-muted dark:text-slate-muted font-medium">
                        {session.role}
                      </span>
                    )}
                    {session.role && session.email && (
                      <span className="text-muted/40 text-[9px]">•</span>
                    )}
                    <p className="font-ui text-[10px] text-muted dark:text-slate-muted">{session.email}</p>
                  </div>
                </div>
              </div>
              <span className="font-ui text-[10px] uppercase font-bold text-sage dark:text-emerald-400 border border-sage/30 dark:border-emerald-500/30 rounded px-2 py-0.5">
                Edit
              </span>
            </Link>
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
                      ? "bg-sage dark:bg-emerald-600 text-white shadow-xs"
                      : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice hover:bg-cream/40 dark:hover:bg-panel"
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
              className="mt-2 flex min-h-[44px] items-center justify-between rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel px-3 py-2.5 font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-sage dark:text-gold" />
                <span>Open Public Blog</span>
              </div>
              <ExternalLink className="h-4 w-4 text-muted dark:text-slate-muted" />
            </Link>

            {session && (
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isPending}
                className="mt-1 flex min-h-[44px] w-full items-center justify-between rounded-md border border-red-200 dark:border-red-900/50 bg-red-50/60 dark:bg-red-950/20 px-3 py-2.5 font-ui text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400"
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
