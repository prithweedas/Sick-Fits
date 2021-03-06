import { GraphQLServer } from 'graphql-yoga'

import db from './db'
import { Mutation, Query } from './resolvers'

const createServer = () => {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  })
}

export default createServer
