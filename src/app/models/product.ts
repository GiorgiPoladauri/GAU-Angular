export interface PriceTier {
  minQty: number;
  maxQty: number | null;
  price: number;
}

export interface Supplier {
  name: string;
  location: string;
  verified: boolean;
  worldwideShipping: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  images: string[];
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  orders: number;
  freeShipping: boolean;
  inStock: boolean;
  description: string;
  priceTiers: PriceTier[];
  specs: Record<string, string>;
  supplier: Supplier;
}

export type SortKey =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'orders'
  | 'name';
