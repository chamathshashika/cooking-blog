# Brand Guidelines: Scrumptious (Cooking Blog)

> Working name taken from the reference mockup. Replace "Scrumptious" with your own brand name; everything else applies as-is.
> Stack: Next.js 16 (App Router), React, Tailwind CSS v4, `next/font`, `next/image`.

---

## 1. Brand Essence

**Personality:** Warm, fresh, inviting, and effortless. It feels like a bright kitchen on a sunny morning.

**Voice & tone**

- Friendly and encouraging, like a home cook sharing a favorite recipe.
- Short, appetizing headlines ("Never miss a recipe", "Explore by category").
- Plain language and active verbs. No jargon.

**Design principles**

1. **Food is the hero.** Photography leads; UI stays quiet.
2. **Warm and light.** Butter-yellow and cream backgrounds with generous white space.
3. **Editorial feel.** Elegant serif headings with small, tidy uppercase labels.
4. **Easy to browse.** Clear categories, large tap targets, consistent card patterns.

---

## 2. Logo

- **Wordmark:** brand name in the display serif (see Typography), dark ink color, sentence case.
- Placed top-left in the header on the cream background.
- **Clear space:** at least the height of the "S" on all sides.
- **Minimum size:** 100px wide on screen.
- Don't recolor, stretch, add shadows, or place on busy photography.

---

## 3. Color Palette

| Role             | Name            | Hex (approx.) | Usage                                   |
| ---------------- | --------------- | ------------- | --------------------------------------- |
| Primary surface  | Butter Cream    | `#FCE9C0`     | Header, hero backdrop                   |
| Primary accent   | Sunshine Yellow | `#FDCB63`     | Subscribe banner, top accent line       |
| Secondary accent | Sage Green      | `#8B9572`     | Primary buttons (Sign Up), social icons |
| Base             | White           | `#FFFFFF`     | Page background, cards, input fields    |
| Text / ink       | Charcoal        | `#2A2622`     | Headings, body, logo                    |
| Muted text       | Warm Gray       | `#6F675F`     | Meta text, captions                     |
| Rating           | Star Gold       | `#E8A317`     | Rating stars                            |
| Page backdrop    | Linen           | `#EEE9DD`     | Outer background for previews/mockups   |

**Rules**

- Yellow/cream is for large background bands. Don't use it for body text.
- Sage green is reserved for primary actions and icons.
- Keep text contrast at WCAG AA or better (charcoal on cream/yellow/white passes; white text on sage needs bold or large size, so check with a contrast tool).

### Tailwind v4 tokens (`app/globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-cream: #fce9c0;
  --color-sunshine: #fdcb63;
  --color-sage: #8b9572;
  --color-sage-dark: #747e5d;
  --color-ink: #2a2622;
  --color-muted: #6f675f;
  --color-star: #e8a317;
  --color-linen: #eee9dd;

  --font-display: var(--font-dm-serif), Georgia, serif;
  --font-ui: var(--font-montserrat), system-ui, sans-serif;

  --radius-pill: 9999px;
}
```

---

## 4. Typography

| Use                               | Font                                           | Style                                       |
| --------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| Logo, headings, recipe titles     | **DM Serif Display** (or DM Serif Text)        | Regular, sentence/title case                |
| Navigation, labels, buttons, tags | **Montserrat**                                 | 600-700, uppercase, letter-spacing `0.08em` |
| Body copy                         | **DM Serif Text** or a readable serif, 17-18px | Regular, line-height 1.7                    |

**Scale (desktop / mobile)**

| Element                                   | Size              |
| ----------------------------------------- | ----------------- |
| H1 (post title)                           | 44px / 32px       |
| H2 (section title, e.g. "Recent Recipes") | 28px / 24px       |
| Card title                                | 18-20px / 17px    |
| Category heading ("explore by category")  | 20px, lowercase   |
| Nav / tags / buttons                      | 10-12px uppercase |
| Body                                      | 17-18px           |

### Loading fonts in Next.js 16

```tsx
// app/layout.tsx
import { DM_Serif_Display, Montserrat } from "next/font/google";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${montserrat.variable}`}>
      <body className="bg-white font-display text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
```

---

## 5. Layout & Spacing

- **Max content width:** 1200px, centered. Side padding 24px (mobile 16px).
- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px.
- **Section rhythm:** 64-96px vertical padding between major sections.
- **Grid:** 4 columns for featured recipes, 3 columns for recent recipes. Collapse to 2 columns on tablet and 1 on mobile.
- **Corners:** photos and buttons use square or very slightly rounded corners. Category thumbnails are fully circular.
- **Shadows:** almost none. Rely on color blocks and white space.

---

## 6. Page Structure (Home)

