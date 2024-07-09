"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface props<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({
  table,
}: props<TData>) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filtrar perfil"
        value={(table.getColumn('slug')?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("slug")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  )
}