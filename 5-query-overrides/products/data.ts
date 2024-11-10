export type BasketInput = {
  product: ProductInput;
  userId: number;
};

export type ProductInput = {
  sku: string;
  upc: number;
};

export type Product = {
  sku: string;
  upc: number;
  name: string;
}

export enum Rating {
  NEGATIVE= 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  POSITIVE = 'POSITIVE',
}

type User = {
  id: number;
  basket: Array<Product>;
}

const whiteBread: Product = { sku: 'bread', upc: 1, name: 'White Bread', };
const brownBread: Product = { sku: 'bread', upc: 2, name: 'Brown Bread', };
const spices: Product = { sku: 'spices', upc: 3, name: 'Garam Masala', };
const tea: Product = { sku: 'tea', upc: 4, name: 'Black Tea', };
const coffee: Product = { sku: 'coffee', upc: 5, name: 'Medium Roast Coffee Beans', };

export const products = new Map<string, Product>([
  ['bread1', whiteBread],
  ['bread2', brownBread],
  ['spices3', spices],
  ['tea4', tea],
  ['coffee5', coffee],
]);

export const users = new Map<number, User>([
  [1, { id: 1, basket: [tea, spices, ], }],
  [2, { id: 2, basket: [coffee, brownBread, whiteBread, ], }],
  [3, { id: 3, basket: [], }],
  [4, { id: 4, basket: [], }],
  [5, { id: 5, basket: [whiteBread, ], }],
]);