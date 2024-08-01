"use server"
import Form from "./form";
import { getFuncionario } from "@/http/funcionarios";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Component() {
  const func = await getFuncionario()
  return (
    <div className="p-4 lg:p-8 grid w-full gap-2 lg:gap-4">
      <DataTable columns={columns} data={func} />
    </div>
  )
}