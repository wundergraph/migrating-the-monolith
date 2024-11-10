import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { resolvers as monolithResolvers, typeDefs as monolithTypeDefs } from '../1-starting-state/monolith/monolith';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper';
import { DocumentNode } from 'graphql';

export async function newMonolithServer(port: number) {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ resolvers: monolithResolvers, typeDefs: monolithTypeDefs, }),
  });

  const { url, } = await startStandaloneServer(server, {
    listen: { port, host: '127.0.0.1' },
  });

  console.log(`Monolithic server ready at ${url}`);
  return server;
}

export async function newServer(port: number, resolvers: GraphQLResolverMap<unknown>, typeDefs: DocumentNode | Array<DocumentNode>) {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ resolvers, typeDefs, }),
  });

  const { url, } = await startStandaloneServer(server, {
    listen: { port, host: '127.0.0.1' },
  });

  console.log(`Server ready at ${url}`);
  return server;
}