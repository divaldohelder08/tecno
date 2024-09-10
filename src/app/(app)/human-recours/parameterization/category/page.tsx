"use server"
import Form from "./form";
import { getCategoria } from "@/http/rh-categorias";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Component() {
  const categories = await getCategoria()
  return (
    <div className="p-4 lg:p-8 grid w-full gap-2 lg:gap-4 xl:grid-cols-[1fr_280px]">
       <DataTable columns={columns} data={categories} />
      <Form />
    </div>
  )
}
