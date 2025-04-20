"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Products } from "@/types/Product";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowUpDown, ChevronDown, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const totalStock = (batches: { quantity: number }[]) => {
  return batches.reduce((acc, batch) => acc + batch.quantity, 0);
};

const getNearestExpiry = (batches: { expiryDate: string }[]) => {
  const today = new Date();

  const nearest = batches.reduce((nearest, batch) => {
    const expiryDate = new Date(batch.expiryDate);
    const nearestDate = new Date(nearest.expiryDate);

    if (expiryDate < nearestDate && expiryDate > today) {
      return batch;
    }
    return nearest;
  }, batches[0]);

  const expiryDate = new Date(nearest.expiryDate);

  const timeDiff = expiryDate.getTime() - today.getTime();
  const daysRemainging = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const formattedDate = expiryDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return `${formattedDate} (${daysRemainging}d)`;
};

export const columns: ColumnDef<Products>[] = [
  // select column
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
  // product name column
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="w-max flex items-center gap-1">
        <Image
          src={row.original.image}
          alt={row.getValue("name")}
          className="rounded object-cover"
          width={48}
          height={48}
        />
        <div className="capitalize font-semibold">{row.getValue("name")}</div>
      </div>
    ),
  },
  // product category column
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="w-max capitalize">{row.getValue("category")}</div>
    ),
  },
  // product stock column
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const getStockClass = (totalStock: number) => {
        if (totalStock >= 30) return "bg-green-100 text-green-600";
        if (totalStock > 0 && totalStock < 30)
          return "bg-orange-100 text-orange-600";
        if (totalStock === 0) return "bg-red-100 text-red-600";
        return "bg-gray-100 text-gray-600"; // Default case
      };
      return (
        <div
          className={clsx(
            "w-max capitalize p-1.5 rounded text-sm",
            getStockClass(totalStock(row.original.batches))
          )}
        >
          {totalStock(row.original.batches)} units
        </div>
      );
    },
  },
  // product expiry date column
  {
    accessorKey: "expiryDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nearest Expiry <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const getExpiryClass = (expiryDateStr: string) => {
        const today = new Date();
        const expiryDate = new Date(expiryDateStr);
        const diffInDays = Math.ceil(
          (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffInDays <= 7) {
          return "text-red-600 bg-red-100"; // Near expiry - red
        } else if (diffInDays <= 30) {
          return "text-orange-500 bg-orange-100"; // 1 week to 1 month - orange
        } else {
          return "text-green-600 bg-green-100"; // More than 1 month - green
        }
      };
      return (
        <div
          className={clsx(
            "w-max capitalize p-1.5 rounded text-sm",
            getExpiryClass(getNearestExpiry(row.original.batches))
          )}
        >
          {getNearestExpiry(row.original.batches)}
        </div>
      );
    },
  },
  // product discount column
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const getDiscountByExpiry = (expiryDateStr: string): number => {
        const today = new Date();
        const expiryDate = new Date(expiryDateStr);
        const daysRemaining = Math.ceil(
          (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysRemaining <= 7) return 40;
        if (daysRemaining <= 21) return 25;
        if (daysRemaining <= 30) return 15;
        return 10;
      };

      const nearestExpiry = getNearestExpiry(row.original.batches);
      const discount = getDiscountByExpiry(nearestExpiry);

      return (
        <div className="w-max capitalize text-green-600 bg-green-100 p-1.5 rounded font-medium ">
          {discount}% OFF
        </div>
      );
    },
  },
  // Actions column
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <div></div>,
  },
];
