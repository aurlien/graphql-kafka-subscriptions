import { gql } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub()

export const typeDefs = gql`
  type Post {
    author: String
    comment: String
  }

  type Query {
    posts: [Post]
  }

  type Subscription {
    postCreated: Post
  }

  type Mutation {
    createPost(author: String, comment: String): Post
  }
`

export const resolvers = {
  Query: {},
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(['POST_CREATED'])
    }
  },
  Mutation: {
    createPost(parent, args, context) {
      pubsub.publish('POST_CREATED', { postCreated: args })
      
      return args
    }
  }
}