import createServer from './createServer'

const server = createServer()

// TODO: express middleware for parsing cookies

// TODO: express middleware to populate current user

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
