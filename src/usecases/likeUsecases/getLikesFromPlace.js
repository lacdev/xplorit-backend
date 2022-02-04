import { Like } from '../../models/like.model.js'

const getLikesFromPlace = async (id) => {
  try {
    return await Like.find(id)
  } catch (error) {
    console.error(error)
  }
}

export { getLikesFromPlace }
