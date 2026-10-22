# Task Tracker: Sri Lankan Cooking Blog

Tracking project milestones, tasks, and implementation progress based on [AGENTS.md](file:///c:/Users/chamathw/My%20Projects/blog/cooking-blog/AGENTS.md) and [brandGuidelines.md](file:///c:/Users/chamathw/My%20Projects/blog/cooking-blog/brandGuidelines.md).

---

## Current Status

- **Active Phase**: Phase 10 (Site Status & Maintenance Modes: Coming Soon & Under Construction with Admin Bypass) Complete
- **Status**: Production Ready & Fully Verified against `AGENTS.md` and `brandGuidelines.md`
- **Last Updated**: 2026-10-22

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


