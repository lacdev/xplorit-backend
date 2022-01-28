import { Place } from '../../models/place.model.js'

const postLikeToPlace = async (id, like) => {
  try {
    return await Place.findByIdAndUpdate(id, like)
  } catch (error) {
    console.error(error)
  }
}
export { postLikeToPlace }
