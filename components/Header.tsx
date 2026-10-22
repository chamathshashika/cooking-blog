"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import SocialIcons from "./SocialIcons";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const recipeSubLinks = [
    { label: "ALL RECIPES", href: "/recipes" },
    { label: "BREAKFAST DISHES", href: "/category/breakfast" },
    { label: "CURRIES & DINNERS", href: "/category/dinner" },
    { label: "SWEETS & TREATS", href: "/category/desserts" },
  ];

  const categorySubLinks = [
    { label: "ALL CATEGORIES", href: "/category" },
    { label: "BREAKFAST", href: "/category/breakfast" },
    { label: "CURRIES & DINNERS", href: "/category/dinner" },
    { label: "SWEETS & TREATS", href: "/category/desserts" },
    { label: "APPETIZERS & SHORT EATS", href: "/category/appetizers" },
    { label: "MAIN ENTREES", href: "/category/entrees" },
    { label: "SIDES & SAMBOLS", href: "/category/sides" },
    { label: "LUNCH PLATTERS", href: "/category/lunch" },
    { label: "ISLAND DRINKS", href: "/category/drinks" },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Recipes",
      href: "/recipes",
      hasDropdown: true,
      subLinks: recipeSubLinks,
    },
    {
      label: "Categories",
      href: "/category",
      hasDropdown: true,
      subLinks: categorySubLinks,
    },
    { label: "About", href: "/about" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-t-4 border-sunshine dark:border-amber-primary bg-cream/95 dark:bg-surface/95 backdrop-blur-md transition-all duration-200 ${
        scrolled ? "border-b border-ink/10 dark:border-hairline shadow-xs" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1200px] items-center justify-between px-4 sm:px-6 transition-all duration-200 ${
          scrolled ? "py-4 md:py-5" : "py-5 md:py-7"
        }`}
      >
        {/* Left: Wordmark Logo */}
        <Link
          href="/"
          className="font-display text-2xl md:text-3xl text-ink dark:text-ice tracking-tight hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          CeylonSpicer
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 font-ui text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                      isActive
                        ? "text-ink dark:text-amber-text border-b border-ink dark:border-amber-text"
                        : "text-ink/80 dark:text-slate-muted hover:text-ink dark:hover:text-ice"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <ChevronDown className="h-3 w-3 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.hasDropdown && link.subLinks && (
                    <div className="absolute top-full left-0 hidden group-hover:block pt-2 z-30">
                      <div className="w-60 bg-white dark:bg-surface border border-ink/10 dark:border-hairline py-2 shadow-md">
                        {link.subLinks.map((subLink) => {
                          const isSubActive = pathname === subLink.href;
                          return (
                            <Link
                              key={subLink.label}
                              href={subLink.href}
                              className={`block px-4 py-2 font-ui text-[10px] font-bold uppercase tracking-[0.08em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                                isSubActive
                                  ? "bg-cream dark:bg-panel text-sage dark:text-amber-text"
                                  : "text-ink dark:text-ice hover:bg-cream/50 dark:hover:bg-panel hover:text-sage dark:hover:text-amber-text"
                              }`}
                            >
                              {subLink.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Social Icons, Theme Toggle & Search */}
          <div className="flex items-center gap-2 pl-4 border-l border-ink/10 dark:border-hairline">
            <SocialIcons size="sm" />

            <ThemeToggle />

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search recipes"
              className="flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center text-ink dark:text-ice transition-colors hover:text-sage dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Hamburger, Search & Theme Toggle */}
        <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search recipes"
            className="flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center text-ink dark:text-ice focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center text-ink dark:text-ice focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Inline Search Bar */}
      {searchOpen && (
        <form
          onSubmit={handleSearchSubmit}
          className="border-t border-ink/10 dark:border-hairline bg-white dark:bg-surface py-3 px-4 sm:px-6 shadow-sm"
        >
          <div className="mx-auto max-w-[1200px] flex items-center gap-3">
            <Search className="h-4 w-4 text-muted dark:text-slate-muted shrink-0" />
            <input
              type="search"
              placeholder="Search recipes, ingredients, spices (Press Enter)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent font-ui text-sm text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted focus:outline-none min-h-[44px]"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="min-h-[44px] px-3 flex items-center font-ui text-xs uppercase text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Close
            </button>
          </div>
        </form>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-cream dark:bg-surface lg:hidden">
          <div className="flex items-center justify-between border-b border-ink/10 dark:border-hairline px-6 py-5">
            <span className="font-display text-2xl text-ink dark:text-ice">CeylonSpicer</span>
            <div className="flex items-center gap-2">
              <ThemeToggle variant="minimal" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center text-ink dark:text-ice focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <nav
            className="flex flex-col gap-2 p-6 sm:p-8 overflow-y-auto"
            aria-label="Mobile Navigation"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center font-ui text-sm font-semibold uppercase tracking-[0.1em] text-ink dark:text-ice hover:text-sage dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Home
            </Link>

            {/* Recipes Section with sub-items */}
            <div className="flex flex-col gap-1 pt-2 border-t border-ink/10 dark:border-hairline">
              <Link
                href="/recipes"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center font-ui text-sm font-semibold uppercase tracking-[0.1em] text-ink dark:text-ice hover:text-sage dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                Recipes
              </Link>
              <div className="pl-3 flex flex-col gap-1 mt-1 border-l-2 border-sage/40 dark:border-amber-primary/40">
                {recipeSubLinks.map((subLink) => (
                  <Link
                    key={subLink.label}
                    href={subLink.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center font-ui text-xs font-semibold uppercase tracking-[0.08em] text-ink/80 dark:text-slate-muted hover:text-sage dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Section with sub-items */}
            <div className="flex flex-col gap-1 pt-2 border-t border-ink/10 dark:border-hairline">
              <Link
                href="/category"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center font-ui text-sm font-semibold uppercase tracking-[0.1em] text-ink dark:text-ice hover:text-sage dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                Categories
              </Link>
              <div className="pl-3 flex flex-col gap-1 mt-1 border-l-2 border-sage/40 dark:border-amber-primary/40">
                {categorySubLinks.map((subLink) => (
                  <Link
                    key={subLink.label}
                    href={subLink.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center font-ui text-xs font-semibold uppercase tracking-[0.08em] text-ink/80 dark:text-slate-muted hover:text-sage dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center font-ui text-sm font-semibold uppercase tracking-[0.1em] text-ink dark:text-ice hover:text-sage dark:hover:text-amber-text pt-2 border-t border-ink/10 dark:border-hairline focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              About
            </Link>
          </nav>
          <div className="mt-auto flex items-center justify-between border-t border-ink/10 dark:border-hairline p-6">
            <SocialIcons size="md" />
            <ThemeToggle variant="pill" />
          </div>
        </div>
      )}
    </header>
  );
}
