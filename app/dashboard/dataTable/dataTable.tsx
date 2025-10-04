"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
 type ColumnFiltersState,
 getFilteredRowModel,
 SortingState,
 getSortedRowModel
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link  from "next/link"
import {ScanSearch } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting,setSorting] = useState<SortingState>([])
const [columnFilters,setColumnFlters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel:getPaginationRowModel(),
    onColumnFiltersChange:setColumnFlters,
    getFilteredRowModel:getFilteredRowModel(),
    getSortedRowModel:getSortedRowModel(),
    onSortingChange:setSorting,
    state:{
        sorting,
        columnFilters,
    }
  })

  return (
    <div className="grid gap-2">
        <div className="flex justify-between items-center w-full">
           <div className="flex w-full items-center gap-2">
            <ScanSearch className="text-gray-500"/>
    <Input placeholder="Filter with name..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event)=>table.getColumn("title")?.setFilterValue(event.target.value)}
        className="max-w-sm"/>
           </div>
     <Button asChild variant={"link"}><Link href="/dashboard/createProduct" className="text-gray-600 float-end">add new product</Link></Button>
        </div>
    <div className="overflow-hidden rounded-md border ">
       
      <Table>
        <TableHeader>
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
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
     <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5,10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant={"outline"}
        size={"sm"}
        onClick={()=>table.previousPage()}
        disabled={!table.getCanPreviousPage()}>
            previous
        </Button>
         <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <Button variant={"outline"}
        size={"sm"}
        onClick={()=>table.nextPage()}
        disabled={!table.getCanNextPage()}>
            next
        </Button>
      </div>
    </div>
  )
}