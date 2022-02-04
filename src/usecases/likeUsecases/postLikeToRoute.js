import { Like } from '../../models/like.model.js'

const postLikeToRoute = async (newLike) => {
  try {
  
    return await Like.create(newLike)

  } catch (error) {
    console.error(error)
  }
}
export { postLikeToRoute }