1. **Header:** cream background with a thin yellow top accent line. Logo on the left. Uppercase nav on the right (Home, Recipes, Sample Pages, Features) with small chevrons for dropdowns, plus circular social icons and a search icon. The active item has a thin underline.
2. **Featured row:** four tall recipe cards overlapping the cream/white boundary. Each has a photo, a category tag overlay, a centered serif title, and an optional star rating.
3. **Subscribe banner:** full-width sunshine-yellow band. Small uppercase label "Subscribe via email", serif headline "Never miss a recipe", Name and Email inputs, and a sage-green "Sign Up" button.
4. **Explore by category:** centered lowercase heading with a horizontal carousel of circular thumbnails (breakfast, lunch, dinner, appetizers, entrees, sides, desserts) and arrow controls.
5. **Recent recipes:** left-aligned H2 with a "Browse all recipes →" link on the right, then a 3-column card grid.
6. **Footer:** to be designed in the same cream/yellow family (see Components).

---

## 7. Components

### Recipe card

- Photo ratio **3:4** (featured) or **4:3** (recent grid), `object-cover`.
- **Category tag:** white background, tiny uppercase Montserrat, anchored bottom-left of the photo, padding `4px 10px`.
- **Title:** serif, centered, 18-20px, max 2 lines. Hover: underline or subtle color shift to sage.
- **Rating:** 5 small gold stars, centered under the title (partial stars allowed).

### Buttons

- **Primary:** sage green background, white uppercase Montserrat 11-12px, letter-spacing `0.1em`, padding `14px 28px`, no radius. Hover: `sage-dark`.
- **Text link:** uppercase 10-11px with a small arrow ("Browse all recipes →").

### Inputs

- White fill, no border or a 1px very light border, centered placeholder in small uppercase or sentence-case sans, height 40px.
- Visible focus ring in sage (2px).

### Category circle

- 64-88px circle photo, lowercase serif label centered below, hover scale `1.05`.

### Navigation

- Uppercase Montserrat 10-11px, bold, letter-spacing `0.08em`, 24px gaps.
- Active page: 1px underline in ink color.
- Mobile: collapse to a hamburger with a full-height cream drawer.

### Social icons

- 20px circles, sage background, white glyph.

---

## 8. Photography & Imagery

- **Style:** bright, natural daylight, overhead (flat-lay) or 45-degree shots.
- **Backgrounds:** light surfaces (marble, white wood, linen). Avoid dark, moody backdrops.
- **Props:** fresh herbs, citrus, napkins, small plates, and cooling racks add warmth without clutter.
- **Color:** let food provide saturated accents against the soft palette.
- **Technical:** minimum 1600px wide originals. Serve through `next/image` with `sizes`, WebP/AVIF, and meaningful `alt` text (e.g. "Waffle with berries and yogurt in a bowl").

---

## 9. Iconography

- Simple line or solid glyphs at 16-24px, consistent 1.5px stroke.
- Use a single set (e.g. Lucide). Icons inherit text color; accents use sage.

---

## 10. Motion

- Subtle only: 150-250ms ease-out.
- Card images zoom `1.03` on hover. Buttons and links transition color.
- Carousel slides horizontally with snap scrolling.
- Respect `prefers-reduced-motion`.

---

## 11. Accessibility

- Contrast: WCAG AA minimum.
- All interactive elements have visible focus states.
- Touch targets are at least 44x44px.
- Alt text on all food photos. Ratings need an accessible label (e.g. `aria-label="Rated 4 out of 5"`).
- Semantic landmarks: `header`, `nav`, `main`, `footer`. One H1 per page.

---

## 12. Content Patterns (Recipe Posts)

Recommended order for each recipe page:

1. Title, category tag, rating, prep/cook/serves meta
2. Hero photo
3. Short intro (2-3 sentences, warm and personal)
4. Ingredients (checklist style)
5. Instructions (numbered steps with optional step photos)
6. Notes and tips
7. Related recipes and subscribe banner

Add `Recipe` JSON-LD structured data for SEO.

---

## 13. Suggested Next.js Project Structure

```
app/
  layout.tsx
  page.tsx                  # Home
  recipes/
    page.tsx                # Browse all
    [slug]/page.tsx         # Recipe detail
  category/[slug]/page.tsx
components/
  Header.tsx
  RecipeCard.tsx
  FeaturedRow.tsx
  SubscribeBanner.tsx
  CategoryCarousel.tsx
  Footer.tsx
content/
  recipes/*.mdx             # or a CMS / database
public/
  images/
```

---

## 14. Do & Don't

**Do**

- Keep large, bright, well-lit food photography front and center.
- Use yellow/cream for big color bands and sage for actions.
- Pair serif headings with tiny uppercase sans labels.

**Don't**

- Add heavy shadows, gradients, or dark themes.
- Use more than two typefaces.
- Put long paragraphs on colored bands.
- Use sage green for non-interactive decoration.
