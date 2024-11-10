import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { parse } from 'graphql';
import { products } from './data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const typeDefs = parse(fs.readFileSync(path.join(__dirname, '/schema.graphql')).toString());

export const resolvers = {
  Product: {
    __resolveReference({ sku, upc }: { sku: string, upc: number, }) {
      return products.get(`${sku}${upc}`);
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