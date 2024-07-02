'use server'

import { getRole } from "@/http/roles";
import { Metadata } from "next";
import { PermissionContent } from "../components/permission-content";
import RoleForm from "./form";

interface props {
  params: { id: string }
}

export async function generateMetadata({
  params,
}: props): Promise<Metadata> {
  const id = params.id

  return {
    title: `Role ${id}`,
  }
}
export default async function roleProfile({ params }: props) {
  // const permissions = await getPermissions()
  const { permissions, role } = await getRole(params.id)

  return (
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3 bg-card">
      <div
        className="relative flex-col items-start gap-8">
        <RoleForm id={params.id} name={role.name} description={role.description} />
      </div>
      <div className="bg-muted/50 p-4 lg:col-span-2">
        <PermissionContent permissions={permissions} />
      </div>
    </main>
  )
}