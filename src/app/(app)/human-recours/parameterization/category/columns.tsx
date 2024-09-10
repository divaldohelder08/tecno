"use client"
import {
  ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown, KeySquare, User, CalendarDaysIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Option from "./options";
import { Departamento } from '@/types'
import { getNameInitials } from "@/utils/get-name-initials";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Carrer {
    id: number,
    nome_categoria: string,
    salario_base: number,
    createdAt: Date,
  }


export const columns: ColumnDef<Carrer>[] = [
  {
    id: "select",
    header: () => <p className="text-primary">#</p>,
    cell: ({ row }) => <p>{row.original.id}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nome_categoria",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Nome
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("nome_categoria")}</p>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <p>Data de criação</p>,
    cell: ({ row }) =>
      <p className="lowercase text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}  
      </p>
  },
  {
    id: "actions",
    enableHiding: false,
    header: ({ column }) => <p>Opções</p>,
    cell: ({ row }) => {
      const career = row.original
      return <Option id={career.id} name={career.nome_carreira} regime={career.regime} />
    },
  },
];
