import { forwardTo } from 'prisma-binding'

const Query = {
  // forward to prisma if no need for custom logs such as authorization
  items: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  /*
  // items: async (parent, args, ctx, info) => {
  //   const items = await ctx.db.query.items()
  //   return items
  // }
  */
  item: forwardTo('db')
}

export default Query
