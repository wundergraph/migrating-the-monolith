export type Product = {
  sku: string;
  upc: number;
  name: string;
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