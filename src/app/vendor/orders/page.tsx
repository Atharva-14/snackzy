"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns, Order } from "./columns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronsUp,
  Clock,
  Loader2,
  Settings,
  ShoppingCart,
  Truck,
  Undo,
} from "lucide-react";

async function getData(): Promise<Order[]> {
  // Fetch data from your API here.
  return [
    {
      id: "ORD001",
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 9876543210",
        address: "123, Green Street, New Delhi, India",
      },
      products: [
        {
          productId: "P001",
          productName: "Lay's Classic Salted Potato Chips",
          image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-1021,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/9a5a3c22-12a0-401c-9a79-732caa958540/Lay-s-Classic-Salted-Potato-Chips.jpeg",
          batchId: "BATCH_P001_1",
          quantity: 3,
          basePrice: 1234,
          discount: 30,
          expiryDate: "2025-04-02",
        },
        {
          productId: "P002",
          productName: "Coca Cola (750ml)",
          image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/e8143a5e-6cc5-45ce-ab5f-a60754dc087d/Coca-Cola-Soft-Drink.jpeg",
          batchId: "BATCH_P002_1",
          quantity: 3,
          basePrice: 123,
          discount: 30,
          expiryDate: "2025-04-02",
        },
        {
          productId: "P003",
          productName: "Kellogg's Chocos Fills Double Chocolaty (250g)",
          image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/7a6a1ca4-38b9-47a0-b8d9-31c5b2b11a00/Kellogg-s-Chocos-Fills-Double-Chocolaty.jpeg",
          batchId: "BATCH_P003_1",
          quantity: 3,
          basePrice: 123,
          discount: 30,
          expiryDate: "2025-04-02",
        },
        {
          productId: "P004",
          productName: "Cadbury Dairy Milk Silk (150g)",
          image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/f48e6a34-c417-4dac-9694-ab1f51b5c87e/Cadbury-Dairy-Milk-Silk-Chocolate-Bar.jpeg",
          batchId: "BATCH_P004_1",
          quantity: 3,
          basePrice: 123,
          discount: 30,
          expiryDate: "2025-04-02",
        },
      ],
      totalAmount: 2210,
      paymentStatus: "paid",
      orderStatus: "pending",
      createdAt: "2025-03-28T10:30:00Z",
      updatedAt: "2025-03-28T10:30:00Z",
      deliveryMethod: "shipping",
      expiryPriority: "high",
      notes: "Deliver before 6 PM",
    },
    {
      id: "ORD002",
      customer: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+91 8765432109",
        address: "456, Blue Lane, Mumbai, India",
      },
      products: [
        {
          productId: "P005",
          productName: "Pepsi Can (300ml)",
          image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/7ab8e116-1359-4001-95b6-145a81c2b15c/Pepsi-Soft-Drink.jpg",
          batchId: "BATCH_P005_1",
          quantity: 2,
          basePrice: 50,
          discount: 20,
          expiryDate: "2025-04-05",
        },
        {
          productId: "P006",
          productName: "Unibic Chocolate Chip Cookies (500g)",
          image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/8d181f98-4112-4ee8-a4fc-6b02e3f227e0/UNIBIC-Choco-Chip-Cookies.jpeg",
          batchId: "BATCH_P006_1",
          quantity: 1,
          basePrice: 100,
          discount: 15,
          expiryDate: "2025-04-05",
        },
      ],
      totalAmount: 135,
      paymentStatus: "cod",
      orderStatus: "processing",
      createdAt: "2025-03-29T14:45:00Z",
      updatedAt: "2025-03-29T14:45:00Z",
      deliveryMethod: "pickup",
      expiryPriority: "medium",
      notes: "Customer will pick up at 5 PM",
    },
    {
      id: "ORD003",
      customer: {
        name: "Ravi Kumar",
        email: "ravi.kumar@example.com",
        phone: "+91 9988776655",
        address: "789, Sunset Boulevard, Hyderabad, India",
      },
      products: [
        {
          productId: "P007",
          productName: "Haldiram's Bhujia (1kg)",
          image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/1702641e-6a87-434c-a44e-674517443820/Haldiram-s-Bhujia.jpeg",
          batchId: "BATCH_P007_1",
          quantity: 1,
          basePrice: 250,
          discount: 10,
          expiryDate: "2025-04-10",
        },
        {
          productId: "P008",
          productName: "Maaza Mango Drink (1.2L)",
          image:
            "https://cdn.zeptonow.com/production/ik-seo/tr:w-1000,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/b0598371-80ed-4992-a003-3cb1799a8b3f/Maaza-Mango-Fruit-Drink.jpeg",
          batchId: "BATCH_P008_1",
          quantity: 2,
          basePrice: 60,
          discount: 25,
          expiryDate: "2025-04-10",
        },
      ],
      totalAmount: 145,
      paymentStatus: "paid",
      orderStatus: "delivered",
      createdAt: "2025-04-01T09:00:00Z",
      updatedAt: "2025-04-01T12:00:00Z",
      deliveryMethod: "shipping",
      expiryPriority: "low",
      notes: "Delivered on time",
    },
  ];
}

const Page = () => {
  const [products, setProducts] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await getData();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <Loader2 className="w-6 h-6 animate-spin text-primary" />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
        {/* Total Orders Today */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex space-between items-center">
              <h1 className="w-full text-gray-500">Total Orders Today</h1>
              <p className="px-1 py-2">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-2xl font-semibold">156</p>
          </CardContent>
          <CardFooter>
            <p className="flex items-center text-sm font-medium text-emerald-600">
              <ChevronsUp className="w-4 h-4" />
              12% from yesterday
            </p>
          </CardFooter>
        </Card>

        {/* Pending Orders */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex space-between items-center">
              <h1 className="w-full text-gray-500">Pending Orders</h1>
              <p className="px-1 py-2">
                <Clock className="w-6 h-6 text-orange-600" />
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-2xl font-semibold">43</p>
          </CardContent>
          <CardFooter>
            <p className="flex text-gray-500 text-sm font-medium">
              Needs attention
            </p>
          </CardFooter>
        </Card>

        {/* Processing */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex space-between items-center">
              <h1 className="w-full text-gray-500">Processing</h1>
              <p className="px-1 py-2">
                <Settings className="w-6 h-6 text-violet-600" />
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-2xl font-semibold">28</p>
          </CardContent>
          <CardFooter>
            <p className="flex text-gray-500 text-sm font-medium">
              In progress
            </p>
          </CardFooter>
        </Card>

        {/* Shipped */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex space-between items-center">
              <h1 className="w-full text-gray-500">Shipped</h1>
              <p className="px-1 py-2">
                <Truck className="w-6 h-6 text-green-600" />
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-2xl font-semibold">72</p>
          </CardContent>
          <CardFooter>
            <p className="flex text-gray-500 text-sm font-medium">On the way</p>
          </CardFooter>
        </Card>

        {/* Returned */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex space-between items-center">
              <h1 className="w-full text-gray-500">Returned</h1>
              <p className="px-1 py-2">
                <Undo className="w-6 h-6 text-red-600" />
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-2xl font-semibold">13</p>
          </CardContent>
          <CardFooter>
            <p className="flex text-red-500 text-sm font-medium">
              Action required
            </p>
          </CardFooter>
        </Card>
      </div>

      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default Page;
