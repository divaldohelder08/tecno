"use client"
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import {
  File,
  ListFilter,
  Search
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface props<TData> {
  table: Table<TData>
}

export function DataTableHeader<TData>({
  table,
}: props<TData>) {
  const router = useRouter()
  return (
    <div className="flex items-center">
      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Pesquizar..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          value={(table.getColumn("Name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Name")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
     {/*   <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" >
            <DropdownMenuLabel>Filtrar status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem onCheckedChange={() =>
              table.getColumn("ADM")?.setFilterValue(true)
            }>
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem onChange={(event) =>
              table.getColumn("ADM")?.setFilterValue(false)
            }>
              Inativo
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        */}
      </div>
    </div>
  )
}