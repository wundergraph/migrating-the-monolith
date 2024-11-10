export type BasketInput = {
  product: ProductInput;
  userId: number;
};

export type Product = {
  sku: string;
  upc: number;
  name: string;
  reviews: Array<Review>;
};

export type ProductInput = {
  sku: string;
  upc: number;
};

export type ProductReviewInput = {
  product: ProductInput;
  review: ReviewInput;
};

export enum Rating {
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE',
}

export type Review = {
  author: User;
  rating: Rating;
  content: string;
};

export type ReviewInput = {
  authorId: number;
  content: string;
  rating: Rating;
};

export type User = {
  id: number;
  username: string;
  basket: Array<Product>;
};

const whiteBread: Product = { sku: 'bread', upc: 1, name: 'White Bread', reviews: [], };
const brownBread: Product = { sku: 'bread', upc: 2, name: 'Brown Bread', reviews: [], };
const spices: Product = { sku: 'spices', upc: 3, name: 'Garam Masala', reviews: [], };
const tea: Product = { sku: 'tea', upc: 4, name: 'Black Tea', reviews: [], };
const coffee: Product = { sku: 'coffee', upc: 5, name: 'Medium Roast Coffee Beans', reviews: [], };

export const products = new Map<string, Product>([
  ['bread1', whiteBread],
  ['bread2', brownBread],
  ['spices3', spices],
  ['tea4', tea],
  ['coffee5', coffee],
]);

const david: User = { id: 1, username: 'David', basket: [tea, spices], };
const jens: User = { id: 2, username: 'Jens', basket: [coffee, brownBread, whiteBread], };
const dustin: User = { id: 3, username: 'Dustin', basket: [], };
const bjorn: User = { id: 4, username: 'Björn', basket: [], };
const stefan: User = { id: 5, username: 'Stefan', basket: [whiteBread], };

export const users = new Map<number, User>([
  [1, david],
  [2, jens],
  [3, dustin],
  [4, bjorn],
  [5, stefan],
]);

(function populateData() {
  whiteBread.reviews.push({ author: david, rating: Rating.POSITIVE, content: 'Best thing since sliced b—oh, right.', });
  spices.reviews.push({ author: stefan, rating: Rating.NEGATIVE, content: `Ate a spoonful and didn't like it.`});
  tea.reviews.push(
    { author: bjorn, rating: Rating.POSITIVE, content: 'Great with milk.'},
    { author: jens, rating: Rating.NEUTRAL, content: 'I prefer coffee.'},
  );
})();