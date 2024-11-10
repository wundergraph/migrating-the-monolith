export const usersQuery = `{"query":"{ users { id basket { sku upc name reviews { author { username } content rating } } username } }"}`;
export const usersPojo = {
  users: [
    {
      id: 1,
      basket: [
        {
          sku: 'tea',
          upc: 4,
          name: 'Black Tea',
          reviews: [
            { author: { username: 'Björn', }, content: 'Great with milk.', rating: 'POSITIVE', },
            { author: { username: 'Jens', }, content: 'I prefer coffee.', rating: 'NEUTRAL', },
          ],
        },
        {
          sku: 'spices',
          upc: 3,
          name: 'Garam Masala',
          reviews: [
            { author: { username: 'Stefan', }, content: `Ate a spoonful and didn't like it.`, rating: 'NEGATIVE', },
          ],
        },
      ],
      username: 'David',
    },
    {
      id: 2,
      basket: [
        { sku: 'coffee', upc: 5, name: 'Medium Roast Coffee Beans', reviews: [], },
        {
          sku: 'bread',
          upc: 2,
          name: 'Brown Bread',
          reviews: [],
        },
        {
          sku: 'bread',
          upc: 1,
          name: 'White Bread',
          reviews: [
            {
              author: { username: 'David', },
              content: 'Best thing since sliced b—oh, right.',
              rating: 'POSITIVE',
            },
          ],
        },
      ],
      username: 'Jens',
    },
    { id: 3, basket: [], username: 'Dustin' },
    { id: 4, basket: [], username: 'Björn' },
    {
      id: 5,
      basket: [
        {
          sku: 'bread',
          upc: 1,
          name: 'White Bread',
          reviews: [
            {
              author: { username: 'David', },
              content: 'Best thing since sliced b—oh, right.',
              rating: 'POSITIVE',
            },
          ],
        },
      ],
      username: 'Stefan',
    },
  ],
};

export const userQuery = `{"query":"{ user(id: 5) { username } }"}`;
export const userPojo = {
  user: {
    username: 'Stefan',
  },
};

export const productsQuery = `{"query":"{ products { sku upc name reviews { author { id } } } }"}`;
export const productsPojo = {
  products: [
    {
      sku: 'bread',
      upc: 1,
      name: 'White Bread',
      reviews: [
        {
          author: {
            id: 1,
          },
        },
      ],
    },
    {
      sku: 'bread',
      upc: 2,
      name: 'Brown Bread',
      reviews: [],
    },
    {
      sku: 'spices',
      upc: 3,
      name: 'Garam Masala',
      reviews: [
        {
          author: {
            id: 5,
          },
        },
      ],
    },
    {
      sku: 'tea',
      upc: 4,
      name: 'Black Tea',
      reviews: [
        {
          author: {
            id: 4,
          },
        },
        {
          author: {
            id: 2,
          },
        },
      ],
    },
    {
      sku: 'coffee',
      upc: 5,
      name: 'Medium Roast Coffee Beans',
      reviews: [],
    },
  ]
};

export const productQuery = `{"query":"{ product(input: { sku: \\"bread\\", upc: 2 }) { sku upc name } }"}`;
export const productPojo = {
  product: {
    sku: 'bread',
    upc: 2,
    name: 'Brown Bread',
  },
};

export const ratingsQuery = `{"query":"{ ratings }"}`;
export const ratingsPojo = {
  ratings: [
    'NEGATIVE',
    'NEUTRAL',
    'POSITIVE',
  ],
};

export const basketMutation = `{"query":"mutation { addProductToUserBasket(input: { product: { sku: \\"tea\\", upc: 4 }, userId: 3 }) { basket { name } username } }"}`;
export const basketPojo = {
  addProductToUserBasket: {
    basket: [
      {
        name: 'Black Tea',
      },
    ],
    username: 'Dustin',
  },
};

export const reviewMutation = `{"query":"mutation { addProductReview(input: { product: { sku: \\"coffee\\", upc: 5 }, review: { authorId: 4, content: \\"Bitter!\\", rating: \\"NEGATIVE\\" } }) { author { username } content rating } }"}`;
export const reviewPojo = {
  addProductReview: {
    author: {
      username: 'Björn',
    },
    content: 'Bitter!',
    rating: 'NEGATIVE',
  },
};