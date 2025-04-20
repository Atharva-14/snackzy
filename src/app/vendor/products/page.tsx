"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Package2, TriangleAlert } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { Products } from "@/types/Product";

async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "P001",
      name: "Lays Classic Salted",
      category: "snacks",
      description: "Crispy, salty potato chips perfect for snacking.",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-640,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/595808a8-7204-4b09-b167-631ebd3815f7/Lay-s-Classic-Salted-Potato-Chips.jpeg",
      status: "active",
      batches: [
        {
          batchId: "B001",
          quantity: 50,
          expiryDate: "2025-06-15",
          basePrice: 40,
          discount: 10,
        },{
          batchId: "B002",
          quantity: 50,
          expiryDate: "2025-06-15",
          basePrice: 40,
          discount: 10,
        }
      ],
    },
    {
      id: "P002",
      name: "Coca-Cola",
      category: "beverages",
      description: "Classic Coca-Cola soft drink, refreshing and bubbly.",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/e8143a5e-6cc5-45ce-ab5f-a60754dc087d/Coca-Cola-Soft-Drink.jpeg",
      status: "active",
      batches: [
        {
          batchId: "B002",
          quantity: 10,
          expiryDate: "2024-12-31",
          basePrice: 40,
          discount: 15,
        },
      ],
    },
    {
      id: "P003",
      name: "Cornetto Double Chocolate",
      category: "icecream",
      description: "Delicious chocolate ice cream with a crunchy cone.",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/c285a717-d886-411e-a844-a2da01186c14/Kwality-Wall-s-Cornetto-Double-Chocolate.jpeg",
      status: "active",
      batches: [
        {
          batchId: "B003",
          quantity: 60,
          expiryDate: "2024-10-05",
          basePrice: 40,
          discount: 15,
        },
      ],
    },
    {
      id: "P004",
      name: "Dairy Milk Silk",
      category: "chocolates",
      description: "Smooth and creamy Dairy Milk Silk chocolate.",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/f48e6a34-c417-4dac-9694-ab1f51b5c87e/Cadbury-Dairy-Milk-Silk-Chocolate-Bar.jpeg",
      status: "inactive",
      batches: [
        {
          batchId: "B004",
          quantity: 0,
          expiryDate: "2025-02-20",
          basePrice: 40,
          discount: 20,
        },
      ],
    },
    {
      id: "P005",
      name: "Oreo Biscuit",
      category: "snacks",
      description: "Chocolate-flavored biscuits filled with creamy goodness.",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1100,ar-1100-1100,pr-true,f-auto,q-80/cms/product_variant/f1595b06-f739-4790-9dcb-8523055cb5fb/Cadbury-Oreo-Chocolate-Flavour-Cr-me-Sandwich-Biscuit.jpeg",
      status: "active",
      batches: [
        {
          batchId: "B005",
          quantity: 40,
          expiryDate: "2025-04-10",
          basePrice: 40,
          discount: 18,
        },
      ],
    },
    {
      id: "P006",
      name: "Pepsi",
      category: "beverages",
      description: "A refreshing Pepsi soft drink, perfect for any occasion.",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/4c8b713f-1622-482d-91a8-50ee4f1f6a52/Pepsi-Soft-Drink.jpeg",
      status: "active",
      batches: [
        {
          batchId: "B006",
          quantity: 40,
          expiryDate: "2024-11-30",
          basePrice: 40,
          discount: 12,
        },
      ],
    },
    {
      id: "P007",
      name: "Magnum Almond",
      category: "icecream",
      description: "Rich ice cream with almond coating and a crunchy shell.",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-5000-5000,pr-true,f-auto,q-80/cms/product_variant/dcbd523e-a540-40cd-819e-26488650ba51/Kwality-Wall-s-Magnum-Almond-Ice-Cream-Stick.jpeg",
      status: "active",
      batches: [
        {
          batchId: "B007",
          quantity: 2,
          expiryDate: "2024-09-25",
          basePrice: 40,
          discount: 18,
        },
      ],
    },
    {
      id: "P008",
      name: "KitKat",
      category: "chocolates",
      description: "Crispy wafer covered in smooth milk chocolate.",
      image:
        "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/534a2eac-c0db-472c-926b-a8d535324ad9/KitKat-Grand-Break-4-Fingers-Chocolate-Coated-Wafer-38-5-g-Combo.jpeg",
      status: "active",
      batches: [
        {
          batchId: "B008",
          quantity: 60,
          expiryDate: "2025-07-12",
          basePrice: 40,
          discount: 10,
        },
      ],
    },
  ];
}

