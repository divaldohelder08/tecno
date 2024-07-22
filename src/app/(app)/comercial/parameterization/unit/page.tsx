import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Home, Building, KeyRound, Settings, UserCheck, Users, ShieldCheck, FileText, CalendarDays, Award, Pen, Warehouse, Dock, Landmark, Store, Clock, Trash, MoreVertical
} from "lucide-react";
import { getUnits } from "@/http/unit";
import Form, { DrawerForm } from "./form";
import Image from "next/image"


interface props {
  key: number,
  id: number,
  name: string,
  code: string,
  sigla: string
}

export default async function Component() {
  const units = await getUnits()
  return (
    <div className="p-4 lg:p-8 grid w-full gap-2 lg:gap-4 xl:grid-cols-[1fr_280px]">
      <div>
        <section className="bg-background">
          <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between">
            <h2 className="text-xl font-bold mb-1 md:mb-0 leading-none tracking-tight">Bancos</h2>
            <div className="flex items-center gap-2">
              <Input type="text" placeholder="Buscar por nome ou identificação" className="w-64" />
              <DrawerForm />
            </div>
          </div>
        </section>
        <section className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 lg:sm:grid-cols-3 md:p-6">
         
        </section>
      </div>
      <Form />
    </div>
  )
}


function BankCard({ id, name, code, sigla }: props) {
  return (
    <Card className="relative overflow-hidden rounded-lg group">
      {/*   <Link href={`bank/${id}`} className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View</span>
          </Link>*/}
      <div id="actions" className="absolute z-10 right-0 top-1 flex gap-2">
        <Button size="icon" variant="link">
          <MoreVertical className="w-5 h-5 dark:text-muted" />
        </Button>

      </div>
      <Image src="/placeholder.png" alt="Store 1" width={200} height={150} className="object-cover w-full h-32" />
      <div className="p-4 ">
        <h3 className="text-base font-semibold">{sigla}</h3>
        <p className="text-sm text-muted-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">Código: {code}</p>
        <Button variant="outline" size="sm" className="mt-2">
          Ver Detalhes
        </Button>
      </div>
    </Card>
  )
}
