<!-- BEGIN:nextjs-agent-rules -->

# Sri Lankan Cooking Blog

A user-generated cooking blog platform focused on Sri Lankan recipes and food stories.

Users can create, edit, save, publish, and manage their own recipes and posts.

The application should be fast, simple, accessible, secure, and SEO-friendly.

## Related Project Files

Read these before doing any UI or content work:

- `brandGuidelines.md`: colors, typography, spacing, components, photography. **The source of truth for visual design.**
- `SKILL.md` (`cooking-blog-ui`): workflow and coding conventions for building UI.

If this file conflicts with those files:

- Tech stack, security, data, and project structure → follow **this file**.
- Visual design and branding → follow **`brandGuidelines.md`**.

---

## 1. Tech Stack

This project uses:

- Next.js 16
- React
- TypeScript
- App Router
- Tailwind CSS (v4, design tokens in `app/globals.css`)
- @material-tailwind/react
- Lucide React
- `next/font` (DM Serif Display, Montserrat)
- MongoDB
- Mongoose
- pnpm

Use the existing stack.

Do not add another library when the existing stack can solve the problem.

---

## 2. General Rules

- Keep the code simple and readable.
- Follow the existing project structure.
- Reuse existing components and utilities.
- Do not duplicate functionality.
- Do not over-engineer simple features.
- Do not modify unrelated code.
- Use TypeScript.
- Keep components reusable.
- Make the smallest reasonable change.
- Check the relevant Next.js documentation in `node_modules/next/dist/docs/` when available.

---

## 3. Next.js

This project uses the Next.js 16 App Router.

Use the `app/` directory for routes and pages.

```text
app/
├── page.tsx                  # Home
├── recipes/
│   ├── page.tsx              # Browse all recipes
│   └── [slug]/
│       └── page.tsx          # Recipe detail
├── category/
│   └── [slug]/page.tsx
├── dashboard/                # Author area
├── login/
└── api/
```

Server Components are the default.

Only use `"use client";` when client-side functionality is required, such as:

- React state and effects
- browser APIs
- interactive UI (category carousel, mobile menu, forms)
- rich text editors
- drag and drop

Keep database and sensitive server logic on the server.

---

## 4. Project Structure

Keep responsibilities separated.

```text
app/                # Routes and pages
components/         # Reusable components
components/ui/      # Shared primitives (Button, Input), built on @material-tailwind/react
lib/                # Utilities and application logic
lib/models/         # Mongoose models
lib/actions/        # Server Actions
public/             # Static assets
```

Follow the existing structure when adding new files.

---

## 5. UI & Branding

Use:

- @material-tailwind/react for base UI components
- Tailwind CSS for styling
- lucide-react for icons

**Follow `brandGuidelines.md` for all visual decisions.**

- Use the brand tokens (`bg-cream`, `bg-sunshine`, `bg-sage`, `text-ink`, `font-display`, `font-ui`). Never hardcode hex values.
- Override Material Tailwind's default colors, radius, and typography with the brand tokens. Don't ship its default blue/rounded look.
- Primary buttons are sage green, uppercase, small, with wide letter-spacing.
- Headings and recipe titles use the serif display font. Nav, tags, and buttons use small uppercase Montserrat.
- Food photography leads. Keep the UI light, warm, and quiet, with almost no shadows.
- Use no more than two typefaces.

Reuse existing components before creating new ones.

Keep the UI clean, simple, responsive, and accessible. Avoid unnecessary animations and visual complexity.

---

## 6. Icons

Use `lucide-react`.

```tsx
import { Search, Plus, Clock } from "lucide-react";

<Search className="h-4 w-4" />;
```

Do not install another icon library.

Do not manually create SVG icons unless necessary.

---

## 7. Content

Users create and manage their own content.

The platform supports:

- Recipes
- Blog posts and food stories
- Categories
- Tags
- Featured images
- Drafts
- Published content
- SEO metadata

Do not generate or modify user content unless the user explicitly requests the feature.

