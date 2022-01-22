import { Like } from 'models/like.model'
import Route from 'models/route.model'

const postLikeToRoute = async (id, like) =>
  await Route.findByIdAndUpdate(id, like)

export { postLikeToRoute }
