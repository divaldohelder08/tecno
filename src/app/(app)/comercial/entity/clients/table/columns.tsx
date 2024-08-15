"use client"
import {
  ColumnDef
} from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Trash, FilePen, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteAlert from "@/components/delete-alert";
import { deleteCliente } from "@/http/cliente";
import Option from "./options";

interface props {
  id: number,
  entidadeId: number,
  tipoDesconto: 'COMERCIAL' | 'FINANCEIRO' | 'DIVERSO' | 'NENHUM',
  saldo: number,
  estado: 'ACTIVO' | 'REMOVIDO',
  country: {
    code: string,
    name: string
  },
  entidade: {
    name: string,
    identificacao: string,
    tipodeIdentificacao: string
  }
}
export const columns: ColumnDef<props>[] = [
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
    cell: ({ row: { original } }) => <p>{original.entidade.identificacao}</p>
  },
  {
    accessorKey: "Estado",
    cell: ({ row }) => {
      return row.original.estado === 'ACTIVO'
        ? <Badge variant="outline">Ativo</Badge>
        : <Badge variant="secondary">Inativo</Badge>
    },
  },
  {
    accessorKey: "Saldo",
    cell: ({ row }) => <p className="hidden md:table-cell">{row.original.saldo}</p>
  },
  {
    accessorKey: "Pais",
    enableHiding: false,
    cell: ({ row: { original: { country } } }) =>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}>{country.code}</p>
        </TooltipTrigger>
        <TooltipContent>{country.name}</TooltipContent>
      </Tooltip>
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
          entidadeId={forn.entidadeId}
          isFornecedor={forn.entidade.isFornecedor}
        />
      );
    },
  },
]













