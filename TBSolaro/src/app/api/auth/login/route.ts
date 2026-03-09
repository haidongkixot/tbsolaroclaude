import { NextResponse } from 'next/server';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tbsolaro.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@2025';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user =
    email === ADMIN_EMAIL && password === ADMIN_PASSWORD
      ? { name: 'Admin TBSolaro', role: 'superadmin' }
      : null;

  if (!user) {
    return NextResponse.json(
      { error: 'Email hoặc mật khẩu không đúng.' },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true, name: user.name, role: user.role });
  response.cookies.set('tb_admin_auth', 'tbsolaro_authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return response;
}
