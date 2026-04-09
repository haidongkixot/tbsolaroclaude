import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') ?? '';

  const where = search ? { title: { contains: search } } : {};
  const items = await prisma.downloadDocument.findMany({ where, orderBy: { sortOrder: 'asc' } });

  return NextResponse.json({ items, total: items.length });
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { id: _id, createdAt: _c, updatedAt: _u, ...data } = body;

  const doc = await prisma.downloadDocument.create({ data });
  return NextResponse.json(doc, { status: 201 });
}