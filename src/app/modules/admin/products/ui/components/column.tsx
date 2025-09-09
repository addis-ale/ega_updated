"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { GetMany } from "../../types";
import { formatPrice } from "@/lib/price-format";
import { formatPercentage } from "@/lib/format-percent";
export const columns: ColumnDef<GetMany[number]>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Selling Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priceValue =
        row.original.sellingPrice === null
          ? 0
          : typeof row.original.sellingPrice === "string"
          ? Number(row.original.sellingPrice)
          : row.original.sellingPrice;
      return formatPrice(priceValue);
    },
  },
  {
    accessorKey: "rentalPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rental Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priceValue =
        row.original.rentalPrice === null
          ? 0
          : typeof row.original.rentalPrice === "string"
          ? Number(row.original.rentalPrice)
          : row.original.rentalPrice;
      return formatPrice(priceValue);
    },
  },
  {
    accessorKey: "discountPercentage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Discount Percentage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priceValue =
        row.original.discountPercentage === null
          ? 0
          : typeof row.original.discountPercentage === "string"
          ? Number(row.original.discountPercentage)
          : row.original.discountPercentage;
      return formatPercentage(priceValue);
    },
  },
  {
    accessorKey: "isPosted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Posted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPosted = row.original.isPosted;
      return (
        <Badge
          variant={isPosted ? "default" : "secondary"}
          className="px-2 py-1 text-xs"
        >
          {isPosted ? "Posted" : "Draft"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/products/new/${id}`}>
              <DropdownMenuItem>
                <Pencil /> Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
