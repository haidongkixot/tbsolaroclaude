import { NextResponse } from 'next/server';

// Hardcoded admin credentials — swap for DB lookup when ready
const USERS = [
  { email: 'admin@tbsolaro.com', password: 'Admin@2025', name: 'Admin TBSolaro', role: 'superadmin' },
];

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = USERS.find((u) => u.email === email && u.password === password);

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
