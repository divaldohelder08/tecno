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
    cell: ({ row: { original } }) => {
      return <>
        <Button
          size="icon"
          variant="ghost"
        >
          <Upload className="h-4 w-4" />
          <span className="sr-only">Editar cliente</span>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="!text-emerald-600 hover:border-emerald-600 hover:bg-emerald-600/10"
        >

          <FilePen className="h-4 w-4" />
          <span className="sr-only">Editar cliente</span>
        </Button>
        <DeleteAlert
          id={original.id}
          title={original.entidade.name}
          deleteFunction={deleteCliente}
          successMessage="Cliente deletado com sucesso"
        >
          <Button
            size="icon"
            variant="ghost"
            className="!text-red-600 hover:border-red-600 hover:bg-red-600/10"
          >

            <Trash className="h-4 w-4" />
            <span className="sr-only">Apagar cliente</span>
          </Button>
        </DeleteAlert>

      </>
    },
  },
]
