import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

async function isAdmin() {
  const store = await cookies();
  return !!store.get('tb_admin_auth');
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const { status } = await req.json();
  const existing = await prisma.apiKey.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  const key = await prisma.apiKey.update({
    where: { id },
    data: { ...(status && { status }) },
    select: { id: true, name: true, keyPrefix: true, permissions: true, status: true, lastUsed: true, createdAt: true },
  });
  return NextResponse.json(key);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const existing = await prisma.apiKey.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  await prisma.apiKey.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
