import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { parse } from 'graphql';
import { BasketInput, ProductInput, products, Rating, users, } from './data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const typeDefs = parse(fs.readFileSync(path.join(__dirname, '/schema.graphql')).toString());

export const resolvers = {
  Mutation: {
    addProductToUserBasket(_: any, { input: { product: { sku, upc }, userId, }, }: { input: BasketInput }) {
      const product = products.get(`${sku}${upc}`);
      if (!product) {
        throw new Error(`Product with sku "${sku}" and upc ${upc} not found.`);
      }
      const user = users.get(userId);
      if (!user) {
        throw new Error(`Invalid user id ${userId}.`)
      }
      user.basket = [product, ...user.basket];
      return user;
    },
  },
  Product: {
    __resolveReference({ sku, upc }: { sku: string, upc: number, }) {
      return products.get(`${sku}${upc}`);
    }
  },
  Query: {
    product(_: any, { input: { sku, upc, }, }: { input: ProductInput, }) {
      return products.get(`${sku}${upc}`);
    },
    products() {
      return products.values();
    },
    ratings() {
      return [Rating.NEGATIVE, Rating.NEUTRAL, Rating.POSITIVE];
    }
  },
  User: {
    __resolveReference({ id }: { id: number, }) {
      return users.get(id);
    }
  },
};

if (process.argv[1] === __filename) {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4112, host: '127.0.0.1' },
  });

  console.log(`Products server ready at ${url}`);
}