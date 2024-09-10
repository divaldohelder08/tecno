"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

const formSchema = z.object({
  nome_carreira: z.string(),
  regime: z.enum(['geral', 'especial'])
});
//, 'O Regime somente deve ser geral ou especial!'
type FormData = z.infer<typeof formSchema>;

interface props<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({
  table,
}: props<TData>) {

  return (
    <div className="flex items-end py-4">
      <h1 className="text-xl font-semibold md:text-2xl">Funcionarios</h1>
      <div className="flex items-center gap-2 ml-auto">
        <Input
          placeholder="Filtrar funcionario pelo nome"
          value={(table.getColumn("nome_carreira")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome_carreira")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Link href="employee/new">
          <Button className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Novo funciuonario
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}