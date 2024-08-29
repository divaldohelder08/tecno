"use client"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import {
  Card,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { DataTableHeader } from "./data-header";
import { TableHeader } from "@/components/table";
import { DataTablePagination } from "@/components/data-pagination";

interface props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  categorias: any
}

export function DataTable<TData, TValue>({
  columns,
  data,
  categorias
}: props<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
        <>
      <DataTableHeader table={table} />
            <Card>
              <div className="p-6">
    <div className="w-full">
     {
         data[0] ?
        <>
          <div>
            <Table>
              <TableHeader table={table} />
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Nenhuma categoria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
     </>
     :  <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm  p-4 h-[200px]"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Não encontramos nenhum produto
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Começe por criar novos produto
            </p>
          </div>
        </div>
     }
    </div>
          </div>
             { data[0] &&  
              <div className="p-6">
                 <DataTablePagination table={table}/>
              </div> 
            }
            </Card>
    </>
    
    
  )
}


                                                                                                                                                           