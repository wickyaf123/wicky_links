import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DbCategory {
  id: string;
  title: string;
  icon: string;
  sort_order: number;
}

export interface DbLink {
  id?: string;
  category_id: string;
  name: string;
  url: string;
  description: string;
  color: string;
  sort_order: number;
}
