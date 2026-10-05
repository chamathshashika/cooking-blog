"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import SocialIcons from "./SocialIcons";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Recipes", href: "/recipes", hasDropdown: true },
    { label: "Categories", href: "/category/breakfast", hasDropdown: true },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="relative w-full border-t-4 border-sunshine bg-cream">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 sm:px-6 py-6 md:py-8">
        {/* Left: Wordmark Logo */}
        <Link
          href="/"
          className="font-display text-2xl md:text-3xl text-ink tracking-tight hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-sage"
        >
          Scrumptious
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 font-ui text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors py-1 ${
                      isActive
                        ? "text-ink border-b border-ink"
                        : "text-ink/80 hover:text-ink"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <ChevronDown className="h-3 w-3 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Simple Dropdown for Recipes */}
                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 hidden group-hover:block pt-2 z-30">
                      <div className="w-48 bg-white border border-ink/10 py-2 shadow-sm">
                        <Link
                          href="/recipes"
                          className="block px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-ink hover:bg-cream/40"
                        >
                          All Recipes
                        </Link>
                        <Link
                          href="/category/breakfast"
                          className="block px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-ink hover:bg-cream/40"
                        >
                          Breakfast Dishes
                        </Link>
                        <Link
                          href="/category/dinner"
                          className="block px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-ink hover:bg-cream/40"
                        >
                          Curries & Dinners
                        </Link>
                        <Link
                          href="/category/desserts"
                          className="block px-4 py-2 font-ui text-[11px] uppercase tracking-wider text-ink hover:bg-cream/40"
                        >
                          Sweets & Treats
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Social Icons & Search */}
          <div className="flex items-center gap-2.5 pl-4 border-l border-ink/10">
            <SocialIcons size="sm" />

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search recipes"
              className="ml-2 flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-sage focus:outline-none focus:ring-2 focus:ring-sage"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Hamburger & Search */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search recipes"
            className="flex h-10 w-10 items-center justify-center text-ink focus:outline-none focus:ring-2 focus:ring-sage"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-10 w-10 items-center justify-center text-ink focus:outline-none focus:ring-2 focus:ring-sage"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Inline Search Bar */}
      {searchOpen && (
        <div className="border-t border-ink/10 bg-white py-4 px-4 sm:px-6 shadow-sm">
          <div className="mx-auto max-w-[1200px] flex items-center gap-3">
            <Search className="h-4 w-4 text-muted" />
            <input
              type="search"
              placeholder="Search recipes, ingredients, spices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent font-ui text-sm text-ink placeholder:text-muted focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="font-ui text-xs uppercase text-muted hover:text-ink px-2 py-1"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-cream lg:hidden">
          <div className="flex items-center justify-between border-b border-ink/10 px-6 py-6">
            <span className="font-display text-2xl text-ink">Scrumptious</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-10 w-10 items-center justify-center text-ink"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 p-8" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-ui text-sm font-semibold uppercase tracking-[0.1em] text-ink hover:text-sage"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex items-center justify-center border-t border-ink/10 p-8">
            <SocialIcons size="md" />
          </div>
        </div>
      )}
    </header>
  );
}
