import { NextRequest, NextResponse } from 'next/server';
import { getPublishedProjects, getProjectBySlug, getProjectsByCategory } from '@/lib/db/projects';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') ?? 'vi';
  const category = searchParams.get('category');

  if (slug) {
    const project = await getProjectBySlug(slug, locale);
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(project);
  }

  const projects = category
    ? await getProjectsByCategory(category, locale)
    : await getPublishedProjects(locale);
  return NextResponse.json({ projects, total: projects.length });
}
