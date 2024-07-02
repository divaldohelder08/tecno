"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

interface props<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({
  table,
}: props<TData>) {
  const router = useRouter()
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filtrar perfil"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <div className="flex items-center gap-2 ml-auto">
        <Button type="submit" className="ml-auto gap-1.5 hidden md:flex" onClick={() => router.push("/new")}>
          <PlusIcon className="h-3.5 w-3.5" />
          New role
        </Button>
      </div>
    </div>
  )
}