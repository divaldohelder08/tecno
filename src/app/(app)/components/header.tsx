"use client"
import {
  Menu,
  Package2,
  Search
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

import { ProfileButton } from "./profile-button"

interface navLinksProps {
  href: string
  label: string,
  icon?: JSX.Element
}
const navLinks: navLinksProps[] = [{
  href: "/",
  label: "Dashboard"
},
{
  href: "//orders",
  label: "Orders"
},
{
  href: "//products",
  label: "Produtos"
},
{
  href: "//customers",
  label: "Customers"
},
{
  href: "//analytics",
  label: "Analytics"
}]
interface props {
  user: {
    id: string;
    name: string | null;
    email: string;
    avatar: string | null;
  }
}


export function Header({ user }: props) {
  const path = usePathname()
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {
          navLinks.map((e) => <Link
            href={e.href}
            key={e.href}
            className={cn("text-muted-foreground transition-colors hover:text-foreground", path.includes(e.href) && path === e.href && "text-primary")}
          >
            {e.label}
          </Link>)
        }

      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {
              navLinks.map((e, i) => <Link
                href={e.href}
                key={e.href}
                className={cn("hover:text-foreground", i === 0 && 'text-muted-foreground')}
              >
                {e.label}
              </Link>)
            }
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar produto..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <ProfileButton user={user} />
      </div>
    </header>)
}