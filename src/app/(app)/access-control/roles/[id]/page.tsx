'use server'

import { getPermissions, getRole } from "@/http/roles";
import { Metadata } from "next";
import { PermissionContent } from "../components/permission-content";
import RoleForm from "./form";
import Breadcrumbs from "@/components/breadcrumbs"

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
  const Dbpermissions = await getPermissions()
  const { permissions, role } = await getRole(params.id)

  return (
  <div className="p-4 md:p-8 space-y-2">
    <Breadcrumbs />
    <main className="grid flex-1 gap-4 overflow-auto  md:grid-cols-2 lg:grid-cols-3 bg-card">
      <div
        className="relative flex-col items-start gap-8">
        <RoleForm id={Number(params.id)} name={role.name} description={role.description} />
      </div>
      <div className="bg-muted/50 p-4 lg:col-span-2">
        <PermissionContent permissions={Dbpermissions} has={permissions} roleId={params.id}/>
      </div>
    </main>
  </div>
    
  )
}