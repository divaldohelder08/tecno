"use server"
import { getSubCategoria } from "@/http/sub-category";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Form, { DrawerForm } from "./form";
import { getCountries } from "@/http/helpers"
import { getCategoria } from "@/http/categorias";

export default async function Component() {
  const subCategories = await getSubCategoria()
  const categorias = await getCategoria()
  return (
    <div className="p-4 lg:p-8 grid w-full gap-2 lg:gap-4 xl:grid-cols-[1fr_280px]">
      <DataTable columns={columns} data={subCategories} categorias={categorias}/>
      <Form categorias={categorias}/>
    </div>
  )
}