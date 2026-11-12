/** ერთი პროდუქტის სტრუქტურა data.json ფაილიდან */
export interface Product {
  image: string;
  name: string;
  price: string;
  original_price?: string;
  is_new: boolean;
  is_discounted: boolean;
  discount_percentage: string | null;
  rating?: number;
}

export interface ProductsResponse {
  products: Product[];
}
