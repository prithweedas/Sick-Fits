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
  deleteItem: async (parent, args, ctx, info) => {
    const where = { id: args.id }
    // find the Item
    const item = await ctx.db.query.item({ where }, `{ id title }`)
    console.log(item)
    // TODO: check permissions
    // delete the Item
    return ctx.db.mutation.deleteItem({ where }, info)
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
