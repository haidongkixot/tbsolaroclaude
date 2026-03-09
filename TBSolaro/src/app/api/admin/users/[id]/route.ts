import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

async function isAdmin() {
  const store = await cookies();
  return !!store.get('tb_admin_auth');
}

// PUT /api/admin/users/[id] — update name/email/role/status
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const { name, email, role, status } = await req.json();
  const existing = await prisma.adminUser.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Không tìm thấy người dùng.' }, { status: 404 });
  // Prevent changing superadmin's role
  if (existing.role === 'superadmin' && role && role !== 'superadmin') {
    return NextResponse.json({ error: 'Không thể thay đổi vai trò của superadmin.' }, { status: 403 });
  }
  const user = await prisma.adminUser.update({
    where: { id },
    data: { ...(name && { name }), ...(email && { email }), ...(role && { role }), ...(status && { status }) },
    select: { id: true, name: true, email: true, role: true, status: true, lastLogin: true, createdAt: true },
  });
  return NextResponse.json(user);
}

// DELETE /api/admin/users/[id]
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const existing = await prisma.adminUser.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Không tìm thấy người dùng.' }, { status: 404 });
  if (existing.role === 'superadmin') return NextResponse.json({ error: 'Không thể xóa tài khoản superadmin.' }, { status: 403 });
  await prisma.adminUser.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
