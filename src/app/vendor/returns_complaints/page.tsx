"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Banknote, Check, Clock, Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { columns, ReturnRefund } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<ReturnRefund[]> {
  // Fetch data from your API here.
  return [
    {
      orderId: "ORD123456",
      productName: "Wireless Headphones",
      customer: {
        name: "Amit Verma",
        email: "amit.verma@example.com",
        phone: "9876543210",
        address: "123 Green Street, Delhi, India",
      },
      returnReason: "Product was defective",
      requestDate: "2025-04-10",
      refundStatus: "Pending",
    },
    {
      orderId: "ORD123457",
      productName: "Smartphone Case",
      customer: {
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        phone: "9876543211",
        address: "45 Blue Lane, Mumbai, India",
      },
      returnReason: "Wrong item delivered",
      requestDate: "2025-04-08",
      refundStatus: "Approved",
    },
    {
      orderId: "ORD123458",
      productName: "Bluetooth Speaker",
      customer: {
        name: "Rohan Das",
        email: "rohan.das@example.com",
        phone: "9876543212",
        address: "99 Red Road, Kolkata, India",
      },
      returnReason: "Did not match description",
      requestDate: "2025-04-15",
      refundStatus: "Rejected",
    },
    {
      orderId: "ORD123459",
      productName: "Fitness Tracker",
      customer: {
        name: "Neha Singh",
        email: "neha.singh@example.com",
        phone: "9876543213",
        address: "12 Yellow Avenue, Bengaluru, India",
      },
      returnReason: "Battery not charging",
      requestDate: "2025-04-18",
      refundStatus: "Pending",
    },
    {
      orderId: "ORD123460",
      productName: "Laptop Stand",
      customer: {
        name: "Kunal Mehta",
        email: "kunal.mehta@example.com",
        phone: "9876543214",
        address: "78 Violet Street, Hyderabad, India",
      },
      returnReason: "Received late",
      requestDate: "2025-05-12",
      refundStatus: "Approved",
    },
  ];
}

const Page = () => {
  const [data, setData] = useState<ReturnRefund[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await getData();
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const formattedAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (isLoading) {
    return <Loader2 className="w-6 h-6 animate-spin text-primary" />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-2 lg:gap-6 grid-cols-2 lg:grid-cols-4">
        {/* Total Earnings */}
        <Card className="">
          <CardContent className="flex flex-col-reverse lg:flex-row justify-between gap-2 lg:items-center p-6">
            <span className="flex flex-col lg:gap-1">
              <p className="text-sm text-gray-600 ">Pending Requests</p>

              <h2 className="font-semibold text-xl">
                {formattedAmount(45320)}
              </h2>
            </span>
            <Clock className="w-9 h-9 text-blue-600 bg-blue-200 p-2 rounded-full" />
          </CardContent>
        </Card>

        {/* Available for withdrawal */}
        <Card className="">
          <CardContent className="flex flex-col-reverse lg:flex-row justify-between gap-2 lg:items-center p-6">
            <span className="flex flex-col lg:gap-1">
              <p className="text-sm text-gray-600 ">Approved Returns</p>

              <h2 className="font-semibold text-xl">
                {formattedAmount(12500)}
              </h2>
            </span>
            <Check className="w-9 h-9 text-green-600 bg-green-200 p-2 rounded-full" />
          </CardContent>
        </Card>

        {/* Current month's earnings */}
        <Card className="">
          <CardContent className="flex flex-col-reverse lg:flex-row justify-between gap-2 lg:items-center p-6">
            <span className="flex flex-col lg:gap-1">
              <p className="text-sm text-gray-600">Rejected</p>

              <h2 className="font-semibold text-xl">{formattedAmount(8230)}</h2>
            </span>
            <X className="w-9 h-9 text-indigo-600 bg-indigo-200 p-2 rounded-full" />
          </CardContent>
        </Card>

        {/* Pending clearance */}
        <Card className="">
          <CardContent className="flex flex-col-reverse lg:flex-row justify-between gap-2 lg:items-center p-6">
            <span className="flex flex-col lg:gap-1">
              <p className="text-sm text-gray-600">Total Refund</p>

              <h2 className="font-semibold text-xl">{formattedAmount(2300)}</h2>
            </span>
            <Banknote className="w-9 h-9 text-orange-600 bg-orange-200 p-2 rounded-full" />
          </CardContent>
        </Card>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
