"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getNameInitials } from "@/utils/get-name-initials";
import {
  ColumnDef
} from "@tanstack/react-table";
import Option from "./options";

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
}


export const columns: ColumnDef<Funcionario>[] = [
  {
    id: "select",
    header: () => <p className="text-primary hidden w-[100px] sm:table-cell">#</p>,
    cell: ({ row }) =>
      <Avatar className="hidden sm:table-cell">
        <AvatarImage alt="Product image"
          className="aspect-square rounded-md object-cover"
          src={row.original.avatar}
        />
        <AvatarFallback>{getNameInitials(row.original.nome_completo)}</AvatarFallback>
      </Avatar>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nome_completo",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Nome
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("nome_completo")}</p>,
  },
  {
    accessorKey: "num_identificacao",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Identificação
        </p>
      )
    },
    cell: ({ row }) => {
      const { num_identificacao, tipo_identificacao } = row.original;
      return (
        <Tooltip>
          <TooltipTrigger>
            {num_identificacao}
          </TooltipTrigger>
          <TooltipContent side="right">{tipo_identificacao}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <p>Data de criação</p>,
    cell: ({ row }) =>
      <p className="lowercase text-muted-foreground">
        {row.original.createdAt}
      </p>
  },
  {
    id: "actions",
    enableHiding: false,
    header: ({ column }) => <p>Opções</p>,
    cell: ({ row }) => {
      const fun = row.original
      return <Option id={fun.id} name={fun.nome_completo} />
    },
  },
];
