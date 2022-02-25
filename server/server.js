const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

const server = new ApolloServer({
  uploads: false,
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const startServer = async () => {
  await server.start();
}

startServer();

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  console.log(
    `GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  app.listen(PORT, () =>
    console.log(`Listening on localhost:${PORT}`)
  );
});

