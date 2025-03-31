"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import exp from "constants";
import { ArrowUpDown } from "lucide-react";

export type Products = {
  id: string;
  name: string;
  category: "snacks" | "beverages" | "icecream" | "chocolates";
  stock: string;
  expiryDate: string;
  discount: number;
  img: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="w-max flex items-center">
        <img
          src={row.original.img}
          alt={row.getValue("name")}
          className="w-12 h-12 rounded object-cover"
        />
        <div className="capitalize">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="w-max capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const getStockClass = (stock: string | string[]) => {
        if (stock.includes("In Stock")) return "bg-green-100 text-green-600";
        if (stock.includes("Low Stock")) return "bg-orange-100 text-orange-600";
        if (stock.includes("Out of Stock")) return "bg-red-100 text-red-600";
        return "bg-gray-100 text-gray-600"; // Default case
      };
      return (
        <div
          className={clsx(
            "w-max capitalize p-1.5 rounded",
            getStockClass(row.getValue("stock"))
          )}
        >
          {row.getValue("stock")}
        </div>
      );
    },
  },
  {
    accessorKey: "expiryDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expiry Date <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const getExpiryClass = (expiryDate: string) => {
        const today = new Date();
        const expiry = new Date(expiryDate);

        if (expiry <= today) {
          return "bg-red-100 text-red-600 rounded";
        }
      };
      return (
        <div
          className={clsx(
            "w-max capitalize p-1.5",
            getExpiryClass(row.getValue("expiryDate"))
          )}
        >
          {row.getValue("expiryDate")}
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => (
      <div className="w-max capitalize text-green-600 bg-green-100 p-1.5 rounded font-medium ">
        {row.getValue("discount")}% OFF
      </div>
    ),
  },
];
