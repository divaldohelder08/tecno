import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

console.log("zxc")
  redirectUrl.pathname = '/auth/sign-in'

      process.env.VERCEL_ENV === 'production'
        ?  request.cookies.delete('__Secure-authjs.session-token')
        :  request.cookies.delete('authjs.session-token')
  
console.log(request.cookies.has('authjs.session-token'),"zxc")

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/sign-inrtyutyu`)
}
