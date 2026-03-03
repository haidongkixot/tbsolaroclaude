import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip the login page itself
  if (pathname === '/admin/login') {
    // If already authenticated, redirect to dashboard
    const auth = request.cookies.get('tb_admin_auth');
    if (auth?.value === 'tbsolaro_authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (pathname.startsWith('/admin')) {
    const auth = request.cookies.get('tb_admin_auth');
    if (!auth || auth.value !== 'tbsolaro_authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
