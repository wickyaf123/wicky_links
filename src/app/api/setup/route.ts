import { NextResponse } from 'next/server';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json(
      {
        status: 'error',
        message:
          'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
      },
      { status: 500 }
    );
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      {
        status: 'error',
        message:
          'Supabase client could not be initialized. Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
      },
      { status: 500 }
    );
  }

  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, title')
    .order('sort_order');

  if (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Database tables may not be set up yet.',
      sqlEditorUrl: 'https://supabase.com/dashboard/project/ljsiggrlbklujknqglwm/sql/new',
    }, { status: 500 });
  }

  const { count } = await supabase
    .from('links')
    .select('*', { count: 'exact', head: true });

  return NextResponse.json({
    status: 'ok',
    categories: categories?.length ?? 0,
    links: count ?? 0,
    message: 'Database is set up and ready!',
  });
}
