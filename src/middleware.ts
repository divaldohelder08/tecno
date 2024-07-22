import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getURL } from "./utils/get-url";
const PRIVATE_PATHS = ['/orders', '/products', '/settings']

export function middleware(request: NextRequest) {
  const token =
    process.env.VERCEL_ENV === "production" ?
      request.cookies.get("__Secure-authjs.session-token")
      : request.cookies.get("authjs.session-token");


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
if (pathname === '/access-control/users/1' && !token) {
    return NextResponse.redirect(new URL(getURL('/auth/sign-in')))
  }
  
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