"use client";

import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
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
    productId: string;
    productName: string;
    image: string;
    batchId: string;
    quantity: number;
    basePrice: number;
    discount?: number;
    expiryDate: string;
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

const formattedAmount = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
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
        <div className="w-max flex flex-col space-y-0.5">
          <p className="font-medium capitalize">{customer.name}</p>
          {/* <p className="text-xs text-gray-500">{customer.email}</p> */}
          <p className="text-xs text-gray-500">{customer.phone}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => (
      <div className="w-max font-medium">
        {formattedAmount(row.getValue("totalAmount"))}
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
          <div className="space-y-2 md:space-x-4 md:space-y-0">
            <Button className="border-2 border-green-500 bg-transparent hover:bg-green-500 text-black hover:text-white">
              Accept Order
            </Button>
            <Button className="border-2 border-red-500 bg-transparent hover:bg-red-500 text-black hover:text-white">
              Reject Order
            </Button>
          </div>
        ) : row.original.orderStatus === "processing" ? (
          <Button className="border-2 border-blue-500 bg-transparent hover:bg-blue-500 text-black hover:text-white">
            Mark Shipped
          </Button>
        ) : row.original.orderStatus === "shipped" ? (
          <div className="space-y-2 md:space-x-4 md:space-y-0">
            <Button className="border-2 border-gray-300 bg-transparent hover:bg-gray-300 text-black">
              Track Order
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
          <div className="space-y-2 md:space-x-4 md:space-y-0">
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
