import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';

const protectedRoutes = [
  '/cart',
  '/wishlist',
  '/checkout',
  '/profile',
  '/orders',
  '/profile/settings',
  '/profile/address',
];

const authRoutes = ['/login', '/register', '/forgot-password'];

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: 'fresh-cart.session-token',
  });

  const { pathname } = req.nextUrl;

  const loginUrl = new URL('/login', req.url);
  loginUrl.searchParams.set('callbackUrl', pathname);

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthPage = authRoutes.some(route => pathname.startsWith(route));

  if (isProtected && (!token || token.error === 'TokenExpired')) {
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && token && token.error !== 'TokenExpired') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/cart',
    '/wishlist',
    '/checkout',
    '/profile',
    '/orders',
    '/settings',
    '/address',
    '/payment',
    '/shipping',
    '/order/:id*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};
