"use client"
import {
  ColumnDef
} from "@tanstack/react-table";
import Option from "./options";
import Link from "next/link";


interface sub {
  id: number
  name: string
  category: {
    id: number
    name: string
  }
}


export const columns: ColumnDef<sub>[] = [
  {
    id: "select",
    header: () => <p className="text-primary">#</p>,
    cell: ({ row }) => <p>{row.original.id}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <p>Nome</p>,
    cell: ({ row }) => <p>{row.getValue("name")}</p>,
  },
  {
    accessorKey: "categoria",
    header: ({ column }) => <p>Categoria</p>,
     cell: ({ row }) => {
      const cate = row.original.category
      return <Link href={`${cate.id}`}>{cate.name}</Link>
    },
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
