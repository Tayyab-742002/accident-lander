import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Vercel provides x-vercel-ip-country-region as e.g. "TX"
  const region = request.headers.get('x-vercel-ip-country-region');
  const country = request.headers.get('x-vercel-ip-country');

  if (country === 'US' && region) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-state', region);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
