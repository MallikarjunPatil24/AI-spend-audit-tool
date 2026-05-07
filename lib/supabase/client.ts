import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";
import { env } from "@/lib/env";

/**
 * Creates a typed Supabase client for use in Client Components.
 * Singleton pattern — safe to call multiple times.
 */
export function createClient() {
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
