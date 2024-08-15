"use client";

import {
  ColumnDef
} from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pen, Trash, FilePen, Upload } from "lucide-react";
import DeleteAlert from "@/components/delete-alert";
import { deleteFornecedor } from "@/http/fornecedores";
import Option from "./options";

interface Props {
  id: number;
  entidadeId: number;
  email: string | null;
  estado: 'ACTIVO' | 'REMOVIDO';
  country: {
    code: string;
    name: string;
  };
  entidade: {
    id: number;
    name: string;
    identificacao: string;
    tipodeIdentificacao: string;
    isCliente: boolean;
  };
}

export const columns: ColumnDef<Props>[] = [
  {
    id: "select",
    header: () => <p className="text-primary">#</p>,
    cell: ({ row }) => <p className="hidden sm:table-cell">{row.original.id}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Entidade",
    cell: ({ row }) => <p className="capitalize">{row.original.entidade.name}</p>,
  },
  {
    accessorKey: "Identificação",
    cell: ({ row }) => <p>{row.original.entidade.identificacao}</p>,
  },
  {
    accessorKey: "Estado",
    cell: ({ row }) => {
      return row.original.estado === 'ACTIVO'
        ? <Badge variant="outline">Ativo</Badge>
        : <Badge variant="secondary">Inativo</Badge>;
    },
  },
  {
    id: "Pais",
    accessorKey: "Pais",
    enableHiding: false,
    cell: ({ row }) => {
      const { country } = row.original;
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <p className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}>
              {country.code}
            </p>
          </TooltipTrigger>
          <TooltipContent>{country.name}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "opções",
    enableHiding: false,
    cell: ({ row }) => {
      const forn = row.original;
      return (
        <Option 
          id={forn.id}
          name={forn.entidade.name}
          entidadeId={forn.entidade.id}
          isCliente={forn.entidade.isCliente}
        />
      );
    },
  },
];
