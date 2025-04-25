export type Products = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  status: boolean;
  batches: ProductBatch[];
  featured: boolean;
};

export type ProductBatch = {
  batchId: string;
  quantity: number;
  expiryDate: string;
  basePrice: number;
  discount: number;
};
