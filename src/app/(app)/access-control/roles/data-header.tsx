"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Form from "./form"

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
        <h1 className="text-xl font-semibold md:text-2xl">Todos os perfis do sistema</h1>
        <Input
          placeholder="Filtrar perfil"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
       <Form />
      </div>
    </div>
  )
}