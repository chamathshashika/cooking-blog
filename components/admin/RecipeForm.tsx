"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Clock,
  Users,
  Star,
  Check,
  Loader2,
  HelpCircle,
  ExternalLink,
  Tag,
  BookOpen,
  ChefHat,
  ChevronUp,
  ChevronDown,
  Sparkles,
  DollarSign,
} from "lucide-react";
import { createRecipe, type CreateRecipeInput } from "@/lib/actions/recipe";
import { useToast } from "@/components/ToastProvider";
import RecipeImageUploader from "@/components/admin/RecipeImageUploader";
import type { Category } from "@/lib/data";

type Props = {
  categories: Category[];
  authorName?: string;
};

type IngredientRow = {
  id: string;
  name: string;
  amount: string;
  group: string;
  optional: boolean;
  affiliateUrl: string;
};

type InstructionStep = {
  id: string;
  title: string;
  text: string;
};

export default function RecipeForm({ categories, authorName = "Chef Amara Perera" }: Props) {
  const router = useRouter();
  const { showToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(categories[0]?.name || "Curries & Dinners");
  const [image, setImage] = useState("/images/recipes/sri-lankan-chicken-curry.jpg");
  const [prepTime, setPrepTime] = useState("20 min");
  const [cookTime, setCookTime] = useState("30 min");
  const [totalTime, setTotalTime] = useState("50 min");
  const [servings, setServings] = useState(4);
  const [excerpt, setExcerpt] = useState("");
  const [intro, setIntro] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("published");

  // Dynamic Ingredients with Affiliate Links
  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    {
      id: "ing-1",
      name: "Ceylon Cinnamon Stick (Alba Grade)",
      amount: "1 stick",
      group: "Spices",
      optional: false,
      affiliateUrl: "https://amazon.com/dp/example-ceylon-cinnamon",
    },
    {
      id: "ing-2",
      name: "Roasted Sri Lankan Curry Powder",
      amount: "2 tbsp",
      group: "Curry Base",
      optional: false,
      affiliateUrl: "",
    },
    {
      id: "ing-3",
      name: "Fresh Coconut Milk (First Extract)",
      amount: "1 cup",
      group: "Curry Base",
      optional: false,
      affiliateUrl: "",
    },
  ]);

  // Dynamic Instructions
  const [instructions, setInstructions] = useState<InstructionStep[]>([
    {
      id: "step-1",
      title: "Temper the Whole Aromatics",
      text: "Heat coconut oil in a clay pot over medium flame. Add curry leaves, bruised lemongrass, cardamom pods, and the cinnamon stick until sizzling and deeply fragrant.",
    },
    {
      id: "step-2",
      title: "Simmer and Reduce",
      text: "Stir in the roasted spices, add the main ingredients with thin coconut milk, and simmer gently until tender and infused with flavor.",
    },
  ]);

  // Notes
  const [notes, setNotes] = useState<string[]>([
    "For the most authentic taste, use genuine Ceylon cinnamon rather than Cassia bark.",
  ]);
  const [newNote, setNewNote] = useState("");

  // Tags
  const [tags, setTags] = useState<string[]>([
    "curry",
    "authentic",
    "coconut milk",
  ]);
  const [newTag, setNewTag] = useState("");

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManuallyEdited) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generated);
    }
  };

  // Ingredient Helpers
  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {
        id: `ing-${Date.now()}`,
        name: "",
        amount: "",
        group: "",
        optional: false,
        affiliateUrl: "",
      },
    ]);
  };

  const updateIngredient = (
    id: string,
    field: keyof Omit<IngredientRow, "id">,
    value: string | boolean
  ) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeIngredient = (id: string) => {
    if (ingredients.length <= 1) {
      showToast("A recipe requires at least one ingredient.", "warning");
      return;
    }
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  // Instruction Helpers
  const addInstruction = () => {
    setInstructions((prev) => [
      ...prev,
      {
        id: `step-${Date.now()}`,
        title: "",
        text: "",
      },
    ]);
  };

  const updateInstruction = (
    id: string,
    field: "title" | "text",
    value: string
  ) => {
    setInstructions((prev) =>
      prev.map((step) => (step.id === id ? { ...step, [field]: value } : step))
    );
  };

  const removeInstruction = (id: string) => {
    if (instructions.length <= 1) {
      showToast("A recipe requires at least one instruction step.", "warning");
      return;
    }
    setInstructions((prev) => prev.filter((step) => step.id !== id));
  };

  const moveInstruction = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= instructions.length) return;
    const copy = [...instructions];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    setInstructions(copy);
  };

  // Notes Helpers
  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes((prev) => [...prev, newNote.trim()]);
    setNewNote("");
  };

  const removeNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  // Tags Helpers
  const addTag = () => {
    const clean = newTag.trim().toLowerCase();
    if (!clean) return;
    if (tags.includes(clean)) {
      showToast("Tag already added.", "info");
      return;
    }
    setTags((prev) => [...prev, clean]);
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast("Please enter a recipe title.", "error");
      return;
    }

    if (!image.trim()) {
      showToast("Please select or upload a featured recipe photo.", "error");
      return;
    }

    const validIngredients = ingredients.filter((ing) => ing.name.trim().length > 0);
    if (validIngredients.length === 0) {
      showToast("Please add at least one named ingredient.", "error");
      return;
    }

    const validInstructions = instructions.filter((st) => st.text.trim().length > 0);
    if (validInstructions.length === 0) {
      showToast("Please add at least one instruction step.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: CreateRecipeInput = {
        title: title.trim(),
        slug: slug.trim() || undefined,
        category,
        image: image.trim(),
        prepTime: prepTime.trim(),
        cookTime: cookTime.trim(),
        totalTime: totalTime.trim() || undefined,
        servings: Number(servings) || 4,
        excerpt: excerpt.trim(),
        intro: intro.trim() || undefined,
        isFeatured,
        ingredients: validIngredients.map((ing) => ({
          name: ing.name.trim(),
          amount: ing.amount.trim() || undefined,
          quantity: ing.amount.trim() || undefined,
          group: ing.group.trim() || undefined,
          optional: ing.optional,
          affiliateUrl: ing.affiliateUrl.trim() || undefined,
          affiliateLink: ing.affiliateUrl.trim() || undefined,
        })),
        instructions: validInstructions.map((st, i) => ({
          step: i + 1,
          title: st.title.trim() || undefined,
          text: st.text.trim(),
        })),
        notes,
        tags,
        status,
      };

      const result = await createRecipe(payload);

      if (result.success && result.slug) {
        showToast(`Recipe "${title}" published successfully!`, "success");
        router.push("/admin/recipes");
      } else {
        showToast(result.error || "Failed to publish recipe.", "error");
      }
    } catch (err: unknown) {
      console.error("Create recipe submission error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while saving the recipe.";
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      {/* Top Header & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-ink/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              href="/admin/recipes"
              className="inline-flex items-center gap-1 font-ui text-[10px] font-bold uppercase tracking-wider text-muted hover:text-ink transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Recipe Database</span>
            </Link>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink">
            Create Sri Lankan Recipe
          </h1>
          <p className="mt-1 font-display text-xs sm:text-sm text-ink/80">
            Publish authentic family culinary stories, ingredient checklists with affiliate partnerships, and step-by-step guidance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/recipes"
            className="min-h-[44px] inline-flex items-center justify-center rounded-md border border-ink/20 bg-white px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-ink hover:bg-linen/50 transition-colors"
          >
            Discard
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-md bg-sage px-6 py-2.5 font-ui text-xs font-bold uppercase tracking-widest text-white shadow-xs transition-all hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Publish Recipe</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Card 1: Essential Identity */}
          <section className="rounded-xl border border-ink/15 bg-white p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 border-b border-ink/10 pb-3">
              <ChefHat className="h-5 w-5 text-sage" />
              <h2 className="font-display text-xl text-ink">Recipe Identity</h2>
            </div>

            <div className="space-y-4">
              {/* Recipe Title */}
              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Recipe Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaffna Spiced Crab Curry with Lemongrass"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full min-h-[44px] rounded-md border border-ink/20 px-3.5 py-2 font-display text-base text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              {/* URL Slug */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink">
                    URL Slug
                  </label>
                  <span className="font-ui text-[10px] text-muted">
                    https://ceylonspicer.com/recipes/<strong>{slug || "..."}</strong>
                  </span>
                </div>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlugManuallyEdited(true);
                    setSlug(e.target.value);
                  }}
                  placeholder="jaffna-spiced-crab-curry"
                  className="w-full min-h-[42px] rounded-md border border-ink/20 bg-linen/20 px-3 py-2 font-mono text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Short Excerpt (Cards & Search Snippet) <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A fiery, fragrant northern Sri Lankan coastal delicacy enriched with drumstick leaves, roasted coriander, and rich coconut gravy..."
                  className="w-full rounded-md border border-ink/20 px-3.5 py-2.5 font-display text-sm text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              {/* Intro Narrative */}
              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Story / Kitchen Intro (Optional)
                </label>
                <textarea
                  rows={4}
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="Share the origins of this dish, heritage memories, or what makes cooking it special in a Sri Lankan family kitchen..."
                  className="w-full rounded-md border border-ink/20 px-3.5 py-2.5 font-display text-sm text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>
            </div>
          </section>

          {/* Card 2: Featured Hero Photography */}
          <section className="rounded-xl border border-ink/15 bg-white p-6 sm:p-7 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-ink/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-sage" />
                <h2 className="font-display text-xl text-ink">Food Photography</h2>
              </div>
              <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted">
                Food Leads • Quiet UI
              </span>
            </div>

            <RecipeImageUploader
              imageUrl={image}
              onImageChange={(newUrl) => setImage(newUrl)}
              disabled={isSubmitting}
            />
          </section>

          {/* Card 3: Dynamic Ingredients Builder with Affiliate Links */}
          <section className="rounded-xl border border-ink/15 bg-white p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-ink/10 pb-3 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-sage" />
                  <h2 className="font-display text-xl text-ink">
                    Ingredients & Affiliate Links
                  </h2>
                </div>
                <p className="font-ui text-xs text-muted mt-0.5">
                  Attach affiliate links to spices and specialty equipment so readers can shop directly.
                </p>
              </div>

              <button
                type="button"
                onClick={addIngredient}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md bg-cream/80 px-3.5 py-1.5 font-ui text-xs font-bold uppercase tracking-wider text-ink border border-ink/10 hover:bg-cream transition-colors self-start sm:self-auto"
              >
                <Plus className="h-4 w-4 text-sage" />
                <span>Add Ingredient</span>
              </button>
            </div>

            {/* Affiliate Monetization Tip Banner */}
            <div className="rounded-md border border-sunshine/50 bg-sunshine/15 p-3.5 flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="font-ui text-xs text-ink/90 leading-relaxed">
                <strong>Monetization Tip:</strong> Add your Amazon, spice merchant, or kitchen supplier affiliate links below. When visitors click <em>&ldquo;Shop&rdquo;</em> on the recipe checklist, the link safely opens in a new tab with FTC-compliant <code className="bg-white/80 px-1 py-0.5 rounded text-[10px]">rel=&ldquo;sponsored&rdquo;</code> tags.
              </p>
            </div>

            {/* Ingredients List */}
            <div className="space-y-4">
              {ingredients.map((item, index) => {
                const hasAffiliate = Boolean(item.affiliateUrl.trim());

                return (
                  <div
                    key={item.id}
                    className={`rounded-lg border p-4 transition-all ${
                      hasAffiliate
                        ? "border-sage/40 bg-sage/5"
                        : "border-ink/15 bg-linen/20"
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                      {/* Drag / Index */}
                      <div className="sm:col-span-1 flex items-center justify-center pt-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-ink/15 font-ui text-[11px] font-bold text-muted">
                          {index + 1}
                        </span>
                      </div>

                      {/* Amount / Quantity */}
                      <div className="sm:col-span-3">
                        <label className="block font-ui text-[10px] font-bold uppercase tracking-wider text-muted mb-1">
                          Amount / Quantity
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2 tbsp, 500g"
                          value={item.amount}
                          onChange={(e) =>
                            updateIngredient(item.id, "amount", e.target.value)
                          }
                          className="w-full min-h-[40px] rounded-md border border-ink/20 bg-white px-2.5 py-1.5 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                        />
                      </div>

                      {/* Ingredient Name */}
                      <div className="sm:col-span-5">
                        <label className="block font-ui text-[10px] font-bold uppercase tracking-wider text-muted mb-1">
                          Ingredient Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ceylon Cinnamon Stick"
                          value={item.name}
                          onChange={(e) =>
                            updateIngredient(item.id, "name", e.target.value)
                          }
                          className="w-full min-h-[40px] rounded-md border border-ink/20 bg-white px-3 py-1.5 font-display text-sm text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                        />
                      </div>

                      {/* Group (Optional) */}
                      <div className="sm:col-span-2">
                        <label className="block font-ui text-[10px] font-bold uppercase tracking-wider text-muted mb-1">
                          Group (Opt.)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Spices"
                          value={item.group}
                          onChange={(e) =>
                            updateIngredient(item.id, "group", e.target.value)
                          }
                          className="w-full min-h-[40px] rounded-md border border-ink/20 bg-white px-2.5 py-1.5 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                        />
                      </div>

                      {/* Remove Button */}
                      <div className="sm:col-span-1 flex items-center justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => removeIngredient(item.id)}
                          aria-label={`Remove ingredient ${index + 1}`}
                          className="flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Affiliate Link Row & Optional Checkbox */}
                    <div className="mt-3 pt-3 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 flex items-center gap-2">
                        <div className="relative flex-1">
                          <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-sage" />
                          <input
                            type="text"
                            placeholder="Add affiliate / shop link: https://amazon.com/... or https://spiceshop.lk/..."
                            value={item.affiliateUrl}
                            onChange={(e) =>
                              updateIngredient(
                                item.id,
                                "affiliateUrl",
                                e.target.value
                              )
                            }
                            className="w-full min-h-[38px] rounded-md border border-ink/20 bg-white pl-8 pr-3 py-1 font-mono text-xs text-ink placeholder:text-muted/70 focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                          />
                        </div>

                        {item.affiliateUrl.trim() && (
                          <a
                            href={
                              item.affiliateUrl.startsWith("http")
                                ? item.affiliateUrl
                                : `https://${item.affiliateUrl}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[38px] items-center gap-1 rounded-md border border-sage/40 bg-white px-2.5 py-1 font-ui text-[11px] font-bold uppercase tracking-wider text-sage hover:bg-sage hover:text-white transition-colors shrink-0"
                            title="Test affiliate link destination"
                          >
                            <span>Test</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <input
                          type="checkbox"
                          id={`optional-${item.id}`}
                          checked={item.optional}
                          onChange={(e) =>
                            updateIngredient(item.id, "optional", e.target.checked)
                          }
                          className="h-4 w-4 rounded accent-sage focus:ring-sage cursor-pointer"
                        />
                        <label
                          htmlFor={`optional-${item.id}`}
                          className="font-ui text-xs text-muted cursor-pointer select-none"
                        >
                          Mark as optional
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={addIngredient}
              className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-ink/20 py-2.5 font-ui text-xs font-bold uppercase tracking-wider text-muted hover:border-sage hover:text-sage hover:bg-sage/5 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add Another Ingredient</span>
            </button>
          </section>

          {/* Card 4: Step-by-Step Instructions */}
          <section className="rounded-xl border border-ink/15 bg-white p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-ink/10 pb-3 gap-2">
              <div>
                <h2 className="font-display text-xl text-ink">
                  Preparation Steps & Method
                </h2>
                <p className="font-ui text-xs text-muted mt-0.5">
                  Clear, ordered directions for home cooks of any skill level.
                </p>
              </div>

              <button
                type="button"
                onClick={addInstruction}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md bg-cream/80 px-3.5 py-1.5 font-ui text-xs font-bold uppercase tracking-wider text-ink border border-ink/10 hover:bg-cream transition-colors self-start sm:self-auto"
              >
                <Plus className="h-4 w-4 text-sage" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-4">
              {instructions.map((step, index) => (
                <div
                  key={step.id}
                  className="rounded-lg border border-ink/15 bg-linen/20 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-xs font-bold uppercase tracking-wider text-sage">
                      Step {index + 1}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveInstruction(index, "up")}
                        aria-label={`Move step ${index + 1} up`}
                        className="p-1 text-muted hover:text-ink disabled:opacity-30 disabled:hover:text-muted"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        disabled={index === instructions.length - 1}
                        onClick={() => moveInstruction(index, "down")}
                        aria-label={`Move step ${index + 1} down`}
                        className="p-1 text-muted hover:text-ink disabled:opacity-30 disabled:hover:text-muted"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeInstruction(step.id)}
                        aria-label={`Remove step ${index + 1}`}
                        className="p-1 text-muted hover:text-red-600 transition-colors ml-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-ui text-[10px] font-bold uppercase tracking-wider text-muted mb-1">
                      Step Title (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Marinate the seafood"
                      value={step.title}
                      onChange={(e) =>
                        updateInstruction(step.id, "title", e.target.value)
                      }
                      className="w-full min-h-[38px] rounded-md border border-ink/20 bg-white px-3 py-1.5 font-display text-sm text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                    />
                  </div>

                  <div>
                    <label className="block font-ui text-[10px] font-bold uppercase tracking-wider text-muted mb-1">
                      Instructions <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe what to do in this step..."
                      value={step.text}
                      onChange={(e) =>
                        updateInstruction(step.id, "text", e.target.value)
                      }
                      className="w-full rounded-md border border-ink/20 bg-white px-3 py-2 font-display text-sm text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addInstruction}
              className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-ink/20 py-2.5 font-ui text-xs font-bold uppercase tracking-wider text-muted hover:border-sage hover:text-sage hover:bg-sage/5 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add Another Step</span>
            </button>
          </section>

          {/* Card 5: Chef Notes & Culinary Tips */}
          <section className="rounded-xl border border-ink/15 bg-white p-6 sm:p-7 shadow-2xs space-y-4">
            <h2 className="font-display text-xl text-ink border-b border-ink/10 pb-3">
              Chef Notes &amp; Tips
            </h2>

            <div className="space-y-2">
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 rounded-md bg-linen/30 border border-ink/10 px-3.5 py-2"
                >
                  <span className="font-display text-xs text-ink flex-1">
                    {note}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeNote(index)}
                    aria-label={`Remove tip ${index + 1}`}
                    className="text-muted hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add a culinary tip or substitution advice..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addNote();
                  }
                }}
                className="flex-1 min-h-[42px] rounded-md border border-ink/20 px-3 py-1.5 font-display text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              />
              <button
                type="button"
                onClick={addNote}
                className="min-h-[42px] inline-flex items-center gap-1 rounded-md bg-linen px-4 py-1.5 font-ui text-xs font-bold uppercase tracking-wider text-ink hover:bg-cream transition-colors"
              >
                <span>Add Tip</span>
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar Column (Right 1 Column) */}
        <div className="space-y-6">
          {/* Taxonomy & Category */}
          <div className="rounded-xl border border-ink/15 bg-white p-6 shadow-2xs space-y-4">
            <h3 className="font-display text-lg text-ink border-b border-ink/10 pb-2.5">
              Category &amp; Taxonomy
            </h3>

            <div>
              <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                Cuisine Category <span className="text-red-600">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full min-h-[44px] rounded-md border border-ink/20 px-3 py-2 font-ui text-xs uppercase tracking-wider text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.name}>
                    {cat.displayName}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="pt-2">
              <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                Recipe Tags
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-cream/70 border border-ink/10 px-2.5 py-0.5 font-ui text-[11px] font-semibold text-ink"
                  >
                    <span>#{t}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      className="text-muted hover:text-ink"
                      aria-label={`Remove tag ${t}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. seafood, spicy"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="flex-1 min-h-[40px] rounded-md border border-ink/20 px-3 py-1 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="min-h-[40px] rounded-md bg-linen px-3 font-ui text-xs font-bold uppercase text-ink hover:bg-cream"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Timings & Servings */}
          <div className="rounded-xl border border-ink/15 bg-white p-6 shadow-2xs space-y-4">
            <h3 className="font-display text-lg text-ink border-b border-ink/10 pb-2.5">
              Cooking Metrology
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                  Prep Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
                  <input
                    type="text"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="20 min"
                    className="w-full min-h-[40px] rounded-md border border-ink/20 pl-8 pr-2 py-1 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>
              </div>

              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                  Cook Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
                  <input
                    type="text"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    placeholder="30 min"
                    className="w-full min-h-[40px] rounded-md border border-ink/20 pl-8 pr-2 py-1 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>
              </div>

              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                  Total Time
                </label>
                <input
                  type="text"
                  value={totalTime}
                  onChange={(e) => setTotalTime(e.target.value)}
                  placeholder="50 min"
                  className="w-full min-h-[40px] rounded-md border border-ink/20 px-3 py-1 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                  Servings
                </label>
                <div className="relative">
                  <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
                  <input
                    type="number"
                    min={1}
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                    className="w-full min-h-[40px] rounded-md border border-ink/20 pl-8 pr-2 py-1 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visibility & Publishing */}
          <div className="rounded-xl border border-ink/15 bg-white p-6 shadow-2xs space-y-4">
            <h3 className="font-display text-lg text-ink border-b border-ink/10 pb-2.5">
              Publication Settings
            </h3>

            {/* Featured toggle */}
            <div className="flex items-start gap-3 rounded-lg border border-sunshine/40 bg-sunshine/10 p-3.5">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 rounded accent-sage mt-0.5 cursor-pointer"
              />
              <label htmlFor="isFeatured" className="cursor-pointer select-none">
                <div className="flex items-center gap-1 font-ui text-xs font-bold uppercase tracking-wider text-ink">
                  <Star className="h-3.5 w-3.5 fill-sunshine text-ink" />
                  <span>Feature on Hero Banner</span>
                </div>
                <p className="font-ui text-[11px] text-muted mt-0.5">
                  Showcase as one of the 4 featured cards at the top of the homepage.
                </p>
              </label>
            </div>

            {/* Status toggle */}
            <div>
              <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                Publication Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("published")}
                  className={`min-h-[40px] rounded-md border font-ui text-xs font-bold uppercase tracking-wider transition-colors ${
                    status === "published"
                      ? "border-sage bg-sage text-white"
                      : "border-ink/20 bg-white text-muted hover:text-ink"
                  }`}
                >
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={`min-h-[40px] rounded-md border font-ui text-xs font-bold uppercase tracking-wider transition-colors ${
                    status === "draft"
                      ? "border-ink bg-ink text-white"
                      : "border-ink/20 bg-white text-muted hover:text-ink"
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>

            <div className="pt-2 text-muted font-ui text-[11px]">
              Author: <strong>{authorName}</strong>
            </div>
          </div>

          {/* Sticky Submit Button on Desktop */}
          <div className="p-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-md bg-sage px-6 py-3 font-ui text-xs font-bold uppercase tracking-widest text-white shadow-xs transition-all hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Publishing Recipe...</span>
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  <span>Publish Recipe</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
