"use client"
import { LogOut, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { handleSignOut } from './action'
import { useServerAction } from "zsa-react"

export  function NavIcons() {
  const { isPending, executeFormAction, isSuccess, data, isError, error } =
    useServerAction(handleSignOut) 

  return (
  <div className="flex w-content w-fit-content gap-4 items-center">
    <Button variant="outline" size="icon" className="h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notificações</span>
    </Button>
 <form  action={executeFormAction}>
   <Button type="submit" variant="destructive"  size="icon"  className="h-8 w-8">
        {isPending 
            ? <Loader2 className="h-4 w-4 animate-spin" /> 
            : <LogOut className="h-4 w-4" /> }
        <span className="sr-only">Sign out</span>
    </Button>
    
 </form>
 
  
  </div>
  );
}
