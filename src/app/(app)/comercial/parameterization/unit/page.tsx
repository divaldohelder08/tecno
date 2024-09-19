"use server"
import { getUnidades } from "@/http/unity";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Form, { DrawerForm } from "./form";

export default async function Component() {
  const unidades = await getUnidades()
  return (
    <div className="p-4 lg:p-8 grid w-full gap-2 lg:gap-4 xl:grid-cols-[1fr_280px]">
      {unidades[0] ? <DataTable columns={columns} data={unidades} />
        : <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm  p-4 md:p-6 m-[0.6rem]"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Não encontramos nenhuma unidade
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comece por criar novas unidades
            </p>
            <DrawerForm />
          </div>
        </div>
      }
      <Form />
    </div>
  )
}