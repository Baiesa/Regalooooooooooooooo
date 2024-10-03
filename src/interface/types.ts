export interface Customer {
  customer_id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Category {
  title: string;
  viewAllLink: string;
  products: Product[];
}

export interface Order {
  order_id: string;
  customer_id: string;
  date: string;
  products: string[];
}

export interface Item {
  id: number;
  name: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}
