import { Like } from '../../models/like.model.js'

const getLikesFromPlace = async (id) => {
  try {
    return await Like.find({placeId: id})
    .select('like ')

  } catch (error) {
    console.error(error)
  }
}

export { getLikesFromPlace }
