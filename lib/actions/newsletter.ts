"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Subscriber } from "@/lib/models/Subscriber";
import { sanitizeSqlInput, hasSqlInjection } from "@/lib/security";

export type SubscribeResponse = {
  success: boolean;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server Action to subscribe an email to the culinary newsletter.
 * Strictly adheres to AGENTS.md §17:
 * - Validates and normalizes email (lowercase, trimmed).
 * - Prevents duplicate subscriptions.
 * - Never exposes subscriber lists or database details to the client.
 * - Returns clean success and error messaging.
 */
export async function subscribeNewsletter(
  _prevState: SubscribeResponse | null,
  formData: FormData
): Promise<SubscribeResponse> {
  const rawName = formData.get("name");
  const rawEmailInput = formData.get("email");
  const name = typeof rawName === "string" ? sanitizeSqlInput(rawName) : "";
  const rawEmail = typeof rawEmailInput === "string" ? sanitizeSqlInput(rawEmailInput) : "";

  if (hasSqlInjection(name) || hasSqlInjection(rawEmail)) {
    return {
      success: false,
      message: "Invalid input detected.",
    };
  }

  // 1. Validation
  if (!name || name.length < 2) {
    return {
      success: false,
      message: "Please provide your name (at least 2 characters).",
    };
  }

  if (name.length > 100) {
    return {
      success: false,
      message: "Name is too long (maximum 100 characters).",
    };
  }

  if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
    return {
      success: false,
      message: "Please provide a valid email address.",
    };
  }

  const normalizedEmail = rawEmail.toLowerCase();

  try {
    await connectToDatabase();

    // 2. Prevent duplicate subscriptions
    const existing = await Subscriber.findOne({ email: normalizedEmail }).lean();

    if (existing) {
      // Re-activate if was deactivated, otherwise return friendly confirmation
      if (!existing.isActive) {
        await Subscriber.updateOne(
          { email: normalizedEmail },
          { $set: { isActive: true, name } }
        );
      }
      return {
        success: true,
        message: "You're already subscribed! Look out for our weekly recipes in your inbox.",
      };
    }

    // 3. Create new subscriber
    await Subscriber.create({
      name,
      email: normalizedEmail,
      isActive: true,
    });

    return {
      success: true,
      message: "Thank you for subscribing! Check your inbox soon for delicious Sri Lankan recipes.",
    };
  } catch (err: unknown) {
    console.error("Newsletter subscription error:", err);
    return {
      success: false,
      message: "An unexpected error occurred while subscribing. Please try again later.",
    };
  }
}
