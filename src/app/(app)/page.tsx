"use server"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users
} from "lucide-react"
import Link from "next/link"
import { CardMetrics } from "./components/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Clock, Shield, User, PlusIcon, Calendar } from "lucide-react"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default async function Dashboard() {
  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Inventory</h1>
          <p className='text-sm text-muted-foreground'>Gerencie as pessoas que estão utilizando as licenças do contrato</p>
        </div>
        <div href="members/new"
          className={cn(buttonVariants({
            variant: "outline",
            size: "sm",
          }),'items-center w-52 justify-between bg-card rounded-sm')}
        >
         <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="sm:not-sr-only sm:whitespace-nowrap">
                Novo membro
              </span>
          </div>
           <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
      </main>
  )
}
