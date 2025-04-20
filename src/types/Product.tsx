export type Products = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  status: "active" | "inactive";
  batches: ProductBatch[];
};

export type ProductBatch = {
  batchId: string;
  quantity: number;
  expiryDate: string;
  basePrice: number;
  discount?: number;
};
