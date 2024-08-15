"use client"
import { DrawerForm } from "./form";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

interface props<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({
  table,
}: props<TData>) {
  return (
    <div className="flex items-end py-4">
      <h1 className="text-xl font-semibold md:text-2xl">Sub-categoria</h1>
      <div className="flex items-center gap-2 ml-auto">
        <Input
          placeholder="Filtrar sub-categoria pelo nome"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DrawerForm />
      </div>
    </div>
  )
}





