import { buttonVariants } from "@/components/ui/button"
import { getFornecedores } from "@/http/fornecedores"
import { cn } from "@/lib/utils"
import { PlusIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { columns } from "./table/columns"
import { DataTable } from "./table/data-table"

export default async function Fornecedores() {
  const forn = await getFornecedores()

  return (
    <>
      <div className="flex items-center justify-between p-4 lg:p-8">
        <div>
          <h1 className="text-base font-semibold md:text-2xl">Fornecedores</h1>
          <p className='text-sm text-muted-foreground'>Gerencie as pessoas que estão utilizando as licenças do contrato</p>
        </div>
        <Link href="suppliers/new"
          className={cn(buttonVariants({
            variant: "default",
            size: "sm",
          }), "gap-1")}
        >
          <PlusIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Novo Fornecedor
          </span>
        </Link>
      </div>
      <div>
        <DataTable columns={columns} data={forn} />
      </div>
    </>
  )
}
