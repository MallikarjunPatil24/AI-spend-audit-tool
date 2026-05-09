import { Database } from "./lib/supabase/types";

type Tables = keyof Database["public"]["Tables"];
// Expected: "audits" | "leads"

type InsertType = Database["public"]["Tables"]["audits"]["Insert"];
