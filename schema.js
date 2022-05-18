import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Example {
    message: String
  }

  type Query {
    queryExample: Example
  }

  type Mutation {
    mutationExample: Example
  }
`

export const resolvers = {
  Query: {
    queryExample: (parent, args, context) => ({ message: "This is the message from the query resolver"})
  },
  Mutation: {
    mutationExample: (parent, args, context) => {
      console.log("Perform mutations..")
      return {
        message: "This is the message from the mutation resolver"
      }
    }
  }
}