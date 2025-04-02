"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartLine,
  ChevronsUp,
  CircleCheck,
  Clock,
  IndianRupee,
  TriangleAlert,
} from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import clsx from "clsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const labels = Array.from({ length: 60 }, (_, i) => {
  const year = 2020 + Math.floor(i / 12);
  const month = (i % 12) + 1;
  return `${year}-${month.toString().padStart(2, "0")}`;
});

// Generate full sales data
const fullSalesData = labels.map(
  () => Math.floor(Math.random() * 10000) + 2000
);

const orderStatusData = {
  labels: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
  datasets: [
    {
      label: "Orders",
      data: [12, 19, 7, 15, 5], // Initial data
      backgroundColor: ["#facc15", "#3b82f6", "#10b981", "#22c55e", "#ef4444"], // Colors for each status
      borderWidth: 1,
    },
  ],
};

const orders = [
  {
    orderID: "#ORD-001",
    customer: "John Doe",
    totalAmount: "₹250.00",
    status: "Pending",
  },
  {
    orderID: "#ORD-002",
    customer: "Atharva Muratkar",
    totalAmount: "₹150.00",
    status: "Delivered",
  },
  {
    orderID: "#ORD-003",
    customer: "Siddhant Shelke",
    totalAmount: "₹350.00",
    status: "Shipping",
  },
  {
    orderID: "#ORD-004",
    customer: "Nitin Khedkar",
    totalAmount: "₹450.00",
    status: "Pending",
  },
  {
    orderID: "#ORD-005",
    customer: "Vedant Shelke",
    totalAmount: "₹550.00",
    status: "Delivered",
  },
  {
    orderID: "#ORD-006",
    customer: "Ram Muratkar",
    totalAmount: "₹200.00",
    status: "Shipping",
  },
  {
    orderID: "#ORD-007",
    customer: "John Smith",
    totalAmount: "₹300.00",
    status: "Pending",
  },
];

const topSellingProducts = [
  {
    productName: "Kurkure",
    sold: "115",
    revenue: "₹2500.00",
    status: "Low Stock",
  },
  {
    productName: "Lays",
    sold: "200",
    revenue: "₹4500.00",
    status: "In Stock",
  },
  {
    productName: "Dairy Milk",
    sold: "150",
    revenue: "₹6000.00",
    status: "Low Stock",
  },
  {
    productName: "Coca Cola",
    sold: "180",
    revenue: "₹7200.00",
    status: "In Stock",
  },
  {
    productName: "Pepsi",
    sold: "130",
    revenue: "₹5200.00",
    status: "Out of Stock",
  },
];

const Page = () => {
  const [progressData, setProgressData] = useState<number[]>([]);
  const [progressLabels, setProgressLabels] = useState<string[]>([]);

  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Orders",
        data: [],
        backgroundColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setTimeout(() => {
      setChartData(orderStatusData); // Delayed data load for animation effect
    }, 500);
  }, []);

  const doughnutOptions = {
    responsive: true,
    animation: {
      animateRotate: true, // Rotates the chart in animation
      animateScale: true, // Expands from center
      duration: 1500, // Animation duration in ms
      easing: "easeOutQuad" as const, // Smooth progressive effect
    },
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setProgressData((prev) => [...prev, fullSalesData[index]]);
      setProgressLabels((prev) => [...prev, labels[index]]);
      index++;

      if (index >= labels.length) {
        clearInterval(interval); // Stop animation when all points are drawn
      }
    }, 100); // Adjust speed of progressive drawing

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: progressLabels,
    datasets: [
      {
        label: "Product A Sales",
        data: progressData,
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    animation: {
      duration: 1500, // Total animation time
      easing: "easeOutQuad" as const, // Progressive smooth effect
    },
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {/* Total Sales */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex space-between items-center">
              <h1 className="w-full text-gray-500 text-xl">Total Sales</h1>
              <p className="bg-emerald-100 px-1 py-2 rounded-md">
                <ChartLine className="w-6 h-6 text-emerald-600" />
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <span className="flex items-center">
              <IndianRupee className="w-6 h-6" />
              <p className="text-2xl text-center font-semibold">12,345</p>
            </span>
          </CardContent>
          <CardFooter>
            <p className="flex text-base font-medium text-emerald-600">
              <ChevronsUp />
              12% from last month
            </p>
          </CardFooter>
        </Card>

        {/* Pending Orders */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex space-between items-center">
              <h1 className="w-full text-gray-500 text-xl">Pending Orders</h1>
              <p className="bg-orange-100 px-1 py-2 rounded-md">
                <Clock className="w-6 h-6 text-orange-600" />
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-2xl font-semibold">48</p>
          </CardContent>
          <CardFooter>
            <p className="flex text-orange-600 text-base font-medium">
              <ChevronsUp /> 8 new orders today
            </p>
          </CardFooter>
        </Card>

        {/* Completed Orders */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex space-between items-center">
              <h1 className="w-full text-gray-500 text-xl">Completed Orders</h1>
              <p className="bg-blue-100 px-1 py-2 rounded-md">
                <CircleCheck className="w-6 h-6 text-blue-600" />
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-2xl font-semibold">280</p>
          </CardContent>
          <CardFooter>
            <p className="flex text-blue-600 text-base font-medium">
              <ChevronsUp />
              24 this week
            </p>
          </CardFooter>
        </Card>

        {/* Expiry Alerts */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex space-between items-center">
              <h1 className="w-full text-gray-500 text-xl">Expiry Alerts</h1>
              <p className="bg-red-100 px-1 py-2 rounded-md">
                <TriangleAlert className="w-6 h-6 text-red-600" />
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-2xl font-semibold">5</p>
          </CardContent>
          <CardFooter>
            <p className="flex text-red-600 text-base font-medium">
              <ChevronsUp />5 items expiring soon
            </p>
          </CardFooter>
        </Card>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex space-between items-center text-lg ">
              Sales Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={data} options={lineOptions} />
          </CardContent>
        </Card>

        {/* Pending Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex space-between items-center text-lg ">
              Order Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Doughnut data={chartData} options={doughnutOptions} />
          </CardContent>
        </Card>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex space-between items-center">
              <h1 className="w-full text-xl">Recent Orders</h1>
              <Link
                href="/vendor/orders"
                className="w-full text-end font-normal text-stone-600"
              >
                View All
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your recent orders.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderID}>
                    <TableCell className="font-medium">
                      {order.orderID}
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell
                      className={
                        order.status === "Pending"
                          ? "text-orange-600 bg-orange-100"
                          : order.status === "Shipping"
                          ? "text-blue-600 bg-blue-100"
                          : order.status === "Delivered"
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }
                    >
                      {order.status}
                    </TableCell>
                    <TableCell className="text-right">
                      {order.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex space-between items-center text-lg ">
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your top selling products.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingProducts.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.productName}
                    </TableCell>
                    <TableCell>{item.sold}</TableCell>
                    <TableCell>{item.revenue}</TableCell>
                    <TableCell
                      className={clsx(
                        item.status === "Low Stock"
                          ? "text-orange-600 bg-orange-100"
                          : item.status === "In Stock"
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100",
                        "text-right"
                      )}
                    >
                      {item.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
