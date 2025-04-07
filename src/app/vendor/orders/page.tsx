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
        // Add the appropriate amount value here
      },
      products: [
        {
          product: {
            id: "P001",
            amount: 123,
            name: "Lay's Classic Salted Potato Chips",
            category: "snacks",
            stock: "50",
            expiryDate: "2025-04-02",
            discount: 30,
            img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1021,ar-1021-1021,pr-true,f-auto,q-80/cms/product_variant/9a5a3c22-12a0-401c-9a79-732caa958540/Lay-s-Classic-Salted-Potato-Chips.jpeg",
          },
          quantity: 3,
        },
        {
          product: {
            id: "P002",
            amount: 123,
            name: "Coca Cola (750ml)",
            category: "beverages",
            stock: "50",
            expiryDate: "2025-04-02",
            discount: 30,
            img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/e8143a5e-6cc5-45ce-ab5f-a60754dc087d/Coca-Cola-Soft-Drink.jpeg",
          },
          quantity: 3,
        },
        {
          product: {
            id: "P003",
            amount: 123,
            name: "Kellogg's Chocos Fills Double Chocolaty (250g)",
            category: "snacks",
            stock: "50",
            expiryDate: "2025-04-02",
            discount: 30,
            img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/7a6a1ca4-38b9-47a0-b8d9-31c5b2b11a00/Kellogg-s-Chocos-Fills-Double-Chocolaty.jpeg",
          },
          quantity: 3,
        },
        {
          product: {
            id: "P004",
            amount: 123,
            name: "Cadbury Dairy Milk Silk (150g)",
            category: "chocolates",
            stock: "50",
            expiryDate: "2025-04-02",
            discount: 30,
            img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/f48e6a34-c417-4dac-9694-ab1f51b5c87e/Cadbury-Dairy-Milk-Silk-Chocolate-Bar.jpeg",
          },
          quantity: 3,
        },
      ],
      totalAmount: 210,
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
        phone: "+91 9988776655",
        address: "456, Blue Lane, Mumbai, India",
      },
      products: [
        {
          product: {
            id: "P002",
            amount: 123,
            name: "Cold Drink (500ml)",
            category: "beverages",
            stock: "30",
            expiryDate: "2025-04-08",
            discount: 20,
            img: "drink.jpg",
          },
          quantity: 5,
        },
      ],
      totalAmount: 500,
      paymentStatus: "cod",
      orderStatus: "processing",
      createdAt: "2025-03-27T14:00:00Z",
      updatedAt: "2025-03-28T12:00:00Z",
      deliveryMethod: "pickup",
      expiryPriority: "medium",
    },
    {
      id: "ORD003",
      customer: {
        name: "Mark Lee",
        email: "mark.lee@example.com",
        phone: "+91 9123456789",
        address: "789, Yellow Road, Bangalore, India",
      },
      products: [
        {
          product: {
            id: "P003",
            amount: 123,
            name: "Chocolate Bar (Dark)",
            category: "chocolates",
            stock: "100",
            expiryDate: "2025-04-15",
            discount: 10,
            img: "chocolate.jpg",
          },
          quantity: 2,
        },
      ],
      totalAmount: 180,
      paymentStatus: "paid",
      orderStatus: "shipped",
      createdAt: "2025-03-26T08:45:00Z",
      updatedAt: "2025-03-28T09:30:00Z",
      deliveryMethod: "shipping",
      expiryPriority: "low",
    },
    {
      id: "ORD004",
      customer: {
        name: "Sarah Connor",
        email: "sarah.connor@example.com",
        phone: "+91 9876543211",
        address: "112, Terminator Street, Chennai, India",
      },
      products: [
        {
          product: {
            id: "P004",
            amount: 123,
            name: "Ice Cream (Vanilla, 500ml)",
            category: "icecream",
            stock: "25",
            expiryDate: "2025-04-04",
            discount: 40,
            img: "icecream.jpg",
          },
          quantity: 2,
        },
      ],
      totalAmount: 300,
      paymentStatus: "paid",
      orderStatus: "delivered",
      createdAt: "2025-03-25T12:20:00Z",
      updatedAt: "2025-03-27T15:45:00Z",
      deliveryMethod: "shipping",
      expiryPriority: "high",
    },
    {
      id: "ORD005",
      customer: {
        name: "Amit Kumar",
        email: "amit.kumar@example.com",
        phone: "+91 9234567890",
        address: "321, Tech Park, Pune, India",
      },
      products: [
        {
          product: {
            id: "P005",
            amount: 123,
            name: "Orange Juice (1L)",
            category: "beverages",
            stock: "40",
            expiryDate: "2025-04-10",
            discount: 25,
            img: "juice.jpg",
          },
          quantity: 4,
        },
      ],
      totalAmount: 800,
      paymentStatus: "cod",
      orderStatus: "pending",
      createdAt: "2025-03-24T09:00:00Z",
      updatedAt: "2025-03-24T10:15:00Z",
      deliveryMethod: "pickup",
      expiryPriority: "medium",
    },
    {
      id: "ORD006",
      customer: {
        name: "Neha Sharma",
        email: "neha.sharma@example.com",
        phone: "+91 9345678901",
        address: "999, Fashion Street, Kolkata, India",
      },
      products: [
        {
          product: {
            id: "P006",
            amount: 123,
            name: "Salted Peanuts (200g)",
            category: "snacks",
            stock: "60",
            expiryDate: "2025-04-12",
            discount: 15,
            img: "peanuts.jpg",
          },
          quantity: 1,
        },
      ],
      totalAmount: 120,
      paymentStatus: "paid",
      orderStatus: "processing",
      createdAt: "2025-03-23T15:30:00Z",
      updatedAt: "2025-03-24T14:00:00Z",
      deliveryMethod: "shipping",
      expiryPriority: "low",
    },
    {
      id: "ORD007",
      customer: {
        name: "Rahul Singh",
        email: "rahul.singh@example.com",
        phone: "+91 9456789012",
        address: "777, Metro Road, Hyderabad, India",
      },
      products: [
        {
          product: {
            id: "P007",
            amount: 123,
            name: "Mango Ice Cream (500ml)",
            category: "icecream",
            stock: "20",
            expiryDate: "2025-04-05",
            discount: 35,
            img: "mango-icecream.jpg",
          },
          quantity: 3,
        },
      ],
      totalAmount: 450,
      paymentStatus: "cod",
      orderStatus: "shipped",
      createdAt: "2025-03-22T17:10:00Z",
      updatedAt: "2025-03-24T11:20:00Z",
      deliveryMethod: "pickup",
      expiryPriority: "high",
    },
    {
      id: "ORD008",
      customer: {
        name: "Priya Kapoor",
        email: "priya.kapoor@example.com",
        phone: "+91 9567890123",
        address: "666, Lotus Enclave, Jaipur, India",
      },
      products: [
        {
          product: {
            id: "P008",
            amount: 123,
            name: "Dark Chocolate Cookies",
            category: "chocolates",
            stock: "35",
            expiryDate: "2025-04-14",
            discount: 10,
            img: "cookies.jpg",
          },
          quantity: 2,
        },
      ],
      totalAmount: 250,
      paymentStatus: "paid",
      orderStatus: "delivered",
      createdAt: "2025-03-21T10:50:00Z",
      updatedAt: "2025-03-23T14:30:00Z",
      deliveryMethod: "shipping",
      expiryPriority: "low",
    },
    {
      id: "ORD011",
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 9876543210",
        address: "123, Green Street, New Delhi, India",
      },
      products: [
        {
          product: {
            id: "P001",
            amount: 123,
            name: "Potato Chips (Large)",
            category: "snacks",
            stock: "50",
            expiryDate: "2025-04-02",
            discount: 30,
            img: "chips.jpg",
          },
          quantity: 3,
        },
      ],
      totalAmount: 210,
      paymentStatus: "paid",
      orderStatus: "pending",
      createdAt: "2025-03-28T10:30:00Z",
      updatedAt: "2025-03-28T10:30:00Z",
      deliveryMethod: "shipping",
      expiryPriority: "high",
      notes: "Deliver before 6 PM",
    },
    {
      id: "ORD012",
      customer: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+91 9988776655",
        address: "456, Blue Lane, Mumbai, India",
      },
      products: [
        {
          product: {
            id: "P002",
            amount: 123,
            name: "Cold Drink (500ml)",
            category: "beverages",
            stock: "30",
            expiryDate: "2025-04-08",
            discount: 20,
            img: "drink.jpg",
          },
          quantity: 5,
        },
      ],
      totalAmount: 500,
      paymentStatus: "cod",
      orderStatus: "processing",
      createdAt: "2025-03-27T14:00:00Z",
      updatedAt: "2025-03-28T12:00:00Z",
      deliveryMethod: "pickup",
      expiryPriority: "medium",
    },
    {
      id: "ORD013",
      customer: {
        name: "Mark Lee",
        email: "mark.lee@example.com",
        phone: "+91 9123456789",
        address: "789, Yellow Road, Bangalore, India",
      },
      products: [
        {
          product: {
            id: "P003",
            amount: 123,
            name: "Chocolate Bar (Dark)",
            category: "chocolates",
            stock: "100",
            expiryDate: "2025-04-15",
            discount: 10,
            img: "chocolate.jpg",
          },
          quantity: 2,
        },
      ],
      totalAmount: 180,
      paymentStatus: "paid",
      orderStatus: "shipped",
      createdAt: "2025-03-26T08:45:00Z",
      updatedAt: "2025-03-28T09:30:00Z",
      deliveryMethod: "shipping",
      expiryPriority: "low",
    },
    {
      id: "ORD014",
      customer: {
        name: "Sarah Connor",
        email: "sarah.connor@example.com",
        phone: "+91 9876543211",
        address: "112, Terminator Street, Chennai, India",
      },
      products: [
        {
          product: {
            id: "P004",
            amount: 123,
            name: "Ice Cream (Vanilla, 500ml)",
            category: "icecream",
            stock: "25",
            expiryDate: "2025-04-04",
            discount: 40,
            img: "icecream.jpg",
          },
          quantity: 2,
        },
      ],
      totalAmount: 300,
      paymentStatus: "paid",
      orderStatus: "delivered",
      createdAt: "2025-03-25T12:20:00Z",
      updatedAt: "2025-03-27T15:45:00Z",
      deliveryMethod: "shipping",
      expiryPriority: "high",
    },
    {
      id: "ORD015",
      customer: {
        name: "Amit Kumar",
        email: "amit.kumar@example.com",
        phone: "+91 9234567890",
        address: "321, Tech Park, Pune, India",
      },
      products: [
        {
          product: {
            id: "P005",
            amount: 123,
            name: "Orange Juice (1L)",
            category: "beverages",
            stock: "40",
            expiryDate: "2025-04-10",
            discount: 25,
            img: "juice.jpg",
          },
          quantity: 4,
        },
      ],
      totalAmount: 800,
      paymentStatus: "cod",
      orderStatus: "pending",
      createdAt: "2025-03-24T09:00:00Z",
      updatedAt: "2025-03-24T10:15:00Z",
      deliveryMethod: "pickup",
      expiryPriority: "medium",
    },
    {
      id: "ORD016",
      customer: {
        name: "Neha Sharma",
        email: "neha.sharma@example.com",
        phone: "+91 9345678901",
        address: "999, Fashion Street, Kolkata, India",
      },
      products: [
        {
          product: {
            id: "P006",
            amount: 123,
            name: "Salted Peanuts (200g)",
            category: "snacks",
            stock: "60",
            expiryDate: "2025-04-12",
            discount: 15,
            img: "peanuts.jpg",
          },
          quantity: 1,
        },
      ],
      totalAmount: 120,
      paymentStatus: "paid",
      orderStatus: "processing",
      createdAt: "2025-03-23T15:30:00Z",
      updatedAt: "2025-03-24T14:00:00Z",
      deliveryMethod: "shipping",
      expiryPriority: "low",
    },
    {
      id: "ORD017",
      customer: {
        name: "Rahul Singh",
        email: "rahul.singh@example.com",
        phone: "+91 9456789012",
        address: "777, Metro Road, Hyderabad, India",
      },
      products: [
        {
          product: {
            id: "P007",
            amount: 123,
            name: "Mango Ice Cream (500ml)",
            category: "icecream",
            stock: "20",
            expiryDate: "2025-04-05",
            discount: 35,
            img: "mango-icecream.jpg",
          },
          quantity: 3,
        },
      ],
      totalAmount: 450,
      paymentStatus: "cod",
      orderStatus: "shipped",
      createdAt: "2025-03-22T17:10:00Z",
      updatedAt: "2025-03-24T11:20:00Z",
      deliveryMethod: "pickup",
      expiryPriority: "high",
    },
    {
      id: "ORD018",
      customer: {
        name: "Priya Kapoor",
        email: "priya.kapoor@example.com",
        phone: "+91 9567890123",
        address: "666, Lotus Enclave, Jaipur, India",
      },
      products: [
        {
          product: {
            id: "P008",
            amount: 123,
            name: "Dark Chocolate Cookies",
            category: "chocolates",
            stock: "35",
            expiryDate: "2025-04-14",
            discount: 10,
            img: "cookies.jpg",
          },
          quantity: 2,
        },
      ],
      totalAmount: 250,
      paymentStatus: "paid",
      orderStatus: "delivered",
      createdAt: "2025-03-21T10:50:00Z",
      updatedAt: "2025-03-23T14:30:00Z",
      deliveryMethod: "shipping",
      expiryPriority: "low",
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
