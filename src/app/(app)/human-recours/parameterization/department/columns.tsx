"use client"
import {
  ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown, KeySquare, User, CalendarDaysIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DropdownMenu from "./components/drop-down-menu";
import { Departamento } from '@/types'
import { getNameInitials } from "@/utils/get-name-initials";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const columns: ColumnDef<Departamento>[] = [
  {
    id: "select",
    header: () => <p className="text-primary">#</p>,
    cell: ({ row }) => <p>{row.original.id}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nome_departamento",
    header: ({ column }) => {
      return (
        <p className="text-center hover:bg-accent inline-flex gap-2 items-center">
          Nome
        </p>
      )
    },
    cell: ({ row }) => <p>{row.getValue("nome_departamento")}</p>,
  },
  {
    accessorKey: "FUNCIONÁRIO CHEFE",
    header: ({ column }) => <p>Chefe</p>,
    cell: ({ row }) => {
      const chefe = row.original.funcionario_chefe;
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="font-medium text-foreground hover:underline cursor-pointer">{chefe.nome_completo}</div>
          </HoverCardTrigger>
                  <HoverCardContent>
            <div className="flex gap-[7px]">
              <Avatar>
                <AvatarImage src={chefe.avatar} className="block h-[60px] w-[60px] rounded-full" />
                <AvatarFallback>{getNameInitials(chefe.nome_completo)}</AvatarFallback>
              </Avatar>

               <div className="space-y-1">
            <h4 className="text-sm font-semibold">{chefe.nome_completo}</h4>
            <p className="text-sm">
              {chefe.Funcao.nome_funcao}
            </p>
            <div className="flex items-center pt-2">
              <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {new Date(chefe.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    }
  },
  {
    accessorKey: "funcionario_supervisor",
    header: ({ column }) => <p>Supervisor</p>,
    cell: ({ row }) => {
      const supervisor = row.original.funcionario_supervisor;
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="font-medium text-foreground hover:underline cursor-pointer">{supervisor.nome_completo}</div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex gap-[7px]">
              <Avatar>
                <AvatarImage src={supervisor.avatar} className="block h-[60px] w-[60px] rounded-full" />
                <AvatarFallback>{getNameInitials(supervisor.nome_completo)}</AvatarFallback>
              </Avatar>

               <div className="space-y-1">
            <h4 className="text-sm font-semibold">{supervisor.nome_completo}</h4>
            <p className="text-sm">
              {supervisor.Funcao.nome_funcao}
            </p>
            <div className="flex items-center pt-2">
              <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {new Date(supervisor.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
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
      const role = row.original

      return <DropdownMenu id={role.id} name={role.nome_departamento} />
    },
  },
];
