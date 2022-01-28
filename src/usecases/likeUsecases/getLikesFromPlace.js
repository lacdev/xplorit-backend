import { Place } from '../../models/place.model.js'

const getLikesFromPlace = async (id) => {
  try {
    return await Place.findById(id)
  } catch (error) {
    console.error(error)
  }
}

export { getLikesFromPlace }
