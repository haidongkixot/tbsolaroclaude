import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

async function isAdmin() {
  const store = await cookies();
  return !!store.get('tb_admin_auth');
}

// GET /api/admin/users — list all users
export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, name: true, email: true, role: true, status: true, lastLogin: true, createdAt: true },
  });
  return NextResponse.json(users);
}

// POST /api/admin/users — create user
export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, email, password, role, status } = await req.json();
  if (!name || !email || !password) return NextResponse.json({ error: 'Thiếu thông tin bắt buộc.' }, { status: 400 });
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: 'Email đã tồn tại.' }, { status: 409 });
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.adminUser.create({
    data: { name, email, passwordHash, role: role || 'editor', status: status || 'active' },
    select: { id: true, name: true, email: true, role: true, status: true, lastLogin: true, createdAt: true },
  });
  return NextResponse.json(user, { status: 201 });
}
