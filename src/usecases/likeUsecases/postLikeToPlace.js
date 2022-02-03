import { Like } from '../../models/like.model.js'

const postLikeToPlace = async (newLike) => {
  try {
  
    return await Like.create(newLike)

  } catch (error) {
    console.error(error)
  }
}
export { postLikeToPlace }


