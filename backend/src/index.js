import playground from 'graphql-playground-middleware-express'

import createServer from './createServer'

const server = createServer()

// TODO: express middleware for parsing cookies

// TODO: express middleware to populate current user

// adding graphql playground
server.express.get(
  '/playground',
  playground({ endpoint: '/', env: process.env, useGraphQLConfig: true })
)

server.start(
  {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }
  },
  ({ port }) => {
    console.log(`Server started at http://localhost:${port}`)
  }
)
