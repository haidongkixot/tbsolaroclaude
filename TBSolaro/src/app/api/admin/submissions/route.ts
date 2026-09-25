import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

// Chỉ có GET — submission được tạo từ form công khai, không tạo từ admin.
export async function GET(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') ?? '';
  const type = searchParams.get('type') ?? '';
  const search = searchParams.get('search') ?? '';

  const where = {
    ...(status && { status }),
    ...(type && { type }),
    ...(search && { OR: [{ name: { contains: search } }, { email: { contains: search } }] }),
  };
  const items = await prisma.submission.findMany({ where, orderBy: { createdAt: 'desc' } });

  return NextResponse.json({ items, total: items.length });
}
