import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateApiKey, canWrite, canDelete, unauthorized, forbidden } from '@/lib/api-auth';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await validateApiKey(req);
  if (!auth.valid) return unauthorized();
  const { slug } = await params;
  const item = await prisma.blogPost.findUnique({ where: { slug } });
  if (!item) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await validateApiKey(req);
  if (!auth.valid) return unauthorized();
  if (!canWrite(auth.permissions)) return forbidden();
  const { slug } = await params;
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  const body = await req.json();
  const item = await prisma.blogPost.update({ where: { slug }, data: body });
  return NextResponse.json(item);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await validateApiKey(req);
  if (!auth.valid) return unauthorized();
  if (!canDelete(auth.permissions)) return forbidden();
  const { slug } = await params;
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  await prisma.blogPost.delete({ where: { slug } });
  return NextResponse.json({ success: true });
}
