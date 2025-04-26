import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { Check, Clock, Eye, Search, X } from "lucide-react";
import Image from "next/image";
import React from "react";

export type ReturnRefund = {
  orderId: string;
  productName: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  returnReason: string;
  requestDate: string; // ISO date format
  refundStatus: "Pending" | "Approved" | "Rejected";
};

const formattedDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const columns: ColumnDef<ReturnRefund>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="w-max capitalize text-sm">{row.getValue("orderId")}</div>
    ),
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="capitalize font-semibold text-sm">
        {row.getValue("productName")}
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.getValue("customer") as ReturnRefund["customer"];

      return (
        <div className="w-max flex flex-col space-y-0.5">
          <p className="font-medium capitalize">{customer?.name}</p>
          {/* <p className="text-xs text-gray-500">{customer.email}</p> */}
          <p className="text-xs text-gray-500">{customer?.phone}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "returnReason",
    header: "Return Reason",
    cell: ({ row }) => (
      <div className="w-max capitalize text-sm">
        {row.getValue("returnReason")}
      </div>
    ),
  },
  {
    accessorKey: "refundStatus",
    header: "Refund Status",
    cell: ({ row }) => {
      const getRefundStatus = (status: ReturnRefund["refundStatus"]) => {
        if (status === "Approved") return "bg-green-100 text-green-600";
        if (status === "Pending") return "bg-orange-100 text-orange-600";
        if (status === "Rejected") return "bg-red-100 text-red-600";
        return "bg-gray-100 text-gray-600 "; // Default case
      };
      return (
        <div
          className={clsx(
            "w-max capitalize p-1.5 rounded text-sm",
            getRefundStatus(row.getValue("refundStatus"))
          )}
        >
          {row.getValue("refundStatus")}
        </div>
      );
    },
  },
  {
    accessorKey: "requestDate",
    header: "Requested On",
    cell: ({ row }) => (
      <div className="w-max capitalize text-sm">
        {formattedDate(row.getValue("requestDate"))}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const refundData = row.original;

      return (
        <div className="flex items-center space-x-2">
          <RefundDetailsCell refundData={refundData} />

          <TooltipProvider>
            {/* <Tooltip>
              <TooltipTrigger>
                <Eye
                  className="h-5 w-5 text-blue-500 hover:text-blue-600 cursor-pointer"
                  onClick={() => setOpen(true)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>View</p>
              </TooltipContent>
            </Tooltip> */}

            <Tooltip>
              <TooltipTrigger>
                <Check className="h-5 w-5 text-green-500 hover:text-green-600 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Approve</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <X className="h-5 w-5 text-red-500 hover:text-red-600 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reject</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];

const RefundDetailsCell = ({ refundData }: { refundData: ReturnRefund }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger>
            <Eye
              className="h-5 w-5 text-blue-500 hover:text-blue-600 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>View</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle>Return/Refund Request Details</DialogTitle>
          <Badge className={clsx("mr-4")}>{refundData.refundStatus}</Badge>
        </DialogHeader>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2 ">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Order Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <p className="text-gray-400 text-sm">Order ID</p>
                  <p className="text-sm font-medium text-indigo-500">
                    #{refundData.orderId}
                  </p>
                </div>
                <div className="flex items-center mt-4 gap-4">
                  <Image
                    src="https://cdn.zeptonow.com/production/ik-seo/tr:w-1021,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/9a5a3c22-12a0-401c-9a79-732caa958540/Lay-s-Classic-Salted-Potato-Chips.jpeg"
                    alt={refundData.productName}
                    width={64}
                    height={64}
                  />
                  <div className="flex flex-col text-sm">
                    <p className="font-semibold">{refundData.productName}</p>
                    <span className="flex h-5 items-center gap-1 text-gray-400">
                      <p>Black</p>
                      <Separator orientation="vertical" className="" />
                      <p>Qty: 1</p>
                    </span>
                    <p>₹20.00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Return Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <p className="text-gray-400 text-sm">Request Date</p>
                  <p className="text-sm font-medium">
                    {formattedDate(refundData.requestDate)}
                  </p>
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <p className="text-sm">Return Reason</p>
                  <p className="p-2 font-medium text-base rounded-md bg-gray-100">
                    {refundData.returnReason}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center border-b border-gray-200 gap-4 pb-4">
                  <Image
                    alt={refundData.customer.name}
                    src="/"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span>
                    <p className="font-medium text-sm">
                      {refundData.customer.name}
                    </p>
                    <p className="text-xs text-gray-300">
                      Customer since Jan 2025
                    </p>
                  </span>
                </div>
                <div className="flex justify-between mt-4 border-b border-gray-200 gap-4 pb-4">
                  <span className="flex flex-col">
                    <Label className="font-normal text-gray-400">Email</Label>
                    <p className="font-medium">{refundData.customer.email}</p>
                  </span>
                  <span className="flex flex-col">
                    <Label className="font-normal text-gray-400">Phone</Label>
                    <p className="font-medium">{refundData.customer.phone}</p>
                  </span>
                </div>
                <div className="flex flex-col mt-4">
                  <Label className="font-normal text-gray-400">
                    Shipping Address
                  </Label>
                  <p className="font-medium">{refundData.customer.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="h-fit">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Return Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-9 w-9 text-blue-600 bg-blue-100 rounded-full p-2" />
                    <span>
                      <p className="font-medium">Return Requested</p>
                      <p className="text-gray-400 text-sm">
                        April 24, 2025, 10:30 AM
                      </p>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <Search className="h-9 w-9 text-yellow-500 bg-yellow-100 rounded-full p-2" />
                    <span>
                      <p className="font-medium">Under Review</p>
                      <p className="text-gray-400 text-sm">Pending</p>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <DialogFooter className="border-t border-gray-200 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive">Reject Return</Button>
          <Button
            variant="outline"
            className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
          >
            Approve Return
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
