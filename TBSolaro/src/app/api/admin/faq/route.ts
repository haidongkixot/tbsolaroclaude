import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') ?? '';

  const where = search ? { questionVi: { contains: search } } : {};
  const items = await prisma.fAQ.findMany({ where, orderBy: { sortOrder: 'asc' } });

  return NextResponse.json({ items, total: items.length });
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { id: _id, createdAt: _c, updatedAt: _u, ...data } = body;

  const faq = await prisma.fAQ.create({ data });
  return NextResponse.json(faq, { status: 201 });
}