import { gql } from "graphql-request";

export const typeDefs = gql`
  type Note {
    id: ID!
    title: String!
    content: String!
    created_at: String!
  }

  type Query {
    notes(limit: Int, offset: Int, search: String): [Note!]!
    note(id: ID!): Note
  }

  type Mutation {
    createNote(title: String!, content: String!): Note!
    updateNote(id: ID!, title: String, content: String): Note!
    deleteNote(id: ID!): Boolean!
  }
`;
