# Task Tracker: Sri Lankan Cooking Blog

Tracking project milestones, tasks, and implementation progress based on [AGENTS.md](file:///c:/Users/chamathw/My%20Projects/blog/cooking-blog/AGENTS.md) and [brandGuidelines.md](file:///c:/Users/chamathw/My%20Projects/blog/cooking-blog/brandGuidelines.md).

---

## Current Status
- **Active Phase**: Phase 4 - Recipe & Category Pages
- **Last Updated**: 2026-10-05

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
- [x] `Header`: Cream background, yellow top accent line, wordmark logo, uppercase navigation, search toggle, social icons, mobile navigation drawer
- [x] `StarRating`: Gold star rating with accessible `aria-label`
- [x] `RecipeCard`: 3:4 & 4:3 ratios, category pill tag, serif title, rating, subtle zoom hover
- [x] `FeaturedRow`: 4-column desktop / 2-column tablet / 1-column mobile featured recipe layout with cream backdrop split
- [x] `SubscribeBanner`: Sunshine yellow band, "Never miss a recipe" heading, input fields, sage green button
- [x] `CategoryCarousel`: Circular category thumbnails with arrow navigation controls (enlarged 96–128px thumbnails, prominent heading, generous section rhythm)
- [x] `SectionHeading`: Serif H2 with optional "Browse all recipes →" link
- [x] `SocialIcons`: Accessible branded SVG social links (Instagram, Facebook, Twitter) with sage green circles
- [x] `IngredientsList`: Interactive checklist with checkboxes to mark prepared ingredients
- [x] `Footer`: Cream/yellow color scheme matching the header with brand narrative and links

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
- [ ] Recipe listing page (`app/recipes/page.tsx`)
- [x] Recipe detail page (`app/recipes/[slug]/page.tsx`) with ingredients checklist, numbered steps, tips, JSON-LD structured data
- [ ] Category page (`app/category/[slug]/page.tsx`)

### Phase 5: Verification & Quality Assurance
- [ ] Accessibility audit (WCAG AA contrast, touch targets >= 44px, keyboard navigation, focus rings)
- [ ] End-to-end linting and build validation
