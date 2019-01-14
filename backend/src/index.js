import createServer from './createServer'

const server = createServer()

// TODO: express middleware for parsing cookies
// TODO: express middleware to populate current user

server.start(
  {
    cors: {
      origin: /http:\/\/localhost:*/,
      credentials: true
    }
  },
  ({ port }) => {
    console.log(`Server started at http://localhost:${port}`)
  }
)
