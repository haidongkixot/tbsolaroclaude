import { NextRequest, NextResponse } from 'next/server';
import { getPublishedProjects, getProjectBySlug, getProjectsByCategory } from '@/lib/data/projects';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const category = searchParams.get('category') as Parameters<typeof getProjectsByCategory>[0] | null;

  if (slug) {
    const project = getProjectBySlug(slug);
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(project);
  }

  const projects = category ? getProjectsByCategory(category) : getPublishedProjects();
  return NextResponse.json({ projects, total: projects.length });
}
