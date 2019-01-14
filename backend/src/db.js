import { Prisma } from 'prisma-binding'
import dotenv from 'dotenv'
dotenv.config({ path: 'variables.env' })

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  debug: true
})

export default db
