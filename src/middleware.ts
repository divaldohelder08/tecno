import { NextRequest } from 'next/server'

const PRIVATE_PATHS = ['/orders', '/products', '/settings']

export function middleware(request: NextRequest) {
/*  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl
  if (pathname === '/auth/sign-in' && token) {
    return NextResponse.redirect(new URL(getURL('/')))
  }
  if (pathname === '/auth/forgot-password/reset' && !request.cookies.has('reset')) {
    return NextResponse.redirect(new URL(getURL('/auth/sign-in')))
  }
   if (pathname === '/auth/forgot-password' && request.cookies.has('reset')) {
    return NextResponse.redirect(new URL(getURL('/auth/forgot-password/reset')))
  }
if (pathname === '/' && !token) {
    return NextResponse.redirect(new URL(getURL('/auth/sign-in')))
  }
  */
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}