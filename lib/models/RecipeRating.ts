import mongoose, { Schema, Model, Types } from "mongoose";

export interface IRecipeRating {
  _id?: Types.ObjectId;
  recipeSlug: string;
  rating: number;
  recipeId?: Types.ObjectId;
  userId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const RecipeRatingSchema = new Schema<IRecipeRating>(
  {
    recipeSlug: {
      type: String,
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const RecipeRating: Model<IRecipeRating> =
  mongoose.models.RecipeRating ||
  mongoose.model<IRecipeRating>("RecipeRating", RecipeRatingSchema);
