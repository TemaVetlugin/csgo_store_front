"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { transactionStatusVariant } from "@/components/transaction-card";

import { cn } from "@/lib/utils";

export function DataTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <Table className="border-separate border-spacing-y-2">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="!border-b-0 px-7 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-tiny truncate px-2 text-white text-opacity-20 first:pl-7"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="text-tiny border-transparent bg-secondary-300 px-7"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "border-0 px-2 py-3 first:pl-7",
                        index === 0 && "rounded-bl-lg rounded-tl-lg",
                        index === row.getVisibleCells().length - 1 &&
                          "rounded-br-lg rounded-tr-lg",
                        cell.column.columnDef.accessorKey === "type" &&
                          "capitalize",
                        cell.column.columnDef.accessorKey === "details" &&
                          "max-w-[200px]",
                        cell.column.columnDef.accessorKey === "image" && "pr-0"
                      )}
                    >
                      {cell.column.columnDef.accessorKey === "status" ? (
                        cell.getValue()?.value ? (
                          <Badge
                            variant={
                              transactionStatusVariant[
                                cell.getValue()?.value
                              ] || "extraordinary"
                            }
                            className="w-max capitalize"
                          >
                            {cell.getValue()?.label}
                          </Badge>
                        ) : null
                      ) : cell.column.columnDef.accessorKey === "image" ? (
                        <Image
                          src={cell.getValue()}
                          width={52}
                          height={31}
                          alt="item-image"
                        />
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  );
                })}
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
  );
}