// const sampleData = [
//   {
//     id: "P001",
//     name: "Lays Classic Salted",
//     category: "snacks",
//     description: "Crispy, salty potato chips perfect for snacking.",
//     image:
//       "https://cdn.zeptonow.com/production/ik-seo/tr:w-640,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/595808a8-7204-4b09-b167-631ebd3815f7/Lay-s-Classic-Salted-Potato-Chips.jpeg",
//     status: "active",
//     batches: [
//       {
//         batchId: "B001",
//         quantity: 50,
//         expiryDate: "2025-06-15",
//         basePrice: 40,
//         discount: 10,
//       },
//     ],
//   },
//   {
//     id: "P002",
//     name: "Coca-Cola",
//     category: "beverages",
//     description: "Classic Coca-Cola soft drink, refreshing and bubbly.",
//     image:
//       "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/e8143a5e-6cc5-45ce-ab5f-a60754dc087d/Coca-Cola-Soft-Drink.jpeg",
//     status: "active",
//     batches: [
//       {
//         batchId: "B002",
//         quantity: 10,
//         expiryDate: "2024-12-31",
//         basePrice: 40,
//         discount: 15,
//       },
//     ],
//   },
//   {
//     id: "P003",
//     name: "Cornetto Double Chocolate",
//     category: "icecream",
//     description: "Delicious chocolate ice cream with a crunchy cone.",
//     image:
//       "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/c285a717-d886-411e-a844-a2da01186c14/Kwality-Wall-s-Cornetto-Double-Chocolate.jpeg",
//     status: "active",
//     batches: [
//       {
//         batchId: "B003",
//         quantity: 60,
//         expiryDate: "2024-10-05",
//         basePrice: 40,
//         discount: 15,
//       },
//     ],
//   },
//   {
//     id: "P004",
//     name: "Dairy Milk Silk",
//     category: "chocolates",
//     description: "Smooth and creamy Dairy Milk Silk chocolate.",
//     image:
//       "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/f48e6a34-c417-4dac-9694-ab1f51b5c87e/Cadbury-Dairy-Milk-Silk-Chocolate-Bar.jpeg",
//     status: "inactive",
//     batches: [
//       {
//         batchId: "B004",
//         quantity: 0,
//         expiryDate: "2025-02-20",
//         basePrice: 40,
//         discount: 20,
//       },
//     ],
//   },
//   {
//     id: "P005",
//     name: "Oreo Biscuit",
//     category: "snacks",
//     description: "Chocolate-flavored biscuits filled with creamy goodness.",
//     image:
//       "https://cdn.zeptonow.com/production/ik-seo/tr:w-1100,ar-1100-1100,pr-true,f-auto,q-80/cms/product_variant/f1595b06-f739-4790-9dcb-8523055cb5fb/Cadbury-Oreo-Chocolate-Flavour-Cr-me-Sandwich-Biscuit.jpeg",
//     status: "active",
//     batches: [
//       {
//         batchId: "B005",
//         quantity: 40,
//         expiryDate: "2025-04-10",
//         basePrice: 40,
//         discount: 18,
//       },
//     ],
//   },
//   {
//     id: "P006",
//     name: "Pepsi",
//     category: "beverages",
//     description: "A refreshing Pepsi soft drink, perfect for any occasion.",
//     image:
//       "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/4c8b713f-1622-482d-91a8-50ee4f1f6a52/Pepsi-Soft-Drink.jpeg",
//     status: "active",
//     batches: [
//       {
//         batchId: "B006",
//         quantity: 40,
//         expiryDate: "2024-11-30",
//         basePrice: 40,
//         discount: 12,
//       },
//     ],
//   },
//   {
//     id: "P007",
//     name: "Magnum Almond",
//     category: "icecream",
//     description: "Rich ice cream with almond coating and a crunchy shell.",
//     image:
//       "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-5000-5000,pr-true,f-auto,q-80/cms/product_variant/dcbd523e-a540-40cd-819e-26488650ba51/Kwality-Wall-s-Magnum-Almond-Ice-Cream-Stick.jpeg",
//     status: "active",
//     batches: [
//       {
//         batchId: "B007",
//         quantity: 2,
//         expiryDate: "2024-09-25",
//         basePrice: 40,
//         discount: 18,
//       },
//     ],
//   },
//   {
//     id: "P008",
//     name: "KitKat",
//     category: "chocolates",
//     description: "Crispy wafer covered in smooth milk chocolate.",
//     image:
//       "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/534a2eac-c0db-472c-926b-a8d535324ad9/KitKat-Grand-Break-4-Fingers-Chocolate-Coated-Wafer-38-5-g-Combo.jpeg",
//     status: "active",
//     batches: [
//       {
//         batchId: "B008",
//         quantity: 60,
//         expiryDate: "2025-07-12",
//         basePrice: 40,
//         discount: 10,
//       },
//     ],
//   },
// ];

const Page = () => {
  const [products, setProducts] = useState<Products[]>([]);
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
      {/* Alert Div */}
      <div className="space-y-4">
        <Alert variant="warning">
          <Package2 className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            8 products are running low on stock
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Danger</AlertTitle>
          <AlertDescription>
            5 products are expiring in the next 3 days
          </AlertDescription>
        </Alert>
      </div>

      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default Page;
