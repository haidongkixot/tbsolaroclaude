import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const showroom = await prisma.showroom.findUnique({ where: { id } });
  if (!showroom) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(showroom);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const { id: _id, createdAt: _c, updatedAt: _u, ...data } = body;

  const showroom = await prisma.showroom.update({ where: { id }, data });
  return NextResponse.json(showroom);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  await prisma.showroom.delete({ where: { id } });
  return NextResponse.json({ success: true });
}