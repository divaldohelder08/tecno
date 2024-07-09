"use client"
import {
  ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown, KeySquare, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import DropdownMenu from "./components/drop-down-menu";

export type Role = {
  id: number
  name: string
  description: string
  permissions: number,
  users: number
}

export const columns: ColumnDef<Role>[] = [
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
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => <p className="lowercase">{row.getValue("name")}</p>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
        >
          Descrição
        </Button>
      )
    },
    cell: ({ row }) => <p className="lowercase text-muted-foreground">{row.getValue("description") ?? "null"}</p>,
  },

  {
    accessorKey: "users",
    header: ({ column }) => { },
    cell: ({ row }) =>
      <Button
        variant="ghost"
        className="gap-2"
      >
        <span className="sr-only">usuarios</span>
        {row.original.users}  
        <User className="h-4 w-4" />
      </Button>

  },

  {
    accessorKey: "members-with-role",
    header: ({ column }) => { },
    cell: ({ row }) =>
      <Button
        variant="ghost"
        className="gap-2"
      >
        <span className="sr-only">Permissões</span>
        {row.original.permissions}  
        <KeySquare className=" h-4 w-4" />
      </Button>
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const role = row.original

      return <DropdownMenu id={role.id} name={role.name} />
    },
  },
]
