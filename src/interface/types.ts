export interface Customer {
  customer_id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  id: number; // Ensure this matches the type in your data
  name: string;
  description: string;
  price: number;
  image?: string;
  rating?: number; // Optional
  stock_qty?: number;
}

export interface Order {
  order_id: string;
  customer_id: string;
  date: string;
  products: string[];
}

export interface Item {
  id: number; // or string, depending on your data type
  name: string;
  description: string;
  price: number;
  image?: string;
  rating?: number;
  stock_qty?: number;
  quantity: number;
}
