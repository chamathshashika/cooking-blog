"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import SocialIcons from "./SocialIcons";

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
      className={`sticky top-0 z-40 w-full border-t-4 border-sunshine bg-cream/95 backdrop-blur-md transition-all duration-200 ${
        scrolled ? "border-b border-ink/10 shadow-xs" : ""
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
          className="font-display text-2xl md:text-3xl text-ink tracking-tight hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-sage"
        >
          CeylonSpicer
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="hidden lg:flex items-center gap-8">
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

                  {/* Dropdown Menu */}
                  {link.hasDropdown && link.subLinks && (
                    <div className="absolute top-full left-0 hidden group-hover:block pt-2 z-30">
                      <div className="w-60 bg-white border border-ink/10 py-2 shadow-md">
                        {link.subLinks.map((subLink) => {
                          const isSubActive = pathname === subLink.href;
                          return (
                            <Link
                              key={subLink.label}
                              href={subLink.href}
                              className={`block px-4 py-2 font-ui text-[10px] font-bold uppercase tracking-[0.08em] transition-colors ${
                                isSubActive
                                  ? "bg-cream text-sage"
                                  : "text-ink hover:bg-cream/50 hover:text-sage"
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
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="flex h-10 w-10 items-center justify-center text-ink focus:outline-none focus:ring-2 focus:ring-sage"
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
          className="border-t border-ink/10 bg-white py-4 px-4 sm:px-6 shadow-sm"
        >
          <div className="mx-auto max-w-[1200px] flex items-center gap-3">
            <Search className="h-4 w-4 text-muted shrink-0" />
            <input
              type="search"
              placeholder="Search recipes, ingredients, spices (Press Enter)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent font-ui text-sm text-ink placeholder:text-muted focus:outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="font-ui text-xs uppercase text-muted hover:text-ink px-2 py-1 shrink-0"
            >
              Close
            </button>
          </div>
        </form>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-cream lg:hidden">
          <div className="flex items-center justify-between border-b border-ink/10 px-6 py-6">
            <span className="font-display text-2xl text-ink">CeylonSpicer</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-10 w-10 items-center justify-center text-ink"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav
            className="flex flex-col gap-5 p-8 overflow-y-auto"
            aria-label="Mobile Navigation"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-ui text-sm font-semibold uppercase tracking-[0.1em] text-ink hover:text-sage"
            >
              Home
            </Link>

            {/* Recipes Section with sub-items */}
            <div className="flex flex-col gap-2 pt-2 border-t border-ink/10">
              <Link
                href="/recipes"
                onClick={() => setMobileMenuOpen(false)}
                className="font-ui text-sm font-semibold uppercase tracking-[0.1em] text-ink hover:text-sage"
              >
                Recipes
              </Link>
              <div className="pl-3 flex flex-col gap-2.5 mt-1 border-l-2 border-sage/40">
                {recipeSubLinks.map((subLink) => (
                  <Link
                    key={subLink.label}
                    href={subLink.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-ui text-xs font-semibold uppercase tracking-[0.08em] text-ink/80 hover:text-sage"
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Section with sub-items */}
            <div className="flex flex-col gap-2 pt-2 border-t border-ink/10">
              <Link
                href="/category"
                onClick={() => setMobileMenuOpen(false)}
                className="font-ui text-sm font-semibold uppercase tracking-[0.1em] text-ink hover:text-sage"
              >
                Categories
              </Link>
              <div className="pl-3 flex flex-col gap-2.5 mt-1 border-l-2 border-sage/40">
                {categorySubLinks.map((subLink) => (
                  <Link
                    key={subLink.label}
                    href={subLink.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-ui text-xs font-semibold uppercase tracking-[0.08em] text-ink/80 hover:text-sage"
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="font-ui text-sm font-semibold uppercase tracking-[0.1em] text-ink hover:text-sage pt-2 border-t border-ink/10"
            >
              About
            </Link>
          </nav>
          <div className="mt-auto flex items-center justify-center border-t border-ink/10 p-8">
            <SocialIcons size="md" />
          </div>
        </div>
      )}
    </header>
  );
}
