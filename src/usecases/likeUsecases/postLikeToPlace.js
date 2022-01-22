import { Place } from '../../models/place.model.js'

const postLikeToPlace = async (id, like) =>
  await Place.findByIdAndUpdate(id, like)

export { postLikeToPlace }
