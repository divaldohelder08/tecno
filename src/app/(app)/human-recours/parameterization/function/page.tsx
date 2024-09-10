'use server'
import { getFcns } from "@/http/function";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Form from "./form";

export default async function Component() {
  const fcns = await getFcns()

  return (
    <div className="p-4 lg:p-8 grid w-full gap-2 lg:gap-4 xl:grid-cols-[1fr_280px]">
      <DataTable columns={columns} data={fcns} />
      <Form />
    </div>
  )
}