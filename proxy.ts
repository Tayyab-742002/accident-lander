import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Vercel provides x-vercel-ip-country-subdivision as e.g. "US-TX"
  const subdivision = request.headers.get('x-vercel-ip-country-subdivision');
  const country = request.headers.get('x-vercel-ip-country');

  if (country === 'US' && subdivision) {
    const stateCode = subdivision.replace('US-', '');
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-state', stateCode);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
