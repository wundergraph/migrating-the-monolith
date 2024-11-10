import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { parse } from 'graphql';
import { ProductReviewInput, products, Review, users } from './data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const typeDefs = parse(fs.readFileSync(path.join(__dirname, '/schema.graphql')).toString());

export const resolvers = {
  Mutation: {
    addProductReview(
      _: any,
      { input: { product: { sku, upc, }, review: { authorId, content, rating, }, } }: { input: ProductReviewInput, }) {
      const product = products.get(`${sku}${upc}`);
      if (!product) {
        throw new Error(`Product with sku "${sku}" and upc ${upc} not found.`);
      }
      const user = users.get(authorId);
      if (!user) {
        throw new Error(`Invalid user id ${authorId}.`)
      }
      const newReview: Review = { author: user, content, rating, };
      product.reviews = [newReview, ...product.reviews];
      return newReview;
    }
  },
  User: {
    __resolveReference({ id, }: { id: number }) {
      return users.get(id);
    },
  },
  Product: {
    __resolveReference({ sku, upc, }: { sku: string, upc: number, }) {
      return products.get(`${sku}${upc}`);
    },
  },
};

if (process.argv[1] === __filename) {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4113, host: '127.0.0.1' },
  });

  console.log(`Reviews server ready at ${url}`);
}