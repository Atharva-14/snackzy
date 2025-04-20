"use client";
import React, { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Clock, Plus, Trash2 } from "lucide-react";
import { cn } from "@/libs/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DatePickerWithPresets } from "./DatePicker";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import Image from "next/image";

const commonProducts = [
  {
    id: "P001",
    name: "Lays Classic Salted",
    category: "snacks",
    stock: "In Stock (50)",
    expiryDate: "2025-06-15",
    discount: 10,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-640,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/595808a8-7204-4b09-b167-631ebd3815f7/Lay-s-Classic-Salted-Potato-Chips.jpeg",
  },
  {
    id: "P002",
    name: "Coca-Cola",
    category: "beverages",
    stock: "Low Stock (10)",
    expiryDate: "2024-12-31",
    discount: 15,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/e8143a5e-6cc5-45ce-ab5f-a60754dc087d/Coca-Cola-Soft-Drink.jpeg",
  },
  {
    id: "P003",
    name: "Cornetto Double Chocolate",
    category: "icecream",
    stock: "In Stock (60)",
    expiryDate: "2024-10-05",
    discount: 15,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/c285a717-d886-411e-a844-a2da01186c14/Kwality-Wall-s-Cornetto-Double-Chocolate.jpeg",
  },
  {
    id: "P004",
    name: "Dairy Milk Silk",
    category: "chocolates",
    stock: "Out of Stock (0)",
    expiryDate: "2025-02-20",
    discount: 20,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/f48e6a34-c417-4dac-9694-ab1f51b5c87e/Cadbury-Dairy-Milk-Silk-Chocolate-Bar.jpeg",
  },
  {
    id: "P005",
    name: "Oreo Biscuit",
    category: "snacks",
    stock: "In Stock (40)",
    expiryDate: "2025-04-10",
    discount: 18,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1100,ar-1100-1100,pr-true,f-auto,q-80/cms/product_variant/f1595b06-f739-4790-9dcb-8523055cb5fb/Cadbury-Oreo-Chocolate-Flavour-Cr-me-Sandwich-Biscuit.jpeg",
  },
  {
    id: "P006",
    name: "Pepsi",
    category: "beverages",
    stock: "In Stock (40)",
    expiryDate: "2024-11-30",
    discount: 12,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/4c8b713f-1622-482d-91a8-50ee4f1f6a52/Pepsi-Soft-Drink.jpeg",
  },
  {
    id: "P007",
    name: "Magnum Almond",
    category: "icecream",
    stock: "Low Stock (2)",
    expiryDate: "2024-09-25",
    discount: 18,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-5000-5000,pr-true,f-auto,q-80/cms/product_variant/dcbd523e-a540-40cd-819e-26488650ba51/Kwality-Wall-s-Magnum-Almond-Ice-Cream-Stick.jpeg",
  },
  {
    id: "P008",
    name: "KitKat",
    category: "chocolates",
    stock: "In Stock (60)",
    expiryDate: "2025-07-12",
    discount: 10,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/534a2eac-c0db-472c-926b-a8d535324ad9/KitKat-Grand-Break-4-Fingers-Chocolate-Coated-Wafer-38-5-g-Combo.jpeg",
  },
  {
    id: "P0011",
    name: "Lays Classic Salted",
    category: "snacks",
    stock: "In Stock (50)",
    expiryDate: "2025-06-15",
    discount: 10,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-640,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/595808a8-7204-4b09-b167-631ebd3815f7/Lay-s-Classic-Salted-Potato-Chips.jpeg",
  },
  {
    id: "P0012",
    name: "Coca-Cola",
    category: "beverages",
    stock: "Low Stock (10)",
    expiryDate: "2024-12-31",
    discount: 15,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/e8143a5e-6cc5-45ce-ab5f-a60754dc087d/Coca-Cola-Soft-Drink.jpeg",
  },
  {
    id: "P0013",
    name: "Cornetto Double Chocolate",
    category: "icecream",
    stock: "In Stock (60)",
    expiryDate: "2024-10-05",
    discount: 15,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/c285a717-d886-411e-a844-a2da01186c14/Kwality-Wall-s-Cornetto-Double-Chocolate.jpeg",
  },
  {
    id: "P0014",
    name: "Dairy Milk Silk",
    category: "chocolates",
    stock: "Out of Stock (0)",
    expiryDate: "2025-02-20",
    discount: 20,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/f48e6a34-c417-4dac-9694-ab1f51b5c87e/Cadbury-Dairy-Milk-Silk-Chocolate-Bar.jpeg",
  },
  {
    id: "P0015",
    name: "Oreo Biscuit",
    category: "snacks",
    stock: "In Stock (40)",
    expiryDate: "2025-04-10",
    discount: 18,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1100,ar-1100-1100,pr-true,f-auto,q-80/cms/product_variant/f1595b06-f739-4790-9dcb-8523055cb5fb/Cadbury-Oreo-Chocolate-Flavour-Cr-me-Sandwich-Biscuit.jpeg",
  },
  {
    id: "P0016",
    name: "Pepsi",
    category: "beverages",
    stock: "In Stock (40)",
    expiryDate: "2024-11-30",
    discount: 12,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/4c8b713f-1622-482d-91a8-50ee4f1f6a52/Pepsi-Soft-Drink.jpeg",
  },
  {
    id: "P0017",
    name: "Magnum Almond",
    category: "icecream",
    stock: "Low Stock (2)",
    expiryDate: "2024-09-25",
    discount: 18,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-5000-5000,pr-true,f-auto,q-80/cms/product_variant/dcbd523e-a540-40cd-819e-26488650ba51/Kwality-Wall-s-Magnum-Almond-Ice-Cream-Stick.jpeg",
  },
  {
    id: "P0018",
    name: "KitKat",
    category: "chocolates",
    stock: "In Stock (60)",
    expiryDate: "2025-07-12",
    discount: 10,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/534a2eac-c0db-472c-926b-a8d535324ad9/KitKat-Grand-Break-4-Fingers-Chocolate-Coated-Wafer-38-5-g-Combo.jpeg",
  },
  {
    id: "P0021",
    name: "Lays Classic Salted",
    category: "snacks",
    stock: "In Stock (50)",
    expiryDate: "2025-06-15",
    discount: 10,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-640,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/595808a8-7204-4b09-b167-631ebd3815f7/Lay-s-Classic-Salted-Potato-Chips.jpeg",
  },
  {
    id: "P0022",
    name: "Coca-Cola",
    category: "beverages",
    stock: "Low Stock (10)",
    expiryDate: "2024-12-31",
    discount: 15,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/e8143a5e-6cc5-45ce-ab5f-a60754dc087d/Coca-Cola-Soft-Drink.jpeg",
  },
  {
    id: "P0023",
    name: "Cornetto Double Chocolate",
    category: "icecream",
    stock: "In Stock (60)",
    expiryDate: "2024-10-05",
    discount: 15,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/c285a717-d886-411e-a844-a2da01186c14/Kwality-Wall-s-Cornetto-Double-Chocolate.jpeg",
  },
  {
    id: "P0024",
    name: "Dairy Milk Silk",
    category: "chocolates",
    stock: "Out of Stock (0)",
    expiryDate: "2025-02-20",
    discount: 20,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/f48e6a34-c417-4dac-9694-ab1f51b5c87e/Cadbury-Dairy-Milk-Silk-Chocolate-Bar.jpeg",
  },
  {
    id: "P0025",
    name: "Oreo Biscuit",
    category: "snacks",
    stock: "In Stock (40)",
    expiryDate: "2025-04-10",
    discount: 18,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1100,ar-1100-1100,pr-true,f-auto,q-80/cms/product_variant/f1595b06-f739-4790-9dcb-8523055cb5fb/Cadbury-Oreo-Chocolate-Flavour-Cr-me-Sandwich-Biscuit.jpeg",
  },
  {
    id: "P0026",
    name: "Pepsi",
    category: "beverages",
    stock: "In Stock (40)",
    expiryDate: "2024-11-30",
    discount: 12,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1200,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/4c8b713f-1622-482d-91a8-50ee4f1f6a52/Pepsi-Soft-Drink.jpeg",
  },
  {
    id: "P0027",
    name: "Magnum Almond",
    category: "icecream",
    stock: "Low Stock (2)",
    expiryDate: "2024-09-25",
    discount: 18,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-5000-5000,pr-true,f-auto,q-80/cms/product_variant/dcbd523e-a540-40cd-819e-26488650ba51/Kwality-Wall-s-Magnum-Almond-Ice-Cream-Stick.jpeg",
  },
  {
    id: "P0028",
    name: "KitKat",
    category: "chocolates",
    stock: "In Stock (60)",
    expiryDate: "2025-07-12",
    discount: 10,
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/534a2eac-c0db-472c-926b-a8d535324ad9/KitKat-Grand-Break-4-Fingers-Chocolate-Coated-Wafer-38-5-g-Combo.jpeg",
  },
];

