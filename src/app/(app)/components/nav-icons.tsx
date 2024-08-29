"use client"
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

export  function NavIcons() {
  async function handleSignOut() {
    await signOut();
  }

  return (
  <div className="flex w-content w-fit-content gap-4 items-center">
    <Button variant="outline" size="icon" className="h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notificações</span>
    </Button>
    <Button onClick={() => handleSignOut()} variant="destructive"  size="icon"  className="h-8 w-8">
        <LogOut className="h-4 w-4" />
        <span className="sr-only">Sign out</span>
    </Button>
  </div>
  );
}
