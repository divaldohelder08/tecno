import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { SheetHeader } from "@/components/ui/sheet";
import { getNameInitials } from "@/utils/get-name-initials";

interface Props {
  name: string;
  email: string;
  avatar: string | null;
  isSuperAdmin: boolean;
}

export function UserContent({ name, email, avatar, isSuperAdmin }: Props) {
  return (
    <div className="transition-opacity bg-muted/40 space-y-12 shadow">
      <SheetHeader className="space-y-8 m-4 text-center items-center">
        <Button className="gap-2 items-center bg-card" size="lg" variant="outline">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full my-auto" />
          último acesso: 22/02/2023 às 19:30
        </Button>
        <Avatar className="w-24 h-24 border border-4 border-emerald-500 rounded-[50px]">
          <AvatarImage
            alt="User avatar"
            className="aspect-square rounded-md object-cover p-.5"
            src={avatar ?? undefined} // Use undefined if avatar is null
          />
          <AvatarFallback className="text-xl">{getNameInitials(name)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center">
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>{email}</CardDescription>
        </div>
      </SheetHeader>
      <div className="space-y-1 text-center items-center"></div>
    </div>
  );
}
