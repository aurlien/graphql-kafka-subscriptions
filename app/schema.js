import { gql } from 'apollo-server-express';
import { pubsub } from './kafka.js'

export const typeDefs = gql`
  type Trade {
    side: String
    quantity: Int
    symbol: String
    price: Float
  }

  type Query {
    trades: [Trade]
  }

  type Subscription {
    tradeCreated: Trade
  }
`

export const resolvers = {
  Query: {},
  Subscription: {
    tradeCreated: {
      resolve: ({ value }) => JSON.parse(value.toString()),
      subscribe: () => pubsub.asyncIterator('trades')
    }
  }
}