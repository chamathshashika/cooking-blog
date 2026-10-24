/**
 * SEO-Friendly URL Slug Generator & Uniqueness Resolver
 * Adheres to AGENTS.md, Section 18 & 19 (Readable, semantic, unique slugs).
 */

/**
 * Generate a clean, SEO-friendly slug from any string title or name.
 * Features:
 * - Converts accents and diacritics to standard ASCII (e.g., café -> cafe, Sinhala transliterations ā -> a)
 * - Replaces ampersands (&) with 'and'
 * - Replaces plus signs (+) with 'plus'
 * - Strips apostrophes cleanly without creating extra hyphens (e.g., "Grandma's" -> "grandmas")
 * - Replaces non-alphanumeric characters with single hyphens
 * - Collapses consecutive hyphens into a single hyphen
 * - Trims hyphens from beginning and end
 * - Lowercases all characters
 * - Caps at reasonable maximum length without cutting words in half
 */
export function generateSlug(input: string, maxLength: number = 90): string {
  if (!input || typeof input !== "string") return "";

  let slug = input
    .trim()
    // 1. Normalize diacritics/accents (Unicode NFD decomposition)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // 2. Handle common symbols
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/@/g, " at ")
    // 3. Remove single quotes/apostrophes without adding hyphens (e.g., Grandma's -> Grandmas)
    .replace(/['’`"]/g, "")
    // 4. Convert all other non-alphanumeric characters to hyphens
    .replace(/[^a-zA-Z0-9]+/g, "-")
    // 5. Collapse consecutive hyphens
    .replace(/-+/g, "-")
    // 6. Trim leading and trailing hyphens
    .replace(/^-+|-+$/g, "")
    // 7. Lowercase
    .toLowerCase();

  // 8. Truncate to maxLength without cutting mid-word
  if (slug.length > maxLength) {
    const truncated = slug.slice(0, maxLength);
    const lastHyphen = truncated.lastIndexOf("-");
    slug = lastHyphen > 30 ? truncated.slice(0, lastHyphen) : truncated;
    slug = slug.replace(/-+$/, "");
  }

  return slug;
}
