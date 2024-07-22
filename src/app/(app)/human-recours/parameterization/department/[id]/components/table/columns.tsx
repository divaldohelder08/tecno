"use client"
import {
  ColumnDef
} from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { member } from "@/types";
import { getNameInitials } from "@/utils/get-name-initials";
import DropdownMenu from "./drop-down-menu";
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
    accessorKey: "Name",
    cell: ({ row }) => <p className="capitalize">{row.original.name}</p>,
  },

  {
    accessorKey: "Perfis",
    header: () => <p className="hidden sm:table-cell">Perfis</p>,
    cell: ({ row }) =>
         <Button
        variant="ghost"
        className="gap-2"
      >
        <span className="sr-only">usuarios</span>
        {row.original.profiles}  
        <User className="h-4 w-4" />
      </Button>
  },

   {
    accessorKey: "ADM",
    header: () => <p className="hidden sm:table-cell text-center">Super</p>,
     cell: ({ row }) => {
      return row.original.isSuperAdmin
        ? <Badge variant="outline" className="mx-auto">Super-AMD</Badge>
        : <Badge variant="secondary" className="mx-auto">Normal</Badge>
    },
  },
    {
    accessorKey: "status",
    header: () => <p className="text-center sm:table-cell mx-auto">Status</p>,
    cell: ({ row }) => {
      return row.original.status
        ? <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full flex mx-auto" />
        : <span className="w-4 h-4 bg-emerald-500" />
    },
  },
  
  {
    accessorKey: "Data de criação",
    header: () => <p className="hidden sm:table-cell">Data de criação</p>,
    cell: ({ row }) => <p className="hidden md:table-cell">{new Date(row.original.createdAt).toISOString()}</p>
  },

  {
    id: "actions",
    enableHiding: false,
    header: () => <span>opções</span>,
    cell: ({ row }) => <DropdownMenu id={row.original.id} name={row.original.name} />
  },
]
