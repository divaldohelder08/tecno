"use client"
import { flexRender, Table } from "@tanstack/react-table";
import * as React from "react";

import {
  TableHead,
  TableHeader as Header,
  TableRow,
} from "@/components/ui/table";


interface headerProps<TData> {
  table: Table<TData>
}

export function TableHeader<TData>({
  table,
}: headerProps<TData>) {
  return (
    <Header>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </Header>
  )
}
