'use client';

import { useState } from 'react';

const FULL_SQL = `-- ============================================
-- Wicky Links Database Setup
-- Run this SQL in the Supabase SQL Editor
-- ============================================

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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public insert on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public update on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public delete on categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public read access on links" ON public.links;
DROP POLICY IF EXISTS "Allow public insert on links" ON public.links;
DROP POLICY IF EXISTS "Allow public update on links" ON public.links;
DROP POLICY IF EXISTS "Allow public delete on links" ON public.links;

-- Create RLS policies for categories
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on categories" ON public.categories FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on categories" ON public.categories FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on categories" ON public.categories FOR DELETE TO anon, authenticated USING (true);

-- Create RLS policies for links
CREATE POLICY "Allow public read access on links" ON public.links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public insert on links" ON public.links FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update on links" ON public.links FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on links" ON public.links FOR DELETE TO anon, authenticated USING (true);

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

export default function SetupPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(FULL_SQL);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = FULL_SQL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(216,32%,15%)] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[hsl(168,100%,95%)]">
            Database Setup
          </h1>
          <p className="text-lg text-[hsl(168,30%,70%)]">
            Set up your Supabase database for Wicky Links
          </p>
        </header>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-[hsl(216,28%,18%)] rounded-xl border-2 border-[hsl(216,24%,25%)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-[hsl(168,100%,45%)] text-[hsl(216,32%,15%)] flex items-center justify-center font-bold text-sm">1</span>
              <h2 className="text-xl font-semibold text-[hsl(168,100%,95%)]">Open Supabase SQL Editor</h2>
            </div>
            <p className="text-[hsl(168,30%,70%)] mb-4">
              Click the button below to open the SQL Editor in your Supabase Dashboard:
            </p>
            <a
              href="https://supabase.com/dashboard/project/cxnhpvcpibxftlskujwx/sql/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[hsl(168,100%,45%)] text-[hsl(216,32%,15%)] rounded-lg font-semibold hover:bg-[hsl(168,100%,55%)] transition-all duration-300 shadow-[0_0_15px_hsl(168,100%,45%,0.4)]"
            >
              Open SQL Editor
            </a>
          </div>

          {/* Step 2 */}
          <div className="bg-[hsl(216,28%,18%)] rounded-xl border-2 border-[hsl(216,24%,25%)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-[hsl(168,100%,45%)] text-[hsl(216,32%,15%)] flex items-center justify-center font-bold text-sm">2</span>
              <h2 className="text-xl font-semibold text-[hsl(168,100%,95%)]">Copy and Run SQL</h2>
            </div>
            <p className="text-[hsl(168,30%,70%)] mb-4">
              Copy the SQL below, paste it into the SQL Editor, and click &quot;Run&quot;:
            </p>
            <button
              onClick={handleCopy}
              className={`mb-4 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-[hsl(168,100%,45%)] text-[hsl(216,32%,15%)] hover:bg-[hsl(168,100%,55%)]'
              } shadow-[0_0_15px_hsl(168,100%,45%,0.4)]`}
            >
              {copied ? 'Copied!' : 'Copy SQL to Clipboard'}
            </button>
            <div className="bg-[hsl(216,32%,15%)] rounded-lg p-4 max-h-96 overflow-y-auto border border-[hsl(216,24%,25%)]">
              <pre className="text-xs text-[hsl(168,30%,70%)] whitespace-pre-wrap font-mono">{FULL_SQL}</pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[hsl(216,28%,18%)] rounded-xl border-2 border-[hsl(216,24%,25%)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-[hsl(168,100%,45%)] text-[hsl(216,32%,15%)] flex items-center justify-center font-bold text-sm">3</span>
              <h2 className="text-xl font-semibold text-[hsl(168,100%,95%)]">Go to Wicky Links</h2>
            </div>
            <p className="text-[hsl(168,30%,70%)] mb-4">
              After running the SQL successfully, your database is ready! Go to the main page:
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-[hsl(168,100%,45%)] text-[hsl(216,32%,15%)] rounded-lg font-semibold hover:bg-[hsl(168,100%,55%)] transition-all duration-300 shadow-[0_0_15px_hsl(168,100%,45%,0.4)]"
            >
              Go to Wicky Links
            </a>
          </div>
        </div>

        <footer className="mt-16 text-center text-[hsl(168,30%,70%)] text-sm">
          <p>&copy; {new Date().getFullYear()} Wicky Links. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