Do not overwrite existing content unnecessarily.

---

## 8. Recipe Model

A recipe may contain:

```text
Title
Slug
Intro / Excerpt
Featured Image
Category
Tags
Ingredients (list, with quantity and unit)
Instructions (ordered steps, optional step images)
Prep Time
Cook Time
Servings
Notes / Tips
Rating (average)
SEO Title
SEO Description
Status (draft | published)
Published Date
Updated Date
Author
```

Default categories: breakfast, lunch, dinner, appetizers, entrees, sides, desserts, drinks.

Preserve existing fields when modifying a model.

Do not remove existing fields without a clear requirement.

---

## 9. Content Management

Users should be able to:

- Create recipes and posts
- Edit them
- Save drafts
- Publish and unpublish
- Delete their own content
- Manage categories and tags

Always verify that the authenticated user owns the content before allowing modifications.

---

## 10. Editor

The recipe/post editor should be easy to use.

- Keep the interface simple.
- Preserve unsaved content where possible.
- Provide clear validation errors.
- Clearly indicate draft/published status.
- Make ingredients and steps easy to add, reorder, and remove.
- Reuse existing form components.

If rich text or Markdown is used, follow the existing project implementation.

---

## 11. Authentication & Authorization

Every protected content operation must:

1. Check the user's session.
2. Identify the authenticated user.
3. Verify ownership of the requested resource.
4. Perform the operation only after authorization succeeds.

Never trust a user ID supplied by the client.

---

## 12. MongoDB / Mongoose

MongoDB is the application's database.

Use Mongoose models for database operations.

Keep database access server-side. Never connect to MongoDB from a Client Component.

Reuse the existing database connection. Do not create multiple connection implementations.

---

## 13. User Data

Users must only access or modify resources they are authorized to access.

Pay particular attention to:

- Recipes and posts
- Drafts
- Categories and tags
- User profiles
- Uploaded images
- Newsletter subscribers (never expose emails)

Do not expose another user's private or draft content.

---

## 14. Server Actions

Use Server Actions for appropriate server-side mutations.

Server Actions should:

- Validate input.
- Check authentication.
- Check authorization.
- Perform the database operation.
- Return useful errors.
- Revalidate affected data when necessary.

Do not put sensitive business logic in Client Components.

---

## 15. Validation

Never trust client input. Validate on the server.

Validate things such as:

- Title and slug
- Ingredients and instruction steps
- Prep/cook time and servings (positive numbers)
- Category and tag IDs
- Image references
- User IDs
- Newsletter name and email

Return clear validation errors.

---

## 16. User-Generated Content

Treat user-generated content as untrusted input.

When rendering HTML or rich content:

- Sanitize unsafe HTML.
- Prevent script injection.
- Do not execute arbitrary user-provided JavaScript.
- Safely handle links and embedded content.

Security is more important than preserving unsafe formatting.

---

## 17. Newsletter / Subscribe Form

The "Never miss a recipe" subscribe banner collects a name and email.

- Validate and normalize the email on the server.
- Prevent duplicate subscriptions.
- Never expose subscriber data to the client.
- Show clear success and error states.
- Store only what is needed.

---

## 18. SEO

Published recipes and posts must support SEO.

Use appropriate:

- Page titles and meta descriptions
- Canonical URLs
- Open Graph metadata
- Readable slugs
- Heading structure (one `h1` per page)
- Image alt text
- `Recipe` JSON-LD structured data on recipe pages (name, image, ingredients, instructions, times, servings, rating)

Use the Next.js Metadata APIs.

Do not add SEO metadata that does not accurately describe the content. Do not keyword-stuff user content.

---

## 19. URLs / Slugs

Use readable, unique slugs.

```text
/recipes/kiribath
/recipes/pol-sambol
/category/desserts
```

Do not change an existing published slug without considering its existing URL.

---

## 20. Images

Food photography is central to the brand. Always use `next/image`.

