/**
 * Supabase Database type definitions.
 *
 * This file is a stub. In Step 2, generate the real types by running:
 *   npx supabase gen types typescript --project-id <your-project-id> > lib/supabase/types.ts
 *
 * Or link your project and use:
 *   npx supabase gen types typescript --linked
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      /**
       * Audits table — stores completed audit sessions.
       * Full schema will be defined in Step 2.
       */
      audits: {
        Row: {
          id: string;
          created_at: string;
          slug: string;
          tools: Json;
          monthly_spend: number;
          potential_savings: number;
          team_size: number;
          summary: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          slug: string;
          tools: Json;
          monthly_spend: number;
          potential_savings: number;
          team_size: number;
          summary?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["audits"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
