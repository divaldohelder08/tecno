"use server"
import Form from "./form";
import { getCareer } from "@/http/career";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Component() {
  const carreer = await getCareer()
  return (
    <div className="p-4 lg:p-8 grid w-full gap-2 lg:gap-4 xl:grid-cols-[1fr_280px]">
        { carreer[0] ? <DataTable columns={columns} data={carreer} />
            : <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm  p-4 md:p-6 m-4 md:m-6"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  Não encontramos nenhuma carreira
                </h3>
                <p className="text-sm text-muted-foreground">
                  Começe por criar novas carreira 
                </p>
              
              </div>
            </div>
        }
      <Form />
    </div>
  )
}