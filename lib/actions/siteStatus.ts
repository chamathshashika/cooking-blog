"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import {
  SiteSettingModel,
  type SiteMode,
  type ISiteSetting,
} from "@/lib/models/SiteSetting";
import { verifySession } from "@/lib/dal";

export type { SiteMode };

export type SiteStatusData = {
  mode: SiteMode;
  headline: string;
  message: string;
  expectedLaunchDate: string;
  updatedBy?: string;
  updatedAt?: string;
};

const DEFAULT_STATUS: SiteStatusData = {
  mode: "live",
  headline: "Authentic Sri Lankan Culinary Stories & Recipes",
  message: "Our spice-infused kitchen is open to the world.",
  expectedLaunchDate: "",
  updatedBy: "System",
};

// Lightweight memory cache to minimize DB round-trips during high traffic
let cachedStatus: { data: SiteStatusData; expiresAt: number } | null = null;
const CACHE_TTL_MS = 5000; // 5 seconds

/**
 * Fetch current site status from MongoDB, falling back to default "live".
 */
export async function getSiteStatus(): Promise<SiteStatusData> {
  const now = Date.now();
  if (cachedStatus && cachedStatus.expiresAt > now) {
    return cachedStatus.data;
  }

  try {
    await connectToDatabase();

    const doc = (await SiteSettingModel.findOne({
      key: "site_status",
    }).lean()) as ISiteSetting | null;

    if (doc) {
      const data: SiteStatusData = {
        mode: (doc.mode as SiteMode) || "live",
        headline: doc.headline || "",
        message: doc.message || "",
        expectedLaunchDate: doc.expectedLaunchDate || "",
        updatedBy: doc.updatedBy || "Administrator",
        updatedAt: doc.updatedAt
          ? new Date(doc.updatedAt).toISOString()
          : undefined,
      };

      cachedStatus = {
        data,
        expiresAt: now + CACHE_TTL_MS,
      };
      return data;
    }
  } catch (err) {
    console.error("Failed to read site status from DB:", err);
  }

  return DEFAULT_STATUS;
}

export type UpdateSiteStatusInput = {
  mode: SiteMode;
  headline?: string;
  message?: string;
  expectedLaunchDate?: string;
};

export type SiteStatusActionResult = {
  success: boolean;
  mode?: SiteMode;
  error?: string;
};

/**
 * Update site status.
 * Strictly requires authenticated session with "admin" role.
 */
export async function updateSiteStatus(
  input: UpdateSiteStatusInput
): Promise<SiteStatusActionResult> {
  try {
    // 1. Strict authorization: Only "admin" can set site status
    const session = await verifySession();
    if (!session.isAuth || session.role !== "admin") {
      return {
        success: false,
        error:
          "Unauthorized: Only administrators have permission to change the site status or maintenance modes.",
      };
    }

    // 2. Validate mode
    const validModes: SiteMode[] = ["live", "coming_soon", "under_construction"];
    if (!validModes.includes(input.mode)) {
      return {
        success: false,
        error: `Invalid site mode "${input.mode}". Must be one of: live, coming_soon, under_construction.`,
      };
    }

    // 3. Connect and upsert
    await connectToDatabase();

    const headline = input.headline?.trim() || "";
    const message = input.message?.trim() || "";
    const expectedLaunchDate = input.expectedLaunchDate?.trim() || "";
    const updatedBy = session.name || session.email || "Administrator";

    const updatedDoc = await SiteSettingModel.findOneAndUpdate(
      { key: "site_status" },
      {
        $set: {
          mode: input.mode,
          headline,
          message,
          expectedLaunchDate,
          updatedBy,
        },
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );

    // 4. Update in-memory cache immediately
    const updatedData: SiteStatusData = {
      mode: input.mode,
      headline,
      message,
      expectedLaunchDate,
      updatedBy,
      updatedAt: updatedDoc?.updatedAt
        ? new Date(updatedDoc.updatedAt).toISOString()
        : new Date().toISOString(),
    };

    cachedStatus = {
      data: updatedData,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };

    // 5. Revalidate affected Next.js routes
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/coming-soon");
    revalidatePath("/under-construction");
    revalidatePath("/admin/settings");
    revalidatePath("/admin");
    revalidatePath("/recipes");
    revalidatePath("/category");

    return {
      success: true,
      mode: input.mode,
    };
  } catch (err: unknown) {
    console.error("Failed to update site status:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while updating site status.",
    };
  }
}
