import { Like } from '../../models/like.model.js'

const getLikesFromRoute = async (id) => {
  try {
    return await Like.find(id)
  } catch (error) {
    console.error(error)
  }
}

export { getLikesFromRoute }

