"use client"
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import React from 'react';
import { DrawerForm } from "./form";
interface props<TData> {
  table: Table<TData>,
}

export function DataTableHeader<TData>({
  table,
}: props<TData>) {
  return (
    <div className="flex items-end py-4">
      <h1 className="text-xl font-semibold md:text-2xl">Função</h1>
      <div className="flex items-center gap-2 ml-auto">
        <Input
          placeholder="Filtrar loja"
          value={(table.getColumn("Entidade")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Entidade")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DrawerForm />
      </div>
    </div>
  )
}

