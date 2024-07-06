"use server"
import { getPermissions } from "@/http/roles";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Roles() {
  const roles = await getPermissions()
  return (
      <DataTable columns={columns} data={roles} />
  )
}