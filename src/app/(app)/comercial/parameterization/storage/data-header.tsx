"use client"
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import Form from "./form";
interface props<TData> {
  table: Table<TData>,
  lojas: any;
  filter: string,
  set: (filter: string) => void

}

export function DataTableHeader<TData>({
  table,
  lojas
}: props<TData>) {
  return (
    <div className="flex items-end py-4">
      <h1 className="text-xl font-semibold md:text-2xl">Armazem</h1>
      <div className="flex items-center gap-2 ml-auto">
        <Input
          placeholder="Filtrar armazem"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Form lojas={lojas} />
      </div>
    </div>
  )
}

