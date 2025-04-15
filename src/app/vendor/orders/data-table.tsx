"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Check,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Package,
  Phone,
  RefreshCcw,
  Search,
  Truck,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Products } from "../products/columns";
import { OrderStatus } from "./columns";
import { cn } from "@/libs/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface DataTableProps<TData extends Order, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface Order {
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
}

export function DataTable<TData extends Order, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedExpiryPriority, setSelectedExpiryPriority] = useState<
    string | null
  >(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const customGlobalFilter = (
    row: { original: Order },
    columnId: string,
    filterValue: string
  ): boolean => {
    const order = row.original;

    const search = String(filterValue).toLowerCase();

    return (
      order.id.toLowerCase().includes(search) ||
      order.customer.name.toLowerCase().includes(search) ||
      order.customer.email.toLowerCase().includes(search) ||
      order.customer.phone.toLowerCase().includes(search)
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: customGlobalFilter,
  });

  const handleStatusFilter = (status: string | null) => {
    setSelectedStatus(status);
    setColumnFilters(status ? [{ id: "orderStatus", value: status }] : []);
  };

  const handleExpiryPriorityFilter = (priority: string | null) => {
    setSelectedExpiryPriority(priority);
    setColumnFilters(
      priority ? [{ id: "expiryPriority", value: priority }] : []
    );
  };

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
  };

  console.log("selectedOrder", selectedOrder);

  const formattedAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formattedDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between py-4 space-y-4 md:space-y-0">
        <div className="w-full flex flex-col md:flex-row space-y-4  md:space-y-0 justify-between">
          {/* Search Bar */}
          <div className="relative">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <Input
              placeholder="Search products..."
              value={table.getState().globalFilter ?? ""}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="max-w-sm md:w-fit pl-8"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          </div>

          <div className="flex justify-between space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                  {selectedStatus || "Filter by Status"} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={selectedStatus === null}
                  onCheckedChange={() => handleStatusFilter(null)}
                >
                  All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatus === "Pending"}
                  onCheckedChange={() => handleStatusFilter("Pending")}
                >
                  Pending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatus === "Shipped"}
                  onCheckedChange={() => handleStatusFilter("Shipped")}
                >
                  Shipped
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatus === "Delivered"}
                  onCheckedChange={() => handleStatusFilter("Delivered")}
                >
                  Delivered
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatus === "Cancelled"}
                  onCheckedChange={() => handleStatusFilter("Cancelled")}
                >
                  Cancelled
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                  {selectedExpiryPriority || "Filter by Priority"}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={selectedExpiryPriority === null}
                  onCheckedChange={() => handleExpiryPriorityFilter(null)}
                >
                  All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedExpiryPriority === "High"}
                  onCheckedChange={() => handleExpiryPriorityFilter("High")}
                >
                  High
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedExpiryPriority === "Medium"}
                  onCheckedChange={() => handleExpiryPriorityFilter("Medium")}
                >
                  Medium
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedExpiryPriority === "Low"}
                  onCheckedChange={() => handleExpiryPriorityFilter("Low")}
                >
                  Low
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
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
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(row.original)}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Sheet
          open={!!selectedOrder}
          onOpenChange={() => setSelectedOrder(null)}
        >
          <SheetContent side="right" className=" p-0 flex flex-col h-full">
            <SheetHeader className="sticky top-0 z-10 flex flex-row justify-between bg-gray-900 p-4">
              <div>
                <SheetTitle className="text-white">
                  Order #{selectedOrder?.id}
                </SheetTitle>
                <SheetDescription className="text-xs font-medium text-gray-400">
                  {selectedOrder?.createdAt
                    ? formattedDate(new Date(selectedOrder.createdAt))
                    : "N/A"}{" "}
                  - 2:30 PM
                </SheetDescription>
              </div>
              <SheetClose asChild>
                <X className="h-5 w-5 text-white cursor-pointer" />
              </SheetClose>
            </SheetHeader>

            {/* Order Details */}
            <div className="flex-1 overflow-y-auto p-4 -my-4 space-y-4">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer className="flex">
                  <Label>Order Status</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex justify-between"
                      >
                        {selectedStatus || "Status"} <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuCheckboxItem>All</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Pending
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Shipped
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Delivered
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Cancelled
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </LabelInputContainer>
                <LabelInputContainer className="flex">
                  <Label>Payment Status</Label>
                  <Input
                    value={"✅ " + selectedOrder?.paymentStatus}
                    type="text"
                    disabled
                    className="capitalize font-medium bg-green-100 text-green-700"
                  />
                </LabelInputContainer>
              </div>

              <div className="flex justify-between items-center px-2.5 py-4 bg-gray-100 rounded-md">
                <p className="text-base">Total Amount</p>
                <p className="font-semibold">
                  {formattedAmount(selectedOrder?.totalAmount ?? 0)}
                </p>
              </div>

              <div className="flex space-x-4">
                <span className="flex items-center">
                  {selectedOrder?.deliveryMethod === "shipping" ? (
                    <span className="flex items-center py-1 px-2.5 rounded-full text-blue-600 bg-blue-100">
                      <Truck className="w-5 h-5 mr-2" /> Shipping
                    </span>
                  ) : (
                    <span className="flex items-center py-1 px-2.5 rounded-full text-orange-600 bg-orange-100">
                      <Package className="w-5 h-5 mr-2" /> Pickup
                    </span>
                  )}
                </span>

                <span className="flex items-center">
                  {selectedOrder?.expiryPriority === "high" ? (
                    <span className="flex items-center py-1 px-2.5 rounded-full text-red-600 bg-red-100">
                      <Clock className="w-5 h-5 mr-2" /> High Priority
                    </span>
                  ) : selectedOrder?.expiryPriority === "medium" ? (
                    <span className="flex items-center py-1 px-2.5 rounded-full text-orange-600 bg-orange-100">
                      <Clock className="w-5 h-5 mr-2" /> Medium Priority
                    </span>
                  ) : (
                    <span className="flex items-center py-1 px-2.5 rounded-full text-green-600 bg-green-100">
                      <Clock className="w-5 h-5 mr-2" /> Low Priority
                    </span>
                  )}
                </span>
              </div>

              <Card className="flex flex-col border rounded-lg py-2.5 px-4">
                <CardHeader className="py-2 px-0">
                  <CardTitle>Customer Details</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-0">
                  <span className="flex items-center space-x-2 mb-1">
                    <User className="w-5 h-5" />
                    <p className="">{selectedOrder?.customer.name}</p>
                  </span>
                  <span className="flex items-center space-x-2 mb-1">
                    <Mail className="w-5 h-5" />
                    <p className="">{selectedOrder?.customer.email}</p>
                  </span>
                  <span className="flex items-center space-x-2 mb-1">
                    <Phone className="w-5 h-5" />
                    <p className="">{selectedOrder?.customer.phone}</p>
                  </span>
                  <span className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <p className="">{selectedOrder?.customer.address}</p>
                  </span>
                </CardContent>
              </Card>

              <div className="flex flex-col space-y-4">
                <h2 className="text-lg font-medium">Ordered Items</h2>
                <Table>
                  <TableCaption>A list of your recent orders.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Product</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder &&
                      selectedOrder.products.map((order) => (
                        <TableRow key={order.product.id}>
                          <TableCell className="font-medium w-fit flex items-center">
                            <Image
                              src={order.product.img}
                              alt={order.product.name}
                              className="rounded object-cover"
                              width={48}
                              height={48}
                            />
                            <p className="capitalize truncate">
                              {order.product.name}
                            </p>
                          </TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>
                            {formattedAmount(order.product.amount)}
                          </TableCell>
                          <TableCell>
                            {formattedAmount(
                              order.quantity * order.product.amount
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <SheetFooter className="sticky bottom-0 bg-white px-4 py-2">
              {selectedOrder?.orderStatus === "pending" ? (
                <div className="flex items-center space-x-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Check className="w-5 h-5" />
                    Accept
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <X className="w-5 h-5" />
                    Cancel
                  </Button>
                  {/* <Button className="bg-gray-600 hover:bg-gray-700 text-white">
                    <Printer className="w-5 h-5" />
                    Print Invoice
                  </Button> */}
                </div>
              ) : selectedOrder?.orderStatus === "processing" ? (
                <div className="flex justify-between items-center space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Truck className="w-5 h-5" />
                    Mark as Shipped
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <X className="w-5 h-5" />
                    Cancel Order
                  </Button>
                </div>
              ) : selectedOrder?.orderStatus === "shipped" ? (
                <div className="flex justify-between items-center space-x-2">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Package className="w-5 h-5" />
                    Track Order
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Check className="w-5 h-5" />
                    Mark as Delivered
                  </Button>
                </div>
              ) : selectedOrder?.orderStatus === "returned" ? (
                <div className="flex justify-between items-center space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <RefreshCcw className="w-5 h-5" />
                    Process Refund
                  </Button>
                </div>
              ) : (
                <Button>Close</Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Table footer */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total No. of row(s) {table.getFilteredRowModel().rows.length}.
        </div>
        <div className="space-x-2">
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
