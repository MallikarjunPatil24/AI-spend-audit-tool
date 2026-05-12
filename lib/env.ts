import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
  ANTHROPIC_API_KEY: z.string().min(1, "ANTHROPIC_API_KEY is required").optional(),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required").optional(),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required").optional(),
  RESEND_FROM_EMAIL: z.string().min(1, "RESEND_FROM_EMAIL is required").optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required").optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export const serverEnvSchema = z.object({
  ANTHROPIC_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
});

/**
 * Public env vars (safe to expose to client)
 * Validated at module load time to catch misconfigs early
 */
export const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  NODE_ENV: (process.env.NODE_ENV ?? "development") as "development" | "production" | "test",
};

/**
 * Server-only env vars — only call from server components / API routes
 */
export const serverEnv = {
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

/**
 * Validates that all required public env vars are present.
 * Call this in server-side code during startup.
 */
export function validatePublicEnv(): void {
  const result = z
    .object({
      NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
      NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    })
    .safeParse(env);

  if (!result.success) {
    console.warn(
      "[SpendScope] Missing or invalid environment variables:",
      result.error.flatten().fieldErrors
    );
  }
}
