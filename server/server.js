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

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// set url to allow origin (client URL)
if (process.env.NODE_ENV === 'production') {
  var corsOptions = {
    origin: 'https://typeplusplus.herokuapp.com/',
  };
} else {
  var corsOptions = {
    origin: 'http://localhost:3000',
  };
}
app.use(cors(corsOptions));
app.use(require('./controllers'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  console.log(
    `GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  httpServer.listen(PORT, () =>
    console.log(`Listening on localhost:${PORT}`)
  );
});

