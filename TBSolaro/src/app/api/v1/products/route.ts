import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateApiKey, canWrite, unauthorized, forbidden } from '@/lib/api-auth';

export async function GET(req: Request) {
  const auth = await validateApiKey(req);
  if (!auth.valid) return unauthorized();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const category = searchParams.get('category') || undefined;
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
  const offset = parseInt(searchParams.get('offset') || '0');

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where: { ...(status && { status }), ...(category && { category }) },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: limit,
      skip: offset,
    }),
    prisma.product.count({ where: { ...(status && { status }), ...(category && { category }) } }),
  ]);

  return NextResponse.json({ data: items, total, limit, offset });
}

export async function POST(req: Request) {
  const auth = await validateApiKey(req);
  if (!auth.valid) return unauthorized();
  if (!canWrite(auth.permissions)) return forbidden();

  const body = await req.json();
  if (!body.slug || !body.titleVi) return NextResponse.json({ error: 'slug and titleVi are required.' }, { status: 400 });

  const existing = await prisma.product.findUnique({ where: { slug: body.slug } });
  if (existing) return NextResponse.json({ error: 'Slug already exists.' }, { status: 409 });

  const item = await prisma.product.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}
