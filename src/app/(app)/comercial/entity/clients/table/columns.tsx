"use client"
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Option from "./options";
//@Spell:ignore forn
interface cliente {
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
    isFornecedor: boolean
  }
}

export const columns: ColumnDef<cliente>[] = [
  {
    id: "select",
    header: () => <p className="text-primary">#</p>,
    cell: ({ row }) => <p className="hidden sm:table-cell">{row.original.id}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
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
    cell: ({ row }) => <p className="hidden md:table-cell">{
      row.original.saldo.toLocaleString("pt-BR", {
        style: "currency",
        currency: "AOA",
      })
    }</p>
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
