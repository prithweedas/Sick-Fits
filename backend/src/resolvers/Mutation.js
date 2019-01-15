const Mutations = {
  createItem: async (parent, args, ctx, info) => {
    // TODO: check authentication

    const item = ctx.db.mutation.createItem(
      {
        ...args
      },
      info
    )
    return item
  },
  updateItem: async (parent, { data }, ctx, info) => {
    // get the arguments
    const { id, ...updates } = data
    // run the mutation
    const item = ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id
        }
      },
      info
    )

    return item
  }
}

export default Mutations
