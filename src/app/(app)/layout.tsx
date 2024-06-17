"use server"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth, isAuthenticated } from '@/auth/auth'


export default async function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }
  const ola = await auth()

  return (
    <>
      {children}
    </>
  )
}

