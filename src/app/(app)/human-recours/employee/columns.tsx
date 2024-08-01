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

interface Funcionario {
  id: number,
  nome_completo: string,
  email: string,
  tipo_identificacao: string,
  num_identificacao: string,
  avatar: string,
  telefone1: string,
  id_funcao: number,
  createdAt: Date,
  Funcao: {
    id: number,
    nome_funcao: string,
  }
}


export const columns: ColumnDef<Funcionario>[] = [
  {
    id: "select",
    header: () => <p className="text-primary">#</p>,
    cell: ({ row }) => <p>{row.original.id}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "num_identificacao",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          num_identificacao
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("num_identificacao")}</p>,
  },
  {
    accessorKey: "num_identificacao",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          num_identificacao
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("num_identificacao")}</p>,
  },
  {
    accessorKey: "funcao",
    header: ({ column }) => <p>Função</p>,
    cell: ({ row }) => {
      const funcao = row.original.Funcao
      return <p className="text-muted-foreground">
        {funcao.nome_funcao}
      </p>
    }
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
      const fun = row.original
      return <Option id={fun.id} name={fun.nome_completo}  />
    },
  },
];