const itemsPerPage = 12; // Adjust number of items per page

interface AddNewProductProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewProduct: React.FC<AddNewProductProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    img: "https://cdn.zeptonow.com/production/ik-seo/tr:w-640,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/595808a8-7204-4b09-b167-631ebd3815f7/Lay-s-Classic-Salted-Potato-Chips.jpeg",
    quantity: "",
    price: "",
    expiryDate: "",
    discount: 0,
    status: false,
  });

  const totalPages = Math.ceil(commonProducts.length / itemsPerPage);

  const currentProducts = commonProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExpiryDateChange = (date: string) => {
    const discount = calculateDiscount(date);
    setFormData((prev) => ({
      ...prev,
      expiryDate: date,
      discount,
    }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData({ ...formData, discount: value[0] });
  };

  const calculateRemainingDays = (expiryDate: string) => {
    if (!expiryDate) return "No date selected";

    const expiry = new Date(expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffInMins = expiry.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMins / (1000 * 60 * 60 * 24));

    return diffInDays >= 0
      ? `Expires in ${diffInDays} days`
      : "Date has passed";
  };

  const calculateDiscount = (expiryDate: string) => {
    if (!expiryDate) return 0;

    const expiry = new Date(expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffInMins = expiry.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMins / (1000 * 60 * 60 * 24));

    if (diffInDays > 30) return 10;
    else if (diffInDays >= 15) return 10;
    else if (diffInDays >= 7) return 20;
    else if (diffInDays >= 1) return 40;
    else return 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] h-[95vh] max-w-none rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-8 py-4">
          {/* Quick Product Add */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Add Common Products</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </CardContent>

            <div className="flex justify-center items-center gap-4 p-4">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <ChevronLeft className="h-5 w-5" /> Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>

          <h2 className="text-xl font-semibold">Add Product Manually</h2>

          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-8 ">
            {/* Add Product Form */}

            <div className="md:w-3/4 flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>

                <CardContent>
                  <LabelInputContainer className="mb-4">
                    <Label className="font-base">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Coca-Cola Soft Drink 500 ml"
                      type="text"
                      required
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label className="font-base">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Soft Drinks"
                      type="text"
                      required
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label className="font-base">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your product..."
                      rows={5}
                      required
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="image" className="font-base">
                      Product Image
                    </Label>
                    <Input id="image" name="image" type="file" required />
                  </LabelInputContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row space-y-0 justify-between items-center">
                  <CardTitle className="w-fit">Batch Management</CardTitle>
                  <Button
                    variant="ghost"
                    className="w-fit text-blue-600 hover:text-blue-700"
                  >
                    <Plus /> Add New Batch
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-neutral-100">
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                      <LabelInputContainer>
                        <Label className="font-base">Base Price (₹)</Label>
                        <Input
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="Price"
                          type="text"
                          required
                        />
                      </LabelInputContainer>
                      <LabelInputContainer>
                        <Label className="font-base">Stock Quantity</Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder="Stock Quantity"
                          type="text"
                          required
                        />
                      </LabelInputContainer>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                      <LabelInputContainer>
                        <Label className="font-base">Expiry Date</Label>
                        <DatePickerWithPresets
                          date={formData.expiryDate}
                          onDateChange={handleExpiryDateChange}
                        />
                      </LabelInputContainer>
                      <LabelInputContainer>
                        <div className="flex justify-between items-center">
                          <Label className="font-base">Smart Discount</Label>
                          <Badge
                            className="bg-blue-100 text-blue-600 hover:bg-blue-100"
                            variant="secondary"
                          >
                            Auto-calculated
                          </Badge>
                        </div>
                        <span className="w-full flex justify-between items-center space-x-4">
                          <Slider
                            value={[formData.discount]} // Ensure slider value is controlled by state
                            onValueChange={(value) => handleSliderChange(value)}
                            min={0}
                            max={50} // Set an appropriate max discount value
                            step={1}
                            className="flex-1"
                            disabled={true}
                          />
                          <p className="min-w-[50px] text-center p-1 font-semibold text-primary">
                            {formData.discount}%
                          </p>
                        </span>
                      </LabelInputContainer>
                    </div>
                    <span className="flex flex-col justify-between md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                      <p className="mt-2 text-xs font-medium text-neutral-500">
                        Suggested discount based on expiry date
                      </p>
                      {/* <Button className="">
                        <Trash2 /> Delete
                      </Button> */}
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row space-y-0 justify-between items-center">
                  <CardTitle className="w-fit">Status & Visiblility</CardTitle>
                </CardHeader>
                <CardContent>
                  <LabelInputContainer className="flex flex-row-reverse justify-between items-center space-y-0 mb-4">
                    <Switch id="product-status" />
                    <span>
                      <Label
                        htmlFor="product-status"
                        className="text-center mt-0"
                      >
                        Product Status
                      </Label>
                      <p className="text-xs">
                        Set whether the product is active or draft.
                      </p>
                    </span>
                  </LabelInputContainer>
                  <LabelInputContainer className="flex flex-row-reverse justify-between items-center space-y-0 mb-4">
                    <Switch id="feature-product" />
                    <span>
                      <Label
                        htmlFor="feature-product"
                        className="text-center mt-0"
                      >
                        Featured Product
                      </Label>
                      <p className="text-xs">
                        Show this product in featured section.
                      </p>
                    </span>
                  </LabelInputContainer>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <Card className="md:w-1/4 h-fit">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardContent className="p-0">
                  <Card className="relative p-4 shadow-none mt-4">
                    {/* Checkbox and Stock Badge */}
                    <div className="w-full flex justify-end">
                      <Badge
                        variant="secondary"
                        className="rounded text-white bg-red-500"
                      >
                        {formData.discount}% OFF
                      </Badge>
                    </div>

                    {/* Product Image */}
                    <CardContent className="flex justify-center p-0 md:p-6 md:pt-0">
                      {formData.img ? (
                        <Image
                          src={formData.img}
                          alt={formData.name}
                          className="object-contain rounded-md"
                          width={128}
                          height={128}
                        />
                      ) : (
                        <div className="h-32 w-32 bg-gray-100 rounded-md flex justify-center items-center">
                          No Image
                        </div>
                      )}
                    </CardContent>

                    {/* Product Details */}
                    <div className="">
                      <h3 className="text-base truncate">
                        {formData.name || "Product Name"}
                      </h3>
                      <p className="text-xs font-medium text-gray-500 capitalize mb-2">
                        {formData.category || "Product Category"}
                      </p>
                      <span className="flex items-center space-x-1.5">
                        <p className="text-lg font-semibold ">
                          ₹
                          {(
                            parseFloat(formData.price) *
                            (1 - formData.discount / 100)
                          ).toFixed(2)}
                        </p>
                        {formData.discount > 0 && (
                          <p className="text-xs text-gray-400 line-through">
                            ₹{(parseFloat(formData.price) || 0).toFixed(2)}
                          </p>
                        )}
                      </span>
                      <span className="flex mt-1.5 items-center space-x-1 text-gray-600">
                        <Clock className="w-3 h-3" />
                        <p className="text-xs">
                          {calculateRemainingDays(formData.expiryDate)}
                        </p>
                      </span>
                    </div>
                  </Card>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewProduct;

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
