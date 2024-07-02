"use client"
import {
  ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown, KeySquare, MoreHorizontal, Trash, User, Eye, Pen } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
export type Role = {
  id: number
  name: string
  description: string
}

export const columns: ColumnDef<Role>[] = [
  {
    id: "select",
    header: () => (<p className="text-primary">#</p>),
    cell: ({ row }) => (
      <p>{row.original.id}</p>
    ),
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase text-muted-foreground">{row.getValue("description")}</div>,
  },


  
  {
    accessorKey: "members-with-role",
       header: ({ column }) => {},
    cell: ({ row }) => {
        return (
        <>
        <Button
          variant="ghost"
          className="gap-2"
        >
          <span className="sr-only">Permissões</span>
          <User className="h-4 w-4" />
        </Button>


<Button
      variant="ghost"
      className="gap-2"
    >
      <span className="sr-only">Permissões</span>
      <KeySquare className=" h-4 w-4" />
    </Button>



<Button
      variant="ghost"
      className="gap-2"
    >
      <span className="sr-only">Nome</span>
      <Trash className="h-4 w-4" />
    </Button>
        </>
        )
    }
  },


  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const role = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(role.id.toString())}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link href={`roles/${role.id}`} className="flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    View customer
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>  
                <Trash className="mr-2 h-4 w-4" />
                <span>Nome</span>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
