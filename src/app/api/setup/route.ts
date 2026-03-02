import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
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