- Provide `alt` text that describes the dish (e.g. "Kiribath with lunu miris on a banana leaf").
- Never use meaningless alt text such as "image", "photo", or "picture".
- Provide `sizes` for responsive images.
- Use the brand aspect ratios: 3:4 for featured cards, 4:3 for grid cards.

```tsx
<Image
  src="/images/kiribath.jpg"
  alt="Kiribath with lunu miris on a banana leaf"
  fill
  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
  className="object-cover"
/>
```

---

## 21. Performance

Prefer Server Components when possible.

Avoid unnecessary:

- Client Components
- JavaScript
- dependencies
- API requests
- database queries
- re-renders

Optimize images and keep public recipe pages fast.

---

## 22. Responsive Design & Accessibility

The application must work on mobile (375px), tablet (768px), and desktop (1200px+).

Use responsive Tailwind classes. Grids collapse 4 → 2 → 1 columns (featured) and 3 → 2 → 1 (recent).

Accessibility:

- Use semantic HTML (`header`, `nav`, `main`, `footer`).
- Make interactive elements keyboard accessible with a visible focus ring.
- Touch targets are at least 44x44px.
- Icon-only buttons need an accessible label.
- Star ratings need an `aria-label` (e.g. "Rated 4 out of 5").
- Maintain WCAG AA text contrast. Check white-on-sage text.
- Respect `prefers-reduced-motion`.

---

## 23. TypeScript

Use strong TypeScript types.

Avoid `any` unless there is a clear reason.

Reuse existing types. Do not create duplicate types for the same data.

Remove unused imports and variables.

---

## 24. Environment Variables

Keep secrets in environment variables. Use `.env.local` for local development.

Never hardcode:

- Database credentials
- API keys
- Authentication secrets
- Private tokens

Never expose private environment variables to Client Components.

---

## 25. Dependencies

Before adding a dependency:

1. Check whether the project already has the functionality.
2. Check whether Next.js or React provides it.
3. Check whether an existing dependency can solve it.
4. Only add a new package when necessary.

Existing responsibilities:

```text
Next.js 16               → Application framework
Tailwind CSS             → Styling and brand tokens
@material-tailwind/react → Base UI components
lucide-react             → Icons
next/font                → Fonts
MongoDB/Mongoose         → Database
```

Do not add duplicate libraries (no shadcn/ui, Radix, MUI, or another icon set).

---

## 26. Package Manager

This project uses `pnpm`.

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm lint
```

Add dependencies with `pnpm add <package>` and dev dependencies with `pnpm add -D <package>`.

Do not mix package managers or create multiple lockfiles.

---

## 27. Code Changes

Before changing code:

1. Read `brandGuidelines.md` and `SKILL.md` for UI work.
2. Inspect the existing implementation.
3. Check existing components and utilities.
4. Reuse existing patterns.
5. Make the smallest reasonable change.
6. Check authentication and authorization requirements.
7. Check server/client boundaries.

Do not rewrite unrelated code.

---

## 28. After Changes

After implementing changes:

- Check TypeScript and ESLint errors.
- Check broken and unused imports.
- Check responsive UI at mobile, tablet, and desktop widths.
- Check the UI against `brandGuidelines.md`.
- Check accessibility.
- Check SEO for public pages.
- Check authentication/authorization for protected features.
- Run the build when appropriate.

```bash
pnpm lint
pnpm build
```

---

## 29. Next.js Version

Next.js APIs and conventions change between versions.

Before using a version-sensitive feature:

1. Check the installed Next.js version.
2. Check the relevant documentation.
3. Follow the conventions supported by the installed version.

Do not blindly use examples from older Next.js tutorials.

---

## 30. Main Principle

Build this as a **simple, secure, user-focused cooking blog** with a warm, food-first design.

Prioritize:

```text
Security
   ↓
User experience
   ↓
Content integrity
   ↓
Brand consistency
   ↓
Performance
   ↓
SEO
   ↓
Maintainability
```

Do not sacrifice security or user content integrity for convenience.

<!-- END:nextjs-agent-rules -->
