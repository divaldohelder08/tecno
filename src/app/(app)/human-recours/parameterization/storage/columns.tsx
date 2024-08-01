"use client"

import {
  ColumnDef
} from "@tanstack/react-table";
import { Armazem } from '@/types'
import Option from "./options";


export const columns: ColumnDef<Armazem>[] = [
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
      )
    },
    cell: ({ row }) => <p>{row.getValue("name")}</p>,
  },
  {
    accessorKey: "identificacao",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Identificação
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("identificacao")}</p>,
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Endereço
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("address")}</p>,
  },
  {
    accessorKey: "telefone",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Telefone
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("telefone")}</p>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Email
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("email")}</p>,
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center w-full">
          Opções
        </p>
      )
    },
    cell: ({ row }) => {
      const val = row.original
      return <Option id={val.id} name={val.name} />
    }
  }
];
