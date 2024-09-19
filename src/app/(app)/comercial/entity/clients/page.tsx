import { buttonVariants } from "@/components/ui/button"
import { getClientes } from "@/http/cliente"
import { cn } from "@/lib/utils"
import { PlusIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { columns } from "./table/columns"
import { DataTable } from "./table/data-table"

export default async function Cliente() {
  const clientes = await getClientes()

  return (
    <>
      <div className="flex items-center justify-between p-4 lg:p-8">
        <div>
          <h1 className="text-base font-semibold md:text-2xl">Clientes</h1>
          <p className='text-sm text-muted-foreground'>Gerencie as pessoas que estão utilizando as licenças do contrato</p>
        </div>
        <Link href="clients/new"
          className={cn(buttonVariants({
            variant: "default",
            size: "sm",
          }), "gap-1")}
        >
          <PlusIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Novo Cliente
          </span>
        </Link>
      </div>
      <div>
        <DataTable columns={columns} data={clientes} />
      </div>
    </>
  )
}
