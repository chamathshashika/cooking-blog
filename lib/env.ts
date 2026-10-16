import Joi from "joi";

/**
 * Joi schema for strict validation of all application environment variables.
 * No default values are permitted in the application code.
 * All values must be explicitly supplied via .env.
 */
const envSchema = Joi.object({
  MONGODB_URL: Joi.string()
    .uri({ scheme: ["mongodb", "mongodb+srv"] })
    .required()
    .messages({
      "any.required": "MONGODB_URL is required in .env",
      "string.empty": "MONGODB_URL cannot be empty in .env",
      "string.uriCustomScheme":
        "MONGODB_URL must be a valid mongodb or mongodb+srv connection URI",
    }),
  NEXT_PUBLIC_SITE_URL: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .required()
    .messages({
      "any.required": "NEXT_PUBLIC_SITE_URL is required in .env",
      "string.empty": "NEXT_PUBLIC_SITE_URL cannot be empty in .env",
      "string.uri": "NEXT_PUBLIC_SITE_URL must be a valid http or https URL",
    }),
  SESSION_SECRET: Joi.string()
    .min(32)
    .required()
    .messages({
      "any.required": "SESSION_SECRET is required in .env",
      "string.empty": "SESSION_SECRET cannot be empty in .env",
      "string.min": "SESSION_SECRET must be at least 32 characters long",
    }),
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .optional(),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  const errorMessages = error.details.map((detail) => ` • ${detail.message}`).join("\n");
  throw new Error(
    `[Config Error] Environment variable validation failed via Joi:\n${errorMessages}\nPlease ensure these variables are defined in your .env file (locally) or in your deployment platform's Environment Variables settings (in production).`
  );
}

export const env = {
  MONGODB_URL: envVars.MONGODB_URL as string,
  NEXT_PUBLIC_SITE_URL: envVars.NEXT_PUBLIC_SITE_URL as string,
  SESSION_SECRET: envVars.SESSION_SECRET as string,
  NODE_ENV: (envVars.NODE_ENV as string) || "development",
};
