"use client"
import {
  ColumnDef
} from "@tanstack/react-table";
import { KeySquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Option from "./options";

export type Roles = {
  id: number;
  name: string;
  description: string | null; 
  permissions: number;
  users: number;
};

export const columns: ColumnDef<Roles>[] = [
  {
    id: "select",
    header: () => <p className="text-primary">#</p>,
    cell: ({ row }) => <p>{row.original.id}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Nome
        </p>
      );
    },
    cell: ({ row }) => <p>{row.getValue("name")}</p>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <p>Descrição</p>,
    cell: ({ row }) => <p className="lowercase text-muted-foreground">{row.getValue("description") ?? "null"}</p>,
  },
  {
    accessorKey: "users",
    header: ({ column }) => <p>Usuários</p>,
    cell: ({ row }) => (
      <Button variant="ghost" className="gap-2">
        <span className="sr-only">Usuários</span>
        {row.original.users}
        <User className="h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "members-with-role",
    header: ({ column }) => <p>Permissões</p>,
    cell: ({ row }) => (
      <Button variant="ghost" className="gap-2">
        <span className="sr-only">Permissões</span>
        {row.original.permissions}
        <KeySquare className=" h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <p>Opções</p>,
    cell: ({ row }) => {
      const role = row.original;
      return <Option id={role.id} name={role.name} />;
    },
  },
];