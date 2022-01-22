import { Like } from 'models/like.model'
import { Place } from 'models/place.model'

const getLikesFromPlace = async (id) => await Place.findById(id)

export { getLikesFromPlace }
