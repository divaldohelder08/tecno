"use server"
import { getRules } from "@/http/roles";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Roles() {
  const roles = await getRules();
  return (
    <div className="p-4 lg:p-8">
      <DataTable columns={columns} data={roles} />
    </div>
  );
}