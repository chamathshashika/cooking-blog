import mongoose, { Schema, Model, Types } from "mongoose";

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
  displayName: string;
  slug: string;
  description: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    displayName: {
      type: String,
      required: [true, "Display name is required"],
      trim: true,
      maxlength: [100, "Display name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model during Next.js hot reload
export const CategoryModel: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
