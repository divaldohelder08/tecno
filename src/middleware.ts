import { NextRequest, NextResponse } from 'next/server'
import { getURL } from './utils/get-url'
const SINGLE_PATHS = ['/', '/company']

export function middleware(request: NextRequest) {
  const token =
    process.env.VERCEL_ENV === 'production'
      ? request.cookies.get('__Secure-authjs.session-token')
      : request.cookies.get('authjs.session-token')

  const { pathname } = request.nextUrl
  if (pathname === '/auth/sign-in' && token) {
    return NextResponse.redirect(new URL(getURL('/')))
  }
  if (
    pathname === '/auth/forgot-password/reset' &&
    !request.cookies.has('reset')
  ) {
    return NextResponse.redirect(new URL(getURL('/auth/sign-in')))
  }
  if (pathname === '/auth/forgot-password' && request.cookies.has('reset')) {
    return NextResponse.redirect(new URL(getURL('/auth/forgot-password/reset')))
  }
  if (pathname.startsWith('/human-recours') && !token) {
    return NextResponse.redirect(new URL(getURL('/auth/sign-in')))
  }
  if (pathname.startsWith('/comercial') && !token) {
    return NextResponse.redirect(new URL(getURL('/auth/sign-in')))
  }
  if (pathname === '/' && !token) {
    return NextResponse.redirect(new URL(getURL('/auth/sign-in')))
  }
  if (pathname === '/company' && !token) {
    return NextResponse.redirect(new URL(getURL('/auth/sign-in')))
  }

  const comercioGeral = request.cookies.get('comercioGeral')?.value
  if (pathname === '/comercial/general-trade' && comercioGeral === 'false') {
    return NextResponse.redirect(new URL(getURL('/')))
  }
  const hotelaria = request.cookies.get('hotelaria')?.value
  if (pathname === '/comercial/restaurant' && hotelaria === 'false') {
    return NextResponse.redirect(new URL(getURL('/')))
  }
  const restaurante = request.cookies.get('restaurante')?.value
  if (pathname === '/comercial/hospitality' && restaurante === 'false') {
    return NextResponse.redirect(new URL(getURL('/')))
  }
  const oficina = request.cookies.get('oficina')?.value
  if (pathname === '/comercial/workshop' && oficina === 'false') {
    return NextResponse.redirect(new URL(getURL('/')))
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
