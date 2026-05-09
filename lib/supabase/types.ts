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
      audits: {
        Row: {
          id: string;
          public_slug: string;
          tools_json: Json;
          total_monthly_spend: number;
          total_monthly_savings: number;
          total_annual_savings: number;
          optimization_score: number;
          ai_summary: string | null;
          is_public: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          public_slug: string;
          tools_json: Json;
          total_monthly_spend: number;
          total_monthly_savings: number;
          total_annual_savings: number;
          optimization_score: number;
          ai_summary?: string | null;
          is_public?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["audits"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          audit_id: string;
          email: string;
          company_name: string | null;
          role: string | null;
          team_size: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          audit_id: string;
          email: string;
          company_name?: string | null;
          role?: string | null;
          team_size?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
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
