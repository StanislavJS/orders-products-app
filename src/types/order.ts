export interface Product {
  id: string;
  name: string;
  type: string;
  warrantyStart: string;
  warrantyEnd: string;
  priceUSD: number;
  priceEUR: number;
  orderId: string;
}

export interface Order {
  id: string;
  name: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'cancelled';  // додано
  products: Product[];
}

export interface OrderSummary {
  id: string;
  customer: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface OrderDetails {
  id: string;
  name: string;
  createdAt: string;
  products: Product[];
}
