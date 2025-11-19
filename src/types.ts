export type Finish = "gloss" | "matt";

export interface ProductVariant {
  id: string;
  finish: Finish;
  gsm: number;
  pricePer100: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number; // ⭐ NEW
  variants: Variant[];
}
