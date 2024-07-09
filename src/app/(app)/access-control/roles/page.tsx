"use server"
import { getRules } from "@/http/roles";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Roles() {
  const roles = await getRules()
  return (
      <DataTable columns={columns} data={roles} />
  )
}