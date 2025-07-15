import type { OrderSummary } from '../types/order';

export const mockOrdersSummary: OrderSummary[] = [
  {
    id: '1',
    customer: 'John Doe',
    total: 120.5,
    status: 'pending',
    createdAt: '2025-07-10T14:20:00Z',
  },
  {
    id: '2',
    customer: 'Jane Smith',
    total: 250.0,
    status: 'completed',
    createdAt: '2025-07-09T10:00:00Z',
  },
  // додаткові резюме...
];
