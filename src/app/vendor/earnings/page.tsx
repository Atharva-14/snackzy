"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  HardDriveDownload,
  Landmark,
  Plus,
  QrCode,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/DatePicker";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/libs/utils";
import {
  dailyRevenue,
  monthlyRevenue,
  transactionDetails,
  weeklyRevenue,
} from "@/data/transactionDetails";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// export const transactionDetails = [
//   {
//     id: "TXN001",
//     notes: "This is a note",
//     date: "2025-03-25",
//     type: "order payment",
//     method: "UPI",
//     status: "Success",
//     amount: 1800,
//   },
//   {
//     id: "TXN002",
//     notes: "This is a note",
//     date: "2025-03-26",
//     type: "order payment",
//     method: "COD",
//     status: "Success",
//     amount: 2200,
//   },
//   {
//     id: "TXN003",
//     notes: "This is a note",
//     date: "2025-03-27",
//     type: "withdrawal",
//     method: "Bank Transfer",
//     status: "Pending",
//     amount: 5000,
//   },
//   {
//     id: "TXN004",
//     notes: "This is a note",
//     date: "2025-03-28",
//     type: "order payment",
//     method: "Paytm",
//     status: "Failed",
//     amount: 1400,
//   },
//   {
//     id: "TXN005",
//     notes: "This is a note",
//     date: "2025-04-30",
//     type: "withdrawal",
//     method: "UPI",
//     status: "Success",
//     amount: 3000,
//   },
// ];

// export const dailyRevenue = [
//   { date: "2025-03-25", revenue: 1200 },
//   { date: "2025-03-26", revenue: 1500 },
//   { date: "2025-03-27", revenue: 1000 },
//   { date: "2025-03-28", revenue: 1800 },
//   { date: "2025-03-29", revenue: 1300 },
//   { date: "2025-03-30", revenue: 2000 },
//   { date: "2025-03-31", revenue: 1700 },
// ];

// export const weeklyRevenue = [
//   { week: "Week 1", revenue: 9200 },
//   { week: "Week 2", revenue: 10200 },
//   { week: "Week 3", revenue: 8600 },
//   { week: "Week 4", revenue: 11000 },
//   { week: "Week 5", revenue: 9800 },
//   { week: "Week 6", revenue: 12300 },
// ];

// export const monthlyRevenue = [
//   { month: "Oct", revenue: 40500 },
//   { month: "Nov", revenue: 49800 },
//   { month: "Dec", revenue: 47200 },
//   { month: "Jan", revenue: 52000 },
//   { month: "Feb", revenue: 48400 },
//   { month: "Mar", revenue: 53800 },
// ];

