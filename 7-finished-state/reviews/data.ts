export type Product = {
  sku: string;
  upc: number;
  reviews: Array<Review>;
};

type ProductInput = {
  sku: string;
  upc: number;
};

export type ProductReviewInput = {
  product: ProductInput;
  review: ReviewInput;
};

enum Rating {
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  PENDING = 'PENDING',
  POSITIVE = 'POSITIVE',
}

type ReviewInput = {
  authorId: number;
  content: string;
  rating: Rating;
};

export type Review = {
  rating: Rating;
  author: User;
  content: string;
};

export type User = {
  id: number;
}

export const users = new Map<number, User>([
  [1, { id: 1, }],
  [2, { id: 2, }],
  [3, { id: 3, }],
  [4, { id: 4, }],
  [5, { id: 5, }],
]);

export const products = new Map<string, Product>([
  ['bread1', { sku: 'bread', upc: 1, reviews: [
    { author: { id: 1 }, rating: Rating.POSITIVE, content: 'Best thing since sliced b—oh, right.', },
  ], }],
  ['bread2', { sku: 'bread', upc: 2, reviews: [], }],
  ['spices3', { sku: 'spices', upc: 3, reviews: [
      { author: { id: 5 }, rating: Rating.NEGATIVE, content: `Ate a spoonful and didn't like it.`, },

  ], }],
  ['tea4', { sku: 'tea', upc: 4, reviews: [
      { author: { id: 4 }, rating: Rating.POSITIVE, content: 'Great with milk.', },
      { author: { id: 2 }, rating: Rating.NEUTRAL, content: 'I prefer coffee.', },
  ], }],
  ['coffee5', { sku: 'coffee', upc: 5, reviews: [
      { author: { id: 3 }, rating: Rating.PENDING, content: 'Package was open; waiting for a replacement.', },
  ], }],
]);