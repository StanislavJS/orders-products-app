import type { Order } from '../types/order';

export const orders: Order[] = [
  {
    id: '1',
    name: 'Order #1',
    createdAt: '2025-07-10T14:20:00Z',
    status: 'pending', 
    products: [
      {
        id: 'p1',
        name: 'Laptop',
        type: 'Electronics',
        warrantyStart: '2024-01-01',
        warrantyEnd: '2026-01-01',
        priceUSD: 1000,
        priceEUR: 920,
        orderId: '1',
      },
    ],
  },
  {
    id: '2',
    name: 'Order #2',
    createdAt: '2025-06-15T09:00:00Z',
    status: 'completed',
    products: [
      {
        id: 'p2',
        name: 'Chair',
        type: 'Furniture',
        warrantyStart: '2023-05-01',
        warrantyEnd: '2025-05-01',
        priceUSD: 150,
        priceEUR: 138,
        orderId: '2',
      },
    ],
  },
  {
    id: '3',
    name: 'Order #3',
    createdAt: '2025-07-05T11:30:00Z',
    status: 'cancelled',
    products: [
      {
        id: 'p3',
        name: 'Monitor',
        type: 'Electronics',
        warrantyStart: '2024-03-10',
        warrantyEnd: '2026-03-10',
        priceUSD: 300,
        priceEUR: 276,
        orderId: '3',
      },
    ],
  },
];
