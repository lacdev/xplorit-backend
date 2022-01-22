import { Like } from 'models/like.model'
import { Place } from 'models/place.model'

const postLikeToPlace = async (id, like) =>
  await Place.findByIdAndUpdate(id, like)

export { postLikeToPlace }
