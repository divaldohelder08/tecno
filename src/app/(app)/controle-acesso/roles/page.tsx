"use server"
import { getRoles } from "@/http/roles";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default async function Roles() {
  const roles = await getRoles();
  return (
    <div className="p-4 lg:p-8">
      <DataTable columns={columns} data={roles} />
    </div>
  );
}