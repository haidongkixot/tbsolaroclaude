import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateApiKey, unauthorized } from '@/lib/api-auth';

export async function GET(req: Request) {
  const auth = await validateApiKey(req);
  if (!auth.valid) return unauthorized();

  const row = await prisma.siteSetting.findUnique({ where: { id: 'global' } });
  if (!row) return NextResponse.json({});

  // Return safe public fields only (exclude internal config)
  const { id, updatedAt, ...publicFields } = row;
  return NextResponse.json({ ...publicFields, updatedAt });
}
