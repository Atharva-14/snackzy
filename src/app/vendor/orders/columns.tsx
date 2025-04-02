"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { Products } from "../products/columns";
import { Button } from "@/components/ui/button";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type Order = {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  products: {
    product: Products;
    quantity: number;
  }[];
  totalAmount: number;
  paymentStatus: "paid" | "cod" | "failed";
  orderStatus: OrderStatus;
  createdAt: string; // ISO date format
  updatedAt: string; // ISO date format
  deliveryMethod: "pickup" | "shipping";
  expiryPriority: "high" | "medium" | "low"; // Based on nearest expiry date
  notes?: string; // Optional special instructions
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ORDER ID",
    cell: ({ row }) => (
      <div className="w-max capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.getValue("customer") as Order["customer"];

      return (
        <div className="w-max flex flex-col">
          <span className="font-medium capitalize">{customer.name}</span>
          {/* <span className="text-xs text-gray-500">{customer.email}</span> */}
          <span className="text-xs text-gray-500">{customer.phone}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => (
      <div className="w-max font-medium">
        ₹{parseFloat(row.getValue("totalAmount")).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
    cell: ({ row }) => {
      const getOrderStatus = (status: OrderStatus) => {
        if (status.includes("shipped")) return "bg-green-100 text-green-600";
        if (status.includes("processing"))
          return "bg-orange-100 text-orange-600";
        if (status.includes("pending")) return "bg-red-100 text-red-600";
        return "bg-gray-100 text-gray-600"; // Default case
      };
      return (
        <div
          className={clsx(
            "w-max capitalize p-1.5 rounded",
            getOrderStatus(row.getValue("orderStatus"))
          )}
        >
          {row.getValue("orderStatus")}
        </div>
      );
    },
  },
  {
    accessorKey: "expiryPriority",
    header: "Priority",
    cell: ({ row }) => {
      const getExpiryPriority = (priority: string) => {
        if (priority.includes("low")) return "bg-green-100 text-green-600";
        if (priority.includes("medium")) return "bg-orange-100 text-orange-600";
        if (priority.includes("high")) return "bg-red-100 text-red-600";
        return "bg-gray-100 text-gray-600"; // Default case
      };

      return (
        <div
          className={clsx(
            "w-max capitalize p-1.5 rounded",
            getExpiryPriority(row.getValue("expiryPriority"))
          )}
        >
          {row.getValue("expiryPriority")}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    enableHiding: true,
    cell: ({ row }) => (
      <div className="w-auto capitalize">
        {row.original.orderStatus === "pending" ? (
          <div className="space-x-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Accept
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Reject
            </Button>
          </div>
        ) : row.original.orderStatus === "processing" ? (
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Mark Shipped
          </Button>
        ) : row.original.orderStatus === "shipped" ? (
          <div className="space-x-4">
            <Button className="bg-gray-200 hover:bg-gray-300 text-black">
              Track
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Mark Delivered
            </Button>
          </div>
        ) : row.original.orderStatus === "delivered" ? (
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Request Return
          </Button>
        ) : row.original.orderStatus === "returned" ? (
          <div className="space-x-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Approve Return
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Reject Return
            </Button>
          </div>
        ) : row.original.orderStatus === "cancelled" ? (
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Restore Order
          </Button>
        ) : (
          <p>None</p>
        )}
      </div>
    ),
  },
];
