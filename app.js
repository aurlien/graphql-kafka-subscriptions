import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from 'ws'
import {useServer} from 'graphql-ws/lib/use/ws'
import express from 'express';
import http from 'http';
import { typeDefs, resolvers } from './schema.js'

(async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({typeDefs, resolvers})

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql"
  })
  
  const serverCleanup = useServer({schema}, wsServer)
  
  const server = new ApolloServer({
    playground: true,
    schema,
    plugins: [
      // Proper shutdown of the HTTP server
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown of the ws server
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: "/graphql"
  })

  const PORT = 4000
  httpServer.listen(PORT, () => {
    console.log(
      `Server is now running on http://localhost:${PORT}${server.graphqlPath}`,
    );
  });
})()