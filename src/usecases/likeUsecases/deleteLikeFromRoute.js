import { Like } from '../../models/like.model.js'

const deleteLikeFromRoute = async (id) => {
  try {
    return await Like.findByIdAndDelete(id)
  } catch (error) {
    console.error(error)
  }
}

export { deleteLikeFromRoute }
