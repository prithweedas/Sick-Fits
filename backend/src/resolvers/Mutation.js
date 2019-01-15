const Mutations = {
  createItem: async (parent, args, ctx, info) => {
    // TODO: check authentication

    const item = await ctx.db.mutation.createItem(
      {
        data: { ...args.data }
      },
      info
    )
    return item
  }
}

export default Mutations
