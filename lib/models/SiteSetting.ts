import mongoose, { Schema, Model, Types } from "mongoose";

export type SiteMode = "live" | "coming_soon" | "under_construction";

export interface ISiteSetting {
  _id?: Types.ObjectId;
  key: string;
  mode: SiteMode;
  headline?: string;
  message?: string;
  expectedLaunchDate?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "site_status",
    },
    mode: {
      type: String,
      enum: ["live", "coming_soon", "under_construction"],
      default: "live",
      required: true,
    },
    headline: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    expectedLaunchDate: {
      type: String,
      trim: true,
      default: "",
    },
    updatedBy: {
      type: String,
      trim: true,
      default: "System",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model re-compilation in Next.js hot reload
export const SiteSettingModel: Model<ISiteSetting> =
  mongoose.models.SiteSetting ||
  mongoose.model<ISiteSetting>("SiteSetting", SiteSettingSchema);
