import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardHeader
} from "@/components/ui/card"
import { getMembers } from "@/http/members"
import { cn } from "@/lib/utils"
import { PlusIcon } from "@radix-ui/react-icons"
import { Clock, Shield, User } from "lucide-react"
import Link from "next/link"
import { HeaderCards } from "./components/card-header"
import NotProducts from "./components/no-products"
import { columns } from "./components/table/columns"
import { DataTable } from "./components/table/data-table"
import Chart from "./chart"



export default async function Members() {
  const users = await getMembers()
  return (
    <>
      <div className="flex items-center justify-between p-4 lg:p-8">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
          <p className='text-md text-muted-foreground'>Gerencie as pessoas que estão utilizando as licenças do contrato</p>
        </div>
        <Link href="members/new"
          className={cn(buttonVariants({
            variant: "default",
            size: "default",
          }), "gap-1")}
        >
          <PlusIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Novo membro
          </span>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-10 px-4 lg:px-8">
        <Card className="bg-transparent flex justify-between items-center p-4 rounded-md col-span-3">
          <CardHeader className="p-0 gap-.5 text-muted-foreground">
            <div className="text-sm inline-flex gap-1 items-center">
              <Shield className="w-4" /> Contrato</div>
            <div className="text-sm">Validade: <b className="font-semibold leading-none tracking-tight">01.12.2023</b></div>
          </CardHeader>
          <div className="grid h-12 w-12 bg-card rounded-sm text-center items-center">olas</div>
        </Card>
        {/* <Card className="bg-transparent flex justify-between items-center p-4 rounded-md col-span-3">
          <CardHeader className="p-0 gap-1.5">
            <CardDescription className="text-sm inline-flex gap-1 items-center">
              <Shield className="w-4" /> CardDescription</CardDescription>
            <CardDescription className="text-sm text-muted-foreground">Validade: <b>01.12.2023</b></CardDescription>
          </CardHeader>
          <div className="grid h-12 w-12 bg-card rounded-sm text-center items-center">olas</div>
        </Card> */}
        <HeaderCards.full Icon={User} title="CardDescription" description="Validade" extra="01.12.2023" type="1">
          <div className="grid h-12 w-12 bg-card rounded-sm text-center items-center">
          


    <Chart />








          
          
          </div>
        </HeaderCards.full>

        {/* <Card className="bg-transparent flex flex-col  justify-between items-center p-4 rounded-md col-span-1 md:col-span-2">
          <div className="p-0 items-center">12</div>
          <CardDescription className="p-0 items-center">Convites pendentes</CardDescription>
        </Card>
        <Card className="bg-transparent flex flex-col justify-between items-center p-4 rounded-md col-span-1 md:col-span-2">
          <div className="p-0 items-center">12</div>
          <CardDescription className="p-0 items-center">Convites pendentes</CardDescription>
        </Card> */}
        <HeaderCards.simple Icon={Clock} title="12" description="Lores sdf" />
        <HeaderCards.simple Icon={Shield} title="63" description="Convites pendentes" />
      </div>
      {
        users[0] ?
            <DataTable columns={columns} data={users} />
          : <NotProducts />
      }
    </>
  )
}
