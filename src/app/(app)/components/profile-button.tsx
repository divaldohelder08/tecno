import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth, signOut } from '@/services/auth';
import Image from 'next/image';
import { getNameInitials } from "@/utils/get-name-initials";

export async function ProfileButton() {
  const session = await auth();

  async function handleSignOut() {
    'use server';
    await signOut();
  }

  if (!session) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar>
          <AvatarImage
            className="aspect-square size-full"
            width={32} // Propriedade width adicionada
            height={32} // Propriedade height adicionada
            alt=""
            src={session.user.avatar ?? undefined}
          />
          <AvatarFallback
            className="aspect-square size-full"
          >
            {getNameInitials(session.user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
  );
}
