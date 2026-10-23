"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  ExternalLink,
  BookOpen,
  ChefHat,
  ChevronUp,
  ChevronDown,
  Sparkles,
  DollarSign,
  Save,
  RotateCcw,
  CheckCircle2,
  PauseCircle,
} from "lucide-react";
import {
  createRecipe,
  updateRecipe,
  type CreateRecipeInput,
} from "@/lib/actions/recipe";
import { useToast } from "@/components/ToastProvider";
import RecipeImageUploader from "@/components/admin/RecipeImageUploader";
import type { Category, Recipe } from "@/lib/data";
import { generateSlug } from "@/lib/slug";

type Props = {
  categories: Category[];
  authorName?: string;
  initialRecipe?: Recipe;
  isEditing?: boolean;
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

const AUTOSAVE_STORAGE_KEY = "cooking_blog_recipe_create_draft";
const AUTOSAVE_ENABLED_KEY = "cooking_blog_recipe_create_autosave_enabled";

type SavedDraftData = {
  title: string;
  slug: string;
  category: string;
  image: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  excerpt: string;
  intro: string;
  isFeatured: boolean;
  status: "draft" | "published";
  ingredients: IngredientRow[];
  instructions: InstructionStep[];
  notes: string[];
  tags: string[];
  updatedAt: number;
};

export default function RecipeForm({
  categories,
  authorName = "Chef Amara Perera",
  initialRecipe,
  isEditing = false,
}: Props) {
  const router = useRouter();
  const { showToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEditing);

  // Autosave State
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [discoveredDraft, setDiscoveredDraft] = useState<SavedDraftData | null>(null);
  const isInitialMount = useRef(true);

  // Form State
  const [title, setTitle] = useState(initialRecipe?.title || "");
  const [slug, setSlug] = useState(initialRecipe?.slug || "");
  const [category, setCategory] = useState(
    initialRecipe?.category || categories[0]?.name || "Curries & Dinners"
  );
  const [image, setImage] = useState(
    initialRecipe?.image || "/images/recipes/sri-lankan-chicken-curry.jpg"
  );
  const [prepTime, setPrepTime] = useState(initialRecipe?.prepTime || "20 min");
  const [cookTime, setCookTime] = useState(initialRecipe?.cookTime || "30 min");
  const [totalTime, setTotalTime] = useState(initialRecipe?.totalTime || "");
  const [servings, setServings] = useState(initialRecipe?.servings || 4);
  const [excerpt, setExcerpt] = useState(initialRecipe?.excerpt || "");
  const [intro, setIntro] = useState(initialRecipe?.intro || "");
  const [isFeatured, setIsFeatured] = useState(Boolean(initialRecipe?.isFeatured));
  const [status, setStatus] = useState<"draft" | "published">(
    ((initialRecipe as unknown as { status?: "draft" | "published" })?.status) || "published"
  );

  // Dynamic Ingredients with Affiliate Links
  const [ingredients, setIngredients] = useState<IngredientRow[]>(() => {
    if (initialRecipe?.ingredients && initialRecipe.ingredients.length > 0) {
      return initialRecipe.ingredients.map((ing, idx) => ({
        id: `ing-${idx}-${Date.now()}`,
        name: ing.name || "",
        amount: ing.amount || ing.quantity || "",
        group: ing.group || "",
        optional: Boolean(ing.optional),
        affiliateUrl: ing.affiliateUrl || ing.affiliateLink || "",
      }));
    }
    return [
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
    ];
  });

  // Dynamic Instructions
  const [instructions, setInstructions] = useState<InstructionStep[]>(() => {
    if (initialRecipe?.instructions && initialRecipe.instructions.length > 0) {
      return initialRecipe.instructions.map((st, idx) => ({
        id: `step-${idx}-${Date.now()}`,
        title: st.title || "",
        text: st.text || "",
      }));
    }
    return [
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
    ];
  });

  // Notes
  const [notes, setNotes] = useState<string[]>(
    initialRecipe?.notes && initialRecipe.notes.length > 0
      ? initialRecipe.notes
      : ["For the most authentic taste, use genuine Ceylon cinnamon rather than Cassia bark."]
  );
  const [newNote, setNewNote] = useState("");

  // Tags
  const [tags, setTags] = useState<string[]>(
    initialRecipe?.tags && initialRecipe.tags.length > 0
      ? initialRecipe.tags
      : ["curry", "authentic", "coconut milk"]
  );
  const [newTag, setNewTag] = useState("");

  // Load draft & preference on mount for recipe create
  useEffect(() => {
    if (isEditing) return;

    const timeout = setTimeout(() => {
      try {
        const storedPref = localStorage.getItem(AUTOSAVE_ENABLED_KEY);
        if (storedPref !== null) {
          setAutoSaveEnabled(storedPref === "true");
        }

        const rawDraft = localStorage.getItem(AUTOSAVE_STORAGE_KEY);
        if (rawDraft) {
          const parsed = JSON.parse(rawDraft) as SavedDraftData;
          if (
            parsed &&
            (parsed.title ||
              parsed.excerpt ||
              (parsed.ingredients && parsed.ingredients.some((i) => i.name)))
          ) {
            setDiscoveredDraft(parsed);
          }
        }
      } catch (e) {
        console.warn("Failed to read draft from localStorage:", e);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [isEditing]);

  // Toggle autosave on/off
  const handleToggleAutoSave = () => {
    const next = !autoSaveEnabled;
    setAutoSaveEnabled(next);
    try {
      localStorage.setItem(AUTOSAVE_ENABLED_KEY, String(next));
    } catch (err) {
      console.warn("Failed to save autosave preference:", err);
    }
    showToast(
      next
        ? "Autosave enabled: your draft will save automatically."
        : "Autosave paused.",
      "info"
    );
  };

  // Save current form state to localStorage
  const saveDraftLocally = useCallback(() => {
    if (isEditing) return;

    // Skip if form is essentially empty
    if (!title && !excerpt && ingredients.every((i) => !i.name)) {
      return;
    }

    try {
      setIsAutoSaving(true);
      const draftData: SavedDraftData = {
        title,
        slug,
        category,
        image,
        prepTime,
        cookTime,
        totalTime,
        servings: Number(servings) || 4,
        excerpt,
        intro,
        isFeatured,
        status,
        ingredients,
        instructions,
        notes,
        tags,
        updatedAt: Date.now(),
      };
      localStorage.setItem(AUTOSAVE_STORAGE_KEY, JSON.stringify(draftData));
      const formatted = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLastSavedTime(formatted);
    } catch (err) {
      console.warn("Failed to autosave recipe draft:", err);
    } finally {
      setTimeout(() => {
        setIsAutoSaving(false);
      }, 350);
    }
  }, [
    isEditing,
    title,
    slug,
    category,
    image,
    prepTime,
    cookTime,
    totalTime,
    servings,
    excerpt,
    intro,
    isFeatured,
    status,
    ingredients,
    instructions,
    notes,
    tags,
  ]);

  // Autosave debouncer
  useEffect(() => {
    if (isEditing) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!autoSaveEnabled) return;

    const timer = setTimeout(() => {
      saveDraftLocally();
    }, 1500);

    return () => clearTimeout(timer);
  }, [
    isEditing,
    autoSaveEnabled,
    saveDraftLocally,
    title,
    slug,
    category,
    image,
    prepTime,
    cookTime,
    totalTime,
    servings,
    excerpt,
    intro,
    isFeatured,
    status,
    ingredients,
    instructions,
    notes,
    tags,
  ]);

  // Restore draft handler
  const handleRestoreDraft = () => {
    if (!discoveredDraft) return;
    setTitle(discoveredDraft.title || "");
    setSlug(discoveredDraft.slug || "");
    setCategory(discoveredDraft.category || categories[0]?.name || "Curries & Dinners");
    setImage(discoveredDraft.image || "/images/recipes/sri-lankan-chicken-curry.jpg");
    setPrepTime(discoveredDraft.prepTime || "20 min");
    setCookTime(discoveredDraft.cookTime || "30 min");
    setTotalTime(discoveredDraft.totalTime || "");
    setServings(discoveredDraft.servings || 4);
    setExcerpt(discoveredDraft.excerpt || "");
    setIntro(discoveredDraft.intro || "");
    setIsFeatured(Boolean(discoveredDraft.isFeatured));
    setStatus(discoveredDraft.status || "draft");
    if (discoveredDraft.ingredients && discoveredDraft.ingredients.length > 0) {
      setIngredients(discoveredDraft.ingredients);
    }
    if (discoveredDraft.instructions && discoveredDraft.instructions.length > 0) {
      setInstructions(discoveredDraft.instructions);
    }
    if (discoveredDraft.notes) setNotes(discoveredDraft.notes);
    if (discoveredDraft.tags) setTags(discoveredDraft.tags);

    const savedAt = new Date(discoveredDraft.updatedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setLastSavedTime(savedAt);
    setDiscoveredDraft(null);
    showToast("Unsaved recipe draft restored!", "success");
  };

  // Discard draft handler
  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem(AUTOSAVE_STORAGE_KEY);
    } catch {}
    setDiscoveredDraft(null);
    setLastSavedTime(null);
    showToast("Unsaved draft discarded.", "info");
  };

  // Manual save draft handler
  const handleManualSaveDraft = () => {
    saveDraftLocally();
    showToast("Draft saved locally!", "success");
  };

  // Auto-generate SEO-friendly slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManuallyEdited) {
      setSlug(generateSlug(val));
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

      let result;
      if (isEditing && initialRecipe) {
        result = await updateRecipe(initialRecipe.slug, payload);
      } else {
        result = await createRecipe(payload);
      }

      if (result.success && result.slug) {
        if (!isEditing) {
          try {
            localStorage.removeItem(AUTOSAVE_STORAGE_KEY);
          } catch {}
        }
        showToast(
          isEditing
            ? `Recipe "${title}" updated successfully!`
            : `Recipe "${title}" published successfully!`,
          "success"
        );
        router.push("/admin/recipes");
        router.refresh();
      } else {
        showToast(
          result.error ||
            (isEditing ? "Failed to update recipe." : "Failed to publish recipe."),
          "error"
        );
      }
    } catch (err: unknown) {
      console.error("Recipe submission error:", err);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-ink/10 dark:border-hairline pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              href="/admin/recipes"
              className="inline-flex items-center gap-1 font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Recipe Database</span>
            </Link>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink dark:text-ice">
            {isEditing ? `Edit: ${initialRecipe?.title || title}` : "Create Sri Lankan Recipe"}
          </h1>
          <p className="mt-1 font-display text-xs sm:text-sm text-ink/80 dark:text-slate-muted">
            {isEditing
              ? "Modify family culinary storytelling, ingredients checklist with affiliate partnerships, instructions, and hero photography."
              : "Publish authentic family culinary stories, ingredient checklists with affiliate partnerships, and step-by-step guidance."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Autosave Switch & Indicator for Recipe Creation */}
          {!isEditing && (
            <div className="flex items-center gap-2.5 rounded-lg border border-ink/15 dark:border-hairline bg-white/90 dark:bg-panel px-3 py-1.5 shadow-2xs">
              <button
                type="button"
                onClick={handleToggleAutoSave}
                role="switch"
                aria-checked={autoSaveEnabled}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                  autoSaveEnabled ? "bg-sage dark:bg-emerald-600" : "bg-ink/20 dark:bg-hairline"
                }`}
                title={autoSaveEnabled ? "Autosave is ON (click to turn OFF)" : "Autosave is OFF (click to turn ON)"}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    autoSaveEnabled ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>

              <div className="flex items-center gap-1.5 font-ui text-[11px]">
                <span className="font-bold uppercase tracking-wider text-ink dark:text-ice">
                  Autosave
                </span>
                {autoSaveEnabled ? (
                  <span className="flex items-center gap-1 text-muted dark:text-slate-muted">
                    {isAutoSaving ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin text-sage dark:text-emerald-400" />
                        <span>Saving...</span>
                      </>
                    ) : lastSavedTime ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        <span className="hidden sm:inline">Saved {lastSavedTime}</span>
                        <span className="sm:hidden">Saved</span>
                      </>
                    ) : (
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">ON</span>
                    )}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-muted dark:text-slate-muted font-medium">
                    <PauseCircle className="h-3 w-3" />
                    <span>OFF</span>
                  </span>
                )}
              </div>

              {!autoSaveEnabled && (
                <button
                  type="button"
                  onClick={handleManualSaveDraft}
                  className="ml-1 inline-flex items-center gap-1 rounded bg-cream/70 dark:bg-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink dark:text-ice hover:bg-cream dark:hover:bg-panel transition-colors cursor-pointer"
                  title="Save draft now"
                >
                  <Save className="h-2.5 w-2.5 text-sage dark:text-amber-primary" />
                  <span>Save</span>
                </button>
              )}
            </div>
          )}

          {isEditing && initialRecipe && (
            <Link
              href={`/recipes/${initialRecipe.slug}`}
              target="_blank"
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-surface px-3.5 py-2 font-ui text-xs font-bold uppercase tracking-wider text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice hover:bg-linen/50 dark:hover:bg-panel transition-colors"
              title="Open public recipe in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View Live</span>
            </Link>
          )}

          <Link
            href="/admin/recipes"
            className="min-h-[44px] inline-flex items-center justify-center rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-surface px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice hover:bg-linen/50 dark:hover:bg-panel transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-md bg-sage dark:bg-amber-primary px-6 py-2.5 font-ui text-xs font-bold uppercase tracking-widest text-white dark:text-obsidian shadow-xs transition-all hover:bg-sage-dark dark:hover:bg-amber-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{isEditing ? "Saving Changes..." : "Publishing..."}</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>{isEditing ? "Save Changes" : "Publish Recipe"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Discovered Unsaved Draft Alert Banner */}
      {!isEditing && discoveredDraft && (
        <div className="rounded-xl border border-sunshine/50 dark:border-amber-primary/40 bg-sunshine/10 dark:bg-amber-primary/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="rounded-full bg-sunshine/30 dark:bg-amber-primary/20 p-2 text-ink dark:text-ice shrink-0">
              <Sparkles className="h-4 w-4 text-ink dark:text-amber-text" />
            </div>
            <div>
              <p className="font-display font-semibold text-sm sm:text-base text-ink dark:text-ice">
                Unsaved recipe draft found
              </p>
              <p className="font-ui text-xs text-muted dark:text-slate-muted mt-0.5">
                {discoveredDraft.title ? `"${discoveredDraft.title}"` : "Untitled dish"} • Last saved at {new Date(discoveredDraft.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ({new Date(discoveredDraft.updatedAt).toLocaleDateString()})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleRestoreDraft}
              className="inline-flex items-center gap-1.5 rounded-md bg-sage dark:bg-emerald-600 px-3.5 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white shadow-2xs hover:bg-sage-dark dark:hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restore Draft</span>
            </button>
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="inline-flex items-center gap-1.5 rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-surface px-3 py-2 font-ui text-xs font-bold uppercase tracking-wider text-muted dark:text-slate-muted hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Discard</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Card 1: Essential Identity */}
          <section className="rounded-xl border border-ink/15 dark:border-hairline bg-white dark:bg-surface p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 border-b border-ink/10 dark:border-hairline pb-3">
              <ChefHat className="h-5 w-5 text-sage dark:text-amber-primary" />
              <h2 className="font-display text-xl text-ink dark:text-ice">Recipe Identity</h2>
            </div>

            <div className="space-y-4">
              {/* Recipe Title */}
              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice mb-1.5">
                  Recipe Title <span className="text-red-600 dark:text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaffna Spiced Crab Curry with Lemongrass"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full min-h-[44px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-3.5 py-2 font-display text-base text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                />
              </div>

              {/* URL Slug */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice">
                      URL Slug
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const regenerated = generateSlug(title);
                        setSlug(regenerated);
                        setSlugManuallyEdited(false);
                        showToast("Slug regenerated from recipe title.", "info");
                      }}
                      title="Auto-generate SEO slug from title"
                      className="inline-flex items-center gap-1 font-ui text-[10px] font-semibold uppercase tracking-wider text-sage dark:text-amber-primary hover:underline cursor-pointer"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>Auto-Generate</span>
                    </button>
                  </div>
                  <span className="font-ui text-[10px] text-muted dark:text-slate-muted hidden sm:inline">
                    /recipes/<strong>{slug || "..."}</strong>
                  </span>
                </div>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlugManuallyEdited(true);
                    setSlug(e.target.value);
                  }}
                  onBlur={() => {
                    if (slug) {
                      setSlug(generateSlug(slug));
                    }
                  }}
                  placeholder="jaffna-spiced-crab-curry"
                  className="w-full min-h-[42px] rounded-md border border-ink/20 dark:border-hairline bg-linen/20 dark:bg-panel/50 px-3 py-2 font-mono text-xs text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                />
                <p className="mt-1 font-ui text-[10px] text-muted dark:text-slate-muted">
                  Auto-formatted with lowercase ASCII, hyphens, and optimized for search engine indexing.
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice mb-1.5">
                  Short Excerpt (Cards & Search Snippet) <span className="text-red-600 dark:text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A fiery, fragrant northern Sri Lankan coastal delicacy enriched with drumstick leaves, roasted coriander, and rich coconut gravy..."
                  className="w-full rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-3.5 py-2.5 font-display text-sm text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                />
              </div>

              {/* Intro Narrative */}
              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice mb-1.5">
                  Story / Kitchen Intro (Optional)
                </label>
                <textarea
                  rows={4}
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="Share the origins of this dish, heritage memories, or what makes cooking it special in a Sri Lankan family kitchen..."
                  className="w-full rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-3.5 py-2.5 font-display text-sm text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                />
              </div>
            </div>
          </section>

          {/* Card 2: Featured Hero Photography */}
          <section className="rounded-xl border border-ink/15 dark:border-hairline bg-white dark:bg-surface p-6 sm:p-7 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-ink/10 dark:border-hairline pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-sage dark:text-amber-primary" />
                <h2 className="font-display text-xl text-ink dark:text-ice">Food Photography</h2>
              </div>
              <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted">
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
          <section className="rounded-xl border border-ink/15 dark:border-hairline bg-white dark:bg-surface p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-ink/10 dark:border-hairline pb-3 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-sage dark:text-amber-primary" />
                  <h2 className="font-display text-xl text-ink dark:text-ice">
                    Ingredients & Affiliate Links
                  </h2>
                </div>
                <p className="font-ui text-xs text-muted dark:text-slate-muted mt-0.5">
                  Attach affiliate links to spices and specialty equipment so readers can shop directly.
                </p>
              </div>

              <button
                type="button"
                onClick={addIngredient}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md bg-cream/80 dark:bg-panel px-3.5 py-1.5 font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice border border-ink/10 dark:border-hairline hover:bg-cream dark:hover:bg-surface transition-colors self-start sm:self-auto"
              >
                <Plus className="h-4 w-4 text-sage dark:text-amber-primary" />
                <span>Add Ingredient</span>
              </button>
            </div>

            {/* Affiliate Monetization Tip Banner */}
            <div className="rounded-md border border-sunshine/50 dark:border-amber-primary/30 bg-sunshine/15 dark:bg-amber-primary/10 p-3.5 flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-amber-700 dark:text-amber-text shrink-0 mt-0.5" />
              <p className="font-ui text-xs text-ink/90 dark:text-ice leading-relaxed">
                <strong>Monetization Tip:</strong> Add your Amazon, spice merchant, or kitchen supplier affiliate links below. When visitors click <em>&ldquo;Shop&rdquo;</em> on the recipe checklist, the link safely opens in a new tab with FTC-compliant <code className="bg-white/80 dark:bg-panel px-1 py-0.5 rounded text-[10px] text-ink dark:text-ice border border-transparent dark:border-hairline">rel=&ldquo;sponsored&rdquo;</code> tags.
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
                        ? "border-sage/40 dark:border-amber-primary/40 bg-sage/5 dark:bg-amber-primary/5"
                        : "border-ink/15 dark:border-hairline bg-linen/20 dark:bg-panel/40"
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                      {/* Drag / Index */}
                      <div className="sm:col-span-1 flex items-center justify-center pt-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-surface border border-ink/15 dark:border-hairline font-ui text-[11px] font-bold text-muted dark:text-slate-muted">
                          {index + 1}
                        </span>
                      </div>

                      {/* Amount / Quantity */}
                      <div className="sm:col-span-3">
                        <label className="block font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted mb-1">
                          Amount / Quantity
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 2 tbsp, 500g"
                          value={item.amount}
                          onChange={(e) =>
                            updateIngredient(item.id, "amount", e.target.value)
                          }
                          className="w-full min-h-[40px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-2.5 py-1.5 font-ui text-xs text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                        />
                      </div>

                      {/* Ingredient Name */}
                      <div className="sm:col-span-5">
                        <label className="block font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted mb-1">
                          Ingredient Name <span className="text-red-600 dark:text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ceylon Cinnamon Stick"
                          value={item.name}
                          onChange={(e) =>
                            updateIngredient(item.id, "name", e.target.value)
                          }
                          className="w-full min-h-[40px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-3 py-1.5 font-display text-sm text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                        />
                      </div>

                      {/* Group (Optional) */}
                      <div className="sm:col-span-2">
                        <label className="block font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted mb-1">
                          Group (Opt.)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Spices"
                          value={item.group}
                          onChange={(e) =>
                            updateIngredient(item.id, "group", e.target.value)
                          }
                          className="w-full min-h-[40px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-2.5 py-1.5 font-ui text-xs text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                        />
                      </div>

                      {/* Remove Button */}
                      <div className="sm:col-span-1 flex items-center justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => removeIngredient(item.id)}
                          aria-label={`Remove ingredient ${index + 1}`}
                          className="flex h-9 w-9 items-center justify-center rounded-md text-muted dark:text-slate-muted hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Affiliate Link Row & Optional Checkbox */}
                    <div className="mt-3 pt-3 border-t border-ink/10 dark:border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 flex items-center gap-2">
                        <div className="relative flex-1">
                          <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-sage dark:text-amber-primary" />
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
                            className="w-full min-h-[38px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel pl-8 pr-3 py-1 font-mono text-xs text-ink dark:text-ice placeholder:text-muted/70 dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
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
                            className="inline-flex min-h-[38px] items-center gap-1 rounded-md border border-sage/40 dark:border-amber-primary/40 bg-white dark:bg-surface px-2.5 py-1 font-ui text-[11px] font-bold uppercase tracking-wider text-sage dark:text-amber-text hover:bg-sage dark:hover:bg-amber-primary hover:text-white dark:hover:text-obsidian transition-colors shrink-0"
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
                          className="h-4 w-4 rounded accent-sage dark:accent-amber-primary focus:ring-sage dark:focus:ring-amber-primary cursor-pointer"
                        />
                        <label
                          htmlFor={`optional-${item.id}`}
                          className="font-ui text-xs text-muted dark:text-slate-muted cursor-pointer select-none"
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
              className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-ink/20 dark:border-hairline py-2.5 font-ui text-xs font-bold uppercase tracking-wider text-muted dark:text-slate-muted hover:border-sage dark:hover:border-amber-primary hover:text-sage dark:hover:text-amber-text hover:bg-sage/5 dark:hover:bg-amber-primary/5 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add Another Ingredient</span>
            </button>
          </section>

          {/* Card 4: Step-by-Step Instructions */}
          <section className="rounded-xl border border-ink/15 dark:border-hairline bg-white dark:bg-surface p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-ink/10 dark:border-hairline pb-3 gap-2">
              <div>
                <h2 className="font-display text-xl text-ink dark:text-ice">
                  Preparation Steps & Method
                </h2>
                <p className="font-ui text-xs text-muted dark:text-slate-muted mt-0.5">
                  Clear, ordered directions for home cooks of any skill level.
                </p>
              </div>

              <button
                type="button"
                onClick={addInstruction}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md bg-cream/80 dark:bg-panel px-3.5 py-1.5 font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice border border-ink/10 dark:border-hairline hover:bg-cream dark:hover:bg-surface transition-colors self-start sm:self-auto"
              >
                <Plus className="h-4 w-4 text-sage dark:text-amber-primary" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-4">
              {instructions.map((step, index) => (
                <div
                  key={step.id}
                  className="rounded-lg border border-ink/15 dark:border-hairline bg-linen/20 dark:bg-panel/40 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-xs font-bold uppercase tracking-wider text-sage dark:text-amber-text">
                      Step {index + 1}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveInstruction(index, "up")}
                        aria-label={`Move step ${index + 1} up`}
                        className="p-1 text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice disabled:opacity-30 disabled:hover:text-muted"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        disabled={index === instructions.length - 1}
                        onClick={() => moveInstruction(index, "down")}
                        aria-label={`Move step ${index + 1} down`}
                        className="p-1 text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice disabled:opacity-30 disabled:hover:text-muted"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeInstruction(step.id)}
                        aria-label={`Remove step ${index + 1}`}
                        className="p-1 text-muted dark:text-slate-muted hover:text-red-600 dark:hover:text-red-400 transition-colors ml-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted mb-1">
                      Step Title (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Marinate the seafood"
                      value={step.title}
                      onChange={(e) =>
                        updateInstruction(step.id, "title", e.target.value)
                      }
                      className="w-full min-h-[38px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-3 py-1.5 font-display text-sm text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted mb-1">
                      Instructions <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe what to do in this step..."
                      value={step.text}
                      onChange={(e) =>
                        updateInstruction(step.id, "text", e.target.value)
                      }
                      className="w-full rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-3 py-2 font-display text-sm text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addInstruction}
              className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-ink/20 dark:border-hairline py-2.5 font-ui text-xs font-bold uppercase tracking-wider text-muted dark:text-slate-muted hover:border-sage dark:hover:border-amber-primary hover:text-sage dark:hover:text-amber-text hover:bg-sage/5 dark:hover:bg-amber-primary/5 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add Another Step</span>
            </button>
          </section>

          {/* Card 5: Chef Notes & Culinary Tips */}
          <section className="rounded-xl border border-ink/15 dark:border-hairline bg-white dark:bg-surface p-6 sm:p-7 shadow-2xs space-y-4">
            <h2 className="font-display text-xl text-ink dark:text-ice border-b border-ink/10 dark:border-hairline pb-3">
              Chef Notes &amp; Tips
            </h2>

            <div className="space-y-2">
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 rounded-md bg-linen/30 dark:bg-panel/50 border border-ink/10 dark:border-hairline px-3.5 py-2"
                >
                  <span className="font-display text-xs text-ink dark:text-ice flex-1">
                    {note}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeNote(index)}
                    aria-label={`Remove tip ${index + 1}`}
                    className="text-muted dark:text-slate-muted hover:text-red-600 dark:hover:text-red-400 transition-colors"
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
                className="flex-1 min-h-[42px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-3 py-1.5 font-display text-xs text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
              />
              <button
                type="button"
                onClick={addNote}
                className="min-h-[42px] inline-flex items-center gap-1 rounded-md bg-linen dark:bg-panel border border-transparent dark:border-hairline px-4 py-1.5 font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice hover:bg-cream dark:hover:bg-surface transition-colors"
              >
                <span>Add Tip</span>
              </button>
            </div>
          </section>

        </div>

        {/* Sidebar Column (Right 1 Column) */}
        <div className="space-y-6">
          {/* Taxonomy & Category */}
          <div className="rounded-xl border border-ink/15 dark:border-hairline bg-white dark:bg-surface p-6 shadow-2xs space-y-4">
            <h3 className="font-display text-lg text-ink dark:text-ice border-b border-ink/10 dark:border-hairline pb-2.5">
              Category &amp; Taxonomy
            </h3>

            <div>
              <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice mb-1.5">
                Cuisine Category <span className="text-red-600 dark:text-red-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full min-h-[44px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-3 py-2 font-ui text-xs uppercase tracking-wider text-ink dark:text-ice focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.name} className="dark:bg-panel dark:text-ice">
                    {cat.displayName}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="pt-2">
              <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice mb-1.5">
                Recipe Tags
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-cream/70 dark:bg-panel border border-ink/10 dark:border-hairline px-2.5 py-0.5 font-ui text-[11px] font-semibold text-ink dark:text-ice"
                  >
                    <span>#{t}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      className="text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice"
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
                  className="flex-1 min-h-[40px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-3 py-1 font-ui text-xs text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="min-h-[40px] rounded-md bg-linen dark:bg-panel border border-transparent dark:border-hairline px-3 font-ui text-xs font-bold uppercase text-ink dark:text-ice hover:bg-cream dark:hover:bg-surface"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Timings & Servings */}
          <div className="rounded-xl border border-ink/15 dark:border-hairline bg-white dark:bg-surface p-6 shadow-2xs space-y-4">
            <h3 className="font-display text-lg text-ink dark:text-ice border-b border-ink/10 dark:border-hairline pb-2.5">
              Cooking Metrology
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink dark:text-ice mb-1">
                  Prep Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted dark:text-slate-muted" />
                  <input
                    type="text"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="20 min"
                    className="w-full min-h-[40px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel pl-8 pr-2 py-1 font-ui text-xs text-ink dark:text-ice focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink dark:text-ice mb-1">
                  Cook Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted dark:text-slate-muted" />
                  <input
                    type="text"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    placeholder="30 min"
                    className="w-full min-h-[40px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel pl-8 pr-2 py-1 font-ui text-xs text-ink dark:text-ice focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink dark:text-ice mb-1">
                  Total Time
                </label>
                <input
                  type="text"
                  value={totalTime}
                  onChange={(e) => setTotalTime(e.target.value)}
                  placeholder="50 min"
                  className="w-full min-h-[40px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-3 py-1 font-ui text-xs text-ink dark:text-ice focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                />
              </div>

              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink dark:text-ice mb-1">
                  Servings
                </label>
                <div className="relative">
                  <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted dark:text-slate-muted" />
                  <input
                    type="number"
                    min={1}
                    value={servings}
                    onChange={(e) => setServings(Number(e.target.value))}
                    className="w-full min-h-[40px] rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel pl-8 pr-2 py-1 font-ui text-xs text-ink dark:text-ice focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visibility & Publishing */}
          <div className="rounded-xl border border-ink/15 dark:border-hairline bg-white dark:bg-surface p-6 shadow-2xs space-y-4">
            <h3 className="font-display text-lg text-ink dark:text-ice border-b border-ink/10 dark:border-hairline pb-2.5">
              Publication Settings
            </h3>

            {/* Featured toggle */}
            <div className="flex items-start gap-3 rounded-lg border border-sunshine/40 dark:border-amber-primary/30 bg-sunshine/10 dark:bg-amber-primary/10 p-3.5">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 rounded accent-sage dark:accent-amber-primary mt-0.5 cursor-pointer"
              />
              <label htmlFor="isFeatured" className="cursor-pointer select-none">
                <div className="flex items-center gap-1 font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice">
                  <Star className="h-3.5 w-3.5 fill-sunshine dark:fill-amber-primary text-ink dark:text-amber-text" />
                  <span>Feature on Hero Banner</span>
                </div>
                <p className="font-ui text-[11px] text-muted dark:text-slate-muted mt-0.5">
                  Showcase as one of the 4 featured cards at the top of the homepage.
                </p>
              </label>
            </div>

            {/* Status toggle */}
            <div>
              <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice mb-1.5">
                Publication Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("published")}
                  className={`min-h-[40px] rounded-md border font-ui text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    status === "published"
                      ? "border-sage bg-sage text-white hover:bg-sage-dark dark:border-emerald-500 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500 shadow-xs"
                      : "border-ink/20 dark:border-hairline bg-white dark:bg-panel text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice"
                  }`}
                >
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={`min-h-[40px] rounded-md border font-ui text-xs font-bold uppercase tracking-wider transition-colors ${
                    status === "draft"
                      ? "border-ink bg-ink text-white dark:border-ice dark:bg-ice dark:text-obsidian"
                      : "border-ink/20 dark:border-hairline bg-white dark:bg-panel text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice"
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>

            <div className="pt-2 text-muted dark:text-slate-muted font-ui text-[11px]">
              Author: <strong className="text-ink dark:text-ice">{authorName}</strong>
            </div>

            {/* Autosave Sidebar Status & Manual Save for Recipe Create */}
            {!isEditing && (
              <div className="rounded-lg border border-ink/10 dark:border-hairline bg-linen/30 dark:bg-panel/40 p-3.5 space-y-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice">
                    Autosave Status
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleAutoSave}
                    className={`font-ui text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      autoSaveEnabled
                        ? "bg-sage/15 text-sage dark:text-emerald-400 hover:bg-sage/25"
                        : "bg-ink/10 dark:bg-panel text-muted dark:text-slate-muted hover:bg-ink/20"
                    }`}
                  >
                    {autoSaveEnabled ? "Active (ON)" : "Paused (OFF)"}
                  </button>
                </div>
                <p className="font-ui text-[11px] text-muted dark:text-slate-muted">
                  {autoSaveEnabled
                    ? lastSavedTime
                      ? `Draft automatically saved at ${lastSavedTime}.`
                      : "Changes are automatically saved to your browser as you type."
                    : "Autosave is paused. Click the toggle or 'Save Draft Now' to update your draft."}
                </p>
                <div className="pt-1 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleManualSaveDraft}
                    className="inline-flex items-center gap-1.5 rounded border border-ink/15 dark:border-hairline bg-white dark:bg-surface px-2.5 py-1 font-ui text-[11px] font-semibold text-ink dark:text-ice hover:bg-linen/50 dark:hover:bg-panel transition-colors cursor-pointer"
                  >
                    <Save className="h-3 w-3 text-sage dark:text-amber-primary" />
                    <span>Save Draft Now</span>
                  </button>
                  {lastSavedTime && (
                    <button
                      type="button"
                      onClick={handleDiscardDraft}
                      className="font-ui text-[10px] text-muted hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                    >
                      Clear Draft
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Submit Button on Desktop */}
          <div className="p-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-md bg-sage dark:bg-amber-primary px-6 py-3 font-ui text-xs font-bold uppercase tracking-widest text-white dark:text-obsidian shadow-xs transition-all hover:bg-sage-dark dark:hover:bg-amber-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{isEditing ? "Saving Changes..." : "Publishing Recipe..."}</span>
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  <span>{isEditing ? "Save Changes" : "Publish Recipe"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
