import { NextRequest, NextResponse } from 'next/server';
import { getPublishedPosts, getPostBySlug } from '@/lib/db/blog';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') ?? 'vi';

  if (slug) {
    const post = await getPostBySlug(slug, locale);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(post);
  }

  const posts = await getPublishedPosts(locale);
  return NextResponse.json({ posts, total: posts.length });
}
