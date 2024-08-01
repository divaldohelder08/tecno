"use server"
import Form from "./form";
import { getCategoria } from "@/http/categorias";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { DrawerForm } from "./form";

export default async function Component() {
  const categorias = await getCategoria()
  return (
    <div className="p-4 lg:p-8 grid w-full gap-2 lg:gap-4 xl:grid-cols-[1fr_280px]">
      {categorias[0] ? <DataTable columns={columns} data={categorias} />
        : <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm  p-4 md:p-6 m-[0.6rem]"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Não encontramos nenhuma categoria
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Começe por criar novas categorias
            </p>
        <DrawerForm />

          </div>
        </div>
      }
      <Form />
    </div>
  )
}