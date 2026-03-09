import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateApiKey, canWrite, unauthorized, forbidden } from '@/lib/api-auth';

export async function GET(req: Request) {
  const auth = await validateApiKey(req);
  if (!auth.valid) return unauthorized();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
  const offset = parseInt(searchParams.get('offset') || '0');

  const [items, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: { ...(status && { status }) },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: limit,
      skip: offset,
    }),
    prisma.blogPost.count({ where: { ...(status && { status }) } }),
  ]);

  return NextResponse.json({ data: items, total, limit, offset });
}

export async function POST(req: Request) {
  const auth = await validateApiKey(req);
  if (!auth.valid) return unauthorized();
  if (!canWrite(auth.permissions)) return forbidden();

  const body = await req.json();
  if (!body.slug || !body.titleVi) return NextResponse.json({ error: 'slug and titleVi are required.' }, { status: 400 });

  const existing = await prisma.blogPost.findUnique({ where: { slug: body.slug } });
  if (existing) return NextResponse.json({ error: 'Slug already exists.' }, { status: 409 });

  const item = await prisma.blogPost.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}
