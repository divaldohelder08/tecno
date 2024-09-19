"use client"
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import Form from "./form";
interface props<TData> {
  table: Table<TData>,
  prov: any;
  func: any
}

export function DataTableHeader<TData>({
  table,
  prov,
  func
}: props<TData>) {
  return (
    <div className="flex items-end py-4">
      <h1 className="text-xl font-semibold md:text-2xl">Lojas</h1>
      <div className="flex items-center gap-2 ml-auto">
        <Input
          placeholder="Filtrar loja"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Form prov={prov} func={func} />
      </div>
    </div>
  )
}

