import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface Product {
  stock: string;
  img: string;
  name: string;
  category: string;
  discount: number;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="relative p-4">
      {/* Checkbox and Stock Badge */}
      <div className="flex justify-between items-center gap-2">
        <Checkbox />
        <Badge
          className={`${
            product.stock.toLowerCase().includes("out")
              ? "bg-red-500"
              : product.stock.toLowerCase().includes("low")
              ? "bg-yellow-500"
              : "bg-green-500"
          } text-white`}
        >
          {product.stock}
        </Badge>
      </div>

      {/* Product Image */}
      <CardContent className="flex justify-center p-0 md:p-6 md:pt-0">
        <Image
          src={product.img}
          alt={product.name}
          className="object-contain rounded-md"
          width={128}
          height={128}
        />
      </CardContent>

      {/* Product Details */}
      <div className="">
        <h3 className="text-base font-medium truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 capitalize mb-2">
          {product.category}
        </p>
        <p className="text-md font-semibold text-primary">
          ₹{product.discount}
        </p>
      </div>
    </Card>
  );
}
