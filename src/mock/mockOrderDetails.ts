import type { OrderDetails } from '../types/order';

export const mockOrderDetails: Record<string, OrderDetails> = {
  '1': {
    id: '1',
    name: 'Приход №1',
    createdAt: '2025-07-01T10:30:00Z',
    products: [
      {
        id: '101',
        name: 'Товар A',
        type: 'Електроніка',
        warrantyStart: '2025-07-01',
        warrantyEnd: '2026-07-01',
        priceUSD: 100,
        priceEUR: 90,
        orderId: '1',
      },
    ],
  },
  // інші деталі замовлень...
};
