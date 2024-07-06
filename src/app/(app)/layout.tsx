import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
import { PropsWithChildren } from "react";
import { Nav } from "./components/nav";
import UserNav from "./components/user-nav";
import NavSheet from "./components/nav-sheet";


export default function Page({ children }: PropsWithChildren) {

  return (
    <ScrollArea>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span>{process.env.COMPANY}</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notificações</span>
              </Button>
            </div>
            <div className="flex-1">
              <Nav />
            </div>
          </div>
        </div>
        <div className="flex flex-col h-screen mb-20">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
              <SheetContent side="left" className="flex flex-col">
                <NavSheet />
              </SheetContent>
            </Sheet>
            <UserNav />
          </header>
          <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-screen overflow-scroll">
            {children}
          </main>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  )
}