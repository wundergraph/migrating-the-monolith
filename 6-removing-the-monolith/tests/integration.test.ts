import { execa } from 'execa';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { ApolloServer } from '@apollo/server';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  basketMutation,
  basketPojo,
  productPojo,
  productQuery,
  productsPojo,
  productsQuery,
  ratingsPojo,
  ratingsQuery,
  reviewMutation,
  reviewPojo,
  userPojo,
  userQuery,
  usersPojo,
  usersQuery
} from '../../test-data/data';
import { newServer } from '../../test-utils/test-utils';
import { resolvers as productsResolvers, typeDefs as productsTypeDefs } from '../products/products';
import { resolvers as reviewsResolvers, typeDefs as reviewsTypeDefs } from '../reviews/reviews';
import { resolvers as usersResolvers, typeDefs as usersTypeDefs } from '../users/users';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPort = 4112;
const reviewsPort = 4113;
const usersPort = 4114;
const controller = new AbortController();

describe('6-removing-the-monolith integration tests', () => {
  let products: ApolloServer;
  let reviews: ApolloServer;
  let users: ApolloServer;

  beforeAll(async () => {
    execa({
      cancelSignal: controller.signal,
      gracefulCancel: true,
    })`pnpm run router --override-env ${__dirname}/../.env`;
    await new Promise(delay => setTimeout(delay, 1000));
  });

  beforeEach(async () => {
    products = await newServer(productsPort, productsResolvers, productsTypeDefs);
    reviews = await newServer(reviewsPort, reviewsResolvers, reviewsTypeDefs);
    users = await newServer(usersPort, usersResolvers, usersTypeDefs);
  });

  afterEach(async () => {
    await products.stop();
    await reviews.stop();
    await users.stop();
  });

  afterAll(async () => {
    controller.abort();
  });

  test('that operations return the correct data', async () => {
    const userResponse = await fetch(`http://localhost:3002/graphql`, {
      body: userQuery,
      method: 'POST',
      headers: {
        'X-WG-TRACE': 'true',
      },
    });
    const userJson = await userResponse.json();
    expect(userJson.data).toBeDefined();
    expect(userJson.data).toEqual(userPojo);
    expect(userJson.extensions?.trace?.fetches?.children).toBeDefined();
    expect(userJson.extensions.trace.fetches.children).toHaveLength(1);
    expect(userJson.extensions.trace.fetches.children[0].fetch.source_name).toBe('users');

    const usersResponse = await fetch(`http://localhost:3002/graphql`, {
      body: usersQuery,
      method: 'POST',
      headers: {
        'X-WG-TRACE': 'true',
      },
    });
    const usersJson = await usersResponse.json();
    expect(usersJson.data).toBeDefined();
    expect(usersJson.data).toEqual(usersPojo);
    expect(usersJson.extensions?.trace?.fetches?.children).toBeDefined();
    expect(usersJson.extensions.trace.fetches.children).toHaveLength(4);
    expect(usersJson.extensions.trace.fetches.children[0].fetch.source_name).toBe('users');
    expect(usersJson.extensions.trace.fetches.children[1].fetch.source_name).toBe('products');
    expect(usersJson.extensions.trace.fetches.children[2].fetch.source_name).toBe('reviews');
    expect(usersJson.extensions.trace.fetches.children[3].fetch.source_name).toBe('users');

    const productResponse = await fetch(`http://localhost:3002/graphql`, {
      body: productQuery,
      method: 'POST',
      headers: {
        'X-WG-TRACE': 'true',
      },
    });
    const productJson = await productResponse.json();
    expect(productJson.data).toBeDefined();
    expect(productJson.data).toEqual(productPojo);
    expect(productJson.extensions?.trace?.fetches?.children).toBeDefined();
    expect(productJson.extensions.trace.fetches.children).toHaveLength(1);
    expect(productJson.extensions.trace.fetches.children[0].fetch.source_name).toBe('products');

    const productsResponse = await fetch(`http://localhost:3002/graphql`, {
      body: productsQuery,
      method: 'POST',
      headers: {
        'X-WG-TRACE': 'true',
      },
    });
    const productsJson = await productsResponse.json();
    expect(productsJson.data).toBeDefined();
    expect(productsJson.data).toEqual(productsPojo);
    expect(productsJson.extensions?.trace?.fetches?.children).toBeDefined();
    expect(productsJson.extensions.trace.fetches.children).toHaveLength(2);
    expect(productsJson.extensions.trace.fetches.children[0].fetch.source_name).toBe('products');
    expect(productsJson.extensions.trace.fetches.children[1].fetch.source_name).toBe('reviews');

    const ratingsResponse = await fetch(`http://localhost:3002/graphql`, {
      body: ratingsQuery,
      method: 'POST',
      headers: {
        'X-WG-TRACE': 'true',
      },
    });
    const ratingsJson = await ratingsResponse.json();
    expect(ratingsJson.data).toBeDefined();
    expect(ratingsJson.data).toEqual(ratingsPojo);
    expect(ratingsJson.extensions?.trace?.fetches?.children).toBeDefined();
    expect(ratingsJson.extensions.trace.fetches.children).toHaveLength(1);
    expect(ratingsJson.extensions.trace.fetches.children[0].fetch.source_name).toBe('products');

    const basketResponse = await fetch(`http://localhost:3002/graphql`, {
      body: basketMutation,
      method: 'POST',
      headers: {
        'X-WG-TRACE': 'true',
      },
    });
    const basketJson = await basketResponse.json();
    expect(basketJson.data).toBeDefined();
    expect(basketJson.data).toEqual(basketPojo);
    expect(basketJson.extensions?.trace?.fetches?.children).toBeDefined();
    expect(basketJson.extensions.trace.fetches.children).toHaveLength(2);
    expect(basketJson.extensions.trace.fetches.children[0].fetch.source_name).toBe('products');
    expect(basketJson.extensions.trace.fetches.children[1].fetch.source_name).toBe('users');

    const reviewResponse = await fetch(`http://localhost:3002/graphql`, {
      body: reviewMutation,
      method: 'POST',
      headers: {
        'X-WG-TRACE': 'true',
      },
    });
    const reviewJson = await reviewResponse.json();
    expect(reviewJson.data).toBeDefined();
    expect(reviewJson.data).toEqual(reviewPojo);
    expect(reviewJson.extensions?.trace?.fetches?.children).toBeDefined();
    expect(reviewJson.extensions.trace.fetches.children).toHaveLength(2);
    expect(reviewJson.extensions.trace.fetches.children[0].fetch.source_name).toBe('reviews');
    expect(reviewJson.extensions.trace.fetches.children[1].fetch.source_name).toBe('users');
  });
});