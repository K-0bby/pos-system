export type Category =
  | "Beer"
  | "Wine & Spirit"
  | "Tots"
  | "Soft Drinks"
  | "Others";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: {
    retail: number;
    wholesale: number;
  };
  qty: number; // Quantity available
  inStock: boolean;
  image: string;
}

export type ViewMode = "grid" | "list";
export type SaleMode = "retail" | "wholesale";
