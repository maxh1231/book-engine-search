const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Book {
      bookId: ID
      Author: String
      description: String
      title: String
      image: String
      link: String
  }

  type Query {
      me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
  }


`

module.exports = typeDefs;