import { NextResponse } from 'next/server';

export function proxy(request: { cookies: { get: (arg0: string) => any; }; nextUrl: { pathname: string; }; url: string | URL | undefined; }) {
  try {
    // Example logic: Redirect unauthenticated users
    const token = request.cookies.get('auth-token');
    if (!token && request.nextUrl.pathname.startsWith('/protected')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export const config = {
  matcher: '/protected/:path*', // Adjust to match your routes
};