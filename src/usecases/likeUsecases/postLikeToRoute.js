import { Route } from '../../models/route.model.js'

const postLikeToRoute = async (id, like) => {
  try {
    return await Route.findByIdAndUpdate(id, like)
  } catch (error) {
    console.error(error)
  }
}

export { postLikeToRoute }
