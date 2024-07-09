"use client"
import {
  ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown, Copy, CopyCheck, PaintRoller } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Permission } from "@/types";




export const columns: ColumnDef<Permission>[] = [
  {
    id: "select",
    header: () => <p className="text-primary">#</p>,
    cell: ({ row }) => <p>{row.original.id}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          slug
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => <p className="lowercase">{row.getValue("slug")}</p>,
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
    cell: ({ row }) => <p className="lowercase">{row.getValue("description") ?? "null"}</p>,
  },

  {
    accessorKey: "perfis",
    header: () => <p>Perfis</p>,
    cell: ({ row }) =>
      <Button
        variant="ghost"
        className="gap-2"
      >
        <span className="sr-only">Perfil</span>
        {row.original.perfis}
        <PaintRoller className="h-4 w-4" />
      </Button>

  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <CopyButton slug={row.original.slug} />
    },
  },
]


function CopyButton({ slug }: { slug: string }) {
  const [cop, setCop] = useState<boolean>(false)
  return (
    <Button
      onClick={() => {
        setCop(true)
        navigator.clipboard.writeText(slug)
        setTimeout(() => setCop(false), 1000)
      }}
      size='icon'
      variant='outline'
    >
      <span className="sr-only">Copiar o slug</span>
      {
        cop ? <CopyCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />
      }




    </Button>
  )
}