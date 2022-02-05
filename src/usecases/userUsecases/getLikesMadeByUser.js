import { Like } from '../../models/like.model.js'

const getLikesMadeByUser = async (id) => {
  try {
    return await Like.find({ userId: id })
  } catch (error) {
    console.error(error)
  }
}

export { getLikesMadeByUser }
