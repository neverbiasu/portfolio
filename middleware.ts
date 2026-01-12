import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // If accessing /blog root, redirect to /blog/en
  if (request.nextUrl.pathname === '/blog') {
    return NextResponse.redirect(new URL('/blog/en', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/blog'],
};
