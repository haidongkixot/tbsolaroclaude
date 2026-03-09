import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

async function isAdmin() {
  const store = await cookies();
  return !!store.get('tb_admin_auth');
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const page = await prisma.wikiPage.findUnique({ where: { id } });
  if (!page) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  return NextResponse.json(page);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const { title, slug, content, sortOrder } = await req.json();
  const existing = await prisma.wikiPage.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  // Check slug uniqueness if changing
  if (slug && slug !== existing.slug) {
    const conflict = await prisma.wikiPage.findUnique({ where: { slug } });
    if (conflict) return NextResponse.json({ error: 'Slug already in use.' }, { status: 409 });
  }
  const page = await prisma.wikiPage.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(slug && { slug }),
      ...(content !== undefined && { content }),
      ...(sortOrder !== undefined && { sortOrder }),
    },
  });
  return NextResponse.json(page);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const existing = await prisma.wikiPage.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  if (existing.isSystem) return NextResponse.json({ error: 'System pages cannot be deleted.' }, { status: 403 });
  await prisma.wikiPage.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
