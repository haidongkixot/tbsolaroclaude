import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createHash, randomBytes } from 'crypto';
import { prisma } from '@/lib/prisma';

async function isAdmin() {
  const store = await cookies();
  return !!store.get('tb_admin_auth');
}

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const keys = await prisma.apiKey.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, keyPrefix: true, permissions: true, status: true, lastUsed: true, createdAt: true },
  });
  return NextResponse.json(keys);
}

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, permissions } = await req.json();
  if (!name) return NextResponse.json({ error: 'name is required.' }, { status: 400 });

  // Generate key: tbsk_ + 40 random hex chars
  const rawKey = 'tbsk_' + randomBytes(20).toString('hex');
  const keyHash = createHash('sha256').update(rawKey).digest('hex');
  const keyPrefix = rawKey.slice(0, 12) + '...';

  const key = await prisma.apiKey.create({
    data: {
      name,
      keyHash,
      keyPrefix,
      permissions: permissions || 'read',
    },
    select: { id: true, name: true, keyPrefix: true, permissions: true, status: true, createdAt: true },
  });

  // Return full key ONCE — it will never be shown again
  return NextResponse.json({ ...key, fullKey: rawKey }, { status: 201 });
}
