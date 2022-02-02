import { Like } from '../../models/like.model.js'

const postLikeToRoute = async (userId, routeId) => {
  try {
    const newLike = new Like ({
      userId : userId,
      routeId : routeId
    })
    return await Like.create(newLike)
  } catch (error) {
    console.error(error)
  }
}

export { postLikeToRoute }
