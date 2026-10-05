---
name: cooking-blog
description: Build and edit pages and UI components for the Sri Lankan cooking blog in Next.js 16 (App Router, Tailwind v4), following brandGuidelines.md. Use when creating recipe pages, cards, headers, banners, carousels, or any styling for the blog.
---

# Cooking Blog UI Skill

Use this skill whenever you create or change UI for the cooking blog. The visual rules live in `brandGuidelines.md`. Read it first and follow it. This file describes the workflow and coding conventions.

## Stack

- Next.js 16, App Router, TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css` under `@theme`)
- `next/font` for DM Serif Display and Montserrat
- `next/image` for all photos
- Recipe content in MDX files under `content/recipes/` (or a CMS if one is added later)

## Workflow

1. **Read `brandGuidelines.md`** for colors, typography, spacing, and component rules.
2. **Check existing components** in `components/` before creating a new one. Reuse and extend instead of duplicating.
3. **Build the component** following the conventions below.
4. **Verify**: run `npm run lint` and `npm run build`, and check the layout at mobile (375px), tablet (768px), and desktop (1200px+).
5. **Summarize** what changed in one or two sentences.

## Coding Conventions

- Use **Server Components by default**. Add `"use client"` only for interactivity (carousel, mobile menu, forms).
- One component per file in `components/`, PascalCase file names (`RecipeCard.tsx`), default export.
- Type all props with a `type Props` declaration.
- Style with Tailwind utility classes using the brand tokens (`bg-cream`, `bg-sunshine`, `bg-sage`, `text-ink`, `font-display`, `font-ui`). **Never hardcode hex values** in components.
- Use `next/image` with `alt`, `sizes`, and `fill` or explicit dimensions. Never use a raw `<img>`.
- Use `next/link` for internal navigation.
- Use semantic HTML (`header`, `nav`, `main`, `section`, `footer`) with one `h1` per page.
- Keep components small. Move data and fetching into the page or a `lib/` helper.

## Core Components

| Component            | Purpose                                                            |
| -------------------- | ------------------------------------------------------------------ |
| `Header` / `NavMenu` | Logo, uppercase nav, social icons, search                          |
| `RecipeCard`         | Photo, category tag, centered serif title, optional rating         |
| `FeaturedRow`        | Four tall `RecipeCard`s at the top of the home page                |
| `StarRating`         | Gold stars from a numeric value, with an accessible label          |
| `SubscribeBanner`    | Yellow band with name and email inputs and the sage Sign Up button |
| `CategoryCarousel`   | Circular category thumbnails with arrow controls                   |
| `SectionHeading`     | Serif H2 with an optional "Browse all →" link                      |
| `Button`, `Input`    | Shared primitives with variants                                    |
| `Footer`             | Cream/yellow family, matches the header                            |

## Design Rules (Quick Reference)

- Food photography leads. UI stays light and quiet.
- Cream and yellow are for large background bands. Sage green is only for actions and icons.
- Headings and recipe titles use the serif display font. Nav, tags, and buttons use small uppercase Montserrat with wide letter-spacing.
- Almost no shadows. Corners are square or barely rounded, and category thumbnails are circles.
- Grids: 4 columns (featured), 3 columns (recent), collapsing to 2 and then 1 on smaller screens.
- Motion is subtle: 150-250ms transitions, and respect `prefers-reduced-motion`.

## Accessibility Checklist

- [ ] Text contrast meets WCAG AA
- [ ] Every image has meaningful `alt` text
- [ ] Interactive elements are keyboard reachable with a visible focus ring
- [ ] Touch targets are at least 44x44px
- [ ] Ratings have an `aria-label` (e.g. "Rated 4 out of 5")

## Recipe Page Structure

1. Title, category tag, rating, prep/cook/serves info
2. Hero photo
3. Short, warm intro
4. Ingredients (checklist)
5. Instructions (numbered steps)
6. Notes and tips
7. Related recipes and `SubscribeBanner`

Include `Recipe` JSON-LD structured data on every recipe page.

## Example: RecipeCard

```tsx
import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";

type Props = {
  title: string;
  category: string;
  image: string;
  slug: string;
  rating?: number;
};

export default function RecipeCard({
  title,
  category,
  image,
  slug,
  rating,
}: Props) {
  return (
    <Link href={`/recipes/${slug}`} className="group block text-center">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-0 left-0 bg-white px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-widest">
          {category}
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg text-ink">{title}</h3>
      {rating !== undefined && <StarRating value={rating} />}
    </Link>
  );
}
```

## Don't

- Don't introduce new colors or fonts outside `brandGuidelines.md`.
- Don't use dark themes, heavy shadows, or gradients.
- Don't use more than two typefaces.
- Don't put long paragraphs on colored bands.
- Don't skip the build and lint check before finishing.