const Page = () => {
  const [chartFrequency, setChartFrequency] = useState("daily");
  const [selectedOption, setSelectedOption] = useState("");

  const labels =
    chartFrequency === "daily"
      ? dailyRevenue.map((entry) => entry.date)
      : chartFrequency === "weekly"
      ? weeklyRevenue.map((entry) => entry.week)
      : monthlyRevenue.map((entry) => entry.month);

  const dataPoints =
    chartFrequency === "daily"
      ? dailyRevenue.map((entry) => entry.revenue)
      : chartFrequency === "weekly"
      ? weeklyRevenue.map((entry) => entry.revenue)
      : monthlyRevenue.map((entry) => entry.revenue);

  const data = {
    labels,
    datasets: [
      {
        label:
          chartFrequency === "daily"
            ? "Daily Revenue"
            : chartFrequency === "weekly"
            ? "Weekly Revenue"
            : "Monthly Revenue",
        data: dataPoints,
        fill: false,
        borderColor: "#3b82f6", // Tailwind blue-500
        backgroundColor: "#3b82f6",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue (₹)",
        },
      },
      x: {
        title: {
          display: true,
          text:
            chartFrequency === "daily"
              ? "Date"
              : chartFrequency === "weekly"
              ? "Week"
              : "Months",
        },
      },
    },
  };

  const formattedDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formattedAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  console.log("selected Option", selectedOption);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-2 lg:gap-6 grid-cols-2 lg:grid-cols-4">
        {/* Total Earnings */}
        <Card className="">
          <CardContent className="flex flex-col-reverse lg:flex-row justify-between gap-2 lg:items-center p-6">
            <span className="flex flex-col lg:gap-1">
              <p className="text-sm text-gray-600 sm:block md:hidden">
                Total Earnings
              </p>
              <p className="text-sm text-gray-600 hidden md:block">
                All-time revenue
              </p>

              <h2 className="font-semibold text-xl">
                {formattedAmount(45320)}
              </h2>
            </span>
            <Wallet className="w-9 h-9 text-blue-600 bg-blue-200 p-2 rounded-full" />
          </CardContent>
        </Card>

        {/* Available for withdrawal */}
        <Card className="">
          <CardContent className="flex flex-col-reverse lg:flex-row justify-between gap-2 lg:items-center p-6">
            <span className="flex flex-col lg:gap-1">
              <p className="text-sm text-gray-600 sm:block md:hidden">
                Available Balance
              </p>
              <p className="text-sm text-gray-600 hidden md:block">
                Available for withdrawal
              </p>

              <h2 className="font-semibold text-xl">
                {formattedAmount(12500)}
              </h2>
            </span>
            <Landmark className="w-9 h-9 text-green-600 bg-green-200 p-2 rounded-full" />
          </CardContent>
        </Card>

        {/* Current month's earnings */}
        <Card className="">
          <CardContent className="flex flex-col-reverse lg:flex-row justify-between gap-2 lg:items-center p-6">
            <span className="flex flex-col lg:gap-1">
              <p className="text-sm text-gray-600 sm:block md:hidden">
                This month
              </p>
              <p className="text-sm text-gray-600 hidden md:block">
                Current month&apos;s earnings
              </p>

              <h2 className="font-semibold text-xl">{formattedAmount(8230)}</h2>
            </span>
            <Calendar className="w-9 h-9 text-indigo-600 bg-indigo-200 p-2 rounded-full" />
          </CardContent>
        </Card>

        {/* Pending clearance */}
        <Card className="">
          <CardContent className="flex flex-col-reverse lg:flex-row justify-between gap-2 lg:items-center p-6">
            <span className="flex flex-col lg:gap-1">
              <p className="text-sm text-gray-600 sm:block md:hidden">
                Pending
              </p>
              <p className="text-sm text-gray-600 hidden md:block">
                Pending clearance
              </p>

              <h2 className="font-semibold text-xl">{formattedAmount(2300)}</h2>
            </span>
            <Clock className="w-9 h-9 text-orange-600 bg-orange-200 p-2 rounded-full" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="flex flex-col md:flex-row justify-between gap-4 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex md:flex-row flex-col gap-4">
              <Button variant="outline">Today</Button>
              <Button variant="outline">This Week</Button>
              <Button variant="outline">This Month</Button>
            </div>
            <DatePickerWithRange />
          </div>

          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            <HardDriveDownload />
            Export Report
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex md:flex-row flex-col justify-between md:items-center">
          <CardTitle className="text-lg">Revenue Overview</CardTitle>
          <div className="flex justify-between items-center gap-2">
            <Button
              variant={chartFrequency === "daily" ? "default" : "secondary"}
              className={
                chartFrequency === "daily"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : ""
              }
              onClick={() => setChartFrequency("daily")}
            >
              Daily
            </Button>
            <Button
              variant={chartFrequency === "weekly" ? "default" : "secondary"}
              className={
                chartFrequency === "weekly"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : ""
              }
              onClick={() => setChartFrequency("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={chartFrequency === "monthly" ? "default" : "secondary"}
              className={
                chartFrequency === "monthly"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : ""
              }
              onClick={() => setChartFrequency("monthly")}
            >
              Monthly
            </Button>
          </div>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <div className="min-w-[600px] aspect-[2/1]">
            <Line data={data} options={options} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableCaption>A list of your recent orders.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionDetails.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="w-max font-semibold text-sm sm:text-base">
                      {formattedDate(new Date(transaction.date))}
                    </TableCell>
                    <TableCell className="w-max font-semibold capitalize text-sm sm:text-base">
                      {transaction.type}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        transaction.type === "withdrawal"
                          ? "text-red-600"
                          : "text-green-600",
                        "w-max text-sm sm:text-base"
                      )}
                    >
                      {transaction.type === "withdrawal" ? "-" : "+"}
                      {formattedAmount(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <p
                        className={clsx(
                          transaction.status === "Success"
                            ? "bg-green-100 text-green-600"
                            : transaction.status === "Pending"
                            ? "bg-orange-100 text-orange-600"
                            : transaction.status === "Failed"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600",
                          "rounded-xl px-2.5 py-0.5 w-max text-sm sm:text-base"
                        )}
                      >
                        {transaction.status}
                      </p>
                    </TableCell>
                    <TableCell className="font-medium text-gray-500 text-sm sm:text-base">
                      {transaction.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Request Withdrawal</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus /> New Withdrawal
              </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Request Withdrawal</DialogTitle>
                <DialogDescription>
                  Transfer your available balance to your preferred method
                </DialogDescription>
              </DialogHeader>
              <Separator />
              <div className="flex flex-col gap-4">
                <div className="flex p-4 rounded-lg justify-between items-center bg-gradient-to-r from-[#8cf5c3] via-[#a3f7bf] to-[#b9fbc0]">
                  <span>
                    <p className="font-medium text-base text-neutral-700">
                      Current Wallet Balance
                    </p>
                    <p className="text-neutral-500 text-sm">
                      Minimum withdrawal: {formattedAmount(100)}
                    </p>
                  </span>
                  <p className="font-semibold text-2xl text-green-600">
                    {formattedAmount(12500)}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Label htmlFor="amount">Enter Amount to Withdraw</Label>
                  <span className="flex items-center gap-4 ">
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="Enter Amount"
                    />
                    <Button variant="outline">Withdaw All</Button>
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <Label htmlFor="method">Select Withdrawal Method</Label>
                  <span className="flex items-center gap-4">
                    <RadioGroup
                      className="w-full"
                      value={selectedOption}
                      onValueChange={(value) => setSelectedOption(value)}
                    >
                      <div className="w-full flex items-center space-x-2 p-4 rounded-lg border bg-gray-100">
                        <RadioGroupItem
                          value="bank-transfer"
                          id="bank-transfer"
                        />
                        <Label
                          htmlFor="bank-transfer"
                          className="flex items-center gap-2"
                        >
                          <Landmark className="w-5 h-5" /> Bank Transfer
                        </Label>
                      </div>
                      <div className="w-full flex items-center space-x-2 p-4 rounded-lg border bg-gray-100">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label
                          htmlFor="upi"
                          className="flex items-center gap-2"
                        >
                          <QrCode className="w-5 h-5" /> UPI
                        </Label>
                      </div>
                      <div className="w-full flex items-center space-x-2 p-4 rounded-lg border bg-gray-100">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label
                          htmlFor="wallet"
                          className="flex items-center gap-2"
                        >
                          <Wallet className="w-5 h-5" /> Paytm / Wallet
                        </Label>
                      </div>
                    </RadioGroup>
                  </span>
                </div>

                {selectedOption && <Separator />}

                {selectedOption && selectedOption === "bank-transfer" ? (
                  <div className="flex flex-col gap-4">
                    <LabelInputContainer>
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input
                        id="bank-name"
                        name="bank-name"
                        type="text"
                        placeholder="State Bank of India"
                      />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="ifsc-code">IFSC Code</Label>
                      <Input
                        id="ifsc-code"
                        name="ifsc-code"
                        type="text"
                        placeholder="IFSC Code"
                      />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input
                        id="account-number"
                        name="account-number"
                        type="text"
                        placeholder="Account Number"
                      />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="cnf-account-number">
                        Confirm Account Number
                      </Label>
                      <Input
                        id="cnf-account-number"
                        name="cnf-account-number"
                        type="password"
                        placeholder="Account Number"
                      />
                    </LabelInputContainer>
                  </div>
                ) : selectedOption === "upi" ? (
                  <div>
                    <LabelInputContainer>
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input
                        id="upi-id"
                        name="upi-id"
                        type="text"
                        placeholder="Enter your UPI ID"
                      />
                      <Button variant="link" className="w-fit">
                        Verify
                      </Button>
                    </LabelInputContainer>
                  </div>
                ) : selectedOption === "wallet" ? (
                  <div>
                    <LabelInputContainer>
                      <Label htmlFor="registered-number">
                        Paytm Registered Mobile Number
                      </Label>
                      <Input
                        id="registered-number"
                        name="registered-number"
                        type="text"
                        placeholder="Registered Mobile Number"
                      />
                      <Button variant="link" className="w-fit">
                        Verify
                      </Button>
                    </LabelInputContainer>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-2 p-4 rounded-lg bg-blue-100 ">
                <Clock className="w-4 h-4 text-blue-500" />
                <p className="text-sm text-blue-500">
                  Estimated processing time: 1-2 business days
                </p>
              </div>

              <Separator />

              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Submit Withdrawal Request
              </Button>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="flex md:flex-row flex-col justify-between items-center gap-6">
          <div className="w-full flex items-center p-4 rounded-lg border gap-4">
            <Landmark className="w-8 h-8 p-1.5 rounded-full bg-blue-100 text-blue-600" />
            <span className="flex flex-col gap-0.5">
              <p className="text-sm">Bank Transfer</p>
              <p className="font-semibold text-sm">XXXX-4589</p>
            </span>
          </div>
          <div className="w-full flex items-center p-4 rounded-lg border gap-4">
            <QrCode className="w-8 h-8 p-1.5 rounded-full bg-purple-100 text-purple-600" />
            <span className="flex flex-col gap-0.5">
              <p className="text-sm">UPI</p>
              <p className="font-semibold text-sm">user@upi</p>
            </span>
          </div>
          <div className="w-full flex items-center p-4 rounded-lg border gap-4">
            <Wallet className="w-8 h-8 p-1.5 rounded-full bg-orange-100 text-orange-600" />
            <span className="flex flex-col gap-0.5">
              <p className="text-sm">Paytm Wallet</p>
              <p className="font-semibold text-sm">+91 98765XXXXX</p>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

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
