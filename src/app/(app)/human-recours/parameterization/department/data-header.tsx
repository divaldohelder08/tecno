"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Form from "./form"

interface props<TData> {
  table: Table<TData>
  funcio: { id: number, name: string }[]
}

export function DataTableHeader<TData>({
  table,
  funcio
}: props<TData>) {
  const router = useRouter()
  return (
    <div className="flex items-end py-4">
      <div>
        <h1 className="text-xl font-semibold md:text-2xl">Departamentos</h1>
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
        <Form funcio={funcio}/>
      </div>
    </div>
  )
}