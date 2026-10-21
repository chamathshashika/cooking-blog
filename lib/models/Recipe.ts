import mongoose, { Schema, Model, Types } from "mongoose";

export interface IIngredient {
  name: string;
  amount?: string;
  quantity?: string;
  group?: string;
  optional?: boolean;
  affiliateUrl?: string;
  affiliateLink?: string;
}

export interface IInstruction {
  step: number;
  title?: string;
  text: string;
}

export interface IAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface IRecipe {
  _id?: Types.ObjectId;
  slug: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  ratingCount?: number;
  prepTime: string;
  cookTime: string;
  totalTime?: string;
  servings: number;
  excerpt: string;
  intro?: string;
  isFeatured: boolean;
  ingredients: IIngredient[];
  instructions: IInstruction[];
  notes?: string[];
  tags?: string[];
  author?: IAuthor;
  status: "draft" | "published";
  publishedDate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const IngredientSchema = new Schema<IIngredient>(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: String, trim: true },
    quantity: { type: String, trim: true },
    group: { type: String, trim: true },
    optional: { type: Boolean, default: false },
    affiliateUrl: { type: String, trim: true },
    affiliateLink: { type: String, trim: true },
  },
  { _id: false }
);

const InstructionSchema = new Schema<IInstruction>(
  {
    step: { type: Number, required: true },
    title: { type: String, trim: true },
    text: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, trim: true },
    role: { type: String, trim: true },
    avatar: { type: String, trim: true },
  },
  { _id: false }
);

const RecipeSchema = new Schema<IRecipe>(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
      maxlength: [180, "Title cannot exceed 180 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },
    image: {
      type: String,
      required: [true, "Hero image is required"],
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    prepTime: {
      type: String,
      required: [true, "Prep time is required"],
      trim: true,
    },
    cookTime: {
      type: String,
      required: [true, "Cook time is required"],
      trim: true,
    },
    totalTime: {
      type: String,
      trim: true,
    },
    servings: {
      type: Number,
      required: [true, "Servings is required"],
      min: [1, "Servings must be at least 1"],
      default: 4,
    },
    excerpt: {
      type: String,
      required: [true, "Short excerpt is required"],
      trim: true,
      maxlength: [400, "Excerpt cannot exceed 400 characters"],
    },
    intro: {
      type: String,
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    ingredients: {
      type: [IngredientSchema],
      default: [],
    },
    instructions: {
      type: [InstructionSchema],
      default: [],
    },
    notes: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    author: {
      type: AuthorSchema,
      default: {
        name: "Chef Amara Perera",
        role: "Master Recipe Developer",
        avatar: "/images/recipes/sri-lankan-chicken-curry.jpg",
      },
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      index: true,
    },
    publishedDate: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model during Next.js hot reload
export const RecipeModel: Model<IRecipe> =
  mongoose.models.Recipe || mongoose.model<IRecipe>("Recipe", RecipeSchema);
