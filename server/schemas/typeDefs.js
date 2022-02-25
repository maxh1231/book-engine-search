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

  input Authors {
      content: String
      author: String
  }

  type Query {
      me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: Authors, description: String!, title: String!, bookId: ID!): User
    removeBook(bookId: ID): User
  }


`

module.exports = typeDefs;