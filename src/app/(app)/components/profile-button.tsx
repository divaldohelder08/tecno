import { LogOut, Building } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { auth, signOut } from '@/services/auth';
import Image from 'next/image';
import { getNameInitials } from "@/utils/get-name-initials";
import {
  Bell,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserProfile } from './user-profile'
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
    <Dialog>
                <DialogTrigger asChild>
                 <Button className="grid gap-0.5 text-sm rounded-none flex gap-4 justify-start w-full m-2 !px-2 hover:bg-transparen" size="lg" variant="ghost">
            <Avatar>
                <AvatarImage
                    className="aspect-square size-full"
                    width={50}
                    height={50} 
                    alt=""
                    src={session.user.avatar ?? undefined}
                  />
                    <AvatarFallback className="aspect-square size-full">
                        {getNameInitials(session.user.name)}
                    </AvatarFallback>
            </Avatar>
        <div>
            <p>Welcome</p>
           <strong> {session.user.name}  </strong>
        </div>
           
        </Button>
            </DialogTrigger>

      <UserProfile session={session}/>
     </Dialog>
  );
}
