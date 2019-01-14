import { forwardTo } from 'prisma-binding'

const Query = {
  // forwart to prisma if no need for custom logs such as authorization
  items: forwardTo('db')
  //
  // items: async (parent, args, ctx, info) => {
  //   const items = await ctx.db.query.items()
  //   return items
  // }
}

export default Query
