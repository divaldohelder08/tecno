import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { PlusIcon } from "@radix-ui/react-icons"
import { Shield } from "lucide-react"
import Link from "next/link"
import Products from "./components/main"
import NotProducts from "./components/no-products"
export default function Members() {
  const hasProduct = true
  return (
    <>
      <div className="flex items-center justify-between px-4">
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

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-10  px-4">
        <Card className="bg-transparent flex justify-between items-center p-4 rounded-md col-span-3">
          <CardHeader className="p-0 gap-.5 text-muted-foreground">
            <div className="text-sm inline-flex gap-1 items-center">
              <Shield className="w-4" /> Contrato</div>
            <div className="text-sm">Validade: <b className="font-semibold leading-none tracking-tight">01.12.2023</b></div>
          </CardHeader>
          <div className="grid h-12 w-12 bg-card rounded-sm text-center items-center">olas</div>
        </Card>
        <Card className="bg-transparent flex justify-between items-center p-4 rounded-md col-span-3">
          <CardHeader className="p-0 gap-1.5">
            <CardDescription className="text-sm inline-flex gap-1 items-center">
              <Shield className="w-4" /> CardDescription</CardDescription>
            <CardDescription className="text-sm text-muted-foreground">Validade: <b>01.12.2023</b></CardDescription>
          </CardHeader>
          <div className="grid h-12 w-12 bg-card rounded-sm text-center items-center">olas</div>
        </Card>
        <Card className="bg-transparent flex flex-col  justify-between items-center p-4 rounded-md col-span-1 md:col-span-2">
          <div className="p-0 items-center">12</div>
          <CardDescription className="p-0 items-center">Convites pendentes</CardDescription>
        </Card>
        <Card className="bg-transparent flex flex-col justify-between items-center p-4 rounded-md col-span-1 md:col-span-2">
          <div className="p-0 items-center">12</div>
          <CardDescription className="p-0 items-center">Convites pendentes</CardDescription>
        </Card>
      </div>
      {
        hasProduct ? <Products /> : <NotProducts />
      }
    </>
  )
}
