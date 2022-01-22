import { Place } from '../../models/place.model.js'

const getLikesFromPlace = async (id) => await Place.findById(id)

export { getLikesFromPlace }
