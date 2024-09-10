"use client"

import {
  ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown, KeySquare, User, CalendarDaysIcon, FilePenIcon, EyeIcon, TrashIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Departamento } from '@/types'
import { getNameInitials } from "@/utils/get-name-initials";
import { Badge } from "@/components/ui/badge";
import Option from "./options";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Loja {
  id: number;
  nome_funcao: string;
  createdAt: Date
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
    accessorKey: "nome_funcao",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Nome
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("nome_funcao")}</p>,
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          createdAt
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("createdAt")}</p>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center text-center w-full">
          Opções
        </p>
      )
    },
    cell: ({ row }) => {
        const val=row.original
        return <Option id={val.id} name={val.nome_funcao}/>
    }
    
  }
];
