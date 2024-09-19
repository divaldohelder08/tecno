"use client"
import {
  ColumnDef
} from "@tanstack/react-table";
import Link from "next/link";
import Option from "./options";


interface sub {
  id: number
  name: string
  categoria: {
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
      const cate = row.original.categoria
      return <Link href={`${cate.id}`}>{cate.name}</Link>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: ({ column }) => <p>Opções</p>,
    cell: ({ row }) => {
      const sub = row.original
      return <Option id={sub.id} name={sub.name} />
    },
  },
];
