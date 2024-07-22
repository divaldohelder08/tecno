"use server"
import { getDepartamento } from "@/http/departamento";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Form from "./form";

export default async function Roles() {
  const departamentos = await getDepartamento()
  return (
    <div className="p-4 lg:p-8 grid w-full gap-6 lg:gap-8">
      <DataTable columns={columns} data={departamentos} />
    </div>
  )
}