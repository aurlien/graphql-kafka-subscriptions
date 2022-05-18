import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { typeDefs, resolvers } from './schema.js'

(async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    playground: true,
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: "/graphql"
  })

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 API ready at http://localhost:4000${server.graphqlPath}`);
})()