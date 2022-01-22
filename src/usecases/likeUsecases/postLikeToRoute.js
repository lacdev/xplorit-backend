import { Route } from '../../models/route.model.js'

const postLikeToRoute = async (id, like) =>
  await Route.findByIdAndUpdate(id, like)

export { postLikeToRoute }
