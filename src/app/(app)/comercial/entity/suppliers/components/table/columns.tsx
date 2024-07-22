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
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DropdownMenu from ".././drop-down-menu";
import { Pen, Trash } from "lucide-react"
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
    accessorKey: "Tipo Desconto",
    cell: ({ row }) => <p className="hidden md:table-cell">{row.original.tipoDesconto}</p>
  },
  {
    id: "Pais",
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
    id: "actions",
    enableHiding: false,
    accessorKey: "Opções",
    cell: ({ row: { original }  }) => {
      return <>
        <Button  variant="outline" className="border-muted-foreground">
            <Trash className="text-muted-foreground w-3.5 h-3.5"/>
        </Button>
        <Button  variant="outline" className="border-blue-500 hover:bg-blue-500/5">
            <Pen className="text-blue-500 w-3.5 h-3.5"/>
        </Button>
        <Button variant="outline" className="border-destructive text-destructive shadow-sm hover:bg-destructive/5">
            <Trash className="w-4 h-4 text-destructive"/>
        </Button>
    </>
    },
  },
]
