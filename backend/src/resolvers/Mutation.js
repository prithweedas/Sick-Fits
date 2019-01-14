const Mutations = {
  createItem: async (parent, args, ctx, info) => {
    // TODO: check authentication

    const item = await ctx.db.mutation.createItem(
      {
        data: { ...args }
      },
      info
    )
    return item
  }
}

export default Mutations
