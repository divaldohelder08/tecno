"use client"

import {
  ColumnDef
} from "@tanstack/react-table";
import Option from "./options";

interface Loja {
  id: number;
  name: string;
  identificacao: string;
  address: string;
  provinciaId: number;
  telefone: string;
  telefone2: string;
  email: string;
}

export const columns: ColumnDef<Loja>[] = [
  {
    id: "select",
    header: () => <p className="text-primary">#</p>,
    cell: ({ row }) => <p>{row.original.id}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'name',
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
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Endereço
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("address") ? row.getValue("address") : "N/A"}</p>,
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
        <p className="hover:bg-accent inline-flex gap-2 items-center text-center w-full">
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
