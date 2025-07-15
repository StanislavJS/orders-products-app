import type { Product } from '../types/product';

const types = ['Laptop', 'Monitor', 'Keyboard', 'Phone', 'Tablet'];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomPrice() {
  const usd = getRandomInt(100, 2000);
  const uah = usd * 40;
  return [
    { value: usd, symbol: 'USD', isDefault: 1 as const },
    { value: uah, symbol: 'UAH', isDefault: 0 as const },
  ];
}

function generateGuarantee() {
  const start = new Date();
  const end = new Date();
  end.setFullYear(end.getFullYear() + 2);
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
}

export function generateRandomProducts(count: number = 10): Product[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    type: types[getRandomInt(0, types.length - 1)],
    price: generateRandomPrice(),
    guarantee: generateGuarantee(),
    order: getRandomInt(1, 5),
    serialNumber: `SN-${getRandomInt(100000, 999999)}`,
    specification: `Specs for product ${i + 1}`,
    isNew: 1, // або 0
    photo: '', // або якийсь url
    date: new Date().toISOString().split('T')[0],
  }));
}
