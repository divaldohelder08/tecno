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
import DropdownMenu from ".././drop-down-menu";
import { buttonVariants } from "@/components/ui/button";
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
    accessorKey: "status",
    cell: ({ row: { original } }) => <p>{original.entidade.identificacao}</p>
  },
  {
    accessorKey: "Name",
    cell: ({ row }) => <p className="capitalize">{row.original.entidade.name}</p>,
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
    id: "Pais",
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
    id: "actions",
    enableHiding: false,
    cell: ({ row: { original }  }) => {
      return <DropdownMenu id={original.id} name={original.entidade.name} />
    },
  },
]
