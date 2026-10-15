# Task Tracker: Sri Lankan Cooking Blog

Tracking project milestones, tasks, and implementation progress based on [AGENTS.md](file:///c:/Users/chamathw/My%20Projects/blog/cooking-blog/AGENTS.md) and [brandGuidelines.md](file:///c:/Users/chamathw/My%20Projects/blog/cooking-blog/brandGuidelines.md).

---

## Current Status

- **Active Phase**: Completed (All Phases Complete)
- **Status**: Production Ready & Fully Verified against `AGENTS.md` and `brandGuidelines.md`
- **Last Updated**: 2026-10-14

---

## Milestones & Tasks

### Phase 1: Foundation & Design System Setup

- [x] Install missing dependencies (`lucide-react`) via `pnpm`
- [x] Configure Tailwind CSS v4 design tokens in `app/globals.css` (Cream, Sunshine Yellow, Sage Green, Ink, typography variables)
- [x] Set up Google fonts (`DM Serif Display` and `Montserrat`) in `app/layout.tsx`
- [x] Configure Next.js image domain for Unsplash in `next.config.ts`
- [x] Next.js Metadata Files:
  - `app/sitemap.ts`: Dynamic sitemap covering all recipes, categories, and static pages
  - `app/robots.ts`: Crawler rules and sitemap reference
  - `app/manifest.ts`: PWA Web Manifest with brand palette
  - `app/opengraph-image.tsx`: Dynamic 1200x630 OpenGraph social share card
  - `app/twitter-image.tsx`: Dynamic 1200x630 Twitter card image
  - `app/icon.tsx`: Dynamic 32x32 brand favicon
  - `app/apple-icon.tsx`: Dynamic 180x180 Apple Touch Icon
- [x] Hydration & Performance Optimization:
  - Added `suppressHydrationWarning` to `<html>` and `<body>` in `app/layout.tsx` to prevent console errors from browser extension attribute injections (e.g. `data-*-extension-id`)
  - Added `priority` preloading to above-the-fold featured cards in `components/FeaturedRow.tsx` for optimal LCP score

### Phase 2: Core Shared Components

- [x] `Header`: Sticky/fixed header with scroll detection, dynamic compacting animation (`py-4 md:py-5`), backdrop blur, cream background, yellow top accent line, wordmark logo, uppercase navigation with Recipes and Categories dropdowns, global search bar, social icons, and mobile navigation drawer with scroll lock
- [x] `StarRating`: Gold star rating with accessible `aria-label` and `role="img"`
- [x] `RecipeCard`: 3:4 & 4:3 ratios, category pill tag, serif title, rating, subtle zoom hover
- [x] `FeaturedRow`: 4-column desktop / 2-column tablet / 1-column mobile featured recipe layout with cream backdrop split
- [x] `SubscribeBanner`: Sunshine yellow band, "Never miss a recipe" heading, input fields, sage green button with 44px touch targets
- [x] `CategoryCarousel`: Circular category thumbnails with arrow navigation controls (enlarged 96–128px thumbnails, prominent heading, generous section rhythm, 44px tap targets)
- [x] `SectionHeading`: Serif H2 with optional "Browse all recipes →" link
- [x] `SocialIcons`: Accessible branded SVG social links (Instagram, Facebook, Twitter) with sage green circles and 44x44px touch targets
- [x] `IngredientsList`: Interactive checklist with checkboxes to mark prepared ingredients, keyboard Enter/Space toggling, and focus rings
- [x] `ScrollToTop`: Floating right-bottom circular button with smooth scroll, scroll visibility threshold (>300px), sage green styling, and gentle pulsing/blinking ripple effect with `prefers-reduced-motion` compliance
- [x] `Footer`: Cream/yellow color scheme matching the header with brand narrative, explore links, and focus rings

### Phase 3: Home Page Assembly

- [x] Assemble `app/page.tsx` with all sections in order:
  1. `Header` with cream background & yellow top accent
  2. Hero with `h1` and `FeaturedRow` (overlapping cream backdrop into white)
  3. `SubscribeBanner` (sunshine yellow)
  4. `CategoryCarousel` (circular thumbnails)
  5. `RecentRecipes` (3-column grid)
  6. `Footer` (cream palette)
- [x] Prepare rich authentic Sri Lankan recipe & category data in `lib/data.ts`
- [x] Verified responsive structure (mobile, tablet, desktop)

### Phase 4: Recipe & Category Pages

- [x] Recipe listing page (`app/recipes/page.tsx`) with live search, real-time category filtering pills, and URL query support (`?category=...`, `?search=...`)
- [x] Recipe detail page (`app/recipes/[slug]/page.tsx`) with ingredients checklist, numbered steps, tips, JSON-LD structured data
- [x] Category overview page (`app/category/page.tsx`) and dynamic category detail page (`app/category/[slug]/page.tsx`) with category avatar, description, recipe grid, and carousel
- [x] Header navigation routing:
  - `RECIPES` dropdown: `ALL RECIPES` (`/recipes`), `BREAKFAST DISHES` (`/category/breakfast`), `CURRIES & DINNERS` (`/category/dinner`), `SWEETS & TREATS` (`/category/desserts`)
  - `CATEGORIES` dropdown: `ALL CATEGORIES` (`/category`) and all 8 categories
  - Global search bar routing to `/recipes?search=...`
- [x] Error Handling & Recovery Pages:
  - `app/not-found.tsx`: 404 Page Not Found with food-first narrative, category shortcut pills, and recovery actions
  - `app/error.tsx`: 500 Server Error boundary with retry mechanism (`reset()`), error logging, and direct links
  - `app/global-error.tsx`: Root-level error boundary with self-contained HTML/body shell for catastrophic errors
- [x] Privacy Policy Page (`app/privacy/page.tsx`):
  - Simple, transparent privacy declaration stating zero personal data collection, zero cross-site tracking, and optional newsletter unsubscribe rights
  - Linked to site footer and added to `app/sitemap.ts`
- [x] Terms of Service Page (`app/terms/page.tsx`):
  - Clear guidelines for personal culinary use, recipe attribution, copyright, and dietary/allergen disclaimers
  - Linked to site footer and added to `app/sitemap.ts`
- [x] Contact Page (`app/contact/page.tsx`):
  - Minimal, lightweight form with only essential fields (name, email, message) and interactive confirmation state
  - Direct kitchen contact information, response time expectations, linked to site footer, and added to `app/sitemap.ts`
- [x] Recipe & Post Data Management:
  - Added authentic `chickenCurry` recipe (`Traditional Sri Lankan Chicken Curry`) in `lib/data.ts` with `isFeatured: true`
  - Added authentic `prawnCurry` recipe (`Prawn Curry` / `sri-lankan-prawn-curry`) in `lib/data.ts` with 30-min prep/cook time, whole spices, coconut gravy, and step-by-step instructions
  - Added authentic `muttonCurry` recipe (`Sri Lankan Mutton Curry` / `sri-lankan-mutton-curry`) in `lib/data.ts` with hearty 48-min slow-reduced coconut milk gravy, aromatic whole spices, and lemongrass
  - Added high-resolution food photography assets to `public/images/recipes/sri-lankan-chicken-curry.jpg`, `public/images/recipes/prawn-curry.jpg`, and `public/images/recipes/mutton-curry.jpg`
  - Populated `allRecipes: [chickenCurry, stringHoppers, prawnCurry, muttonCurry]` and linked to categories, live search, and dynamic sitemap
  - Extended `Ingredient` (supporting `group` and `optional`) and `Instruction` (supporting step `title`) models with backwards compatibility across `IngredientsList` and recipe detail views
  - Ensured `featuredRecipes` and `recentRecipes` display seamlessly on the homepage with centered, proportional layouts when fewer recipes exist
  - Maintained resilient empty state fallbacks for other zero-recipe sections

### Phase 5: Verification & Quality Assurance

- [x] About Us Page (`app/about/page.tsx`):
  - Authored authentic brand storytelling page reflecting `brandGuidelines.md` personality, voice, and design principles
  - Preserved culinary heritage narrative, 3 core cooking principles, and seamless routing from header & footer
- [x] Accessibility Audit (WCAG AA Compliance):
  - **Touch Targets (>= 44x44px)**: Upgraded desktop search button, mobile hamburger & close buttons, drawer nav items, category carousel prev/next buttons, social media icon anchors, newsletter inputs & buttons, filter clear search button, category pill tabs, and contact form inputs/submit button to satisfy 44px minimum touch target dimensions.
  - **Keyboard Navigation & Focus Rings**: Implemented visible `focus-visible:ring-2 focus-visible:ring-sage` and `focus-visible:ring-ink` across all interactive controls (links, buttons, inputs, checkboxes) to guarantee clear tab-navigation indicators.
  - **Screen Reader Semantics**: Enhanced `StarRating` with `role="img"`, `IngredientsList` with explicit `role="checkbox"` and `aria-checked` states, plus keyboard Enter/Space toggle support.
  - **Reduced Motion**: Honored `prefers-reduced-motion` with `motion-reduce:hidden` on background ripple rings, `motion-reduce:animate-none` on pulse animations, and `motion-reduce:scroll-auto` on carousels.
  - **Color Contrast**: Confirmed all charcoal text (`#2a2622`) on cream (`#fce9c0`), yellow (`#fdcb63`), and white backgrounds exceeds WCAG AAA standards, with bold weights and darker hover states (`sage-dark`) on sage buttons.
- [x] End-to-end static routes and sitemap synchronization verified
- [x] Featured Recipes Visibility Resolution:
  - Resolved missing featured recipes on homepage by marking `prawnCurry` and `muttonCurry` with `isFeatured: true` in `lib/data.ts`.
  - Hardened `featuredRecipes` selection to guarantee 4 cards populate the 4-column desktop grid per `brandGuidelines.md`.
  - Reinforced stacking context in `components/FeaturedRow.tsx` using `isolate`, non-blocking `z-0` cream background split, and `relative z-10` cards container to prevent negative z-index paint occlusion.
  - Added explicit aspect-ratio style fallback (`style={{ aspectRatio: "3 / 4" }}`) in `components/RecipeCard.tsx` for rock-solid box computation with `next/image fill`.

### Phase 6: Admin Panel & Content Studio

- [x] Admin Layout & Navigation (`app/admin/layout.tsx`, `components/admin/AdminHeader.tsx`):
  - Created dedicated layout with warm brand aesthetic, Montserrat uppercase tabs, CeylonSpicer Admin badge, and mobile drawer.
  - Navigation routing across Overview (`/admin`), Recipes (`/admin/recipes`), Categories (`/admin/categories`), and external link to live site.
- [x] Metric Statistics (`components/admin/AdminStats.tsx`):
  - Summary cards for Total Recipes, Featured Recipes, Active Categories, and Average Prep/Cook Time.
- [x] Interactive Recipe Management (`components/admin/AdminRecipeList.tsx`, `app/admin/recipes/page.tsx`):
  - Real-time search across titles, categories, excerpts, and tags.
  - Filter by category and featured status with sort controls.
  - Responsive table and mobile card views with Next.js image thumbnails, metadata, and status badges.
  - Interactive "Toggle Featured" button with live state feedback and toast notifications.
  - "Quick Edit" modal with form fields for title, category, timings, servings, and excerpt.
  - "New Recipe" creation modal with automatic slug generator and validation.
  - Direct "View Live" action linking to `/recipes/[slug]`.
- [x] Interactive Category Management (`components/admin/AdminCategoryList.tsx`, `app/admin/categories/page.tsx`):
  - Grid of all 8 Sri Lankan cuisine categories with circular image thumbnails and descriptions.
  - Dynamic recipe count badge per category with direct deep-link to filtered recipes (`/admin/recipes?category=[slug]`).
  - Search filtering by name and description.
  - "Edit Category" modal and "New Category" creation modal.
  - Direct "View Public" action linking to `/category/[slug]`.
- [x] Dashboard Alias & Security (`app/dashboard/page.tsx`, `app/robots.ts`, `components/Footer.tsx`):
  - Created `/dashboard` route that automatically redirects to `/admin`.
  - Protected admin routes from search crawlers via `disallow: ["/api/", "/dashboard/", "/admin/"]` in `app/robots.ts`.
  - Added discreet, accessible "Admin" link to the site footer.
  - Configured `favicon.ico` in `components/admin/AdminHeader.tsx` as the admin panel navbar logo.

