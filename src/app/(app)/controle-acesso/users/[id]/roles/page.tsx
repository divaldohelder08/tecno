import { Metadata } from "next";
import React from "react";
import { getMember } from "@/http/members";
import { getRoles } from "@/http/roles";
import Table from "./table"
import Breadcrumbs from "@/components/breadcrumbs"

interface FilialLayoutProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: { template: "%s | Role", absolute: "Utilizador" },
};

export default async function Layout({ params }: FilialLayoutProps) {
  const data = await getMember(params.id);
  const all = await getRoles()
  const roles = all.map(e => {
    return { id: e.id, name: e.name, description: e.description }
  })
  if (!data || !data.user) {
    return (
      <div className="space-y-4 p-6">
        <Breadcrumbs />
        <div className="bg-muted p-4 rounded-md mb-6">
          <h2 className="text-lg font-bold text-foreground">Usuário não encontrado</h2>
          <p className="text-muted-foreground">
            Lamentamos, mas o usuário que você procura não foi encontrado. Verifique o ID do usuário e tente novamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      <div className="space-y-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{data.user.name}</h1>
            <Breadcrumbs />
          </div>
        </div>
      </div>
      <Table userRoles={data.roles} roles={roles} id={Number(params.id)} />
    </div>
  );
}
