import { LogOut } from 'lucide-react'

import { Avatar } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { auth, signOut } from '@/services/auth'
import Image from 'next/image'


export async function ProfileButton() {
  const session = await auth()

  async function handleSignOut() {
    'use server'

    await signOut()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar>
          {session?.user && session?.user.image ? (
            <Image
              className="aspect-square size-full"
              src={session.user.image}
              width={32}
              height={32}
              alt=""
            />
          ) : (
            <div className="aspect-square size-full bg-accent" />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSeparator />
        <form action={handleSignOut}>
          <DropdownMenuItem className="flex items-center gap-2" asChild>
            <button type="submit" className="w-full">
              <LogOut className="size-4" />
              Sign out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
