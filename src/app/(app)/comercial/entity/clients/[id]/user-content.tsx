"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader } from "@/components/ui/sheet";
import { getNameInitials } from "@/utils/get-name-initials";
import { DiscordLogoIcon, FaceIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export function UserContent() {
  const { avatar, name, email } = {
    avatar:'/image.png',
    email:'divaldohelder08@gmail.com',
    name:'Divaldo Hélder'
  }
  return (
    <div className="right-4 ring-offset-white transition-opacity dark:ring-offset-slate-950 dark:focus:ring-slate-300 bg-card space-y-12 h-screen shadow">
        <SheetHeader className="space-y-8 m-4 text-center items-center">
          <Button className="gap-2 items-center bg-card" size='lg' variant="outline" >
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full my-auto" />
            ultimo acesso: 22/02/2023 às 19:30
          </Button>
          <Avatar className="w-24 h-24 border border-4 border-emerald-500 rounded-[50px]">
            <AvatarImage alt="User avatar"
              className="aspect-square rounded-md object-cover p-.5"
              src={avatar}
            />
            <AvatarFallback className="text-xl">{getNameInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center">
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription>{email}</CardDescription>
          </div>
          <div className="flex gap-4 lg:gap-6 items-center w-full justify-center">
            <GitHubLogoIcon className="h-8 w-8" />
            <DiscordLogoIcon className="h-8 w-8" />
            <LinkedInLogoIcon className="h-8 w-8" />
            <FaceIcon className="h-8 w-8" />
          </div>
        </SheetHeader>
<div className="space-y-1 text-center items-center">
            <CardTitle className="text-xl">sdfsdfsdf</CardTitle>
            <CardDescription>fsdfsdfsd</CardDescription>
          </div>
    </div>
  )
}