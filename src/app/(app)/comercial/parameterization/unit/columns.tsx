"use client"
import {
  ColumnDef
} from "@tanstack/react-table";
import Option from "./options";

interface unity {
  id: number
  name: string
  artigos: number
}

export const columns: ColumnDef<unity>[] = [
  {
    id: "select",
    header: () => <p className="text-primary">#</p>,
    cell: ({ row }) => <p>{row.original.id}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    cell: ({ row }) => <p>{row.getValue("name")}</p>,
  },
  {
    accessorKey: "artigos",
    header: ({ column }) => <p>Artigos</p>,
    cell: ({ row }) => <p>{row.getValue("artigos")}</p>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: ({ column }) => <p>Opções</p>,
    cell: ({ row }) => {
      const cate = row.original
      return <Option id={cate.id} name={cate.name} />
    },
  },
];
