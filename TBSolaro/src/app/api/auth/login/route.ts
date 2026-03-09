import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const FALLBACK_EMAIL = process.env.ADMIN_EMAIL || 'admin@tbsolaro.com';
const FALLBACK_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@2025';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  let userName = 'Admin TBSolaro';
  let userRole = 'superadmin';
  let authenticated = false;

  // Check DB users first
  try {
    const dbUser = await prisma.adminUser.findUnique({ where: { email } });
    if (dbUser) {
      if (dbUser.status !== 'active') {
        return NextResponse.json({ error: 'Tài khoản đã bị vô hiệu hóa.' }, { status: 401 });
      }
      const ok = await bcrypt.compare(password, dbUser.passwordHash);
      if (ok) {
        authenticated = true;
        userName = dbUser.name;
        userRole = dbUser.role;
        // Update lastLogin (non-blocking)
        prisma.adminUser.update({ where: { id: dbUser.id }, data: { lastLogin: new Date() } }).catch(() => {});
      }
    }
  } catch {
    // DB not available, fall through to env var check
  }

  // Fallback to env var credentials (for initial setup before any DB user exists)
  if (!authenticated && email === FALLBACK_EMAIL && password === FALLBACK_PASSWORD) {
    authenticated = true;
  }

  if (!authenticated) {
    return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng.' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, name: userName, role: userRole });
  response.cookies.set('tb_admin_auth', 'tbsolaro_authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
  return response;
}
