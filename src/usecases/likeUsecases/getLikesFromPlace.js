import { Like } from '../../models/like.model.js'

const getLikesFromPlace = async (placeId, likeId) => {
  try {
    return await Like.find(placeId, likeId)
    .select('like userId placeId')

  } catch (error) {
    console.error(error)
  }
}

export { getLikesFromPlace }
