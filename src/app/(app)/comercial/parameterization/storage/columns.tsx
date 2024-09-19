"use client"

import {
  ColumnDef
} from "@tanstack/react-table";
import { Armazem } from '@/types'
import Option from "./options";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    accessorKey: "loja",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Loja
        </p>
      )
    },
    cell: ({ row }) => {
      const loja = row.original.loja;
      if (!loja) {
        return <p>Sede</p>;
      }
      return (
        <Link href="#">
          <span className="">{loja.name}</span>
        </Link>
      );
    }
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Descrição
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("description") ?? "N/A"}</p>,
  },
  {
    accessorKey: "localidade",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Localidade
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("localidade") ?? "N/A"}</p>,
  },
  {
    accessorKey: "bloqueioEntrada",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Bloqueio Entrada
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("bloqueioEntrada") ? "Sim" : "Não"}</p>,
  },
  {
    accessorKey: "bloqueioSaida",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Bloqueio Saída
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("bloqueioSaida") ? "Sim" : "Não"}</p>,
  },
  {
    id: "options",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center w-full">
          Opções
        </p>
      )
    },
    cell: ({ row }) => {
      const val = row.original;
      return <Option id={val.id} name={val.name} />;
    }
  }
];
