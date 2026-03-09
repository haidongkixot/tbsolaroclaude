import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

async function isAdmin() {
  const store = await cookies();
  return !!store.get('tb_admin_auth');
}

// PUT /api/admin/users/[id]/password — change password
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const { password } = await req.json();
  if (!password || password.length < 8) {
    return NextResponse.json({ error: 'Mật khẩu phải có ít nhất 8 ký tự.' }, { status: 400 });
  }
  const existing = await prisma.adminUser.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Không tìm thấy người dùng.' }, { status: 404 });
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.update({ where: { id }, data: { passwordHash } });
  return NextResponse.json({ success: true });
}
