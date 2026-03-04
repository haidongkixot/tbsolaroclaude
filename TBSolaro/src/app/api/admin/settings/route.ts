import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  return !!cookieStore.get('tb_admin_auth');
}

export async function GET() {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const row = await prisma.siteSetting.findUnique({ where: { id: 'global' } });
  return NextResponse.json(row ?? { id: 'global' });
}

export async function PUT(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  // Remove id/updatedAt so prisma handles them
  const { id: _id, updatedAt: _u, ...data } = body;

  const row = await prisma.siteSetting.upsert({
    where: { id: 'global' },
    update: data,
    create: { id: 'global', ...data },
  });
  return NextResponse.json(row);
}
