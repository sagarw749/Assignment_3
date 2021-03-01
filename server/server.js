const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');

const app = express();

const resolvers = {
  Query: {
    productList,
  },
  Mutation: {
    addProduct,
  },
};

const productsDB = [];

function addProduct(_, { product }) {
  product.id = productsDB.length + 1;
  productsDB.push(product);
  return product;
}

function productList() {
  return productsDB;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});
