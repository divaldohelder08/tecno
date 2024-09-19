"use client"
import {
  ColumnDef
} from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { member } from "@/types";
import { getNameInitials } from "@/utils/get-name-initials";
import Option from "./options"
import { User } from "lucide-react";


import { Button } from "@/components/ui/button";

export const columns: ColumnDef<member>[] = [
  {
    id: "select",
    header: () => <p className="text-primary hidden w-[100px] sm:table-cell">#</p>,
    cell: ({ row }) =>
      <Avatar className="hidden sm:table-cell">
        <AvatarImage alt="Product image"
          className="aspect-square rounded-md object-cover"
          src={row.original.avatar}
        />
        <AvatarFallback>{getNameInitials(row.original.name)}</AvatarFallback>
      </Avatar>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: () => <p>Nome</p>,
    cell: ({ row }) => <p>{row.original.name}</p>,
  },
  {
    accessorKey: "Perfis",
    header: () => <p className="hidden sm:table-cell">Perfis</p>,
    cell: ({ row }) =>
      <Button
        variant="ghost"
        className="gap-2"
      >
        <span className="sr-only">Usuários</span>
        {row.original.profiles}
        <User className="h-4 w-4" />
      </Button>
  },
  {
    accessorKey: "ADM",
    header: () => <div className="w-full flex items-center"><p className="hidden sm:table-cell text-center">Super</p></div>,
    cell: ({ row }) => {
      return row.original.isSuperAdmin
        ? <Badge variant="success" className="bg-green-600 mx-auto">SuperAdmin</Badge>
        : <Badge variant="destructive" className="mx-auto">SuperAdmin</Badge>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <span>opções</span>,
    cell: ({ row }) => {
      const me = row.original
      return <Option id={me.id} name={me.name} email={me.email} status={me.status} isSuperAdmin={me.isSuperAdmin} resetSentAt={me.resetSentAt}/>
    }
  },
]
