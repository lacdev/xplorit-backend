import { Like } from '../../models/like.model.js'

const deleteLikeFromPlace = async (id) => {
  try {
    return await Like.findByIdAndDelete(id)
  } catch (error) {
    console.error(error)
  }
}

export { deleteLikeFromPlace }