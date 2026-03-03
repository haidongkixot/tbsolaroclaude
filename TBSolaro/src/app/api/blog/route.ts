import { NextRequest, NextResponse } from 'next/server';
import { getPublishedPosts, getBlogPostBySlug } from '@/lib/data/blog';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const post = getBlogPostBySlug(slug);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(post);
  }

  const posts = getPublishedPosts();
  return NextResponse.json({ posts, total: posts.length });
}
