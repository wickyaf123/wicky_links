import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const MIGRATION_SQL = `
-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create links table
CREATE TABLE IF NOT EXISTS public.links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT 'bg-purple-600',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index on category_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_links_category_id ON public.links(category_id);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public insert on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public update on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public delete on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public read access on links" ON public.links;
DROP POLICY IF EXISTS "Allow public insert on links" ON public.links;
DROP POLICY IF EXISTS "Allow public update on links" ON public.links;
DROP POLICY IF EXISTS "Allow public delete on links" ON public.links;

-- Create policies for categories
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on categories" ON public.categories FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on categories" ON public.categories FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on categories" ON public.categories FOR DELETE TO anon, authenticated USING (true);

-- Create policies for links
CREATE POLICY "Allow public read access on links" ON public.links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on links" ON public.links FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on links" ON public.links FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on links" ON public.links FOR DELETE TO anon, authenticated USING (true);
`;

const SEED_SQL = `
-- Seed categories
INSERT INTO public.categories (id, title, icon, sort_order) VALUES
  ('main-links', 'Main Links', '⭐', 0),
  ('chatbots', 'Chatbots', '🤖', 1),
  ('live', 'Live', '📺', 2),
  ('ai-insights', 'AI Insights', '🧠', 3),
  ('multi-builder', 'Multi Builder', '🔧', 4),
  ('byob', 'BYOB (Build Your Own Bet)', '🎯', 5),
  ('content-generator', 'Content Generator', '✍️', 6),
  ('teams', 'Teams', '👥', 7),
  ('miscellaneous', 'Miscellaneous', '📦', 8)
ON CONFLICT (id) DO NOTHING;

-- Seed links
INSERT INTO public.links (category_id, name, url, description, color, sort_order) VALUES
  ('main-links', 'Wicky Main', 'https://wicky-alpha.vercel.app/', 'The main Wicky platform for sports betting and more', 'bg-purple-600', 0),
  ('main-links', 'Chat Final', 'https://chatfinalfrontend.vercel.app/', 'Advanced chat interface with enhanced features and functionality', 'bg-slate-600', 1),
  ('main-links', 'AI Insights Pro', 'https://ai-insights-pro-frontend.vercel.app/', 'Professional-grade AI insights platform with enhanced analytics capabilities', 'bg-purple-600', 2),
  ('main-links', 'Content Generator', 'https://content-generator-mvp.vercel.app/', 'Advanced content generation platform for sports analytics and insights', 'bg-teal-600', 3),
  ('chatbots', 'Cricket Chatbots', 'https://chatbots-cric-hor-frontend.vercel.app/', 'Interactive cricket chatbots for enhanced user engagement and insights', 'bg-cyan-600', 0),
  ('chatbots', 'Chat Final', 'https://chatfinalfrontend.vercel.app/', 'Advanced chat interface with enhanced features and functionality', 'bg-slate-600', 1),
  ('live', 'NBA', 'https://nba-frontend-woad.vercel.app/', 'NBA betting platform and statistics', 'bg-red-600', 0),
  ('live', 'Premier League', 'https://epl-frontend-oqbw.vercel.app/', 'Premier League betting assistant with real-time insights', 'bg-green-600', 1),
  ('ai-insights', 'AI Insights', 'https://ai-insights-mu.vercel.app/', 'Advanced AI-powered insights and analytics for sports data', 'bg-teal-600', 0),
  ('ai-insights', 'AI Insights Pro', 'https://ai-insights-pro-frontend.vercel.app/', 'Professional-grade AI insights platform with enhanced analytics capabilities', 'bg-purple-600', 1),
  ('ai-insights', 'Cricket AI Agents Project', 'https://iplaapaiagents-mjt4txdrqjc8aha3wabvkh.streamlit.app/', 'IPL-focused AI agents for advanced cricket analytics and insights', 'bg-indigo-600', 2),
  ('byob', 'Multi Builder', 'https://multi-frontend-mu.vercel.app/', 'Build your multi-bets for NRL, AFL, and combined sports', 'bg-blue-600', 0),
  ('content-generator', 'Content Generator', 'https://content-generator-mvp.vercel.app/', 'Advanced content generation platform for sports analytics and insights', 'bg-purple-600', 0),
  ('teams', 'IPL Opposition Planning', 'https://ipl-opposition-planning-frontend.vercel.app/', 'IPL opposition planning and strategic analysis tool', 'bg-orange-600', 0),
  ('teams', 'IPL Opposition Points', 'https://iploppositionpointsgit-mrmnvdru3prb5azsqkhndd.streamlit.app/', 'IPL opposition points analysis tool', 'bg-orange-600', 1),
  ('teams', 'IPL Platform', 'https://ipl-040725-frontend.vercel.app/', 'IPL cricket platform with enhanced features and insights', 'bg-indigo-600', 2),
  ('miscellaneous', 'Wicky Main', 'https://wicky-alpha.vercel.app/', 'The main Wicky platform for sports betting and more', 'bg-purple-600', 0),
  ('miscellaneous', 'Cricket Insights Pro', 'https://insights-frontend-1.vercel.app/', 'AI-Powered Match Analytics & Strategy with 6 AI Agents for cricket', 'bg-teal-600', 1),
  ('miscellaneous', 'Fantasy Team Builder', 'https://ipl-fantsay1004-git-main-mayurs-projects-b6048be7.vercel.app/', 'AI-Powered Fantasy Team Builder for cricket matches', 'bg-yellow-600', 2),
  ('miscellaneous', 'BBL AI Batting', 'https://bbl-ai-batting-frontend.vercel.app/', 'BBL batting analytics with AI-powered insights and statistics', 'bg-pink-600', 3),
  ('miscellaneous', 'New Wicky Website', 'https://wicky-sphere-icons.vercel.app/', 'Interactive sphere-based icon system and design resources', 'bg-cyan-600', 4);
`;

export async function POST(request: Request) {
  try {
    const { serviceRoleKey } = await request.json();

    if (!serviceRoleKey) {
      return NextResponse.json(
        { error: 'Service role key is required. Get it from Supabase Dashboard > Settings > API.' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      db: { schema: 'public' }
    });

    // Execute migration SQL using rpc
    const { error: migrationError } = await adminClient.rpc('exec_sql', {
      sql: MIGRATION_SQL
    });

    if (migrationError) {
      // If exec_sql doesn't exist, provide instructions
      return NextResponse.json({
        error: 'Could not execute migration automatically.',
        message: 'Please run the SQL migration manually in Supabase SQL Editor.',
        sqlEditorUrl: `https://supabase.com/dashboard/project/cxnhpvcpibxftlskujwx/sql`,
        migrationSQL: MIGRATION_SQL,
        seedSQL: SEED_SQL,
      }, { status: 500 });
    }

    // Execute seed SQL
    const { error: seedError } = await adminClient.rpc('exec_sql', {
      sql: SEED_SQL
    });

    if (seedError) {
      return NextResponse.json({
        message: 'Tables created but seeding failed. Please run seed SQL manually.',
        seedSQL: SEED_SQL,
      }, { status: 207 });
    }

    return NextResponse.json({ message: 'Database setup complete! Tables created and seeded.' });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Database Setup API',
    instructions: [
      '1. Go to Supabase SQL Editor: https://supabase.com/dashboard/project/cxnhpvcpibxftlskujwx/sql',
      '2. Copy and run the migration SQL below to create tables',
      '3. Then copy and run the seed SQL to populate initial data',
    ],
    migrationSQL: MIGRATION_SQL,
    seedSQL: SEED_SQL,
  });
}
