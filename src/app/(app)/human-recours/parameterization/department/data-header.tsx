"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface props<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({
  table,
}: props<TData>) {
  const router = useRouter()
  return (
    <div className="flex items-end py-4">
      <div>
        <h1 className="text-xl font-semibold md:text-2xl">Departamentos já cadastrados</h1>
      </div>

      <div className="flex items-center gap-2 ml-auto">

        <Input
          placeholder="Filtrar departamento"
          value={(table.getColumn("nome_departamento")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome_departamento")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button> <PlusIcon className="mr-2"/>Novo Departamento </Button>
      </div>
    </div>
  )
}