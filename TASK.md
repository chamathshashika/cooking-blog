# Task Tracker: Sri Lankan Cooking Blog

Tracking project milestones, tasks, and implementation progress based on [AGENTS.md](file:///c:/Users/chamathw/My%20Projects/blog/cooking-blog/AGENTS.md) and [brandGuidelines.md](file:///c:/Users/chamathw/My%20Projects/blog/cooking-blog/brandGuidelines.md).

---

## Current Status

- **Active Phase**: Phase 12 (Dark Theme Palette Integration & Theme Mode Switcher) Complete
- **Status**: Production Ready & Fully Verified against `AGENTS.md` and `brandGuidelines.md`
- **Last Updated**: 2026-10-23

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
- [x] Code Quality & Lint Audit:
  - Cleaned up unused imports across `app/admin/page.tsx`, `app/not-found.tsx`, and `app/recipes/[slug]/page.tsx`.
  - Replaced `as any` type assertion in `components/admin/AdminRecipeList.tsx` with explicit `"title" | "prep" | "servings"` union type.
  - Replaced anchor with `window.location.reload()` in `app/global-error.tsx`.
  - Validated clean ESLint run with `pnpm lint` (0 errors, 0 warnings).

### Phase 7: Admin Panel UI Modernization & Visual Polish

- [x] Modernized Admin Header (`components/admin/AdminHeader.tsx`):
  - Added top status micro-bar with active pulse indicator and "CeylonSpicer Studio" live status.
  - Redesigned brand logo badge with `favicon.ico`, gold border accent, and subtle hover scale.
  - Implemented segmented tab pill navigation with active state indicators and icons.
  - Added "View Public Blog" quick-launch action button.
- [x] Enhanced Analytical Stat Cards (`components/admin/AdminStats.tsx`):
  - Implemented brand color top border indicators (`border-t-sage`, `border-t-sunshine`, gold, linen).
  - Added pill badges for display mode status ("Published", "Hero Display", "Taxonomy", "Cooking Prep").
  - Added micro-hover lift (`hover:-translate-y-0.5`), subtle shadow elevation, and interactive navigation links.
- [x] Editorial Studio Hero Banner (`app/admin/page.tsx`):
  - Designed an editorial welcome banner with warm cream/linen gradient, subtle blur accents, and headline.
  - Added quick-action button group linking to Recipe Database and Categories.
- [x] Dual View Modes & Enhanced Recipe List (`components/admin/AdminRecipeList.tsx`):
  - Added view mode toggle between **Table View** and **Card Grid View**.
  - Table view: high-res photo thumbnails with hover zoom, serif titles, prep/cook tags, and servings count.
  - Grid view: visual cards with photography, ratings, category tag overlays, and embedded actions.
  - Interactive "Featured Status" pill toggle (`★ Featured` glow vs `☆ Standard`).
  - Unified filter toolbar with search, category selector, featured filter tabs, and sort selector.
  - Two-column responsive Quick Edit and Create modals with live image preview box.
- [x] Redesigned Category Cards & Taxonomy View (`components/admin/AdminCategoryList.tsx`):
  - Circular photo thumbnails with sunshine yellow rings.
  - Live recipe count badge with direct deep link to category recipes.
  - Responsive Edit and Create Category modals with image preview.
- [x] Verification:
  - Validated clean ESLint execution (`pnpm lint`) with 0 errors and 0 warnings.
  - Verified SSR / layout rendering at `/admin`.

### Phase 8: Authentication & Access Control (Aligned with Next.js Documentation)

- [x] Environment Variables Validation with Joi (`lib/env.ts`):
  - Strictly validated all environment variables (`MONGODB_URL`, `NEXT_PUBLIC_SITE_URL`, `SESSION_SECRET`, `NODE_ENV`) using Joi schema.
  - Eliminated all default/fallback values from the application codebase; all values are strictly sourced from `.env`.
  - Added build-time/startup assertion with clear error reporting.
- [x] MongoDB & Mongoose Database Layer (`lib/mongodb.ts`, `lib/models/User.ts`, `lib/models/Category.ts`):
  - Configured resilient singleton connection caching in `lib/mongodb.ts` using validated `env.MONGODB_URL`.
  - Established strict schema standard: every collection's primary key is `_id: Types.ObjectId`, and any collection referencing another document uses foreign key `{ type: Schema.Types.ObjectId, ref: 'ModelName' }` referencing that document's `_id`.
  - Built `User` Mongoose schema with email uniqueness, password hashing support, role attributes (`admin` | `reader` | `editor`), and `Types.ObjectId` `_id`.
  - Built `Category` Mongoose schema with `Types.ObjectId` `_id`.
- [x] Role-Based Configuration & Reader Default (`lib/definitions.ts`, `lib/models/User.ts`, `lib/session.ts`, `lib/dal.ts`):
  - Strictly limited user roles to `["admin", "reader", "editor"]` via TypeScript `UserRole` union and `USER_ROLES` constant array.
  - Set `reader` as the default role across the database schema (`UserSchema.role.default = "reader"`), session generator (`createSession(..., role = "reader")`), Data Access Layer fallback, and signup server action (`newUser.role = DEFAULT_USER_ROLE`).
  - Added role typing and badge display to `AdminHeader.tsx` (desktop profile pill and mobile navigation drawer).
- [x] Stateless Session Management with Jose (`lib/session.ts`):
  - Implemented `encrypt` and `decrypt` with `jose` (`SignJWT` & `jwtVerify`) using `env.SESSION_SECRET` per official Next.js documentation.
  - Built `createSession`, `updateSession`, and `deleteSession` utilizing Next.js `cookies` API with `httpOnly`, `secure`, and `sameSite: "lax"`.
- [x] Data Access Layer (DAL) (`lib/dal.ts`):
  - Built centralized authorization logic with React `cache()` for memoization during render passes.
  - Implemented `verifySession` and `getUser` to perform secure data and identity queries.
- [x] Server-Side Authentication Actions with React `useActionState` (`lib/actions/auth.ts`, `components/auth/`):
  - `login`: Validates inputs, checks database, verifies password, calls `createSession()`, and redirects to `/admin`.
  - `signup`: Validates full name, email, password length, and password match, saves user in MongoDB, calls `createSession()`, and redirects.
  - `logout`: Deletes session cookie via `deleteSession()` and redirects to `/login`.
  - Both `SignInForm.tsx` and `SignUpForm.tsx` use React's `useActionState` for interactive field-level and general error display.
- [x] Migration to Next.js 16 Proxy Convention (`proxy.ts`):
  - Migrated from deprecated `middleware.ts` to `proxy.ts` exporting default function `proxy(req)`.
  - Performs optimistic session checks on `/admin` and `/dashboard`, redirecting unauthenticated requests to `/login`.
  - Automatically redirects authenticated users away from `/login` and `/signup` to `/admin`.
- [x] Route Aliases & Search Bot Protection:
  - Created `/signin` redirect alias in `app/signin/page.tsx` pointing to `/login`.
  - Added `/login`, `/signup`, and `/signin` to crawler `disallow` rules in `app/robots.ts`.
- [x] Admin Studio Guard & Role-Based Access Control (`app/admin/layout.tsx`, `proxy.ts`, `lib/dal.ts`):
  - Enforced `verifyAdminSession()` DAL check in `app/admin/layout.tsx`, restricting access strictly to `"admin"` and `"editor"` roles; unauthorized roles (e.g. `"reader"`) are redirected to `/`.
  - Added role check in `proxy.ts` to reject reader access to `/admin` and `/dashboard` at the routing boundary.
  - Configured login, signup, and server actions (`lib/actions/auth.ts`) to route `"admin"` and `"editor"` to `/admin` while safely routing `"reader"` to `/`.
  - Updated `AdminHeader.tsx` to display active chef user name, avatar, role badge, and a one-click Sign Out action.
- [x] Reader Login Prevention & Role Guard (`lib/actions/auth.ts`, `components/auth/SignInForm.tsx`):
  - Blocked readers from authenticating into the studio: if a reader attempts to log in via the login form, the server action stops and returns `"You don't have access to login."` without creating a session.
  - Form action triggers a toast alert displaying the unauthorized message immediately.
- [x] Common Toast Notification System (`components/ToastProvider.tsx`, `app/layout.tsx`):
  - Created a global, unified `ToastProvider` and `useToast()` hook supporting `success`, `error`, `warning`, and `info` toast alerts with brand-consistent styling and accessible ARIA attributes (`role="alert"`, `aria-live="polite"`).
  - Mounted `ToastProvider` at the root layout in `app/layout.tsx`, making toast notifications universally accessible to all components.
  - Unified toast usage across `SignInForm.tsx`, `SignUpForm.tsx`, `AdminRecipeList.tsx`, and `AdminCategoryList.tsx`.
- [x] Category CRUD Operations & Admin-Only Authorization (`lib/models/Category.ts`, `lib/actions/category.ts`, `app/admin/categories/page.tsx`, `components/admin/AdminCategoryList.tsx`):
  - Built `CategoryModel` Mongoose schema with name, displayName, slug uniqueness, description, and image URL.
  - Implemented secure server actions `createCategory`, `updateCategory`, and `deleteCategory` in `lib/actions/category.ts`, each verifying `session.role === "admin"` and rejecting non-admin requests with clear authorization errors.
  - Integrated auto-seeding logic from default Sri Lankan categories on initial empty state.
  - Updated `AdminCategoryList.tsx` with dynamic category creation, editing, and confirmation-protected deletion modals.
  - Provided role-aware UI: administrators get full management actions (New, Edit, Delete), while editors are presented with a read-only taxonomy view with action buttons disabled and an informative status indicator.
  - Revalidated path cache (`/admin/categories`, `/category`, `/`) upon mutations and displayed status feedback using the common toast notification system.
- [x] Global Typography Configuration with Google Sans, JetBrains Mono & Roboto (`app/globals.css`, `app/layout.tsx`):
  - Configured `@import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap')` in `globals.css` and injected `<style>` tag into `app/layout.tsx`.
  - Mapped Tailwind tokens `--font-display` to `"Google Sans", sans-serif`, `--font-ui` and `--font-sans` to `"Roboto", sans-serif`, and `--font-mono` to `"JetBrains Mono", monospace`.
- [x] Category Image Upload with `@vercel/blob` (`lib/actions/upload.ts`, `components/admin/CategoryImageUploader.tsx`, `components/admin/AdminCategoryList.tsx`, `next.config.ts`):
  - Installed `@vercel/blob` and created secure server action `uploadCategoryImage` in `lib/actions/upload.ts` enforcing admin-only access (`verifySession` & `hasAdminAccess`), file type validation (JPG, PNG, WebP, AVIF, GIF), and 5MB size limit.
  - Configured `*.public.blob.vercel-storage.com` in `next.config.ts` `images.remotePatterns` for optimized Next.js image rendering.
  - Built interactive `CategoryImageUploader` component with drag-and-drop file upload, upload progress indicator, live circular category preview, Vercel Blob badge, and manual URL fallback.
  - Integrated `CategoryImageUploader` seamlessly into both "New Category" and "Edit Category" modals in `AdminCategoryList.tsx`.
- [x] Code Quality:
  - Removed deprecated `middleware.ts` and obsolete `lib/auth.ts`.
  - Verified clean ESLint check (`pnpm lint`) with 0 errors and 0 warnings.

### Phase 9: Recipe Creation Studio & Ingredient Affiliate Monetization

- [x] Extended Recipe & Ingredient Data Models (`lib/data.ts`, `lib/models/Recipe.ts`):
  - Added `affiliateUrl?: string` and `affiliateLink?: string` to `Ingredient` type in `lib/data.ts`.
  - Created full Mongoose `RecipeModel` in `lib/models/Recipe.ts` with strict validation, indexes, timestamps, and embedded `IngredientSchema` supporting affiliate monetization links.
- [x] Recipe Server Actions & Database Persistence (`lib/actions/recipe.ts`):
  - Built `createRecipe` server action with authentication check (`verifySession`), role authorization (`hasAdminAccess`), slug uniqueness check, and input sanitization (ensuring affiliate links have valid protocols `https://`).
  - Added automated Next.js cache revalidation (`/admin/recipes`, `/recipes`, `/`, `/recipes/[slug]`).
  - Built `getRecipes()` with automated MongoDB fallback and initial seeding from `defaultRecipes`.
  - Built `findRecipeBySlug(slug)` for seamless lookup across MongoDB and static data.
- [x] Secure Recipe Image Upload (`lib/actions/upload.ts`, `components/admin/RecipeImageUploader.tsx`):
  - Added `uploadRecipeImage` server action enforcing admin/editor authorization, MIME type checks, and 5MB size limit using `@vercel/blob`.
  - Built `RecipeImageUploader` component with live 4:3 recipe card preview, drag-and-drop zone, Vercel Blob badge, and manual URL fallback.
- [x] Full-Featured Recipe Creation Form (`components/admin/RecipeForm.tsx`, `app/admin/recipes/new/page.tsx`):
  - Created dedicated editorial page at `/admin/recipes/new` with breadcrumb navigation.
  - Implemented multi-section form following `brandGuidelines.md` (warm cream/linen tones, DM Serif headings, Montserrat uppercase labels, 44px minimum touch targets).
  - Built interactive Ingredients Builder with dynamic row addition/deletion, quantity, group, optional toggle, and **Affiliate Link** input with test destination link and helpful monetization tip.
  - Built re-orderable Step-by-Step Instructions with move up/down controls.
  - Added Chef Notes & Culinary Tips manager, recipe tags chips, and hero banner feature toggle.
- [x] Public Recipe Page Affiliate Integration (`components/IngredientsList.tsx`):
  - Updated `IngredientsList` to render a styled, accessible "Shop" button with `ShoppingCart` and `ExternalLink` icons when an ingredient has an affiliate link.
  - Enforced FTC/SEO compliance with `rel="noopener noreferrer sponsored"` and isolated click handlers to prevent checklist toggle interference.
- [x] Studio Navigation & Dynamic Synchronization (`app/admin/recipes/page.tsx`, `components/admin/AdminRecipeList.tsx`, `app/recipes/page.tsx`, `app/recipes/[slug]/page.tsx`, `app/page.tsx`):
  - Linked "New Recipe" action in admin header and recipe toolbar directly to `/admin/recipes/new`.
  - Updated admin list, recipes catalog, recipe detail, and homepage to dynamically render newly published recipes from MongoDB.
- [x] Unified Recipe Edit & Update UI (`components/admin/RecipeForm.tsx`, `app/admin/recipes/[slug]/edit/page.tsx`):
  - Enhanced `RecipeForm.tsx` to operate in dual-mode (creation and updating) with full field pre-population (`initialRecipe`, `isEditing={true}`).
  - Pre-loads and enables editing of all recipe data: title, custom URL slug, category, hero photo, prep/cook/total times, servings count, excerpt, background story / intro, ingredients checklist with affiliate links, ordered instruction steps, chef notes, tags, and draft/published status.
  - Dynamically adapts UI: "Edit: [Recipe Title]" heading, "Save Changes" submit button, "View Live" shortcut link, and contextual success notifications.
  - Created dedicated admin editorial route at `app/admin/recipes/[slug]/edit/page.tsx` with dynamic page metadata and secure session verification.
- [x] Recipe Update & Deletion Server Actions (`lib/actions/recipe.ts`, `components/admin/AdminRecipeList.tsx`):
  - Implemented `updateRecipe(originalSlug, data)` with authorization guard (`verifySession` & `hasAdminAccess`), slug uniqueness check, and ingredient affiliate URL protocol normalization (`https://`).
  - Implemented seamless persistence: updates existing MongoDB documents or automatically upserts static recipes into MongoDB when modified.
  - Integrated automated Next.js path cache revalidation (`/admin/recipes`, `/admin/recipes/[slug]/edit`, `/recipes`, `/recipes/[slug]`, `/`).
  - Implemented `deleteRecipe(slug)` for MongoDB document cleanup and wired directly to admin list deletion handler.
  - Updated both table view and card grid view in `AdminRecipeList.tsx` to link edit buttons directly to `/admin/recipes/${recipe.slug}/edit`.

### Phase 10: Site Status & Maintenance Modes (Coming Soon & Under Construction)

- [x] Site Setting Mongoose Schema & Database Layer (`lib/models/SiteSetting.ts`):
  - Created `SiteSettingModel` schema with `key: "site_status"`, `mode: "live" | "coming_soon" | "under_construction"`, custom `headline`, `message`, `expectedLaunchDate`, and `updatedBy`.
- [x] Server Actions with Admin-Only Authorization (`lib/actions/siteStatus.ts`):
  - `getSiteStatus()`: In-memory TTL caching with fallback to MongoDB and default `"live"` mode.
  - `updateSiteStatus()`: Enforces strict admin check (`session.role === "admin"`), updates MongoDB, updates cache, and calls `revalidatePath` across the entire application layout and public routes.
- [x] Dedicated Public Showcase Pages (`app/coming-soon/page.tsx`, `app/under-construction/page.tsx`):
  - Refined `ComingSoonPage` to a clean, elegant, minimalist display centered exclusively on the "Coming Soon" heading with brand mark and discreet chef login.
  - Refined `UnderConstructionPage` to a clean, minimalist display centered on the "Under Construction" heading with brief reassuring maintenance text and discreet chef login.
  - Integrated admin preview headers displaying active bypass notices and direct navigation links.
- [x] Admin Management Studio (`app/admin/settings/page.tsx`, `components/admin/SiteStatusManager.tsx`, `components/admin/AdminHeader.tsx`):
  - Created dedicated settings page at `/admin/settings` accessible via the new "Site Status" tab in `AdminHeader.tsx`.
  - Built interactive `SiteStatusManager` component with 3 distinct status cards (Live, Coming Soon, Under Construction), custom messaging inputs, target launch date picker, role guards, and instant preview links.
- [x] Site Visibility Routing Guard & Admin Bypass (`proxy.ts`, `app/layout.tsx`, `components/admin/AdminSiteStatusBanner.tsx`):
  - Configured `proxy.ts` to attach `x-pathname` header to all forwarded requests.
  - Configured `app/layout.tsx` Server Component guard:
    - If `mode === "coming_soon"`: redirects all non-admin visitors to `/coming-soon` (allowing auth routes `/login` and `/signin`).
    - If `mode === "under_construction"`: redirects all non-admin visitors to `/under-construction` (allowing auth routes).
    - If user is authenticated as `admin`: grants unrestricted access to the entire website with an unobtrusive, dismissible `AdminSiteStatusBanner` floating at the top of the viewport.
- [x] SEO & Sitemap Synchronization (`app/sitemap.ts`, `app/robots.ts`):
  - Registered `/coming-soon` and `/under-construction` in `app/sitemap.ts`.
- [x] Vercel Blob Private Store Compatibility (`lib/actions/upload.ts`):
  - Added graceful fallback to `access: "private"` in `uploadRecipeImage` with `/api/blob` proxy routing, resolving private store upload constraints.

### Phase 11: Newsletter Subscription Engine & Strict Brand Token Compliance

- [x] Strict Brand Token Compliance & Hex Removal (`brandGuidelines.md`, `SKILL.md`):
  - Refactored `app/coming-soon/page.tsx` and `app/under-construction/page.tsx` to use brand token `bg-linen/25` instead of raw hex values.
  - Refactored `app/login/page.tsx`, `app/signup/page.tsx`, and `app/admin/layout.tsx` to use `bg-linen/20`.
  - Refactored `components/admin/AdminHeader.tsx` to use `bg-white/95` and `bg-white` for mobile drawer.
  - Refactored `components/admin/AdminRecipeList.tsx` input to `bg-linen/30`.
  - Refactored `components/admin/SiteStatusManager.tsx` active card to `bg-sage/5`.
  - Refactored `components/admin/AdminStats.tsx` accent border to brand token `border-t-star`.
  - Refactored `components/ToastProvider.tsx` warning icon to brand token `text-star`.
  - Refactored `app/global-error.tsx` root emergency shell to complete brand tokens (`bg-linen/30`, `text-ink`, `bg-sage`, `hover:bg-sage-dark`, `text-muted`, `border-ink/10`, `font-display`, `font-ui`).
- [x] Subscriber Mongoose Schema (`lib/models/Subscriber.ts`):
  - Created `Subscriber` schema with `name` (trimmed, max 100), `email` (normalized, lowercase, regex-validated, unique, indexed), `isActive` flag, and timestamps.
- [x] Newsletter Server Action (`lib/actions/newsletter.ts`):
  - Implemented `subscribeNewsletter` action adhering strictly to `AGENTS.md` §17.
  - Normalizes and sanitizes inputs server-side.
  - Prevents duplicate subscriptions and handles existing subscribers with friendly non-leaking confirmations.
  - Guarantees zero subscriber data exposure to the client.
- [x] Interactive Subscribe Banner Component (`components/SubscribeBanner.tsx`):
  - Connected banner form to `subscribeNewsletter` server action using React's `useActionState`.
  - Provided accessible loading spinner (`Loader2`), clear success confirmation badge (`CheckCircle2`), and accessible error alerts (`role="alert"`).
  - Maintained 44px minimum touch targets and brand aesthetics (`bg-sunshine`, `bg-sage`, `text-ink`).

### Phase 12: Dark Theme Palette Integration & Theme Mode Switcher

- [x] Palette Extraction & Documentation (`brandGuidelines.md`):
  - Analyzed dark palette image artifact (`media_1792692388835.jpg`) and extracted semantic color tokens:
    - **Obsidian** (`#0A0B0E`): Deep canvas & root background.
    - **Surface** (`#12141A`): Cards, elevated containers, dialogs, dropdowns.
    - **Panel** (`#1A1D24`): Inputs, search bars, textareas, table heads.
    - **Amber** (`#FF5E00` -> `#FFA800`): Vibrant hero accents & active brand elements.
    - **Gold** (`#FDA600`): Pending states & star ratings.
    - **Success** (`#10B981`): Success indicators & completed states.
    - **Ice** (`#F8FAFC`): Primary high-contrast serif headings & text.
    - **Muted** (`#94A3B8`): Secondary text, timestamps, captions, metadata.
    - **Amber Text** (`#FFB599`): Brand links, warm highlights, interactive hover accents.
    - **Hairline** (`rgba(226, 232, 240, 0.08)`): High-precision subtle borders & dividers.
  - Documented Section 3.2 "Dark Theme Palette (Obsidian & Amber)" in `brandGuidelines.md` including contrast ratios, semantic rules, and Tailwind token mapping.
- [x] Tailwind CSS v4 Theme Engine (`app/globals.css`):
  - Configured `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *, .dark, .dark *));` to ensure full compatibility with Tailwind v4 selector scoping.
  - Defined design tokens as CSS custom variables: `--color-obsidian`, `--color-surface`, `--color-panel`, `--color-amber-primary`, `--color-amber-secondary`, `--color-gold`, `--color-success`, `--color-ice`, `--color-slate-muted`, `--color-amber-text`, `--color-hairline`.
  - Set dark mode root defaults (`.dark body { background-color: var(--color-obsidian); color: var(--color-ice); }`).
- [x] Theme State Engine & FOUC Prevention (`components/ThemeProvider.tsx`, `app/layout.tsx`):
  - Built `ThemeProvider` supporting `"light" | "dark" | "system"` with cookie persistence (`theme=...`), `localStorage` sync, and system `matchMedia` listeners.
  - Injected inline blocking FOUC-prevention script in `app/layout.tsx` `<head>` to evaluate preference before DOM render and prevent bright white flashes.
- [x] Accessible Theme Mode Switcher Component (`components/ThemeToggle.tsx`):
  - Designed interactive multi-mode toggle with Sun, Moon, and Monitor icons.
  - Provided `default`, `minimal`, and `pill` variants meeting WCAG AA minimum 44×44px touch targets.
  - Integrated into public `Header.tsx` (desktop bar & mobile navigation drawer), `Footer.tsx`, and studio `AdminHeader.tsx`.
- [x] Whole-Website Dark Mode Integration:
  - **Public Core Components**: `Header.tsx`, `Footer.tsx`, `RecipeCard.tsx`, `FeaturedRow.tsx`, `SubscribeBanner.tsx`, `CategoryCarousel.tsx`, `SectionHeading.tsx`, `IngredientsList.tsx`, `RecipesFilterView.tsx`, `ContactForm.tsx`, `StarRating.tsx`, `ToastProvider.tsx`.
  - **Public Routes**: Home (`app/page.tsx`), Recipe Catalog (`app/recipes/page.tsx`), Recipe Detail (`app/recipes/[slug]/page.tsx`), Categories Overview (`app/category/page.tsx`), Category Detail (`app/category/[slug]/page.tsx`), About Us (`app/about/page.tsx`), Contact Us (`app/contact/page.tsx`).
  - **Static & Error Pages**: Privacy Policy (`app/privacy/page.tsx`), Terms of Service (`app/terms/page.tsx`), 404 (`app/not-found.tsx`), 500 (`app/error.tsx`), Critical Shell (`app/global-error.tsx`), Maintenance (`app/coming-soon/page.tsx`, `app/under-construction/page.tsx`).
  - **Auth & Studio Admin**: Login (`app/login/page.tsx`), Signup (`app/signup/page.tsx`), Auth Forms (`SignInForm.tsx`, `SignUpForm.tsx`), Admin Layout (`app/admin/layout.tsx`), Admin Header (`AdminHeader.tsx`), Overview (`app/admin/page.tsx`), Stats (`AdminStats.tsx`), Settings (`app/admin/settings/page.tsx`), Site Status Manager (`SiteStatusManager.tsx`), Recipe Management (`AdminRecipeList.tsx`), Category Management (`AdminCategoryList.tsx`), Recipe Editor & Creator (`RecipeForm.tsx`), Image Uploaders (`RecipeImageUploader.tsx`, `CategoryImageUploader.tsx`), Admin Recipe Pages (`app/admin/recipes/page.tsx`, `app/admin/recipes/new/page.tsx`, `app/admin/recipes/[slug]/edit/page.tsx`), Admin Category Page (`app/admin/categories/page.tsx`).
- [x] Code Quality & Verification:
  - Zero raw hex values committed; all dark mode styles strictly use semantic utility tokens (`dark:bg-obsidian`, `dark:bg-surface`, `dark:bg-panel`, `dark:text-ice`, `dark:text-slate-muted`, `dark:text-amber-text`, `dark:border-hairline`, `dark:bg-amber-primary`).
  - Verified touch target accessibility (>= 44x44px) across all interactive theme toggles and input controls.
- [x] Dark Mode Image Dimming & Visual Comfort (`app/globals.css`, `brandGuidelines.md`):
  - Configured global dark mode image dimming (`filter: brightness(0.86)`) in `app/globals.css` with smooth transition (`transition: filter 0.25s ease`), preventing harsh high-contrast glare against the Obsidian `#0A0B0E` canvas.
  - Implemented interactive hover restoration (`filter: brightness(1)`) so readers can inspect food photography with full clarity on interaction.
  - Explicitly exempted brand favicons and vector icons (`img[src*="favicon"]`, `img[data-no-dim]`) from dimming.
  - Documented rules in Section 8 of `brandGuidelines.md`.

### Phase 13: Recipe Author Foreign Key (`ref: "User"`) & Query Population

- [x] Single Author Foreign Key Schema (`lib/models/Recipe.ts`, `lib/models/User.ts`):
  - Replaced legacy embedded author subdocument in `RecipeSchema` with a single `author: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }`.
  - Updated `IRecipe` TypeScript definition: `author: Types.ObjectId | IUser`.
  - Added optional `avatar` and `bio` fields to `IUser` interface and `UserSchema` in `lib/models/User.ts`.
- [x] Logged-In User Association in Server Actions (`lib/actions/recipe.ts`):
  - Updated `createRecipe`: Obtains authenticated `session.userId` from `verifySession()` and associates `author: new Types.ObjectId(session.userId)`.
  - Updated `updateRecipe`: Preserves author foreign key or normalizes legacy documents with `new Types.ObjectId(session.userId)`.
  - Added `getOrCreateDefaultAuthorId()` fallback helper to guarantee seamless legacy migration and test-seeding without breaking constraints.
- [x] Mongoose Author Query Population (`lib/actions/recipe.ts`):
  - Updated `getRecipes()` with `.populate("author", "name email role avatar")`.
  - Updated `findRecipeBySlug()` with `.populate("author", "name email role avatar")`.
  - Created `formatPopulatedAuthor(rawAuthor)` to cleanly normalize populated user documents into the client-safe `RecipeAuthor` structure (`id`, `name`, `role`, `email`, `avatar`).
- [x] Author Display Synchronization:
  - Public Recipe Detail (`app/recipes/[slug]/page.tsx`): Displays populated author photo avatar, name ("By {recipe.author.name}"), role, and date published.
  - Admin Recipe Studio (`app/admin/recipes/new/page.tsx`, `app/admin/recipes/[slug]/edit/page.tsx`, `components/admin/RecipeForm.tsx`): Displays the logged-in user's name as the recipe author.
  - Admin Recipe Listing (`components/admin/AdminRecipeList.tsx`): Displays populated author name in both table and grid views.
  - Category Showcase (`app/category/[slug]/page.tsx`): Dynamically fetches recipes using `getRecipes()` so database recipes and populated authors render seamlessly.

### Phase 14: Interactive Star Ratings & Database Persistence

- [x] Recipe Rating Mongoose Schema (`lib/models/RecipeRating.ts`, `lib/models/Recipe.ts`):
  - Created lightweight `RecipeRating` model storing `recipeSlug` (indexed) and `rating` (1 to 5).
  - Adjusted `author` field in `RecipeSchema` to `required: false` so document saves and rating updates are never blocked by author validation.
- [x] Zero Author/Auth Check Rating Server Action (`lib/actions/recipe.ts`):
  - Streamlined `rateRecipe(slug: string, rating: number)`:
    - Zero user or author authentication required — any reader (guest or authenticated) can submit star ratings freely.
    - Uses MongoDB `updateOne({ slug }, { $set: { rating: newAverage, ratingCount: newCount } })` to update metrics directly without triggering document-level author checks or validation errors.
    - Computes moving average (`Math.round(newTotal / newCount * 10) / 10`) and increments `ratingCount`.
    - Saves rating record in `RecipeRating` collection.
    - Revalidates paths (`/recipes/[slug]`, `/recipes`, `/`).
- [x] Interactive Star Rating Component (`components/RecipeRatingWidget.tsx`):
  - Designed interactive 5-star rating widget following `brandGuidelines.md`:
    - Accessible 44×44px touch targets with visible focus rings (`focus-visible:ring-sage`, `dark:focus-visible:ring-amber-primary`).
    - Dynamic star hover preview with expressive feedback labels ("Could be better", "Fair", "Good", "Very good", "Outstanding! Authentic perfection").
    - Client-side persistence using `localStorage` for immediate recognition on subsequent visits.
    - Instant optimistic state updates, loading spinner feedback, and graceful error handling.
    - Displays real-time aggregate score and total ratings recorded in the database.
- [x] Recipe Detail Page Integration (`app/recipes/[slug]/page.tsx`):
  - Added jump link (`Rate this recipe`) in the header rating block to scroll directly to the rating widget.
  - Positioned `RecipeRatingWidget` directly below instructions and cook's notes for intuitive reader interaction.

### Phase 15: Complete Mock Data Elimination & 100% Database-Driven Architecture

- [x] Mock Data Stripping & TypeScript Refactoring (`lib/data.ts`):
  - Stripped all hardcoded mock recipe data structures (`chickenCurry`, `stringHoppers`, `prawnCurry`, `muttonCurry`) and category arrays.
  - Set `allRecipes = []` and `categories = []` as empty array fallbacks to prevent mock data leakage.
  - Retained clean TypeScript interfaces (`Recipe`, `Category`, `Ingredient`, `Instruction`, `RecipeAuthor`).
  - Refactored helper functions (`getRelatedRecipes`, `getRecipesByCategory`, `getCategoryCount`) to operate on passed-in arrays rather than global static state.
- [x] Isolated Seed Data (`lib/seedData.ts`):
  - Created dedicated `seedData.ts` containing initial default arrays (`seedCategories`, `seedRecipes`) used strictly on first boot when MongoDB collections contain 0 documents.
- [x] 100% Database-Backed Server Actions (`lib/actions/recipe.ts`, `lib/actions/category.ts`):
  - Removed all mock data imports and catch-block static fallbacks.
  - Created `ensureRecipeAuthorsMigrated()` in `lib/actions/recipe.ts`: Safely migrates legacy embedded author subdocuments (`author: { name: ... }`) to valid `User` ObjectId references before executing `.populate()`, eliminating MongoDB `CastError` exceptions.
  - Added database-backed `getCategoryBySlug(slug: string)` in `lib/actions/category.ts`.
  - Added database-backed `getRelatedRecipes(currentSlug, category, limit)` in `lib/actions/recipe.ts`.
  - Updated `rateRecipe()`: Queries and updates solely against MongoDB; rejects if recipe does not exist.
- [x] Public Routes Database Migration:
  - **Homepage** (`app/page.tsx`): Marked `dynamic = "force-dynamic"`. Fetches `[recipes, categories] = await Promise.all([getRecipes(), getCategories()])`.
  - **All Recipes** (`app/recipes/page.tsx`): Marked `dynamic = "force-dynamic"`. Queries live recipes and categories from database.
  - **Recipe Detail** (`app/recipes/[slug]/page.tsx`): Queries `findRecipeBySlug()` and `getRelatedRecipes()` directly from MongoDB.
  - **Categories Overview** (`app/category/page.tsx`): Converted to async component. Dynamically aggregates recipe counts per category from MongoDB.
  - **Category Detail** (`app/category/[slug]/page.tsx`): `generateStaticParams()`, `generateMetadata()`, and page body query `getCategories()`, `getCategoryBySlug()`, and `getRecipes()` from MongoDB.
  - **Dynamic Sitemap** (`app/sitemap.ts`): Converted to async function querying `getRecipes()` and `getCategories()` from MongoDB to generate up-to-date XML index.
  - **404 Not Found Page** (`app/not-found.tsx`): Converted to async component fetching categories from database.
- [x] Admin Studio Migration:
  - **Admin Studio Overview** (`app/admin/page.tsx`): Removed `@/lib/data` mock imports. Fetches `[recipes, categoriesList] = await Promise.all([getRecipes(), getCategories()])`.
  - **Admin Categories Studio** (`app/admin/categories/page.tsx`): Removed `allRecipes` mock import. Passes live MongoDB recipes to `<AdminCategoryList>`.
- [x] Live Verification & Testing:
  - Verified live MongoDB query execution on `localhost:3000` across homepage (`/`), recipe catalog (`/recipes`), single recipe detail (`/recipes/traditional-sri-lankan-chicken-curry`), category pages (`/category`, `/category/breakfast`), and `sitemap.xml`.
- [x] Hydration & Runtime Deprecation Fixes:
  - Fixed client/server hydration mismatch in `components/admin/SiteStatusManager.tsx` caused by `new Date().toLocaleDateString()`:
    - Implemented deterministic `formatDisplayDate(dateStr)` extracting UTC parts (`Oct 23, 2026`) identically across server and client locales.
    - Added `suppressHydrationWarning` on the date display `<span>`.
  - Replaced deprecated Mongoose `{ new: true }` option with `{ returnDocument: 'after' }` in `lib/actions/siteStatus.ts` and `lib/actions/category.ts`.
  - Added `suppressHydrationWarning` to JSON-LD structured data `<script>` in `app/recipes/[slug]/page.tsx` to eliminate React script tag warnings.
- [x] Site Status Mode Persistence Fix (`lib/actions/siteStatus.ts`):
  - Removed temporary initialization override in `getSiteStatus()` that was resetting non-live modes (`coming_soon`, `under_construction`) back to `live` on page reload.
  - Site status mode, custom headlines, and expected launch dates are now permanently preserved and read directly from MongoDB across page reloads.

### Phase 16: Automated SEO-Friendly Slug Generation for Recipes & Categories

- [x] Dedicated SEO Slug Generation Engine (`lib/slug.ts`):
  - Built pure isomorphic slug generator adhering strictly to `AGENTS.md` (Sections 18 & 19 on SEO and readable, semantic URLs).
  - Unicode NFD diacritics/accents normalization to guarantee clean ASCII output for Sri Lankan transliterated names (`ā` -> `a`, `é` -> `e`, `ñ` -> `n`).
  - Contextual symbol conversion (`&` -> `and`, `+` -> `plus`, `@` -> `at`).
  - Clean apostrophe/quote removal without extra hyphens (`Grandma's` -> `grandmas`).
  - Elimination of special punctuation, consecutive hyphen collapsing, leading/trailing hyphen trimming, lowercase conversion, and smart length capping at 90 characters without cutting words.
- [x] Live Real-Time Recipe Slug Generation (`components/admin/RecipeForm.tsx`):
  - Updated `handleTitleChange` to generate SEO-friendly slugs in real-time as the recipe title is typed.
  - Added interactive "Auto-Generate" button (`Sparkles` icon) allowing instantaneous one-click slug regeneration at any time.
  - Added `onBlur` sanitization to ensure manual user edits conform to strict SEO URL standards.
  - Added preview feedback showing live `/recipes/[slug]` path.
- [x] Live Real-Time Category Slug Generation (`components/admin/AdminCategoryList.tsx`):
  - Added real-time slug generation while typing category display name in the Create Category modal.
  - Tracked `categorySlugManuallyEdited` state to respect intentional manual overrides.
  - Added "Auto-Generate" button (`Sparkles` icon) and `onBlur` formatting with `/category/[slug]` preview.
- [x] Server-Side Enforcement & Uniqueness Collision Resolver (`lib/actions/recipe.ts`, `lib/actions/category.ts`):
  - `createRecipe` & `updateRecipe`: Enforces `generateSlug()` sanitization on all incoming slugs.
  - Auto-resolves duplicate slug collisions (`while (await RecipeModel.exists({ slug })) { slug = `${baseSlug}-${counter}`; counter++; }`) so recipe publishing never crashes on duplicate names.
  - `createCategory` & `updateCategory`: Enforces `generateSlug()` and auto-resolves collisions (`while (await CategoryModel.exists({ slug })) { slug = `${baseSlug}-${counter}`; counter++; }`).

### Phase 17: Draft Recipe Exclusion from Public Website

- [x] Public-by-Default Recipe Query Filtering (`lib/actions/recipe.ts`, `lib/data.ts`):
  - Added `status?: "draft" | "published"` to core `Recipe` interface in `lib/data.ts`.
  - Updated `getRecipes(options?: { includeDrafts?: boolean })` to filter `{ status: { $ne: "draft" } }` by default.
  - Updated `getRelatedRecipes` to query `{ status: { $ne: "draft" } }` so draft recipes never appear as related items.
  - Updated `rateRecipe` to reject ratings on recipes with `status === "draft"`.
- [x] Protected Public Recipe Detail & SEO Metadata (`app/recipes/[slug]/page.tsx`):
  - In `generateStaticParams()`: Only pre-renders published recipes.
  - In `generateMetadata()`: Returns 404 "Recipe Not Found" metadata for any draft recipe so search engine crawlers never index draft recipes.
  - In `RecipeDetailPage`: Validates reader authorization; unauthenticated guests and readers receive `notFound()` (404), while authenticated admins and editors can preview their draft with an informative "Draft Preview Mode" banner.
- [x] Sitemap & Taxonomy Integration (`app/sitemap.ts`, `app/category/page.tsx`, `app/category/[slug]/page.tsx`):
  - `app/sitemap.ts`: Excludes draft recipes from the public XML sitemap.
  - `app/category/page.tsx` & `app/category/[slug]/page.tsx`: Only counts and displays published recipes.
- [x] Admin Studio Status Controls & Filtering (`app/admin/recipes/page.tsx`, `app/admin/page.tsx`, `components/admin/AdminRecipeList.tsx`):
  - Admin Studio routes fetch recipes with `includeDrafts: true`.
  - Added Status filter tabs ("All", "Published", "Drafts") to `AdminRecipeList.tsx`.
  - Rendered clear visual status badges ("Published" in sage green, "Draft" in warm amber) in both table and card views.

### Phase 18: Recipe Asset & Image Cleanup on Deletion & Update

- [x] Automatic Hero Image Blob Deletion (`lib/actions/recipe.ts`):
  - In `deleteRecipe(slug)`: Retrieves the recipe document before/during deletion via `RecipeModel.findOneAndDelete({ slug })`.
  - Safely deletes the associated hero image from Vercel Blob storage via `deleteBlobByUrl(deleted.image)`.
  - Non-blob or static asset paths (`/images/...`) are safely skipped without error.
  - Also purges all associated star rating entries in `RecipeRating` collection (`RecipeRating.deleteMany({ recipeSlug: slug })`).
- [x] Replaced Image Cleanup on Recipe Update (`lib/actions/recipe.ts`):
  - In `updateRecipe(originalSlug, data)`: If the user uploads/replaces the recipe's hero image, the previous blob asset is automatically removed from Vercel Blob storage.
- [x] User Feedback & Confirmation Dialogs (`components/admin/AdminRecipeList.tsx`):
  - Updated deletion confirmation prompt to explicitly notify users that the recipe, its ratings, and its image asset will be removed.
  - Provides clear toast feedback upon successful deletion of both recipe and asset.
- [x] Recipe Management UI Cleanup (`app/admin/recipes/page.tsx`):
  - Removed "New Recipe" action link from the recipe management studio header in `app/admin/recipes/page.tsx` as requested.
- [x] Recipe Form Brand-Compliant Green Publication Buttons (`components/admin/RecipeForm.tsx`):
  - Updated Publication Status "Published" toggle button to use green in both light theme (`bg-sage hover:bg-sage-dark text-white`) and dark theme (`dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:border-emerald-500 text-white`) conforming to `brandGuidelines.md`.
  - Maintained standard brand amber buttons (`dark:bg-amber-primary text-obsidian`) for primary submission actions.
- [x] Admin Panel Dark Mode Green Active Navigation Buttons (`components/admin/AdminHeader.tsx`):
  - Updated active navigation button styling in both desktop navbar and mobile drawer in `AdminHeader.tsx` to display green in dark mode (`dark:bg-emerald-600 text-white dark:focus-visible:ring-emerald-500`) matching `brandGuidelines.md`.

### Phase 19: User Password & Profile Picture Management in Admin Studio

- [x] Session & Data Layer Expansion (`lib/definitions.ts`, `lib/session.ts`, `lib/dal.ts`, `lib/actions/auth.ts`):
  - Added optional `avatar?: string` to `SessionPayload` in `lib/definitions.ts`.
  - Updated `createSession` in `lib/session.ts` to accept and serialize `avatar` into the signed session JWT cookie.
  - Updated `verifySession` in `lib/dal.ts` to expose `avatar` from the decrypted session payload.
  - Updated `login` and `signup` in `lib/actions/auth.ts` to populate user avatar directly into active session tokens on authentication.
- [x] Pure Cryptographic Password Utilities (`lib/password.ts`):
  - Extracted Node.js `scrypt` hashing (`hashPassword`) and timing-safe comparison (`verifyPassword`) into standalone module `lib/password.ts` for clean reusability across auth and profile actions without `"use server"` export constraints.
- [x] Dedicated User Profile & Password Server Actions (`lib/actions/user.ts`):
  - `getUserProfile()`: Securely queries authenticated user profile data from MongoDB with session verification.
  - `updateUserProfile(data)`: Validates name length, updates name, bio, and avatar in MongoDB, cleans up replaced Vercel Blob avatars via `deleteBlobByUrl`, re-issues the active encrypted session cookie with updated credentials, and triggers automated path revalidation (`/admin`, `/admin/profile`, `/recipes`, `/`).
  - `changePassword(data)`: Validates current password, enforces minimum 6-character length and match confirmation, checks timing-safe `verifyPassword` against stored MongoDB hash, hashes new password with random salt, and updates the database.
- [x] Cloud Profile Picture Upload (`lib/actions/upload.ts`):
  - Added `uploadAvatarImage(formData)` server action: Validates user session, enforces image format constraints (JPEG, PNG, WebP, AVIF, GIF) and 5MB size limit, uploads to `avatars/` directory in Vercel Blob with private store compatibility, and returns the accessible image URL.
- [x] Interactive Profile Studio Component (`components/admin/AdminProfileForm.tsx`):
  - Tabbed interface switching between "Profile & Picture" and "Change Password".
  - **Avatar Uploader**: Live circular avatar preview with fallback initials, camera quick action, drag-and-drop file upload with progress indicator, direct URL input drawer, and one-click remove action.
  - **Profile Details**: Editable display name with validation, read-only verified email indicator, role badge (`admin` / `editor`), and multi-line culinary bio textarea.
  - **Password Change**: Current password with visibility toggle, new password with dynamic length indicator, confirm password with live matching validation, security best practices card, and toast notification feedback.
- [x] Dedicated Admin Profile Route (`app/admin/profile/page.tsx`):
  - Server Component protected by `verifyAdminSession()`.
  - Breadcrumb navigation, page header, and seamless pre-population of authenticated user profile.
- [x] Admin Header & Navigation Integration (`components/admin/AdminHeader.tsx`, `app/admin/layout.tsx`):
  - Added "Profile" tab with `User` icon to desktop navbar and mobile drawer.
  - Updated user profile section in desktop header and mobile drawer to render the user's avatar photo with circular crop, and linked directly to `/admin/profile`.
  - Added "Profile" link in admin layout footer navigation.

### Phase 20: Full-Screen Length UI for Admin Studio

- [x] Full-Width Layout Container (`app/admin/layout.tsx`):
  - Removed restrictive `max-w-[1240px]` and `mx-auto` constraints from `<main>`.
  - Upgraded main content shell to fluid full width (`w-full px-4 sm:px-6 md:px-8 xl:px-12 py-6 sm:py-8`), allowing the admin UI to utilize the entire screen length/width on high-resolution displays.
  - Aligned admin footer to full width (`w-full px-4 sm:px-6 md:px-8 xl:px-12`) with responsive spacing.
- [x] Full-Width Studio Header (`components/admin/AdminHeader.tsx`):
  - Removed `max-w-[1240px]` from both top micro-bar and primary navbar.
  - Upgraded header content containers to `w-full px-4 sm:px-6 md:px-8 xl:px-12` for edge-to-edge alignment with the main viewport.
- [x] Full-Width Status Banner (`components/admin/AdminSiteStatusBanner.tsx`):
  - Replaced `max-w-[1240px]` with `w-full px-4 sm:px-6 md:px-8 xl:px-12` for fluid system status notice display.
- [x] Responsive Card Grid Scaling (`components/admin/AdminRecipeList.tsx`, `components/admin/AdminCategoryList.tsx`):
  - Upgraded recipe card grid from 3-columns to 5-columns on wide viewports (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6`).
  - Upgraded category grid to 5-columns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5`).
  - Added wider image responsive sizes (`(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, ...`) to prevent oversized stretched cards and maintain optimal food photography aspect ratios.
- [x] Profile Studio Container Expansion (`components/admin/AdminProfileForm.tsx`):
  - Expanded password and profile forms to `w-full max-w-4xl` to harmonize with full-width screen layouts.
- [x] Verified Production Build:
  - Clean TypeScript checks and successful `pnpm build` (22/22 pages generated).



